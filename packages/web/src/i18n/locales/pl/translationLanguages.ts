import type { MessageId } from "../../messages.js";


export const translationLanguagesMessages = {
    "translationLanguages.add": "Dodaj",
    "translationLanguages.entryHint": (
        "Wpisz nazwę lub odmianę regionalną, np. polski lub hiszpański, Argentyna. Możesz też użyć kodów, takich jak ja" +
        " lub es-AR."
    ),
    "translationLanguages.existing": "Tłumaczenie dostępne",
    "translationLanguages.hint": "Jakość tłumaczenia zależy od modelu i języka docelowego.",
    "translationLanguages.placeholder": "Wpisz nazwę lub kod języka",
    "translationLanguages.remove": "Usuń {language}",
    "translationLanguages.search": "Język lub odmiana regionalna",
} satisfies Partial<Record<MessageId, string>>;
