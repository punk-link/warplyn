import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Article, DesktopUpdateClient } from "@skladno/shared";
import { messages } from "../../i18n/messages.js";
import { getMessage } from "../../i18n/test-message.js";
import { ArticleLibraryPanel as RenderArticleLibraryPanel } from "./ArticleLibraryPanel.js";


function ArticleLibraryPanel({ articles, selectedArticleId, selectArticle, collapsed, setCollapsed, createBlank, openStyleProfile, openSettings, language, dispatcher, shortcutOverrides, remove, setArchived, setPinned, reorderPinned, notifyError }: {
    articles: Article[];
    selectedArticleId: string | undefined;
    selectArticle: (articleId: string) => void;
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
    createBlank: () => Promise<unknown>;
    openStyleProfile: () => void;
    openSettings: () => void;
    language: string | undefined;
    dispatcher?: Parameters<typeof RenderArticleLibraryPanel>[0]["navigation"]["dispatcher"];
    shortcutOverrides?: Parameters<typeof RenderArticleLibraryPanel>[0]["navigation"]["shortcutOverrides"];
    remove?: (articleId: string) => Promise<void>;
    setArchived?: (articleId: string, archived: boolean) => Promise<void>;
    setPinned?: (articleId: string, pinned: boolean) => Promise<void>;
    reorderPinned?: (articleIds: string[]) => Promise<void>;
    notifyError?: Parameters<typeof RenderArticleLibraryPanel>[0]["mutations"]["notifyError"];
}) {
    return <RenderArticleLibraryPanel data={{ articles, selectedArticleId, collapsed, language }} navigation={{ selectArticle, setCollapsed, createBlank, openStyleProfile, openSettings, dispatcher, shortcutOverrides }} mutations={{ remove, setArchived, setPinned, reorderPinned, notifyError }} />;
}


// Product scenarios: workspace.library-management


const source: Article = {
    id: "source",
    title: "Mother Article",
    language: "en",
    currentRevisionId: "source-revision",
    currentRevision: { id: "source-revision", articleId: "source", content: "Source", provenance: { kind: "initial" }, createdAt: "2026-01-01T00:00:00.000Z" },
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
};


describe("ArticleLibraryPanel", () => {
    afterEach(() => {
        cleanup();
        window.skladnoUpdates = undefined;
    });


    it("uses the same brand icon in the expanded library and accessible expand button", async () => {
        const user = userEvent.setup();
        const setCollapsed = vi.fn();
        const panel = (collapsed: boolean) => <IntlProvider locale="en" messages={messages}>
            <ArticleLibraryPanel articles={[]} selectedArticleId={undefined} selectArticle={vi.fn()} collapsed={collapsed} setCollapsed={setCollapsed} createBlank={vi.fn()} openStyleProfile={vi.fn()} openSettings={vi.fn()} language="en" />
        </IntlProvider>;
        const { container, rerender } = render(panel(false));
        const expandedIcon = container.querySelector("header img");
        expect(expandedIcon?.getAttribute("src")).toContain("warplyn-light.svg");
        expect(expandedIcon?.classList.contains("dark:hidden")).toBe(true);
        const darkIcon = container.querySelector("header img.hidden");
        expect(darkIcon?.getAttribute("src")).toContain("warplyn.svg");
        expect(darkIcon?.classList.contains("dark:block")).toBe(true);
        expect(expandedIcon?.getAttribute("alt")).toBe("");
        const iconSource = expandedIcon?.getAttribute("src");

        rerender(panel(true));
        const expand = screen.getByRole("button", { name: getMessage("navigation.expandArticleLibrary") });
        expect(expand.querySelector("img")?.getAttribute("src")).toBe(iconSource);
        expect(expand.querySelector("img.hidden")?.getAttribute("src")).toBe(darkIcon?.getAttribute("src"));
        expect(expand.textContent).not.toContain("S");
        await user.click(expand);
        expect(setCollapsed).toHaveBeenCalledWith(false);
    });

    it("lists translation Articles beneath their source and keeps them selectable during search", async () => {
        const user = userEvent.setup();
        const selectArticle = vi.fn();
        const translation: Article = { ...source, id: "translation", title: "Spanish edition", language: "es", sourceArticleId: source.id, sourceRevisionId: source.currentRevisionId, sourceRevisionNumber: 1 };
        const other: Article = { ...source, id: "other", title: "Other Article" };
        const otherTranslation: Article = { ...translation, id: "other-translation", title: "Other Spanish edition", sourceArticleId: other.id };
        render(<IntlProvider locale="en" messages={messages}>
            <ArticleLibraryPanel articles={[translation, source, otherTranslation, other]} selectedArticleId={source.id} selectArticle={selectArticle} collapsed={false} setCollapsed={vi.fn()} createBlank={vi.fn()} openStyleProfile={vi.fn()} openSettings={vi.fn()} language="en" />
        </IntlProvider>);

        const sourceButton = screen.getByRole("button", { name: /Mother Article/ });
        const translationButton = screen.getByRole("button", { name: /Spanish edition/ });
        const otherButton = screen.getByRole("button", { name: /Other Article/ });
        expect(screen.getByText("Mother Article").title).toBe("Mother Article");
        expect(screen.getByText("Mother Article").classList.contains("truncate")).toBe(true);
        expect(sourceButton.classList.contains("py-1.5")).toBe(true);
        expect(sourceButton.dataset.focusAreaEntry).toBe("true");
        expect(translationButton.classList.contains("py-1")).toBe(true);
        expect(screen.getByText("Spanish edition").classList.contains("text-xs")).toBe(true);
        expect(sourceButton.getAttribute("aria-expanded")).toBe("true");
        expect(otherButton.getAttribute("aria-expanded")).toBe("false");
        expect(screen.queryByRole("button", { name: /Other Spanish edition/ })).toBeNull();
        expect(otherButton.querySelector("svg")?.classList.contains("transition-transform")).toBe(true);
        expect(screen.getByText("Other Spanish edition").closest("[aria-hidden]")?.classList.contains("grid-rows-[0fr]")).toBe(true);
        expect(sourceButton.compareDocumentPosition(translationButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        await user.type(screen.getByRole("textbox", { name: getMessage("navigation.searchArticles") }), "Other Spanish");
        await user.click(screen.getByRole("button", { name: /Other Spanish edition/ }));
        expect(screen.getByRole("button", { name: /Other Article/ })).toBeTruthy();
        expect(selectArticle).toHaveBeenCalledWith("other-translation");
    });


    it("updates grouped children and their order when the Article list changes", () => {
        const other: Article = { ...source, id: "other", title: "Other Article" };
        const translation: Article = { ...source, id: "translation", title: "Spanish edition", sourceArticleId: source.id };
        const added: Article = { ...translation, id: "added", title: "Portuguese edition" };
        const panel = (articles: Article[], selectedArticleId = source.id) => <IntlProvider locale="en" messages={messages}>
            <ArticleLibraryPanel articles={articles} selectedArticleId={selectedArticleId} selectArticle={vi.fn()} collapsed={false} setCollapsed={vi.fn()} createBlank={vi.fn()} openStyleProfile={vi.fn()} openSettings={vi.fn()} language="en" />
        </IntlProvider>;
        const { rerender } = render(panel([source, translation, other]));
        expect(screen.getByRole("button", { name: /Spanish edition/ })).toBeTruthy();

        rerender(panel([source, added, translation, other]));
        const first = screen.getByRole("button", { name: /Portuguese edition/ });
        const second = screen.getByRole("button", { name: /Spanish edition/ });
        expect(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

        rerender(panel([source, { ...translation, sourceArticleId: other.id }, other]));
        expect(screen.queryByRole("button", { name: /Portuguese edition/ })).toBeNull();
        expect(screen.queryByRole("button", { name: /Spanish edition/ })).toBeNull();
        expect(screen.getByRole("button", { name: /Mother Article/ }).hasAttribute("aria-expanded")).toBe(false);

        rerender(panel([source, { ...translation, sourceArticleId: other.id }, other], other.id));
        const otherButton = screen.getByRole("button", { name: /Other Article/ });
        const moved = screen.getByRole("button", { name: /Spanish edition/ });
        expect(otherButton.compareDocumentPosition(moved) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });


    it("moves between Library controls with Up and Down without taking search editing keys", () => {
        render(<IntlProvider locale="en" messages={messages}>
            <ArticleLibraryPanel articles={[source]} selectedArticleId={source.id} selectArticle={vi.fn()} collapsed={false} setCollapsed={vi.fn()} createBlank={vi.fn()} openStyleProfile={vi.fn()} openSettings={vi.fn()} language="en" />
        </IntlProvider>);

        const article = screen.getByRole("button", { name: /Mother Article/ });
        article.focus();
        fireEvent.keyDown(article, { key: "ArrowDown" });
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Style Profile" }));

        const search = screen.getByRole("textbox", { name: getMessage("navigation.searchArticles") });
        search.focus();
        expect(fireEvent.keyDown(search, { key: "ArrowDown" })).toBe(true);
        expect(document.activeElement).toBe(search);
    });



    it("shows the icon-only update control beside Settings when an update is available", async () => {
        window.skladnoUpdates = {
            getState: vi.fn().mockResolvedValue({ kind: "available", currentVersion: "0.1.0-preview.1", version: "0.1.1-preview.1", title: "Preview", summary: "", releaseNotesUrl: "https://example.test/release", security: false, automaticChecks: true, includePrereleases: true, networkAccess: true }),
            setNetworkAccess: vi.fn(), setAutomaticChecks: vi.fn(), setIncludePrereleases: vi.fn(), checkNow: vi.fn(), download: vi.fn(), restartAndUpdate: vi.fn(), openReleaseNotes: vi.fn(), openRecoveryGuide: vi.fn(), rendererReady: vi.fn(), subscribe: () => () => undefined,
        } satisfies DesktopUpdateClient;
        render(<IntlProvider locale="en" messages={messages}>
            <ArticleLibraryPanel articles={[]} selectedArticleId={undefined} selectArticle={vi.fn()} collapsed={false} setCollapsed={vi.fn()} createBlank={vi.fn()} openStyleProfile={vi.fn()} openSettings={vi.fn()} language="en" />
        </IntlProvider>);

        const updateButton = await screen.findByRole("button", { name: "Update 0.1.1-preview.1 is available" });
        expect(updateButton.textContent).not.toContain(getMessage("settings.updates"));
        expect(updateButton.parentElement?.querySelector("span")?.textContent).toBe("EN · Local");
        expect(updateButton.parentElement?.classList.contains("relative")).toBe(true);
        expect(updateButton.classList.contains("absolute")).toBe(true);
        expect(updateButton.classList.contains("hover:bg-brand-soft")).toBe(true);
    });


    it("opens a row context menu without selecting the row and offers group actions", () => {
        const selectArticle = vi.fn();
        const setArchived = vi.fn().mockResolvedValue(undefined);
        render(<IntlProvider locale="en" messages={messages}>
            <ArticleLibraryPanel articles={[source]} selectedArticleId={undefined} selectArticle={selectArticle} collapsed={false} setCollapsed={vi.fn()} createBlank={vi.fn()} openStyleProfile={vi.fn()} openSettings={vi.fn()} language="en" setArchived={setArchived} />
        </IntlProvider>);

        fireEvent.contextMenu(screen.getByRole("button", { name: /Mother Article/ }));
        expect(selectArticle).not.toHaveBeenCalled();
        expect(screen.getByRole("menuitem", { name: "Pin" })).toBeTruthy();
        fireEvent.click(screen.getByRole("menuitem", { name: "Archive" }));
        expect(setArchived).toHaveBeenCalledWith("source", true);
    });


    it("offers only Delete for a translation row", () => {
        const translation: Article = { ...source, id: "translation", title: "Spanish edition", sourceArticleId: source.id, sourceRevisionId: source.currentRevisionId };
        render(<IntlProvider locale="en" messages={messages}>
            <ArticleLibraryPanel articles={[source, translation]} selectedArticleId="translation" selectArticle={vi.fn()} collapsed={false} setCollapsed={vi.fn()} createBlank={vi.fn()} openStyleProfile={vi.fn()} openSettings={vi.fn()} language="en" />
        </IntlProvider>);

        fireEvent.contextMenu(screen.getByRole("button", { name: /Spanish edition/ }));
        expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toEqual(["Delete"]);
    });
});
