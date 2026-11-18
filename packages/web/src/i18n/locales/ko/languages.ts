import type { MessageId } from "../../messages.js";

export const languagesMessages = {
    "languages.english": "영어",
    "languages.spanish": "스페인어",
    "languages.portuguese": "포르투갈어",
    "languages.russian": "러시아어",
    "languages.french": "프랑스어",
    "languages.german": "독일어",
    "languages.italian": "이탈리아어",
} satisfies Partial<Record<MessageId, string>>;
