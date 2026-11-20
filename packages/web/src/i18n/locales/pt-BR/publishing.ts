import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "{count} caracteres",
    "publishing.charactersOverGuidance": "{count} caracteres acima da recomendação",
    "publishing.charactersRemaining": "{count} caracteres restantes (orientação)",
    "publishing.copyFailed": "Falha na cópia. Tente novamente.",
    "publishing.default": "Padrão",
    "publishing.defaultProfile": "Usando o perfil de publicação padrão.",
    "publishing.linkedInArticle": "Artigo do LinkedIn",
    "publishing.linkedInPost": "Postagem no LinkedIn",
    "publishing.markdownCopied": "Markdown copiado.",
    "publishing.noRestrictions": "Sem restrições",
    "publishing.plainTextCopied": "Texto simples copiado.",
    "publishing.profileSaveFailed": "Não foi possível salvar o perfil de publicação.",
} satisfies Partial<Record<MessageId, string>>;
