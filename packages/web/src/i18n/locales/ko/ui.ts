import type { MessageId } from "../../messages.js";

export const uiMessages = {
    "ui.loading": "불러오는 중",
    "ui.proposedChange": "제안된 텍스트 변경",
    "ui.original": "원본",
    "ui.proposed": "제안",
    "ui.noOriginal": "원본 텍스트 없음",
    "ui.noProposed": "제안된 텍스트 없음",
    "ui.removed": "삭제됨: ",
    "ui.added": "추가됨: ",
} satisfies Partial<Record<MessageId, string>>;
