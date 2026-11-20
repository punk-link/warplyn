import type { MessageId } from "../../messages.js";


export const uiMessages = {
    "ui.added": "Aggiunto: ",
    "ui.loading": "Caricamento",
    "ui.noOriginal": "Nessun testo originale",
    "ui.noProposed": "Nessun testo proposto",
    "ui.original": "Originale",
    "ui.proposed": "Proposto",
    "ui.proposedChange": "Modifica di testo proposta",
    "ui.removed": "Rimosso: ",
} satisfies Partial<Record<MessageId, string>>;
