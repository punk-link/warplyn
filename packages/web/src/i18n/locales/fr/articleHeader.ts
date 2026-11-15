import type { MessageId } from "../../messages.js";

export const articleHeaderMessages = {
    "articleHeader.title": "Titre de l’article",
    "articleHeader.rename": "Renommer l’article : {articleTitle}",
    "articleHeader.sourceLanguage": "Langue source",
    "articleHeader.metadata": "Contexte de l’article",
    "articleHeader.saveRevision": "Enregistrer une version",
    "articleHeader.focusMode": "Mode concentration",
    "articleHeader.leaveFocusMode": "Quitter le mode concentration",
    "articleHeader.deleteArticle": "Supprimer l’article",
    "articleHeader.deleteConfirmationTitle": "Supprimer l’article ?",
    "articleHeader.deleteConfirmationDescription": (
        "Supprimer « {articleTitle} » ainsi que toutes ses versions enregistrées et tous ses brouillons " +
        "récupérables ? Cette action est irréversible."
    ),
    "articleHeader.deleteGroupConfirmationDescription": (
        "Supprimer {count, plural, one {« {articleTitle} » (1 article)} other {« {articleTitle} » et # " +
        "articles, traductions comprises}}, avec tous les brouillons concernés et l’historique des versions " +
        "enregistrées ? Cette action est irréversible."
    ),
    "articleHeader.archiveArticle": "Archiver l’article",
    "articleHeader.archived": "Archivé",
    "articleHeader.unarchiveArticle": "Désarchiver l’article",
    "articleHeader.confirmDeleteArticle": "Supprimer l’article",
    "articleHeader.workflow": "Parcours éditorial suggéré",
    "articleHeader.talkingPoints": "Idées principales",
    "articleHeader.narrative": "Brouillon rédigé",
    "articleHeader.authorEdit": "Retouches de l’auteur",
    "articleHeader.flow": "Fluidité et clarté",
    "articleHeader.facts": "Vérification des faits",
    "articleHeader.style": "Révision du style",
    "articleHeader.translate": "Traduction",
    "articleHeader.copy": "Copier",
    "articleHeader.copied": "Copié",
    "articleHeader.copyFailed": "Échec de la copie",
    "articleHeader.copyOptions": "Options de copie",
    "articleHeader.copyMarkdown": "Copier en Markdown",
    "articleHeader.copyPlainText": "Copier en texte brut",
} satisfies Partial<Record<MessageId, string>>;
