import type { MessageId } from "../../messages.js";


export const draftSaveMessages = {
    "draftSave.failure": "无法保存。完整草稿仍可编辑。",
    "draftSave.retry": "重试",
} satisfies Partial<Record<MessageId, string>>;
