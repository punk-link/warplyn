import type { MessageId } from "../../messages.js";

export const publishing = {
    "publishing.defaultProfile": "Uso del profilo di pubblicazione predefinito.",
    "publishing.charactersRemaining": "{count} caratteri rimanenti (indicazione)",
    "publishing.charactersOverGuidance": "{count} caratteri oltre l'indicazione",
    "publishing.markdownCopied": "Markdown copiato.",
    "publishing.plainTextCopied": "Testo semplice copiato.",
    "publishing.copyFailed": "Copia non riuscita. Riprova.",
    "publishing.profileSaveFailed": "Impossibile salvare il profilo di pubblicazione.",
    "publishing.default": "Predefinito",
    "publishing.linkedInPost": "Post LinkedIn",
    "publishing.linkedInArticle": "Articolo LinkedIn",
    "publishing.noRestrictions": "Nessuna restrizione",
    "publishing.characterCount": "{count} caratteri",
} satisfies Partial<Record<MessageId, string>>;
