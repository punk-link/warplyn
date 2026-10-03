import { ApplicationClientError, type ApplicationErrorCode } from "../../cross-cutting/errors.js";


export const articleMarkdownByteLimit = 10 * 1024 * 1024;
export const articleFilesChannel = "skladno:article-files";


export interface ArticleMarkdownFile {
    fileName: string;
    content: string;
}


export type ArticleMarkdownSaveResult = "saved" | "download-started" | "cancelled";


export interface ArticleFilesClient {
    loadMarkdown(): Promise<ArticleMarkdownFile | null>;
    saveMarkdown(file: ArticleMarkdownFile): Promise<ArticleMarkdownSaveResult>;
}


export type ArticleFilesRequest =
    | { method: "loadMarkdown" }
    | { method: "saveMarkdown"; file: ArticleMarkdownFile };


export type ArticleFilesResult =
    | { ok: true; value: ArticleMarkdownFile | null | ArticleMarkdownSaveResult }
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

    if (value.method === "loadMarkdown")
        return Object.keys(value).length === 1;

    return value.method === "saveMarkdown" && Object.keys(value).length === 2
        && "file" in value && isArticleMarkdownFile(value.file);
}


export function validateArticleMarkdownSize(size: number): void {
    if (size > articleMarkdownByteLimit)
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
    return heading || file.fileName.replace(/\.md$/i, "").trim() || defaultTitle;
}
