import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "{count}个字符",
    "publishing.charactersOverGuidance": "超出建议长度{count}个字符",
    "publishing.charactersRemaining": "剩余{count}个字符（建议）",
    "publishing.copyFailed": "复制失败。请重试。",
    "publishing.default": "默认",
    "publishing.defaultProfile": "正在使用默认发布配置。",
    "publishing.linkedInArticle": "LinkedIn文章",
    "publishing.linkedInPost": "LinkedIn帖子",
    "publishing.markdownCopied": "已复制Markdown。",
    "publishing.noRestrictions": "无限制",
    "publishing.plainTextCopied": "已复制纯文本。",
    "publishing.profileSaveFailed": "无法保存发布配置。",
} satisfies Partial<Record<MessageId, string>>;
