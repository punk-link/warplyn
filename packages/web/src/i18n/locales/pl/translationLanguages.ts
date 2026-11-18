import type { MessageId } from "../../messages.js";

export const translationLanguages = {
    "translationLanguages.search": "Język lub odmiana regionalna",
    "translationLanguages.placeholder": "Wpisz nazwę lub kod języka",
    "translationLanguages.entryHint": (
        "Wpisz nazwę lub odmianę regionalną, np. polski lub hiszpański, Argentyna. Możesz też użyć kodów, tak" +
        "ich jak ja lub es-AR."
    ),
    "translationLanguages.hint": "Jakość tłumaczenia zależy od modelu i języka docelowego.",
    "translationLanguages.remove": "Usuń {language}",
    "translationLanguages.add": "Dodaj",
    "translationLanguages.existing": "Tłumaczenie dostępne",
} satisfies Partial<Record<MessageId, string>>;
