import type { MessageId } from "../../messages.js";

export const operationsMessages = {
    "operations.thesisToNarrative": "논지에서 서술로",
    "operations.flowRevision": "흐름 다듬기",
    "operations.factCheck": "팩트 체크",
    "operations.styleReview": "문체 검토",
    "operations.translation": "번역",
} satisfies Partial<Record<MessageId, string>>;
