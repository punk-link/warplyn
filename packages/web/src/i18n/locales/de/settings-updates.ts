import type { MessageId } from "../../messages.js";


export const settingsUpdatesMessages = {
    "settings.automaticUpdates": "Automatisch nach Updates suchen",
    "settings.automaticUpdatesHint": (
        "Prüft GitHub beim Start von Warplyn und dann täglich, solange die App geöffnet bleibt. Updates werden nur heru" +
        "ntergeladen, wenn Sie Herunterladen wählen."
    ),
    "settings.checkNow": "Jetzt prüfen",
    "settings.restartAndUpdate": "Update & Neustart",
    "settings.updateChanges": "Änderungen in {version}",
    "settings.updateChangesUnavailable": "Versionsdetails sind nicht verfügbar. Sie können dennoch aktualisieren.",
    "settings.updateNetworkAccess": "Netzwerkzugriff für Updates erlauben",
    "settings.updateNetworkAccessHint": (
        "Erlaubt Warplyn, GitHub für öffentliche Versionsmetadaten und von Ihnen ausgewählte Downloads zu kon" +
        "taktieren. Artikelinhalte, Kontoinformationen, Gerätekennungen und Analysedaten werden niemals gesen" +
        "det."
    ),
    "settings.updateNetworkPermissionDescription": (
        "Warplyn kontaktiert api.github.com für öffentliche Versionsmetadaten. Artikelinhalte, Kontoinformati" +
        "onen, Gerätekennungen und Analysedaten werden nicht gesendet."
    ),
    "settings.updateNetworkPermissionTitle": "Warplyn erlauben, auf GitHub nach Updates zu suchen?",
    "settings.updateRecovery": "Update-Wiederherstellung",
    "settings.updateStatus": "Updatestatus",
    "settings.updateStatusHint": "Aktuelle Version: {version}",
    "settings.updateStatusUnavailableHint": "Updateeinstellungen gelten, wenn diese Version Updates unterstützt.",
    "settings.updates": "Updates",
    "settings.updatesAvailable": "Version {version} ist verfügbar.",
    "settings.updatesChecking": "Suche nach Updates…",
    "settings.updatesCurrent": "Sie haben die neueste Version.",
    "settings.updatesError.apply_failed": (
        "Das Update konnte nicht vorbereitet werden. Versuchen Sie es erneut oder öffnen Sie die Update-Wiederherstellu" +
        "ng für Hilfe."
    ),
    "settings.updatesError.discovery_failed": "Updates konnten nicht gesucht werden. Versuchen Sie es erneut.",
    "settings.updatesError.download_failed": "Das Update konnte nicht heruntergeladen werden. Versuchen Sie es erneut.",
    "settings.updatesNetworkAccessRequired": "Erlauben Sie den Netzwerkzugriff, um nach Updates zu suchen.",
    "settings.updatesUnavailable": "Updates sind in dieser Version nicht verfügbar.",
    "settings.viewReleaseNotes": "Versionshinweise",
    "settings.windowsUpdateDownloadHint": (
        "Mit dem Herunterladen eines Updates genehmigen Sie auch die Installation. Nach dem Download wird es " +
        "beim nächsten Öffnen von Warplyn automatisch installiert, auch nach normalem Schließen der App."
    ),
} satisfies Partial<Record<MessageId, string>>;
