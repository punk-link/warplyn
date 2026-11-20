import type { MessageId } from "../../messages.js";


export const articleFilesMessages = {
    "articleFiles.download": "下载",
    "articleFiles.downloadStarted": "已开始下载文章",
    "articleFiles.format": "文件格式",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatRtf": "富文本 (.rtf)",
    "articleFiles.import": "导入",
    "articleFiles.invalid": "请选择有效的.md、.html、.docx或.rtf文件。Markdown和HTML文件必须使用UTF-8编码。",
    "articleFiles.layoutWarning": "保留段落、列表和基本格式。页面布局和表格布局将简化，图片、批注和嵌入对象将省略。导入前请审核转换后的文章。",
    "articleFiles.load": "从文件加载",
    "articleFiles.loadFailed": "无法加载文章。请选择可读取的Markdown、HTML、DOCX或RTF文件，然后重试。",
    "articleFiles.loaded": "已从文件加载文章",
    "articleFiles.menuLoad": "从文件加载…",
    "articleFiles.menuSave": "保存到文件…",
    "articleFiles.review": "检查要导入的文章",
    "articleFiles.save": "保存到文件",
    "articleFiles.saveFailed": "无法将文章保存到文件。请选择可写入的位置，然后重试。",
    "articleFiles.saved": "文章已保存到文件",
    "articleFiles.tooLarge": "文章文件超过10 MiB的大小限制。请选择较小的文件，或缩短文章后再保存。",
} satisfies Partial<Record<MessageId, string>>;
