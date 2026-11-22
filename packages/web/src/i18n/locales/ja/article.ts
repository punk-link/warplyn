import type { MessageId } from "../../messages.js";


export const articleMessages = {
    "article.defaultTitle": "無題の記事",
    "article.titleContextRequired": "内容を追加して別のバージョンを保存するか、自分で記事の名前を変更してください。",
    "article.titleGenerationFailed": "記事のタイトルを生成できませんでした",
    "article.titleGenerationNextStep": "自分で記事の名前を変更するか、設定のテキスト生成モデルを確認して別のバージョンを保存してください。",
} satisfies Partial<Record<MessageId, string>>;
