import type { MessageId } from "../../messages.js";


export const uiMessages = {
    "ui.added": "Добавлено: ",
    "ui.loading": "Загрузка",
    "ui.noOriginal": "Нет исходного текста",
    "ui.noProposed": "Нет предложенного текста",
    "ui.original": "Оригинал",
    "ui.proposed": "Предложение",
    "ui.proposedChange": "Предложенное изменение текста",
    "ui.removed": "Удалено: ",
} satisfies Partial<Record<MessageId, string>>;
