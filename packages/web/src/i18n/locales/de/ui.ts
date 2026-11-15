import type { MessageId } from "../../messages.js";

export const uiMessages = {
    "ui.loading": "Wird geladen",
    "ui.proposedChange": "Vorgeschlagene Textänderung",
    "ui.original": "Original",
    "ui.proposed": "Vorschlag",
    "ui.noOriginal": "Kein Originaltext",
    "ui.noProposed": "Kein vorgeschlagener Text",
    "ui.removed": "Entfernt: ",
    "ui.added": "Hinzugefügt: ",
} satisfies Partial<Record<MessageId, string>>;
