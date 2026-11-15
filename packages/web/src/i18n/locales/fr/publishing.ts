import type { MessageId } from "../../messages.js";

export const publishingMessages = {
    "publishing.defaultProfile": "Le profil de publication par défaut est utilisé.",
    "publishing.charactersRemaining": "{count} caractères restants, à titre indicatif",
    "publishing.charactersOverGuidance": "{count} caractères au-delà de la limite indicative",
    "publishing.markdownCopied": "Markdown copié.",
    "publishing.plainTextCopied": "Texte brut copié.",
    "publishing.copyFailed": "Échec de la copie. Réessayez.",
    "publishing.profileSaveFailed": "Impossible d’enregistrer le profil de publication.",
    "publishing.default": "Par défaut",
    "publishing.linkedInPost": "Publication LinkedIn",
    "publishing.linkedInArticle": "Article LinkedIn",
    "publishing.noRestrictions": "Aucune restriction",
    "publishing.characterCount": "{count} caractères",
} satisfies Partial<Record<MessageId, string>>;
