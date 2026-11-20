import type { MessageId } from "../../messages.js";


export const languagesMessages = {
    "languages.english": "英語",
    "languages.french": "フランス語",
    "languages.german": "ドイツ語",
    "languages.italian": "イタリア語",
    "languages.portuguese": "ポルトガル語",
    "languages.russian": "ロシア語",
    "languages.spanish": "スペイン語",
} satisfies Partial<Record<MessageId, string>>;
