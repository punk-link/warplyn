import type { MessageId } from "../../messages.js";

export const settingsMessages2 = {
    "settings.telemetryDisclosure": (
        "Telemetrie ist standardmäßig deaktiviert. Aktivieren Sie das Teilen, um uns zu helfen, Ihre " +
        "Erfahrung zu verstehen und Warplyn zu verbessern. Sie können es jederzeit ausschalten; dies stoppt " +
        "künftige Erhebungen, kann aber bereits gesendete Daten nicht zurückholen."
    ),
    "settings.telemetryDetails": "Telemetriedetails",
    "settings.telemetryIdentifier": "Telemetrie-ID",
    "settings.telemetryIdentifierHint": (
        "Geben Sie diese ID bei einem Löschantrag an. Kopieren Sie sie vor dem Ausschalten der Telemetrie, da " +
        "dabei die ID gelöscht wird."
    ),
    "settings.copyTelemetryIdentifier": "ID kopieren",
    "settings.telemetryIdentifierCopied": "Telemetrie-ID kopiert.",
    "settings.telemetrySaveFailed": (
        "Diese Auswahl konnte nicht gespeichert werden. Ihre bisherige Einstellung bleibt unverändert. " +
        "Versuchen Sie es erneut."
    ),
    "settings.telemetryUnavailable": "Telemetrie ist nur in einer entsprechend konfigurierten, installierten App verfügbar.",
    "settings.saved": "Gespeichert",
    "settings.loadingFailed": (
        "Einstellungen konnten nicht geladen werden. Ihre gespeicherten Einstellungen bleiben unverändert. " +
        "Aktualisieren Sie die Ansicht und versuchen Sie es erneut."
    ),
    "settings.saving": "Wird gespeichert…",
    "settings.saveFailed": (
        "Ihre Einstellungen konnten nicht gespeichert werden. Ihre bisherigen Einstellungen bleiben " +
        "unverändert. Versuchen Sie es erneut."
    ),
    "settings.modelSaveFailed": (
        "Modellpräferenzen konnten nicht gespeichert werden. Ihre bisherigen Einstellungen bleiben " +
        "unverändert. Versuchen Sie es erneut."
    ),
    "settings.backupSaveFailed": (
        "Sicherungseinstellungen konnten nicht gespeichert werden. Ihre bisherigen Einstellungen bleiben " +
        "unverändert. Versuchen Sie es erneut."
    ),
    "settings.updates": "Updates",
    "settings.updateNetworkAccess": "Netzwerkzugriff für Updates erlauben",
    "settings.updateNetworkAccessHint": (
        "Erlaubt Warplyn, GitHub für öffentliche Versionsmetadaten und von Ihnen ausgewählte Downloads zu " +
        "kontaktieren. Artikelinhalte, Kontoinformationen, Gerätekennungen und Analysedaten werden niemals " +
        "gesendet."
    ),
    "settings.updateNetworkPermissionTitle": "Warplyn erlauben, auf GitHub nach Updates zu suchen?",
    "settings.updateNetworkPermissionDescription": (
        "Warplyn kontaktiert api.github.com für öffentliche Versionsmetadaten. Artikelinhalte, " +
        "Kontoinformationen, Gerätekennungen und Analysedaten werden nicht gesendet."
    ),
    "settings.allowNetworkAccess": "Erlauben",
    "settings.automaticUpdates": "Automatisch nach Updates suchen",
    "settings.automaticUpdatesHint": (
        "Prüft GitHub beim Start von Warplyn und dann täglich, solange die App geöffnet bleibt. Updates " +
        "werden nur heruntergeladen, wenn Sie Herunterladen wählen."
    ),
    "settings.windowsUpdateDownloadHint": (
        "Mit dem Herunterladen eines Updates genehmigen Sie auch die Installation. Nach dem Download wird es " +
        "beim nächsten Öffnen von Warplyn automatisch installiert, auch nach normalem Schließen der App."
    ),
    "settings.includePrereleaseUpdates": "Vorabversionen einbeziehen",
    "settings.includePrereleaseUpdatesHint": "Wenn deaktiviert, bietet Warplyn nur stabile Versionen an.",
    "settings.updateStatus": "Updatestatus",
    "settings.updateStatusHint": "Aktuelle Version: {version}",
    "settings.updateStatusUnavailableHint": "Updateeinstellungen gelten, wenn diese Version Updates unterstützt.",
    "settings.updatesChecking": "Suche nach Updates…",
    "settings.updatesCurrent": "Sie haben die neueste Version.",
    "settings.updatesNetworkAccessRequired": "Erlauben Sie den Netzwerkzugriff, um nach Updates zu suchen.",
    "settings.updatesUnavailable": "Updates sind in dieser Version nicht verfügbar.",
    "settings.updatesAvailable": "Version {version} ist verfügbar.",
    "settings.updatesError.discovery_failed": "Updates konnten nicht gesucht werden. Versuchen Sie es erneut.",
    "settings.updatesError.download_failed": "Das Update konnte nicht heruntergeladen werden. Versuchen Sie es erneut.",
    "settings.updatesError.apply_failed": (
        "Das Update konnte nicht vorbereitet werden. Versuchen Sie es erneut oder öffnen Sie die " +
        "Update-Wiederherstellung für Hilfe."
    ),
    "settings.checkNow": "Jetzt prüfen",
    "settings.viewReleaseNotes": "Versionshinweise",
    "settings.updateChanges": "Änderungen in {version}",
    "settings.securityUpdate": "Sicherheitsupdate",
    "settings.updateChangesUnavailable": "Versionsdetails sind nicht verfügbar. Sie können dennoch aktualisieren.",
    "settings.downloadUpdate": "Herunterladen",
    "settings.restartAndUpdate": "Update & Neustart",
    "settings.retry": "Erneut versuchen",
    "settings.updateRecovery": "Update-Wiederherstellung",
    "settings.on": "Ein",
    "settings.modelsLoadFailed": "Verfügbare Modelle konnten nicht geladen werden. Ihre Einstellungen wurden nicht geändert. Versuchen Sie es erneut.",
    "settings.connectionAddFailed": (
        "Diese KI-Verbindung konnte nicht hinzugefügt werden. Ihre Einstellungen wurden nicht geändert. " +
        "Prüfen Sie die Angaben und versuchen Sie es erneut."
    ),
    "settings.connectionUpdateFailed": (
        "Diese KI-Verbindung konnte nicht aktualisiert werden. Ihre bisherigen Einstellungen bleiben " +
        "unverändert. Versuchen Sie es erneut."
    ),
    "settings.connectionRemoveFailed": (
        "Diese KI-Verbindung konnte nicht entfernt werden. Sie ist weiterhin in den Einstellungen verfügbar. " +
        "Versuchen Sie es erneut."
    ),
    "settings.publishingSaveFailed": (
        "Veröffentlichungseinstellungen konnten nicht gespeichert werden. Ihre bisherigen Einstellungen " +
        "bleiben unverändert. Versuchen Sie es erneut."
    ),
    "settings.customProfileName": "Name des eigenen Profils",
    "settings.customProfileNameHint": "Die lokale Bezeichnung Ihrer eigenen Veröffentlichungsgrenze.",
    "settings.customProfileLimit": "Eigene Zeichengrenze",
    "settings.customProfileLimitHint": "Ein nicht negativer Richtwert. Er blockiert niemals das Kopieren.",
    "settings.customProfileInvalid": "Geben Sie einen Namen und eine ganze, nicht negative Zeichengrenze ein.",
    "settings.saveCustomProfile": "Speichern",
    "settings.customProfiles": "Eigene Profile",
    "settings.customProfilesHint": "Fügen Sie so viele lokale Zeichengrenzenprofile hinzu, wie Sie benötigen.",
    "settings.addCustomProfile": "Profil hinzufügen",
    "settings.remove": "Entfernen",
    "settings.removeCustomProfile": "{name} entfernen",
    "settings.removeCustomProfileTitle": "Eigenes Profil entfernen?",
    "settings.removeCustomProfileDescription": "<profile>{name}</profile> aus Ihren lokalen Veröffentlichungsprofilen entfernen?",
    "settings.removeCustomDefaultDescription": (
        "<profile>{name}</profile> entfernen? Das Standard-Veröffentlichungsprofil wird auf Standard " +
        "zurückgesetzt."
    ),
    "settings.defaultAssistantEditMode": "Standard-Bearbeitungsmodus des Assistenten",
    "settings.defaultAssistantEditModeHint": (
        "Neue Artikelgespräche verwenden diesen Modus; bestehende Gespräche behalten ihren. Der direkte Modus " +
        "überspringt die Vorschlagsprüfung nur für ausdrücklich angeforderte Bearbeitungen. Andere Vorschläge " +
        "müssen weiterhin geprüft werden."
    ),
    "settings.assistantBehavior": "Bearbeitung und Anfragen",
    "settings.showExecutionProgress": "Ausführungsfortschritt anzeigen",
    "settings.showExecutionProgressHint": "Zeigt die aktuelle Aktion und einen einklappbaren Aktivitätsverlauf im Assistentengespräch.",
} satisfies Partial<Record<MessageId, string>>;
