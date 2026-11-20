import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "Chiudi notifica: {title}",
    "notifications.errorTitle": "Si è verificato un errore",
    "notifications.viewport": "Notifiche",
} satisfies Partial<Record<MessageId, string>>;
