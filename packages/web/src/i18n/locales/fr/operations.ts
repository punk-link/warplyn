import type { MessageId } from "../../messages.js";


export const operationsMessages = {
    "operations.factCheck": "Vérification des faits",
    "operations.flowRevision": "Révision de la fluidité",
    "operations.styleReview": "Révision du style",
    "operations.thesisToNarrative": "Des idées au récit",
    "operations.translation": "Traduction",
} satisfies Partial<Record<MessageId, string>>;
