import type { MessageId } from "../../messages.js";


export const articleHeaderMessages = {
    "articleHeader.archiveArticle": "归档文章",
    "articleHeader.archived": "已归档",
    "articleHeader.authorEdit": "作者编辑",
    "articleHeader.confirmDeleteArticle": "删除文章",
    "articleHeader.copied": "已复制",
    "articleHeader.copy": "复制",
    "articleHeader.copyFailed": "复制失败",
    "articleHeader.copyMarkdown": "复制Markdown",
    "articleHeader.copyOptions": "复制选项",
    "articleHeader.copyPlainText": "复制纯文本",
    "articleHeader.deleteArticle": "删除文章",
    "articleHeader.deleteConfirmationDescription": "删除《{articleTitle}》及其所有已保存版本和可恢复的草稿？此操作无法撤销。",
    "articleHeader.deleteConfirmationTitle": "删除文章？",
    "articleHeader.deleteGroupConfirmationDescription": (
        "删除{count, plural, one {《{articleTitle}》（1篇文章）} other {《{articleTitle}》及其翻译，共#篇文章}}，以及相关草稿和版本历史？此操作无法撤销。"
    ),
    "articleHeader.facts": "事实核查",
    "articleHeader.flow": "连贯与清晰",
    "articleHeader.focusMode": "专注模式",
    "articleHeader.leaveFocusMode": "退出专注模式",
    "articleHeader.metadata": "文章背景",
    "articleHeader.narrative": "正文草稿",
    "articleHeader.rename": "重命名文章：{articleTitle}",
    "articleHeader.saveRevision": "保存版本",
    "articleHeader.sourceLanguage": "原文语言",
    "articleHeader.style": "风格审查",
    "articleHeader.talkingPoints": "要点",
    "articleHeader.title": "文章标题",
    "articleHeader.translate": "翻译",
    "articleHeader.unarchiveArticle": "取消归档文章",
    "articleHeader.workflow": "建议的编辑流程",
} satisfies Partial<Record<MessageId, string>>;
