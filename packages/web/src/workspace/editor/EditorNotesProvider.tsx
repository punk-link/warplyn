import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { createEditorNoteAnchor, type EditorNote } from "@skladno/shared";
import { captureAssistantSelection } from "./ArticleEditorPlugins.js";
import { EditorNotesContext } from "./editor-notes-context.js";
import { EditorNotesDialog } from "./EditorNotesDialog.js";
import type { EditorNotesBinding } from "./editor-notes-binding.js";
import { getEditorNoteRange } from "./editor-note-range.js";


export function EditorNotesProvider({ binding, content, children }: {
    binding?: EditorNotesBinding; content: string; children: ReactNode;
}) {
    const [editor] = useLexicalComposerContext();
    const [canAdd, setCanAdd] = useState(false);
    const [dialog, setDialog] = useState<{ note?: EditorNote }>();

    useEffect(() => editor.registerUpdateListener(({ editorState }) => editorState.read(() => {
        const selection = $getSelection();
        setCanAdd($isRangeSelection(selection) && !selection.isCollapsed() && Boolean(selection.getTextContent().trim()));
    })), [editor]);

    const capture = useCallback(() => {
        const selection = editor.getEditorState().read(() => {
            const current = $getSelection();
            return $isRangeSelection(current) && !current.isCollapsed() ? current.clone() : undefined;
        });
        const snapshot = selection && captureAssistantSelection(editor, selection);
        return snapshot?.preview.trim()
            ? createEditorNoteAnchor(snapshot.markdown, snapshot.startOffset, snapshot.endOffset, snapshot.preview) : undefined;
    }, [editor]);

    const add = useCallback(() => {
        const anchor = capture();
        if (anchor)
            setDialog({ note: { id: crypto.randomUUID(), version: 0, text: "", anchor } });
    }, [capture]);

    if (!binding)
        return children;

    return <EditorNotesContext.Provider value={{ notes: binding.items, canAdd, add, open: (note) => setDialog({ note }) }}>
        {children}
        {dialog && (
            <EditorNotesDialog
                key={dialog.note?.id ?? "list"}
                binding={binding}
                content={content}
                initialNote={dialog.note}
                capture={capture}
                locate={(note) => {
                    const range = getEditorNoteRange(editor, content, note.anchor);
                    const parent = range?.startContainer.parentElement;
                    if (range && parent) {
                        setDialog(undefined);
                        editor.focus();
                        parent.scrollIntoView({ block: "center", behavior: "instant" });
                        window.getSelection()?.removeAllRanges();
                        window.getSelection()?.addRange(range);
                        document.dispatchEvent(new Event("selectionchange"));
                    }
                }}
                close={() => {
                    setDialog(undefined);
                    editor.focus();
                }} />
        )}
    </EditorNotesContext.Provider>;
}
