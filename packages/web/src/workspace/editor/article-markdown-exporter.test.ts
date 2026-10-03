import { HEADING } from "@lexical/markdown";
import { $createParagraphNode, $createTextNode, $getRoot, createEditor, type LexicalEditor } from "lexical";
import { describe, expect, it, vi } from "vitest";
import { articleEditorNodes } from "./article-editor-config.js";
import { createArticleMarkdownExporter } from "./article-markdown-exporter.js";
import { exportArticleMarkdown, importArticleMarkdown } from "./markdown.js";


function createCachedEditor() {
    const editor = createEditor({ nodes: articleEditorNodes, onError: (error) => {
        throw error;
    } });
    const exporter = createArticleMarkdownExporter();
    let markdown = "";
    editor.registerUpdateListener(({ editorState, dirtyElements }) => {
        exporter.invalidate(dirtyElements);
        editorState.read(() => {
            markdown = exporter.export();
            expect(markdown).toBe(exportArticleMarkdown());
        });
    });
    return { editor, markdown: () => markdown };
}


function update(editor: LexicalEditor, change: () => void) {
    editor.update(change, { discrete: true });
}


describe("Article Markdown block cache", () => {
    it("matches full export after nested edits, formatting, insertion, reordering, deletion, and state restoration", () => {
        const { editor, markdown } = createCachedEditor();
        update(editor, () => importArticleMarkdown("# Title\n\nA **bold** café 🙂.\n\n- First\n- Second\n\n> Quote\n\n```js\nconst x = 1;\n```"));
        const original = editor.getEditorState();
        const originalMarkdown = markdown();

        update(editor, () => {
            const text = $getRoot().getAllTextNodes().find((node) => node.getTextContent() === "Second");
            if (!text)
                throw new Error("Missing list fixture");

            text.setTextContent("Changed 🙂");
            text.toggleFormat("italic");
        });
        expect(markdown()).toContain("*Changed 🙂*");
        update(editor, () => $getRoot().append($createParagraphNode().append($createTextNode("Added"))));
        expect(markdown()).toContain("Added");
        update(editor, () => {
            const root = $getRoot();
            const first = root.getFirstChildOrThrow();
            root.append(first);
        });
        expect(markdown()).toMatch(/# Title$/);
        update(editor, () => $getRoot().getAllTextNodes()[0].getTopLevelElementOrThrow().remove());
        expect(markdown()).not.toContain("café");
        editor.setEditorState(original);
        expect(markdown()).toBe(originalMarkdown);
        update(editor, () => importArticleMarkdown("Replacement [link](https://example.test/a(b))\n\n```\n[code](a(b))\n```"));
        expect(markdown()).toContain("a%28b%29");
        expect(markdown()).toContain("[code](a(b))");
    });

    it("does not format an unchanged heading again and invalidates it when its text changes", () => {
        const headingExport = vi.spyOn(HEADING, "export");
        try {
            const editor = createEditor({ nodes: articleEditorNodes, onError: (error) => {
                throw error;
            } });
            const exporter = createArticleMarkdownExporter();
            editor.registerUpdateListener(({ editorState, dirtyElements }) => {
                exporter.invalidate(dirtyElements);
                editorState.read(() => exporter.export());
            });
            update(editor, () => importArticleMarkdown("# Heading\n\nParagraph"));
            headingExport.mockClear();
            update(editor, () => $getRoot().getAllTextNodes()[1].setTextContent("Edited paragraph"));
            expect(headingExport).not.toHaveBeenCalled();
            update(editor, () => $getRoot().getAllTextNodes()[0].setTextContent("Edited heading"));
            expect(headingExport).toHaveBeenCalledOnce();
            editor.getEditorState().read(() => expect(exporter.export()).toBe("# Edited heading\n\nEdited paragraph"));
        } finally {
            headingExport.mockRestore();
        }
    });
});
