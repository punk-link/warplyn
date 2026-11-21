import type { MessageId } from "../../messages.js";


export const errorsMessages = {
    "errors.activeConnectionRemovalBlocked": "Wählen Sie eine andere aktive KI-Verbindung, bevor Sie diese entfernen.",
    "errors.activeConnectionRequired": "Fügen Sie zuerst eine KI-Verbindung hinzu und wählen Sie sie aus.",
    "errors.aiConnectionNotFound": "Diese KI-Verbindung wurde nicht gefunden. Wählen Sie eine andere Verbindung und versuchen Sie es erneut.",
    "errors.aiConnectionVerificationFailed": (
        "Der KI-Anbieter konnte diese Verbindung nicht prüfen. Prüfen Sie die Variable und ihren Schlüssel und versuche" +
        "n Sie es erneut."
    ),
    "errors.articleNotFound": "Dieser Artikel wurde nicht gefunden. Wählen Sie einen bestehenden Artikel und versuchen Sie es erneut.",
    "errors.assistantCheckpointConflict": (
        "Das Assistentengespräch hat sich geändert. Prüfen Sie die aktualisierten Wiederherstellungsdetails und versuch" +
        "en Sie es erneut."
    ),
    "errors.assistantCheckpointInvalid": "Dieser Gesprächspunkt ist nicht mehr verfügbar. Wählen Sie eine andere Autorennachricht.",
    "errors.assistantCoordinatorFailed": (
        "Diese Assistentenaktion konnte nicht abgeschlossen werden. Ihr Artikel wurde nicht geändert. Versuchen Sie es " +
        "erneut."
    ),
    "errors.assistantEditConflict": (
        "Der Artikel oder Entwurf hat sich geändert. Speichern oder klären Sie die aktuelle Arbeit und fordern Sie dann" +
        " eine neue Bearbeitung an."
    ),
    "errors.assistantEditInvalid": (
        "Der Assistent konnte keinen zuverlässigen Ersatz erstellen. Ihr Artikel wurde nicht geändert. Versuchen Sie ei" +
        "ne kleinere Auswahl oder eine genauere Anweisung."
    ),
    "errors.assistantRequestConflict": "Diese Assistentenaktion läuft bereits. Warten Sie auf ihren Abschluss, bevor Sie es erneut versuchen.",
    "errors.assistantRequestTimedOut": (
        "Diese Anfrage an den Assistenten hat ihr Zeitlimit erreicht. Ihr Artikel wurde nicht geändert. Versu" +
        "chen Sie es erneut oder erhöhen Sie das Zeitlimit in den allgemeinen Einstellungen."
    ),
    "errors.assistantRetryInvalid": "Diese Assistentenaktion kann nicht erneut versucht werden. Starten Sie sie im Assistenten neu.",
    "errors.assistantSelectionInvalid": (
        "Diese Auswahl kann für diese Assistentenaktion nicht verwendet werden. Ändern Sie sie und versuchen " +
        "Sie es erneut."
    ),
    "errors.assistantSkillScopeIncompatible": (
        "Diese Assistentenaktion kann diese Auswahl nicht verwenden. Ändern Sie die Auswahl und versuchen Sie" +
        " es erneut."
    ),
    "errors.assistantSkillUnsupported": "Diese Assistentenaktion ist nicht verfügbar. Wählen Sie eine andere Aktion.",
    "errors.duplicateStyleCorpusItem": "Dieser Text ist bereits im Stilkorpus.",
    "errors.editorialConfigurationMissing": (
        "Diese KI-gestützte Aktion konnte nicht gestartet werden. Wählen Sie in den Einstellungen ein kompatibles Model" +
        "l und versuchen Sie es erneut."
    ),
    "errors.editorialOperationUnsupported": "Diese KI-gestützte Aktion ist nicht verfügbar. Wählen Sie eine andere Aktion.",
    "errors.editorialProviderFailed": (
        "Diese KI-gestützte Aktion konnte nicht abgeschlossen werden. Ihr Artikel wurde nicht geändert. Versu" +
        "chen Sie es erneut oder prüfen Sie Ihre KI-Verbindung in den Einstellungen."
    ),
    "errors.editorialRequestFailed": (
        "Diese KI-gestützte Aktion konnte nicht abgeschlossen werden. Ihr Artikel wurde nicht geändert. Versu" +
        "chen Sie es erneut oder prüfen Sie Ihre KI-Verbindung in den Einstellungen."
    ),
    "errors.editorialStreamIncomplete": (
        "Diese KI-gestützte Aktion konnte nicht abgeschlossen werden. Ihr Artikel wurde nicht geändert. Versuchen Sie e" +
        "s erneut."
    ),
    "errors.environmentVariableUnavailable": (
        "Die Variable {environmentVariableName} ist nicht verfügbar. Fügen Sie sie hinzu und versuchen Sie es" +
        " erneut."
    ),
    "errors.factCorrectionSelectionInvalid": (
        "Korrekturen konnten nicht vorbereitet werden, weil die gewählten Hinweise nicht mehr aktuell sind od" +
        "er geprüft werden müssen. Führen Sie die Faktenprüfung erneut aus und wählen Sie dann ungelöste umst" +
        "rittene oder nicht überprüfbare Hinweise."
    ),
    "errors.generic": "Diese Aktion konnte nicht abgeschlossen werden. Ihr Artikel wurde nicht geändert. Versuchen Sie es erneut.",
    "errors.invalidEnvironmentVariableName": "Geben Sie einen Namen für die Umgebungsvariable mit Großbuchstaben, Zahlen und Unterstrichen ein.",
    "errors.invalidJson": "Diese Aktion konnte wegen ungültiger Angaben nicht abgeschlossen werden. Prüfen Sie diese und versuchen Sie es erneut.",
    "errors.invalidKeyBinding": "Geben Sie eine vollständige Tastenkombination mit einer Nicht-Modifikatortaste ein.",
    "errors.invalidRequest": "Diese Aktion konnte wegen ungültiger Angaben nicht abgeschlossen werden. Prüfen Sie diese und versuchen Sie es erneut.",
    "errors.keyBindingConflict": "Wählen Sie eine noch nicht zugewiesene Tastenkombination.",
    "errors.managedCredentialMissing": (
        "Diese Verbindung hat keinen API-Schlüssel in Warplyn. Fügen Sie eine neue API-Schlüssel-Verbindung h" +
        "inzu und wählen Sie sie für Ihre Modelle aus. Entfernen Sie dann diese alte Verbindung."
    ),
    "errors.managedCredentialsUnavailable": (
        "Sichere Speicherung von Anmeldedaten ist auf diesem Gerät nicht verfügbar. Wählen Sie stattdessen Umgebungsvar" +
        "iable."
    ),
    "errors.originNotPermitted": (
        "Diese Aktion konnte in diesem App-Fenster nicht abgeschlossen werden. Öffnen Sie Warplyn erneut und versuchen " +
        "Sie es noch einmal."
    ),
    "errors.proposalEditInvalid": (
        "Ihr bearbeiteter Vorschlag konnte nicht angewendet werden. Ihr Artikel wurde nicht geändert. Lassen " +
        "Sie die vorgeschlagenen Zahlen, Links, Code und Fachbegriffe unverändert und versuchen Sie es erneut" +
        ". Ist der Vorschlag nicht verfügbar, erzeugen Sie einen neuen."
    ),
    "errors.requestTooLarge": (
        "Diese Aktion konnte nicht abgeschlossen werden, weil der ausgewählte Inhalt zu groß ist. Verkleinern Sie ihn u" +
        "nd versuchen Sie es erneut."
    ),
    "errors.resourceNotFound": "Benötigte Elemente für diese Aktion wurden nicht gefunden. Aktualisieren Sie Warplyn und versuchen Sie es erneut.",
    "errors.revisionConflict": (
        "Speichern fehlgeschlagen, weil dieser Artikel zwischenzeitlich geändert wurde. Ihre letzten Änderung" +
        "en sind noch im Editor. Prüfen Sie den Konflikt und versuchen Sie es erneut."
    ),
    "errors.revisionNotFound": "Diese gespeicherte Fassung wurde nicht gefunden. Wählen Sie eine andere und versuchen Sie es erneut.",
    "errors.skillPackageConflict": (
        "Diese Fähigkeit hat sich geändert oder ihre ID oder ihr Name wird bereits verwendet. Laden Sie die F" +
        "ähigkeitenliste neu, wählen Sie gegebenenfalls einen freien Namen und versuchen Sie es erneut."
    ),
    "errors.skillRevisionNotFound": (
        "Diese gespeicherte Fassung der Fähigkeit ist nicht verfügbar. Listen Sie die Fassungen der Fähigkeit erneut au" +
        "f und wählen Sie eine bestehende."
    ),
    "errors.styleCorpusRequired": "Fügen Sie vor der Stilprüfung mindestens einen Eintrag zum Stilkorpus hinzu.",
    "errors.targetLanguageRequired": "Wählen Sie eine Zielsprache, bevor Sie eine Übersetzung anfordern.",
    "errors.unsupportedPublishingProfile": "Wählen Sie ein unterstütztes Veröffentlichungsprofil.",
} satisfies Partial<Record<MessageId, string>>;
