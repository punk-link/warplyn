import type { MessageId } from "../../messages.js";

export const settingsMessages = {
    "settings.spelling": "Rechtschreibung",
    "settings.assistantRequestTimeout": "Zeitlimit für Anfragen",
    "settings.assistantRequestTimeoutHint": (
        "Stoppt Anfragen an den Assistenten nach dieser Zeit. Gilt für neue Anfragen, auch für erneute " +
        "Versuche. Bei Zeitüberschreitung bleibt Ihr Artikel unverändert."
    ),
    "settings.requestTimeoutMinutes": "{minutes, plural, one {# Minute} other {# Minuten}}",
    "settings.requestTimeoutUnlimited": "Unbegrenzt",
    "settings.animations": "Animationen",
    "settings.animationsHint": (
        "Animiert Anzeigen, Assistentennachrichten und Oberflächeneffekte. Die Einstellung Ihres Geräts zur " +
        "Reduzierung von Bewegungen gilt weiterhin."
    ),
    "settings.general.interfaceLocale.english": "Englisch",
    "settings.navigation": "Einstellungsnavigation",
    "settings.backToWorkspace": "Zurück zum Arbeitsbereich",
    "settings.general": "Allgemein",
    "settings.keyBindings": "Tastenkombinationen",
    "settings.keyBindingsIntro": (
        "Wählen Sie die Tastenkombinationen, die Warplyn auf diesem Computer verwendet. Änderungen gelten für " +
        "die künftige Nutzung und verändern niemals einen Artikel."
    ),
    "settings.keyBindingCategory.general": "Allgemein",
    "settings.keyBindingCategory.editing": "Bearbeitung",
    "settings.keyBindingCategory.workspace": "Bereiche und Ansichten",
    "settings.keyBindingCategory.window": "Fenster",
    "settings.keyBindingCategory.assistant": "Redaktioneller Assistent",
    "settings.assistantSendMode": "Senden mit",
    "settings.assistantSendModeHint": "Wählen Sie, ob die Eingabetaste die Anfrage sendet oder eine neue Zeile einfügt.",
    "settings.sendWithEnter": "Eingabetaste",
    "settings.sendWithCtrlEnter": "Strg + Eingabetaste",
    "settings.recordKeyBinding": "Tastenkombination für {command} aufzeichnen",
    "settings.recordingKeyBinding": "Tastenkombination drücken…",
    "settings.clearKeyBinding": "Löschen",
    "settings.resetKeyBinding": "Auf Standard zurücksetzen",
    "settings.keyBindingConflict": "Löschen oder ändern Sie sie zuerst.",
    "settings.keyBindingConflictTitle": "Zugewiesen an",
    "settings.ai": "KI-Assistent",
    "settings.providers": "Anbieter",
    "settings.publishing": "Veröffentlichung",
    "settings.dataBackups": "Daten und Sicherungen",
    "settings.about": "Über Warplyn",
    "settings.aboutDescription": (
        "Ein Arbeitsbereich zum Schreiben mit vorrangig lokaler Speicherung und einem redaktionellen " +
        "KI-Assistenten, wenn Sie Hilfe wünschen."
    ),
    "settings.projectResources": "Projektressourcen",
    "settings.mitLicense": "MIT-Lizenz",
    "settings.documentation": "Dokumentation",
    "settings.sourceCode": "Quellcode",
    "settings.reportProblem": "Problem melden",
    "settings.quickStart": "Schnellstart",
    "settings.quickStartHint": "Erfahren Sie, wie Artikel, der Assistent und Modellschlüssel funktionieren.",
    "settings.openQuickStart": "Schnellstart öffnen",
    "settings.appearanceAndLanguage": "Darstellung und Sprache",
    "settings.dateAndTime": "Datum und Uhrzeit",
    "settings.connections": "Verbindungen",
    "settings.models": "Modelle",
    "settings.publishingProfiles": "Veröffentlichungsprofile",
    "settings.languageDefaults": "Standardsprachen",
    "settings.backupStorage": "Sicherungsspeicher",
    "settings.backupAutomation": "Automatische Sicherungen",
    "settings.preferredAppearance": "Bevorzugte Darstellung",
    "settings.appearanceHint": (
        "Wählen Sie die Darstellung von Warplyn. System folgt Ihrer Geräteeinstellung und aktualisiert sich, " +
        "während Warplyn geöffnet ist."
    ),
    "settings.system": "System",
    "settings.light": "Hell",
    "settings.dark": "Dunkel",
    "settings.applyAppearance": "Jetzt anwenden",
    "settings.interfaceLanguage": "Oberflächensprache",
    "settings.interfaceLanguageHint": "Ändert die Sprache der Bedienelemente und Meldungen von Warplyn. Ihre Artikelinhalte bleiben unverändert.",
    "settings.dateFormat": "Datumsformat",
    "settings.dateFormatHint": "Ändert die Datumsanzeige in Warplyn. Gespeicherte Datumswerte und der Fassungsverlauf bleiben unverändert.",
    "settings.systemDateFormat": "System-Datumsformat ({value})",
    "settings.resetDateFormat": "System-Datumsformat verwenden",
    "settings.dayFirstSlash": "TT/MM/JJJJ",
    "settings.dayFirstDots": "TT.MM.JJJJ",
    "settings.monthFirstSlash": "MM/TT/JJJJ",
    "settings.isoDate": "JJJJ-MM-TT",
    "settings.twelveHour": "12 Stunden",
    "settings.twentyFourHour": "24 Stunden",
    "settings.timeFormat": "Zeitformat",
    "settings.timeFormatHint": "Ändert die Zeitanzeige in Warplyn. Gespeicherte Datumswerte und der Fassungsverlauf bleiben unverändert.",
    "settings.systemTimeFormat": "System-Zeitformat ({value})",
    "settings.resetTimeFormat": "System-Zeitformat verwenden",
    "settings.timeZone": "Zeitzone",
    "settings.timeZoneHint": (
        "Die Systemzeitzone folgt diesem Gerät. Wählen Sie eine Region, um auf Reisen deren Uhrzeit " +
        "beizubehalten. Dies ändert nur angezeigte Zeiten, keine gespeicherten Zeitstempel."
    ),
    "settings.systemTimeZone": "Systemzeitzone {timeZone}",
    "settings.localTimeZone": "Ortszeit",
    "settings.resetTimeZone": "Systemzeitzone verwenden",
    "settings.example": "Beispiel: {value}",
    "settings.defaultArticleLanguage": "Standard-Artikelsprache",
    "settings.defaultArticleLanguageHint": "Wird für neue Artikel verwendet, wenn Sie keine Sprache auswählen. Bestehende Artikel werden nicht geändert.",
    "settings.defaultTranslationLanguages": "Standard-Übersetzungssprachen",
    "settings.defaultTranslationLanguagesHint": (
        "Beim Start einer neuen Übersetzung vorausgewählt. Sie können die Zielsprachen vor der Generierung " +
        "ändern."
    ),
    "settings.addConnection": "KI-Verbindung hinzufügen",
    "settings.connectionHint": "Ihr Anbieterschlüssel bleibt auf diesem Computer privat. Warplyn speichert nur den Namen seines Speicherorts.",
    "settings.provider": "Anbieter",
    "settings.providerHint": "Wählen Sie den Dienst, der diesen API-Schlüssel ausgestellt hat.",
    "settings.provider.openai": "OpenAI",
    "settings.provider.opencode": "OpenCode Zen",
    "settings.provider.anthropic": "Anthropic",
    "settings.provider.google": "Google Gemini API",
    "settings.provider.xai": "xAI Grok",
    "settings.provider.deepseek": "DeepSeek",
    "settings.providerLimitations": (
        "Die verfügbaren redaktionellen Vorgänge hängen vom ausgewählten Modell ab. Quellenbasierte " +
        "Faktenprüfung, strukturierte Ausgaben und Denksteuerung sind möglicherweise nicht verfügbar."
    ),
    "settings.chooseConnectionMethod": "Wie möchten Sie Ihren Schlüssel bereitstellen?",
    "settings.chooseConnectionMethodHint": "Wählen Sie eine Methode. Sie können später eine weitere Verbindung hinzufügen.",
    "settings.environmentVariable": "Umgebungsvariable",
    "settings.addApiKey": "API-Schlüssel hinzufügen",
    "settings.addApiKeyHint": (
        "Warplyn prüft den Schlüssel und speichert ihn dann in der Windows-Anmeldeinformationsverwaltung. Er " +
        "wird niemals angezeigt oder in Warplyn-Daten gespeichert."
    ),
    "settings.apiKey": "API-Schlüssel",
    "settings.apiKeyHint": "Fügen Sie den Schlüssel Ihres KI-Anbieters ein.",
    "settings.apiKeyPlaceholder": "API-Schlüssel einfügen",
    "settings.addApiKeyButton": "API-Schlüssel hinzufügen",
    "settings.connectionName": "Verbindungsname",
    "settings.connectionNameHint": "Verwenden Sie einen vertrauten Namen, etwa Persönliche KI.",
    "settings.connectionNamePlaceholder": "Zum Beispiel Persönliche KI",
    "settings.environmentName": "Name der Umgebungsvariable",
    "settings.environmentNameHint": "Der beim Start Ihres lokalen Diensts verwendete Name. Ihr Schlüssel wird niemals angezeigt.",
    "settings.environmentNamePlaceholder": "Zum Beispiel AI_API_KEY",
    "settings.addConnectionButton": "Verbindung hinzufügen",
    "settings.configuredConnections": "Eingerichtete Verbindungen",
    "settings.configuredConnectionsHint": (
        "Diese Verbindungseinstellungen werden lokal gespeichert. Aktive Verbindungen stellen Modelle bereit. " +
        "Ihr Schlüssel wird weder gespeichert noch angezeigt."
    ),
    "settings.activeConnection": "Aktive Verbindung",
    "settings.activeConnectionShort": "Aktiv",
    "settings.activateConnectionShort": "Aktivieren",
    "settings.deactivateConnectionShort": "Deaktivieren",
    "settings.useConnection": "Diese Verbindung verwenden",
    "settings.useConnectionShort": "Verwenden",
    "settings.renameConnection": "Verbindung umbenennen",
    "settings.renameConnectionShort": "Umbenennen",
    "settings.renameConnectionTitle": "KI-Verbindung umbenennen",
    "settings.renameConnectionHint": "Wählen Sie einen lokalen Namen für diese Verbindung.",
    "settings.saveConnectionName": "Namen speichern",
    "settings.removeConnection": "Verbindung entfernen",
    "settings.removeConnectionShort": "Entfernen",
    "settings.removeConnectionTitle": "KI-Verbindung entfernen?",
    "settings.removeConnectionDescription": (
        "Entfernt {connectionName} aus Warplyn. Die Umgebungsvariable und ihr Schlüssel werden nicht von " +
        "Ihrem Computer entfernt."
    ),
    "settings.defaultModel": "Standardmodell",
    "settings.defaultModelHint": "Wird für KI-Aufgaben verwendet, sofern für eine Aufgabe kein eigenes Modell gewählt wurde.",
    "settings.appModel": "Anwendungsmodell",
    "settings.appModelHint": (
        "Wird für Warplyn-Funktionen wie Zusammenfassungen und Titel verwendet. Wenn nicht festgelegt, " +
        "verwendet Warplyn das Standardmodell."
    ),
    "settings.model": "Modell",
    "settings.modelHint": "Prüfen Sie eine Verbindung und aktualisieren Sie deren verfügbare Modelle, bevor Sie eines wählen.",
    "settings.reasoningEffort": "Denkniveau",
    "settings.reasoningEffortHint": "Steuert, wie viel Arbeit das Modell vor der Antwort leistet. Höhere Stufen können länger dauern.",
    "settings.reasoningLow": "Niedrig",
    "settings.reasoningMedium": "Mittel",
    "settings.reasoningHigh": "Hoch",
    "settings.noModels": "Noch keine verfügbaren Modelle",
    "settings.chooseModel": "Modell auswählen",
    "settings.favoriteModels": "Favoriten",
    "settings.searchModels": "Modelle suchen",
    "settings.clearModelSearch": "Modellsuche löschen",
    "settings.modelVendorFilters": "Modelle nach Anbieter filtern",
    "settings.modelVendor.openai": "OpenAI",
    "settings.modelVendor.other": "Andere",
    "settings.addFavoriteModel": "{model} zu Favoriten hinzufügen",
    "settings.removeFavoriteModel": "{model} aus Favoriten entfernen",
    "settings.noMatchingModels": "Keine Modelle entsprechen diesem Filter.",
    "settings.refreshModels": "Verfügbare Modelle aktualisieren",
    "settings.specificModels": "Modelle für bestimmte Aufgaben",
    "settings.specificModelsHint": "Wählen Sie ein Modell für eine Aufgabe oder verwenden Sie das Standardmodell. Dies betrifft nur künftige KI-Anfragen.",
    "settings.useDefaultModel": "Standardmodell verwenden",
    "settings.specificModelHint": "Behalten Sie Standardmodell verwenden bei, sofern diese Aufgabe kein anderes Modell benötigt.",
    "settings.publishingProfile": "Zeichengrenzenprofil",
    "settings.publishingProfileHint": (
        "Zeigt an, wenn der Veröffentlichungstext diese Länge erreicht. Das Limit ist ein Richtwert und " +
        "verhindert niemals das Kopieren."
    ),
    "settings.publishingProfileNote": (
        "Dieses Profil wird von der Artikelstatusleiste und dem Kopierbefehl verwendet. Bearbeitbare eigene " +
        "Profile werden auf diesen Grundlagen aufbauen."
    ),
    "settings.profileCharacters": "{label} — {count} Zeichen",
    "settings.backupFolder": "Sicherungsordner",
    "settings.backupFolderHint": "Wählen Sie einen lokalen Ordner für Sicherungskopien. Warplyn kann erst nach Ihrer Auswahl dorthin schreiben.",
    "settings.chooseBackupFolder": "Sicherungsordner auswählen",
    "settings.revealBackupFolder": "Ordner anzeigen",
    "settings.managedCredential": "Verwaltete Anmeldedaten",
    "settings.backupFolderSelected": "Verwendet {folderName}",
    "settings.backupFolderFailed": "Dieser Ordner konnte nicht ausgewählt werden. Versuchen Sie es erneut.",
    "settings.backupFolderRequired": "Wählen Sie zuerst einen Sicherungsordner.",
    "settings.backupFolderPermissionDenied": (
        "Warplyn kann auf diesen Sicherungsordner nicht zugreifen. Wählen Sie ihn erneut aus und erlauben Sie " +
        "den Zugriff."
    ),
    "settings.backupFolderUnsupported": "Dieser Browser kann keinen Sicherungsordner auswählen.",
    "settings.automaticBackups": "Automatische Sicherungen",
    "settings.automaticBackupsHint": (
        "Erstellt bei Aktivierung kurz nach dem Start eine Sicherung und anschließend alle 24 Stunden ab " +
        "diesem Lauf, solange Warplyn geöffnet bleibt. Manuelle Sicherungen werden niemals automatisch " +
        "entfernt."
    ),
    "settings.automaticBackupFailed": (
        "Automatische Sicherung fehlgeschlagen. Prüfen Sie den Sicherungsordner unter Daten und Sicherungen " +
        "und erstellen Sie dann eine manuelle Sicherung. Ihre Artikel bleiben unverändert."
    ),
    "settings.off": "Aus",
    "settings.daily": "Täglich",
    "settings.retention": "Aufbewahrung automatischer Sicherungen",
    "settings.retentionHint": (
        "Legt fest, wie viele automatische Sicherungen Warplyn aufbewahrt. Manuelle Sicherungen werden " +
        "niemals automatisch entfernt."
    ),
    "settings.keepBackups": "{count} Sicherungen behalten",
    "settings.keepAllBackups": "Alle Sicherungen behalten",
    "settings.createBackup": "Sicherung erstellen",
    "settings.createBackupHint": (
        "Sichert Ihre Artikel, gespeicherten Fassungen, Einstellungen, Autorenfähigkeiten und deren Verlauf. " +
        "Browsersicherungen unterstützen Dateien bis 100 MB und insgesamt 500 MB. API-Schlüssel werden " +
        "ausgeschlossen."
    ),
    "settings.backupCreating": "Sicherung wird erstellt…",
    "settings.backupCreated": "{name} erstellt",
    "settings.backupCreateFailed": (
        "Die Sicherung konnte nicht erstellt werden. Prüfen Sie den gewählten Ordner und die " +
        "Größenbeschränkungen des Browsers und versuchen Sie es erneut. Ihre Bearbeitungssitzung bleibt " +
        "unverändert."
    ),
    "settings.backupCreateUnavailable": "Sicherungen sind in dieser Browsersitzung nicht verfügbar.",
    "settings.restoreBackup": "Sicherung wiederherstellen",
    "settings.restoreBackupHint": (
        "Wählen Sie eine Sicherung aus dem gewählten Ordner. Warplyn prüft ihre Dateien, behält eine " +
        "Wiederherstellungskopie und stellt dann Artikel, gespeicherte Fassungen, Einstellungen und " +
        "Fähigkeiten wieder her. Bestehende KI-Verbindungen bleiben lokal. Verweise auf Umgebungsvariablen " +
        "können wiederhergestellt werden; API-Schlüssel und Variablenwerte werden niemals importiert. Ältere " +
        "reine Datenbanksicherungen behalten Ihre aktuellen Fähigkeiten bei."
    ),
    "settings.restoreBackupFailed": (
        "Diese Sicherung konnte nicht wiederhergestellt werden. Prüfen Sie ihre Dateien und die " +
        "Größenbeschränkungen des Browsers oder wählen Sie eine andere Sicherung. Ihre aktiven Daten bleiben " +
        "unverändert."
    ),
    "settings.restoreBackupUnavailable": "Diese Sicherung kann nicht wiederhergestellt werden.",
    "settings.chooseBackup": "Sicherung auswählen",
    "settings.restoreBackupConfirm": "{name} wiederherstellen? Warplyn ersetzt die aktiven lokalen Daten und lädt neu.",
    "settings.deleteData": "Lokale Daten löschen",
    "settings.deleteLocalData": "Alle lokalen Daten löschen",
    "settings.deleteLocalDataHint": (
        "Entfernt dauerhaft Artikel, Prüfpunkte, gespeicherte Fassungen, Assistentenverlauf, Stildaten, " +
        "Einstellungen und lokale Sicherungen im Warplyn-Datenordner. Sie können im Bestätigungsdialog " +
        "zunächst eine geprüfte Sicherung erstellen."
    ),
    "settings.deleteLocalDataFailed": "Lokale Daten konnten nicht gelöscht werden. Eine vollständige Löschung wurde nicht bestätigt.",
    "settings.loading": "Einstellungen werden geladen…",
    "settings.privacyAndDiagnostics": "Datenschutz und Diagnose",
    "settings.telemetry": "Diagnose- und Nutzungsdaten teilen",
    "settings.telemetryHint": (
        "Helfen Sie uns, Warplyn zu verbessern, indem Sie pseudonyme Zuverlässigkeits- und Nutzungsereignisse " +
        "an PostHog senden. Artikeltext, Prompts, KI-Antworten und API-Schlüssel sind niemals enthalten."
    ),
} satisfies Partial<Record<MessageId, string>>;
