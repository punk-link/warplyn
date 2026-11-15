import type { MessageId } from "../../messages.js";

export const telemetryMessages = {
    "telemetry.invitation": (
        "Aktivieren Sie die Telemetrie, um uns zu helfen, Ihre Erfahrung zu verstehen und Warplyn zu " +
        "verbessern. Das Teilen ist freiwillig und standardmäßig deaktiviert."
    ),
    "telemetry.enable": "Teilen aktivieren",
    "telemetry.learnMore": "Mehr erfahren",
    "telemetry.dismiss": "Schließen",
} satisfies Partial<Record<MessageId, string>>;
