import type { MessageId } from "../../messages.js";


export const ruNotes = {
    "notes.markers": "Редакторские заметки {numbers}",
    "notes.add": "Добавить редакторскую заметку…",
    "notes.title": "Редакторские заметки",
    "notes.count": "Редакторские заметки{separator}{count}",
    "notes.select": "Выделите текст, чтобы прикрепить заметку.",
    "notes.help": "При работе с фрагментами Ассистент учитывает прикреплённые заметки. Они хранятся отдельно от текста статьи.",
    "notes.empty": "Редакторских заметок пока нет.",
    "notes.detached": "Нужно прикрепить заново",
    "notes.edit": "Изменить заметку…",
    "notes.reattach": "Прикрепить к выделенному тексту",
    "notes.reattachHelp": "Выделите новый фрагмент в редакторе, затем снова откройте эту заметку, чтобы прикрепить её.",
    "notes.guidance": "Указания для Ассистента",
    "notes.failed": "Не удалось изменить заметку. Сохраните свои указания, откройте статью заново и повторите попытку.",
    "notes.remove": "Удалить заметку",
    "notes.save": "Сохранить заметку",
    "notes.marker": "Редакторская заметка {number}",
    "notes.included": "Заметки к этому запросу",
} satisfies Partial<Record<MessageId, string>>;
