import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ArticleSummary } from "@skladno/shared";
import { messages } from "../../i18n/messages.js";
import { KeyBindingDispatcher } from "../../key-bindings/dispatcher.js";
import { ArticleLibraryPanel } from "./ArticleLibraryPanel.js";


// Product scenarios: workspace.library.rail-navigation


const original: ArticleSummary = {
    id: "original", title: "Pinned story", language: "en", pinOrder: 0,
    currentRevisionId: "revision", createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z",
};
const recent: ArticleSummary = { ...original, id: "recent", title: "Recent story", pinOrder: undefined };
const archived: ArticleSummary = { ...original, id: "archived", title: "Archived story", archived: true };
const translation: ArticleSummary = { ...archived, id: "translation", title: "Spanish edition", language: "es", sourceArticleId: archived.id };


function setup({ articles = [original, recent, archived, translation], collapsed = true, responsiveCollapsed }: { articles?: ArticleSummary[]; collapsed?: boolean; responsiveCollapsed?: boolean } = {}) {
    const navigation = {
        selectArticle: vi.fn(), setCollapsed: vi.fn(), createBlank: vi.fn().mockResolvedValue(undefined),
        openStyleProfile: vi.fn(), openSettings: vi.fn(), dispatcher: new KeyBindingDispatcher(),
    };
    const mutations = { setArchived: vi.fn().mockResolvedValue(undefined), setPinned: vi.fn().mockResolvedValue(undefined) };
    const panel = (isCollapsed: boolean) => <IntlProvider locale="en" messages={messages}>
        <ArticleLibraryPanel data={{ articles, selectedArticleId: original.id, collapsed: isCollapsed, language: "en" }} navigation={navigation} mutations={mutations} responsiveCollapsed={responsiveCollapsed} />
        <button type="button">Outside</button>
    </IntlProvider>;
    const result = render(panel(collapsed));
    return { ...result, navigation, mutations, rerenderPanel: (isCollapsed: boolean) => result.rerender(panel(isCollapsed)) };
}


describe("Library Rail", () => {
    afterEach(cleanup);


    it("offers creation and opens pinned/recent Articles without expanding the Rail", async () => {
        const user = userEvent.setup();
        const { navigation } = setup();
        const articles = screen.getByRole("button", { name: "Articles" });
        expect(screen.queryByRole("navigation")).toBeNull();
        await user.click(articles);
        expect(articles.getAttribute("aria-expanded")).toBe("true");
        expect(articles.getAttribute("aria-pressed")).toBe("true");
        expect(screen.getByText("Pinned")).toBeTruthy();
        expect(screen.getByText("Recent")).toBeTruthy();
        expect(screen.queryByRole("button", { name: /Archived story/ })).toBeNull();
        expect(document.activeElement).toBe(within(screen.getByRole("navigation")).getByRole("button", { name: /Pinned story/ }));
        await user.click(screen.getByRole("button", { name: /Recent story/ }));
        expect(navigation.selectArticle).toHaveBeenCalledWith(recent.id);
        expect(screen.queryByRole("navigation")).toBeNull();
        expect(document.activeElement).toBe(articles);
        expect(navigation.setCollapsed).not.toHaveBeenCalled();
        await user.click(screen.getByRole("button", { name: "New article" }));
        expect(navigation.createBlank).toHaveBeenCalledOnce();
    });


    it("searches archived translations and supports Enter to enter results", async () => {
        const user = userEvent.setup();
        const { navigation } = setup();
        const search = screen.getByRole("button", { name: "Search articles" });
        await user.click(search);
        const field = screen.getByRole("textbox", { name: "Search articles" });
        expect(document.activeElement).toBe(field);
        await user.type(field, "Spanish");
        expect(within(screen.getByRole("navigation")).queryByRole("button", { name: /Pinned story/ })).toBeNull();
        const row = screen.getByRole("button", { name: /Spanish edition/ });
        expect(fireEvent.keyDown(field, { key: "ArrowDown" })).toBe(true);
        expect(document.activeElement).toBe(field);
        await user.keyboard("{Enter}{ArrowDown}{Enter}");
        expect(navigation.selectArticle).toHaveBeenCalledWith(translation.id);
        expect(screen.queryByRole("textbox")).toBeNull();
        expect(document.activeElement).toBe(search);
        expect(row.isConnected).toBe(false);
    });


    it("shows only Archive groups, including empty Archive and unmatched search states", async () => {
        const user = userEvent.setup();
        setup();
        await user.click(screen.getByRole("button", { name: "Archive" }));
        expect(screen.getByRole("button", { name: /Archived story/ })).toBeTruthy();
        expect(within(screen.getByRole("navigation")).queryByRole("button", { name: /Pinned story/ })).toBeNull();
        await user.type(screen.getByRole("textbox"), "missing");
        expect(screen.getByText("No articles match your search.")).toBeTruthy();
        cleanup();
        setup({ articles: [] });
        await user.click(screen.getByRole("button", { name: "Archive" }));
        expect(screen.getByText("No archived articles.")).toBeTruthy();
    });


    it("dismisses with Escape, a repeated Rail action, outside click, and focus leaving", async () => {
        const user = userEvent.setup();
        setup();
        const articles = screen.getByRole("button", { name: "Articles" });
        await user.click(articles);
        await user.keyboard("{Escape}");
        expect(screen.queryByRole("navigation")).toBeNull();
        expect(document.activeElement).toBe(articles);
        await user.click(articles);
        await user.click(articles);
        expect(screen.queryByRole("navigation")).toBeNull();
        await user.click(articles);
        await user.click(screen.getByRole("button", { name: "Outside" }));
        expect(screen.queryByRole("navigation")).toBeNull();
        await user.click(articles);
        act(() => screen.getByRole("button", { name: "Outside" }).focus());
        expect(screen.queryByRole("navigation")).toBeNull();
    });


    it("opens and focuses Search through the shortcut in a responsively collapsed Rail", () => {
        const { navigation } = setup({ collapsed: false, responsiveCollapsed: true });
        act(() => navigation.dispatcher.dispatch({ key: "f", ctrlKey: true, metaKey: false, shiftKey: false, altKey: false, repeat: false, isComposing: false, target: document.body, preventDefault: vi.fn() }));
        expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "Search articles" }));
        expect(navigation.setCollapsed).not.toHaveBeenCalled();
    });


    it("preserves portaled context actions and keeps Escape local to their menu", async () => {
        const user = userEvent.setup();
        const { mutations } = setup();
        await user.click(screen.getByRole("button", { name: "Articles" }));
        fireEvent.contextMenu(within(screen.getByRole("navigation")).getByRole("button", { name: /Pinned story/ }));
        await user.keyboard("{Escape}");
        expect(screen.queryByRole("menu")).toBeNull();
        expect(screen.getByRole("navigation")).toBeTruthy();
        fireEvent.contextMenu(within(screen.getByRole("navigation")).getByRole("button", { name: /Pinned story/ }));
        await user.click(within(screen.getByRole("menu")).getByRole("menuitem", { name: "Archive" }));
        expect(mutations.setArchived).toHaveBeenCalledWith(original.id, true);
        expect(screen.getByRole("navigation")).toBeTruthy();
    });


    it("returns to the expanded Library without leaving a drawer open", async () => {
        const user = userEvent.setup();
        const { rerenderPanel } = setup();
        await user.click(screen.getByRole("button", { name: "Articles" }));
        rerenderPanel(false);
        expect(screen.queryByRole("button", { name: "Close Article Library Panel" })).toBeNull();
        expect(screen.getByRole("textbox", { name: "Search articles" })).toBeTruthy();
        rerenderPanel(true);
        expect(screen.queryByRole("navigation")).toBeNull();
    });


    it("keeps the drawer available while a row deletion asks for confirmation", async () => {
        const user = userEvent.setup();
        setup();
        await user.click(screen.getByRole("button", { name: "Articles" }));
        fireEvent.contextMenu(within(screen.getByRole("navigation")).getByRole("button", { name: /Pinned story/ }));
        await user.click(screen.getByRole("menuitem", { name: "Delete" }));
        const dialog = screen.getByRole("dialog");
        await user.click(within(dialog).getByRole("button", { name: "Cancel" }));
        expect(screen.getByRole("navigation")).toBeTruthy();
        expect(screen.queryByRole("dialog")).toBeNull();
    });


    it("lists active pinned originals in pin order and selects them directly", async () => {
        const user = userEvent.setup();
        const earlier = { ...original, id: "earlier", title: "Earlier pin", pinOrder: 0 };
        const later = { ...original, pinOrder: 1 };
        const child = { ...original, id: "child", title: "Pinned translation", sourceArticleId: original.id };
        const { navigation } = setup({ articles: [later, archived, child, recent, earlier] });
        const pins = within(screen.getByRole("group", { name: "Pinned" })).getAllByRole("button");
        expect(pins.map((pin) => pin.title)).toEqual(["Earlier pin", "Pinned story"]);
        expect(pins[1]?.getAttribute("aria-current")).toBe("page");
        expect(pins[1]?.dataset.focusAreaEntry).toBe("true");
        expect(pins[0]?.textContent).toBe("EA");
        await user.click(pins[0]!);
        expect(navigation.selectArticle).toHaveBeenCalledWith(earlier.id);
        expect(navigation.setCollapsed).not.toHaveBeenCalled();
        expect(screen.queryByRole("navigation")).toBeNull();
        await user.click(screen.getByRole("button", { name: "Articles" }));
        await user.click(pins[0]!);
        expect(screen.queryByRole("navigation")).toBeNull();
        expect(document.activeElement).toBe(pins[0]);
    });


    it("omits the pinned shortcut group when there are no active pins", () => {
        setup({ articles: [archived, recent] });
        expect(screen.queryByRole("group", { name: "Pinned" })).toBeNull();
    });
});
