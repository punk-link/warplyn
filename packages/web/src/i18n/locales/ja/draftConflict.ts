import type { MessageId } from "../../messages.js";


export const draftConflictMessages = {
    "draftConflict.banner": "別のWarplynセッションでこの記事が変更されました。ローカルの下書きは保持されています。比較してから続行してください。",
    "draftConflict.cancel": "キャンセル",
    "draftConflict.compare": "比較して競合を解決",
    "draftConflict.confirmDraft": "保持されたローカルの本文を、最新の保存された下書きで置き換えますか？",
    "draftConflict.confirmRevision": "保存された下書きを破棄し、保持されたローカルの本文を最新の保存済みバージョンで置き換えますか？",
    "draftConflict.description": "保持されたローカルの下書きと最新の保存内容を並べて表示しています。選択するまで内容は置き換わりません。",
    "draftConflict.heading": "下書きの競合を解決",
    "draftConflict.keepMine": "自分の下書きを保持",
    "draftConflict.useDraft": "最新の下書きを使用",
    "draftConflict.useRevision": "最新の保存済みバージョンを使用",
} satisfies Partial<Record<MessageId, string>>;
