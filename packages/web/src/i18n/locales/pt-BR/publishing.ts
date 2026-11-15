import type { MessageId } from "../../messages.js";

export const publishingMessages = {
    "publishing.defaultProfile": "Usando o perfil de publicação padrão.",
    "publishing.charactersRemaining": "{count} caracteres restantes (orientação)",
    "publishing.charactersOverGuidance": "{count} caracteres acima da recomendação",
    "publishing.markdownCopied": "Markdown copiado.",
    "publishing.plainTextCopied": "Texto simples copiado.",
    "publishing.copyFailed": "Falha na cópia. Tente novamente.",
    "publishing.profileSaveFailed": "Não foi possível salvar o perfil de publicação.",
    "publishing.default": "Padrão",
    "publishing.linkedInPost": "Postagem no LinkedIn",
    "publishing.linkedInArticle": "Artigo do LinkedIn",
    "publishing.noRestrictions": "Sem restrições",
    "publishing.characterCount": "{count} caracteres",
} satisfies Partial<Record<MessageId, string>>;
