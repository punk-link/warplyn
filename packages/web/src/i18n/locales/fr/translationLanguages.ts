import type { MessageId } from "../../messages.js";

export const translationLanguagesMessages = {
    "translationLanguages.search": "Langue ou variante régionale",
    "translationLanguages.placeholder": "Saisissez une langue ou un code",
    "translationLanguages.entryHint": (
        "Saisissez une langue ou une variante régionale, par exemple polonais ou espagnol, Argentine. Les " +
        "codes tels que ja ou es-AR sont aussi acceptés."
    ),
    "translationLanguages.hint": "La qualité de la traduction dépend du modèle et de la langue cible.",
    "translationLanguages.remove": "Retirer {language}",
    "translationLanguages.add": "Ajouter",
    "translationLanguages.existing": "Traduction disponible",
} satisfies Partial<Record<MessageId, string>>;
