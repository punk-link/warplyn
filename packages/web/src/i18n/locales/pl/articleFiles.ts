import type { MessageId } from "../../messages.js";

export const articleFiles = {
    "articleFiles.save": "Zapisz do pliku",
    "articleFiles.load": "Wczytaj z pliku",
    "articleFiles.menuSave": "Zapisz do pliku…",
    "articleFiles.menuLoad": "Wczytaj z pliku…",
    "articleFiles.saved": "Artykuł zapisano do pliku",
    "articleFiles.downloadStarted": "Rozpoczęto pobieranie artykułu",
    "articleFiles.loaded": "Wczytano artykuł z pliku",
    "articleFiles.loadFailed": "Nie udało się wczytać artykułu. Wybierz czytelny plik Markdown, HTML, DOCX lub RTF i spróbuj ponownie.",
    "articleFiles.saveFailed": "Nie udało się zapisać artykułu do pliku. Wybierz lokalizację z prawem zapisu i spróbuj ponownie.",
    "articleFiles.invalid": "Wybierz poprawny plik .md, .html, .docx lub .rtf. Pliki Markdown i HTML muszą używać UTF-8.",
    "articleFiles.format": "Format pliku",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatRtf": "Tekst sformatowany (.rtf)",
    "articleFiles.review": "Przejrzyj importowany artykuł",
    "articleFiles.layoutWarning": (
        "Akapity, listy i podstawowe formatowanie są zachowywane. Układ stron i tabel jest upraszczany. Obraz" +
        "y, komentarze i osadzone obiekty są pomijane. Przejrzyj przekonwertowany artykuł przed importem."
    ),
    "articleFiles.import": "Importuj",
    "articleFiles.download": "Pobierz",
    "articleFiles.tooLarge": "Plik artykułu przekracza limit 10 MiB. Wybierz mniejszy plik lub skróć artykuł przed zapisaniem.",
} satisfies Partial<Record<MessageId, string>>;
