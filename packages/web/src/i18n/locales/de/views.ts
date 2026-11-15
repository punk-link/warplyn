import type { MessageId } from "../../messages.js";

export const viewsMessages = {
    "views.factCheck": "Faktenprüfung",
    "views.factCheckEmptyTitle": "Keine Hinweise zur Faktenprüfung",
    "views.factCheckEmpty": "Faktenprüfungen sind unverbindlich und ändern niemals den Artikel.",
    "views.factCheckRevision": "Geprüfte Fassung: {revision}",
    "views.factCheckHistory": "Verlauf der Faktenprüfungen",
    "views.factCheckCurrent": "Aktuelle gespeicherte Fassung",
    "views.factCheckRunOption": "Fassung {revision}, geprüft am {dateTime}",
    "views.factEvidenceFreshness": (
        "Belege spiegeln ihre Quellen und Prüfzeitpunkte wider. Zeitabhängige Behauptungen können sich " +
        "geändert haben. Führen Sie die Faktenprüfung erneut aus, um sie zu aktualisieren."
    ),
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Fakten prüfen",
    "views.factCheckStale": (
        "Diese Hinweise gehören zu einer früheren gespeicherten Fassung. Sie bleiben lesbar, ermöglichen " +
        "jedoch keine Korrektur, bis Sie die Faktenprüfung erneut ausführen."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {Der Assistent sucht nach zu prüfenden Behauptungen.} one {Der Assistent prüft " +
        "gerade # Behauptung.} other {Der Assistent prüft gerade # Behauptungen.}} Dies sind Hinweise der " +
        "vorherigen abgeschlossenen Prüfung. Sie werden nach Abschluss der neuen Prüfung aktualisiert."
    ),
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {Der Assistent sucht nach zu prüfenden Behauptungen.} one {Der Assistent prüft " +
        "gerade # Behauptung.} other {Der Assistent prüft gerade # Behauptungen.}} Hinweise erscheinen hier " +
        "nach Abschluss der Prüfung."
    ),
    "views.factCheckHistorical": "Diese frühere Faktenprüfung ist schreibgeschützt. Die neueste Prüfung für diese Fassung ermöglicht weiterhin Aktionen.",
    "views.factCheckIncomplete": (
        "Diese Faktenprüfung ist unvollständig. Es werden nur abgeschlossene Hinweise angezeigt. Führen Sie " +
        "sie erneut aus, um die übrigen Behauptungen zu prüfen."
    ),
    "views.runFactCheckAgain": "Erneut prüfen",
    "views.selectAllNeedingReview": "Alle zu prüfenden Einträge auswählen",
    "views.proposeFactCorrections": "Korrekturen vorschlagen ({count})",
    "views.proposeFactCorrection": "Korrektur vorschlagen",
    "views.factCheckFindings": "Hinweise der Faktenprüfung",
    "views.factStatus.supported": "Belegt",
    "views.factStatus.disputed": "Umstritten",
    "views.factStatus.unverifiable": "Nicht überprüfbar",
    "views.factImportance": "Bedeutung: {importance}",
    "views.factEvidenceReused": "Belege aus Fassung {revision} wiederverwendet.",
    "views.factCheckedAt": "Geprüft am {dateTime}.",
    "views.acceptFactAsWritten": "Wie geschrieben annehmen",
    "views.acceptFactEvidence": "Belege annehmen",
    "views.factResolution": "Ergebnis: {resolution}",
    "views.factResolution.accepted_as_written": "Wie geschrieben angenommen",
    "views.factResolution.evidence_accepted": "Belege angenommen",
    "views.factResolution.corrected_or_removed": "Korrigiert oder entfernt",
    "views.uncertainty": "Unsicherheit: {value}",
    "views.proposalReview": "Vorschlagsprüfung",
    "views.continueWriting": "Weiterschreiben",
    "views.resumeReview": "Prüfung fortsetzen",
    "views.earlierSuggestion": "Früherer Vorschlag",
    "views.earlierSuggestionHelp": "Ihr Artikel hat sich seit der Erstellung dieses Vorschlags geändert.",
    "views.updateSuggestion": "Vorschlag aktualisieren",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.proposalEmptyTitle": "Kein Vorschlag zur Prüfung",
    "views.proposalEmpty": "Nutzen Sie den redaktionellen Assistenten, um einen Vorschlag zu erzeugen. Er ändert Ihren Artikel niemals automatisch.",
    "views.proposalStale": (
        "Dieser Vorschlag ist veraltet, weil der Artikel eine neuere gespeicherte Fassung hat. Erzeugen Sie " +
        "vor dem Annehmen von Änderungen einen neuen Vorschlag."
    ),
    "views.proposalAccepted": "Dieser Vorschlag wurde angenommen. Seine Entscheidungen sind schreibgeschützt.",
    "views.proposalCounts": (
        "{total, plural, =0 {Keine Vorschläge} one {# Vorschlag} other {# Vorschläge}}{separator}{pending, plural, =0 " +
        "{Keine ausstehenden} one {# ausstehend} other {# ausstehend}}{separator}{accepted, plural, =0 {Keine " +
        "angenommenen} one {# angenommen} other {# angenommen}}{separator}{rejected, plural, =0 {Keine abgelehnten} " +
        "one {# abgelehnt} other {# abgelehnt}}"
    ),
    "views.proposalWhole": "Vollständiger Vorschlag{separator}{changes, plural, one {# Änderung} other {# Änderungen}}",
    "views.acceptAll": "Alle annehmen",
    "views.setAllDecisions": "Alle festlegen…",
    "views.resetAllDecisions": "Alle zurücksetzen",
    "views.applyProposal": "Anwenden",
    "views.proposedChangeInput": "Vorgeschlagener Text für Änderung {index}",
    "views.proposalAuthorEdited": "Sie haben diese Formulierung bearbeitet. Prüfen Sie Ihren Text vor dem Anwenden.",
    "views.rejectAll": "Alle ablehnen",
    "views.acceptChange": "Annehmen",
    "views.rejectChange": "Ablehnen",
    "views.changeNavigation": "Änderungsnavigation",
    "views.previousChange": "Vorherige Änderung",
    "views.nextChange": "Nächste Änderung",
    "views.findingNavigation": "Hinweisnavigation",
    "views.previousFinding": "Vorheriger Hinweis",
    "views.nextFinding": "Nächster Hinweis",
    "views.proposalDisplayMode": "Anzeigemodus für Vorschläge",
    "views.proposalSideBySide": "Nebeneinander",
    "views.proposalStacked": "Untereinander",
    "views.proposalHighlight": "Änderungen hervorheben",
    "views.reviewCurrentArticle": "Aktuellen Artikel prüfen",
    "views.regenerateInAssistant": "Im Assistenten neu erzeugen",
    "views.proposalFallback": (
        "Dieser Vorschlag kann nicht zuverlässig in einzelne Änderungen aufgeteilt werden. Prüfen Sie vor dem " +
        "Annehmen den vollständigen Vorschlag."
    ),
    "views.preservationWarnings": "Geschützte Details prüfen",
    "views.dismissPreservationWarnings": "Warnungen zur Erhaltung ausblenden",
    "views.warning.url": "URLs wurden geändert. Prüfen Sie jeden Link.",
    "views.warning.number": "Zahlenwerte wurden geändert. Prüfen Sie jede Zahl.",
    "views.warning.code": "Code wurde geändert. Prüfen Sie Inline-Code und Codeblöcke.",
    "views.warning.claims": "Geänderter Text kann den sachlichen Inhalt verändern. Prüfen Sie Behauptungen vor dem Annehmen.",
    "views.proposalNoChanges": "Unverändert",
    "views.proposalSummaryLoading": "Diese Änderung wird zusammengefasst…",
    "views.proposalSummaryUnavailable": "Eine kurze Zusammenfassung ist nicht verfügbar. Prüfen Sie unten den Originaltext und den vorgeschlagenen Text.",
    "views.dismissProposal": "Vorschlag verwerfen",
    "views.changeType.addition": "Hinzufügung{separator}Änderung {index} von {total}",
    "views.changeType.removal": "Entfernung{separator}Änderung {index} von {total}",
    "views.changeType.replacement": "Ersetzung{separator}Änderung {index} von {total}",
    "views.decision.pending": "Ausstehend",
    "views.decision.accepted": "Angenommen",
    "views.decision.rejected": "Abgelehnt",
    "views.selectChange": "Änderung auswählen",
    "views.acceptSelected": "Auswahl annehmen",
    "views.rejectProposal": "Vorschlag ablehnen",
    "views.styleProfile": "Stilprofil",
    "views.styleIntro": "Ihr lokaler Stilkorpus wird niemals vollständig gesendet. Nur das daraus abgeleitete Profil wird verwendet.",
    "views.remove": "Entfernen",
    "views.sampleName": "Probenname",
    "views.writingSample": "Schreibprobe",
    "views.addToCorpus": "Zum Korpus hinzufügen",
    "views.translations": "Übersetzungen",
    "views.translationStale": "Der Quellartikel hat sich seit der Erstellung dieses Übersetzungsvorschlags geändert.",
    "views.translationArticleStale": (
        "Der Quellartikel hat sich seit der Annahme dieser Übersetzung geändert. Ihr Text wurde erhalten. " +
        "Öffnen Sie den Quellartikel, um eine aktualisierte Übersetzung vorzubereiten."
    ),
    "views.translationFresh": "Aktuell",
    "views.translationOutdated": "Veraltet",
    "views.translationRefresh": "Aktualisieren",
    "views.translationRefreshTitle": "Übersetzung aktualisieren?",
    "views.translationRefreshTarget": "Zu aktualisierende Übersetzung",
    "views.translationRefreshDescription": (
        "Den geprüften Text auf {language} als neue Fassung auf {title} anwenden? Der Titel bleibt gleich und " +
        "frühere Fassungen bleiben im Verlauf verfügbar."
    ),
    "views.translationRefreshConfirm": "Aktualisieren",
    "views.translationRefreshDraft": "Speichern oder verwerfen Sie den Entwurf der Übersetzung, bevor Sie sie aktualisieren.",
    "views.translationRefreshUnavailable": (
        "Die Übersetzung konnte nicht aktualisiert werden, weil ihr Vorschlag nicht verfügbar ist. Erzeugen " +
        "Sie eine neue Übersetzung und prüfen Sie sie erneut."
    ),
    "views.translationRefreshFailed": (
        "Die Übersetzung konnte nicht aktualisiert werden. Speichern oder verwerfen Sie ihren Entwurf, prüfen " +
        "Sie, dass Quelle und Übersetzung unverändert sind, und prüfen Sie den Vorschlag erneut."
    ),
    "views.translationEmptyTitle": "Kein Übersetzungsvorschlag",
    "views.translationEmpty": "Bitten Sie den redaktionellen Assistenten, diesen Artikel zu übersetzen.",
    "views.translate": "Neue Übersetzung…",
    "views.translationDialogTitle": "Neue Übersetzung",
    "views.translationTargets": "Erzeugen Sie eine Übersetzung und prüfen Sie sie hier. Frühere Ergebnisse bleiben erhalten.",
    "views.translationTargetsEmpty": "Erzeugen Sie eine Übersetzung und prüfen Sie sie hier. Frühere Ergebnisse bleiben erhalten.",
    "views.translationGenerateDescription": "{title} übersetzen, gespeicherte Quellfassung {revisionId}.",
    "views.translationGenerateDraft": "Ihr ungespeicherter Entwurf wird vor der Generierung als Fassung gespeichert.",
    "views.translationGenerateTargets": "Zielsprachen",
    "views.translationGenerateConfirm": "In {languages} übersetzen",
    "views.translationGenerateBatch": "In {count, number} Sprachen übersetzen",
    "views.translationPreservation": (
        "Bestehende Ergebnisse und Artikel bleiben erhalten. Das Aktualisieren eines Übersetzungsartikels " +
        "erfordert eine gesonderte Bestätigung."
    ),
    "views.translationGenerationActive": "Eine Anfrage läuft. Warten Sie auf ihren Abschluss oder brechen Sie sie ab, bevor Sie Übersetzungen erzeugen.",
    "views.translationChooseTargets": "Wählen Sie mindestens eine Zielsprache, um fortzufahren.",
    "views.translationContextChanged": "Die Quelle hat sich geändert. Prüfen Sie die aktualisierte Quelle, bevor Sie erneut bestätigen.",
    "views.translationReviewSource": "Aktualisierte Quelle prüfen",
    "views.translationResultSelector": "Übersetzungsergebnis",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationLinkedIdentity": "Artikel {articleId}, gespeicherte Quellfassung {revisionId}",
    "views.translationLinkedTarget": "{title}, Artikel {articleId}, gespeicherte Quellfassung {revisionId}",
    "views.sourceLinkedPrefix": "Diese Übersetzung ist verknüpft mit",
    "views.sourceLinkedRevision": "bei gespeicherter Quellfassung {revisionNumber}.",
    "views.existingTranslations": "Bestehende Übersetzungen",
    "views.openTranslation": "{language}: {title}",
    "views.translationPair": "Quelle {source} → Übersetzung {target}",
    "views.translationOriginal": "Original",
    "views.translationResult": "Übersetzung auf {language}",
    "views.translationDisplayMode": "Anzeigemodus für Übersetzungen",
    "views.translationSideBySide": "Nebeneinander",
    "views.translationAligned": "Ausgerichtete Absätze",
    "views.translationMissingOriginal": "Kein passender Originalabsatz.",
    "views.translationMissingResult": "Kein passender übersetzter Absatz.",
    "views.translationProtectedValue": "Validierter geschützter Inhalt: {value}",
    "views.translationProtectedExplanation": (
        "Zur unveränderten Erhaltung in dieser Übersetzung markiert. {count, plural, one {Das erwartete " +
        "Vorkommen ist} other {Alle # erwarteten Vorkommen sind}} unverändert im übersetzten Text vorhanden. " +
        "Diese Prüfung ist unverbindlich. Prüfen Sie die Übersetzung vor dem Annehmen."
    ),
    "views.translationComparison": (
        "Übersetzungsvergleich. Mit Links und Rechts erreichen Sie validierten geschützten Inhalt, mit " +
        "Eingabe oder Leertaste öffnen Sie Details, mit Escape schließen Sie sie."
    ),
    "views.translationGenerating": "Wird übersetzt…",
    "views.translationGeneratingLanguages": "Wird in {languages} übersetzt…",
    "views.translationProtectedWarning": "Geschützter Inhalt geändert oder fehlend",
    "views.translationPublishingGuidance": "Richtwerte für {profile}",
    "views.editTranslation": "Bearbeiten",
    "views.rejectTranslation": "Ablehnen",
    "views.rejectTranslationTitle": "Diese Übersetzung ablehnen?",
    "views.rejectTranslationDescription": (
        "Entfernt die erzeugte Übersetzung für {language} aus der Freigabe. Ihr Quellartikel und angenommene " +
        "Übersetzungen bleiben unverändert."
    ),
    "views.confirmRejectTranslation": "Ablehnen",
    "views.characterCount": "{count} / {limit} Zeichen",
    "views.restoreHeading": "Gespeicherte Fassung wiederherstellen?",
    "views.restoreDescription": "Die Wiederherstellung erstellt eine neue unveränderliche gespeicherte Fassung. Der Verlauf wird nicht umgeschrieben.",
    "views.restoreDraftDescription": (
        "Dieser Entwurf enthält Änderungen, die in keiner gespeicherten Fassung enthalten sind. Speichern Sie " +
        "ihn zuerst oder verwerfen Sie ihn vor der Wiederherstellung."
    ),
    "views.restoreRevision": "Wiederherstellen",
    "views.saveAndRestore": "Speichern & laden",
    "views.discardDraftAndRestore": "Verwerfen & laden",
    "views.copy": "Kopieren",
} satisfies Partial<Record<MessageId, string>>;
