import type { MessageId } from "../../messages.js";


export const draftSaveMessages = {
    "draftSave.failure": "Impossibile salvare. L'intera bozza è ancora modificabile.",
    "draftSave.retry": "Riprova",
} satisfies Partial<Record<MessageId, string>>;
