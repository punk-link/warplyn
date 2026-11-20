import type { MessageId } from "../../messages.js";


export const settingsMessages = {
    "settings.about": "Über Warplyn",
    "settings.aboutDescription": (
        "Ein Arbeitsbereich zum Schreiben mit vorrangig lokaler Speicherung und einem redaktionellen KI-Assistenten, we" +
        "nn Sie Hilfe wünschen."
    ),
    "settings.activateConnectionShort": "Aktivieren",
    "settings.activeConnection": "Aktive Verbindung",
    "settings.activeConnectionShort": "Aktiv",
    "settings.addApiKey": "API-Schlüssel hinzufügen",
    "settings.addApiKeyButton": "API-Schlüssel hinzufügen",
    "settings.addApiKeyHint": (
        "Warplyn prüft den Schlüssel und speichert ihn dann in der Windows-Anmeldeinformationsverwaltung. Er wird niema" +
        "ls angezeigt oder in Warplyn-Daten gespeichert."
    ),
    "settings.addConnection": "KI-Verbindung hinzufügen",
    "settings.addConnectionButton": "Verbindung hinzufügen",
    "settings.addCustomProfile": "Profil hinzufügen",
    "settings.addFavoriteModel": "{model} zu Favoriten hinzufügen",
    "settings.ai": "KI-Assistent",
    "settings.allowNetworkAccess": "Erlauben",
    "settings.animations": "Animationen",
    "settings.animationsHint": (
        "Animiert Anzeigen, Assistentennachrichten und Oberflächeneffekte. Die Einstellung Ihres Geräts zur Reduzierung" +
        " von Bewegungen gilt weiterhin."
    ),
    "settings.apiKey": "API-Schlüssel",
    "settings.apiKeyHint": "Fügen Sie den Schlüssel Ihres KI-Anbieters ein.",
    "settings.apiKeyPlaceholder": "API-Schlüssel einfügen",
    "settings.appModel": "Anwendungsmodell",
    "settings.appModelHint": (
        "Wird für Warplyn-Funktionen wie Zusammenfassungen und Titel verwendet. Wenn nicht festgelegt, verwendet Warply" +
        "n das Standardmodell."
    ),
    "settings.appearanceAndLanguage": "Darstellung und Sprache",
    "settings.appearanceHint": (
        "Wählen Sie die Darstellung von Warplyn. System folgt Ihrer Geräteeinstellung und aktualisiert sich, während Wa" +
        "rplyn geöffnet ist."
    ),
    "settings.applyAppearance": "Jetzt anwenden",
    "settings.assistantBehavior": "Bearbeitung und Anfragen",
    "settings.assistantRequestTimeout": "Zeitlimit für Anfragen",
    "settings.assistantRequestTimeoutHint": (
        "Stoppt Anfragen an den Assistenten nach dieser Zeit. Gilt für neue Anfragen, auch für erneute Versuche. Bei Ze" +
        "itüberschreitung bleibt Ihr Artikel unverändert."
    ),
    "settings.assistantSendMode": "Senden mit",
    "settings.assistantSendModeHint": "Wählen Sie, ob die Eingabetaste die Anfrage sendet oder eine neue Zeile einfügt.",
    "settings.backToWorkspace": "Zurück",
    "settings.chooseConnectionMethod": "Wie möchten Sie Ihren Schlüssel bereitstellen?",
    "settings.chooseConnectionMethodHint": "Wählen Sie eine Methode. Sie können später eine weitere Verbindung hinzufügen.",
    "settings.chooseModel": "Modell auswählen",
    "settings.clearKeyBinding": "Löschen",
    "settings.clearModelSearch": "Modellsuche löschen",
    "settings.configuredConnections": "Eingerichtete Verbindungen",
    "settings.configuredConnectionsHint": (
        "Diese Verbindungseinstellungen werden lokal gespeichert. Aktive Verbindungen stellen Modelle bereit. Ihr Schlü" +
        "ssel wird weder gespeichert noch angezeigt."
    ),
    "settings.connectionAddFailed": (
        "Diese KI-Verbindung konnte nicht hinzugefügt werden. Ihre Einstellungen wurden nicht geändert. Prüfen Sie die " +
        "Angaben und versuchen Sie es erneut."
    ),
    "settings.connectionHint": "Ihr Anbieterschlüssel bleibt auf diesem Computer privat. Warplyn speichert nur den Namen seines Speicherorts.",
    "settings.connectionName": "Verbindungsname",
    "settings.connectionNameHint": "Verwenden Sie einen vertrauten Namen, etwa Persönliche KI.",
    "settings.connectionNamePlaceholder": "Zum Beispiel Persönliche KI",
    "settings.connectionRemoveFailed": (
        "Diese KI-Verbindung konnte nicht entfernt werden. Sie ist weiterhin in den Einstellungen verfügbar. Versuchen " +
        "Sie es erneut."
    ),
    "settings.connectionUpdateFailed": (
        "Diese KI-Verbindung konnte nicht aktualisiert werden. Ihre bisherigen Einstellungen bleiben unverändert. Versu" +
        "chen Sie es erneut."
    ),
    "settings.connections": "Verbindungen",
    "settings.copyTelemetryIdentifier": "ID kopieren",
    "settings.customProfileInvalid": "Geben Sie einen Namen und eine ganze, nicht negative Zeichengrenze ein.",
    "settings.customProfileLimit": "Eigene Zeichengrenze",
    "settings.customProfileLimitHint": "Ein nicht negativer Richtwert. Er blockiert niemals das Kopieren.",
    "settings.customProfileName": "Name des eigenen Profils",
    "settings.customProfileNameHint": "Die lokale Bezeichnung Ihrer eigenen Veröffentlichungsgrenze.",
    "settings.customProfiles": "Eigene Profile",
    "settings.customProfilesHint": "Fügen Sie so viele lokale Zeichengrenzenprofile hinzu, wie Sie benötigen.",
    "settings.daily": "Täglich",
    "settings.dark": "Dunkel",
    "settings.dateAndTime": "Datum und Uhrzeit",
    "settings.dateFormat": "Datumsformat",
    "settings.dateFormatHint": "Ändert die Datumsanzeige in Warplyn. Gespeicherte Datumswerte und der Fassungsverlauf bleiben unverändert.",
    "settings.dayFirstDots": "TT.MM.JJJJ",
    "settings.dayFirstSlash": "TT/MM/JJJJ",
    "settings.deactivateConnectionShort": "Deaktivieren",
    "settings.defaultArticleLanguage": "Standard-Artikelsprache",
    "settings.defaultArticleLanguageHint": "Wird für neue Artikel verwendet, wenn Sie keine Sprache auswählen. Bestehende Artikel werden nicht geändert.",
    "settings.defaultAssistantEditMode": "Standard-Bearbeitungsmodus des Assistenten",
    "settings.defaultAssistantEditModeHint": (
        "Neue Artikelgespräche verwenden diesen Modus; bestehende Gespräche behalten ihren. Der direkte Modus" +
        " überspringt die Vorschlagsprüfung nur für ausdrücklich angeforderte Bearbeitungen. Andere Vorschläg" +
        "e müssen weiterhin geprüft werden."
    ),
    "settings.defaultModel": "Standardmodell",
    "settings.defaultModelHint": "Wird für KI-Aufgaben verwendet, sofern für eine Aufgabe kein eigenes Modell gewählt wurde.",
    "settings.defaultTranslationLanguages": "Standard-Übersetzungssprachen",
    "settings.defaultTranslationLanguagesHint": (
        "Beim Start einer neuen Übersetzung vorausgewählt. Sie können die Zielsprachen vor der Generierung än" +
        "dern."
    ),
    "settings.deleteData": "Lokale Daten löschen",
    "settings.deleteLocalData": "Alle lokalen Daten löschen",
    "settings.deleteLocalDataFailed": "Lokale Daten konnten nicht gelöscht werden. Eine vollständige Löschung wurde nicht bestätigt.",
    "settings.deleteLocalDataHint": (
        "Entfernt dauerhaft Artikel, Prüfpunkte, gespeicherte Fassungen, Assistentenverlauf, Stildaten, Einst" +
        "ellungen und lokale Sicherungen im Warplyn-Datenordner. Sie können im Bestätigungsdialog zunächst ei" +
        "ne geprüfte Sicherung erstellen."
    ),
    "settings.documentation": "Dokumentation",
    "settings.downloadUpdate": "Herunterladen",
    "settings.environmentName": "Name der Umgebungsvariable",
    "settings.environmentNameHint": "Der beim Start Ihres lokalen Diensts verwendete Name. Ihr Schlüssel wird niemals angezeigt.",
    "settings.environmentNamePlaceholder": "Zum Beispiel AI_API_KEY",
    "settings.environmentVariable": "Umgebungsvariable",
    "settings.example": "Beispiel: {value}",
    "settings.favoriteModels": "Favoriten",
    "settings.general": "Allgemein",
    "settings.general.interfaceLocale.english": "Englisch",
    "settings.includePrereleaseUpdates": "Vorabversionen einbeziehen",
    "settings.includePrereleaseUpdatesHint": "Wenn deaktiviert, bietet Warplyn nur stabile Versionen an.",
    "settings.interfaceLanguage": "Oberflächensprache",
    "settings.interfaceLanguageHint": "Ändert die Sprache der Bedienelemente und Meldungen von Warplyn. Ihre Artikelinhalte bleiben unverändert.",
    "settings.isoDate": "JJJJ-MM-TT",
    "settings.keyBindingCategory.assistant": "Redaktioneller Assistent",
    "settings.keyBindingCategory.editing": "Bearbeitung",
    "settings.keyBindingCategory.general": "Allgemein",
    "settings.keyBindingCategory.window": "Fenster",
    "settings.keyBindingCategory.workspace": "Bereiche und Ansichten",
    "settings.keyBindingConflict": "Löschen oder ändern Sie sie zuerst.",
    "settings.keyBindingConflictTitle": "Zugewiesen an",
    "settings.keyBindings": "Tastenkürzel",
    "settings.keyBindingsIntro": (
        "Wählen Sie die Tastenkombinationen, die Warplyn auf diesem Computer verwendet. Änderungen gelten für die künft" +
        "ige Nutzung und verändern niemals einen Artikel."
    ),
    "settings.languageDefaults": "Standardsprachen",
    "settings.light": "Hell",
    "settings.loading": "Einstellungen werden geladen…",
    "settings.loadingFailed": (
        "Einstellungen konnten nicht geladen werden. Ihre gespeicherten Einstellungen bleiben unverändert. Aktualisiere" +
        "n Sie die Ansicht und versuchen Sie es erneut."
    ),
    "settings.localTimeZone": "Ortszeit",
    "settings.managedCredential": "Verwaltete Anmeldedaten",
    "settings.mitLicense": "MIT-Lizenz",
    "settings.model": "Modell",
    "settings.modelHint": "Prüfen Sie eine Verbindung und aktualisieren Sie deren verfügbare Modelle, bevor Sie eines wählen.",
    "settings.modelSaveFailed": (
        "Modellpräferenzen konnten nicht gespeichert werden. Ihre bisherigen Einstellungen bleiben unverändert. Versuch" +
        "en Sie es erneut."
    ),
    "settings.modelVendor.openai": "OpenAI",
    "settings.modelVendor.other": "Andere",
    "settings.modelVendorFilters": "Modelle nach Anbieter filtern",
    "settings.models": "Modelle",
    "settings.modelsLoadFailed": "Verfügbare Modelle konnten nicht geladen werden. Ihre Einstellungen wurden nicht geändert. Versuchen Sie es erneut.",
    "settings.monthFirstSlash": "MM/TT/JJJJ",
    "settings.navigation": "Einstellungsnavigation",
    "settings.noMatchingModels": "Keine Modelle entsprechen diesem Filter.",
    "settings.noModels": "Noch keine verfügbaren Modelle",
    "settings.off": "Aus",
    "settings.on": "Ein",
    "settings.openQuickStart": "Schnellstart öffnen",
    "settings.preferredAppearance": "Bevorzugte Darstellung",
    "settings.privacyAndDiagnostics": "Datenschutz und Diagnose",
    "settings.profileCharacters": "{label} — {count} Zeichen",
    "settings.projectResources": "Projektressourcen",
    "settings.provider": "Anbieter",
    "settings.provider.anthropic": "Anthropic",
    "settings.provider.deepseek": "DeepSeek",
    "settings.provider.google": "Google Gemini API",
    "settings.provider.openai": "OpenAI",
    "settings.provider.opencode": "OpenCode Zen",
    "settings.provider.xai": "xAI Grok",
    "settings.providerHint": "Wählen Sie den Dienst, der diesen API-Schlüssel ausgestellt hat.",
    "settings.providerLimitations": (
        "Die verfügbaren redaktionellen Vorgänge hängen vom ausgewählten Modell ab. Quellenbasierte Faktenprü" +
        "fung, strukturierte Ausgaben und Denksteuerung sind möglicherweise nicht verfügbar."
    ),
    "settings.providers": "Anbieter",
    "settings.publishing": "Veröffentlichung",
    "settings.publishingProfile": "Zeichengrenzenprofil",
    "settings.publishingProfileHint": (
        "Zeigt an, wenn der Veröffentlichungstext diese Länge erreicht. Das Limit ist ein Richtwert und verhindert niem" +
        "als das Kopieren."
    ),
    "settings.publishingProfileNote": (
        "Dieses Profil wird von der Artikelstatusleiste und dem Kopierbefehl verwendet. Bearbeitbare eigene Profile wer" +
        "den auf diesen Grundlagen aufbauen."
    ),
    "settings.publishingProfiles": "Veröffentlichungsprofile",
    "settings.publishingSaveFailed": (
        "Veröffentlichungseinstellungen konnten nicht gespeichert werden. Ihre bisherigen Einstellungen bleiben unverän" +
        "dert. Versuchen Sie es erneut."
    ),
    "settings.quickStart": "Schnellstart",
    "settings.quickStartHint": "Erfahren Sie, wie Artikel, der Assistent und Modellschlüssel funktionieren.",
    "settings.reasoningEffort": "Denkniveau",
    "settings.reasoningEffortHint": "Steuert, wie viel Arbeit das Modell vor der Antwort leistet. Höhere Stufen können länger dauern.",
    "settings.reasoningHigh": "Hoch",
    "settings.reasoningLow": "Niedrig",
    "settings.reasoningMedium": "Mittel",
    "settings.recordKeyBinding": "Tastenkombination für {command} aufzeichnen",
    "settings.recordingKeyBinding": "Tastenkombination drücken…",
    "settings.refreshModels": "Aktualisieren",
    "settings.remove": "Entfernen",
    "settings.removeConnection": "Verbindung entfernen",
    "settings.removeConnectionDescription": (
        "Entfernt {connectionName} aus Warplyn. Die Umgebungsvariable und ihr Schlüssel werden nicht von Ihrem Computer" +
        " entfernt."
    ),
    "settings.removeConnectionShort": "Entfernen",
    "settings.removeConnectionTitle": "KI-Verbindung entfernen?",
    "settings.removeCustomDefaultDescription": (
        "<profile>{name}</profile> entfernen? Das Standard-Veröffentlichungsprofil wird auf Standard zurückge" +
        "setzt."
    ),
    "settings.removeCustomProfile": "{name} entfernen",
    "settings.removeCustomProfileDescription": "<profile>{name}</profile> aus Ihren lokalen Veröffentlichungsprofilen entfernen?",
    "settings.removeCustomProfileTitle": "Eigenes Profil entfernen?",
    "settings.removeFavoriteModel": "{model} aus Favoriten entfernen",
    "settings.renameConnection": "Verbindung umbenennen",
    "settings.renameConnectionHint": "Wählen Sie einen lokalen Namen für diese Verbindung.",
    "settings.renameConnectionShort": "Umbenennen",
    "settings.renameConnectionTitle": "KI-Verbindung umbenennen",
    "settings.reportProblem": "Problem melden",
    "settings.requestTimeoutMinutes": "{minutes, plural, one {# Minute} other {# Minuten}}",
    "settings.requestTimeoutUnlimited": "Unbegrenzt",
    "settings.resetDateFormat": "Systemformat",
    "settings.resetKeyBinding": "Zurücksetzen",
    "settings.resetTimeFormat": "Systemformat",
    "settings.resetTimeZone": "Systemzeitzone",
    "settings.retry": "Erneut versuchen",
    "settings.saveConnectionName": "Namen speichern",
    "settings.saveCustomProfile": "Speichern",
    "settings.saveFailed": (
        "Ihre Einstellungen konnten nicht gespeichert werden. Ihre bisherigen Einstellungen bleiben unverände" +
        "rt. Versuchen Sie es erneut."
    ),
    "settings.saved": "Gespeichert",
    "settings.saving": "Wird gespeichert…",
    "settings.searchModels": "Modelle suchen",
    "settings.securityUpdate": "Sicherheitsupdate",
    "settings.sendWithCtrlEnter": "Strg + Eingabetaste",
    "settings.sendWithEnter": "Eingabetaste",
    "settings.showExecutionProgress": "Ausführungsfortschritt anzeigen",
    "settings.showExecutionProgressHint": "Zeigt die aktuelle Aktion und einen einklappbaren Aktivitätsverlauf im Assistentengespräch.",
    "settings.sourceCode": "Quellcode",
    "settings.specificModelHint": "Behalten Sie Standardmodell verwenden bei, sofern diese Aufgabe kein anderes Modell benötigt.",
    "settings.specificModels": "Modelle für bestimmte Aufgaben",
    "settings.specificModelsHint": "Wählen Sie ein Modell für eine Aufgabe oder verwenden Sie das Standardmodell. Dies betrifft nur künftige KI-Anfragen.",
    "settings.spelling": "Rechtschreibung",
    "settings.system": "System",
    "settings.systemDateFormat": "System-Datumsformat ({value})",
    "settings.systemTimeFormat": "System-Zeitformat ({value})",
    "settings.systemTimeZone": "Systemzeitzone {timeZone}",
    "settings.telemetry": "Diagnose- und Nutzungsdaten teilen",
    "settings.telemetryDetails": "Telemetriedetails",
    "settings.telemetryDisclosure": (
        "Telemetrie ist standardmäßig deaktiviert. Aktivieren Sie das Teilen, um uns zu helfen, Ihre Erfahrun" +
        "g zu verstehen und Warplyn zu verbessern. Sie können es jederzeit ausschalten; dies stoppt künftige " +
        "Erhebungen, kann aber bereits gesendete Daten nicht zurückholen."
    ),
    "settings.telemetryHint": (
        "Helfen Sie uns, Warplyn zu verbessern, indem Sie pseudonyme Zuverlässigkeits- und Nutzungsereignisse" +
        " an PostHog senden. Artikeltext, Prompts, KI-Antworten und API-Schlüssel sind niemals enthalten."
    ),
    "settings.telemetryIdentifier": "Telemetrie-ID",
    "settings.telemetryIdentifierCopied": "Telemetrie-ID kopiert.",
    "settings.telemetryIdentifierHint": (
        "Geben Sie diese ID bei einem Löschantrag an. Kopieren Sie sie vor dem Ausschalten der Telemetrie, da dabei die" +
        " ID gelöscht wird."
    ),
    "settings.telemetrySaveFailed": (
        "Diese Auswahl konnte nicht gespeichert werden. Ihre bisherige Einstellung bleibt unverändert. Versuc" +
        "hen Sie es erneut."
    ),
    "settings.telemetryUnavailable": "Telemetrie ist nur in einer entsprechend konfigurierten, installierten App verfügbar.",
    "settings.timeFormat": "Zeitformat",
    "settings.timeFormatHint": "Ändert die Zeitanzeige in Warplyn. Gespeicherte Datumswerte und der Fassungsverlauf bleiben unverändert.",
    "settings.timeZone": "Zeitzone",
    "settings.timeZoneHint": (
        "Die Systemzeitzone folgt diesem Gerät. Wählen Sie eine Region, um auf Reisen deren Uhrzeit beizubeha" +
        "lten. Dies ändert nur angezeigte Zeiten, keine gespeicherten Zeitstempel."
    ),
    "settings.twelveHour": "12 Stunden",
    "settings.twentyFourHour": "24 Stunden",
    "settings.useConnection": "Verwenden",
    "settings.useConnectionShort": "Verwenden",
    "settings.useDefaultModel": "Standardmodell",
} satisfies Partial<Record<MessageId, string>>;
