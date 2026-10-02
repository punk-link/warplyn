import { APPLICATION_ERROR, ApplicationClientError, type ArticleFilesClient } from "@skladno/shared";
import { createBrowserArticleFilesClient } from "./browser-article-files.js";


declare global {
    interface Window {
        skladnoArticleFiles?: ArticleFilesClient;
    }
}


export function createRendererArticleFilesClient(host: Pick<Window, "skladnoArticleFiles"> = window): ArticleFilesClient {
    const bridge = host.skladnoArticleFiles;
    if (!bridge)
        return createBrowserArticleFilesClient();


    // contextBridge transfers Error messages, not custom class identity or fields.
    function restoreClientError(error: unknown): never {
        if (error instanceof Error) {
            const code = Object.values(APPLICATION_ERROR).find((value) => value === error.message);
            if (code)
                throw new ApplicationClientError(code, undefined, 500);
        }

        throw error;
    }


    return {
        loadMarkdown: () => bridge.loadMarkdown().catch(restoreClientError),
        saveMarkdown: (file) => bridge.saveMarkdown(file).catch(restoreClientError),
    };
}
