import type { MessageId } from "../../messages.js";


export const translationLanguagesMessages = {
    "translationLanguages.add": "Добавить",
    "translationLanguages.entryHint": (
        "Введите название языка или регионального варианта, например польский или испанский, Аргентина. Коды ja и es-AR" +
        " тоже подходят."
    ),
    "translationLanguages.existing": "Перевод доступен",
    "translationLanguages.hint": "Качество перевода зависит от модели и выбранного языка.",
    "translationLanguages.placeholder": "Введите название или код языка",
    "translationLanguages.remove": "Удалить {language}",
    "translationLanguages.search": "Язык или региональный вариант",
} satisfies Partial<Record<MessageId, string>>;
