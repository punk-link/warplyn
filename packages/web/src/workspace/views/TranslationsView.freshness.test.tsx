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
        expect(screen.getByRole("button", { name: "Edit" }).hasAttribute("disabled")).toBe(true);
        await user.click(screen.getByRole("tab", { name: "Spanish" }));
        expect(selectTargetLanguage).toHaveBeenCalledWith("Spanish");
        rerender(<IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, translations, selectedTargetLanguage: "Spanish", stale: false }} actions={{ create, selectTargetLanguage, translate: vi.fn() }} /></IntlProvider>);
        expect(screen.getByRole("button", { name: "Edit" }).hasAttribute("disabled")).toBe(false);
        expect(screen.queryByRole("alert")).toBeNull();
    });

    it("shows accepted translations becoming stale without changing their text", () => {
        const source = { ...article, currentRevisionId: "new-source", currentRevision: { ...article.currentRevision, id: "new-source", content: "Edited source" } };
        render(<IntlProvider locale="en" messages={messages}><TranslationsView data={{ article: target, sourceArticle: source, stale: true }} actions={{ create: vi.fn(), translate: vi.fn(), openArticle: vi.fn() }} /></IntlProvider>);
        expect(screen.getByText(/Its text has been preserved/)).toBeTruthy();
        expect(screen.getByText(target.currentRevision.content)).toBeTruthy();
    });

    it("groups Edit, Update and Reject while opening the existing Article without creating a duplicate", async () => {
        const user = userEvent.setup();
        const create = vi.fn().mockResolvedValue(undefined);
        const openArticle = vi.fn();
        const editArticle = vi.fn();
        render(<IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, translations: [translations[0]!], linkedTranslations: [target], stale: false }} actions={{ create, reject: vi.fn(), translate: vi.fn(), openArticle, edit: editArticle }} /></IntlProvider>);
        const edit = screen.getByRole("button", { name: "Edit" });
        expect(edit.parentElement?.contains(screen.getByRole("button", { name: "Update" }))).toBe(true);
        expect(edit.parentElement?.contains(screen.getByRole("button", { name: "Reject" }))).toBe(true);
        expect(screen.queryByText("Existing translations")).toBeNull();
        expect(screen.queryByRole("combobox", { name: "Translation to update" })).toBeNull();
        expect(screen.queryByText(target.title)).toBeNull();
        await user.click(edit);
        expect(openArticle).toHaveBeenCalledWith(target.id);
        expect(editArticle).toHaveBeenCalledOnce();
        expect(create).not.toHaveBeenCalled();
        await user.click(screen.getByRole("button", { name: "Update" }));
        expect(create).not.toHaveBeenCalled();
        expect(screen.getByRole("dialog").textContent).toContain("Spanish edition");
        await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Update" }));
        expect(create).toHaveBeenCalledWith("artifact-es", target);
    });

    it("keeps linked languages navigable without generated results", async () => {
        const user = userEvent.setup();
        const openArticle = vi.fn();
        const selectTargetLanguage = vi.fn();
        const create = vi.fn();
        const german = { ...target, id: "german", language: "de", title: "German edition" };
        const view = (selectedTargetLanguage: string) => <IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, translations: [translations[1]!], linkedTranslations: [target, german], selectedTargetLanguage, stale: false }} actions={{ create, openArticle, selectTargetLanguage, translate: vi.fn() }} /></IntlProvider>;
        const { rerender } = render(view("German"));
        await user.click(screen.getByRole("tab", { name: "Spanish" }));
        expect(selectTargetLanguage).toHaveBeenCalledWith("Spanish");
        rerender(view("Spanish"));
        expect(screen.queryByText("Old German")).toBeNull();
        await user.click(screen.getByRole("button", { name: "Edit" }));
        expect(openArticle).toHaveBeenCalledWith(target.id);
        expect(create).not.toHaveBeenCalled();
    });

    it("allows Edit but blocks Update when the existing translation has a Draft", async () => {
        const user = userEvent.setup();
        const openArticle = vi.fn();
        const draft = { articleId: target.id, baseRevisionId: target.currentRevisionId, version: 1, updatedAt: target.updatedAt };
        render(<IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, translations: [translations[0]!], linkedTranslations: [{ ...target, draft }], stale: false }} actions={{ create: vi.fn(), openArticle, translate: vi.fn() }} /></IntlProvider>);
        expect(screen.getByRole("button", { name: "Update" }).hasAttribute("disabled")).toBe(true);
        expect(screen.getByText("Save or discard the translation's Draft before updating it.")).toBeTruthy();
        await user.click(screen.getByRole("button", { name: "Edit" }));
        expect(openArticle).toHaveBeenCalledWith(target.id);
    });
});
