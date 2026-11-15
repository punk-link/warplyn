import type { MessageId } from "../../messages.js";

export const statusMessages = {
    "status.article": "Artikelstatus",
    "status.revision": "v{revisionNumber}",
    "status.revisionSelector": "Aktuelle gespeicherte Fassung v{revisionNumber}. Wählen Sie eine gespeicherte Fassung.",
    "status.revisionMenu": "Gespeicherte Fassungen",
    "status.characterCount": "{characterCount} / {characterLimit} Zeichen",
    "status.characterCount.ariaLabel": "Zeichenanzahl: {characterCount} von {characterLimit} Zeichen. Wählen Sie eine Zeichengrenze.",
    "status.characterLimitPresets": "Vorgaben für die Zeichengrenze",
    "status.windowsUpdateReady": "Update heruntergeladen. Es wird beim nächsten Öffnen von Warplyn automatisch installiert.",
    "status.windowsUpdateAvailable": "Update {version} herunterladen und die automatische Installation beim nächsten Öffnen von Warplyn genehmigen",
    "status.updateAvailable": "Update {version} ist verfügbar",
    "status.updateDownloading": "Update wird heruntergeladen",
    "status.updateReady": "Update ist zum Neustart bereit",
    "status.updateFailed": "Suche nach Updates fehlgeschlagen",
} satisfies Partial<Record<MessageId, string>>;
