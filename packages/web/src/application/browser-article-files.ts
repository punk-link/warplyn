import { ApplicationClientError, decodeArticleMarkdown, encodeArticleMarkdown, getArticleMarkdownFileName, validateArticleMarkdownName, validateArticleMarkdownSize, type ArticleFilesClient, type ArticleMarkdownFile } from "@skladno/shared";


async function readBrowserMarkdown(file: File): Promise<ArticleMarkdownFile> {
    validateArticleMarkdownName(file.name);
    validateArticleMarkdownSize(file.size);
    try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        return { fileName: file.name, content: decodeArticleMarkdown(bytes) };
    } catch (error) {
        if (error instanceof ApplicationClientError)
            throw error;

        throw new ApplicationClientError("article_file_load_failed", undefined, 500);
    }
}


export function createBrowserArticleFilesClient(): ArticleFilesClient {
    return {
        loadMarkdown: () => new Promise((resolve, reject) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".md,text/markdown";
            input.hidden = true;
            document.body.append(input);
            input.addEventListener("cancel", () => {
                input.remove();
                resolve(null);
            }, { once: true });
            input.addEventListener("change", () => {
                const file = input.files?.[0];
                input.remove();
                if (!file) {
                    resolve(null);
                    return;
                }

                void readBrowserMarkdown(file).then(resolve, reject);
            }, { once: true });
            try {
                input.click();
            } catch {
                input.remove();
                reject(new ApplicationClientError("article_file_load_failed", undefined, 500));
            }
        }),
        async saveMarkdown(file) {
            const bytes = encodeArticleMarkdown(file.content);
            const url = URL.createObjectURL(new Blob([bytes], { type: "text/markdown;charset=utf-8" }));
            const link = document.createElement("a");
            link.href = url;
            link.download = getArticleMarkdownFileName(file.fileName);
            document.body.append(link);
            try {
                link.click();
                return "download-started";
            } catch {
                throw new ApplicationClientError("article_file_save_failed", undefined, 500);
            } finally {
                link.remove();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            }
        },
    };
}
