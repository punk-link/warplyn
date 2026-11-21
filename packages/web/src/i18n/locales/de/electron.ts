import type { MessageId } from "../../messages.js";


export const electronMessages = {
    "electron.articleFiles.docx": "Word-Dateien",
    "electron.articleFiles.html": "HTML-Dateien",
    "electron.articleFiles.load": "Artikel aus Datei laden",
    "electron.articleFiles.markdown": "Markdown-Dateien",
    "electron.articleFiles.rtf": "Rich-Text-Dateien",
    "electron.articleFiles.save": "Artikel in Datei speichern",
    "electron.closeFailed.message": "Der Entwurfsprüfpunkt wurde gespeichert, aber die lokale Datenbank wurde nicht ordnungsgemäß geschlossen.",
    "electron.closeFailed.title": "Warplyn konnte nicht ordnungsgemäß beendet werden",
    "electron.deleteData.backup": "Vor dem Löschen eine Sicherung erstellen",
    "electron.deleteData.cancel": "Abbrechen",
    "electron.deleteData.delete": "Alle lokalen Daten löschen",
    "electron.deleteData.detail": (
        "Warplyn wird nach dem Löschen beendet. Wenn ein Sicherungsordner eingerichtet ist, kannst du vorher eine Siche" +
        "rung erstellen."
    ),
    "electron.deleteData.message": (
        "Dadurch werden Artikel, Entwurfsprüfpunkte, gespeicherte Fassungen, Assistentenverlauf, Stildaten, E" +
        "instellungen und lokale Sicherungen im Datenverzeichnis von Warplyn dauerhaft gelöscht."
    ),
    "electron.deleteData.title": "Alle lokalen Warplyn-Daten löschen?",
    "electron.draftCheckpointFailed.detail": (
        "Kehre zum Artikel zurück und versuche es erneut oder beende die App ohne die neuesten ungespeicherten Änderung" +
        "en."
    ),
    "electron.draftCheckpointFailed.message": "Warplyn konnte den neuesten Entwurfsprüfpunkt nicht speichern.",
    "electron.draftCheckpointFailed.quit": "Ohne neuesten Prüfpunkt beenden",
    "electron.draftCheckpointFailed.return": "Zum Artikel zurückkehren",
    "electron.draftCheckpointFailed.title": "Entwurfsprüfpunkt fehlgeschlagen",
    "electron.restoreBackup.cancel": "Abbrechen",
    "electron.restoreBackup.detail": (
        "Warplyn speichert die neuesten Entwurfsprüfpunkte, behält eine Wiederherstellungskopie der aktiven D" +
        "aten und startet neu. Bestehende KI-Verbindungen bleiben lokal. Verweise auf Umgebungsvariablen könn" +
        "en wiederhergestellt werden; API-Schlüssel und Variablenwerte werden nie importiert. Dies lässt sich" +
        " in den Einstellungen nicht rückgängig machen."
    ),
    "electron.restoreBackup.message": "Dadurch werden deine aktiven lokalen Warplyn-Daten durch die gewählte Sicherung ersetzt.",
    "electron.restoreBackup.restore": "Wiederherstellen und neu starten",
    "electron.restoreBackup.title": "Diese Sicherung wiederherstellen?",
    "electron.restoreFailed.message": (
        "Schließe andere Warplyn-Fenster oder lokale Entwicklungsserver, die diese Daten verwenden, und versuche es ern" +
        "eut. Deine aktiven Daten bleiben unverändert."
    ),
    "electron.restoreFailed.title": "Die Sicherung konnte nicht wiederhergestellt werden",
    "electron.spelling.addWord": "Zum Wörterbuch hinzufügen",
    "electron.startFailed.message": "Prüfe, ob das lokale Datenverzeichnis verfügbar ist, und versuche es erneut.",
    "electron.startFailed.title": "Warplyn konnte nicht starten",
} satisfies Partial<Record<MessageId, string>>;
