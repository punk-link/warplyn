import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.discardPrompt": "Отменить несохранённые изменения заметки?",
    "notes.discardChanges": "Отменить изменения",
    "notes.add": "Добавить редакторскую заметку…",
    "notes.count": "Редакторские заметки{separator}{count}",
    "notes.detached": "Нужно прикрепить заново",
    "notes.edit": "Изменить заметку…",
    "notes.empty": "Редакторских заметок пока нет.",
    "notes.failed": "Не удалось изменить заметку. Сохраните свои указания, откройте статью заново и повторите попытку.",
    "notes.guidance": "Указания для Ассистента",
    "notes.help": "При работе с фрагментами Ассистент учитывает прикреплённые заметки. Они хранятся отдельно от текста статьи.",
    "notes.included": "Заметки к этому запросу",
    "notes.marker": "Редакторская заметка {number}",
    "notes.markers": "Редакторские заметки {numbers}",
    "notes.reattach": "Прикрепить к выделенному тексту",
    "notes.reattachHelp": "Выделите новый фрагмент в редакторе, затем снова откройте эту заметку, чтобы прикрепить её.",
    "notes.remove": "Удалить заметку",
    "notes.save": "Сохранить заметку",
    "notes.select": "Выделите текст, чтобы прикрепить заметку.",
    "notes.title": "Редакторские заметки",
} satisfies Partial<Record<MessageId, string>>;
