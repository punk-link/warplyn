import { $createRangeSelection, $getRoot, createEditor, type LexicalEditor } from "lexical";
import { resolveEditorNoteAnchor, type EditorNoteAnchor } from "@skladno/shared";
import { articleEditorNodes } from "./article-editor-config.js";
import { importArticleMarkdown } from "./markdown.js";
import { captureAssistantSelection } from "./ArticleEditorPlugins.js";


function pointAtTextOffset(root: HTMLElement, offset: number): { node: Text; offset: number } | undefined {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let current = walker.nextNode();
    while (current) {
        if (current instanceof Text && offset <= current.length)
            return { node: current, offset };

        offset -= current.textContent?.length ?? 0;
        current = walker.nextNode();
    }

    return undefined;
}


function textOffsetAtMarkdownBoundary(editor: LexicalEditor, node: { key: string; length: number }, offset: number): number | undefined {
    let low = 0;
    let high = node.length;

    while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const selection = editor.getEditorState().read(() => {
            const range = $createRangeSelection();
            range.anchor.set(node.key, middle, "text");
            range.focus.set(node.key, middle, "text");

            return range;
        });

        const snapshot = captureAssistantSelection(editor, selection);
        if (!snapshot)
            return undefined;

        if (snapshot.startOffset === offset)
            return middle;

        if (snapshot.startOffset < offset)
            low = middle + 1;
        else
            high = middle - 1;
    }

    return undefined;
}


function markdownBoundary(editor: LexicalEditor, offset: number): { node: Text; offset: number } | undefined {
    const nodes = editor.getEditorState().read(() => $getRoot().getAllTextNodes().map((node) => ({
        key: node.getKey(), length: node.getTextContentSize(),
    })));

    for (const node of nodes) {
        const textOffset = textOffsetAtMarkdownBoundary(editor, node, offset);
        const element = editor.getElementByKey(node.key);

        if (textOffset !== undefined && element)
            return pointAtTextOffset(element, textOffset);
    }

    return undefined;
}


export function getEditorNoteRange(editor: LexicalEditor, content: string, anchor: EditorNoteAnchor): Range | undefined {
    const resolved = resolveEditorNoteAnchor(content, anchor);
    const root = editor.getRootElement();
    if (!resolved || !root)
        return undefined;

    const visible = root.textContent ?? "";
    const visibleStart = visible.indexOf(anchor.quote);
    if (anchor.quote === anchor.preview && visibleStart >= 0 && visible.lastIndexOf(anchor.quote) === visibleStart) {
        const first = pointAtTextOffset(root, visibleStart);
        const last = pointAtTextOffset(root, visibleStart + anchor.quote.length);
        if (first && last) {
            const range = document.createRange();
            range.setStart(first.node, first.offset);
            range.setEnd(last.node, last.offset);
            return range;
        }
    }

    const nonce = crypto.randomUUID().replaceAll("-", "");
    const startMarker = `notestart${nonce}`;
    const endMarker = `noteend${nonce}`;
    const marked = content.slice(0, resolved.startOffset) + startMarker + anchor.quote + endMarker + content.slice(resolved.endOffset);
    const snapshot = createEditor({
        namespace: "note-range", nodes: articleEditorNodes, onError: (error) => {
            throw error;
        }
    });

    snapshot.update(() => importArticleMarkdown(marked), { discrete: true });
    const flat = snapshot.getEditorState().read(() => $getRoot().getAllTextNodes().map((node) => node.getTextContent()).join(""));
    const start = flat.indexOf(startMarker);
    const end = flat.indexOf(endMarker) - startMarker.length;
    const matches = start >= 0 && end >= start && flat.replace(startMarker, "").replace(endMarker, "") === root.textContent;
    const first = matches ? pointAtTextOffset(root, start) : markdownBoundary(editor, resolved.startOffset);
    const last = matches ? pointAtTextOffset(root, end) : markdownBoundary(editor, resolved.endOffset);
    if (!first || !last)
        return undefined;

    const range = document.createRange();
    range.setStart(first.node, first.offset);
    range.setEnd(last.node, last.offset);

    return range;
}
