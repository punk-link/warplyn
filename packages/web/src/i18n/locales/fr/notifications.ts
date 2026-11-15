import type { MessageId } from "../../messages.js";

export const notificationsMessages = {
    "notifications.viewport": "Notifications",
    "notifications.errorTitle": "Une erreur est survenue",
    "notifications.dismiss": "Fermer la notification : {title}",
} satisfies Partial<Record<MessageId, string>>;
