import { ApplicationClientError, articleFileMimeTypes, getArticleFileFormat, getArticleFileName, validateArticleMarkdownSize, type ArticleFilesClient, type ArticleFileBytes, type ArticleSaveTarget } from "@skladno/shared";


async function readBrowserFile(file: File): Promise<ArticleFileBytes> {
    getArticleFileFormat(file.name);
    validateArticleMarkdownSize(file.size);
    try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        validateArticleMarkdownSize(bytes.byteLength);
        return { fileName: file.name, bytes };
    } catch (error) {
        if (error instanceof ApplicationClientError)
            throw error;

        throw new ApplicationClientError("article_file_load_failed", undefined, 500);
    }
}


export function createBrowserArticleFilesClient(): ArticleFilesClient {
    const targets = new Map<string, { target: ArticleSaveTarget; fileName: string }>();
    return {
        runtime: "browser",
        loadFile: () => new Promise((resolve, reject) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".md,.html,.htm,.docx,.rtf";
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

                void readBrowserFile(file).then(resolve, reject);
            }, { once: true });
            try {
                input.click();
            } catch {
                input.remove();
                reject(new ApplicationClientError("article_file_load_failed", undefined, 500));
            }
        }),
        async chooseSaveTarget(fileName, format = "markdown") {
            const target = { ticket: crypto.randomUUID(), format };
            targets.clear();
            targets.set(target.ticket, { target, fileName: getArticleFileName(fileName, format) });
            return target;
        },
        async releaseSaveTarget(ticket) {
            targets.delete(ticket);
        },
        async saveFile(target, bytes) {
            const selected = targets.get(target.ticket);
            targets.delete(target.ticket);
            if (!selected || selected.target.format !== target.format)
                throw new ApplicationClientError("invalid_request", undefined, 400);

            validateArticleMarkdownSize(bytes.byteLength);
            const url = URL.createObjectURL(new Blob([bytes], { type: articleFileMimeTypes[target.format] }));
            const link = document.createElement("a");
            link.href = url;
            link.download = selected.fileName;
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
