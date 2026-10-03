import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import { messages } from "../../i18n/messages.js";
import { createArticleFixture } from "../EditorialWorkspace.test-utils.js";
import { TranslationsView } from "./TranslationsView.js";


// Product scenarios: workspace.translations.language-freshness, history-and-publishing.translation-source-change
describe("translation freshness and refresh", () => {
    afterEach(cleanup);
    const article = { ...createArticleFixture("source", "Original"), language: "en" };
    const target = { ...createArticleFixture("target", "Spanish edition"), language: "es", sourceArticleId: article.id, sourceRevisionId: article.currentRevisionId };
    const translations = [
        { metadata: { targetLanguage: "Spanish", protectedSpans: [] }, content: "Updated Spanish", baseRevisionId: article.currentRevisionId, editorialArtifactId: "artifact-es" },
        { metadata: { targetLanguage: "German", protectedSpans: [] }, content: "Old German", baseRevisionId: "old-source" },
    ];

    it("allows a fresh language while another language is stale", async () => {
        const user = userEvent.setup();
        const selectTargetLanguage = vi.fn();
        const create = vi.fn().mockResolvedValue(undefined);
        const { rerender } = render(<IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, translations, selectedTargetLanguage: "German", stale: false }} actions={{ create, selectTargetLanguage, translate: vi.fn() }} /></IntlProvider>);
        expect(screen.getByRole("button", { name: "Edit German translation" }).hasAttribute("disabled")).toBe(true);
        await user.click(screen.getByRole("tab", { name: "Spanish" }));
        expect(selectTargetLanguage).toHaveBeenCalledWith("Spanish");
        rerender(<IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, translations, selectedTargetLanguage: "Spanish", stale: false }} actions={{ create, selectTargetLanguage, translate: vi.fn() }} /></IntlProvider>);
        expect(screen.getByRole("button", { name: "Edit Spanish translation" }).hasAttribute("disabled")).toBe(false);
        expect(screen.queryByRole("alert")).toBeNull();
    });

    it("shows accepted translations becoming stale without changing their text", () => {
        const source = { ...article, currentRevisionId: "new-source", currentRevision: { ...article.currentRevision, id: "new-source", content: "Edited source" } };
        render(<IntlProvider locale="en" messages={messages}><TranslationsView data={{ article: target, sourceArticle: source, stale: true }} actions={{ create: vi.fn(), translate: vi.fn(), openArticle: vi.fn() }} /></IntlProvider>);
        expect(screen.getByText(/Its text has been preserved/)).toBeTruthy();
        expect(screen.getByText(target.currentRevision.content)).toBeTruthy();
    });

    it("requires explicit acceptance of a named existing translation and preserves create-new", async () => {
        const user = userEvent.setup();
        const create = vi.fn().mockResolvedValue(undefined);
        render(<IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, translations: [translations[0]!], linkedTranslations: [target], stale: false }} actions={{ create, translate: vi.fn(), openArticle: vi.fn() }} /></IntlProvider>);
        expect(screen.getByRole("button", { name: "Edit Spanish translation" })).toBeTruthy();
        await user.click(screen.getByRole("button", { name: "Update existing translation" }));
        expect(create).not.toHaveBeenCalled();
        expect(screen.getByRole("dialog").textContent).toContain("Spanish edition");
        await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Accept updated translation" }));
        expect(create).toHaveBeenCalledWith("Spanish", target);
    });
});
