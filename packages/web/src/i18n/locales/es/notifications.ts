import type { MessageId } from "../../messages.js";

export const notifications = {
    "notifications.viewport": "Notificaciones",
    "notifications.errorTitle": "Se produjo un error",
    "notifications.dismiss": "Cerrar notificación: {title}",
} satisfies Partial<Record<MessageId, string>>;
