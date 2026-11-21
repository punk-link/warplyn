import type { MessageId } from "../../messages.js";


export const articleMessages = {
    "article.defaultTitle": "Untitled article",
    "article.titleContextRequired": "Add more detail and save another Revision, or rename the Article yourself.",
    "article.titleGenerationFailed": "Revision saved without an Article title",
    "article.titleGenerationNextStep": "Rename the Article yourself, or check the Text Generation Model in Settings and save another Revision.",
} satisfies Partial<Record<MessageId, string>>;
