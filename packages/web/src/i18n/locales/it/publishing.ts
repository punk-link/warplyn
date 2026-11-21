import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "{count} caratteri",
    "publishing.charactersOverGuidance": "{count} caratteri oltre l'indicazione",
    "publishing.charactersRemaining": "{count} caratteri rimanenti (indicazione)",
    "publishing.copyFailed": "Copia non riuscita. Riprova.",
    "publishing.default": "Predefinito",
    "publishing.defaultProfile": "Uso del profilo di pubblicazione predefinito.",
    "publishing.linkedInArticle": "Articolo LinkedIn",
    "publishing.linkedInPost": "Post LinkedIn",
    "publishing.markdownCopied": "Markdown copiato.",
    "publishing.noRestrictions": "Nessuna restrizione",
    "publishing.plainTextCopied": "Testo semplice copiato.",
    "publishing.profileSaveFailed": "Impossibile salvare il profilo di pubblicazione.",
} satisfies Partial<Record<MessageId, string>>;
