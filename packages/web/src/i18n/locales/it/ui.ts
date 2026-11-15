import type { MessageId } from "../../messages.js";

export const ui = {
    "ui.loading": "Caricamento",
    "ui.proposedChange": "Modifica di testo proposta",
    "ui.original": "Originale",
    "ui.proposed": "Proposto",
    "ui.noOriginal": "Nessun testo originale",
    "ui.noProposed": "Nessun testo proposto",
    "ui.removed": "Rimosso: ",
    "ui.added": "Aggiunto: ",
} satisfies Partial<Record<MessageId, string>>;
