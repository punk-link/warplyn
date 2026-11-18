import type { MessageId } from "../../messages.js";

export const notifications = {
    "notifications.viewport": "Notifiche",
    "notifications.errorTitle": "Si è verificato un errore",
    "notifications.dismiss": "Chiudi notifica: {title}",
} satisfies Partial<Record<MessageId, string>>;
