import type { MessageId } from "../../messages.js";


export const articleFilesMessages = {
    "articleFiles.download": "Herunterladen",
    "articleFiles.downloadStarted": "Download des Artikels gestartet",
    "articleFiles.format": "Dateiformat",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatRtf": "Rich Text (.rtf)",
    "articleFiles.import": "Importieren",
    "articleFiles.invalid": "Wählen Sie eine gültige .md-, .html-, .docx- oder .rtf-Datei. Markdown- und HTML-Dateien müssen UTF-8 verwenden.",
    "articleFiles.layoutWarning": (
        "Absätze, Listen und grundlegende Formatierungen bleiben erhalten. Seiten- und Tabellenlayouts werden" +
        " vereinfacht. Bilder, Kommentare und eingebettete Objekte werden ausgelassen. Prüfen Sie den konvert" +
        "ierten Artikel vor dem Import."
    ),
    "articleFiles.load": "Aus Datei laden",
    "articleFiles.loadFailed": (
        "Der Artikel konnte nicht geladen werden. Wählen Sie eine lesbare Markdown-, HTML-, DOCX- oder RTF-Datei und ve" +
        "rsuchen Sie es erneut."
    ),
    "articleFiles.loaded": "Artikel aus Datei geladen",
    "articleFiles.menuLoad": "Aus Datei laden…",
    "articleFiles.menuSave": "In Datei speichern…",
    "articleFiles.review": "Importierten Artikel prüfen",
    "articleFiles.save": "In Datei speichern",
    "articleFiles.saveFailed": (
        "Der Artikel konnte nicht in einer Datei gespeichert werden. Wählen Sie einen beschreibbaren Speicherort und ve" +
        "rsuchen Sie es erneut."
    ),
    "articleFiles.saved": "Artikel in Datei gespeichert",
    "articleFiles.tooLarge": (
        "Diese Artikeldatei überschreitet die Grenze von 10 MiB. Wählen Sie eine kleinere Datei oder kürzen Sie den Art" +
        "ikel vor dem Speichern."
    ),
} satisfies Partial<Record<MessageId, string>>;
