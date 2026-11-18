import type { MessageId } from "../../messages.js";

export const operations = {
    "operations.thesisToNarrative": "Dalla tesi alla narrazione",
    "operations.flowRevision": "Revisione della scorrevolezza",
    "operations.factCheck": "Verifica dei fatti",
    "operations.styleReview": "Revisione dello stile",
    "operations.translation": "Traduzione",
} satisfies Partial<Record<MessageId, string>>;
