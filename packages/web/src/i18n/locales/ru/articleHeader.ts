import type { MessageId } from "../../messages.js";


export const articleHeaderMessages = {
    "articleHeader.archiveArticle": "Отправить статью в архив",
    "articleHeader.archived": "В архиве",
    "articleHeader.authorEdit": "Авторская правка",
    "articleHeader.confirmDeleteArticle": "Удалить статью",
    "articleHeader.copied": "Скопировано",
    "articleHeader.copy": "Копировать",
    "articleHeader.copyFailed": "Не удалось скопировать",
    "articleHeader.copyMarkdown": "Копировать Markdown",
    "articleHeader.copyOptions": "Параметры копирования",
    "articleHeader.copyPlainText": "Копировать обычный текст",
    "articleHeader.deleteArticle": "Удалить статью",
    "articleHeader.deleteConfirmationDescription": (
        "Удалить «{articleTitle}», все её сохранённые версии и восстанавливаемые черновики? Это действие нельзя отменит" +
        "ь."
    ),
    "articleHeader.deleteConfirmationTitle": "Удалить статью?",
    "articleHeader.deleteGroupConfirmationDescription": (
        "Удалить {count, plural, one {«{articleTitle}» (1 статью)} other {«{articleTitle}» и статьи с перевод" +
        "ами, всего #}}, включая связанные черновики и историю версий? Это действие нельзя отменить."
    ),
    "articleHeader.facts": "Проверка фактов",
    "articleHeader.flow": "Связность и ясность",
    "articleHeader.focusMode": "Режим концентрации",
    "articleHeader.leaveFocusMode": "Выйти из режима концентрации",
    "articleHeader.metadata": "Контекст статьи",
    "articleHeader.narrative": "Черновик текста",
    "articleHeader.rename": "Переименовать статью: {articleTitle}",
    "articleHeader.saveRevision": "Сохранить версию",
    "articleHeader.sourceLanguage": "Исходный язык",
    "articleHeader.style": "Проверка стиля",
    "articleHeader.talkingPoints": "Тезисы",
    "articleHeader.title": "Название статьи",
    "articleHeader.translate": "Перевод",
    "articleHeader.unarchiveArticle": "Извлечь статью из архива",
    "articleHeader.workflow": "Рекомендуемый порядок редакторской работы",
} satisfies Partial<Record<MessageId, string>>;
