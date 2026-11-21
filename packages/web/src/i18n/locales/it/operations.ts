import type { MessageId } from "../../messages.js";


export const operationsMessages = {
    "operations.factCheck": "Verifica dei fatti",
    "operations.flowRevision": "Revisione della scorrevolezza",
    "operations.styleReview": "Revisione dello stile",
    "operations.thesisToNarrative": "Dalla tesi alla narrazione",
    "operations.translation": "Traduzione",
} satisfies Partial<Record<MessageId, string>>;
