import type { MessageId } from "../../messages.js";


export const operationsMessages = {
    "operations.factCheck": "Проверка фактов",
    "operations.flowRevision": "Улучшение связности",
    "operations.styleReview": "Проверка стиля",
    "operations.thesisToNarrative": "От тезисов к тексту",
    "operations.translation": "Перевод",
} satisfies Partial<Record<MessageId, string>>;
