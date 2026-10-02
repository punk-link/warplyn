import type { IpcRenderer } from "electron";
import { ApplicationClientError, articleFilesChannel, isArticleMarkdownFile, type ArticleFilesClient, type ArticleFilesRequest, type ArticleFilesResult } from "@skladno/shared";


export function createDesktopArticleFilesClient(ipcRenderer: Pick<IpcRenderer, "invoke">): ArticleFilesClient {
    async function invoke(request: ArticleFilesRequest) {
        const result: ArticleFilesResult = await ipcRenderer.invoke(articleFilesChannel, request);
        if (!result.ok)
            throw new ApplicationClientError(result.error, undefined, 500);

        return result.value;
    }


    return {
        async loadMarkdown() {
            const value = await invoke({ method: "loadMarkdown" });
            if (value === null || isArticleMarkdownFile(value))
                return value;

            throw new ApplicationClientError("article_file_load_failed", undefined, 500);
        },
        async saveMarkdown(file) {
            const value = await invoke({ method: "saveMarkdown", file });
            if (value === "saved" || value === "cancelled")
                return value;

            throw new ApplicationClientError("article_file_save_failed", undefined, 500);
        },
    };
}
