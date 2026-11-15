import type { MessageId } from "../../messages.js";

export const spelling = {
    "spelling.desktopOnly": (
        "Użyj aplikacji komputerowej, aby pobierać słowniki i zarządzać słownikiem osobistym. W przeglądarce " +
        "sprawdzanie pisowni zależy od jej ustawień."
    ),
    "spelling.localHint": (
        "Sprawdzanie pisowni i osobiste słowa pozostają na tym urządzeniu. Pobieranie słowników wymaga intern" +
        "etu i łączy się z siecią CDN słowników Google."
    ),
    "spelling.dictionaries": "Słowniki językowe",
    "spelling.preload": "Przygotuj pisanie bez internetu",
    "spelling.preloadHint": "Wybierz języki do pisania bez internetu. Język artykułu pozostaje bez zmian.",
    "spelling.download": "Pobierz słowniki",
    "spelling.languageVariant": "{language} ({code})",
    "spelling.filterLanguages": "Filtruj języki",
    "spelling.noLanguages": "Brak pasujących języków.",
    "spelling.unverified": "Dostępny",
    "spelling.unloaded": "Niewczytany",
    "spelling.unload": "Zwolnij z pamięci",
    "spelling.unloadLanguage": "Zwolnij z pamięci słownik języka {language}",
    "spelling.preparing": "Przygotowywanie",
    "spelling.ready": "Pobrany",
    "spelling.failed": "Niedostępny. Ponów pobieranie.",
    "spelling.personal": "Słownik osobisty",
    "spelling.personalHint": (
        "Przechowuj terminy techniczne, takie jak PostgreSQL i gRPC, w jednym słowniku osobistym wspólnym dla" +
        " artykułów i języków sprawdzania pisowni."
    ),
    "spelling.systemHint": "Dodanie lub usunięcie słowa zmienia również słownik użytkownika w systemie operacyjnym i może wpływać na inne aplikacje.",
    "spelling.addWords": "Słowa do dodania",
    "spelling.wordsHint": (
        "Wpisz jedno słowo lub termin techniczny w każdym wierszu, do 128 znaków każde. Możesz dodać do 500 s" +
        "łów naraz. Nieudane wpisy pozostają tutaj do poprawienia lub ponowienia."
    ),
    "spelling.add": "Dodaj słowa",
    "spelling.remove": "Usuń",
    "spelling.removeWord": "Usuń {word} ze słownika osobistego",
    "spelling.savedWords": "Zapisane słowa",
    "spelling.search": "Przeszukaj słownik osobisty",
    "spelling.searchHint": "Znajdź zapisane terminy i usuń słowa, które moduł sprawdzania pisowni ma znów sprawdzać.",
    "spelling.noWords": "Brak pasujących słów osobistych.",
    "spelling.persistenceHint": (
        "Słowniki i osobiste słowa należą do tej instalacji. Kopie zapasowe i przywracanie artykułów ich nie " +
        "obejmują. Usunięcie danych artykułów nie usuwa słów ze słownika systemowego; usuń je tutaj."
    ),
    "spelling.loading": "Wczytywanie ustawień pisowni…",
    "spelling.loaded": "Wczytano ustawienia pisowni.",
    "spelling.loadFailed": "Nie udało się wczytać ustawień pisowni. Spróbuj ponownie.",
    "spelling.retry": "Ponów",
    "spelling.working": "Aktualizowanie ustawień pisowni…",
    "spelling.updated": "Zaktualizowano ustawienia pisowni.",
    "spelling.partial": "Nie udało się dodać części słów. Popraw lub ponów wpisy w polu Słowa do dodania.",
    "spelling.operationFailed": "Nie udało się zaktualizować ustawień pisowni. Ponów zmianę. Przy pobieraniu sprawdź połączenie z internetem.",
    "spelling.invalidWords": "Wpisz do 500 słów, po jednym w wierszu, nie więcej niż 128 znaków każde i 64 KiB łącznie.",
    "spelling.wordFailed": "Nie udało się dodać słowa do słownika osobistego. Otwórz ustawienia pisowni i spróbuj dodać je ponownie.",
    "spelling.correctionFailed": "Nie udało się zastosować poprawki pisowni. Otwórz ponownie menu sugestii lub wpisz poprawkę w artykule.",
    "spelling.languageFailed": (
        "Nie udało się włączyć sprawdzania pisowni dla języka artykułu. Ponów wybór języka lub przygotuj jego" +
        " słownik w ustawieniach pisowni."
    ),
} satisfies Partial<Record<MessageId, string>>;
