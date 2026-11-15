import type { MessageId } from "../../messages.js";

export const assistantMessages = {
    "assistant.panel": "Bereich des redaktionellen Assistenten",
    "assistant.expand": "Assistentenbereich aufklappen",
    "assistant.collapse": "Assistentenbereich einklappen",
    "assistant.resize": "Größe des Assistentenbereichs ändern",
    "assistant.scrollToEnd": "Zum Ende scrollen",
    "assistant.heading": "Redaktioneller Assistent",
    "assistant.intro": (
        "Fordern Sie eine gezielte redaktionelle Bearbeitung an, sobald Sie bereit sind. Vorschläge bleiben " +
        "von Ihrem Artikel getrennt, bis Sie sie annehmen."
    ),
    "assistant.preparing": "Ihr Vorschlag wird vorbereitet…",
    "assistant.workingFor": "In Arbeit seit {duration}",
    "assistant.duration.seconds": "{seconds, plural, one {# Sekunde} other {# Sekunden}}",
    "assistant.duration.minutesAndSeconds": "{minutes, plural, one {# Minute} other {# Minuten}} {seconds, plural, one {# Sekunde} other {# Sekunden}}",
    "assistant.quickActions": "Schnellaktionen",
    "assistant.showAllSkills": "Alle Fähigkeiten anzeigen",
    "assistant.showRecentSkills": "Zuletzt verwendete Fähigkeiten anzeigen",
    "assistant.customSkillsHint": "Weitere Fähigkeiten: Geben Sie / ein, um eigene Fähigkeiten zu finden.",
    "assistant.quickActionSelected": "Schnellaktionen: {operation} ausgewählt",
    "assistant.selectedSkill": "Ausgewählte Fähigkeit: {skill}",
    "assistant.removeSkill": "{skill} entfernen",
    "assistant.articleSelection": "Artikelauswahl",
    "assistant.clearArticleSelection": "Artikelauswahl aufheben",
    "assistant.authorMessage": "Ihre Nachricht",
    "assistant.response.conversation": "Redaktionelles Gespräch",
    "assistant.response.skill": "{skill}",
    "assistant.response.proposal": "Vorschlag vorbereitet",
    "assistant.response.talkingPointsProposal": "Kernpunkte vorbereitet",
    "assistant.response.narrativeDraftProposal": "Erzählentwurf vorbereitet",
    "assistant.response.findings": "Hinweise vorbereitet",
    "assistant.response.partialFindings": (
        "Die Faktenprüfung konnte nicht alle Behauptungen prüfen. Abgeschlossene Hinweise sind verfügbar; " +
        "andere Behauptungen bleiben ungeprüft."
    ),
    "assistant.response.proposalAndFindings": "Vorschlag und Hinweise vorbereitet",
    "assistant.response.translation": "Übersetzungsvorschlag vorbereitet",
    "assistant.translationTarget": "auf {language}",
    "assistant.reviewProposal": "Vorschlag prüfen",
    "assistant.openSkillFolder": "Fähigkeitsordner öffnen",
    "assistant.viewFindings": "Hinweise anzeigen",
    "assistant.reviewTranslation": "Übersetzung prüfen",
    "assistant.guidance": "Redaktionelle Anweisungen",
    "assistant.guidancePlaceholder": "Frage oder Anweisung eingeben…",
    "assistant.send": "Senden",
    "assistant.stop": "Stoppen",
    "assistant.greeting": (
        "Hallo! Ich helfe Ihnen, diesen Artikel zu gestalten. Sie behalten die Kontrolle. Erzählen Sie, woran " +
        "Sie arbeiten, oder wählen Sie eine Schnellaktion."
    ),
    "assistant.requestCancelled": "Diese redaktionelle Anfrage wurde abgebrochen. Ihr Artikel wurde nicht geändert.",
    "assistant.requestFailed": "Diese redaktionelle Anfrage ist fehlgeschlagen. Ihr Artikel wurde nicht geändert.",
    "assistant.profileRebuilt": "Profil aus {count, plural, one {# aktiven Quelle} other {# aktiven Quellen}} neu erstellt.",
    "assistant.requestStartFailed": "Diese redaktionelle Anfrage konnte nicht abgeschlossen werden.",
    "assistant.errorDetails": "Fehlerdetails",
    "assistant.openSettings": "Einstellungen",
    "assistant.retry": "Erneut versuchen",
    "assistant.checkpoint.action": "Ab hier bearbeiten",
    "assistant.checkpoint.accessible": "Ab der Autorennachricht von {time} bearbeiten; spätere Gespräche und Arbeiten werden verworfen",
    "assistant.checkpoint.heading": "Ab dieser Nachricht bearbeiten?",
    "assistant.checkpoint.work": "Diese Arbeiten werden ebenfalls verworfen:",
    "assistant.checkpoint.proposals": "{count, plural, one {# Vorschlag} other {# Vorschläge}}",
    "assistant.checkpoint.findings": "{count, plural, one {# Hinweis} other {# Hinweise}}",
    "assistant.checkpoint.translations": "{count, plural, one {# Übersetzung} other {# Übersetzungen}}",
    "assistant.checkpoint.revision": (
        "Der Artikelinhalt kehrt zur gespeicherten Fassung Nr. {number} ({provenance}) zurück. Die aktuelle " +
        "und spätere Fassungen bleiben im Fassungsverlauf."
    ),
    "assistant.checkpoint.describedRevision": (
        "Der Artikelinhalt kehrt zur gespeicherten Fassung Nr. {number}, „{description}“ ({provenance}) " +
        "zurück. Die aktuelle und spätere Fassungen bleiben im Fassungsverlauf."
    ),
    "assistant.checkpoint.replaceComposer": "Die wiederhergestellte Nachricht ersetzt den nicht gesendeten Text im Eingabefeld.",
    "assistant.checkpoint.draft": (
        "Der aktuelle Entwurf kann nicht zur wiederhergestellten Fassung bestehen bleiben. Speichern Sie ihn " +
        "als Fassung oder verwerfen Sie ihn."
    ),
    "assistant.checkpoint.discard": "Verwerfen & laden",
    "assistant.checkpoint.save": "Speichern & laden",
    "assistant.checkpoint.restore": "Gespräch wiederherstellen",
    "assistant.status.completed": "Abgeschlossen",
    "assistant.status.pending": "In Arbeit",
    "assistant.status.failed": "Fehlgeschlagen",
    "assistant.status.cancelled": "Abgebrochen",
    "assistant.status.rejected": "Abgelehnt",
    "assistant.skillUsed": "Verwendete Fähigkeit",
    "assistant.skill.talkingPoints.label": "Kernpunkte entwickeln",
    "assistant.skill.talkingPoints.hint": "Entwickeln Sie die Kernaussagen, die dieser Artikel vermitteln soll.",
    "assistant.skill.narrativeDraft.label": "Entwurf schreiben",
    "assistant.skill.narrativeDraft.hint": "Verwandeln Sie Ihre Ideen in einen zusammenhängenden ersten Entwurf.",
    "assistant.skill.flowAndClarity.label": "Text klarer machen",
    "assistant.skill.flowAndClarity.hint": "Verbessern Sie Struktur, Übergänge und Lesbarkeit, ohne Ihre Behauptungen zu ändern.",
    "assistant.skill.conciseRewrite.label": "Text kürzen",
    "assistant.skill.conciseRewrite.hint": "Streichen Sie Wiederholungen und Füllwörter, während Bedeutung, Belege und Ihre Stimme erhalten bleiben.",
    "assistant.skill.factChecking.label": "Fakten prüfen",
    "assistant.skill.factChecking.hint": "Prüfen Sie Behauptungen und erstellen Sie unverbindliche Hinweise mit Quellen und Angaben zur Unsicherheit.",
    "assistant.skill.factChecking.speedHint": "Eine Faktenprüfung kann einige Zeit dauern.",
    "assistant.skill.technicalTerminology.label": "Fachbegriffe prüfen",
    "assistant.skill.technicalTerminology.hint": (
        "Prüfen Sie Fachbegriffe anhand von Quellen. Prüfen Sie die Hinweise oder behalten Sie Ihre " +
        "Formulierungen."
    ),
    "assistant.factCheckCorrectionPrompt": (
        "Correct or remove only these fact-check findings. Preserve every other claim and the author's " +
        "voice.\n\n{findings}"
    ),
    "assistant.factCheckClaims": "Zu prüfende Behauptungen",
    "assistant.claimSelectionHelp": (
        "Mit den hervorgehobenen Kontrollkästchen können Sie während der Prüfung Behauptungen einbeziehen " +
        "oder überspringen. Unmarkierte Zeilen sind abgeschlossen."
    ),
    "assistant.factCheckClaimsChecked": "Geprüfte Behauptungen",
    "assistant.factCheckClaimChecked": "Geprüft",
    "assistant.factCheckClaimPending": "Zu prüfen",
    "assistant.factCheckClaimChecking": "Wird geprüft",
    "assistant.checkingClaims": "Behauptungen werden geprüft…",
    "assistant.changeClaimSelectionFailed": (
        "Die Auswahl dieser Behauptung konnte nicht geändert werden. Versuchen Sie es während der laufenden " +
        "Prüfung erneut."
    ),
    "assistant.keepOneClaim": "Behalten Sie eine Behauptung oder stoppen Sie die Anfrage.",
    "assistant.skill.styleReview.label": "Schreibstil prüfen",
    "assistant.skill.styleReview.hint": "Prüfen Sie den Entwurf anhand Ihres lokalen Stilprofils.",
    "assistant.skill.translation.label": "Text übersetzen",
    "assistant.skill.translation.hint": "Bereiten Sie einen separaten Übersetzungsartikel zur Prüfung vor.",
    "assistant.skill.skillCreator.label": "Fähigkeiten erstellen",
    "assistant.skillResultCount": "{count, plural, =0 {Keine Fähigkeiten verfügbar} one {# Fähigkeit verfügbar} other {# Fähigkeiten verfügbar}}",
    "assistant.skillNoMatches": "Keine passenden Fähigkeiten",
    "assistant.selectionSkillUnavailable": "Die Übersetzung verwendet den gesamten Artikel. Heben Sie die Auswahl auf, um ihn zu senden.",
    "assistant.setupRequired": "Richten Sie eine Modellverbindung ein, um den Assistenten zu nutzen. Lokales Schreiben bleibt verfügbar.",
    "assistant.editMode.label": "Bearbeitungsmodus",
    "assistant.editMode.review": "Änderungen vorschlagen",
    "assistant.editMode.direct": "Direkt anwenden",
    "assistant.activity.proposalReady": "Vorschlag zur Prüfung bereit",
    "assistant.activity.article": "Artikel wird gelesen",
    "assistant.activity.links": "Verknüpfte Artikel werden gelesen",
    "assistant.activity.history": "Fassungsverlauf wird gelesen",
    "assistant.activity.draft": "Entwurf wird geprüft",
    "assistant.activity.saved": "Gespeicherte redaktionelle Arbeit wird gelesen",
    "assistant.activity.proposal": "Vorgeschlagene Änderungen werden geprüft",
    "assistant.activity.findings": "Hinweise der Faktenprüfung werden gelesen",
    "assistant.activity.publishing": "Veröffentlichungsrichtwerte werden gelesen",
    "assistant.activity.corpus": "Stilkorpus wird gelesen",
    "assistant.activity.rules": "Artikelstilregeln werden gelesen",
    "assistant.activity.translations": "Übersetzungen werden gelesen",
    "assistant.activity.rename": "Artikel wird umbenannt",
    "assistant.activity.language": "Artikelsprache wird geändert",
    "assistant.activity.assignPublishing": "Veröffentlichungsrichtwerte werden zugewiesen",
    "assistant.activity.updateRules": "Artikelstilregeln werden aktualisiert",
    "assistant.activity.addCorpus": "Gespeicherte Fassung wird zum Stilkorpus hinzugefügt",
    "assistant.activity.rebuild": "Stilprofil wird neu erstellt",
    "assistant.activity.rejectTranslation": "Übersetzung wird abgelehnt",
    "assistant.activity.prepareProposal": "Vorschlag wird vorbereitet",
    "assistant.activity.corrections": "Korrekturen werden vorbereitet",
    "assistant.activity.claims": "Behauptungen werden geprüft",
    "assistant.activity.style": "Stil wird geprüft",
    "assistant.activity.translate": "Übersetzung wird vorbereitet",
    "assistant.activity.editorial": "Redaktionelle Arbeit wird vorbereitet",
    "assistant.activityInterrupted": "Gestoppt während: {activity}. Senden Sie die Anfrage erneut, um es noch einmal zu versuchen.",
    "assistant.applySelection": "Auf Auswahl anwenden",
    "assistant.applyArticle": "Artikel ersetzen",
    "assistant.appliedEdit": "Als neue Fassung gespeichert",
    "assistant.editOriginal": "Besprochene Passage",
    "assistant.editReplacement": "Vorgeschlagener Ersatz",
    "assistant.response.editApplied": "Angeforderte Bearbeitung angewendet",
} satisfies Partial<Record<MessageId, string>>;
