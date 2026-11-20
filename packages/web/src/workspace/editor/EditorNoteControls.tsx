import { useContext } from "react";
import { useIntl } from "react-intl";
import { Button } from "../../ui/primitives.js";
import { EditorNotesContext } from "./editor-notes-context.js";


export function EditorNoteControls() {
    const notes = useContext(EditorNotesContext);
    const intl = useIntl();
    if (!notes)
        return null;

    return <Button
        variant="quiet"
        data-editor-command="note"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => notes.open()}>
        {intl.formatMessage({ id: "notes.title" })}
    </Button>;
}
