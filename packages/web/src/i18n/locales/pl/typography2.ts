import type { MessageId } from "../../messages.js";

export const typography2 = {
    "typography.nested": "Wewnętrzny cudzysłów",
    "typography.mark": "Preferowany znak",
    "typography.spacing": "Odstępy",
    "typography.withSpaces": "Ze spacjami",
    "typography.withoutSpaces": "Bez spacji",
    "typography.left": "Lewy element",
    "typography.right": "Prawy element",
    "typography.nbsp": "Spacja nierozdzielająca, U+00A0",
    "typography.narrowNbsp": "Wąska spacja nierozdzielająca, U+202F",
    "typography.source": "Interpunkcja do zastąpienia",
    "typography.replacement": "Interpunkcja zastępująca",
    "typography.instruction": "Instrukcja pełnego przeglądu stylu",
    "typography.horizontalHint": "Używaj pojedynczej zwykłej spacji między elementami prozy. Wcięcia, podziały wierszy i kod pozostają bez zmian.",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.support": "Reguły typograficzne: {rules}",
    "typography.noViolations": "Nie znaleziono mechanicznych naruszeń typografii.",
    "typography.skipped": (
        "{count, plural, one {Pozostawiono bez zmian # niejednoznaczny przypadek cudzysłowu.} few {Pozostawio" +
        "no bez zmian # niejednoznaczne przypadki cudzysłowu.} other {Pozostawiono bez zmian # niejednoznaczn" +
        "ych przypadków cudzysłowu.}} Sprawdź je w kontekście."
    ),
    "typography.contextualSkipped": (
        "{count, plural, one {# reguła kontekstowa wymaga pełnego przeglądu stylu.} few {# reguły kontekstowe" +
        " wymagają pełnego przeglądu stylu.} other {# reguł kontekstowych wymaga pełnego przeglądu stylu.}}"
    ),
    "typography.olderProfile": (
        "Ten przegląd używał Profilu stylu w wersji {version}. Reguły się zmieniły. Uruchom sprawdzanie ponow" +
        "nie, aby użyć obecnego profilu."
    ),
    "typography.rulesOnly": (
        "Nie uwzględniono próbek pisania. Dodaj próbki, aby wyznaczyć cechy głosu, lub użyj jawnych reguł typ" +
        "ograficznych do sprawdzania lokalnego."
    ),
    "typography.checkFailed": "Nie udało się sprawdzić typografii. Zapisz poprawne reguły i spróbuj ponownie.",
    "typography.saveDraftFirst": "Zapisz obecny szkic przed sprawdzeniem typografii. Lokalne sprawdzanie używa zapisanej wersji.",
    "typography.reviewProposal": "Przejrzyj propozycję",
    "typography.correction": "{source} → {replacement}",
    "typography.ordinarySpace": "spacja",
    "typography.deleted": "usunięto",
} satisfies Partial<Record<MessageId, string>>;
