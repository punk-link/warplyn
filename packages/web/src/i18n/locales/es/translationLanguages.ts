import type { MessageId } from "../../messages.js";


export const translationLanguagesMessages = {
    "translationLanguages.add": "Añadir",
    "translationLanguages.entryHint": (
        "Introduce un nombre o variante regional, como polaco o español de Argentina. También puedes usar códigos como " +
        "ja o es-AR."
    ),
    "translationLanguages.existing": "Traducción disponible",
    "translationLanguages.hint": "La calidad de la traducción depende del modelo y del idioma de destino.",
    "translationLanguages.placeholder": "Escribe el nombre o código de un idioma",
    "translationLanguages.remove": "Quitar {language}",
    "translationLanguages.search": "Idioma o variante regional",
} satisfies Partial<Record<MessageId, string>>;
