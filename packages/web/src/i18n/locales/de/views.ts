import type { MessageId } from "../../messages.js";


export const viewsMessages = {
    "views.acceptAll": "Alle annehmen",
    "views.acceptChange": "Annehmen",
    "views.acceptFactAsWritten": "Wie geschrieben annehmen",
    "views.acceptFactEvidence": "Belege annehmen",
    "views.acceptSelected": "Auswahl annehmen",
    "views.addToCorpus": "Zum Korpus hinzufügen",
    "views.applyProposal": "Anwenden",
    "views.changeNavigation": "Änderungsnavigation",
    "views.changeType.addition": "Hinzufügung{separator}Änderung {index} von {total}",
    "views.changeType.removal": "Entfernung{separator}Änderung {index} von {total}",
    "views.changeType.replacement": "Ersetzung{separator}Änderung {index} von {total}",
    "views.characterCount": "{count} / {limit} Zeichen",
    "views.confirmRejectTranslation": "Ablehnen",
    "views.continueWriting": "Weiterschreiben",
    "views.copy": "Kopieren",
    "views.decision.accepted": "Angenommen",
    "views.decision.pending": "Ausstehend",
    "views.decision.rejected": "Abgelehnt",
    "views.discardDraftAndRestore": "Verwerfen & laden",
    "views.dismissPreservationWarnings": "Warnungen zur Erhaltung ausblenden",
    "views.dismissProposal": "Vorschlag verwerfen",
    "views.earlierSuggestion": "Früherer Vorschlag",
    "views.earlierSuggestionHelp": "Ihr Artikel hat sich seit der Erstellung dieses Vorschlags geändert.",
    "views.editTranslation": "Bearbeiten",
    "views.existingTranslations": "Bestehende Übersetzungen",
    "views.factCheck": "Faktenprüfung",
    "views.factCheckCurrent": "Aktuelle gespeicherte Fassung",
    "views.factCheckEmpty": "Faktenprüfungen sind unverbindlich und ändern niemals den Artikel.",
    "views.factCheckEmptyTitle": "Keine Hinweise zur Faktenprüfung",
    "views.factCheckFindings": "Hinweise der Faktenprüfung",
    "views.factCheckHistorical": "Diese frühere Faktenprüfung ist schreibgeschützt. Die neueste Prüfung für diese Fassung ermöglicht weiterhin Aktionen.",
    "views.factCheckHistory": "Verlauf der Faktenprüfungen",
    "views.factCheckIncomplete": (
        "Diese Faktenprüfung ist unvollständig. Es werden nur abgeschlossene Hinweise angezeigt. Führen Sie sie erneut " +
        "aus, um die übrigen Behauptungen zu prüfen."
    ),
    "views.factCheckRevision": "Geprüfte Fassung: {revision}",
    "views.factCheckRunOption": "Fassung {revision}, geprüft am {dateTime}",
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {Der Assistent sucht nach zu prüfenden Behauptungen.} one {Der Assistent prüft ge" +
        "rade # Behauptung.} other {Der Assistent prüft gerade # Behauptungen.}} Hinweise erscheinen hier nac" +
        "h Abschluss der Prüfung."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {Der Assistent sucht nach zu prüfenden Behauptungen.} one {Der Assistent prüft ge" +
        "rade # Behauptung.} other {Der Assistent prüft gerade # Behauptungen.}} Dies sind Hinweise der vorhe" +
        "rigen abgeschlossenen Prüfung. Sie werden nach Abschluss der neuen Prüfung aktualisiert."
    ),
    "views.factCheckStale": (
        "Diese Hinweise gehören zu einer früheren gespeicherten Fassung. Sie bleiben lesbar, ermöglichen jedo" +
        "ch keine Korrektur, bis Sie die Faktenprüfung erneut ausführen."
    ),
    "views.factCheckedAt": "Geprüft am {dateTime}.",
    "views.factEvidenceFreshness": (
        "Belege spiegeln ihre Quellen und Prüfzeitpunkte wider. Zeitabhängige Behauptungen können sich geände" +
        "rt haben. Führen Sie die Faktenprüfung erneut aus, um sie zu aktualisieren."
    ),
    "views.factEvidenceReused": "Belege aus Fassung {revision} wiederverwendet.",
    "views.factImportance": "Bedeutung: {importance}",
    "views.factResolution": "Ergebnis: {resolution}",
    "views.factResolution.accepted_as_written": "Wie geschrieben angenommen",
    "views.factResolution.corrected_or_removed": "Korrigiert oder entfernt",
    "views.factResolution.evidence_accepted": "Belege angenommen",
    "views.factStatus.disputed": "Umstritten",
    "views.factStatus.supported": "Belegt",
    "views.factStatus.unverifiable": "Nicht überprüfbar",
    "views.findingNavigation": "Hinweisnavigation",
    "views.nextChange": "Nächste Änderung",
    "views.nextFinding": "Nächster Hinweis",
    "views.openTranslation": "{language}: {title}",
    "views.preservationWarnings": "Geschützte Details prüfen",
    "views.previousChange": "Vorherige Änderung",
    "views.previousFinding": "Vorheriger Hinweis",
    "views.proposalAccepted": "Dieser Vorschlag wurde angenommen. Seine Entscheidungen sind schreibgeschützt.",
    "views.proposalAuthorEdited": "Sie haben diese Formulierung bearbeitet. Prüfen Sie Ihren Text vor dem Anwenden.",
    "views.proposalCounts": (
        "{total, plural, =0 {Keine Vorschläge} one {# Vorschlag} other {# Vorschläge}}{separator}{pending, pl" +
        "ural, =0 {Keine ausstehenden} one {# ausstehend} other {# ausstehend}}{separator}{accepted, plural, " +
        "=0 {Keine angenommenen} one {# angenommen} other {# angenommen}}{separator}{rejected, plural, =0 {Ke" +
        "ine abgelehnten} one {# abgelehnt} other {# abgelehnt}}"
    ),
    "views.proposalDisplayMode": "Anzeigemodus für Vorschläge",
    "views.proposalEmpty": "Nutzen Sie den redaktionellen Assistenten, um einen Vorschlag zu erzeugen. Er ändert Ihren Artikel niemals automatisch.",
    "views.proposalEmptyTitle": "Kein Vorschlag zur Prüfung",
    "views.proposalFallback": (
        "Dieser Vorschlag kann nicht zuverlässig in einzelne Änderungen aufgeteilt werden. Prüfen Sie vor dem Annehmen " +
        "den vollständigen Vorschlag."
    ),
    "views.proposalHighlight": "Änderungen hervorheben",
    "views.proposalNoChanges": "Unverändert",
    "views.proposalReview": "Vorschlagsprüfung",
    "views.proposalSideBySide": "Nebeneinander",
    "views.proposalStacked": "Untereinander",
    "views.proposalStale": (
        "Dieser Vorschlag ist veraltet, weil der Artikel eine neuere gespeicherte Fassung hat. Erzeugen Sie vor dem Ann" +
        "ehmen von Änderungen einen neuen Vorschlag."
    ),
    "views.proposalSummaryLoading": "Diese Änderung wird zusammengefasst…",
    "views.proposalSummaryUnavailable": "Eine kurze Zusammenfassung ist nicht verfügbar. Prüfen Sie unten den Originaltext und den vorgeschlagenen Text.",
    "views.proposalWhole": "Vollständiger Vorschlag{separator}{changes, plural, one {# Änderung} other {# Änderungen}}",
    "views.proposeFactCorrection": "Korrektur vorschlagen",
    "views.proposeFactCorrections": "Korrekturen vorschlagen ({count})",
    "views.proposedChangeInput": "Vorgeschlagener Text für Änderung {index}",
    "views.regenerateInAssistant": "Im Assistenten neu erzeugen",
    "views.rejectAll": "Alle ablehnen",
    "views.rejectChange": "Ablehnen",
    "views.rejectProposal": "Vorschlag ablehnen",
    "views.rejectTranslation": "Ablehnen",
    "views.rejectTranslationDescription": (
        "Entfernt die erzeugte Übersetzung für {language} aus der Freigabe. Ihr Quellartikel und angenommene Übersetzun" +
        "gen bleiben unverändert."
    ),
    "views.rejectTranslationTitle": "Diese Übersetzung ablehnen?",
    "views.remove": "Entfernen",
    "views.resetAllDecisions": "Alle zurücksetzen",
    "views.restoreDescription": "Die Wiederherstellung erstellt eine neue unveränderliche gespeicherte Fassung. Der Verlauf wird nicht umgeschrieben.",
    "views.restoreDraftDescription": (
        "Dieser Entwurf enthält Änderungen, die in keiner gespeicherten Fassung enthalten sind. Speichern Sie" +
        " ihn zuerst oder verwerfen Sie ihn vor der Wiederherstellung."
    ),
    "views.restoreHeading": "Gespeicherte Fassung wiederherstellen?",
    "views.restoreRevision": "Wiederherstellen",
    "views.resumeReview": "Prüfung fortsetzen",
    "views.reviewCurrentArticle": "Aktuellen Artikel prüfen",
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Fakten prüfen",
    "views.runFactCheckAgain": "Erneut prüfen",
    "views.sampleName": "Probenname",
    "views.saveAndRestore": "Speichern & laden",
    "views.selectAllNeedingReview": "Alle zu prüfenden Einträge auswählen",
    "views.selectChange": "Änderung auswählen",
    "views.setAllDecisions": "Alle festlegen…",
    "views.sourceLinkedPrefix": "Diese Übersetzung ist verknüpft mit",
    "views.sourceLinkedRevision": "bei gespeicherter Quellfassung {revisionNumber}.",
    "views.styleIntro": "Ihr lokaler Stilkorpus wird niemals vollständig gesendet. Nur das daraus abgeleitete Profil wird verwendet.",
    "views.styleProfile": "Stilprofil",
    "views.translate": "Neue Übersetzung…",
    "views.translationAligned": "Ausgerichtete Absätze",
    "views.translationArticleStale": (
        "Der Quellartikel hat sich seit der Annahme dieser Übersetzung geändert. Ihr Text wurde erhalten. Öff" +
        "nen Sie den Quellartikel, um eine aktualisierte Übersetzung vorzubereiten."
    ),
    "views.translationChooseTargets": "Wählen Sie mindestens eine Zielsprache, um fortzufahren.",
    "views.translationComparison": (
        "Übersetzungsvergleich. Mit Links und Rechts erreichen Sie validierten geschützten Inhalt, mit Eingab" +
        "e oder Leertaste öffnen Sie Details, mit Escape schließen Sie sie."
    ),
    "views.translationContextChanged": "Die Quelle hat sich geändert. Prüfen Sie die aktualisierte Quelle, bevor Sie erneut bestätigen.",
    "views.translationDialogTitle": "Neue Übersetzung",
    "views.translationDisplayMode": "Anzeigemodus für Übersetzungen",
    "views.translationEmpty": "Bitten Sie den redaktionellen Assistenten, diesen Artikel zu übersetzen.",
    "views.translationEmptyTitle": "Kein Übersetzungsvorschlag",
    "views.translationFresh": "Aktuell",
    "views.translationGenerateBatch": "In {count, number} Sprachen übersetzen",
    "views.translationGenerateConfirm": "In {languages} übersetzen",
    "views.translationGenerateDescription": "{title} übersetzen, gespeicherte Quellfassung {revisionId}.",
    "views.translationGenerateDraft": "Ihr ungespeicherter Entwurf wird vor der Generierung als Fassung gespeichert.",
    "views.translationGenerateTargets": "Zielsprachen",
    "views.translationGenerating": "Wird übersetzt…",
    "views.translationGeneratingLanguages": "Wird in {languages} übersetzt…",
    "views.translationGenerationActive": "Eine Anfrage läuft. Warten Sie auf ihren Abschluss oder brechen Sie sie ab, bevor Sie Übersetzungen erzeugen.",
    "views.translationLinkedIdentity": "Artikel {articleId}, gespeicherte Quellfassung {revisionId}",
    "views.translationLinkedTarget": "{title}, Artikel {articleId}, gespeicherte Quellfassung {revisionId}",
    "views.translationMissingOriginal": "Kein passender Originalabsatz.",
    "views.translationMissingResult": "Kein passender übersetzter Absatz.",
    "views.translationOriginal": "Original",
    "views.translationOutdated": "Veraltet",
    "views.translationPair": "Quelle {source} → Übersetzung {target}",
    "views.translationPreservation": (
        "Bestehende Ergebnisse und Artikel bleiben erhalten. Das Aktualisieren eines Übersetzungsartikels erfordert ein" +
        "e gesonderte Bestätigung."
    ),
    "views.translationProtectedExplanation": (
        "Zur unveränderten Erhaltung in dieser Übersetzung markiert. {count, plural, one {Das erwartete Vorko" +
        "mmen ist} other {Alle # erwarteten Vorkommen sind}} unverändert im übersetzten Text vorhanden. Diese" +
        " Prüfung ist unverbindlich. Prüfen Sie die Übersetzung vor dem Annehmen."
    ),
    "views.translationProtectedValue": "Validierter geschützter Inhalt: {value}",
    "views.translationProtectedWarning": "Geschützter Inhalt geändert oder fehlend",
    "views.translationPublishingGuidance": "Richtwerte für {profile}",
    "views.translationRefresh": "Aktualisieren",
    "views.translationRefreshConfirm": "Aktualisieren",
    "views.translationRefreshDescription": (
        "Den geprüften Text auf {language} als neue Fassung auf {title} anwenden? Der Titel bleibt gleich und frühere F" +
        "assungen bleiben im Verlauf verfügbar."
    ),
    "views.translationRefreshDraft": "Speichern oder verwerfen Sie den Entwurf der Übersetzung, bevor Sie sie aktualisieren.",
    "views.translationRefreshFailed": (
        "Die Übersetzung konnte nicht aktualisiert werden. Speichern oder verwerfen Sie ihren Entwurf, prüfen" +
        " Sie, dass Quelle und Übersetzung unverändert sind, und prüfen Sie den Vorschlag erneut."
    ),
    "views.translationRefreshTarget": "Zu aktualisierende Übersetzung",
    "views.translationRefreshTitle": "Übersetzung aktualisieren?",
    "views.translationRefreshUnavailable": (
        "Die Übersetzung konnte nicht aktualisiert werden, weil ihr Vorschlag nicht verfügbar ist. Erzeugen Sie eine ne" +
        "ue Übersetzung und prüfen Sie sie erneut."
    ),
    "views.translationResult": "Übersetzung auf {language}",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationResultSelector": "Übersetzungsergebnis",
    "views.translationReviewSource": "Aktualisierte Quelle prüfen",
    "views.translationSideBySide": "Nebeneinander",
    "views.translationStale": "Der Quellartikel hat sich seit der Erstellung dieses Übersetzungsvorschlags geändert.",
    "views.translationTargets": "Erzeugen Sie eine Übersetzung und prüfen Sie sie hier. Frühere Ergebnisse bleiben erhalten.",
    "views.translationTargetsEmpty": "Erzeugen Sie eine Übersetzung und prüfen Sie sie hier. Frühere Ergebnisse bleiben erhalten.",
    "views.translations": "Übersetzungen",
    "views.uncertainty": "Unsicherheit: {value}",
    "views.updateSuggestion": "Vorschlag aktualisieren",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.warning.claims": "Geänderter Text kann den sachlichen Inhalt verändern. Prüfen Sie Behauptungen vor dem Annehmen.",
    "views.warning.code": "Code wurde geändert. Prüfen Sie Inline-Code und Codeblöcke.",
    "views.warning.number": "Zahlenwerte wurden geändert. Prüfen Sie jede Zahl.",
    "views.warning.url": "URLs wurden geändert. Prüfen Sie jeden Link.",
    "views.writingSample": "Schreibprobe",
} satisfies Partial<Record<MessageId, string>>;
