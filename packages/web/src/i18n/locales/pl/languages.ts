import type { MessageId } from "../../messages.js";


export const languagesMessages = {
    "languages.english": "Angielski",
    "languages.french": "Francuski",
    "languages.german": "Niemiecki",
    "languages.italian": "Włoski",
    "languages.portuguese": "Portugalski",
    "languages.russian": "Rosyjski",
    "languages.spanish": "Hiszpański",
} satisfies Partial<Record<MessageId, string>>;
