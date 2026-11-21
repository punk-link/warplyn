import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "{count} Zeichen",
    "publishing.charactersOverGuidance": "{count} Zeichen über dem Richtwert",
    "publishing.charactersRemaining": "{count} Zeichen übrig (Richtwert)",
    "publishing.copyFailed": "Kopieren fehlgeschlagen. Versuchen Sie es erneut.",
    "publishing.default": "Standard",
    "publishing.defaultProfile": "Das Standard-Veröffentlichungsprofil wird verwendet.",
    "publishing.linkedInArticle": "LinkedIn-Artikel",
    "publishing.linkedInPost": "LinkedIn-Beitrag",
    "publishing.markdownCopied": "Markdown kopiert.",
    "publishing.noRestrictions": "Keine Einschränkungen",
    "publishing.plainTextCopied": "Klartext kopiert.",
    "publishing.profileSaveFailed": "Das Veröffentlichungsprofil konnte nicht gespeichert werden.",
} satisfies Partial<Record<MessageId, string>>;
