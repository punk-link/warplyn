import { createEditor } from "lexical";
import { describe, expect, it } from "vitest";
import { createEditorNoteAnchor } from "@skladno/shared";
import { articleEditorNodes } from "./article-editor-config.js";
import { exportArticleMarkdown, importArticleMarkdown } from "./markdown.js";
import { getEditorNoteRange } from "./editor-note-range.js";

describe("editor note passage ranges", () => {
    it.each([
        ["before selected after", "selected", "selected"],
        ["before **selected** after", "selected", "selected"],
        ["# Heading\n\nFirst paragraph.\n\nSecond paragraph.", "Heading", "Heading"],
        ["First paragraph.\n\nSecond paragraph.", "First paragraph.\n\nSecond", "First paragraph.Second"],
        ["Use `some_code` and [a link](https://example.test).", "some_code", "some_code"],
        ["Use café ☕ and текст.", "café ☕", "café ☕"],
        ["Use a\\*b with care.", "a\\*b", "a*b"],
    ])("finds %s without changing the editor", (source, quote, expected) => {
        const editor = createEditor({ namespace: "notes-range", nodes: articleEditorNodes, onError: (error) => {
            throw error;
        } });
        const root = document.createElement("div");
        document.body.append(root);
        editor.setRootElement(root);
        try {
            editor.update(() => importArticleMarkdown(source), { discrete: true });
            const content = editor.getEditorState().read(exportArticleMarkdown);
            const start = content.indexOf(quote);
            expect(start).toBeGreaterThanOrEqual(0);
            const state = editor.getEditorState().toJSON();
            const range = getEditorNoteRange(editor, content, createEditorNoteAnchor(content, start, start + quote.length, expected));
            expect(range?.toString()).toBe(expected);
            expect(editor.getEditorState().toJSON()).toEqual(state);
            expect(root.querySelector("button")).toBeNull();
        } finally {
            editor.setRootElement(null);
            root.remove();
        }
    });
});
