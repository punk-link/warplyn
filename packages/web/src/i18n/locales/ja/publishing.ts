import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "{count}文字",
    "publishing.charactersOverGuidance": "目安より{count}文字超過",
    "publishing.charactersRemaining": "残り{count}文字（目安）",
    "publishing.copyFailed": "コピーできませんでした。もう一度お試しください。",
    "publishing.default": "既定",
    "publishing.defaultProfile": "既定の公開用プロファイルを使用しています。",
    "publishing.linkedInArticle": "LinkedInの記事",
    "publishing.linkedInPost": "LinkedInの投稿",
    "publishing.markdownCopied": "Markdownをコピーしました。",
    "publishing.noRestrictions": "制限なし",
    "publishing.plainTextCopied": "プレーンテキストをコピーしました。",
    "publishing.profileSaveFailed": "公開用プロファイルを保存できませんでした。",
} satisfies Partial<Record<MessageId, string>>;
