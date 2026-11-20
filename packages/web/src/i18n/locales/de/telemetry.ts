import type { MessageId } from "../../messages.js";


export const telemetryMessages = {
    "telemetry.dismiss": "Schließen",
    "telemetry.enable": "Teilen aktivieren",
    "telemetry.invitation": (
        "Aktivieren Sie die Telemetrie, um uns zu helfen, Ihre Erfahrung zu verstehen und Warplyn zu verbesse" +
        "rn. Das Teilen ist freiwillig und standardmäßig deaktiviert."
    ),
    "telemetry.learnMore": "Mehr erfahren",
} satisfies Partial<Record<MessageId, string>>;
