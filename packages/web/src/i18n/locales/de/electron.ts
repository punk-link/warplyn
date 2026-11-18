import type { MessageId } from "../../messages.js";

export const electronMessages = {
    "electron.spelling.addWord": "Zum Wörterbuch hinzufügen",
    "electron.articleFiles.markdown": "Markdown-Dateien",
    "electron.articleFiles.html": "HTML-Dateien",
    "electron.articleFiles.docx": "Word-Dateien",
    "electron.articleFiles.rtf": "Rich-Text-Dateien",
    "electron.articleFiles.load": "Artikel aus Datei laden",
    "electron.articleFiles.save": "Artikel in Datei speichern",
    "electron.draftCheckpointFailed.title": "Entwurfsprüfpunkt fehlgeschlagen",
    "electron.draftCheckpointFailed.message": "Warplyn konnte den neuesten Entwurfsprüfpunkt nicht speichern.",
    "electron.draftCheckpointFailed.detail": (
        "Kehre zum Artikel zurück und versuche es erneut oder beende die App ohne die neuesten " +
        "ungespeicherten Änderungen."
    ),
    "electron.draftCheckpointFailed.return": "Zum Artikel zurückkehren",
    "electron.draftCheckpointFailed.quit": "Ohne neuesten Prüfpunkt beenden",
    "electron.closeFailed.title": "Warplyn konnte nicht ordnungsgemäß beendet werden",
    "electron.closeFailed.message": "Der Entwurfsprüfpunkt wurde gespeichert, aber die lokale Datenbank wurde nicht ordnungsgemäß geschlossen.",
    "electron.startFailed.title": "Warplyn konnte nicht starten",
    "electron.startFailed.message": "Prüfe, ob das lokale Datenverzeichnis verfügbar ist, und versuche es erneut.",
    "electron.deleteData.title": "Alle lokalen Warplyn-Daten löschen?",
    "electron.deleteData.message": (
        "Dadurch werden Artikel, Entwurfsprüfpunkte, gespeicherte Fassungen, Assistentenverlauf, Stildaten, " +
        "Einstellungen und lokale Sicherungen im Datenverzeichnis von Warplyn dauerhaft gelöscht."
    ),
    "electron.deleteData.detail": (
        "Warplyn wird nach dem Löschen beendet. Wenn ein Sicherungsordner eingerichtet ist, kannst du vorher " +
        "eine Sicherung erstellen."
    ),
    "electron.deleteData.backup": "Vor dem Löschen eine Sicherung erstellen",
    "electron.deleteData.delete": "Alle lokalen Daten löschen",
    "electron.deleteData.cancel": "Abbrechen",
    "electron.restoreBackup.title": "Diese Sicherung wiederherstellen?",
    "electron.restoreBackup.message": "Dadurch werden deine aktiven lokalen Warplyn-Daten durch die gewählte Sicherung ersetzt.",
    "electron.restoreBackup.detail": (
        "Warplyn speichert die neuesten Entwurfsprüfpunkte, behält eine Wiederherstellungskopie der aktiven " +
        "Daten und startet neu. Bestehende KI-Verbindungen bleiben lokal. Verweise auf Umgebungsvariablen " +
        "können wiederhergestellt werden; API-Schlüssel und Variablenwerte werden nie importiert. Dies lässt " +
        "sich in den Einstellungen nicht rückgängig machen."
    ),
    "electron.restoreBackup.restore": "Wiederherstellen und neu starten",
    "electron.restoreBackup.cancel": "Abbrechen",
    "electron.restoreFailed.title": "Die Sicherung konnte nicht wiederhergestellt werden",
    "electron.restoreFailed.message": (
        "Schließe andere Warplyn-Fenster oder lokale Entwicklungsserver, die diese Daten verwenden, und " +
        "versuche es erneut. Deine aktiven Daten bleiben unverändert."
    ),
} satisfies Partial<Record<MessageId, string>>;
