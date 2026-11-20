import type { MessageId } from "../../messages.js";


export const errorsMessages = {
    "errors.activeConnectionRemovalBlocked": "Wybierz inne aktywne połączenie AI przed usunięciem tego.",
    "errors.activeConnectionRequired": "Najpierw dodaj i wybierz połączenie AI.",
    "errors.aiConnectionNotFound": "Nie znaleziono połączenia AI. Wybierz inne i spróbuj ponownie.",
    "errors.aiConnectionVerificationFailed": "Dostawca AI nie mógł zweryfikować połączenia. Sprawdź zmienną i jej klucz, a następnie spróbuj ponownie.",
    "errors.articleNotFound": "Nie znaleziono artykułu. Wybierz istniejący artykuł i spróbuj ponownie.",
    "errors.assistantCheckpointConflict": "Rozmowa z asystentem się zmieniła. Przejrzyj aktualne szczegóły przywracania i spróbuj ponownie.",
    "errors.assistantCheckpointInvalid": "Ten punkt kontrolny rozmowy jest już niedostępny. Wybierz inną wiadomość autora.",
    "errors.assistantCoordinatorFailed": "Nie udało się dokończyć działania asystenta. Artykuł nie uległ zmianie. Spróbuj ponownie.",
    "errors.assistantEditConflict": "Artykuł lub szkic się zmienił. Zapisz lub rozstrzygnij obecną pracę, a następnie poproś o nową edycję.",
    "errors.assistantEditInvalid": (
        "Asystent nie utworzył bezpiecznego zamiennika. Artykuł nie uległ zmianie. Spróbuj mniejszego zaznaczenia lub d" +
        "okładniejszej instrukcji."
    ),
    "errors.assistantRequestConflict": "To działanie asystenta już trwa. Poczekaj na zakończenie przed ponowieniem.",
    "errors.assistantRequestTimedOut": (
        "Żądanie asystenta osiągnęło limit czasu. Artykuł nie uległ zmianie. Ponów żądanie lub zwiększ limit czasu w us" +
        "tawieniach ogólnych."
    ),
    "errors.assistantRetryInvalid": "Nie można ponowić tego działania asystenta. Rozpocznij je ponownie z poziomu asystenta.",
    "errors.assistantSelectionInvalid": "Nie można użyć tego zaznaczenia do działania asystenta. Zmień je i spróbuj ponownie.",
    "errors.assistantSkillScopeIncompatible": "To działanie asystenta nie może użyć zaznaczenia. Zmień je i spróbuj ponownie.",
    "errors.assistantSkillUnsupported": "To działanie asystenta jest niedostępne. Wybierz inne.",
    "errors.duplicateStyleCorpusItem": "Ten tekst jest już w korpusie stylu.",
    "errors.editorialConfigurationMissing": "Nie udało się rozpocząć działania wspomaganego AI. Wybierz zgodny model w Ustawieniach i spróbuj ponownie.",
    "errors.editorialOperationUnsupported": "To działanie wspomagane AI jest niedostępne. Wybierz inne.",
    "errors.editorialProviderFailed": (
        "Nie udało się dokończyć działania wspomaganego AI. Artykuł nie uległ zmianie. Ponów lub sprawdź połączenie AI " +
        "w Ustawieniach."
    ),
    "errors.editorialRequestFailed": (
        "Nie udało się wykonać działania wspomaganego AI. Artykuł nie uległ zmianie. Ponów lub sprawdź połączenie AI w " +
        "Ustawieniach."
    ),
    "errors.editorialStreamIncomplete": "Nie udało się dokończyć działania wspomaganego AI. Artykuł nie uległ zmianie. Spróbuj ponownie.",
    "errors.environmentVariableUnavailable": "Zmienna {environmentVariableName} jest niedostępna. Dodaj ją i spróbuj ponownie.",
    "errors.factCorrectionSelectionInvalid": (
        "Nie udało się przygotować poprawek, ponieważ wybrane uwagi nie są już aktualne lub wymagają przegląd" +
        "u. Ponów weryfikację faktów, a następnie wybierz nierozstrzygnięte uwagi zakwestionowane lub niewery" +
        "fikowalne."
    ),
    "errors.generic": "Nie udało się dokończyć czynności. Artykuł nie uległ zmianie. Spróbuj ponownie.",
    "errors.invalidEnvironmentVariableName": "Wpisz nazwę zmiennej środowiskowej z wielkich liter, cyfr i podkreśleń.",
    "errors.invalidJson": "Nie udało się dokończyć czynności, ponieważ część danych jest nieprawidłowa. Sprawdź je i spróbuj ponownie.",
    "errors.invalidKeyBinding": "Wpisz pełny skrót z klawiszem innym niż modyfikator.",
    "errors.invalidRequest": "Nie udało się dokończyć czynności, ponieważ część danych jest nieprawidłowa. Sprawdź je i spróbuj ponownie.",
    "errors.keyBindingConflict": "Wybierz skrót, który nie jest już przypisany.",
    "errors.managedCredentialMissing": (
        "To połączenie nie ma klucza API w Warplyn. Dodaj nowe połączenie z kluczem API i wybierz je dla modeli, a nast" +
        "ępnie usuń stare połączenie."
    ),
    "errors.managedCredentialsUnavailable": "Bezpieczne przechowywanie poświadczeń jest niedostępne na tym urządzeniu. Wybierz Zmienna środowiskowa.",
    "errors.originNotPermitted": "Nie udało się dokończyć czynności w tym oknie. Otwórz Warplyn ponownie i spróbuj jeszcze raz.",
    "errors.proposalEditInvalid": (
        "Nie udało się zastosować zmienionej propozycji. Artykuł nie uległ zmianie. Zachowaj proponowane licz" +
        "by, linki, kod i terminy techniczne bez zmian, a następnie spróbuj ponownie. Jeśli propozycja jest n" +
        "iedostępna, wygeneruj nową."
    ),
    "errors.requestTooLarge": "Nie udało się dokończyć czynności, ponieważ zaznaczona treść jest zbyt duża. Zmniejsz ją i spróbuj ponownie.",
    "errors.resourceNotFound": "Nie znaleziono tego, czego wymaga czynność. Odśwież Warplyn i spróbuj ponownie.",
    "errors.revisionConflict": (
        "Nie udało się zapisać, ponieważ artykuł zmienił się wcześniej. Ostatnie zmiany nadal są w edytorze; przejrzyj " +
        "konflikt i spróbuj ponownie."
    ),
    "errors.revisionNotFound": "Nie znaleziono zapisanej wersji. Wybierz inną i spróbuj ponownie.",
    "errors.skillPackageConflict": (
        "Ta umiejętność się zmieniła lub jej identyfikator albo nazwa są już używane. Wczytaj listę ponownie, w razie p" +
        "otrzeby wybierz wolną nazwę i spróbuj ponownie."
    ),
    "errors.skillRevisionNotFound": "Ta wersja umiejętności jest niedostępna. Wyświetl ponownie wersje umiejętności i wybierz istniejącą.",
    "errors.styleCorpusRequired": "Dodaj co najmniej jeden element korpusu stylu przed sprawdzeniem stylu.",
    "errors.targetLanguageRequired": "Wybierz język docelowy przed żądaniem tłumaczenia.",
    "errors.unsupportedPublishingProfile": "Wybierz obsługiwany profil publikacji.",
} satisfies Partial<Record<MessageId, string>>;
