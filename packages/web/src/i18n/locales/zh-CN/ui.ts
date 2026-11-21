import type { MessageId } from "../../messages.js";


export const uiMessages = {
    "ui.added": "已添加：",
    "ui.loading": "正在加载",
    "ui.noOriginal": "无原文",
    "ui.noProposed": "无提案文本",
    "ui.original": "原文",
    "ui.proposed": "提案",
    "ui.proposedChange": "建议的文本更改",
    "ui.removed": "已删除：",
} satisfies Partial<Record<MessageId, string>>;
