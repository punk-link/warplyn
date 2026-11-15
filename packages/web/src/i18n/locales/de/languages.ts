import type { MessageId } from "../../messages.js";

export const languagesMessages = {
    "languages.english": "Englisch",
    "languages.spanish": "Spanisch",
    "languages.portuguese": "Portugiesisch",
    "languages.russian": "Russisch",
    "languages.french": "Französisch",
    "languages.german": "Deutsch",
    "languages.italian": "Italienisch",
} satisfies Partial<Record<MessageId, string>>;
