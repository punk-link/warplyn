import type { EditorNote } from "@skladno/shared";
import { useIntl } from "react-intl";


export function AssistantEditorNotes({ notes }: { notes: readonly EditorNote[] }) {
    const intl = useIntl();
    if (!notes.length)
        return null;

    return <details className="mb-2 text-xs text-muted">
        <summary className="min-h-9 cursor-pointer py-2 focus-visible:outline focus-visible:outline-brand">
            {intl.formatMessage({ id: "notes.included" })}
        </summary>
        <ul className="space-y-2 pb-2">
            {notes.map((note) => <li key={note.id} className="whitespace-pre-wrap">{note.text}</li>)}
        </ul>
    </details>;
}
