import type { MessageId } from "../../messages.js";

export const draftSaveMessages = {
    "draftSave.failure": "Speichern fehlgeschlagen. Ihr vollständiger Entwurf ist weiterhin bearbeitbar.",
    "draftSave.retry": "Erneut versuchen",
} satisfies Partial<Record<MessageId, string>>;
