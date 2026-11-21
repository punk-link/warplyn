import type { MessageId } from "../../messages.js";


export const articleHeaderMessages = {
    "articleHeader.archiveArticle": "Archivia articolo",
    "articleHeader.archived": "Archiviato",
    "articleHeader.authorEdit": "Modifica dell'autore",
    "articleHeader.confirmDeleteArticle": "Elimina articolo",
    "articleHeader.copied": "Copiato",
    "articleHeader.copy": "Copia",
    "articleHeader.copyFailed": "Copia non riuscita",
    "articleHeader.copyMarkdown": "Copia Markdown",
    "articleHeader.copyOptions": "Opzioni di copia",
    "articleHeader.copyPlainText": "Copia testo semplice",
    "articleHeader.deleteArticle": "Elimina articolo",
    "articleHeader.deleteConfirmationDescription": (
        "Eliminare «{articleTitle}» e tutte le sue versioni salvate e bozze recuperabili? L'operazione non è annullabil" +
        "e."
    ),
    "articleHeader.deleteConfirmationTitle": "Eliminare l'articolo?",
    "articleHeader.deleteGroupConfirmationDescription": (
        "Eliminare {count, plural, one {«{articleTitle}» (1 articolo)} other {«{articleTitle}» e # articoli, " +
        "comprese le traduzioni}}, con tutte le relative bozze e cronologie? L'operazione non è annullabile."
    ),
    "articleHeader.facts": "Verifica dei fatti",
    "articleHeader.flow": "Scorrevolezza e chiarezza",
    "articleHeader.focusMode": "Modalità concentrazione",
    "articleHeader.leaveFocusMode": "Esci dalla modalità concentrazione",
    "articleHeader.metadata": "Contesto dell'articolo",
    "articleHeader.narrative": "Bozza narrativa",
    "articleHeader.rename": "Rinomina articolo: {articleTitle}",
    "articleHeader.saveRevision": "Salva versione",
    "articleHeader.sourceLanguage": "Lingua di origine",
    "articleHeader.style": "Revisione dello stile",
    "articleHeader.talkingPoints": "Punti chiave",
    "articleHeader.title": "Titolo dell'articolo",
    "articleHeader.translate": "Traduzione",
    "articleHeader.unarchiveArticle": "Rimuovi articolo dall'archivio",
    "articleHeader.workflow": "Flusso editoriale suggerito",
} satisfies Partial<Record<MessageId, string>>;
