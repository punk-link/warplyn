import { randomUUID } from "node:crypto";
import type { BrowserWindow, Dialog, IpcMain } from "electron";
import { ApplicationClientError, articleFilesChannel, getArticleFileFormat, getArticleFileName, isArticleFilesRequest, type ArticleFilesRequest, type ArticleFilesResult, type ArticleSaveTarget, type ElectronMessages } from "@skladno/shared";
import { readArticleFile, writeArticleFile } from "../../infrastructure/articles/article-file-storage.js";


interface ArticleFilesAdapterOptions {
    ipcMain: Pick<IpcMain, "handle" | "removeHandler">;
    window: BrowserWindow;
    dialog: Pick<Dialog, "showOpenDialog" | "showSaveDialog">;
    messages: ElectronMessages;
}


export function registerDesktopArticleFilesAdapter({ ipcMain, window, dialog, messages }: ArticleFilesAdapterOptions): void {
    const filters = [
        { name: messages["electron.articleFiles.markdown"], extensions: ["md"] },
        { name: messages["electron.articleFiles.html"], extensions: ["html", "htm"] },
        { name: messages["electron.articleFiles.docx"], extensions: ["docx"] },
        { name: messages["electron.articleFiles.rtf"], extensions: ["rtf"] },
    ];

    let selected: { target: ArticleSaveTarget; path: string; expires: number } | undefined;
    let choosing = false;
    let generation = 0;
    let expiry: ReturnType<typeof setTimeout> | undefined;


    function release(): void {
        clearTimeout(expiry);
        selected = undefined;
    }


    function invalidate(): void {
        generation++;
        release();
    }


    async function choose(fileName: string): Promise<ArticleFilesResult> {
        if (choosing || selected)
            return { ok: false, error: "invalid_request" };

        choosing = true;
        const currentGeneration = generation;
        try {
            const result = await dialog.showSaveDialog(window, {
                title: messages["electron.articleFiles.save"], filters,
                defaultPath: getArticleFileName(fileName, "markdown"), properties: ["showOverwriteConfirmation"],
            });
            if (currentGeneration !== generation || result.canceled || !result.filePath)
                return { ok: true, value: null };

            const target = { ticket: randomUUID(), format: getArticleFileFormat(result.filePath) };
            selected = { target, path: result.filePath, expires: Date.now() + 60_000 };
            expiry = setTimeout(release, 60_000);
            expiry.unref();
            return { ok: true, value: target };
        } finally {
            choosing = false;
        }
    }


    async function load(): Promise<ArticleFilesResult> {
        if (choosing || selected)
            return { ok: false, error: "invalid_request" };

        choosing = true;
        const currentGeneration = generation;

        try {
            const result = await dialog.showOpenDialog(window, { title: messages["electron.articleFiles.load"], filters, properties: ["openFile"] });
            if (currentGeneration !== generation || result.canceled || !result.filePaths[0])
                return { ok: true, value: null };

            const file = await readArticleFile(result.filePaths[0]);
            return { ok: true, value: currentGeneration === generation ? file : null };
        } finally {
            choosing = false;
        }
    }


    async function commit(request: Extract<ArticleFilesRequest, { method: "saveFile" }>): Promise<ArticleFilesResult> {

        const destination = selected;
        if (!destination || destination.expires < Date.now() || destination.target.ticket !== request.target.ticket || destination.target.format !== request.target.format)
            return { ok: false, error: "invalid_request" };

        release();
        choosing = true;
        
        try {
            await writeArticleFile(destination.path, request.bytes);
            return { ok: true, value: "saved" };
        } finally {
            choosing = false;
        }
    }


    async function execute(request: ArticleFilesRequest): Promise<ArticleFilesResult> {
        if (request.method === "chooseSaveTarget")
            return choose(request.fileName);

        if (request.method === "loadFile")
            return load();

        if (request.method === "saveFile")
            return commit(request);

        if (selected?.target.ticket === request.ticket)
            release();

        return { ok: true, value: null };
    }


    window.once("closed", invalidate);
    window.webContents.on("render-process-gone", invalidate);
    window.webContents.on("did-start-navigation", invalidate);
    ipcMain.removeHandler(articleFilesChannel);
    ipcMain.handle(articleFilesChannel, async (event, request: unknown): Promise<ArticleFilesResult> => {
        if (event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame || !isArticleFilesRequest(request))
            return { ok: false, error: "invalid_request" };

        try {
            return await execute(request);
        } catch (error) {
            if (error instanceof ApplicationClientError)
                return { ok: false, error: error.code };

            return { ok: false, error: request.method === "loadFile" ? "article_file_load_failed" : "article_file_save_failed" };
        }
    });
}
