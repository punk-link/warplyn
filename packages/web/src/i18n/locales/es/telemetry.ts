import type { MessageId } from "../../messages.js";

export const telemetry = {
    "telemetry.invitation": (
        "Activa la telemetría para ayudarnos a entender tu experiencia y mejorar Warplyn. Compartir es " +
        "opcional y está desactivado por defecto."
    ),
    "telemetry.enable": "Activar el envío de datos",
    "telemetry.learnMore": "Más información",
    "telemetry.dismiss": "Cerrar",
} satisfies Partial<Record<MessageId, string>>;
