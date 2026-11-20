import type { MessageId } from "../../messages.js";


export const statusMessages = {
    "status.article": "Artikelstatus",
    "status.characterCount": "{characterCount} / {characterLimit} Zeichen",
    "status.characterCount.ariaLabel": "Zeichenanzahl: {characterCount} von {characterLimit} Zeichen. Wählen Sie eine Zeichengrenze.",
    "status.characterLimitPresets": "Vorgaben für die Zeichengrenze",
    "status.revision": "v{revisionNumber}",
    "status.revisionMenu": "Gespeicherte Fassungen",
    "status.revisionSelector": "Aktuelle gespeicherte Fassung v{revisionNumber}. Wählen Sie eine gespeicherte Fassung.",
    "status.updateAvailable": "Update {version} ist verfügbar",
    "status.updateDownloading": "Update wird heruntergeladen",
    "status.updateFailed": "Suche nach Updates fehlgeschlagen",
    "status.updateReady": "Update ist zum Neustart bereit",
    "status.windowsUpdateAvailable": "Update {version} herunterladen und die automatische Installation beim nächsten Öffnen von Warplyn genehmigen",
    "status.windowsUpdateReady": "Update heruntergeladen. Es wird beim nächsten Öffnen von Warplyn automatisch installiert.",
} satisfies Partial<Record<MessageId, string>>;
