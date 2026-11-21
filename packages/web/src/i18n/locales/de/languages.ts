import type { MessageId } from "../../messages.js";


export const languagesMessages = {
    "languages.english": "Englisch",
    "languages.french": "Französisch",
    "languages.german": "Deutsch",
    "languages.italian": "Italienisch",
    "languages.portuguese": "Portugiesisch",
    "languages.russian": "Russisch",
    "languages.spanish": "Spanisch",
} satisfies Partial<Record<MessageId, string>>;
