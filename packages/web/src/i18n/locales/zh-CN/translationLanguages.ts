import type { MessageId } from "../../messages.js";


export const translationLanguagesMessages = {
    "translationLanguages.add": "添加",
    "translationLanguages.entryHint": "输入语言或地区变体，如波兰语或西班牙语（阿根廷）。也可以使用ja或es-AR等代码。",
    "translationLanguages.existing": "已有翻译",
    "translationLanguages.hint": "翻译质量取决于模型和目标语言。",
    "translationLanguages.placeholder": "输入语言名称或代码",
    "translationLanguages.remove": "移除{language}",
    "translationLanguages.search": "语言或地区变体",
} satisfies Partial<Record<MessageId, string>>;
