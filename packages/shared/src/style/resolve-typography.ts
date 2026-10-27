import {
    normalizeTypographyLanguage, type ArticleTypography, type TypographyCapture, type TypographyConfiguration, type TypographyPreferences,
} from "./typography-configuration.js";
import { findTypographyPreset } from "./typography-presets.js";
import type { TypographyRule } from "./typography.js";


function applyPreferences(
    rules: Map<string, TypographyRule>, sources: TypographyCapture["sources"],
    preferences: TypographyPreferences | undefined, origin: "language" | "article",
) {
    for (const id of preferences?.disabled ?? []) {
        rules.delete(id);
        delete sources[id];
    }

    for (const rule of preferences?.rules ?? []) {
        rules.set(rule.id, rule);
        sources[rule.id] = origin;
    }
}


export function resolveTypography(language: string | undefined, configuration?: TypographyConfiguration, article?: ArticleTypography): TypographyCapture {
    const normalized = normalizeTypographyLanguage(language);
    const saved = normalized ? configuration?.languages[normalized] : undefined;
    const override = normalized && article?.language === normalized ? article.preferences : undefined;
    const selection = override?.preset ?? saved?.preset;
    const preset = selection ? findTypographyPreset(selection) : undefined;
    const sources: TypographyCapture["sources"] = {};
    const rules = new Map<string, TypographyRule>();
    if (normalized) {
        for (const rule of preset?.rules ?? []) {
            rules.set(rule.id, rule);
            sources[rule.id] = "preset";
        }

        applyPreferences(rules, sources, saved, "language");
        applyPreferences(rules, sources, override, "article");
    }

    const effective = [...rules.values()].sort((a, b) => {
        if (a.id === b.id)
            return 0;

        return a.id < b.id ? -1 : 1;
    });
    const canonicalCapture = { language: normalized, preset: selection, rules: effective, sources };
    const fingerprint = JSON.stringify(canonicalCapture);
    let coverage: TypographyCapture["coverage"] = "configured";
    if (!normalized)
        coverage = "missing-language";
    else if (!effective.length)
        coverage = "unconfigured";

    return { ...canonicalCapture, fingerprint, coverage };
}
