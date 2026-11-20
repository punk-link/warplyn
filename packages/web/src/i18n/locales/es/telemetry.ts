import type { MessageId } from "../../messages.js";


export const telemetryMessages = {
    "telemetry.dismiss": "Cerrar",
    "telemetry.enable": "Activar el envío de datos",
    "telemetry.invitation": (
        "Activa la telemetría para ayudarnos a entender tu experiencia y mejorar Warplyn. Compartir es opcional y está " +
        "desactivado por defecto."
    ),
    "telemetry.learnMore": "Más información",
} satisfies Partial<Record<MessageId, string>>;
