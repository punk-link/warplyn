import type { MessageId } from "../../messages.js";

export const articleMessages = {
    "article.defaultTitle": "Article sans titre",
    "article.titleGenerationFailed": "Version enregistrée sans titre d’article",
    "article.titleContextRequired": "Ajoutez des détails et enregistrez une autre version, ou renommez vous-même l’article.",
    "article.titleGenerationNextStep": (
        "Renommez vous-même l’article, ou vérifiez le modèle de génération de texte dans les paramètres et " +
        "enregistrez une autre version."
    ),
} satisfies Partial<Record<MessageId, string>>;
