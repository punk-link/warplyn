export interface EditorNoteAnchor {
    quote: string;
    preview: string;
    before: string;
    after: string;
}


export interface EditorNote {
    id: string;
    text: string;
    anchor: EditorNoteAnchor;
    version: number;
}


export type EditorNoteChange =
    | { kind: "save"; id: string; text: string; anchor: EditorNoteAnchor; expectedVersion: number }
    | { kind: "remove"; id: string; expectedVersion: number };


export type EditorNoteScope = { kind: "article" } | { kind: "selection"; startOffset: number; endOffset: number };


export function createEditorNoteAnchor(content: string, start: number, end: number, preview: string): EditorNoteAnchor {
    return { quote: content.slice(start, end), preview, before: content.slice(Math.max(0, start - 64), start), after: content.slice(end, end + 64) };
}


/** Require a unique exact passage and its neighboring context, never a guessed replacement. */
export function resolveEditorNoteAnchor(content: string, anchor: EditorNoteAnchor): { startOffset: number; endOffset: number } | undefined {
    if (!anchor.quote)
        return undefined;

    let found: number | undefined;
    let offset = content.indexOf(anchor.quote);
    while (offset !== -1) {
        const end = offset + anchor.quote.length;
        if (content.slice(Math.max(0, offset - anchor.before.length), offset) === anchor.before &&
            content.slice(end, end + anchor.after.length) === anchor.after) {
            if (found !== undefined)
                return undefined;

            found = offset;
        }

        offset = content.indexOf(anchor.quote, offset + 1);
    }

    return found === undefined ? undefined : { startOffset: found, endOffset: found + anchor.quote.length };
}


export function getRelevantEditorNotes(notes: readonly EditorNote[], content: string,
    scope: EditorNoteScope): EditorNote[] {
    return notes.filter((note) => {
        const anchor = resolveEditorNoteAnchor(content, note.anchor);
        if (!anchor)
            return false;

        return scope.kind === "article" || (anchor.startOffset < scope.endOffset && anchor.endOffset > scope.startOffset);
    });
}


export function isEditorNoteChange(value: unknown): value is EditorNoteChange {
    if (typeof value !== "object" || value === null || !("id" in value) || typeof value.id !== "string" ||
        !value.id || value.id.length > 100 || !("expectedVersion" in value) || typeof value.expectedVersion !== "number" ||
        !Number.isSafeInteger(value.expectedVersion) || value.expectedVersion < 0 || !("kind" in value))
        return false;

    if (value.kind === "remove")
        return value.expectedVersion > 0;

    if (value.kind !== "save" || !("text" in value) || typeof value.text !== "string" ||
        !value.text.trim() || value.text.length > 10000 || !("anchor" in value))
        return false;

    const anchor = value.anchor;
    return typeof anchor === "object" && anchor !== null &&
        "quote" in anchor && typeof anchor.quote === "string" && anchor.quote.length > 0 && anchor.quote.length <= 100000 &&
        "preview" in anchor && typeof anchor.preview === "string" && anchor.preview.length > 0 && anchor.preview.length <= 100000 &&
        "before" in anchor && typeof anchor.before === "string" && anchor.before.length <= 64 &&
        "after" in anchor && typeof anchor.after === "string" && anchor.after.length <= 64;
}
