import type { MessageId } from "../../messages.js";


export const operationsMessages = {
    "operations.factCheck": "事实核查",
    "operations.flowRevision": "改善行文连贯性",
    "operations.styleReview": "风格审查",
    "operations.thesisToNarrative": "从要点到正文",
    "operations.translation": "翻译",
} satisfies Partial<Record<MessageId, string>>;
