import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "Ignorar notificação: {title}",
    "notifications.errorTitle": "Algo deu errado",
    "notifications.viewport": "Notificações",
} satisfies Partial<Record<MessageId, string>>;
