import type { MessageId } from "../../messages.js";

export const operationsMessages = {
    "operations.thesisToNarrative": "Des idées au récit",
    "operations.flowRevision": "Révision de la fluidité",
    "operations.factCheck": "Vérification des faits",
    "operations.styleReview": "Révision du style",
    "operations.translation": "Traduction",
} satisfies Partial<Record<MessageId, string>>;
