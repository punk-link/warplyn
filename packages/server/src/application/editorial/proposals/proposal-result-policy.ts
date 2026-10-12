import type { SkillExecution } from "@skladno/shared";
import { protectArticleSpans } from "../translation/translation.js";
import { EditorialEngineError } from "../engine/editorial-engine-error.js";
import { EDITORIAL_ENGINE_ERROR } from "../engine/editorial-engine-errors.js";


export function requiresProposalReview(execution?: SkillExecution): boolean {
    return execution?.capability === "generate_proposal" && execution.resultPolicy !== "verified_edit";
}


export function preservesProtectedContent(source: string, replacement: string): boolean {
    const protectedSpans = protectArticleSpans(source).protectedSpans;
    const sourceNumbers = source.match(/\b\d+(?:[.,]\d+)*\b/g) ?? [];
    const replacementNumbers = replacement.match(/\b\d+(?:[.,]\d+)*\b/g) ?? [];
    if (sourceNumbers.sort().join("\u0000") !== replacementNumbers.sort().join("\u0000"))
        return false;

    return ![...new Set(protectedSpans)].some((span) => source.split(span).length !== replacement.split(span).length);
}


export function validateProposalResult(source: string, replacement: string, execution?: SkillExecution): void {
    if (execution?.capability !== "generate_proposal" || execution.resultPolicy !== "shorter_preserving_content")
        return;

    if (replacement === source)
        return;

    const quotationsAndCitations = source.match(/"[^"\n]+"|“[^”\n]+”|\[\^[^\]]+\]/g) ?? [];
    const preservesReferences = quotationsAndCitations.every((span) => source.split(span).length === replacement.split(span).length);
    if (!replacement.trim() || replacement.length >= source.length || !preservesProtectedContent(source, replacement) || !preservesReferences)
        throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);
}
