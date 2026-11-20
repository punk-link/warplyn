import type { MessageId } from "../../messages.js";


export const translationLanguagesMessages = {
    "translationLanguages.add": "Aggiungi",
    "translationLanguages.entryHint": (
        "Inserisci un nome o una variante regionale, come polacco o spagnolo, Argentina. Puoi usare anche codici come j" +
        "a o es-AR."
    ),
    "translationLanguages.existing": "Traduzione disponibile",
    "translationLanguages.hint": "La qualità della traduzione dipende dal modello e dalla lingua di destinazione.",
    "translationLanguages.placeholder": "Digita un nome o codice di lingua",
    "translationLanguages.remove": "Rimuovi {language}",
    "translationLanguages.search": "Lingua o variante regionale",
} satisfies Partial<Record<MessageId, string>>;
