import type { MessageId } from "../../messages.js";

export const languagesMessages = {
    "languages.english": "Anglais",
    "languages.spanish": "Espagnol",
    "languages.portuguese": "Portugais",
    "languages.russian": "Russe",
    "languages.french": "Français",
    "languages.german": "Allemand",
    "languages.italian": "Italien",
} satisfies Partial<Record<MessageId, string>>;
