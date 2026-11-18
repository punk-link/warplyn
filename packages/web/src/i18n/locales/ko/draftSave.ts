import type { MessageId } from "../../messages.js";

export const draftSaveMessages = {
    "draftSave.failure": "저장하지 못했습니다. 전체 초안은 계속 편집할 수 있습니다.",
    "draftSave.retry": "다시 시도",
} satisfies Partial<Record<MessageId, string>>;
