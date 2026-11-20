import type { MessageId } from "../../messages.js";


export const settingsBackupsMessages = {
    "settings.automaticBackupFailed": (
        "Automatische Sicherung fehlgeschlagen. Prüfen Sie den Sicherungsordner unter Daten und Sicherungen u" +
        "nd erstellen Sie dann eine manuelle Sicherung. Ihre Artikel bleiben unverändert."
    ),
    "settings.automaticBackups": "Automatische Sicherungen",
    "settings.automaticBackupsHint": (
        "Erstellt bei Aktivierung kurz nach dem Start eine Sicherung und anschließend alle 24 Stunden ab dies" +
        "em Lauf, solange Warplyn geöffnet bleibt. Manuelle Sicherungen werden niemals automatisch entfernt."
    ),
    "settings.backupAutomation": "Automatische Sicherungen",
    "settings.backupCreateFailed": (
        "Die Sicherung konnte nicht erstellt werden. Prüfen Sie den gewählten Ordner und die Größenbeschränku" +
        "ngen des Browsers und versuchen Sie es erneut. Ihre Bearbeitungssitzung bleibt unverändert."
    ),
    "settings.backupCreateUnavailable": "Sicherungen sind in dieser Browsersitzung nicht verfügbar.",
    "settings.backupCreated": "{name} erstellt",
    "settings.backupCreating": "Sicherung wird erstellt…",
    "settings.backupFolder": "Sicherungsordner",
    "settings.backupFolderFailed": "Dieser Ordner konnte nicht ausgewählt werden. Versuchen Sie es erneut.",
    "settings.backupFolderHint": "Wählen Sie einen lokalen Ordner für Sicherungskopien. Warplyn kann erst nach Ihrer Auswahl dorthin schreiben.",
    "settings.backupFolderPermissionDenied": (
        "Warplyn kann auf diesen Sicherungsordner nicht zugreifen. Wählen Sie ihn erneut aus und erlauben Sie den Zugri" +
        "ff."
    ),
    "settings.backupFolderRequired": "Wählen Sie zuerst einen Sicherungsordner.",
    "settings.backupFolderSelected": "Verwendet {folderName}",
    "settings.backupFolderUnsupported": "Dieser Browser kann keinen Sicherungsordner auswählen.",
    "settings.backupSaveFailed": (
        "Sicherungseinstellungen konnten nicht gespeichert werden. Ihre bisherigen Einstellungen bleiben unverändert. V" +
        "ersuchen Sie es erneut."
    ),
    "settings.backupStorage": "Sicherungsspeicher",
    "settings.chooseBackup": "Sicherung auswählen",
    "settings.chooseBackupFolder": "Auswählen…",
    "settings.createBackup": "Sichern",
    "settings.createBackupHint": (
        "Sichert Ihre Artikel, gespeicherten Fassungen, Einstellungen, Autorenfähigkeiten und deren Verlauf. " +
        "Browsersicherungen unterstützen Dateien bis 100 MB und insgesamt 500 MB. API-Schlüssel werden ausges" +
        "chlossen."
    ),
    "settings.dataBackups": "Daten",
    "settings.keepAllBackups": "Alle Sicherungen behalten",
    "settings.keepBackups": "{count} Sicherungen behalten",
    "settings.restoreBackup": "Wiederherstellen",
    "settings.restoreBackupConfirm": "{name} wiederherstellen? Warplyn ersetzt die aktiven lokalen Daten und lädt neu.",
    "settings.restoreBackupFailed": (
        "Diese Sicherung konnte nicht wiederhergestellt werden. Prüfen Sie ihre Dateien und die Größenbeschrä" +
        "nkungen des Browsers oder wählen Sie eine andere Sicherung. Ihre aktiven Daten bleiben unverändert."
    ),
    "settings.restoreBackupHint": (
        "Wählen Sie eine Sicherung aus dem gewählten Ordner. Warplyn prüft ihre Dateien, behält eine Wiederhe" +
        "rstellungskopie und stellt dann Artikel, gespeicherte Fassungen, Einstellungen und Fähigkeiten wiede" +
        "r her. Bestehende KI-Verbindungen bleiben lokal. Verweise auf Umgebungsvariablen können wiederherges" +
        "tellt werden; API-Schlüssel und Variablenwerte werden niemals importiert. Ältere reine Datenbanksich" +
        "erungen behalten Ihre aktuellen Fähigkeiten bei."
    ),
    "settings.restoreBackupUnavailable": "Diese Sicherung kann nicht wiederhergestellt werden.",
    "settings.retention": "Aufbewahrung automatischer Sicherungen",
    "settings.retentionHint": (
        "Legt fest, wie viele automatische Sicherungen Warplyn aufbewahrt. Manuelle Sicherungen werden niemal" +
        "s automatisch entfernt."
    ),
    "settings.revealBackupFolder": "Ordner anzeigen",
} satisfies Partial<Record<MessageId, string>>;
