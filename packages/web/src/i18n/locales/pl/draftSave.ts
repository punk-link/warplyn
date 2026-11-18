import type { MessageId } from "../../messages.js";

export const draftSave = {
    "draftSave.failure": "Nie udało się zapisać. Cały szkic nadal można edytować.",
    "draftSave.retry": "Ponów",
} satisfies Partial<Record<MessageId, string>>;
