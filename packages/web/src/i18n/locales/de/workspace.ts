import type { MessageId } from "../../messages.js";


export const workspaceMessages = {
    "workspace.saveProposalReviewFailed": "Die Vorschlagsprüfung konnte nicht gespeichert werden. Versuche die Änderung erneut, bevor du die App schließt.",
    "workspace.acceptProposalFailed": "Dieser Vorschlag konnte nicht angenommen werden. Ihr Artikel wurde nicht geändert. Versuchen Sie es erneut.",
    "workspace.addModelKey": "Modellschlüssel hinzufügen",
    "workspace.aiConnectionCapabilities": (
        "Sie können weiterhin Artikel schreiben, speichern, organisieren und kopieren sowie die Typografie lo" +
        "kal prüfen. Anfragen an den Assistenten, Übersetzungen, Faktenprüfungen und vollständige Stilprüfung" +
        "en erfordern eine eingerichtete Modellverbindung, auch mit einem unterstützten lokalen Modell."
    ),
    "workspace.aiConnectionRequired": "Lokales Schreiben ist verfügbar. Richten Sie ein Modell ein, um den Assistenten zu nutzen.",
    "workspace.badges.findings": "{count, plural, =0 {Keine Hinweise} one {# Hinweis} other {# Hinweise}}",
    "workspace.badges.nearLimit": "Nahe am Limit",
    "workspace.badges.overLimit": "Limit überschritten",
    "workspace.badges.ready": "Bereit",
    "workspace.badges.review": "Prüfen",
    "workspace.badges.stale": "Veraltet",
    "workspace.createArticleFailed": "Dieser Artikel konnte nicht erstellt werden. Versuchen Sie es erneut.",
    "workspace.createTranslationFailed": (
        "Dieser Übersetzungsartikel konnte nicht erstellt werden. Ihr Originalartikel wurde nicht geändert. Versuchen S" +
        "ie es erneut."
    ),
    "workspace.deleteArticleFailed": "Dieser Artikel konnte nicht gelöscht werden. Er ist weiterhin verfügbar. Versuchen Sie es erneut.",
    "workspace.loadingArticles": "Ihre lokalen Artikel werden geladen…",
    "workspace.renameArticleFailed": "Dieser Artikel konnte nicht umbenannt werden. Sein bisheriger Titel bleibt gespeichert. Versuchen Sie es erneut.",
    "workspace.resolveFindingFailed": "Dieser Hinweis konnte nicht aktualisiert werden. Ihr Artikel wurde nicht geändert. Versuchen Sie es erneut.",
    "workspace.restoreRevisionFailed": (
        "Diese gespeicherte Fassung konnte nicht wiederhergestellt werden. Ihr Artikel wurde nicht geändert. Versuchen " +
        "Sie es erneut."
    ),
    "workspace.revisionHistoryFailed": (
        "Der Fassungsverlauf konnte nicht geladen werden. Ihr Artikel wurde nicht geändert. Aktualisieren Sie die Ansic" +
        "ht und versuchen Sie es erneut."
    ),
    "workspace.saveFailed": (
        "Dieser Entwurf konnte nicht gespeichert werden. Ihre letzten Änderungen sind noch im Editor. Versuch" +
        "en Sie erneut zu speichern."
    ),
    "workspace.serviceUnavailable": "Ihr lokaler Dienst ist nicht verfügbar. Starten Sie ihn und versuchen Sie es erneut.",
    "workspace.styleCorpusAddFailed": (
        "Dieser Text konnte nicht zum Stilprofil hinzugefügt werden. Ihr Stilprofil wurde nicht geändert. Versuchen Sie" +
        " es erneut."
    ),
    "workspace.styleCorpusLoadFailed": "Das Stilprofil konnte nicht geladen werden. Aktualisieren Sie die Ansicht und versuchen Sie es erneut.",
    "workspace.styleCorpusRebuildFailed": (
        "Das Stilprofil konnte nicht neu erstellt werden. Ihr bisheriges Stilprofil ist weiterhin verfügbar. Versuchen " +
        "Sie es erneut."
    ),
    "workspace.styleCorpusRemoveFailed": (
        "Dieser Text konnte nicht aus dem Stilprofil entfernt werden. Ihr Stilprofil wurde nicht geändert. Versuchen Si" +
        "e es erneut."
    ),
    "workspace.styleCorpusSnapshotFailed": (
        "Diese gespeicherte Fassung konnte nicht zum Stilprofil hinzugefügt werden. Ihr Stilprofil wurde nicht geändert" +
        ". Versuchen Sie es erneut."
    ),
    "workspace.styleCorpusUpdateFailed": (
        "Das Stilprofil konnte nicht aktualisiert werden. Ihr bisheriges Stilprofil bleibt gespeichert. Versuchen Sie e" +
        "s erneut."
    ),
    "workspace.styleRulesLoadFailed": "Die Stilprofilregeln konnten nicht geladen werden. Aktualisieren Sie die Ansicht und versuchen Sie es erneut.",
    "workspace.styleRulesSaveFailed": (
        "Die Stilprofilregeln konnten nicht gespeichert werden. Ihre bisherigen Regeln bleiben gespeichert. Versuchen S" +
        "ie es erneut."
    ),
    "workspace.tabs.ariaLabel": "Ansichten des Artikelarbeitsbereichs",
    "workspace.tabs.factCheck": "Faktencheck",
    "workspace.tabs.proposal": "Vorschläge",
    "workspace.tabs.revisions": "Fassungen",
    "workspace.tabs.styleProfile": "Stilprofil",
    "workspace.tabs.translations": "Übersetzungen",
    "workspace.tabs.write": "Schreiben",
    "workspace.updateArticleFailed": (
        "Dieser Artikel konnte nicht aktualisiert werden. Ihre letzten Änderungen sind noch im Editor. Versuc" +
        "hen Sie es erneut."
    ),
} satisfies Partial<Record<MessageId, string>>;
