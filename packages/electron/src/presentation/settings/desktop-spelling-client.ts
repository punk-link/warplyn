import type { IpcRenderer } from "electron";
import { desktopSpellingChannel, desktopSpellingLanguageChannel, isDesktopSpellingResult, type DesktopSpellingClient } from "@skladno/shared";


export function createDesktopSpellingClient(ipcRenderer: Pick<IpcRenderer, "invoke" | "send">): DesktopSpellingClient {
    return {
        setArticleLanguage: (language) => ipcRenderer.send(desktopSpellingLanguageChannel, language),
        async request(request) {
            const result: unknown = await ipcRenderer.invoke(desktopSpellingChannel, request);
            return isDesktopSpellingResult(result) ? result : { ok: false };
        },
    };
}
