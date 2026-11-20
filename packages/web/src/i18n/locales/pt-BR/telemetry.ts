import type { MessageId } from "../../messages.js";


export const telemetryMessages = {
    "telemetry.dismiss": "Liberar",
    "telemetry.enable": "Ativar compartilhamento",
    "telemetry.invitation": (
        "Ative a telemetria para nos ajudar a entender sua experiência e melhorar o Warplyn. O compartilhamento é opcio" +
        "nal e desativado por padrão."
    ),
    "telemetry.learnMore": "Saber mais",
} satisfies Partial<Record<MessageId, string>>;
