import type { MessageId } from "../../messages.js";


export const articleMessages = {
    "article.defaultTitle": "Статья без названия",
    "article.titleContextRequired": "Добавьте подробности и сохраните новую версию или назовите статью сами.",
    "article.titleGenerationFailed": "Версия сохранена без названия статьи",
    "article.titleGenerationNextStep": "Назовите статью сами или проверьте модель генерации текста в настройках и сохраните новую версию.",
} satisfies Partial<Record<MessageId, string>>;
