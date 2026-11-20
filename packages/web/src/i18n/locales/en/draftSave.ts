import type { MessageId } from "../../messages.js";


export const draftSaveMessages = {
    "draftSave.failure": "Couldn’t save. Your full Draft is still editable.",
    "draftSave.retry": "Retry",
} satisfies Partial<Record<MessageId, string>>;
