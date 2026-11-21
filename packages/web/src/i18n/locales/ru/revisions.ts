import type { MessageId } from "../../messages.js";


export const revisionsMessages = {
    "revisions.acceptedProposal": "Принятое предложение",
    "revisions.articleContent": "Сохранённый текст статьи",
    "revisions.assistantEdit": "Правка помощника",
    "revisions.author": "Авторская версия",
    "revisions.characterCount": "Символов: {count}",
    "revisions.count": (
        "{count, plural, =0 {Нет сохранённых версий} one {# сохранённая версия} few {# сохранённые версии} many {# сохр" +
        "анённых версий} other {# сохранённой версии}}"
    ),
    "revisions.current": "Текущая",
    "revisions.currentExplanation": "Это текущая сохранённая версия.",
    "revisions.currentRevision": "Текущая сохранённая версия",
    "revisions.empty": "Пустая версия",
    "revisions.emptyContent": "В этой версии нет сохранённого текста статьи.",
    "revisions.heading": "История версий",
    "revisions.historyNavigation": "История версий",
    "revisions.inactive": "Неактивна",
    "revisions.initial": "Начальная версия",
    "revisions.restore": "Восстановить эту версию",
    "revisions.restored": "Восстановленная версия",
    "revisions.restoredFromEarlier": "Восстановлено из предыдущей версии",
    "revisions.restoredTarget": "Восстановлена версия №{number}",
    "revisions.restoredTargetDescribed": "Восстановлена версия №{number}: {description}",
    "revisions.revision": "Сохранённая версия",
    "revisions.saved": "Сохранённая версия",
    "revisions.select": "Выберите сохранённую версию",
} satisfies Partial<Record<MessageId, string>>;
