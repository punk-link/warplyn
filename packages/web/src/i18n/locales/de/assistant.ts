import type { MessageId } from "../../messages.js";


export const assistantMessages = {
    "assistant.activity.addCorpus": "Gespeicherte Fassung wird zum Stilkorpus hinzugefügt",
    "assistant.activity.article": "Artikel wird gelesen",
    "assistant.activity.assignPublishing": "Veröffentlichungsrichtwerte werden zugewiesen",
    "assistant.activity.claims": "Behauptungen werden geprüft",
    "assistant.activity.corpus": "Stilkorpus wird gelesen",
    "assistant.activity.corrections": "Korrekturen werden vorbereitet",
    "assistant.activity.draft": "Entwurf wird geprüft",
    "assistant.activity.editorial": "Redaktionelle Arbeit wird vorbereitet",
    "assistant.activity.findings": "Hinweise der Faktenprüfung werden gelesen",
    "assistant.activity.history": "Fassungsverlauf wird gelesen",
    "assistant.activity.language": "Artikelsprache wird geändert",
    "assistant.activity.links": "Verknüpfte Artikel werden gelesen",
    "assistant.activity.prepareProposal": "Vorschlag wird vorbereitet",
    "assistant.activity.proposal": "Vorgeschlagene Änderungen werden geprüft",
    "assistant.activity.proposalReady": "Vorschlag zur Prüfung bereit",
    "assistant.activity.publishing": "Veröffentlichungsrichtwerte werden gelesen",
    "assistant.activity.rebuild": "Stilprofil wird neu erstellt",
    "assistant.activity.rejectTranslation": "Übersetzung wird abgelehnt",
    "assistant.activity.rename": "Artikel wird umbenannt",
    "assistant.activity.rules": "Artikelstilregeln werden gelesen",
    "assistant.activity.saved": "Gespeicherte redaktionelle Arbeit wird gelesen",
    "assistant.activity.style": "Stil wird geprüft",
    "assistant.activity.translate": "Übersetzung wird vorbereitet",
    "assistant.activity.translations": "Übersetzungen werden gelesen",
    "assistant.activity.updateRules": "Artikelstilregeln werden aktualisiert",
    "assistant.activityInterrupted": "Gestoppt während: {activity}. Senden Sie die Anfrage erneut, um es noch einmal zu versuchen.",
    "assistant.appliedEdit": "Als neue Fassung gespeichert",
    "assistant.applyArticle": "Artikel ersetzen",
    "assistant.applySelection": "Auf Auswahl anwenden",
    "assistant.articleSelection": "Artikelauswahl",
    "assistant.authorMessage": "Ihre Nachricht",
    "assistant.changeClaimSelectionFailed": (
        "Die Auswahl dieser Behauptung konnte nicht geändert werden. Versuchen Sie es während der laufenden Prüfung ern" +
        "eut."
    ),
    "assistant.checkingClaims": "Behauptungen werden geprüft…",
    "assistant.checkpoint.accessible": "Ab der Autorennachricht von {time} bearbeiten; spätere Gespräche und Arbeiten werden verworfen",
    "assistant.checkpoint.action": "Ab hier bearbeiten",
    "assistant.checkpoint.describedRevision": (
        "Der Artikelinhalt kehrt zur gespeicherten Fassung Nr. {number}, „{description}“ ({provenance}) zurüc" +
        "k. Die aktuelle und spätere Fassungen bleiben im Fassungsverlauf."
    ),
    "assistant.checkpoint.discard": "Verwerfen & laden",
    "assistant.checkpoint.draft": (
        "Der aktuelle Entwurf kann nicht zur wiederhergestellten Fassung bestehen bleiben. Speichern Sie ihn als Fassun" +
        "g oder verwerfen Sie ihn."
    ),
    "assistant.checkpoint.findings": "{count, plural, one {# Hinweis} other {# Hinweise}}",
    "assistant.checkpoint.heading": "Ab dieser Nachricht bearbeiten?",
    "assistant.checkpoint.proposals": "{count, plural, one {# Vorschlag} other {# Vorschläge}}",
    "assistant.checkpoint.replaceComposer": "Die wiederhergestellte Nachricht ersetzt den nicht gesendeten Text im Eingabefeld.",
    "assistant.checkpoint.restore": "Gespräch wiederherstellen",
    "assistant.checkpoint.revision": (
        "Der Artikelinhalt kehrt zur gespeicherten Fassung Nr. {number} ({provenance}) zurück. Die aktuelle und spätere" +
        " Fassungen bleiben im Fassungsverlauf."
    ),
    "assistant.checkpoint.save": "Speichern & laden",
    "assistant.checkpoint.translations": "{count, plural, one {# Übersetzung} other {# Übersetzungen}}",
    "assistant.checkpoint.work": "Diese Arbeiten werden ebenfalls verworfen:",
    "assistant.claimSelectionHelp": (
        "Mit den hervorgehobenen Kontrollkästchen können Sie während der Prüfung Behauptungen einbeziehen oder überspri" +
        "ngen. Unmarkierte Zeilen sind abgeschlossen."
    ),
    "assistant.clearArticleSelection": "Artikelauswahl aufheben",
    "assistant.collapse": "Assistentenbereich einklappen",
    "assistant.customSkillsHint": "Weitere Fähigkeiten: Geben Sie / ein, um eigene Fähigkeiten zu finden.",
    "assistant.duration.minutesAndSeconds": "{minutes, plural, one {# Minute} other {# Minuten}} {seconds, plural, one {# Sekunde} other {# Sekunden}}",
    "assistant.duration.seconds": "{seconds, plural, one {# Sekunde} other {# Sekunden}}",
    "assistant.editMode.direct": "Direkt anwenden",
    "assistant.editMode.label": "Bearbeitungsmodus",
    "assistant.editMode.review": "Änderungen vorschlagen",
    "assistant.editOriginal": "Besprochene Passage",
    "assistant.editReplacement": "Vorgeschlagener Ersatz",
    "assistant.errorDetails": "Fehlerdetails",
    "assistant.expand": "Assistentenbereich aufklappen",
    "assistant.factCheckClaimChecked": "Geprüft",
    "assistant.factCheckClaimChecking": "Wird geprüft",
    "assistant.factCheckClaimPending": "Zu prüfen",
    "assistant.factCheckClaims": "Zu prüfende Behauptungen",
    "assistant.factCheckClaimsChecked": "Geprüfte Behauptungen",
    "assistant.factCheckCorrectionPrompt": (
        "Correct or remove only these fact-check findings. Preserve every other claim and the author's voice." +
        "\n\n{findings}"
    ),
    "assistant.greeting": (
        "Hallo! Ich helfe Ihnen, diesen Artikel zu gestalten. Sie behalten die Kontrolle. Erzählen Sie, woran Sie arbei" +
        "ten, oder wählen Sie eine Schnellaktion."
    ),
    "assistant.guidance": "Redaktionelle Anweisungen",
    "assistant.guidancePlaceholder": "Frage oder Anweisung eingeben…",
    "assistant.heading": "Redaktioneller Assistent",
    "assistant.intro": (
        "Fordern Sie eine gezielte redaktionelle Bearbeitung an, sobald Sie bereit sind. Vorschläge bleiben von Ihrem A" +
        "rtikel getrennt, bis Sie sie annehmen."
    ),
    "assistant.keepOneClaim": "Behalten Sie eine Behauptung oder stoppen Sie die Anfrage.",
    "assistant.openSettings": "Einstellungen",
    "assistant.openSkillFolder": "Fähigkeitsordner öffnen",
    "assistant.panel": "Bereich des redaktionellen Assistenten",
    "assistant.preparing": "Ihr Vorschlag wird vorbereitet…",
    "assistant.profileRebuilt": "Profil aus {count, plural, one {# aktiven Quelle} other {# aktiven Quellen}} neu erstellt.",
    "assistant.quickActionSelected": "Schnellaktionen: {operation} ausgewählt",
    "assistant.quickActions": "Schnellaktionen",
    "assistant.removeSkill": "{skill} entfernen",
    "assistant.requestCancelled": "Diese redaktionelle Anfrage wurde abgebrochen. Ihr Artikel wurde nicht geändert.",
    "assistant.requestFailed": "Diese redaktionelle Anfrage ist fehlgeschlagen. Ihr Artikel wurde nicht geändert.",
    "assistant.requestStartFailed": "Diese redaktionelle Anfrage konnte nicht abgeschlossen werden.",
    "assistant.resize": "Größe des Assistentenbereichs ändern",
    "assistant.response.conversation": "Redaktionelles Gespräch",
    "assistant.response.editApplied": "Angeforderte Bearbeitung angewendet",
    "assistant.response.findings": "Hinweise vorbereitet",
    "assistant.response.narrativeDraftProposal": "Erzählentwurf vorbereitet",
    "assistant.response.partialFindings": (
        "Die Faktenprüfung konnte nicht alle Behauptungen prüfen. Abgeschlossene Hinweise sind verfügbar; andere Behaup" +
        "tungen bleiben ungeprüft."
    ),
    "assistant.response.proposal": "Vorschlag vorbereitet",
    "assistant.response.proposalAndFindings": "Vorschlag und Hinweise vorbereitet",
    "assistant.response.skill": "{skill}",
    "assistant.response.talkingPointsProposal": "Kernpunkte vorbereitet",
    "assistant.response.translation": "Übersetzungsvorschlag vorbereitet",
    "assistant.retry": "Erneut versuchen",
    "assistant.reviewProposal": "Vorschlag prüfen",
    "assistant.reviewTranslation": "Übersetzung prüfen",
    "assistant.scrollToEnd": "Zum Ende scrollen",
    "assistant.selectedSkill": "Ausgewählte Fähigkeit: {skill}",
    "assistant.selectionSkillUnavailable": "Die Übersetzung verwendet den gesamten Artikel. Heben Sie die Auswahl auf, um ihn zu senden.",
    "assistant.send": "Senden",
    "assistant.setupRequired": "Richten Sie eine Modellverbindung ein, um den Assistenten zu nutzen. Lokales Schreiben bleibt verfügbar.",
    "assistant.showAllSkills": "Alle Fähigkeiten anzeigen",
    "assistant.showRecentSkills": "Zuletzt verwendete Fähigkeiten anzeigen",
    "assistant.skill.conciseRewrite.hint": "Streichen Sie Wiederholungen und Füllwörter, während Bedeutung, Belege und Ihre Stimme erhalten bleiben.",
    "assistant.skill.conciseRewrite.label": "Text kürzen",
    "assistant.skill.factChecking.hint": "Prüfen Sie Behauptungen und erstellen Sie unverbindliche Hinweise mit Quellen und Angaben zur Unsicherheit.",
    "assistant.skill.factChecking.label": "Fakten prüfen",
    "assistant.skill.factChecking.speedHint": "Eine Faktenprüfung kann einige Zeit dauern.",
    "assistant.skill.flowAndClarity.hint": "Verbessern Sie Struktur, Übergänge und Lesbarkeit, ohne Ihre Behauptungen zu ändern.",
    "assistant.skill.flowAndClarity.label": "Text klarer machen",
    "assistant.skill.narrativeDraft.hint": "Verwandeln Sie Ihre Ideen in einen zusammenhängenden ersten Entwurf.",
    "assistant.skill.narrativeDraft.label": "Entwurf schreiben",
    "assistant.skill.skillCreator.label": "Fähigkeiten erstellen",
    "assistant.skill.styleReview.hint": "Prüfen Sie den Entwurf anhand Ihres lokalen Stilprofils.",
    "assistant.skill.styleReview.label": "Schreibstil prüfen",
    "assistant.skill.talkingPoints.hint": "Entwickeln Sie die Kernaussagen, die dieser Artikel vermitteln soll.",
    "assistant.skill.talkingPoints.label": "Kernpunkte entwickeln",
    "assistant.skill.technicalTerminology.hint": (
        "Prüfen Sie Fachbegriffe anhand von Quellen. Prüfen Sie die Hinweise oder behalten Sie Ihre Formulier" +
        "ungen."
    ),
    "assistant.skill.technicalTerminology.label": "Fachbegriffe prüfen",
    "assistant.skill.translation.hint": "Bereiten Sie einen separaten Übersetzungsartikel zur Prüfung vor.",
    "assistant.skill.translation.label": "Text übersetzen",
    "assistant.skillNoMatches": "Keine passenden Fähigkeiten",
    "assistant.skillResultCount": "{count, plural, =0 {Keine Fähigkeiten verfügbar} one {# Fähigkeit verfügbar} other {# Fähigkeiten verfügbar}}",
    "assistant.skillUsed": "Verwendete Fähigkeit",
    "assistant.status.cancelled": "Abgebrochen",
    "assistant.status.completed": "Abgeschlossen",
    "assistant.status.failed": "Fehlgeschlagen",
    "assistant.status.pending": "In Arbeit",
    "assistant.status.rejected": "Abgelehnt",
    "assistant.stop": "Stoppen",
    "assistant.translationTarget": "auf {language}",
    "assistant.viewFindings": "Hinweise anzeigen",
    "assistant.workingFor": "In Arbeit seit {duration}",
} satisfies Partial<Record<MessageId, string>>;
