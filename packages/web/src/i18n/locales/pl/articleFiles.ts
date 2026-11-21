import type { MessageId } from "../../messages.js";


export const articleFilesMessages = {
    "articleFiles.download": "Pobierz",
    "articleFiles.downloadStarted": "Rozpoczęto pobieranie artykułu",
    "articleFiles.format": "Format pliku",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatRtf": "Tekst sformatowany (.rtf)",
    "articleFiles.import": "Importuj",
    "articleFiles.invalid": "Wybierz poprawny plik .md, .html, .docx lub .rtf. Pliki Markdown i HTML muszą używać UTF-8.",
    "articleFiles.layoutWarning": (
        "Akapity, listy i podstawowe formatowanie są zachowywane. Układ stron i tabel jest upraszczany. Obraz" +
        "y, komentarze i osadzone obiekty są pomijane. Przejrzyj przekonwertowany artykuł przed importem."
    ),
    "articleFiles.load": "Wczytaj z pliku",
    "articleFiles.loadFailed": "Nie udało się wczytać artykułu. Wybierz czytelny plik Markdown, HTML, DOCX lub RTF i spróbuj ponownie.",
    "articleFiles.loaded": "Wczytano artykuł z pliku",
    "articleFiles.menuLoad": "Wczytaj z pliku…",
    "articleFiles.menuSave": "Zapisz do pliku…",
    "articleFiles.review": "Przejrzyj importowany artykuł",
    "articleFiles.save": "Zapisz do pliku",
    "articleFiles.saveFailed": "Nie udało się zapisać artykułu do pliku. Wybierz lokalizację z prawem zapisu i spróbuj ponownie.",
    "articleFiles.saved": "Artykuł zapisano do pliku",
    "articleFiles.tooLarge": "Plik artykułu przekracza limit 10 MiB. Wybierz mniejszy plik lub skróć artykuł przed zapisaniem.",
} satisfies Partial<Record<MessageId, string>>;
