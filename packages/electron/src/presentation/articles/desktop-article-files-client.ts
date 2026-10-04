import type { IpcRenderer } from "electron";
import { APPLICATION_ERROR, ApplicationClientError, articleFilesChannel, isArticleFileBytes, isArticleSaveTarget, type ArticleFilesClient, type ArticleFilesRequest } from "@skladno/shared";


export function createDesktopArticleFilesClient(ipcRenderer: Pick<IpcRenderer, "invoke">): ArticleFilesClient {
    async function invoke(request: ArticleFilesRequest) {
        const result: unknown = await ipcRenderer.invoke(articleFilesChannel, request);
        if (!result || typeof result !== "object" || !("ok" in result))
            throw new ApplicationClientError("invalid_request", undefined, 400);

        if (result.ok === false && "error" in result) {
            const code = Object.values(APPLICATION_ERROR).find((code) => code === result.error);
            throw new ApplicationClientError(code ?? "invalid_request", undefined, 500);
        }

        if (result.ok !== true || !("value" in result))
            throw new ApplicationClientError("invalid_request", undefined, 400);

        return result.value;
    }


    return {
        runtime: "desktop",
        async loadFile() {
            const value = await invoke({ method: "loadFile" });
            if (value === null || isArticleFileBytes(value))
                return value;

            throw new ApplicationClientError("article_file_load_failed", undefined, 500);
        },
        async chooseSaveTarget(fileName) {
            const value = await invoke({ method: "chooseSaveTarget", fileName });
            if (value === null || isArticleSaveTarget(value))
                return value;

            throw new ApplicationClientError("article_file_save_failed", undefined, 500);
        },
        async releaseSaveTarget(ticket) {
            await invoke({ method: "releaseSaveTarget", ticket });
        },
        async saveFile(target, bytes) {
            const value = await invoke({ method: "saveFile", target, bytes });
            if (value === "saved" || value === "cancelled")
                return value;

            throw new ApplicationClientError("article_file_save_failed", undefined, 500);
        },
    };
}
