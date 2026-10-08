import { Menu, type BrowserWindow, type ContextMenuParams, type MenuItemConstructorOptions } from "electron";
import { isPersonalSpellingWord, type ElectronMessages } from "@skladno/shared";
import type { SpellingSession } from "../../infrastructure/window/spelling-session.js";


export function registerArticleSpellingMenu(window: BrowserWindow, spelling: SpellingSession, messages: ElectronMessages): () => void {
    let generation = 0;
    let popup: Menu | undefined;
    const invalidate = () => {
        generation += 1;
        popup?.closePopup(window);
        popup = undefined;
    };
    const articleFocused = async () => !window.webContents.isDestroyed()
        && await window.webContents.executeJavaScript("Boolean(document.activeElement?.matches('[data-article-spelling]'))") === true;
    const showFailure = (kind: "word" | "correction") => {
        if (!window.isDestroyed())
            window.webContents.send("warplyn:spelling-failed", kind);
    };
    const addWordLabel = messages["electron.spelling.addWord"];
    const show = async (_event: Electron.Event, params: ContextMenuParams) => {
        if (!params.isEditable)
            return;

        invalidate();
        const current = generation;
        const article = await articleFocused();
        if (current !== generation || window.isDestroyed())
            return;

        const apply = async (action: () => void | Promise<void>) => {
            const focused = await articleFocused();
            if (focused && current === generation && !window.isDestroyed())
                await action();
        };

        const entries: MenuItemConstructorOptions[] = [
            { role: "undo", enabled: params.editFlags.canUndo },
            { role: "redo", enabled: params.editFlags.canRedo },
            { type: "separator" },
            { role: "cut", enabled: params.editFlags.canCut },
            { role: "copy", enabled: params.editFlags.canCopy },
            { role: "paste", enabled: params.editFlags.canPaste },
            { role: "selectAll", enabled: params.editFlags.canSelectAll },
        ];

        if (article && params.misspelledWord) {
            const correct = (suggestion: string) => void apply(() => window.webContents.replaceMisspelling(suggestion)).catch(() => showFailure("correction"));
            const add = () => void apply(async () => {
                const failed = await spelling.addWords([params.misspelledWord]);
                if (failed.length)
                    showFailure("word");
            }).catch(() => showFailure("word"));
            entries.push(...spellingEntries(params, addWordLabel, correct, add));
        }

        popup = Menu.buildFromTemplate(entries);
        popup.popup({ window });
    };

    window.webContents.on("context-menu", (event, params) => void show(event, params).catch(() => undefined));
    window.webContents.on("did-start-navigation", invalidate);
    window.webContents.on("render-process-gone", invalidate);
    window.on("closed", invalidate);

    return invalidate;
}


function spellingEntries(params: ContextMenuParams, addWordLabel: string, correct: (suggestion: string) => void, add: () => void): MenuItemConstructorOptions[] {
    const entries: MenuItemConstructorOptions[] = [];
    if (isPersonalSpellingWord(params.misspelledWord))
        entries.push({ label: addWordLabel, click: add });

    if (entries.length && params.dictionarySuggestions.length)
        entries.push({ type: "separator" });

    entries.push(...params.dictionarySuggestions.map((suggestion) => ({ label: suggestion, click: () => correct(suggestion) })));
    return entries.length ? [{ type: "separator" }, ...entries] : entries;
}
