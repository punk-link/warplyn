import type { MessageId } from "../../messages.js";


export const viewsMessages = {
    "views.acceptAll": "Oznacz wszystkie jako zaakceptowane",
    "views.acceptChange": "Akceptuj",
    "views.acceptFactAsWritten": "Zaakceptuj bez zmian",
    "views.acceptFactEvidence": "Zaakceptuj dowody",
    "views.acceptSelected": "Zaakceptuj zaznaczone zmiany",
    "views.addToCorpus": "Dodaj do korpusu",
    "views.autoScrollNextChange": "Automatycznie przewiń do następnej zmiany",
    "views.applyProposal": "Zastosuj",
    "views.changeNavigation": "Nawigacja po zmianach",
    "views.changeType.addition": "Dodanie{separator}Zmiana {index} z {total}",
    "views.changeType.removal": "Usunięcie{separator}Zmiana {index} z {total}",
    "views.changeType.replacement": "Zastąpienie{separator}Zmiana {index} z {total}",
    "views.characterCount": "{count} / {limit} znaków",
    "views.confirmRejectTranslation": "Odrzuć",
    "views.continueWriting": "Pisz dalej",
    "views.copy": "Kopiuj",
    "views.decision.accepted": "Zaakceptowana",
    "views.decision.pending": "Oczekuje",
    "views.decision.rejected": "Odrzucona",
    "views.discardDraftAndRestore": "Odrzuć i przywróć",
    "views.dismissPreservationWarnings": "Zamknij ostrzeżenia o zachowaniu treści",
    "views.dismissProposal": "Odrzuć propozycję",
    "views.earlierSuggestion": "Wcześniejsza sugestia",
    "views.earlierSuggestionHelp": "Artykuł zmienił się od utworzenia tej sugestii.",
    "views.editTranslation": "Edytuj",
    "views.existingTranslations": "Istniejące tłumaczenia",
    "views.factCheck": "Weryfikacja faktów",
    "views.factCheckCurrent": "Obecna wersja",
    "views.factCheckEmpty": "Weryfikacja faktów ma charakter doradczy i nigdy nie zmienia artykułu.",
    "views.factCheckEmptyTitle": "Brak uwag z weryfikacji faktów",
    "views.factCheckFindings": "Uwagi z weryfikacji faktów",
    "views.factCheckHistorical": (
        "Ten wcześniejszy przebieg weryfikacji jest tylko do odczytu. Nadal można działać na najnowszym przeb" +
        "iegu dla tej wersji."
    ),
    "views.factCheckHistory": "Historia weryfikacji faktów",
    "views.factCheckIncomplete": "Ta weryfikacja jest niepełna. Pokazano tylko ukończone uwagi. Uruchom ją ponownie, aby sprawdzić pozostałe twierdzenia.",
    "views.factCheckRevision": "Sprawdzona wersja: {revision}",
    "views.factCheckRunOption": "Wersja {revision}, sprawdzona {dateTime}",
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {Asystent szuka twierdzeń do sprawdzenia.} one {Asystent sprawdza teraz # twierdz" +
        "enie.} few {Asystent sprawdza teraz # twierdzenia.} other {Asystent sprawdza teraz # twierdzeń.}} Uw" +
        "agi pojawią się tutaj po zakończeniu."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {Asystent szuka twierdzeń do sprawdzenia.} one {Asystent sprawdza teraz # twierdz" +
        "enie.} few {Asystent sprawdza teraz # twierdzenia.} other {Asystent sprawdza teraz # twierdzeń.}} To" +
        " uwagi z poprzedniej ukończonej weryfikacji. Zaktualizują się po zakończeniu nowej."
    ),
    "views.factCheckStale": "Te uwagi należą do wcześniejszej wersji. Można je czytać, ale nie twórz poprawek przed ponowną weryfikacją faktów.",
    "views.factCheckedAt": "Sprawdzono {dateTime}.",
    "views.factEvidenceFreshness": (
        "Dowody odzwierciedlają daty źródeł i sprawdzenia. Twierdzenia zależne od czasu mogły się zmienić; uruchom wery" +
        "fikację ponownie, aby je odświeżyć."
    ),
    "views.factEvidenceReused": "Dowody użyte ponownie z wersji {revision}.",
    "views.factImportance": "Ważność: {importance}",
    "views.factResolution": "Rozstrzygnięcie: {resolution}",
    "views.factResolution.accepted_as_written": "Zaakceptowano bez zmian",
    "views.factResolution.corrected_or_removed": "Poprawiono lub usunięto",
    "views.factResolution.evidence_accepted": "Dowody zaakceptowane",
    "views.factStatus.disputed": "Zakwestionowane",
    "views.factStatus.supported": "Potwierdzone",
    "views.factStatus.unverifiable": "Nieweryfikowalne",
    "views.findingNavigation": "Nawigacja po uwagach",
    "views.nextChange": "Następna zmiana",
    "views.nextFinding": "Następna uwaga",
    "views.openTranslation": "{language}: {title}",
    "views.preservationWarnings": "Sprawdź zachowane szczegóły",
    "views.previousChange": "Poprzednia zmiana",
    "views.previousFinding": "Poprzednia uwaga",
    "views.proposalAccepted": "Ta propozycja została zaakceptowana. Jej decyzje są tylko do odczytu.",
    "views.proposalAuthorEdited": "To sformułowanie zostało przez Ciebie zmienione. Przejrzyj tekst przed zastosowaniem.",
    "views.proposalCounts": (
        "{total, plural, =0 {Brak sugestii} one {# sugestia} few {# sugestie} other {# sugestii}}{separator}{" +
        "pending, plural, =0 {Brak oczekujących} one {# oczekująca} few {# oczekujące} other {# oczekujących}" +
        "}{separator}{accepted, plural, =0 {Brak zaakceptowanych} one {# zaakceptowana} few {# zaakceptowane}" +
        " other {# zaakceptowanych}}{separator}{rejected, plural, =0 {Brak odrzuconych} one {# odrzucona} few" +
        " {# odrzucone} other {# odrzuconych}}"
    ),
    "views.proposalDisplayMode": "Tryb wyświetlania propozycji",
    "views.proposalEmpty": "Użyj asystenta redakcyjnego, aby wygenerować propozycję. Nigdy nie zmieni artykułu automatycznie.",
    "views.proposalEmptyTitle": "Brak propozycji do przeglądu",
    "views.proposalFallback": "Nie można bezpiecznie podzielić tej propozycji na osobne zmiany. Przejrzyj całą propozycję przed zaakceptowaniem.",
    "views.proposalHighlight": "Wyróżnij zmiany",
    "views.proposalNoChanges": "Bez zmian",
    "views.proposalReview": "Przegląd propozycji",
    "views.proposalSideBySide": "Obok siebie",
    "views.proposalStacked": "Jeden pod drugim",
    "views.proposalStale": "Ta propozycja jest nieaktualna, ponieważ artykuł ma nowszą wersję. Wygeneruj nową propozycję przed zaakceptowaniem zmian.",
    "views.proposalSummaryLoading": "Podsumowywanie zmiany…",
    "views.proposalSummaryUnavailable": "Krótkie podsumowanie jest niedostępne. Przejrzyj poniżej tekst oryginalny i proponowany.",
    "views.proposalWhole": "Pełna propozycja{separator}{changes, plural, one {# zmiana} few {# zmiany} other {# zmian}}",
    "views.proposeFactCorrection": "Zaproponuj poprawkę",
    "views.proposeFactCorrections": "Zaproponuj poprawki ({count})",
    "views.proposedChangeInput": "Proponowany tekst zmiany {index}",
    "views.regenerateInAssistant": "Wygeneruj ponownie w asystencie",
    "views.rejectAll": "Oznacz wszystkie jako odrzucone",
    "views.rejectChange": "Odrzuć",
    "views.rejectProposal": "Odrzuć propozycję",
    "views.rejectTranslation": "Odrzuć",
    "views.rejectTranslationDescription": (
        "Usuwa wygenerowane tłumaczenie na {language} z zatwierdzania. Artykuł źródłowy i zaakceptowane tłumaczenia poz" +
        "ostają bez zmian."
    ),
    "views.rejectTranslationTitle": "Odrzucić to tłumaczenie?",
    "views.remove": "Usuń",
    "views.resetAllDecisions": "Resetuj decyzje",
    "views.restoreDescription": "Przywrócenie tworzy nową, niezmienną wersję. Nie nadpisuje historii.",
    "views.restoreDraftDescription": "Ten szkic ma zmiany, których nie ma w zapisanej wersji. Najpierw go zapisz lub odrzuć przed przywróceniem.",
    "views.restoreHeading": "Przywrócić zapisaną wersję?",
    "views.restoreRevision": "Przywróć wersję",
    "views.resumeReview": "Wznów przegląd",
    "views.reviewCurrentArticle": "Przejrzyj obecny artykuł",
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Sprawdź fakty",
    "views.runFactCheckAgain": "Sprawdź fakty ponownie",
    "views.sampleName": "Nazwa próbki",
    "views.saveAndRestore": "Zapisz i przywróć",
    "views.selectAllNeedingReview": "Zaznacz wszystkie wymagające przeglądu",
    "views.selectChange": "Zaznacz zmianę",
    "views.setAllDecisions": "Decyzje…",
    "views.sourceLinkedPrefix": "To tłumaczenie jest powiązane z",
    "views.sourceLinkedRevision": "w źródłowej wersji {revisionNumber}.",
    "views.styleIntro": "Lokalny korpus stylu nigdy nie jest wysyłany w całości; używany jest tylko wyznaczony z niego profil.",
    "views.styleProfile": "Profil stylu",
    "views.translate": "Nowe tłumaczenie…",
    "views.translationAligned": "Wyrównane akapity",
    "views.translationArticleStale": (
        "Artykuł źródłowy zmienił się od zaakceptowania tego tłumaczenia. Jego tekst został zachowany. Otwórz artykuł ź" +
        "ródłowy, aby przygotować aktualne tłumaczenie."
    ),
    "views.translationChooseTargets": "Wybierz co najmniej jeden język docelowy, aby kontynuować.",
    "views.translationComparison": (
        "Porównanie tłumaczenia. Użyj strzałek w lewo i w prawo, aby dotrzeć do sprawdzonej chronionej treści" +
        ", Enter lub Spacji, aby zobaczyć szczegóły, i Escape, aby je zamknąć."
    ),
    "views.translationContextChanged": "Źródło się zmieniło. Przejrzyj aktualne źródło przed ponownym potwierdzeniem.",
    "views.translationDialogTitle": "Nowe tłumaczenie",
    "views.translationDisplayMode": "Tryb wyświetlania tłumaczenia",
    "views.translationEmpty": "Poproś asystenta redakcyjnego o przetłumaczenie tego artykułu.",
    "views.translationEmptyTitle": "Brak propozycji tłumaczenia",
    "views.translationFresh": "Aktualne",
    "views.translationGenerateBatch": "Przetłumacz na {count, number} języków",
    "views.translationGenerateConfirm": "Tłumacz na {languages}",
    "views.translationGenerateDescription": "Przetłumacz {title}, źródłowa wersja {revisionId}.",
    "views.translationGenerateDraft": "Niezapisany szkic zostanie zapisany jako wersja przed generowaniem.",
    "views.translationGenerateTargets": "Języki docelowe",
    "views.translationGenerating": "Tłumaczenie…",
    "views.translationGeneratingLanguages": "Tłumaczenie na {languages}…",
    "views.translationGenerationActive": "Trwa żądanie. Poczekaj na jego zakończenie lub anuluj je przed generowaniem tłumaczeń.",
    "views.translationLinkedIdentity": "Artykuł {articleId}, źródłowa wersja {revisionId}",
    "views.translationLinkedTarget": "{title}, artykuł {articleId}, źródłowa wersja {revisionId}",
    "views.translationMissingOriginal": "Brak pasującego akapitu oryginalnego.",
    "views.translationMissingResult": "Brak pasującego przetłumaczonego akapitu.",
    "views.translationOriginal": "Oryginał",
    "views.translationOutdated": "Nieaktualne",
    "views.translationPair": "Źródło: {source} → tłumaczenie: {target}",
    "views.translationPreservation": "Istniejące wyniki i artykuły są zachowywane. Aktualizacja artykułu z tłumaczeniem wymaga osobnego potwierdzenia.",
    "views.translationProtectedExplanation": (
        "Oznaczono do dokładnego zachowania w tym tłumaczeniu. {count, plural, one {Oczekiwane wystąpienie je" +
        "st obecne bez zmian} few {Wszystkie # oczekiwane wystąpienia są obecne bez zmian} other {Wszystkie #" +
        " oczekiwanych wystąpień jest obecnych bez zmian}} w przetłumaczonym tekście. To sprawdzenie jest dor" +
        "adcze; przejrzyj tłumaczenie przed zaakceptowaniem."
    ),
    "views.translationProtectedValue": "Sprawdzona chroniona treść: {value}",
    "views.translationProtectedWarning": "Chroniona treść zmieniona lub brakująca",
    "views.translationPublishingGuidance": "Wskazówki: {profile}",
    "views.translationRefresh": "Aktualizuj",
    "views.translationRefreshConfirm": "Aktualizuj",
    "views.translationRefreshDescription": (
        "Zastosować sprawdzony tekst w języku {language} do {title} jako nową zapisaną wersję? Tytuł pozostanie ten sam" +
        ", a wcześniejsze wersje będą dostępne w historii."
    ),
    "views.translationRefreshDraft": "Zapisz lub odrzuć szkic tłumaczenia przed aktualizacją.",
    "views.translationRefreshFailed": (
        "Nie udało się zaktualizować tłumaczenia. Zapisz lub odrzuć jego szkic, sprawdź, czy źródło i tłumaczenie się n" +
        "ie zmieniły, i przejrzyj propozycję ponownie."
    ),
    "views.translationRefreshTarget": "Tłumaczenie do aktualizacji",
    "views.translationRefreshTitle": "Zaktualizować tłumaczenie?",
    "views.translationRefreshUnavailable": (
        "Nie można zaktualizować tłumaczenia, ponieważ jego propozycja jest niedostępna. Wygeneruj nowe tłumaczenie i p" +
        "rzejrzyj je ponownie."
    ),
    "views.translationResult": "Tłumaczenie na {language}",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationResultSelector": "Wynik tłumaczenia",
    "views.translationReviewSource": "Przejrzyj aktualne źródło",
    "views.translationSideBySide": "Obok siebie",
    "views.translationStale": "Artykuł źródłowy zmienił się od utworzenia tej propozycji tłumaczenia.",
    "views.translationTargets": "Wygeneruj tłumaczenie i przejrzyj je tutaj. Poprzednie wyniki są zachowywane.",
    "views.translationTargetsEmpty": "Wygeneruj tłumaczenie i przejrzyj je tutaj. Poprzednie wyniki są zachowywane.",
    "views.translations": "Tłumaczenia",
    "views.uncertainty": "Niepewność: {value}",
    "views.updateSuggestion": "Zaktualizuj sugestię",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.warning.claims": "Zmieniona proza może wpłynąć na znaczenie faktów; sprawdź twierdzenia przed zaakceptowaniem.",
    "views.warning.code": "Kod się zmienił. Sprawdź kod w tekście i w blokach.",
    "views.warning.number": "Wartości liczbowe się zmieniły. Sprawdź każdą liczbę.",
    "views.warning.url": "Adresy URL się zmieniły. Sprawdź każdy link.",
    "views.writingSample": "Próbka pisania",
} satisfies Partial<Record<MessageId, string>>;
