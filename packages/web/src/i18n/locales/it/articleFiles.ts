import type { MessageId } from "../../messages.js";

export const articleFiles = {
    "articleFiles.save": "Salva su file",
    "articleFiles.load": "Carica da file",
    "articleFiles.menuSave": "Salva su file…",
    "articleFiles.menuLoad": "Carica da file…",
    "articleFiles.saved": "Articolo salvato su file",
    "articleFiles.downloadStarted": "Download dell'articolo avviato",
    "articleFiles.loaded": "Articolo caricato da file",
    "articleFiles.loadFailed": "Impossibile caricare l'articolo. Scegli un file Markdown, HTML, DOCX o RTF leggibile e riprova.",
    "articleFiles.saveFailed": "Impossibile salvare l'articolo su file. Scegli una posizione scrivibile e riprova.",
    "articleFiles.invalid": "Scegli un file .md, .html, .docx o .rtf valido. I file Markdown e HTML devono usare UTF-8.",
    "articleFiles.format": "Formato del file",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatRtf": "Testo formattato (.rtf)",
    "articleFiles.review": "Rivedi l'articolo importato",
    "articleFiles.layoutWarning": (
        "Paragrafi, elenchi e formattazione di base sono conservati. I layout di pagine e tabelle sono sempli" +
        "ficati. Immagini, commenti e oggetti incorporati sono omessi. Rivedi l'articolo convertito prima di " +
        "importarlo."
    ),
    "articleFiles.import": "Importa",
    "articleFiles.download": "Scarica",
    "articleFiles.tooLarge": "Questo file supera il limite di 10 MiB. Scegli un file più piccolo o accorcia l'articolo prima di salvare.",
} satisfies Partial<Record<MessageId, string>>;
