import type { MessageId } from "../../messages.js";


export const languagesMessages = {
    "languages.english": "Английский",
    "languages.french": "Французский",
    "languages.german": "Немецкий",
    "languages.italian": "Итальянский",
    "languages.portuguese": "Португальский",
    "languages.russian": "Русский",
    "languages.spanish": "Испанский",
} satisfies Partial<Record<MessageId, string>>;
