import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "Zamknij powiadomienie: {title}",
    "notifications.errorTitle": "Coś poszło nie tak",
    "notifications.viewport": "Powiadomienia",
} satisfies Partial<Record<MessageId, string>>;
