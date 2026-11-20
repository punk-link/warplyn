import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "Символов: {count}",
    "publishing.charactersOverGuidance": "Превышение рекомендации в символах: {count}",
    "publishing.charactersRemaining": "Осталось символов: {count} (рекомендация)",
    "publishing.copyFailed": "Не удалось скопировать. Повторите попытку.",
    "publishing.default": "По умолчанию",
    "publishing.defaultProfile": "Используется профиль публикации по умолчанию.",
    "publishing.linkedInArticle": "Статья LinkedIn",
    "publishing.linkedInPost": "Пост LinkedIn",
    "publishing.markdownCopied": "Markdown скопирован.",
    "publishing.noRestrictions": "Без ограничений",
    "publishing.plainTextCopied": "Обычный текст скопирован.",
    "publishing.profileSaveFailed": "Не удалось сохранить профиль публикации.",
} satisfies Partial<Record<MessageId, string>>;
