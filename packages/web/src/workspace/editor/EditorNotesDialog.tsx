import { useLayoutEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { resolveEditorNoteAnchor, type EditorNote, type EditorNoteAnchor, type EditorNoteChange } from "@skladno/shared";
import { Button, Dialog, TextareaField } from "../../ui/primitives.js";
import type { EditorNotesBinding } from "./editor-notes-binding.js";


export function EditorNotesDialog({ binding, content, initialNote, capture, locate, close }: {
    binding: EditorNotesBinding; content: string; initialNote?: EditorNote;
    capture: () => EditorNoteAnchor | undefined; close: () => void;
    locate: (note: EditorNote) => void;
}) {
    const intl = useIntl();
    const [selected, setSelected] = useState(initialNote);
    const [text, setText] = useState(initialNote?.text ?? "");
    const [pending, setPending] = useState(false);
    const [failed, setFailed] = useState(false);
    const [anchor, setAnchor] = useState(initialNote?.anchor);
    const dialog = useRef<HTMLDialogElement>(null);
    const [reattachment] = useState(capture);

    useLayoutEffect(() => {
        const element = dialog.current;
        if (element && typeof element.showModal === "function")
            element.showModal();
        else
            element?.setAttribute("open", "");

        return () => element?.close?.();
    }, []);


    async function change(input: EditorNoteChange) {
        setPending(true);
        setFailed(false);

        try {
            await binding.change(input);
            close();
        } catch {
            setFailed(true);
        } finally {
            setPending(false);
        }
    }


    function edit(note: EditorNote) {
        setSelected(note);
        setText(note.text);
        setAnchor(note.anchor);
    }


    return <Dialog
        ref={dialog}
        aria-labelledby="editor-notes-title"
        onCancel={(event) => {
            event.preventDefault();
            if (!pending)
                close();
        }}
        className="w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl">
        <h2 id="editor-notes-title" className="text-base font-semibold">{intl.formatMessage({ id: "notes.title" })}</h2>
        <p className="mt-2 text-xs text-muted">{intl.formatMessage({ id: "notes.help" })}</p>
        {!selected && (
            <div className="mt-4 max-h-96 overflow-auto divide-y divide-border">
                {binding.items.length === 0 && <p className="text-sm text-muted">{intl.formatMessage({ id: "notes.empty" })}</p>}
                {binding.items.map((note, index) => (
                    <div key={note.id} className="py-3">
                        <Button variant="quiet" disabled={!resolveEditorNoteAnchor(content, note.anchor)} onClick={() => locate(note)}>
                            {intl.formatNumber(index + 1)}. {note.anchor.preview}
                        </Button>
                        <p className="mt-1 whitespace-pre-wrap text-sm">{note.text}</p>
                        {!resolveEditorNoteAnchor(content, note.anchor) &&
                            <p className="mt-1 text-xs text-warning">{intl.formatMessage({ id: "notes.detached" })}</p>}
                        <Button variant="quiet" onClick={() => edit(note)}>{intl.formatMessage({ id: "notes.edit" })}</Button>
                    </div>
                ))}
            </div>
        )}
        {selected && anchor && <>
            <blockquote className="mt-4 max-h-32 overflow-auto border-l-2 border-border pl-3 text-sm text-muted">{anchor.preview}</blockquote>
            {!resolveEditorNoteAnchor(content, anchor) && (
                <div className="mt-2">
                    <p className="text-xs text-warning">{intl.formatMessage({ id: "notes.detached" })}</p>
                    <Button variant="quiet" disabled={pending || !reattachment} onClick={() => {
                        const replacement = reattachment;
                        if (replacement)
                            setAnchor(replacement);
                    }}>{intl.formatMessage({ id: "notes.reattach" })}
                    </Button>
                    <p className="text-xs text-muted">{intl.formatMessage({ id: "notes.reattachHelp" })}</p>
                </div>
            )}
            <label className="field-label mt-4">{intl.formatMessage({ id: "notes.guidance" })}
                <TextareaField
                    autoFocus
                    rows={5}
                    maxLength={10000}
                    value={text}
                    disabled={pending}
                    onChange={(event) => setText(event.target.value)} />
            </label>
        </>}
        {failed && <p role="alert" className="mt-3 text-sm text-danger">{intl.formatMessage({ id: "notes.failed" })}</p>}
        <div className="mt-5 flex justify-end gap-2">
            <Button variant="quiet" disabled={pending} onClick={close}>{intl.formatMessage({ id: "editor.cancel" })}</Button>
            {selected && selected.version > 0 && (
                <Button variant="danger" disabled={pending} onClick={() => void change({
                    kind: "remove", id: selected.id, expectedVersion: selected.version,
                })}>{intl.formatMessage({ id: "notes.remove" })}
                </Button>
            )}
            {selected && anchor && (
                <Button disabled={pending || !text.trim()} onClick={() => void change({
                    kind: "save", id: selected.id, expectedVersion: selected.version, text, anchor,
                })}>{intl.formatMessage({ id: "notes.save" })}
                </Button>
            )}
        </div>
    </Dialog>;
}
