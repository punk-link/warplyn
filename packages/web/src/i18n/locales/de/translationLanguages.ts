import type { MessageId } from "../../messages.js";

export const translationLanguagesMessages = {
    "translationLanguages.search": "Sprache oder regionale Variante",
    "translationLanguages.placeholder": "Sprachname oder Code eingeben",
    "translationLanguages.entryHint": (
        "Geben Sie einen Namen oder eine regionale Variante ein, etwa Polnisch oder Spanisch, Argentinien. " +
        "Codes wie ja oder es-AR funktionieren ebenfalls."
    ),
    "translationLanguages.hint": "Die Übersetzungsqualität hängt vom Modell und der Zielsprache ab.",
    "translationLanguages.remove": "{language} entfernen",
    "translationLanguages.add": "Hinzufügen",
    "translationLanguages.existing": "Übersetzung verfügbar",
} satisfies Partial<Record<MessageId, string>>;
