import type { MessageId } from "../../messages.js";


export const telemetryMessages = {
    "telemetry.dismiss": "Zamknij",
    "telemetry.enable": "Włącz udostępnianie",
    "telemetry.invitation": (
        "Włącz telemetrię, aby pomóc nam zrozumieć Twoje doświadczenia i ulepszać Warplyn. Udostępnianie jest opcjonaln" +
        "e i domyślnie wyłączone."
    ),
    "telemetry.learnMore": "Dowiedz się więcej",
} satisfies Partial<Record<MessageId, string>>;
