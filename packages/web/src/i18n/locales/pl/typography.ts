import type { MessageId } from "../../messages.js";


export const typographyMessages = {
    "typography.add": "Dodaj regułę",
    "typography.applyPreset": "Zastosuj zestaw",
    "typography.articlePreferences": "Tylko tego artykułu",
    "typography.articleSaveHint": (
        "Reguły artykułu zastępują lub wyłączają reguły odziedziczone z języka. Zapisz je, aby użyć ich przy " +
        "następnym sprawdzaniu."
    ),
    "typography.articleSaved": "Zapisano preferencje typograficzne artykułu.",
    "typography.check": "Sprawdź typografię",
    "typography.checkFailed": "Nie udało się sprawdzić typografii. Zapisz poprawne reguły i spróbuj ponownie.",
    "typography.chooseLanguage": "Wybierz język",
    "typography.closeEditor": "Zamknij",
    "typography.closingMark": "Znak zamykający",
    "typography.contextual": "Kontekstowa instrukcja typograficzna",
    "typography.contextualSkipped": (
        "{count, plural, one {# reguła kontekstowa wymaga pełnego przeglądu stylu.} few {# reguły kontekstowe" +
        " wymagają pełnego przeglądu stylu.} other {# reguł kontekstowych wymaga pełnego przeglądu stylu.}}"
    ),
    "typography.copyLegacy": "Skopiuj dotychczasowe reguły do tego języka",
    "typography.correction": "{source} → {replacement}",
    "typography.correctionsConflict": (
        "Nie udało się spójnie zastosować poprawek typograficznych. Zmień nakładające się lub powtarzające reguły i spr" +
        "awdź ponownie. Artykuł nie uległ zmianie."
    ),
    "typography.customPair": "Własna para",
    "typography.dash": "Myślniki w prozie",
    "typography.deleted": "usunięto",
    "typography.earlierConvention": (
        "Ten przegląd używał wcześniejszych preferencji języka lub typografii. Uruchom go ponownie, aby użyć " +
        "obecnych konwencji."
    ),
    "typography.edit": "Edytuj",
    "typography.effectiveLanguage": "Sprawdzanie konwencji dla języka {language}",
    "typography.ellipsis": "Wielokropek",
    "typography.ellipsisSingle": "Pojedynczy znak wielokropka, …",
    "typography.ellipsisThree": "Trzy kropki, ...",
    "typography.empty": "Brak reguł typograficznych. Dodaj konwencję sprawdzania interpunkcji lub odstępów.",
    "typography.horizontal": "Powtórzone spacje",
    "typography.horizontalHint": "Używaj pojedynczej zwykłej spacji między elementami prozy. Wcięcia, podziały wierszy i kod pozostają bez zmian.",
    "typography.inheritanceHint": (
        "Edycja zastępuje odziedziczoną regułę, a usunięcie ją wyłącza. Przywróć odziedziczone reguły, aby wy" +
        "czyścić zastąpienia."
    ),
    "typography.innerSpace": "Spacja wewnątrz cudzysłowu",
    "typography.instruction": "Instrukcja pełnego przeglądu stylu",
    "typography.invalid": (
        "Nie udało się zapisać lub wczytać reguł typograficznych. Sprawdź reguły niepełne, powielone lub sprz" +
        "eczne i spróbuj ponownie. Jeśli zapisane reguły nie wczytują się, przywróć kopię zapasową w Ustawien" +
        "iach."
    ),
    "typography.kind": "Konwencja reguły {number}",
    "typography.languageCode": "Język lub odmiana regionalna",
    "typography.languageCodeHint": (
        "Wpisz nazwę lub odmianę regionalną, np. polski lub hiszpański, Argentyna. Możesz też użyć kodów, tak" +
        "ich jak ja lub es-AR."
    ),
    "typography.languageHint": "Zapisz osobne konwencje dla każdego języka pisania. Nie zmienia to języka artykułu ani interfejsu.",
    "typography.languagePreferences": "Wszystkich artykułów w tym języku",
    "typography.languageSaveFailed": "Nie udało się zapisać języka artykułu. Spróbuj ponownie; tekst nie uległ zmianie.",
    "typography.languageScope": "Język typografii",
    "typography.left": "Lewy element",
    "typography.legacyHint": "Dotychczasowe reguły ogólne zostały zachowane. Skopiuj je do języka, aby użyć ich w nowych sprawdzeniach.",
    "typography.legacyReview": "Ten wcześniejszy przegląd nie ma zapisanych konwencji językowych.",
    "typography.literal": "Dosłowne zastąpienie interpunkcji",
    "typography.loadFailed": "Nie udało się wczytać preferencji typograficznych. Spróbuj ponownie przed edycją lub sprawdzaniem.",
    "typography.localHint": (
        "Sprawdzanie mechaniczne odbywa się lokalnie. Reguły kontekstowe wymagają pełnego przeglądu stylu. Te" +
        "kst artykułu zmienia się dopiero po zaakceptowaniu propozycji."
    ),
    "typography.mark": "Preferowany znak",
    "typography.missingLanguage": "Przed sprawdzeniem typografii wybierz język artykułu na pasku stanu.",
    "typography.narrowNbsp": "Wąska spacja nierozdzielająca, U+202F",
    "typography.nbsp": "Spacja nierozdzielająca, U+00A0",
    "typography.nested": "Wewnętrzny cudzysłów",
    "typography.noConvention": "Brak odpowiednich reguł mechanicznych. Wybierz konwencję albo dodaj i zapisz reguły dla tego języka.",
    "typography.noPreset": "Własne konwencje",
    "typography.noViolations": "Nie znaleziono mechanicznych naruszeń typografii.",
    "typography.nonbreaking": "Para nierozdzielanych elementów",
    "typography.olderProfile": (
        "Ten przegląd używał Profilu stylu w wersji {version}. Reguły się zmieniły. Uruchom sprawdzanie ponownie, aby u" +
        "żyć obecnego profilu."
    ),
    "typography.openingMark": "Znak otwierający",
    "typography.ordinarySpace": "spacja",
    "typography.otherLanguage": "Inny język…",
    "typography.otherLanguageTitle": "Wybierz inny język pisania",
    "typography.outer": "Zewnętrzny cudzysłów",
    "typography.preset": "Gotowy zestaw konwencji",
    "typography.presetPending": "{language}{separator}oczekuje na sprawdzenie przez rodzimego użytkownika języka",
    "typography.presetReviewHint": "Podglądy zestawów oczekują na sprawdzenie przez rodzimych użytkowników języka. Poniżej możesz dodać własne reguły.",
    "typography.punctuationMarks": "Znaki interpunkcyjne",
    "typography.punctuationSpacing": "Odstępy przy interpunkcji",
    "typography.quotes": "Cudzysłowy",
    "typography.remove": "Usuń",
    "typography.replacement": "Interpunkcja zastępująca",
    "typography.required": "Nie można sprawdzić typografii. Wybierz język artykułu, a następnie zapisz reguły tego języka w Profilu stylu.",
    "typography.resetInheritance": "Przywróć odziedziczone reguły",
    "typography.retryLoad": "Wczytaj preferencje ponownie",
    "typography.reviewLanguage": "Konwencje sprawdzania: {language}",
    "typography.reviewProposal": "Przejrzyj propozycję",
    "typography.right": "Prawy element",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.ruleNumber": "Reguła {number}",
    "typography.rulesOnly": (
        "Nie uwzględniono próbek pisania. Dodaj próbki, aby wyznaczyć cechy głosu, lub użyj jawnych reguł typograficzny" +
        "ch do sprawdzania lokalnego."
    ),
    "typography.save": "Zapisz",
    "typography.saveDraftFirst": "Zapisz obecny szkic przed sprawdzeniem typografii. Lokalne sprawdzanie używa zapisanej wersji.",
    "typography.saveFailed": "Nie udało się zapisać reguł typograficznych. Twoje zmiany są nadal tutaj. Spróbuj zapisać ponownie.",
    "typography.saveHint": (
        "Zapisanie przebudowuje profil lokalnie na podstawie uwzględnionych próbek i zapisanych reguł, w tym " +
        "oczekujących zmian próbek. Niezapisane zmiany w innych formularzach są pomijane."
    ),
    "typography.saved": "Zapisano reguły typograficzne i przebudowano Profil stylu.",
    "typography.savedRule": "Zapisana",
    "typography.scope": "Zastosuj reguły do",
    "typography.skipped": (
        "{count, plural, one {Pozostawiono bez zmian # niejednoznaczny przypadek cudzysłowu.} few {Pozostawio" +
        "no bez zmian # niejednoznaczne przypadki cudzysłowu.} other {Pozostawiono bez zmian # niejednoznaczn" +
        "ych przypadków cudzysłowu.}} Sprawdź je w kontekście."
    ),
    "typography.source": "Interpunkcja do zastąpienia",
    "typography.source.article": "Zastąpienie w artykule",
    "typography.source.language": "Preferencja języka",
    "typography.source.preset": "Zestaw",
    "typography.spaceBefore": "Spacja przed znakiem interpunkcyjnym",
    "typography.spacing": "Odstępy",
    "typography.support": "Reguły typograficzne: {rules}",
    "typography.title": "Reguły typograficzne",
    "typography.unknownLanguage": "Nie określono języka",
    "typography.unsavedRule": "Niezapisana",
    "typography.useLanguage": "Użyj języka",
    "typography.validation.conflict": "Te konwencje są sprzeczne. Zmień lub usuń jedną z nich przed zapisaniem.",
    "typography.validation.duplicate": "Ta konwencja już jest na liście. Edytuj lub usuń duplikat przed zapisaniem.",
    "typography.validation.invalid": "Uzupełnij pola tej reguły przed zapisaniem.",
    "typography.validation.limit": "Przed zapisaniem ogranicz liczbę reguł do 30.",
    "typography.withSpaces": "Ze spacjami",
    "typography.withoutSpaces": "Bez spacji",
} satisfies Partial<Record<MessageId, string>>;
