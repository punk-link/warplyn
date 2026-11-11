import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { ArticleRichEditor } from "./ArticleRichEditor.js";
import { renderLocalized } from "../EditorialWorkspace.test-utils.js";
import { NotificationProvider } from "../../notifications/NotificationProvider.js";
import { createEditor, $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import { ArticleEditorContextMenu } from "./ArticleEditorContextMenu.js";
import { EditorSkillContext } from "./editor-skill-context.js";
import type { AssistantSkillSummary } from "@skladno/shared";

afterEach(cleanup);

it("opens the existing link control with Ctrl+K without editing the Article", async () => {
    const setContent = vi.fn();
    const view = renderLocalized(<NotificationProvider><ArticleRichEditor
        articleId="link-shortcut" content="A paragraph" setContent={setContent} />
    </NotificationProvider>);
    const root = view.getByRole("textbox", { name: "Article draft" });
    await waitFor(() => expect(root.textContent).toBe("A paragraph"));
    fireEvent.keyDown(root, { key: "k", ctrlKey: true });
    expect(await view.findByRole("dialog")).toBeTruthy();
    expect(setContent).not.toHaveBeenCalled();
});
beforeEach(() => {
    Range.prototype.getBoundingClientRect = () => new DOMRect();
});

it("opens editing actions without changing content and returns focus on Escape", async () => {
    const setContent = vi.fn();
    const view = renderLocalized(<NotificationProvider><ArticleRichEditor
        articleId="menu-test" content="A paragraph" setContent={setContent} />
    </NotificationProvider>);
    const root = view.getByRole("textbox", { name: "Article draft" });
    await waitFor(() => expect(root.textContent).toBe("A paragraph"));
    fireEvent.contextMenu(root, { clientX: 25, clientY: 25 });
    const menu = await view.findByRole("menu", { name: "Editing actions" });
    expect(view.getByRole("menuitem", { name: "Undo" }).hasAttribute("disabled")).toBe(true);
    expect(view.getByRole("menuitem", { name: "Skills" }).hasAttribute("disabled")).toBe(true);
    expect(setContent).not.toHaveBeenCalled();
    fireEvent.keyDown(menu, { key: "Escape" });
    await waitFor(() => expect(view.queryByRole("menu")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(root));
    expect(setContent).not.toHaveBeenCalled();
});

it("opens using Shift+F10 without invoking an edit", async () => {
    const setContent = vi.fn();
    const view = renderLocalized(<NotificationProvider><ArticleRichEditor
        articleId="keyboard-menu" content="Paragraph" setContent={setContent} />
    </NotificationProvider>);
    const root = view.getByRole("textbox", { name: "Article draft" });
    await waitFor(() => expect(root.textContent).toBe("Paragraph"));
    fireEvent.keyDown(root, { key: "F10", shiftKey: true });
    expect(await view.findByRole("menu", { name: "Editing actions" })).toBeTruthy();
    await waitFor(() => expect(view.getByRole("menu", { name: "Editing actions" }).contains(document.activeElement)).toBe(true));
    root.focus();
    await waitFor(() => expect(view.getByRole("menu").contains(document.activeElement)).toBe(true));
    fireEvent.pointerDown(document.body);
    expect(view.queryByRole("menu")).toBeNull();
    expect(setContent).not.toHaveBeenCalled();
});

it("preserves selected text and orders built-in Skills before alphabetical Author Skills", async () => {
    const editor = createEditor({ namespace: "selection-menu", onError: (error) => {
        throw error;
    } });
    const root = document.createElement("div");
    root.contentEditable = "true";
    document.body.append(root);
    editor.setRootElement(root);
    editor.update(() => {
        const text = $createTextNode("Selected words");
        $getRoot().append($createParagraphNode().append(text));
        text.select(0, 8);
    }, { discrete: true });
    const prepare = vi.fn();
    const refresh = vi.fn().mockResolvedValue(undefined);
    const skills: AssistantSkillSummary[] = [
        { reference: { source: "author", id: "z", version: "1" }, name: "Zulu", description: "" },
        { reference: { source: "built-in", id: "first", version: "1" }, name: "First", description: "" },
        { reference: { source: "author", id: "a", version: "1" }, name: "Alpha", description: "", scopes: ["article"] },
        { reference: { source: "built-in", id: "translation", version: "2" }, name: "Translate text", description: "", scopes: ["article"] },
    ];
    const view = renderLocalized(<EditorSkillContext.Provider value={{ skills, prepare, refresh }}>
        <ArticleEditorContextMenu editor={editor} openLink={vi.fn()} />
    </EditorSkillContext.Provider>);
    editor.update(() => $getRoot().selectStart());
    fireEvent.contextMenu(root);
    expect(view.getByRole("menuitem", { name: "Skills" }).hasAttribute("disabled")).toBe(true);
    fireEvent.keyDown(view.getByRole("menu"), { key: "Escape" });
    editor.update(() => $getRoot().select(0, $getRoot().getChildrenSize()));
    fireEvent.contextMenu(root);
    await new Promise((resolve) => setTimeout(resolve, 0));
    fireEvent.click(await view.findByRole("menuitem", { name: "Skills" }));
    const entries = view.getAllByRole("menuitem");
    expect(entries.map((entry) => entry.textContent)).toEqual(["First", "Zulu"]);
    expect(view.queryByRole("menuitem", { name: "Alpha" })).toBeNull();
    expect(view.queryByRole("menuitem", { name: "Translate text" })).toBeNull();
    fireEvent.keyDown(view.getByRole("menu"), { key: "Escape" });
    const trigger = view.getByRole("menuitem", { name: "Skills" });
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    fireEvent.keyDown(trigger, { key: "ArrowRight" });
    fireEvent.click(view.getByRole("menuitem", { name: "Zulu" }));
    expect(prepare).toHaveBeenCalledWith(skills[0], false);
    expect(refresh).toHaveBeenCalledTimes(2);
    expect(root.textContent).toBe("Selected words");
    view.unmount();
    editor.setRootElement(null);
    root.remove();
});
