import type { MessageId } from "../../messages.js";


export const languagesMessages = {
    "languages.english": "Inglés",
    "languages.french": "Francés",
    "languages.german": "Alemán",
    "languages.italian": "Italiano",
    "languages.portuguese": "Portugués",
    "languages.russian": "Ruso",
    "languages.spanish": "Español",
} satisfies Partial<Record<MessageId, string>>;
