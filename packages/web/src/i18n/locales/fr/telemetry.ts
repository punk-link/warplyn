import type { MessageId } from "../../messages.js";


export const telemetryMessages = {
    "telemetry.dismiss": "Ignorer",
    "telemetry.enable": "Activer le partage",
    "telemetry.invitation": (
        "Activez la télémétrie pour nous aider à comprendre votre expérience et à améliorer Warplyn. Le partage est fac" +
        "ultatif et désactivé par défaut."
    ),
    "telemetry.learnMore": "En savoir plus",
} satisfies Partial<Record<MessageId, string>>;
