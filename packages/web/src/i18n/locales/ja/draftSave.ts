import type { MessageId } from "../../messages.js";


export const draftSaveMessages = {
    "draftSave.failure": "保存できませんでした。下書き全体は引き続き編集できます。",
    "draftSave.retry": "再試行",
} satisfies Partial<Record<MessageId, string>>;
