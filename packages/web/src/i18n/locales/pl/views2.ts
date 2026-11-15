import type { MessageId } from "../../messages.js";

export const views2 = {
    "views.factCheckStale": "Te uwagi należą do wcześniejszej wersji. Można je czytać, ale nie twórz poprawek przed ponowną weryfikacją faktów.",
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {Asystent szuka twierdzeń do sprawdzenia.} one {Asystent sprawdza teraz # twierdz" +
        "enie.} few {Asystent sprawdza teraz # twierdzenia.} other {Asystent sprawdza teraz # twierdzeń.}} To" +
        " uwagi z poprzedniej ukończonej weryfikacji. Zaktualizują się po zakończeniu nowej."
    ),
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {Asystent szuka twierdzeń do sprawdzenia.} one {Asystent sprawdza teraz # twierdz" +
        "enie.} few {Asystent sprawdza teraz # twierdzenia.} other {Asystent sprawdza teraz # twierdzeń.}} Uw" +
        "agi pojawią się tutaj po zakończeniu."
    ),
    "views.factCheckHistorical": "Ten wcześniejszy przebieg weryfikacji jest tylko do odczytu. Nadal można działać na najnowszym przebiegu dla tej wersji.",
    "views.factCheckIncomplete": "Ta weryfikacja jest niepełna. Pokazano tylko ukończone uwagi. Uruchom ją ponownie, aby sprawdzić pozostałe twierdzenia.",
    "views.runFactCheckAgain": "Sprawdź fakty ponownie",
    "views.selectAllNeedingReview": "Zaznacz wszystkie wymagające przeglądu",
    "views.proposeFactCorrections": "Zaproponuj poprawki ({count})",
    "views.proposeFactCorrection": "Zaproponuj poprawkę",
    "views.factCheckFindings": "Uwagi z weryfikacji faktów",
    "views.factStatus.supported": "Potwierdzone",
    "views.factStatus.disputed": "Zakwestionowane",
    "views.factStatus.unverifiable": "Nieweryfikowalne",
    "views.factImportance": "Ważność: {importance}",
    "views.factEvidenceReused": "Dowody użyte ponownie z wersji {revision}.",
    "views.factCheckedAt": "Sprawdzono {dateTime}.",
    "views.acceptFactAsWritten": "Zaakceptuj bez zmian",
    "views.acceptFactEvidence": "Zaakceptuj dowody",
    "views.factResolution": "Rozstrzygnięcie: {resolution}",
    "views.factResolution.accepted_as_written": "Zaakceptowano bez zmian",
    "views.factResolution.evidence_accepted": "Dowody zaakceptowane",
    "views.factResolution.corrected_or_removed": "Poprawiono lub usunięto",
    "views.uncertainty": "Niepewność: {value}",
    "views.proposalReview": "Przegląd propozycji",
    "views.continueWriting": "Pisz dalej",
    "views.resumeReview": "Wznów przegląd",
    "views.earlierSuggestion": "Wcześniejsza sugestia",
    "views.earlierSuggestionHelp": "Artykuł zmienił się od utworzenia tej sugestii.",
    "views.updateSuggestion": "Zaktualizuj sugestię",
    "views.proposalEmptyTitle": "Brak propozycji do przeglądu",
    "views.proposalEmpty": "Użyj asystenta redakcyjnego, aby wygenerować propozycję. Nigdy nie zmieni artykułu automatycznie.",
    "views.proposalStale": "Ta propozycja jest nieaktualna, ponieważ artykuł ma nowszą wersję. Wygeneruj nową propozycję przed zaakceptowaniem zmian.",
    "views.proposalAccepted": "Ta propozycja została zaakceptowana. Jej decyzje są tylko do odczytu.",
    "views.proposalCounts": (
        "{total, plural, =0 {Brak sugestii} one {# sugestia} few {# sugestie} other {# sugestii}}{separator}{pending," +
        " plural, =0 {Brak oczekujących} one {# oczekująca} few {# oczekujące} other {# oczekujących}}{separator}{acc" +
        "epted, plural, =0 {Brak zaakceptowanych} one {# zaakceptowana} few {# zaakceptowane} other {# zaakce" +
        "ptowanych}}{separator}{rejected, plural, =0 {Brak odrzuconych} one {# odrzucona} few {# odrzucone} other {# " +
        "odrzuconych}}"
    ),
    "views.proposalWhole": "Pełna propozycja{separator}{changes, plural, one {# zmiana} few {# zmiany} other {# zmian}}",
    "views.acceptAll": "Oznacz wszystkie jako zaakceptowane",
    "views.setAllDecisions": "Decyzje…",
    "views.resetAllDecisions": "Resetuj decyzje",
    "views.applyProposal": "Zastosuj",
    "views.proposedChangeInput": "Proponowany tekst zmiany {index}",
    "views.proposalAuthorEdited": "To sformułowanie zostało przez Ciebie zmienione. Przejrzyj tekst przed zastosowaniem.",
    "views.rejectAll": "Oznacz wszystkie jako odrzucone",
    "views.acceptChange": "Akceptuj",
    "views.rejectChange": "Odrzuć",
    "views.changeNavigation": "Nawigacja po zmianach",
    "views.previousChange": "Poprzednia zmiana",
    "views.nextChange": "Następna zmiana",
    "views.findingNavigation": "Nawigacja po uwagach",
    "views.previousFinding": "Poprzednia uwaga",
    "views.nextFinding": "Następna uwaga",
    "views.proposalDisplayMode": "Tryb wyświetlania propozycji",
    "views.proposalSideBySide": "Obok siebie",
    "views.proposalStacked": "Jeden pod drugim",
    "views.proposalHighlight": "Wyróżnij zmiany",
    "views.reviewCurrentArticle": "Przejrzyj obecny artykuł",
    "views.regenerateInAssistant": "Wygeneruj ponownie w asystencie",
    "views.proposalFallback": "Nie można bezpiecznie podzielić tej propozycji na osobne zmiany. Przejrzyj całą propozycję przed zaakceptowaniem.",
    "views.preservationWarnings": "Sprawdź zachowane szczegóły",
    "views.dismissPreservationWarnings": "Zamknij ostrzeżenia o zachowaniu treści",
    "views.warning.url": "Adresy URL się zmieniły. Sprawdź każdy link.",
    "views.warning.number": "Wartości liczbowe się zmieniły. Sprawdź każdą liczbę.",
    "views.warning.code": "Kod się zmienił. Sprawdź kod w tekście i w blokach.",
    "views.warning.claims": "Zmieniona proza może wpłynąć na znaczenie faktów; sprawdź twierdzenia przed zaakceptowaniem.",
    "views.proposalNoChanges": "Bez zmian",
    "views.proposalSummaryLoading": "Podsumowywanie zmiany…",
    "views.proposalSummaryUnavailable": "Krótkie podsumowanie jest niedostępne. Przejrzyj poniżej tekst oryginalny i proponowany.",
    "views.dismissProposal": "Odrzuć propozycję",
    "views.changeType.addition": "Dodanie{separator}Zmiana {index} z {total}",
    "views.changeType.removal": "Usunięcie{separator}Zmiana {index} z {total}",
    "views.changeType.replacement": "Zastąpienie{separator}Zmiana {index} z {total}",
    "views.decision.pending": "Oczekuje",
    "views.decision.accepted": "Zaakceptowana",
    "views.decision.rejected": "Odrzucona",
    "views.selectChange": "Zaznacz zmianę",
    "views.acceptSelected": "Zaakceptuj zaznaczone zmiany",
} satisfies Partial<Record<MessageId, string>>;
