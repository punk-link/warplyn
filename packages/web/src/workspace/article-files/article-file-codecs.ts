import { ApplicationClientError, decodeArticleMarkdown, encodeArticleMarkdown, getArticleFileFormat, validateArticleMarkdownSize, type ArticleFileBytes, type ArticleFileFormat } from "@skladno/shared";
import { articleHtmlToMarkdown, articleMarkdownToHtml, createSafeArticleHtml, escapeArticleHtml } from "./article-html.js";
import { runArticleFileWorker } from "./article-file-worker-client.js";


export async function exportArticleFile(content: string, title: string, format: ArticleFileFormat): Promise<Uint8Array<ArrayBuffer>> {
    encodeArticleMarkdown(content);
    if (format === "markdown")
        return encodeArticleMarkdown(content);

    const html = articleMarkdownToHtml(content);
    if (format === "html")
        return encodeArticleMarkdown(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeArticleHtml(title)}</title></head><body>${html}</body></html>`);

    let bytes: Uint8Array<ArrayBuffer>;
    if (format === "docx") {
        const { exportArticleDocx } = await import("./article-docx-export.js");
        bytes = await exportArticleDocx(html, title);
    } else {
        const { exportArticleRtf } = await import("./article-rtf-export.js");
        bytes = exportArticleRtf(html);
    }

    validateArticleMarkdownSize(bytes.byteLength);
    return bytes;
}


export async function importArticleFile(file: ArticleFileBytes): Promise<string> {
    validateArticleMarkdownSize(file.bytes.byteLength);
    const format = getArticleFileFormat(file.fileName);
    if (format === "markdown")
        return decodeArticleMarkdown(file.bytes);

    try {
        const html = format === "html" ? decodeArticleMarkdown(file.bytes) : await runArticleFileWorker(format, file.bytes);
        const content = articleHtmlToMarkdown(html);
        if (!content.trim() && !createSafeArticleHtml(html).body.innerHTML.trim() && /<(script|iframe|object|embed|img|svg|canvas)\b/i.test(html))
            throw new ApplicationClientError("article_file_invalid", undefined, 400);

        return content;
    } catch (error) {
        if (error instanceof ApplicationClientError)
            throw error;

        throw new ApplicationClientError("article_file_invalid", undefined, 400);
    }
}
