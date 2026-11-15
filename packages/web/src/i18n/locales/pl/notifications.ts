import type { MessageId } from "../../messages.js";

export const notifications = {
    "notifications.viewport": "Powiadomienia",
    "notifications.errorTitle": "Coś poszło nie tak",
    "notifications.dismiss": "Zamknij powiadomienie: {title}",
} satisfies Partial<Record<MessageId, string>>;
