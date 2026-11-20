import type { MessageId } from "../../messages.js";


export const articleHeaderMessages = {
    "articleHeader.archiveArticle": "記事をアーカイブ",
    "articleHeader.archived": "アーカイブ済み",
    "articleHeader.authorEdit": "著者による編集",
    "articleHeader.confirmDeleteArticle": "記事を削除",
    "articleHeader.copied": "コピーしました",
    "articleHeader.copy": "コピー",
    "articleHeader.copyFailed": "コピーできませんでした",
    "articleHeader.copyMarkdown": "Markdownをコピー",
    "articleHeader.copyOptions": "コピーのオプション",
    "articleHeader.copyPlainText": "プレーンテキストをコピー",
    "articleHeader.deleteArticle": "記事を削除",
    "articleHeader.deleteConfirmationDescription": "「{articleTitle}」とその保存済みバージョン、復元可能な下書きをすべて削除しますか？この操作は取り消せません。",
    "articleHeader.deleteConfirmationTitle": "記事を削除しますか？",
    "articleHeader.deleteGroupConfirmationDescription": (
        "{count, plural, one {「{articleTitle}」（記事1件）} other {「{articleTitle}」と翻訳を含む記事#件}}を、関連する下書きとバージョン履歴も含めて削除しますか？この" +
        "操作は取り消せません。"
    ),
    "articleHeader.facts": "ファクトチェック",
    "articleHeader.flow": "流れと明瞭さ",
    "articleHeader.focusMode": "集中モード",
    "articleHeader.leaveFocusMode": "集中モードを終了",
    "articleHeader.metadata": "記事の背景情報",
    "articleHeader.narrative": "本文の下書き",
    "articleHeader.rename": "記事の名前を変更：{articleTitle}",
    "articleHeader.saveRevision": "バージョンを保存",
    "articleHeader.sourceLanguage": "原文の言語",
    "articleHeader.style": "文体のレビュー",
    "articleHeader.talkingPoints": "要点",
    "articleHeader.title": "記事のタイトル",
    "articleHeader.translate": "翻訳",
    "articleHeader.unarchiveArticle": "記事をアーカイブから戻す",
    "articleHeader.workflow": "おすすめの編集手順",
} satisfies Partial<Record<MessageId, string>>;
