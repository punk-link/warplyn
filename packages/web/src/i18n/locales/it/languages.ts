import type { MessageId } from "../../messages.js";


export const languagesMessages = {
    "languages.english": "Inglese",
    "languages.french": "Francese",
    "languages.german": "Tedesco",
    "languages.italian": "Italiano",
    "languages.portuguese": "Portoghese",
    "languages.russian": "Russo",
    "languages.spanish": "Spagnolo",
} satisfies Partial<Record<MessageId, string>>;
