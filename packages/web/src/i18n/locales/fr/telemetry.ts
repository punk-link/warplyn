import type { MessageId } from "../../messages.js";

export const telemetryMessages = {
    "telemetry.invitation": (
        "Activez la télémétrie pour nous aider à comprendre votre expérience et à améliorer Warplyn. Le " +
        "partage est facultatif et désactivé par défaut."
    ),
    "telemetry.enable": "Activer le partage",
    "telemetry.learnMore": "En savoir plus",
    "telemetry.dismiss": "Ignorer",
} satisfies Partial<Record<MessageId, string>>;
