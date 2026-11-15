import type { MessageId } from "../../messages.js";

export const operations = {
    "operations.thesisToNarrative": "Od tezy do narracji",
    "operations.flowRevision": "Przegląd płynności",
    "operations.factCheck": "Weryfikacja faktów",
    "operations.styleReview": "Przegląd stylu",
    "operations.translation": "Tłumaczenie",
} satisfies Partial<Record<MessageId, string>>;
