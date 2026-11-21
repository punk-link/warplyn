import type { MessageId } from "../../messages.js";


export const telemetryMessages = {
    "telemetry.dismiss": "Chiudi",
    "telemetry.enable": "Attiva condivisione",
    "telemetry.invitation": (
        "Attiva la telemetria per aiutarci a capire la tua esperienza e migliorare Warplyn. La condivisione è facoltati" +
        "va e disattivata per impostazione predefinita."
    ),
    "telemetry.learnMore": "Scopri di più",
} satisfies Partial<Record<MessageId, string>>;
