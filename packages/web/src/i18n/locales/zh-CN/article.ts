import type { MessageId } from "../../messages.js";


export const articleMessages = {
    "article.defaultTitle": "无标题文章",
    "article.titleContextRequired": "请添加更多内容后保存新版本，或自行重命名文章。",
    "article.titleGenerationFailed": "无法生成文章标题",
    "article.titleGenerationNextStep": "请自行重命名文章，或在设置中检查文本生成模型并保存新版本。",
} satisfies Partial<Record<MessageId, string>>;
