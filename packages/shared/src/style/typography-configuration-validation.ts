import {
    normalizeTypographyLanguage, type ArticleTypography, type TypographyConfiguration, type TypographyConfigurationUpdate, type TypographyPreferences,
} from "./typography-configuration.js";
import { findTypographyPreset } from "./typography-presets.js";
import { isTypographyRules } from "./typography-validation.js";
import { resolveTypography } from "./resolve-typography.js";


function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}


function isSelection(value: unknown, language: string): boolean {
    if (!isRecord(value) || typeof value.id !== "string" || typeof value.version !== "number")
        return false;

    const preset = findTypographyPreset({ id: value.id, version: value.version });
    return Boolean(preset?.review.status === "approved" && preset.language.split("-")[0] === language.split("-")[0]);
}


export function isTypographyPreferences(value: unknown, language: string): value is TypographyPreferences {
    if (!isRecord(value) || !isTypographyRules(value.rules) || !Array.isArray(value.disabled) || value.disabled.length > 30)
        return false;

    const ids = value.disabled;
    const ruleId = /^[\w-]{1,80}$/u;
    return ids.every((id: unknown) => typeof id === "string" && ruleId.test(id)) &&
        new Set(ids).size === ids.length && !value.rules.some((rule) => ids.includes(rule.id)) &&
        (value.preset === undefined || isSelection(value.preset, language));
}


export function isTypographyConfiguration(value: unknown): value is TypographyConfiguration {
    if (!isRecord(value) || value.version !== 1 || !isRecord(value.languages))
        return false;

    const entries = Object.entries(value.languages);
    return entries.length <= 50 && entries.every(([language, preferences]) =>
        normalizeTypographyLanguage(language) === language && isTypographyPreferences(preferences, language) &&
        isTypographyRules(resolveTypography(language, { version: 1, languages: { [language]: preferences } }).rules),
    );
}


export function isArticleTypography(value: unknown): value is ArticleTypography {
    return isRecord(value) && typeof value.language === "string" && normalizeTypographyLanguage(value.language) === value.language &&
        isTypographyPreferences(value.preferences, value.language);
}


export function isTypographyConfigurationUpdate(value: unknown): value is TypographyConfigurationUpdate {
    return isArticleTypography(value) && (!("articleId" in value) || value.articleId === undefined ||
        (typeof value.articleId === "string" && value.articleId.trim().length > 0 && value.articleId.length <= 200));
}
