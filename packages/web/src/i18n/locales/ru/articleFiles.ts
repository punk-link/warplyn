import type { MessageId } from "../../messages.js";


export const articleFilesMessages = {
    "articleFiles.download": "Скачать",
    "articleFiles.downloadStarted": "Скачивание статьи началось",
    "articleFiles.format": "Формат файла",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatRtf": "Форматированный текст (.rtf)",
    "articleFiles.import": "Импортировать",
    "articleFiles.invalid": "Выберите корректный файл .md, .html, .docx или .rtf. Файлы Markdown и HTML должны быть в кодировке UTF-8.",
    "articleFiles.layoutWarning": (
        "Абзацы, списки и базовое форматирование сохраняются. Макеты страниц и таблиц упрощаются. Изображения" +
        ", комментарии и встроенные объекты пропускаются. Проверьте преобразованную статью перед импортом."
    ),
    "articleFiles.load": "Загрузить из файла",
    "articleFiles.loadFailed": "Не удалось загрузить статью. Выберите доступный для чтения файл Markdown, HTML, DOCX или RTF и повторите попытку.",
    "articleFiles.loaded": "Статья загружена из файла",
    "articleFiles.menuLoad": "Загрузить из файла…",
    "articleFiles.menuSave": "Сохранить в файл…",
    "articleFiles.review": "Проверить импортируемую статью",
    "articleFiles.save": "Сохранить в файл",
    "articleFiles.saveFailed": "Не удалось сохранить статью в файл. Выберите папку с разрешением на запись и повторите попытку.",
    "articleFiles.saved": "Статья сохранена в файл",
    "articleFiles.tooLarge": "Размер файла статьи превышает 10 МиБ. Выберите файл меньшего размера или сократите статью перед сохранением.",
} satisfies Partial<Record<MessageId, string>>;
