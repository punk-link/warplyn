import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "{count} characters",
    "publishing.charactersOverGuidance": "{count} characters over guidance",
    "publishing.charactersRemaining": "{count} characters remaining (guidance)",
    "publishing.copyFailed": "Copy failed. Try again.",
    "publishing.default": "Default",
    "publishing.defaultProfile": "Using the default publishing profile.",
    "publishing.linkedInArticle": "LinkedIn article",
    "publishing.linkedInPost": "LinkedIn post",
    "publishing.markdownCopied": "Markdown copied.",
    "publishing.noRestrictions": "No restrictions",
    "publishing.plainTextCopied": "Plain text copied.",
    "publishing.profileSaveFailed": "Couldn’t save the publishing profile.",
} satisfies Partial<Record<MessageId, string>>;
