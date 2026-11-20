import type { MessageId } from "../../messages.js";


export const translationLanguagesMessages = {
    "translationLanguages.add": "Add",
    "translationLanguages.entryHint": "Enter a name or regional variant, such as Polish or Spanish, Argentina. Codes such as ja or es-AR also work.",
    "translationLanguages.existing": "Translation available",
    "translationLanguages.hint": "Translation quality depends on your model and target language.",
    "translationLanguages.placeholder": "Type a language name or code",
    "translationLanguages.remove": "Remove {language}",
    "translationLanguages.search": "Language or regional variant",
} satisfies Partial<Record<MessageId, string>>;
