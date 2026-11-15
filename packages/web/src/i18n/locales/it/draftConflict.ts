import type { MessageId } from "../../messages.js";

export const draftConflict = {
    "draftConflict.banner": "Un'altra sessione di Warplyn ha modificato questo articolo. La bozza locale è conservata; confrontala prima di continuare.",
    "draftConflict.compare": "Confronta e risolvi",
    "draftConflict.heading": "Risolvi conflitto della bozza",
    "draftConflict.description": "La bozza locale conservata è mostrata accanto al contenuto salvato più recente. Nulla viene sostituito finché non scegli.",
    "draftConflict.cancel": "Annulla",
    "draftConflict.keepMine": "Conserva la mia bozza",
    "draftConflict.useDraft": "Usa l'ultima bozza",
    "draftConflict.useRevision": "Usa l'ultima versione salvata",
    "draftConflict.confirmDraft": "Sostituire il testo locale conservato con l'ultima bozza persistita?",
    "draftConflict.confirmRevision": "Scartare la bozza persistita e sostituire il testo locale conservato con l'ultima versione salvata?",
} satisfies Partial<Record<MessageId, string>>;
