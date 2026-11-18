import type { MessageId } from "../../messages.js";

export const telemetry = {
    "telemetry.invitation": (
        "Attiva la telemetria per aiutarci a capire la tua esperienza e migliorare Warplyn. La condivisione è" +
        " facoltativa e disattivata per impostazione predefinita."
    ),
    "telemetry.enable": "Attiva condivisione",
    "telemetry.learnMore": "Scopri di più",
    "telemetry.dismiss": "Chiudi",
} satisfies Partial<Record<MessageId, string>>;
