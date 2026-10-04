import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IntlProvider } from "react-intl";
import { messages } from "../../i18n/messages.js";
import { createArticleFixture } from "../EditorialWorkspace.test-utils.js";
import { TranslationsView } from "./TranslationsView.js";


// Product scenarios: workspace.translations.result-selection, workspace.translations.confirm-generation
describe("fresh translation review", () => {
    afterEach(cleanup);
    const article = { ...createArticleFixture("source", "Source"), language: "en" };
    const first = { metadata: { targetLanguage: "Spanish", protectedSpans: [] }, content: "First Spanish", baseRevisionId: article.currentRevisionId, editorialArtifactId: "first", createdAt: "2026-01-01T01:00:00Z" };
    const second = { ...first, content: "Second Spanish", editorialArtifactId: "second", createdAt: "2026-01-01T02:00:00Z" };

    it("selects exact results for creation and captures rejection identity across selection changes", async () => {
        const user = userEvent.setup();
        const create = vi.fn().mockResolvedValue(undefined);
        const reject = vi.fn().mockResolvedValue(undefined);
        render(<IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, translations: [first, second], stale: false }} actions={{ create, reject, translate: vi.fn() }} /></IntlProvider>);
        expect(screen.getByText("Second Spanish")).toBeTruthy();
        expect(screen.queryByRole("tab", { name: "Spanish" })).toBeNull();
        await user.selectOptions(screen.getByRole("combobox", { name: "Translation result" }), "first");
        await user.click(screen.getByRole("button", { name: "Edit" }));
        expect(create).toHaveBeenCalledWith("first");
        await user.click(screen.getByRole("button", { name: "Reject" }));
        await user.selectOptions(screen.getByRole("combobox", { name: "Translation result" }), "second");
        await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Reject" }));
        expect(reject).toHaveBeenCalledWith("first");
    });

    it("selects new completion, preserves older selection on unchanged results, and falls back on rejection", async () => {
        const user = userEvent.setup();
        const actions = { create: vi.fn(), translate: vi.fn() };
        const view = (translations: typeof first[]) => <IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, translations, stale: false }} actions={actions} /></IntlProvider>;
        const { rerender } = render(view([first]));
        rerender(view([first, second]));
        expect(screen.getByText("Second Spanish")).toBeTruthy();
        await user.selectOptions(screen.getByRole("combobox", { name: "Translation result" }), "first");
        rerender(view([{ ...first }, { ...second }]));
        expect(screen.getByText("First Spanish")).toBeTruthy();
        rerender(view([second]));
        expect(screen.getByText("Second Spanish")).toBeTruthy();
    });

    it("uses selected result freshness and protected spans independently", async () => {
        const user = userEvent.setup();
        render(<IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, translations: [{ ...first, baseRevisionId: "old" }, second], stale: false }} actions={{ create: vi.fn(), translate: vi.fn() }} /></IntlProvider>);
        expect(screen.getByRole("button", { name: "Edit" }).hasAttribute("disabled")).toBe(false);
        await user.selectOptions(screen.getByRole("combobox", { name: "Translation result" }), "first");
        expect(screen.getByRole("button", { name: "Edit" }).hasAttribute("disabled")).toBe(true);
    });

    it("cancels without generation and requires review after a source change before confirming", async () => {
        const user = userEvent.setup();
        const translate = vi.fn();
        const view = (content: string, active = false) => <IntlProvider locale="en" messages={messages}><TranslationsView data={{ article, sourceContent: content, translations: [first], stale: false, requestActive: active }} actions={{ create: vi.fn(), translate }} /></IntlProvider>;
        const { rerender } = render(view(article.currentRevision.content));
        await user.click(screen.getByRole("button", { name: "New translation…" }));
        await user.click(screen.getByRole("button", { name: "Cancel" }));
        expect(translate).not.toHaveBeenCalled();
        await user.click(screen.getByRole("button", { name: "New translation…" }));
        expect(screen.getByRole("checkbox", { name: "Spanish" }).getAttribute("checked")).not.toBeNull();
        rerender(view("Changed Draft"));
        expect(screen.getByText(/unsaved Draft will be saved/)).toBeTruthy();
        expect(screen.getByRole("button", { name: "Generate Spanish translation" }).hasAttribute("disabled")).toBe(true);
        await user.click(screen.getByRole("button", { name: "Review updated source" }));
        rerender(view("Changed Draft", true));
        expect(screen.getByRole("button", { name: "Generate Spanish translation" }).hasAttribute("disabled")).toBe(true);
        rerender(view("Changed Draft"));
        await user.dblClick(screen.getByRole("button", { name: "Generate Spanish translation" }));
        expect(translate).toHaveBeenCalledExactlyOnceWith(["es"]);
    });
});
