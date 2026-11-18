import type { MessageId } from "../../messages.js";

export const skills = {
    "skills.loadFailed": "Nie udało się wczytać umiejętności. Ponów wczytywanie lub otwórz ponownie ustawienia AI.",
    "skills.validation.invalid_frontmatter": (
        "Plik SKILL.md tej umiejętności nie ma poprawnego bloku szczegółów na początku. Dodaj identyfikator, " +
        "nazwę, opis i wersję, a następnie spróbuj ponownie."
    ),
    "skills.validation.invalid_metadata": (
        "Sprawdź szczegóły umiejętności. Użyj unikatowego identyfikatora małymi literami, jasnej nazwy i opis" +
        "u, wersji liczbowej oraz obsługiwanych ustawień zakresu i wykonywania."
    ),
    "skills.validation.invalid_instructions": (
        "Dodaj wskazówki Markdown, których ma przestrzegać umiejętność. Zachowaj instrukcje w obsługiwanym li" +
        "micie rozmiaru."
    ),
    "skills.validation.invalid_reference": (
        "Ta umiejętność wskazuje materiał, którego Warplyn nie może użyć. Przechowuj materiały jako pliki Mar" +
        "kdown wewnątrz folderu references i w obsługiwanym limicie rozmiaru."
    ),
    "skills.validation.unsafe_package": (
        "Warplyn nie może użyć tego pakietu umiejętności, ponieważ zawiera nieobsługiwany plik lub lokalizacj" +
        "ę. Zachowaj tylko SKILL.md i zadeklarowane materiały Markdown."
    ),
    "skills.validation.package_too_large": (
        "Ten pakiet umiejętności jest zbyt duży do wczytania w Warplyn. Skróć instrukcje lub materiały źródło" +
        "we i spróbuj ponownie."
    ),
} satisfies Partial<Record<MessageId, string>>;
