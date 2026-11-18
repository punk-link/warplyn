import type { MessageId } from "../../messages.js";

export const telemetryMessages = {
    "telemetry.invitation": (
        "Ative a telemetria para nos ajudar a entender sua experiência e melhorar o Warplyn. O " +
        "compartilhamento é opcional e desativado por padrão."
    ),
    "telemetry.enable": "Ativar compartilhamento",
    "telemetry.learnMore": "Saber mais",
    "telemetry.dismiss": "Liberar",
} satisfies Partial<Record<MessageId, string>>;
