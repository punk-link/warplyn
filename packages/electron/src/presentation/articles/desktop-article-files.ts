import { extname } from "node:path";
import type { BrowserWindow, Dialog, IpcMain } from "electron";
import { ApplicationClientError, articleFilesChannel, encodeArticleMarkdown, getArticleMarkdownFileName, isArticleFilesRequest, type ArticleFilesRequest, type ArticleFilesResult, type ElectronMessages } from "@skladno/shared";
import { readArticleMarkdown, writeArticleMarkdown } from "../../infrastructure/articles/article-markdown-files.js";


interface ArticleFilesAdapterOptions {
    ipcMain: Pick<IpcMain, "handle" | "removeHandler">;
    window: BrowserWindow;
    dialog: Pick<Dialog, "showOpenDialog" | "showSaveDialog">;
    messages: ElectronMessages;
}


async function executeFileRequest(request: ArticleFilesRequest, { window, dialog, messages }: Omit<ArticleFilesAdapterOptions, "ipcMain">): Promise<ArticleFilesResult> {
    const filters = [{ name: messages["electron.articleFiles.markdown"], extensions: ["md"] }];
    if (request.method === "loadMarkdown") {
        const result = await dialog.showOpenDialog(window, { title: messages["electron.articleFiles.load"], filters, properties: ["openFile"] });
        if (result.canceled || !result.filePaths[0])
            return { ok: true, value: null };

        return { ok: true, value: await readArticleMarkdown(result.filePaths[0]) };
    }

    encodeArticleMarkdown(request.file.content);
    const result = await dialog.showSaveDialog(window, {
        title: messages["electron.articleFiles.save"], filters,
        defaultPath: getArticleMarkdownFileName(request.file.fileName), properties: ["showOverwriteConfirmation"],
    });
    if (result.canceled || !result.filePath)
        return { ok: true, value: "cancelled" };

    const path = extname(result.filePath) ? result.filePath : `${result.filePath}.md`;
    await writeArticleMarkdown(path, request.file.content);

    return { ok: true, value: "saved" };
}


export function registerDesktopArticleFilesAdapter(options: ArticleFilesAdapterOptions): void {
    const { ipcMain, window } = options;
    ipcMain.removeHandler(articleFilesChannel);
    ipcMain.handle(articleFilesChannel, async (event, request: unknown): Promise<ArticleFilesResult> => {
        if (event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame || !isArticleFilesRequest(request))
            return { ok: false, error: "invalid_request" };

        try {
            return await executeFileRequest(request, options);
        } catch (error) {
            if (error instanceof ApplicationClientError)
                return { ok: false, error: error.code };

            return { ok: false, error: request.method === "loadMarkdown" ? "article_file_load_failed" : "article_file_save_failed" };
        }
    });
}
