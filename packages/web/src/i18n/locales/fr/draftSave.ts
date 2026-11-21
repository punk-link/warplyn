import type { MessageId } from "../../messages.js";


export const draftSaveMessages = {
    "draftSave.failure": "Impossible d’enregistrer. Vous pouvez toujours modifier l’intégralité de votre brouillon.",
    "draftSave.retry": "Réessayer",
} satisfies Partial<Record<MessageId, string>>;
