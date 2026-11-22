import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.recovery.title": "Odzyskiwanie Skills Autora",
    "skills.recovery.message": (
        "Dotknięte problemem Skills Autora są niedostępne. Ich pliki i historia zostały zachowane. Rozwiąż " +
        "konflikty w plikach Skills lub przywróć kopię zapasową, a następnie ponów odzyskiwanie. Artykuły i " +
        "wbudowane Skills pozostają dostępne."
    ),
    "skills.recovery.retry": "Ponów odzyskiwanie",
    "skills.recovery.review": "Sprawdź odzyskiwanie",
    "skills.recovery.ready": "Skills Autora są dostępne.",
    "skills.recovery.loadFailed": "Nie udało się sprawdzić odzyskiwania Skills. Spróbuj ponownie lub otwórz Warplyn jeszcze raz.",
    "skills.recovery.retryFailed": "Nie udało się ponowić odzyskiwania Skills. Pliki zostały zachowane. Spróbuj ponownie lub przywróć kopię zapasową.",
    "skills.loadFailed": "Nie udało się wczytać umiejętności. Ponów wczytywanie lub otwórz ponownie ustawienia AI.",
    "skills.validation.invalid_frontmatter": (
        "Plik SKILL.md tej umiejętności nie ma poprawnego bloku szczegółów na początku. Dodaj identyfikator, nazwę, opi" +
        "s i wersję, a następnie spróbuj ponownie."
    ),
    "skills.validation.invalid_instructions": (
        "Dodaj wskazówki Markdown, których ma przestrzegać umiejętność. Zachowaj instrukcje w obsługiwanym limicie rozm" +
        "iaru."
    ),
    "skills.validation.invalid_metadata": (
        "Sprawdź szczegóły umiejętności. Użyj unikatowego identyfikatora małymi literami, jasnej nazwy i opis" +
        "u, wersji liczbowej oraz obsługiwanych ustawień zakresu i wykonywania."
    ),
    "skills.validation.invalid_reference": (
        "Ta umiejętność wskazuje materiał, którego Warplyn nie może użyć. Przechowuj materiały jako pliki Mar" +
        "kdown wewnątrz folderu references i w obsługiwanym limicie rozmiaru."
    ),
    "skills.validation.package_too_large": (
        "Ten pakiet umiejętności jest zbyt duży do wczytania w Warplyn. Skróć instrukcje lub materiały źródłowe i sprób" +
        "uj ponownie."
    ),
    "skills.validation.unsafe_package": (
        "Warplyn nie może użyć tego pakietu umiejętności, ponieważ zawiera nieobsługiwany plik lub lokalizacj" +
        "ę. Zachowaj tylko SKILL.md i zadeklarowane materiały Markdown."
    ),
} satisfies Partial<Record<MessageId, string>>;
