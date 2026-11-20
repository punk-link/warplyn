import type { MessageId } from "../../messages.js";


export const languagesMessages = {
    "languages.english": "英语",
    "languages.french": "法语",
    "languages.german": "德语",
    "languages.italian": "意大利语",
    "languages.portuguese": "葡萄牙语",
    "languages.russian": "俄语",
    "languages.spanish": "西班牙语",
} satisfies Partial<Record<MessageId, string>>;
