import type { MessageId } from "../../messages.js";


export const notificationsMessages = {
    "notifications.dismiss": "Cerrar notificación: {title}",
    "notifications.errorTitle": "Se produjo un error",
    "notifications.viewport": "Notificaciones",
} satisfies Partial<Record<MessageId, string>>;
