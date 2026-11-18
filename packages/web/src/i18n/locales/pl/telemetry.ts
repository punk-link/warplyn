import type { MessageId } from "../../messages.js";

export const telemetry = {
    "telemetry.invitation": (
        "Włącz telemetrię, aby pomóc nam zrozumieć Twoje doświadczenia i ulepszać Warplyn. Udostępnianie jest" +
        " opcjonalne i domyślnie wyłączone."
    ),
    "telemetry.enable": "Włącz udostępnianie",
    "telemetry.learnMore": "Dowiedz się więcej",
    "telemetry.dismiss": "Zamknij",
} satisfies Partial<Record<MessageId, string>>;
