import { open, rename, unlink } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { ApplicationClientError, articleMarkdownByteLimit, decodeArticleMarkdown, encodeArticleMarkdown, validateArticleMarkdownName, validateArticleMarkdownSize, type ArticleMarkdownFile } from "@skladno/shared";


export async function readArticleMarkdown(path: string): Promise<ArticleMarkdownFile> {
    validateArticleMarkdownName(path);
    const handle = await open(path, "r");
    try {
        const stats = await handle.stat();
        if (!stats.isFile())
            throw new ApplicationClientError("article_file_invalid", undefined, 400);

        validateArticleMarkdownSize(stats.size);

        const bytes = Buffer.alloc(articleMarkdownByteLimit + 1);
        let offset = 0;
        while (offset < bytes.length) {
            const { bytesRead } = await handle.read(bytes, offset, bytes.length - offset, null);
            if (!bytesRead)
                break;

            offset += bytesRead;
        }

        return { fileName: basename(path), content: decodeArticleMarkdown(bytes.subarray(0, offset)) };
    } finally {
        await handle.close();
    }
}


export async function writeArticleMarkdown(path: string, content: string): Promise<void> {
    validateArticleMarkdownName(path);
    const bytes = encodeArticleMarkdown(content);
    const temporary = join(dirname(path), `.article-${randomUUID()}.tmp`);
    const handle = await open(temporary, "wx", 0o600);

    try {
        try {
            await handle.writeFile(bytes);
        } finally {
            await handle.close();
        }

        await rename(temporary, path);
    } finally {
        await unlink(temporary).catch(() => undefined);
    }
}
