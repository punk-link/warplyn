import type { MessageId } from "../../messages.js";

export const notificationsMessages = {
    "notifications.viewport": "Benachrichtigungen",
    "notifications.errorTitle": "Etwas ist schiefgelaufen",
    "notifications.dismiss": "Benachrichtigung schließen: {title}",
} satisfies Partial<Record<MessageId, string>>;
