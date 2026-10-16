import type { TypographyRule } from "./typography.js";


export interface TypographyPreferences {
    preset?: { id: string; version: number };
    rules: TypographyRule[];
    disabled: string[];
}


export interface TypographyConfiguration {
    version: 1;
    languages: Record<string, TypographyPreferences>;
}


export interface ArticleTypography {
    language: string;
    preferences: TypographyPreferences;
}


export interface TypographyConfigurationUpdate {
    language: string;
    preferences: TypographyPreferences;
    articleId?: string;
}


export interface TypographyCapture {
    language?: string;
    preset?: { id: string; version: number };
    rules: TypographyRule[];
    sources: Record<string, "preset" | "language" | "article">;
    fingerprint: string;
    coverage: "configured" | "missing-language" | "unconfigured";
}


export interface TypographyPreset {
    id: string;
    version: number;
    language: string;
    preview: string;
    rules: TypographyRule[];
    review: { status: "pending" | "approved"; reviewer?: string; date?: string };
    sources: string[];
    omissions: string[];
    examples: { source: string; expected: string }[];
}


export const emptyTypographyConfiguration: TypographyConfiguration = { version: 1, languages: {} };


export { normalizeWritingLanguage as normalizeTypographyLanguage } from "../cross-cutting/writing-language.js";
