import type { MessageId } from "../../messages.js";

export const notificationsMessages = {
    "notifications.viewport": "Notificações",
    "notifications.errorTitle": "Algo deu errado",
    "notifications.dismiss": "Ignorar notificação: {title}",
} satisfies Partial<Record<MessageId, string>>;
