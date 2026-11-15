import type { MessageId } from "../../messages.js";

export const publishing = {
    "publishing.defaultProfile": "Se usa el perfil de publicación predeterminado.",
    "publishing.charactersRemaining": "Quedan {count} caracteres (orientativo)",
    "publishing.charactersOverGuidance": "{count} caracteres por encima del límite orientativo",
    "publishing.markdownCopied": "Markdown copiado.",
    "publishing.plainTextCopied": "Texto sin formato copiado.",
    "publishing.copyFailed": "No se pudo copiar. Inténtalo de nuevo.",
    "publishing.profileSaveFailed": "No se pudo guardar el perfil de publicación.",
    "publishing.default": "Predeterminado",
    "publishing.linkedInPost": "Publicación de LinkedIn",
    "publishing.linkedInArticle": "Artículo de LinkedIn",
    "publishing.noRestrictions": "Sin restricciones",
    "publishing.characterCount": "{count} caracteres",
} satisfies Partial<Record<MessageId, string>>;
