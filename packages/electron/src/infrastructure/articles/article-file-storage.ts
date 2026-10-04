import { open, rename, unlink } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { ApplicationClientError, articleMarkdownByteLimit, getArticleFileFormat, validateArticleMarkdownSize, type ArticleFileBytes } from "@skladno/shared";


export async function readArticleFile(path: string): Promise<ArticleFileBytes> {
    getArticleFileFormat(path);
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

        validateArticleMarkdownSize(offset);
        return { fileName: basename(path), bytes: new Uint8Array(bytes.subarray(0, offset)) };
    } finally {
        await handle.close();
    }
}


export async function writeArticleFile(path: string, bytes: Uint8Array): Promise<void> {
    getArticleFileFormat(path);
    validateArticleMarkdownSize(bytes.byteLength);
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
