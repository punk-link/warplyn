import type { MessageId } from "../../messages.js";

export const settings4 = {
    "settings.backupAutomation": "Automatyczne kopie zapasowe",
    "settings.preferredAppearance": "Preferowany wygląd",
    "settings.appearanceHint": "Wybierz wygląd Warplyn. Systemowy podąża za preferencją urządzenia i aktualizuje się, gdy Warplyn jest otwarty.",
    "settings.system": "Systemowy",
    "settings.light": "Jasny",
    "settings.dark": "Ciemny",
    "settings.applyAppearance": "Zastosuj teraz",
    "settings.interfaceLanguage": "Język interfejsu",
    "settings.interfaceLanguageHint": "Zmienia język elementów sterujących i komunikatów Warplyn. Treść artykułów pozostaje bez zmian.",
    "settings.dateFormat": "Format daty",
    "settings.dateFormatHint": "Zmienia sposób wyświetlania dat w Warplyn. Nie zmienia zapisanych dat ani historii wersji.",
    "settings.systemDateFormat": "Systemowy format daty ({value})",
    "settings.resetDateFormat": "Użyj systemowego formatu daty",
    "settings.dayFirstSlash": "DD/MM/RRRR",
    "settings.dayFirstDots": "DD.MM.RRRR",
    "settings.monthFirstSlash": "MM/DD/RRRR",
    "settings.isoDate": "RRRR-MM-DD",
    "settings.twelveHour": "12-godzinny",
    "settings.twentyFourHour": "24-godzinny",
    "settings.timeFormat": "Format godziny",
    "settings.timeFormatHint": "Zmienia sposób wyświetlania godzin w Warplyn. Nie zmienia zapisanych dat ani historii wersji.",
    "settings.systemTimeFormat": "Systemowy format godziny ({value})",
    "settings.resetTimeFormat": "Użyj systemowego formatu godziny",
    "settings.timeZone": "Strefa czasowa",
    "settings.timeZoneHint": (
        "Systemowa strefa czasowa podąża za urządzeniem. Wybierz region, aby zachować jego czas w podróży. Zm" +
        "ienia to tylko wyświetlane godziny, nie zapisane znaczniki czasu."
    ),
    "settings.systemTimeZone": "Systemowa strefa czasowa {timeZone}",
    "settings.localTimeZone": "czas lokalny",
    "settings.resetTimeZone": "Użyj systemowej strefy czasowej",
    "settings.example": "Przykład: {value}",
    "settings.defaultArticleLanguage": "Domyślny język artykułu",
    "settings.defaultArticleLanguageHint": "Używany w nowych artykułach, gdy samodzielnie nie wybierzesz języka. Istniejące artykuły nie ulegają zmianie.",
    "settings.defaultTranslationLanguages": "Domyślne języki tłumaczenia",
    "settings.defaultTranslationLanguagesHint": "Wstępnie wybrane przy rozpoczynaniu tłumaczenia. Możesz zmienić języki docelowe przed generowaniem.",
    "settings.spelling": "Pisownia",
    "settings.assistantRequestTimeout": "Limit czasu żądania",
    "settings.assistantRequestTimeoutHint": (
        "Zatrzymuje żądania asystenta po tym czasie. Dotyczy nowych żądań, także ponowień. Artykuł pozostaje " +
        "bez zmian po upływie limitu."
    ),
    "settings.requestTimeoutMinutes": "{minutes, plural, one {# minuta} few {# minuty} other {# minut}}",
    "settings.requestTimeoutUnlimited": "Bez limitu",
    "settings.animations": "Animacje",
    "settings.animationsHint": (
        "Animuj wskaźniki, wiadomości asystenta i efekty interfejsu. Preferencje ograniczenia ruchu na urządz" +
        "eniu są nadal respektowane."
    ),
    "settings.general.interfaceLocale.english": "English",
} satisfies Partial<Record<MessageId, string>>;
