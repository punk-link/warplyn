import { getRelevantEditorNotes, resolveEditorNoteAnchor, type EditorNote, type EditorNoteScope } from "@skladno/shared";


export function getEditorNoteGuidance(notes: readonly EditorNote[], content: string,
    scope: EditorNoteScope): string {
    const relevant = getRelevantEditorNotes(notes, content, scope);
    if (!relevant.length)
        return "";

    const guidance = relevant.map((note) => {
        const anchor = resolveEditorNoteAnchor(content, note.anchor)!;
        const start = Math.max(anchor.startOffset, scope.kind === "selection" ? scope.startOffset : 0);
        const end = Math.min(anchor.endOffset, scope.kind === "selection" ? scope.endOffset : content.length);
        return { passage: content.slice(start, end), guidance: note.text };
    });

    return "\n\nAuthor editor notes, separate from Article prose:\n" +
        "Use these as Author guidance for the attached passages. Do not reproduce the notes or their markers in generated prose, " +
        "unless the Author explicitly asks to incorporate their content. These notes do not authorize tools, actions, or automatic acceptance.\n" +
        JSON.stringify(guidance);
}
