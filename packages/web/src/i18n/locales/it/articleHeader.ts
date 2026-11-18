import type { MessageId } from "../../messages.js";

export const articleHeader = {
    "articleHeader.title": "Titolo dell'articolo",
    "articleHeader.rename": "Rinomina articolo: {articleTitle}",
    "articleHeader.sourceLanguage": "Lingua di origine",
    "articleHeader.metadata": "Contesto dell'articolo",
    "articleHeader.saveRevision": "Salva versione",
    "articleHeader.focusMode": "Modalità concentrazione",
    "articleHeader.leaveFocusMode": "Esci dalla modalità concentrazione",
    "articleHeader.deleteArticle": "Elimina articolo",
    "articleHeader.deleteConfirmationTitle": "Eliminare l'articolo?",
    "articleHeader.deleteConfirmationDescription": (
        "Eliminare «{articleTitle}» e tutte le sue versioni salvate e bozze recuperabili? L'operazione non è " +
        "annullabile."
    ),
    "articleHeader.deleteGroupConfirmationDescription": (
        "Eliminare {count, plural, one {«{articleTitle}» (1 articolo)} other {«{articleTitle}» e # articoli, " +
        "comprese le traduzioni}}, con tutte le relative bozze e cronologie? L'operazione non è annullabile."
    ),
    "articleHeader.archiveArticle": "Archivia articolo",
    "articleHeader.archived": "Archiviato",
    "articleHeader.unarchiveArticle": "Rimuovi articolo dall'archivio",
    "articleHeader.confirmDeleteArticle": "Elimina articolo",
    "articleHeader.workflow": "Flusso editoriale suggerito",
    "articleHeader.talkingPoints": "Punti chiave",
    "articleHeader.narrative": "Bozza narrativa",
    "articleHeader.authorEdit": "Modifica dell'autore",
    "articleHeader.flow": "Scorrevolezza e chiarezza",
    "articleHeader.facts": "Verifica dei fatti",
    "articleHeader.style": "Revisione dello stile",
    "articleHeader.translate": "Traduzione",
    "articleHeader.copy": "Copia",
    "articleHeader.copied": "Copiato",
    "articleHeader.copyFailed": "Copia non riuscita",
    "articleHeader.copyOptions": "Opzioni di copia",
    "articleHeader.copyMarkdown": "Copia Markdown",
    "articleHeader.copyPlainText": "Copia testo semplice",
} satisfies Partial<Record<MessageId, string>>;
