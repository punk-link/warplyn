import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "Закрыть уведомление: {title}",
    "notifications.errorTitle": "Что-то пошло не так",
    "notifications.viewport": "Уведомления",
} satisfies Partial<Record<MessageId, string>>;
