import type { MessageId } from "../../messages.js";

export const views = {
    "views.translations": "Tłumaczenia",
    "views.translationStale": "Artykuł źródłowy zmienił się od utworzenia tej propozycji tłumaczenia.",
    "views.translationArticleStale": (
        "Artykuł źródłowy zmienił się od zaakceptowania tego tłumaczenia. Jego tekst został zachowany. Otwórz" +
        " artykuł źródłowy, aby przygotować aktualne tłumaczenie."
    ),
    "views.translationFresh": "Aktualne",
    "views.translationOutdated": "Nieaktualne",
    "views.translationRefresh": "Aktualizuj",
    "views.translationRefreshTitle": "Zaktualizować tłumaczenie?",
    "views.translationRefreshTarget": "Tłumaczenie do aktualizacji",
    "views.translationRefreshDescription": (
        "Zastosować sprawdzony tekst w języku {language} do {title} jako nową zapisaną wersję? Tytuł pozostan" +
        "ie ten sam, a wcześniejsze wersje będą dostępne w historii."
    ),
    "views.translationRefreshConfirm": "Aktualizuj",
    "views.translationRefreshDraft": "Zapisz lub odrzuć szkic tłumaczenia przed aktualizacją.",
    "views.translationRefreshUnavailable": (
        "Nie można zaktualizować tłumaczenia, ponieważ jego propozycja jest niedostępna. Wygeneruj nowe tłuma" +
        "czenie i przejrzyj je ponownie."
    ),
    "views.translationRefreshFailed": (
        "Nie udało się zaktualizować tłumaczenia. Zapisz lub odrzuć jego szkic, sprawdź, czy źródło i tłumacz" +
        "enie się nie zmieniły, i przejrzyj propozycję ponownie."
    ),
    "views.translationEmptyTitle": "Brak propozycji tłumaczenia",
    "views.translationEmpty": "Poproś asystenta redakcyjnego o przetłumaczenie tego artykułu.",
    "views.translate": "Nowe tłumaczenie…",
    "views.translationDialogTitle": "Nowe tłumaczenie",
    "views.translationTargets": "Wygeneruj tłumaczenie i przejrzyj je tutaj. Poprzednie wyniki są zachowywane.",
    "views.translationTargetsEmpty": "Wygeneruj tłumaczenie i przejrzyj je tutaj. Poprzednie wyniki są zachowywane.",
    "views.translationGenerateDescription": "Przetłumacz {title}, źródłowa wersja {revisionId}.",
    "views.translationGenerateDraft": "Niezapisany szkic zostanie zapisany jako wersja przed generowaniem.",
    "views.translationGenerateTargets": "Języki docelowe",
    "views.translationGenerateConfirm": "Wygeneruj tłumaczenie na {languages}",
    "views.translationGenerateBatch": "Przetłumacz na {count, number} języków",
    "views.translationPreservation": "Istniejące wyniki i artykuły są zachowywane. Aktualizacja artykułu z tłumaczeniem wymaga osobnego potwierdzenia.",
    "views.translationGenerationActive": "Trwa żądanie. Poczekaj na jego zakończenie lub anuluj je przed generowaniem tłumaczeń.",
    "views.translationChooseTargets": "Wybierz co najmniej jeden język docelowy, aby kontynuować.",
    "views.translationContextChanged": "Źródło się zmieniło. Przejrzyj aktualne źródło przed ponownym potwierdzeniem.",
    "views.translationReviewSource": "Przejrzyj aktualne źródło",
    "views.translationResultSelector": "Wynik tłumaczenia",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationLinkedIdentity": "Artykuł {articleId}, źródłowa wersja {revisionId}",
    "views.translationLinkedTarget": "{title}, artykuł {articleId}, źródłowa wersja {revisionId}",
    "views.sourceLinkedPrefix": "To tłumaczenie jest powiązane z",
    "views.sourceLinkedRevision": "w źródłowej wersji {revisionNumber}.",
    "views.existingTranslations": "Istniejące tłumaczenia",
    "views.openTranslation": "{language}: {title}",
    "views.translationPair": "Źródło: {source} → tłumaczenie: {target}",
    "views.translationOriginal": "Oryginał",
    "views.translationResult": "Tłumaczenie na {language}",
    "views.translationDisplayMode": "Tryb wyświetlania tłumaczenia",
    "views.translationSideBySide": "Obok siebie",
    "views.translationAligned": "Wyrównane akapity",
    "views.translationMissingOriginal": "Brak pasującego akapitu oryginalnego.",
    "views.translationMissingResult": "Brak pasującego przetłumaczonego akapitu.",
    "views.translationProtectedValue": "Sprawdzona chroniona treść: {value}",
    "views.translationProtectedExplanation": (
        "Oznaczono do dokładnego zachowania w tym tłumaczeniu. {count, plural, one {Oczekiwane wystąpienie je" +
        "st obecne bez zmian} few {Wszystkie # oczekiwane wystąpienia są obecne bez zmian} other {Wszystkie #" +
        " oczekiwanych wystąpień jest obecnych bez zmian}} w przetłumaczonym tekście. To sprawdzenie jest dor" +
        "adcze; przejrzyj tłumaczenie przed zaakceptowaniem."
    ),
    "views.translationComparison": (
        "Porównanie tłumaczenia. Użyj strzałek w lewo i w prawo, aby dotrzeć do sprawdzonej chronionej treści" +
        ", Enter lub Spacji, aby zobaczyć szczegóły, i Escape, aby je zamknąć."
    ),
    "views.translationGenerating": "Tłumaczenie…",
    "views.translationGeneratingLanguages": "Tłumaczenie na {languages}…",
    "views.translationProtectedWarning": "Chroniona treść zmieniona lub brakująca",
    "views.translationPublishingGuidance": "Wskazówki: {profile}",
    "views.editTranslation": "Edytuj",
    "views.rejectTranslation": "Odrzuć",
    "views.rejectTranslationTitle": "Odrzucić to tłumaczenie?",
    "views.rejectTranslationDescription": (
        "Usuwa wygenerowane tłumaczenie na {language} z zatwierdzania. Artykuł źródłowy i zaakceptowane tłuma" +
        "czenia pozostają bez zmian."
    ),
    "views.confirmRejectTranslation": "Odrzuć",
    "views.characterCount": "{count} / {limit} znaków",
    "views.restoreHeading": "Przywrócić zapisaną wersję?",
    "views.restoreDescription": "Przywrócenie tworzy nową, niezmienną wersję. Nie nadpisuje historii.",
    "views.restoreDraftDescription": "Ten szkic ma zmiany, których nie ma w zapisanej wersji. Najpierw go zapisz lub odrzuć przed przywróceniem.",
    "views.restoreRevision": "Przywróć wersję",
    "views.saveAndRestore": "Zapisz i przywróć",
    "views.discardDraftAndRestore": "Odrzuć szkic i przywróć",
    "views.copy": "Kopiuj",
    "views.factCheck": "Weryfikacja faktów",
    "views.factCheckEmptyTitle": "Brak uwag z weryfikacji faktów",
    "views.factCheckEmpty": "Weryfikacja faktów ma charakter doradczy i nigdy nie zmienia artykułu.",
    "views.factCheckRevision": "Sprawdzona wersja: {revision}",
    "views.factCheckHistory": "Historia weryfikacji faktów",
    "views.factCheckCurrent": "Obecna wersja",
    "views.factCheckRunOption": "Wersja {revision}, sprawdzona {dateTime}",
    "views.factEvidenceFreshness": (
        "Dowody odzwierciedlają daty źródeł i sprawdzenia. Twierdzenia zależne od czasu mogły się zmienić; ur" +
        "uchom weryfikację ponownie, aby je odświeżyć."
    ),
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Sprawdź fakty",
} satisfies Partial<Record<MessageId, string>>;
