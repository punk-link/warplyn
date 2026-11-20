import type { MessageId } from "../../messages.js";


export const uiMessages = {
    "ui.added": "追加：",
    "ui.loading": "読み込み中",
    "ui.noOriginal": "元のテキストはありません",
    "ui.noProposed": "提案されたテキストはありません",
    "ui.original": "原文",
    "ui.proposed": "提案",
    "ui.proposedChange": "提案された文章の変更",
    "ui.removed": "削除：",
} satisfies Partial<Record<MessageId, string>>;
