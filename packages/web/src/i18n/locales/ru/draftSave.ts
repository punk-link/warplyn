import type { MessageId } from "../../messages.js";


export const draftSaveMessages = {
    "draftSave.failure": "Не удалось сохранить. Весь черновик по-прежнему доступен для редактирования.",
    "draftSave.retry": "Повторить",
} satisfies Partial<Record<MessageId, string>>;
