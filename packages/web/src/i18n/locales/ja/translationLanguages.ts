import type { MessageId } from "../../messages.js";


export const translationLanguagesMessages = {
    "translationLanguages.add": "追加",
    "translationLanguages.entryHint": "ポーランド語、スペイン語・アルゼンチンなどの言語名や地域別の種類を入力してください。jaやes-ARなどのコードも使用できます。",
    "translationLanguages.existing": "翻訳あり",
    "translationLanguages.hint": "翻訳の品質はモデルと翻訳先の言語によって異なります。",
    "translationLanguages.placeholder": "言語名またはコードを入力",
    "translationLanguages.remove": "{language}を削除",
    "translationLanguages.search": "言語または地域別の種類",
} satisfies Partial<Record<MessageId, string>>;
