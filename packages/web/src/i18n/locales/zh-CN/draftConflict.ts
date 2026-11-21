import type { MessageId } from "../../messages.js";


export const draftConflictMessages = {
    "draftConflict.banner": "另一个Warplyn会话更改了此文章。本地草稿已保留，请比较后再继续。",
    "draftConflict.cancel": "取消",
    "draftConflict.compare": "比较并解决冲突",
    "draftConflict.confirmDraft": "用最新持久保存的草稿替换保留的本地文本？",
    "draftConflict.confirmRevision": "丢弃持久保存的草稿，并用最新已保存版本替换保留的本地文本？",
    "draftConflict.description": "保留的本地草稿与最新保存的内容并排显示。在您作出选择之前，不会替换任何内容。",
    "draftConflict.heading": "解决草稿冲突",
    "draftConflict.keepMine": "保留我的草稿",
    "draftConflict.useDraft": "使用最新草稿",
    "draftConflict.useRevision": "使用最新已保存版本",
} satisfies Partial<Record<MessageId, string>>;
