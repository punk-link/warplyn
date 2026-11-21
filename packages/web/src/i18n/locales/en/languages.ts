import type { MessageId } from "../../messages.js";


export const languagesMessages = {
    "languages.english": "English",
    "languages.french": "French",
    "languages.german": "German",
    "languages.italian": "Italian",
    "languages.portuguese": "Portuguese",
    "languages.russian": "Russian",
    "languages.spanish": "Spanish",
} satisfies Partial<Record<MessageId, string>>;
