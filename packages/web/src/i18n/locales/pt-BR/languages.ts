import type { MessageId } from "../../messages.js";


export const languagesMessages = {
    "languages.english": "Inglês",
    "languages.french": "Francês",
    "languages.german": "Alemão",
    "languages.italian": "italiano",
    "languages.portuguese": "Português",
    "languages.russian": "russo",
    "languages.spanish": "Espanhol",
} satisfies Partial<Record<MessageId, string>>;
