import type { MessageId } from "../../messages.js";


export const articleFilesMessages = {
    "articleFiles.download": "Scarica",
    "articleFiles.downloadStarted": "Download dell'articolo avviato",
    "articleFiles.format": "Formato del file",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatRtf": "Testo formattato (.rtf)",
    "articleFiles.import": "Importa",
    "articleFiles.invalid": "Scegli un file .md, .html, .docx o .rtf valido. I file Markdown e HTML devono usare UTF-8.",
    "articleFiles.layoutWarning": (
        "Paragrafi, elenchi e formattazione di base sono conservati. I layout di pagine e tabelle sono sempli" +
        "ficati. Immagini, commenti e oggetti incorporati sono omessi. Rivedi l'articolo convertito prima di " +
        "importarlo."
    ),
    "articleFiles.load": "Carica da file",
    "articleFiles.loadFailed": "Impossibile caricare l'articolo. Scegli un file Markdown, HTML, DOCX o RTF leggibile e riprova.",
    "articleFiles.loaded": "Articolo caricato da file",
    "articleFiles.menuLoad": "Carica da file…",
    "articleFiles.menuSave": "Salva su file…",
    "articleFiles.review": "Rivedi l'articolo importato",
    "articleFiles.save": "Salva su file",
    "articleFiles.saveFailed": "Impossibile salvare l'articolo su file. Scegli una posizione scrivibile e riprova.",
    "articleFiles.saved": "Articolo salvato su file",
    "articleFiles.tooLarge": "Questo file supera il limite di 10 MiB. Scegli un file più piccolo o accorcia l'articolo prima di salvare.",
} satisfies Partial<Record<MessageId, string>>;
