import { useContext, useLayoutEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useIntl } from "react-intl";
import { EditorNotesContext } from "./editor-notes-context.js";
import { getEditorNoteRange } from "./editor-note-range.js";

const highlightName = "warplyn-editor-note";


interface NoteMarker {
    id: string;
    number: number;
    left: number;
    top: number;
    range: Range;
}


function groupMarkers(markers: NoteMarker[]) {
    const groups: { notes: Pick<NoteMarker, "id" | "number">[]; left: number; top: number; ranges: Range[] }[] = [];
    for (const marker of markers) {
        const existing = groups.find((group) => Math.abs(group.left - marker.left) < 1 && Math.abs(group.top - marker.top) < 1);
        if (existing) {
            existing.notes.push({ id: marker.id, number: marker.number });
            existing.ranges.push(marker.range);
        } else {
            groups.push({ notes: [{ id: marker.id, number: marker.number }], left: marker.left, top: marker.top, ranges: [marker.range] });
        }
    }

    return groups;
}


function highlight(...ranges: Range[]) {
    if (typeof CSS === "undefined" || !CSS.highlights || typeof Highlight === "undefined")
        return;

    const registry = CSS.highlights;
    if (ranges.length)
        registry.set(highlightName, new Highlight(...ranges));
    else
        registry.delete(highlightName);
}


export function EditorNoteMarkers({ content }: { content: string }) {
    const [editor] = useLexicalComposerContext();
    const context = useContext(EditorNotesContext);
    const intl = useIntl();
    const container = useRef<HTMLDivElement>(null);
    const [markers, setMarkers] = useState<NoteMarker[]>([]);

    useLayoutEffect(() => {
        if (!context?.notes.length) {
            setMarkers([]);
            return;
        }

        let frame = 0;
        const update = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const bounds = container.current?.getBoundingClientRect();
                if (!bounds)
                    return;

                const next = (context?.notes ?? []).flatMap((note, index) => {
                    const range = getEditorNoteRange(editor, content, note.anchor);
                    const rect = range?.getClientRects().item(range.getClientRects().length - 1);
                    if (!range || !rect)
                        return [];

                    return [{ id: note.id, number: index + 1, left: rect.right - bounds.left, top: rect.top - bounds.top, range }];
                });
                setMarkers(next);
                highlight();
            });
        };

        update();

        const unregister = editor.registerUpdateListener(({ dirtyElements, dirtyLeaves }) => {
            if (dirtyElements.size || dirtyLeaves.size)
                update();
        });

        const observer = new ResizeObserver(update);
        const root = editor.getRootElement();

        if (root)
            observer.observe(root);

        document.fonts?.addEventListener("loadingdone", update);

        return () => {
            cancelAnimationFrame(frame);
            unregister();
            observer.disconnect();
            document.fonts?.removeEventListener("loadingdone", update);
            highlight();
        };
    }, [context?.notes, content, editor]);

    return <div ref={container} className="pointer-events-none absolute inset-0" data-editor-note-markers>
        {groupMarkers(markers).map((marker) => (
            <button
                key={marker.notes[0].id}
                type="button"
                data-editor-note-id={marker.notes[0].id}
                aria-label={marker.notes.length === 1
                    ? intl.formatMessage({ id: "notes.marker" }, { number: intl.formatNumber(marker.notes[0].number) })
                    : intl.formatMessage({ id: "notes.markers" }, {
                        numbers: intl.formatList(marker.notes.map((note) => intl.formatNumber(note.number)), { type: "unit" }),
                    })}
                style={{ left: marker.left, top: marker.top }}
                className={("pointer-events-auto absolute inline-flex min-h-9 min-w-9 -translate-y-1 items-start rounded-control pl-1 " +
                    "text-xs text-muted hover:text-brand focus-visible:outline focus-visible:outline-brand")}
                onMouseEnter={() => highlight(...marker.ranges)}
                onMouseLeave={() => {
                    if (!document.activeElement?.matches("[data-editor-note-id]"))
                        highlight();
                }}
                onFocus={() => highlight(...marker.ranges)}
                onBlur={(event) => {
                    if (!event.currentTarget.matches(":hover"))
                        highlight();
                }}
                onClick={() => context?.open(marker.notes.length === 1
                    ? context.notes.find((note) => note.id === marker.notes[0].id) : undefined)}>
                {intl.formatList(marker.notes.map((note) => intl.formatNumber(note.number)), { type: "unit" })}
            </button>
        ))}
    </div>;
}
