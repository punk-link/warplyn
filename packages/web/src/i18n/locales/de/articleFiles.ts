import type { MessageId } from "../../messages.js";

export const articleFilesMessages = {
    "articleFiles.save": "In Datei speichern",
    "articleFiles.load": "Aus Datei laden",
    "articleFiles.menuSave": "In Datei speichern…",
    "articleFiles.menuLoad": "Aus Datei laden…",
    "articleFiles.saved": "Artikel in Datei gespeichert",
    "articleFiles.downloadStarted": "Download des Artikels gestartet",
    "articleFiles.loaded": "Artikel aus Datei geladen",
    "articleFiles.loadFailed": (
        "Der Artikel konnte nicht geladen werden. Wählen Sie eine lesbare Markdown-, HTML-, DOCX- oder " +
        "RTF-Datei und versuchen Sie es erneut."
    ),
    "articleFiles.saveFailed": (
        "Der Artikel konnte nicht in einer Datei gespeichert werden. Wählen Sie einen beschreibbaren " +
        "Speicherort und versuchen Sie es erneut."
    ),
    "articleFiles.invalid": "Wählen Sie eine gültige .md-, .html-, .docx- oder .rtf-Datei. Markdown- und HTML-Dateien müssen UTF-8 verwenden.",
    "articleFiles.format": "Dateiformat",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatRtf": "Rich Text (.rtf)",
    "articleFiles.review": "Importierten Artikel prüfen",
    "articleFiles.layoutWarning": (
        "Absätze, Listen und grundlegende Formatierungen bleiben erhalten. Seiten- und Tabellenlayouts werden " +
        "vereinfacht. Bilder, Kommentare und eingebettete Objekte werden ausgelassen. Prüfen Sie den " +
        "konvertierten Artikel vor dem Import."
    ),
    "articleFiles.import": "Importieren",
    "articleFiles.download": "Herunterladen",
    "articleFiles.tooLarge": (
        "Diese Artikeldatei überschreitet die Grenze von 10 MiB. Wählen Sie eine kleinere Datei oder kürzen " +
        "Sie den Artikel vor dem Speichern."
    ),
} satisfies Partial<Record<MessageId, string>>;
