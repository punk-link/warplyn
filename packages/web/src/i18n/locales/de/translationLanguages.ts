import type { MessageId } from "../../messages.js";


export const translationLanguagesMessages = {
    "translationLanguages.add": "Hinzufügen",
    "translationLanguages.entryHint": (
        "Geben Sie einen Namen oder eine regionale Variante ein, etwa Polnisch oder Spanisch, Argentinien. Codes wie ja" +
        " oder es-AR funktionieren ebenfalls."
    ),
    "translationLanguages.existing": "Übersetzung verfügbar",
    "translationLanguages.hint": "Die Übersetzungsqualität hängt vom Modell und der Zielsprache ab.",
    "translationLanguages.placeholder": "Sprachname oder Code eingeben",
    "translationLanguages.remove": "{language} entfernen",
    "translationLanguages.search": "Sprache oder regionale Variante",
} satisfies Partial<Record<MessageId, string>>;
