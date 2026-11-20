import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "{count} caracteres",
    "publishing.charactersOverGuidance": "{count} caracteres por encima del límite orientativo",
    "publishing.charactersRemaining": "Quedan {count} caracteres (orientativo)",
    "publishing.copyFailed": "No se pudo copiar. Inténtalo de nuevo.",
    "publishing.default": "Predeterminado",
    "publishing.defaultProfile": "Se usa el perfil de publicación predeterminado.",
    "publishing.linkedInArticle": "Artículo de LinkedIn",
    "publishing.linkedInPost": "Publicación de LinkedIn",
    "publishing.markdownCopied": "Markdown copiado.",
    "publishing.noRestrictions": "Sin restricciones",
    "publishing.plainTextCopied": "Texto sin formato copiado.",
    "publishing.profileSaveFailed": "No se pudo guardar el perfil de publicación.",
} satisfies Partial<Record<MessageId, string>>;
