import type { MessageId } from "../../messages.js";

export const languagesMessages = {
    "languages.english": "Inglês",
    "languages.spanish": "Espanhol",
    "languages.portuguese": "Português",
    "languages.russian": "russo",
    "languages.french": "Francês",
    "languages.german": "Alemão",
    "languages.italian": "italiano",
} satisfies Partial<Record<MessageId, string>>;
