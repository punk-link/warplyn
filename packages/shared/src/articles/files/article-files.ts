import { ApplicationClientError, type ApplicationErrorCode } from "../../cross-cutting/errors.js";


export const articleMarkdownByteLimit = 10 * 1024 * 1024;
export const articleFilesChannel = "skladno:article-files";


export interface ArticleMarkdownFile {
    fileName: string;
    content: string;
}


export type ArticleMarkdownSaveResult = "saved" | "download-started" | "cancelled";


export type ArticleFileFormat = "markdown" | "html" | "docx" | "rtf";


export interface ArticleFileBytes {
    fileName: string;
    bytes: Uint8Array<ArrayBuffer>;
}


export interface ArticleSaveTarget {
    ticket: string;
    format: ArticleFileFormat;
}


export interface ArticleFilesClient {
    runtime: "desktop" | "browser";
    loadFile(): Promise<ArticleFileBytes | null>;
    chooseSaveTarget(fileName: string, format?: ArticleFileFormat): Promise<ArticleSaveTarget | null>;
    saveFile(target: ArticleSaveTarget, bytes: Uint8Array<ArrayBuffer>): Promise<ArticleMarkdownSaveResult>;
    releaseSaveTarget(ticket: string): Promise<void>;
}


export type ArticleFilesRequest =
    | { method: "loadFile" }
    | { method: "chooseSaveTarget"; fileName: string }
    | { method: "saveFile"; target: ArticleSaveTarget; bytes: Uint8Array<ArrayBuffer> }
    | { method: "releaseSaveTarget"; ticket: string };


export type ArticleFilesResult =
    | { ok: true; value: ArticleFileBytes | ArticleSaveTarget | null | ArticleMarkdownSaveResult }
    | { ok: false; error: ApplicationErrorCode };


export function isArticleMarkdownFile(value: unknown): value is ArticleMarkdownFile {
    return value !== null && typeof value === "object"
        && Object.keys(value).length === 2
        && "fileName" in value && typeof value.fileName === "string"
        && "content" in value && typeof value.content === "string";
}


export function isArticleFilesRequest(value: unknown): value is ArticleFilesRequest {
    if (value === null || typeof value !== "object" || !("method" in value))
        return false;

    if (value.method === "loadFile")
        return Object.keys(value).length === 1;

    if (value.method === "chooseSaveTarget")
        return Object.keys(value).length === 2 && "fileName" in value && typeof value.fileName === "string" && value.fileName.length <= 1024;

    if (value.method === "releaseSaveTarget")
        return Object.keys(value).length === 2 && "ticket" in value && isSaveTicket(value.ticket);

    return value.method === "saveFile" && Object.keys(value).length === 3
        && "target" in value && isArticleSaveTarget(value.target)
        && "bytes" in value && isArticleFileBytesArray(value.bytes);
}


function isSaveTicket(value: unknown): value is string {
    return typeof value === "string" && value.length > 0 && value.length <= 256;
}


export function isArticleSaveTarget(value: unknown): value is ArticleSaveTarget {
    return value !== null && typeof value === "object" && Object.keys(value).length === 2
        && "ticket" in value && isSaveTicket(value.ticket)
        && "format" in value && isArticleFileFormat(value.format);
}


export function isArticleFileFormat(value: unknown): value is ArticleFileFormat {
    return value === "markdown" || value === "html" || value === "docx" || value === "rtf";
}


export function isArticleFileBytesArray(value: unknown): value is Uint8Array<ArrayBuffer> {
    return ArrayBuffer.isView(value) && Object.prototype.toString.call(value) === "[object Uint8Array]"
        && Object.prototype.toString.call(value.buffer) === "[object ArrayBuffer]" && value.byteLength <= articleMarkdownByteLimit;
}


export function isArticleFileBytes(value: unknown): value is ArticleFileBytes {
    return value !== null && typeof value === "object" && Object.keys(value).length === 2
        && "fileName" in value && typeof value.fileName === "string" && value.fileName.length <= 1024
        && !/[\\/\0]/.test(value.fileName)
        && "bytes" in value && isArticleFileBytesArray(value.bytes);
}


export function getArticleFileFormat(fileName: string): ArticleFileFormat {
    const extension = /\.([^.]+)$/.exec(fileName)?.[1]?.toLowerCase();
    switch (extension) {
        case "md":
            return "markdown";
        case "html":
        case "htm":
            return "html";
        case "docx":
            return "docx";
        case "rtf":
            return "rtf";
        default:
            throw new ApplicationClientError("article_file_invalid", undefined, 400);
    }
}


export const articleFileExtensions: Record<ArticleFileFormat, string> = { markdown: "md", html: "html", docx: "docx", rtf: "rtf" };
export const articleFileMimeTypes: Record<ArticleFileFormat, string> = {
    markdown: "text/markdown;charset=utf-8", html: "text/html;charset=utf-8",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", rtf: "application/rtf",
};


export function getArticleFileName(title: string, format: ArticleFileFormat): string {
    const base = getArticleMarkdownFileName(title.replace(/\.(md|html?|docx|rtf)$/i, "")).slice(0, -3);
    return `${base}.${articleFileExtensions[format]}`;
}


export function validateArticleMarkdownSize(size: number): void {
    if (!Number.isSafeInteger(size) || size < 0 || size > articleMarkdownByteLimit)
        throw new ApplicationClientError("article_file_too_large", undefined, 413);
}


export function validateArticleMarkdownName(fileName: string): void {
    if (!/\.md$/i.test(fileName))
        throw new ApplicationClientError("article_file_invalid", undefined, 400);
}


export function encodeArticleMarkdown(content: string): Uint8Array<ArrayBuffer> {
    validateArticleMarkdownSize(content.length);
    if (content.includes("\0"))
        throw new ApplicationClientError("article_file_invalid", undefined, 400);

    const bytes = new TextEncoder().encode(content);
    validateArticleMarkdownSize(bytes.byteLength);
    return bytes;
}


export function decodeArticleMarkdown(bytes: Uint8Array): string {
    validateArticleMarkdownSize(bytes.byteLength);
    let content: string;
    try {
        content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
        throw new ApplicationClientError("article_file_invalid", undefined, 400);
    }

    if (content.includes("\0"))
        throw new ApplicationClientError("article_file_invalid", undefined, 400);

    return content.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
}


export function getArticleMarkdownFileName(title: string): string {
    const cleanTitle = [...title].map((character) => character.charCodeAt(0) < 32 ? "_" : character).join("");
    let name = cleanTitle.replace(/[<>:"/\\|?*]/g, "_").replace(/[. ]+$/g, "").trim();
    name = [...name.replace(/\.md$/i, "")].slice(0, 160).join("").replace(/[. ]+$/g, "");
    if (!name || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(name))
        name = `Article${name ? `_${name}` : ""}`;

    return `${name}.md`;
}


export function getImportedArticleTitle(file: ArticleMarkdownFile, defaultTitle: string): string {
    const firstLine = file.content.split("\n").find((line) => line.trim()) ?? "";
    const heading = /^ {0,3}#\s+(.+?)\s*$/.exec(firstLine)?.[1]?.replace(/\s+#+\s*$/, "").trim();
    return heading || file.fileName.replace(/\.(md|html?|docx|rtf)$/i, "").trim() || defaultTitle;
}
