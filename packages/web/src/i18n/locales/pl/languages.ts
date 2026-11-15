import type { MessageId } from "../../messages.js";

export const languages = {
    "languages.english": "Angielski",
    "languages.spanish": "Hiszpański",
    "languages.portuguese": "Portugalski",
    "languages.russian": "Rosyjski",
    "languages.french": "Francuski",
    "languages.german": "Niemiecki",
    "languages.italian": "Włoski",
} satisfies Partial<Record<MessageId, string>>;
