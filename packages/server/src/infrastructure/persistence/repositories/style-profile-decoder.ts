import { APPLICATION_ERROR, HTTP_STATUS, isTypographyRules, type StyleProfile, type StyleTrait } from "@skladno/shared";
import { ApplicationServiceError } from "../../../application/errors/application-service-error.js";


function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}


function isTrait(value: unknown): value is StyleTrait {
    return isRecord(value) && typeof value.id === "string" && typeof value.label === "string" && typeof value.evidence === "string";
}


function isStringList(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item: unknown) => typeof item === "string");
}


function isStyleProfile(value: Record<string, unknown>): value is Record<string, unknown> & StyleProfile {
    const counts = [value.version, value.corpusItemCount, value.characterCount];
    const validCounts = counts.every((count) => typeof count === "number" && Number.isSafeInteger(count) && count >= 0);
    const validEvidence = Array.isArray(value.traits) && value.traits.every(isTrait) && isStringList(value.phrasesToAvoid) && isStringList(value.contributorIds);
    const validRules = isRecord(value.rules) && typeof value.rules.manual === "string" && isTypographyRules(value.rules.typography);
    
    return validCounts && validEvidence && validRules && typeof value.updatedAt === "string" && (value.confidence === "low" || value.confidence === "medium" || value.confidence === "high");
}


export function decodeTypographyRules(json: string) {
    try {
        const value: unknown = JSON.parse(json);
        if (isTypographyRules(value))
            return value;
    } catch { /* Invalid stored rules must not silently disappear. */ }

    throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST);
}


export function decodeStyleProfile(json: string): StyleProfile {
    const value: unknown = JSON.parse(json);
    if (!isRecord(value))
        throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST);

    const rules = value.rules;
    if (typeof rules === "string")
        value.rules = { manual: rules, typography: [] };
    else if (!isRecord(rules) || typeof rules.manual !== "string" || !isTypographyRules(rules.typography))
        throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST);

    if (!isStyleProfile(value))
        throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST);

    return value;
}
