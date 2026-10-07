import type { BrowserWindow, IpcMain } from "electron";
import { desktopSpellingChannel, desktopSpellingLanguageChannel, isDesktopSpellingRequest, isSpellingLanguage, type DesktopSpellingRequest, type DesktopSpellingResult, type ElectronMessages } from "@skladno/shared";
import { SpellingSession } from "../../infrastructure/window/spelling-session.js";
import { registerArticleSpellingMenu } from "../articles/desktop-article-spelling.js";


export function registerDesktopSpelling({ ipcMain, window, runtimePath, preferredLanguages, messages }: { ipcMain: IpcMain; window: BrowserWindow; runtimePath: string; preferredLanguages: string[]; messages: ElectronMessages }): void {
    const spelling = new SpellingSession(window.webContents.session, runtimePath, process.platform, preferredLanguages);
    const invalidateMenu = registerArticleSpellingMenu(window, spelling, messages);
    const changeLanguage = (event: Electron.IpcMainEvent, language: unknown) => {
        if (event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame || (language !== null && !isSpellingLanguage(language)))
            return;

        invalidateMenu();
        try {
            spelling.setArticleLanguage(language);
        } catch {
            window.webContents.send("warplyn:spelling-failed", "language");
        }
    };


    async function execute(request: DesktopSpellingRequest): Promise<DesktopSpellingResult> {
        let failed: string[] = [];
        switch (request.method) {
            case "prepare":
                spelling.prepare(request.languages);
                break;
            case "unload":
                spelling.unload(request.language);
                break;
            case "addWords":
                failed = await spelling.addWords(request.words);
                break;
            case "removeWord":
                spelling.removeWord(request.word);
                break;
        }

        return { ok: true, value: await spelling.snapshot(failed) };
    }


    ipcMain.on(desktopSpellingLanguageChannel, changeLanguage);
    ipcMain.removeHandler(desktopSpellingChannel);
    ipcMain.handle(desktopSpellingChannel, async (event, request: unknown): Promise<DesktopSpellingResult> => {
        if (event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame || !isDesktopSpellingRequest(request))
            return { ok: false };

        try {
            return await execute(request);
        } catch {
            return { ok: false };
        }
    });

    window.webContents.on("did-start-navigation", () => spelling.setArticleLanguage(null));
    window.once("closed", () => {
        spelling.dispose();
        ipcMain.removeListener(desktopSpellingLanguageChannel, changeLanguage);
        ipcMain.removeHandler(desktopSpellingChannel);
    });
}
