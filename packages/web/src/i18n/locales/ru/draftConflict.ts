import type { MessageId } from "../../messages.js";


export const draftConflictMessages = {
    "draftConflict.banner": "Статья изменена в другом сеансе Warplyn. Локальный черновик сохранён; сравните его с новой версией, прежде чем продолжать.",
    "draftConflict.cancel": "Отмена",
    "draftConflict.compare": "Сравнить и разрешить конфликт",
    "draftConflict.confirmDraft": "Заменить оставленный локальный текст последним сохранённым черновиком?",
    "draftConflict.confirmRevision": "Удалить сохранённый черновик и заменить оставленный локальный текст последней сохранённой версией?",
    "draftConflict.description": "Сохранённый локальный черновик показан рядом с последним сохранённым текстом. Ничего не заменится без вашего выбора.",
    "draftConflict.heading": "Разрешить конфликт черновика",
    "draftConflict.keepMine": "Оставить мой черновик",
    "draftConflict.useDraft": "Использовать последний черновик",
    "draftConflict.useRevision": "Использовать последнюю сохранённую версию",
} satisfies Partial<Record<MessageId, string>>;
