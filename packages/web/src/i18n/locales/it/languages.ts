import type { MessageId } from "../../messages.js";

export const languages = {
    "languages.english": "Inglese",
    "languages.spanish": "Spagnolo",
    "languages.portuguese": "Portoghese",
    "languages.russian": "Russo",
    "languages.french": "Francese",
    "languages.german": "Tedesco",
    "languages.italian": "Italiano",
} satisfies Partial<Record<MessageId, string>>;
