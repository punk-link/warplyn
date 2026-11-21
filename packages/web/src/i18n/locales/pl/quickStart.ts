import type { MessageId } from "../../messages.js";


export const quickStartMessages = {
    "quickStart.addModelKey": "Dodaj klucz modelu",
    "quickStart.assistant.description": (
        "Użyj prawego panelu do edycji, przeglądów, tłumaczeń i weryfikacji faktów. Zmiany AI pozostają propozycjami do" +
        " zaakceptowania, a uwagi mają charakter doradczy."
    ),
    "quickStart.assistant.title": "Zapytaj asystenta.",
    "quickStart.close": "Zamknij szybki start",
    "quickStart.modelKey.description": (
        "Klucz modelu to klucz API dostawcy AI. W aplikacji komputerowej wybierz dostawcę, wklej klucz, zapis" +
        "z go w magazynie poświadczeń systemu, odśwież modele i wybierz model domyślny. Warplyn nigdy ponowni" +
        "e nie wyświetla zapisanego klucza."
    ),
    "quickStart.modelKey.title": "Dodaj klucz modelu.",
    "quickStart.skip": "Pomiń szybki start",
    "quickStart.startWriting": "Zacznij pisać",
    "quickStart.title": "Witaj w Warplyn",
    "quickStart.write.description": (
        "Utwórz lub otwórz artykuł w lewym panelu, a następnie pisz w środkowym obszarze. Warplyn zachowuje stan odzysk" +
        "iwania szkicu i historię zapisanych wersji."
    ),
    "quickStart.write.title": "Napisz artykuł.",
} satisfies Partial<Record<MessageId, string>>;
