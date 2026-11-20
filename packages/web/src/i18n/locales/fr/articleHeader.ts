import type { MessageId } from "../../messages.js";


export const articleHeaderMessages = {
    "articleHeader.archiveArticle": "Archiver l’article",
    "articleHeader.archived": "Archivé",
    "articleHeader.authorEdit": "Retouches de l’auteur",
    "articleHeader.confirmDeleteArticle": "Supprimer l’article",
    "articleHeader.copied": "Copié",
    "articleHeader.copy": "Copier",
    "articleHeader.copyFailed": "Échec de la copie",
    "articleHeader.copyMarkdown": "Copier en Markdown",
    "articleHeader.copyOptions": "Options de copie",
    "articleHeader.copyPlainText": "Copier en texte brut",
    "articleHeader.deleteArticle": "Supprimer l’article",
    "articleHeader.deleteConfirmationDescription": (
        "Supprimer « {articleTitle} » ainsi que toutes ses versions enregistrées et tous ses brouillons récupérables ? " +
        "Cette action est irréversible."
    ),
    "articleHeader.deleteConfirmationTitle": "Supprimer l’article ?",
    "articleHeader.deleteGroupConfirmationDescription": (
        "Supprimer {count, plural, one {« {articleTitle} » (1 article)} other {« {articleTitle} » et # articl" +
        "es, traductions comprises}}, avec tous les brouillons concernés et l’historique des versions enregis" +
        "trées ? Cette action est irréversible."
    ),
    "articleHeader.facts": "Vérification des faits",
    "articleHeader.flow": "Fluidité et clarté",
    "articleHeader.focusMode": "Mode concentration",
    "articleHeader.leaveFocusMode": "Quitter le mode concentration",
    "articleHeader.metadata": "Contexte de l’article",
    "articleHeader.narrative": "Brouillon rédigé",
    "articleHeader.rename": "Renommer l’article : {articleTitle}",
    "articleHeader.saveRevision": "Enregistrer une version",
    "articleHeader.sourceLanguage": "Langue source",
    "articleHeader.style": "Révision du style",
    "articleHeader.talkingPoints": "Idées principales",
    "articleHeader.title": "Titre de l’article",
    "articleHeader.translate": "Traduction",
    "articleHeader.unarchiveArticle": "Désarchiver l’article",
    "articleHeader.workflow": "Parcours éditorial suggéré",
} satisfies Partial<Record<MessageId, string>>;
