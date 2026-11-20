import type { MessageId } from "../../messages.js";


export const uiMessages = {
    "ui.added": "Hinzugefügt: ",
    "ui.loading": "Wird geladen",
    "ui.noOriginal": "Kein Originaltext",
    "ui.noProposed": "Kein vorgeschlagener Text",
    "ui.original": "Original",
    "ui.proposed": "Vorschlag",
    "ui.proposedChange": "Vorgeschlagene Textänderung",
    "ui.removed": "Entfernt: ",
} satisfies Partial<Record<MessageId, string>>;
