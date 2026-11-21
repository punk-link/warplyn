import type { EditorNote, EditorNoteChange } from "@skladno/shared";


export interface EditorNotesBinding {
    items: readonly EditorNote[];
    change: (change: EditorNoteChange) => Promise<void>;
}
