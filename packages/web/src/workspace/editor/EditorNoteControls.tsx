import { useContext } from "react";
import { useIntl } from "react-intl";
import { Button } from "../../ui/primitives.js";
import { EditorNotesContext } from "./editor-notes-context.js";


export function EditorNoteControls() {
    const notes = useContext(EditorNotesContext);
    const intl = useIntl();
    if (!notes)
        return null;

    return <>
        <Button
            variant="quiet"
            data-editor-command="note"
            disabled={!notes.canAdd}
            title={intl.formatMessage({ id: notes.canAdd ? "notes.add" : "notes.select" })}
            aria-label={intl.formatMessage({ id: "notes.add" })}
            aria-describedby={!notes.canAdd ? "editor-note-selection-help" : undefined}
            onMouseDown={(event) => event.preventDefault()}
            onClick={notes.add}>
            {intl.formatMessage({ id: "notes.add" })}
        </Button>
        <span id="editor-note-selection-help" className="sr-only">{intl.formatMessage({ id: "notes.select" })}</span>
        <Button variant="quiet" onClick={() => notes.open()}>
            {intl.formatMessage({ id: "notes.count" }, { count: intl.formatNumber(notes.notes.length), separator: " · " })}
        </Button>
    </>;
}
