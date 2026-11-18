import type { MessageId } from "../../messages.js";

export const languages = {
    "languages.english": "Inglés",
    "languages.spanish": "Español",
    "languages.portuguese": "Portugués",
    "languages.russian": "Ruso",
    "languages.french": "Francés",
    "languages.german": "Alemán",
    "languages.italian": "Italiano",
} satisfies Partial<Record<MessageId, string>>;
