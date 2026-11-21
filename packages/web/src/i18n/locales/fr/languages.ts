import type { MessageId } from "../../messages.js";


export const languagesMessages = {
    "languages.english": "Anglais",
    "languages.french": "Français",
    "languages.german": "Allemand",
    "languages.italian": "Italien",
    "languages.portuguese": "Portugais",
    "languages.russian": "Russe",
    "languages.spanish": "Espagnol",
} satisfies Partial<Record<MessageId, string>>;
