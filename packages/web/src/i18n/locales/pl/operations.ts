import type { MessageId } from "../../messages.js";


export const operationsMessages = {
    "operations.factCheck": "Weryfikacja faktów",
    "operations.flowRevision": "Przegląd płynności",
    "operations.styleReview": "Przegląd stylu",
    "operations.thesisToNarrative": "Od tezy do narracji",
    "operations.translation": "Tłumaczenie",
} satisfies Partial<Record<MessageId, string>>;
