import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.discardPrompt": "放弃备注中未保存的更改？",
    "notes.discardChanges": "放弃更改",
    "notes.add": "添加编辑备注…",
    "notes.count": "编辑备注{separator}{count}",
    "notes.detached": "需要重新关联",
    "notes.edit": "编辑备注…",
    "notes.empty": "暂无编辑备注。",
    "notes.failed": "无法更新备注。请保留指示，重新打开文章后再试。",
    "notes.guidance": "给助手的指示",
    "notes.help": "助手处理相应段落时会参考附加的备注。备注与文章正文分开保存。",
    "notes.included": "随此请求附加的备注",
    "notes.marker": "编辑备注 {number}",
    "notes.markers": "编辑备注 {numbers}",
    "notes.reattach": "附加到所选文本",
    "notes.reattachHelp": "请在编辑器中选择新的段落，然后重新打开此备注以附加。",
    "notes.remove": "删除备注",
    "notes.save": "保存备注",
    "notes.select": "请选择要附加备注的文本。",
    "notes.title": "编辑备注",
} satisfies Partial<Record<MessageId, string>>;
