import type { MessageId } from "../../messages.js";


export const revisionsMessages = {
    "revisions.acceptedProposal": "已接受的提案",
    "revisions.articleContent": "已保存的文章内容",
    "revisions.assistantEdit": "写作助理编辑",
    "revisions.author": "作者版本",
    "revisions.characterCount": "{count}个字符",
    "revisions.count": "{count, plural, =0 {无已保存版本} other {#个已保存版本}}",
    "revisions.current": "当前",
    "revisions.currentExplanation": "这是当前已保存版本。",
    "revisions.currentRevision": "当前已保存版本",
    "revisions.empty": "空版本",
    "revisions.emptyContent": "此版本未保存文章正文。",
    "revisions.heading": "版本历史",
    "revisions.historyNavigation": "版本历史",
    "revisions.inactive": "非当前版本",
    "revisions.initial": "初始版本",
    "revisions.restore": "恢复此版本",
    "revisions.restored": "已恢复的版本",
    "revisions.restoredFromEarlier": "从早期版本恢复",
    "revisions.restoredTarget": "已恢复版本#{number}",
    "revisions.restoredTargetDescribed": "已恢复版本#{number}：{description}",
    "revisions.revision": "已保存版本",
    "revisions.saved": "已保存版本",
    "revisions.select": "选择已保存版本",
} satisfies Partial<Record<MessageId, string>>;
