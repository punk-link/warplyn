import type { MessageId } from "../../messages.js";

export const translationLanguages = {
    "translationLanguages.search": "Idioma o variante regional",
    "translationLanguages.placeholder": "Escribe el nombre o código de un idioma",
    "translationLanguages.entryHint": (
        "Introduce un nombre o variante regional, como polaco o español de Argentina. También puedes usar " +
        "códigos como ja o es-AR."
    ),
    "translationLanguages.hint": "La calidad de la traducción depende del modelo y del idioma de destino.",
    "translationLanguages.remove": "Quitar {language}",
    "translationLanguages.add": "Añadir",
    "translationLanguages.existing": "Traducción disponible",
} satisfies Partial<Record<MessageId, string>>;
