import type { MessageId } from "../../messages.js";

export const quickStart = {
    "quickStart.title": "Witaj w Warplyn",
    "quickStart.close": "Zamknij szybki start",
    "quickStart.write.title": "Napisz artykuł.",
    "quickStart.write.description": (
        "Utwórz lub otwórz artykuł w lewym panelu, a następnie pisz w środkowym obszarze. Warplyn zachowuje s" +
        "tan odzyskiwania szkicu i historię zapisanych wersji."
    ),
    "quickStart.assistant.title": "Zapytaj asystenta.",
    "quickStart.assistant.description": (
        "Użyj prawego panelu do edycji, przeglądów, tłumaczeń i weryfikacji faktów. Zmiany AI pozostają propo" +
        "zycjami do zaakceptowania, a uwagi mają charakter doradczy."
    ),
    "quickStart.modelKey.title": "Dodaj klucz modelu.",
    "quickStart.modelKey.description": (
        "Klucz modelu to klucz API dostawcy AI. W aplikacji komputerowej wybierz dostawcę, wklej klucz, zapis" +
        "z go w magazynie poświadczeń systemu, odśwież modele i wybierz model domyślny. Warplyn nigdy ponowni" +
        "e nie wyświetla zapisanego klucza."
    ),
    "quickStart.skip": "Pomiń szybki start",
    "quickStart.addModelKey": "Dodaj klucz modelu",
    "quickStart.startWriting": "Zacznij pisać",
} satisfies Partial<Record<MessageId, string>>;
