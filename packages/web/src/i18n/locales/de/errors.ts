import type { MessageId } from "../../messages.js";

export const errorsMessages = {
    "errors.assistantRequestTimedOut": (
        "Diese Anfrage an den Assistenten hat ihr Zeitlimit erreicht. Ihr Artikel wurde nicht geändert. " +
        "Versuchen Sie es erneut oder erhöhen Sie das Zeitlimit in den allgemeinen Einstellungen."
    ),
    "errors.generic": "Diese Aktion konnte nicht abgeschlossen werden. Ihr Artikel wurde nicht geändert. Versuchen Sie es erneut.",
    "errors.invalidRequest": "Diese Aktion konnte wegen ungültiger Angaben nicht abgeschlossen werden. Prüfen Sie diese und versuchen Sie es erneut.",
    "errors.proposalEditInvalid": (
        "Ihr bearbeiteter Vorschlag konnte nicht angewendet werden. Ihr Artikel wurde nicht geändert. Lassen " +
        "Sie die vorgeschlagenen Zahlen, Links, Code und Fachbegriffe unverändert und versuchen Sie es " +
        "erneut. Ist der Vorschlag nicht verfügbar, erzeugen Sie einen neuen."
    ),
    "errors.factCorrectionSelectionInvalid": (
        "Korrekturen konnten nicht vorbereitet werden, weil die gewählten Hinweise nicht mehr aktuell sind " +
        "oder geprüft werden müssen. Führen Sie die Faktenprüfung erneut aus und wählen Sie dann ungelöste " +
        "umstrittene oder nicht überprüfbare Hinweise."
    ),
    "errors.requestTooLarge": (
        "Diese Aktion konnte nicht abgeschlossen werden, weil der ausgewählte Inhalt zu groß ist. Verkleinern " +
        "Sie ihn und versuchen Sie es erneut."
    ),
    "errors.invalidJson": "Diese Aktion konnte wegen ungültiger Angaben nicht abgeschlossen werden. Prüfen Sie diese und versuchen Sie es erneut.",
    "errors.originNotPermitted": (
        "Diese Aktion konnte in diesem App-Fenster nicht abgeschlossen werden. Öffnen Sie Warplyn erneut und " +
        "versuchen Sie es noch einmal."
    ),
    "errors.resourceNotFound": "Benötigte Elemente für diese Aktion wurden nicht gefunden. Aktualisieren Sie Warplyn und versuchen Sie es erneut.",
    "errors.articleNotFound": "Dieser Artikel wurde nicht gefunden. Wählen Sie einen bestehenden Artikel und versuchen Sie es erneut.",
    "errors.revisionNotFound": "Diese gespeicherte Fassung wurde nicht gefunden. Wählen Sie eine andere und versuchen Sie es erneut.",
    "errors.revisionConflict": (
        "Speichern fehlgeschlagen, weil dieser Artikel zwischenzeitlich geändert wurde. Ihre letzten " +
        "Änderungen sind noch im Editor. Prüfen Sie den Konflikt und versuchen Sie es erneut."
    ),
    "errors.unsupportedPublishingProfile": "Wählen Sie ein unterstütztes Veröffentlichungsprofil.",
    "errors.invalidEnvironmentVariableName": "Geben Sie einen Namen für die Umgebungsvariable mit Großbuchstaben, Zahlen und Unterstrichen ein.",
    "errors.environmentVariableUnavailable": (
        "Die Variable {environmentVariableName} ist nicht verfügbar. Fügen Sie sie hinzu und versuchen Sie es " +
        "erneut."
    ),
    "errors.aiConnectionNotFound": "Diese KI-Verbindung wurde nicht gefunden. Wählen Sie eine andere Verbindung und versuchen Sie es erneut.",
    "errors.duplicateStyleCorpusItem": "Dieser Text ist bereits im Stilkorpus.",
    "errors.activeConnectionRequired": "Fügen Sie zuerst eine KI-Verbindung hinzu und wählen Sie sie aus.",
    "errors.activeConnectionRemovalBlocked": "Wählen Sie eine andere aktive KI-Verbindung, bevor Sie diese entfernen.",
    "errors.aiConnectionVerificationFailed": (
        "Der KI-Anbieter konnte diese Verbindung nicht prüfen. Prüfen Sie die Variable und ihren Schlüssel " +
        "und versuchen Sie es erneut."
    ),
    "errors.managedCredentialsUnavailable": (
        "Sichere Speicherung von Anmeldedaten ist auf diesem Gerät nicht verfügbar. Wählen Sie stattdessen " +
        "Umgebungsvariable."
    ),
    "errors.managedCredentialMissing": (
        "Diese Verbindung hat keinen API-Schlüssel in Warplyn. Fügen Sie eine neue API-Schlüssel-Verbindung " +
        "hinzu und wählen Sie sie für Ihre Modelle aus. Entfernen Sie dann diese alte Verbindung."
    ),
    "errors.styleCorpusRequired": "Fügen Sie vor der Stilprüfung mindestens einen Eintrag zum Stilkorpus hinzu.",
    "errors.targetLanguageRequired": "Wählen Sie eine Zielsprache, bevor Sie eine Übersetzung anfordern.",
    "errors.editorialOperationUnsupported": "Diese KI-gestützte Aktion ist nicht verfügbar. Wählen Sie eine andere Aktion.",
    "errors.editorialConfigurationMissing": (
        "Diese KI-gestützte Aktion konnte nicht gestartet werden. Wählen Sie in den Einstellungen ein " +
        "kompatibles Modell und versuchen Sie es erneut."
    ),
    "errors.editorialProviderFailed": (
        "Diese KI-gestützte Aktion konnte nicht abgeschlossen werden. Ihr Artikel wurde nicht geändert. " +
        "Versuchen Sie es erneut oder prüfen Sie Ihre KI-Verbindung in den Einstellungen."
    ),
    "errors.editorialStreamIncomplete": (
        "Diese KI-gestützte Aktion konnte nicht abgeschlossen werden. Ihr Artikel wurde nicht geändert. " +
        "Versuchen Sie es erneut."
    ),
    "errors.editorialRequestFailed": (
        "Diese KI-gestützte Aktion konnte nicht abgeschlossen werden. Ihr Artikel wurde nicht geändert. " +
        "Versuchen Sie es erneut oder prüfen Sie Ihre KI-Verbindung in den Einstellungen."
    ),
    "errors.invalidKeyBinding": "Geben Sie eine vollständige Tastenkombination mit einer Nicht-Modifikatortaste ein.",
    "errors.keyBindingConflict": "Wählen Sie eine noch nicht zugewiesene Tastenkombination.",
    "errors.assistantSkillUnsupported": "Diese Assistentenaktion ist nicht verfügbar. Wählen Sie eine andere Aktion.",
    "errors.assistantSkillScopeIncompatible": (
        "Diese Assistentenaktion kann diese Auswahl nicht verwenden. Ändern Sie die Auswahl und versuchen Sie " +
        "es erneut."
    ),
    "errors.assistantSelectionInvalid": (
        "Diese Auswahl kann für diese Assistentenaktion nicht verwendet werden. Ändern Sie sie und versuchen " +
        "Sie es erneut."
    ),
    "errors.assistantRequestConflict": "Diese Assistentenaktion läuft bereits. Warten Sie auf ihren Abschluss, bevor Sie es erneut versuchen.",
    "errors.assistantCheckpointConflict": (
        "Das Assistentengespräch hat sich geändert. Prüfen Sie die aktualisierten Wiederherstellungsdetails " +
        "und versuchen Sie es erneut."
    ),
    "errors.assistantCheckpointInvalid": "Dieser Gesprächspunkt ist nicht mehr verfügbar. Wählen Sie eine andere Autorennachricht.",
    "errors.assistantEditConflict": (
        "Der Artikel oder Entwurf hat sich geändert. Speichern oder klären Sie die aktuelle Arbeit und " +
        "fordern Sie dann eine neue Bearbeitung an."
    ),
    "errors.assistantEditInvalid": (
        "Der Assistent konnte keinen zuverlässigen Ersatz erstellen. Ihr Artikel wurde nicht geändert. " +
        "Versuchen Sie eine kleinere Auswahl oder eine genauere Anweisung."
    ),
    "errors.assistantRetryInvalid": "Diese Assistentenaktion kann nicht erneut versucht werden. Starten Sie sie im Assistenten neu.",
    "errors.assistantCoordinatorFailed": (
        "Diese Assistentenaktion konnte nicht abgeschlossen werden. Ihr Artikel wurde nicht geändert. " +
        "Versuchen Sie es erneut."
    ),
    "errors.skillPackageConflict": (
        "Diese Fähigkeit hat sich geändert oder ihre ID oder ihr Name wird bereits verwendet. Laden Sie die " +
        "Fähigkeitenliste neu, wählen Sie gegebenenfalls einen freien Namen und versuchen Sie es erneut."
    ),
    "errors.skillRevisionNotFound": (
        "Diese gespeicherte Fassung der Fähigkeit ist nicht verfügbar. Listen Sie die Fassungen der Fähigkeit " +
        "erneut auf und wählen Sie eine bestehende."
    ),
} satisfies Partial<Record<MessageId, string>>;
