import type { MessageId } from "../../messages.js";


export const operationsMessages = {
    "operations.factCheck": "Fact check",
    "operations.flowRevision": "Flow revision",
    "operations.styleReview": "Style review",
    "operations.thesisToNarrative": "Thesis to narrative",
    "operations.translation": "Translation",
} satisfies Partial<Record<MessageId, string>>;
