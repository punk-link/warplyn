import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "Dismiss notification: {title}",
    "notifications.errorTitle": "Something went wrong",
    "notifications.viewport": "Notifications",
} satisfies Partial<Record<MessageId, string>>;
