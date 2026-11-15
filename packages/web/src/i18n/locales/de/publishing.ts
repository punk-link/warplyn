import type { MessageId } from "../../messages.js";

export const publishingMessages = {
    "publishing.defaultProfile": "Das Standard-Veröffentlichungsprofil wird verwendet.",
    "publishing.charactersRemaining": "{count} Zeichen übrig (Richtwert)",
    "publishing.charactersOverGuidance": "{count} Zeichen über dem Richtwert",
    "publishing.markdownCopied": "Markdown kopiert.",
    "publishing.plainTextCopied": "Klartext kopiert.",
    "publishing.copyFailed": "Kopieren fehlgeschlagen. Versuchen Sie es erneut.",
    "publishing.profileSaveFailed": "Das Veröffentlichungsprofil konnte nicht gespeichert werden.",
    "publishing.default": "Standard",
    "publishing.linkedInPost": "LinkedIn-Beitrag",
    "publishing.linkedInArticle": "LinkedIn-Artikel",
    "publishing.noRestrictions": "Keine Einschränkungen",
    "publishing.characterCount": "{count} Zeichen",
} satisfies Partial<Record<MessageId, string>>;
