import type { MessageId } from "../../messages.js";

export const translationLanguages = {
    "translationLanguages.search": "Lingua o variante regionale",
    "translationLanguages.placeholder": "Digita un nome o codice di lingua",
    "translationLanguages.entryHint": (
        "Inserisci un nome o una variante regionale, come polacco o spagnolo, Argentina. Puoi usare anche cod" +
        "ici come ja o es-AR."
    ),
    "translationLanguages.hint": "La qualità della traduzione dipende dal modello e dalla lingua di destinazione.",
    "translationLanguages.remove": "Rimuovi {language}",
    "translationLanguages.add": "Aggiungi",
    "translationLanguages.existing": "Traduzione disponibile",
} satisfies Partial<Record<MessageId, string>>;
