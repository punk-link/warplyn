import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "{count} caractères",
    "publishing.charactersOverGuidance": "{count} caractères au-delà de la limite indicative",
    "publishing.charactersRemaining": "{count} caractères restants, à titre indicatif",
    "publishing.copyFailed": "Échec de la copie. Réessayez.",
    "publishing.default": "Par défaut",
    "publishing.defaultProfile": "Le profil de publication par défaut est utilisé.",
    "publishing.linkedInArticle": "Article LinkedIn",
    "publishing.linkedInPost": "Publication LinkedIn",
    "publishing.markdownCopied": "Markdown copié.",
    "publishing.noRestrictions": "Aucune restriction",
    "publishing.plainTextCopied": "Texte brut copié.",
    "publishing.profileSaveFailed": "Impossible d’enregistrer le profil de publication.",
} satisfies Partial<Record<MessageId, string>>;
