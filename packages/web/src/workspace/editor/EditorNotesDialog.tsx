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
    const [reattachment] = useState(capture);
    const [selected, setSelected] = useState(() => {
        if (initialNote || !reattachment)
            return initialNote;

        return { id: crypto.randomUUID(), version: 0, text: "", anchor: reattachment };
    });
    const [text, setText] = useState(initialNote?.text ?? "");
    const [pending, setPending] = useState(false);
    const [failed, setFailed] = useState(false);
    const [anchor, setAnchor] = useState(selected?.anchor);
    const dialog = useRef<HTMLDialogElement>(null);
    const [discardAction, setDiscardAction] = useState<(() => void)>();
    const dirty = Boolean(selected && (text !== selected.text || anchor !== selected.anchor));


    function navigate(action: () => void) {
        if (dirty)
            setDiscardAction(() => action);
        else
            action();
    }


    function keepEditing() {
        setDiscardAction(undefined);
        dialog.current?.querySelector("textarea")?.focus();
    }


    useLayoutEffect(() => {
        const element = dialog.current;
        if (element && typeof element.showModal === "function")
            element.showModal();
        else
            element?.setAttribute("open", "");

        const guidance = element?.querySelector("textarea");
        guidance?.focus();
        guidance?.select();

        return () => element?.close?.();
    }, []);


    async function change(input: EditorNoteChange) {
        setDiscardAction(undefined);
        setPending(true);
        setFailed(false);

        try {
            await binding.change(input);
            if (input.kind === "save" || selected?.id === input.id) {
                setSelected(undefined);
                setText("");
                setAnchor(undefined);
            }
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
        dialog.current?.querySelector("textarea")?.focus();
    }


    const selectedIndex = binding.items.findIndex((note) => note.id === selected?.id);

    return <Dialog
        ref={dialog}
        aria-labelledby="editor-notes-title"
        onCancel={(event) => {
            event.preventDefault();
            if (discardAction)
                keepEditing();
            else if (!pending)
                navigate(close);
        }}
        className="w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl">
        <h2 id="editor-notes-title" className="text-base font-semibold">{intl.formatMessage({ id: "notes.title" })}</h2>
        <p className="mt-2 text-xs text-muted">{intl.formatMessage({ id: "notes.help" })}</p>
        {!reattachment && !selected && <p className="mt-4 text-xs text-muted">{intl.formatMessage({ id: "notes.select" })}</p>}
        {selected && anchor && <>
            <blockquote className="mt-4 max-h-32 overflow-auto border-l-2 border-border pl-3 text-sm text-muted">
                {selectedIndex >= 0 && `${intl.formatNumber(selectedIndex + 1)}. `}{anchor.preview}
            </blockquote>
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
            <div className="mt-3 flex justify-end gap-2">
                <Button disabled={pending || !text.trim()} onClick={() => void change({
                    kind: "save", id: selected.id, expectedVersion: selected.version, text, anchor,
                })}>{intl.formatMessage({ id: "notes.save" })}
                </Button>
            </div>
        </>}
        <section className="mt-5 max-h-96 overflow-auto border-y border-border px-2 divide-y divide-border">
            {binding.items.length === 0 && <p className="py-3 text-sm text-muted">{intl.formatMessage({ id: "notes.empty" })}</p>}
            {binding.items.map((note, index) => (
                <div key={note.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
                    <div className="min-w-0 flex-1 basis-64">
                        <Button
                            variant="quiet"
                            className="justify-start text-left !py-0"
                            disabled={pending || !resolveEditorNoteAnchor(content, note.anchor)}
                            onClick={() => navigate(() => locate(note))}>
                            {intl.formatNumber(index + 1)}. {note.anchor.preview}
                        </Button>
                        <p className="truncate text-sm">{note.text}</p>
                        {!resolveEditorNoteAnchor(content, note.anchor) &&
                        <p className="mt-1 text-xs text-warning">{intl.formatMessage({ id: "notes.detached" })}</p>}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <Button variant="quiet" disabled={pending} onClick={() => navigate(() => edit(note))}>
                            {intl.formatMessage({ id: "notes.edit" })}
                        </Button>
                        <Button variant="quiet" disabled={pending} onClick={() => navigate(() => void change({
                            kind: "remove", id: note.id, expectedVersion: note.version,
                        }))}>{intl.formatMessage({ id: "settings.remove" })}
                        </Button>
                    </div>
                </div>
            ))}
        </section>
        {failed && <p role="alert" className="mt-3 text-sm text-danger">{intl.formatMessage({ id: "notes.failed" })}</p>}
        {discardAction && (
            <div role="alert" className="mt-3">
                <p className="text-sm">{intl.formatMessage({ id: "notes.discardPrompt" })}</p>
                <div className="mt-2 flex justify-end gap-2">
                    <Button variant="secondary" autoFocus onClick={keepEditing}>
                        {intl.formatMessage({ id: "editor.cancel" })}
                    </Button>
                    <Button variant="danger" onClick={() => {
                        setDiscardAction(undefined);
                        discardAction();
                    }}>{intl.formatMessage({ id: "notes.discardChanges" })}
                    </Button>
                </div>
            </div>
        )}
        {!discardAction && (
            <div className="mt-5 flex justify-end gap-2">
                <Button variant="secondary" disabled={pending} onClick={() => navigate(close)}>
                    {intl.formatMessage({ id: "editor.cancel" })}
                </Button>
            </div>
        )}
    </Dialog>;
}
