import assert from "node:assert/strict";
import test from "node:test";
import { normalizeTypographyLanguage, type TypographyConfiguration, type TypographyPreferences } from "./typography-configuration.js";
import { resolveTypography } from "./resolve-typography.js";
import { isTypographyConfiguration, isTypographyConfigurationUpdate } from "./typography-configuration-validation.js";
import { typographyPresets } from "./typography-presets.js";

const dots: TypographyPreferences = { rules: [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }], disabled: [] };
const configuration: TypographyConfiguration = { version: 1, languages: { en: dots, ru: { rules: [], disabled: [] } } };

test("canonicalizes tags and explicit legacy names without guessing regions or unknown names", () => {
    assert.equal(normalizeTypographyLanguage(" French "), "fr");
    assert.equal(normalizeTypographyLanguage("EN-us"), "en-US");
    assert.equal(normalizeTypographyLanguage("not a language"), undefined);
    assert.equal(normalizeTypographyLanguage(undefined), undefined);
    assert.equal(resolveTypography("English", configuration).rules.length, 1);
    assert.equal(resolveTypography("en-US", configuration).rules.length, 0);
    assert.equal(resolveTypography("ru", configuration).rules.length, 0);
    assert.equal(resolveTypography(undefined, configuration).coverage, "missing-language");
});

test("Article slots override or disable language rules and never leak to another language", () => {
    const original = JSON.stringify(configuration);
    const changed: TypographyPreferences = { rules: [{ id: "dots", definition: { kind: "ellipsis", form: "..." } }], disabled: [] };
    const article = { language: "en", preferences: changed };
    const resolved = resolveTypography("en", configuration, article);
    assert.deepEqual(resolved.rules, changed.rules);
    assert.deepEqual(resolved.sources, { dots: "article" });
    assert.notEqual(resolved.fingerprint, resolveTypography("en", configuration).fingerprint);
    assert.equal(resolved.fingerprint, resolveTypography("en", configuration, article).fingerprint);
    assert.equal(resolveTypography("ru", configuration, article).rules.length, 0);
    assert.equal(resolveTypography("en", configuration, { language: "en", preferences: { rules: [], disabled: ["dots"] } }).rules.length, 0);
    assert.equal(resolveTypography("en", configuration, { language: "en", preferences: { rules: [], disabled: [] } }).rules.length, 1);
    assert.equal(JSON.stringify(configuration), original);
});

test("validates bounded settings and supports explicit custom conventions without a built-in preset", () => {
    assert.ok(isTypographyConfiguration(configuration));
    assert.ok(isTypographyConfigurationUpdate({ language: "en", preferences: dots, articleId: undefined }));
    assert.ok(isTypographyConfiguration({ version: 1, languages: { ja: dots } }));
    assert.equal(isTypographyConfiguration({ version: 1, languages: { English: dots } }), false);
    assert.equal(isTypographyConfigurationUpdate({ language: "en", preferences: dots, articleId: "" }), false);
    assert.equal(isTypographyConfigurationUpdate({ language: "en", preferences: { ...dots, disabled: ["dots"] } }), false);
    assert.equal(isTypographyConfigurationUpdate({ language: "en", preferences: { ...dots, preset: { id: "missing", version: 1 } } }), false);
    assert.equal(isTypographyConfiguration({ version: 1, languages: { en: {
        rules: [...dots.rules, { id: "another", definition: { kind: "ellipsis", form: "..." } }], disabled: [],
    } } }), false);
});

test("the preset catalog has unique immutable versions and pending candidates cannot be activated", () => {
    assert.equal(new Set(typographyPresets.map((preset) => `${preset.id}@${preset.version}`)).size, typographyPresets.length);
    for (const preset of typographyPresets) {
        assert.ok(preset.sources.length);
        assert.ok(preset.examples.length);
        if (preset.review.status === "pending") {
            assert.equal(isTypographyConfigurationUpdate({ language: preset.language, preferences: {
                preset: { id: preset.id, version: preset.version }, rules: [], disabled: [],
            } }), false);
        } else {
            assert.ok(preset.review.reviewer);
            assert.ok(preset.review.date);
        }
    }
});
