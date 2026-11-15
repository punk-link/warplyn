// @vitest-environment node

import { describe, expect, it } from "vitest";
import { createIntl } from "react-intl";
import { installedLocaleCatalogs } from "./catalogs.js";
import { validateCatalog } from "./catalog-validation.js";
import { en } from "./locales/en.js";
import { messages } from "./messages.js";
import { INTERFACE_LOCALE, getElectronMessagesFor } from "@skladno/shared";

// product: cross-cutting.complete-catalog-required
describe("locale catalogs", () => {
    it("keeps visual separators out of translated copy", () => {
        for (const catalog of installedLocaleCatalogs) {
            expect(catalog.messages["preview.saved"].trim(), catalog.code).toBe(catalog.messages["preview.saved"]);
            for (const [id, translated] of Object.entries(catalog.messages)) {
                expect(translated, `${catalog.code} ${id}`).not.toContain("·");
            }
        }
    });

    it("distinguishes interface ellipses from literal typography examples", () => {
        for (const catalog of installedLocaleCatalogs) {
            expect(catalog.messages["typography.ellipsisThree"], catalog.code).toContain("...");
            expect(catalog.messages["typography.ellipsisSingle"], catalog.code).toContain("…");
            for (const [id, value] of Object.entries(catalog.messages)) {
                if (id === "typography.ellipsisThree")
                    continue;

                expect(value, `${catalog.code} ${id}`).not.toContain("...");
            }
        }
    });

    it("validates the complete English catalog and installed registry", () => {
        expect(Object.keys(en).sort()).toEqual(Object.keys(messages).sort());
        expect(() => validateCatalog(en)).not.toThrow();
        expect(installedLocaleCatalogs.map((catalog) => catalog.code).sort()).toEqual(Object.values(INTERFACE_LOCALE).sort());
        for (const catalog of installedLocaleCatalogs) {
            expect(() => validateCatalog(catalog.messages), catalog.code).not.toThrow();
            expect(Object.keys(getElectronMessagesFor(catalog.code)).sort()).toEqual(Object.keys(getElectronMessagesFor("en")).sort());
        }
    });

    it("rejects an incomplete catalog", () => {
        const incomplete = { ...en } as Record<string, string>;
        delete incomplete["errors.generic"];

        expect(() => validateCatalog(incomplete)).toThrow("exactly");
    });

    it("keeps model instructions in English independently of the interface locale", () => {
        for (const catalog of installedLocaleCatalogs) {
            expect(catalog.messages["assistant.factCheckCorrectionPrompt"], catalog.code)
                .toBe(messages["assistant.factCheckCorrectionPrompt"]);
            expect(catalog.messages["views.updateSuggestionPrompt"], catalog.code)
                .toBe(messages["views.updateSuggestionPrompt"]);
        }
    });

    it("preserves provider names in every interface locale", () => {
        const providerIds = [
            "settings.provider.openai", "settings.provider.opencode", "settings.provider.anthropic",
            "settings.provider.google", "settings.provider.xai", "settings.provider.deepseek",
        ] as const;
        for (const catalog of installedLocaleCatalogs)
            for (const id of providerIds)
                expect(catalog.messages[id], `${catalog.code} ${id}`).toBe(messages[id]);
    });

    it("rejects renamed ICU arguments and missing rich-text tags", () => {
        expect(() => validateCatalog({ ...en, "styleProfile.summary": "Version {other} · {confidence}" })).toThrow("preserve ICU");
        expect(() => validateCatalog({ ...en, "settings.removeCustomProfileDescription": "Remove {name}?" })).toThrow("preserve ICU");
    });

    it("uses ICU plural rules for revision counts", () => {
        expect(messages["revisions.count"]).toContain("plural");
        expect(() => validateCatalog(en)).not.toThrow();
    });

    it("uses Russian and Polish plural forms for saved versions", () => {
        for (const [locale, expected] of [
            ["ru", ["1 сохранённая версия", "2 сохранённые версии", "5 сохранённых версий"]],
            ["pl", ["1 zapisana wersja", "2 zapisane wersje", "5 zapisanych wersji"]],
        ] as const) {
            const catalog = installedLocaleCatalogs.find((entry) => entry.code === locale);
            const intl = createIntl({ locale, messages: catalog?.messages, onError: (error) => {
                throw error;
            } });
            expect([1, 2, 5].map((count) => intl.formatMessage({ id: "revisions.count" }, { count }))).toEqual(expected);
        }
    });
});
