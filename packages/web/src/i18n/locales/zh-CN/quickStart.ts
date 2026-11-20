import type { MessageId } from "../../messages.js";


export const quickStartMessages = {
    "quickStart.addModelKey": "添加模型密钥",
    "quickStart.assistant.description": "使用右侧面板进行编辑、审查、翻译和事实核查。AI更改在您接受前始终为提案，审查意见仅供参考。",
    "quickStart.assistant.title": "向写作助理提出请求。",
    "quickStart.close": "关闭快速入门",
    "quickStart.modelKey.description": "模型密钥是AI服务商提供的API密钥。在桌面应用中选择服务商，粘贴密钥并存入操作系统凭据存储，刷新模型列表并选择默认模型。Warplyn不会再次显示已保存的密钥。",
    "quickStart.modelKey.title": "添加模型密钥。",
    "quickStart.skip": "跳过快速入门",
    "quickStart.startWriting": "开始写作",
    "quickStart.title": "欢迎使用Warplyn",
    "quickStart.write.description": "在左侧面板创建或打开文章，然后在中央工作区写作。Warplyn会保留草稿恢复状态和版本历史。",
    "quickStart.write.title": "撰写文章。",
} satisfies Partial<Record<MessageId, string>>;
