import type { MessageId } from "../../messages.js";


export const translationLanguagesMessages = {
    "translationLanguages.add": "Ajouter",
    "translationLanguages.entryHint": (
        "Saisissez une langue ou une variante régionale, par exemple polonais ou espagnol, Argentine. Les codes tels qu" +
        "e ja ou es-AR sont aussi acceptés."
    ),
    "translationLanguages.existing": "Traduction disponible",
    "translationLanguages.hint": "La qualité de la traduction dépend du modèle et de la langue cible.",
    "translationLanguages.placeholder": "Saisissez une langue ou un code",
    "translationLanguages.remove": "Retirer {language}",
    "translationLanguages.search": "Langue ou variante régionale",
} satisfies Partial<Record<MessageId, string>>;
