import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "Benachrichtigung schließen: {title}",
    "notifications.errorTitle": "Etwas ist schiefgelaufen",
    "notifications.viewport": "Benachrichtigungen",
} satisfies Partial<Record<MessageId, string>>;
