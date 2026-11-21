import type { MessageId } from "../../messages.js";


export const revisionsMessages = {
    "revisions.acceptedProposal": "採用した提案",
    "revisions.articleContent": "保存された記事の内容",
    "revisions.assistantEdit": "アシスタントによる編集",
    "revisions.author": "著者によるバージョン",
    "revisions.characterCount": "{count}文字",
    "revisions.count": "{count, plural, =0 {保存済みバージョンなし} other {保存済みバージョン#件}}",
    "revisions.current": "現在",
    "revisions.currentExplanation": "これは現在の保存済みバージョンです。",
    "revisions.currentRevision": "現在の保存済みバージョン",
    "revisions.empty": "空のバージョン",
    "revisions.emptyContent": "このバージョンには記事の本文が保存されていません。",
    "revisions.heading": "バージョン履歴",
    "revisions.historyNavigation": "バージョン履歴",
    "revisions.inactive": "非アクティブ",
    "revisions.initial": "最初のバージョン",
    "revisions.restore": "このバージョンを復元",
    "revisions.restored": "復元したバージョン",
    "revisions.restoredFromEarlier": "以前のバージョンから復元",
    "revisions.restoredTarget": "バージョン#{number}を復元",
    "revisions.restoredTargetDescribed": "バージョン#{number}を復元：{description}",
    "revisions.revision": "保存済みバージョン",
    "revisions.saved": "保存済みバージョン",
    "revisions.select": "保存済みバージョンを選択",
} satisfies Partial<Record<MessageId, string>>;
