import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "Fermer la notification : {title}",
    "notifications.errorTitle": "Une erreur est survenue",
    "notifications.viewport": "Notifications",
} satisfies Partial<Record<MessageId, string>>;
