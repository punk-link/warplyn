import type { MessageId } from "../../messages.js";


export const operationsMessages = {
    "operations.factCheck": "ファクトチェック",
    "operations.flowRevision": "文章の流れを改善",
    "operations.styleReview": "文体のレビュー",
    "operations.thesisToNarrative": "要点から本文へ",
    "operations.translation": "翻訳",
} satisfies Partial<Record<MessageId, string>>;
