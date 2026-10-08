import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { _electron, expect, test, type ElectronApplication } from "@playwright/test";
import { launchPackaged, closePackaged } from "./electron-packaged-app.js";


async function launchSpelling(root: string): Promise<ElectronApplication> {
    const env = { ...process.env, WARPLYN_DATA_DIR: join(root, "data"), WARPLYN_AI_API_KEY: "" };
    delete env.ELECTRON_RUN_AS_NODE;
    const app = await _electron.launch({ args: [resolve("packages/electron"), `--user-data-dir=${join(root, "profile")}`], env });
    const page = await app.firstWindow();
    await page.waitForURL("http://127.0.0.1:5173/");
    await page.evaluate(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.reload();
    return app;
}


test("spelling menu correction follows Lexical Draft recovery and immutable save", async () => {
    test.setTimeout(120_000);
    const root = await mkdtemp(join(tmpdir(), "warplyn-spelling-e2e-"));
    let app: ElectronApplication | undefined;
    try {
        app = await launchSpelling(root);
        const page = await app.firstWindow();
        const article = await page.evaluate(async () => {
            if (!window.skladno)
                throw new Error("Missing desktop client");

            return window.skladno.createArticle({ title: "Spelling test", content: "A helllo world.", language: "en", publishingProfileId: "default" });
        });
        await page.reload();
        await page.getByRole("button", { name: /^Spelling test/ }).click();
        const editor = page.getByRole("textbox", { name: "Article draft" });
        await expect(editor).toHaveAttribute("spellcheck", "true");
        // Reproduce hidden Chromium's missing markers deterministically.
        await editor.evaluate((root) => root.setAttribute("spellcheck", "false"));
        await expect.poll(() => page.evaluate(async () => {
            const result = await window.warplynSpelling?.request({ method: "snapshot" });
            return result?.ok && result.value.dictionaries.states["en-US"] === "ready";
        }), { timeout: 60_000 }).toBe(true);
        // replaceMisspelling requires a native marker, which synthetic menu data cannot create.
        // Substitute native text insertion here; the visible test below covers real markers.
        await app.evaluate(({ Menu, BrowserWindow }) => {
            const contents = BrowserWindow.getAllWindows()[0]?.webContents;
            if (!contents)
                throw new Error("Missing spelling window");

            contents.replaceMisspelling = (text) => void contents.insertText(text);
            contents.prependListener("context-menu", (_event, params) => {
                params.misspelledWord = "helllo";
                params.dictionarySuggestions = ["hello"];
                // Matches Electron 43's native result: suggestions exist despite this flag.
                params.spellcheckEnabled = false;
            });
            const original = Menu.buildFromTemplate;
            Menu.buildFromTemplate = (template) => {
                const menu = original(template);
                Menu.setApplicationMenu(menu);
                menu.popup = () => undefined;
                return menu;
            };
        });
        await editor.click();
        await editor.press("Control+a");
        await editor.pressSequentially("A helllo world. ");
        const point = await editor.evaluate((root) => {
            const text = root.querySelector("p span")?.firstChild;
            if (!text)
                throw new Error("Missing spelling text");

            const range = document.createRange();
            range.setStart(text, 2);
            range.setEnd(text, 8);
            window.getSelection()?.removeAllRanges();
            window.getSelection()?.addRange(range);
            const rect = range.getBoundingClientRect();
            return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
        });
        await page.mouse.click(point.x, point.y, { button: "right" });
        await expect.poll(() => app?.evaluate(({ Menu }) => Menu.getApplicationMenu()?.items.map((item) => item.label) ?? []), { timeout: 10_000 }).toContain("hello");
        await app.evaluate(({ Menu, app }) => {
            const stale = Menu.getApplicationMenu()?.items.find((item) => item.label === "hello");
            app.once("spelling-test-stale-click", () => stale?.click());
        });
        await page.evaluate(() => window.warplynSpelling?.setArticleLanguage("es"));
        await expect.poll(() => app?.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0]?.webContents.session.getSpellCheckerLanguages())).toEqual(["es"]);
        await app.evaluate(({ app }) => app.emit("spelling-test-stale-click"));
        await expect(editor).toContainText("helllo");
        await page.evaluate(() => window.warplynSpelling?.setArticleLanguage("en"));
        await expect.poll(() => app?.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0]?.webContents.session.getSpellCheckerLanguages())).toEqual(["en"]);
        // Clear before requesting the menu: the context-menu event itself can arrive later.
        await app.evaluate(({ Menu }) => Menu.setApplicationMenu(null));
        await page.mouse.click(point.x, point.y, { button: "right" });
        await expect.poll(() => app?.evaluate(({ Menu }) => Menu.getApplicationMenu()?.items.map((item) => item.label) ?? [])).toContain("hello");
        expect(await editor.evaluate(() => window.getSelection()?.toString())).toBe("helllo");
        await app.evaluate(({ Menu }) => {
            const suggestion = Menu.getApplicationMenu()?.items.find((item) => item.label === "hello");
            if (!suggestion)
                throw new Error("Missing native suggestion");

            suggestion.click();
        });
        await expect(editor).toContainText("A hello world.");
        await expect.poll(() => page.evaluate(async (id) => (await window.skladno?.getArticle(id))?.draft?.content, article.id)).toContain("hello");
        await editor.press("Control+z");
        await expect(editor).toContainText("helllo");
        await editor.press("Control+y");
        await expect(editor).toContainText("hello");
        await page.reload();
        await expect(page.getByRole("textbox", { name: "Article draft" })).toContainText("hello");
        await page.getByRole("button", { name: "Save revision" }).click();
        await expect.poll(() => page.evaluate(async (id) => (await window.skladno?.getArticle(id))?.currentRevision.content, article.id)).toContain("hello");
        const revisions = await page.evaluate(async (id) => window.skladno?.listArticleRevisions(id), article.id);
        expect(revisions).toHaveLength(2);
        expect(revisions?.some((revision) => revision.content === "A helllo world.")).toBe(true);
    } finally {
        await app?.close();
        await rm(root, { recursive: true, force: true });
    }
});

test("native spelling context supplies Russian suggestions for an underlined word", async () => {
    test.skip(process.env.WARPLYN_ELECTRON_TEST_HIDDEN !== "false", "Hidden Chromium suppresses native spelling context; run with WARPLYN_ELECTRON_TEST_HIDDEN=false.");
    test.setTimeout(90_000);
    const root = await mkdtemp(join(tmpdir(), "warplyn-spelling-suggestions-"));
    let app: ElectronApplication | undefined;
    try {
        app = await launchSpelling(root);
        const page = await app.firstWindow();
        await page.evaluate(async () => window.skladno?.createArticle({ title: "Native suggestions", content: "Это крайна важно.", language: "ru", publishingProfileId: "default" }));
        await page.reload();
        await page.getByRole("button", { name: /^Native suggestions/ }).click();
        await expect.poll(() => page.evaluate(async () => {
            const result = await window.warplynSpelling?.request({ method: "snapshot" });
            return result?.ok && result.value.dictionaries.states.ru === "ready";
        }), { timeout: 60_000 }).toBe(true);
        await app.evaluate(({ Menu }) => {
            const original = Menu.buildFromTemplate;
            Menu.buildFromTemplate = (template) => {
                const menu = original(template);
                Menu.setApplicationMenu(menu);
                menu.popup = () => undefined;
                return menu;
            };
        });
        const editor = page.getByRole("textbox", { name: "Article draft" });
        await editor.click();
        await editor.press("Control+a");
        await editor.pressSequentially("Это крайна важно. ");
        const point = await editor.evaluate((root) => {
            const text = root.querySelector("p span")?.firstChild;
            if (!text)
                throw new Error("Missing native spelling text");

            const range = document.createRange();
            range.setStart(text, 4);
            range.setEnd(text, 10);
            window.getSelection()?.removeAllRanges();
            window.getSelection()?.addRange(range);
            const rect = range.getBoundingClientRect();
            return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
        });
        await page.mouse.click(point.x, point.y, { button: "right" });
        await expect.poll(() => app?.evaluate(({ Menu }) => Menu.getApplicationMenu()?.items.map((item) => item.label) ?? [])).toContain("крайне");
        const labels = await app.evaluate(({ Menu }) => Menu.getApplicationMenu()?.items.map((item) => item.label) ?? []);
        expect(labels.indexOf("Select All")).toBeLessThan(labels.indexOf("Add to dictionary"));
        expect(labels.indexOf("Add to dictionary")).toBeGreaterThan(-1);
        expect(labels.indexOf("Add to dictionary")).toBeLessThan(labels.indexOf("крайне"));
        await app.evaluate(({ Menu }) => Menu.getApplicationMenu()?.items.find((item) => item.label === "крайне")?.click());
        await expect(editor).toContainText("Это крайне важно.");
    } finally {
        await app?.close();
        await rm(root, { recursive: true, force: true });
    }
});

test("packaged Spelling Settings prepares dictionaries and recovers personal vocabulary after restart", async () => {
    test.setTimeout(120_000);
    const root = await mkdtemp(join(tmpdir(), "warplyn-packaged-spelling-"));
    let app: Awaited<ReturnType<typeof launchPackaged>> | undefined;
    try {
        app = await launchPackaged(root);
        let page = app.page;
        await page.evaluate(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
        await page.reload();
        const result = await page.evaluate(() => window.warplynSpelling?.request({ method: "prepare", languages: ["en-US", "es"] }));
        expect(result?.ok).toBe(true);
        await expect.poll(() => page.evaluate(async () => {
            const snapshot = await window.warplynSpelling?.request({ method: "snapshot" });
            return snapshot?.ok && ["en-US", "es"].every((language) => snapshot.value.dictionaries.states[language] === "ready");
        }), { timeout: 60_000 }).toBe(true);
        await page.getByRole("button", { name: "Settings", exact: true }).click();
        await page.getByRole("button", { name: "Spelling", exact: true }).click();
        await page.getByRole("textbox", { name: "Words to add" }).fill("Warplynpackagedterm");
        await page.getByRole("button", { name: "Add words" }).click();
        await expect(page.getByRole("button", { name: "Remove Warplynpackagedterm from personal dictionary" })).toBeVisible();
        await page.screenshot({ path: "test-results/spelling-settings-desktop.png" });
        const viewport = await page.context().newCDPSession(page);
        await viewport.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
        await expect(page.getByRole("combobox", { name: "Settings Navigation" })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
        await viewport.send("Emulation.clearDeviceMetricsOverride");
        await closePackaged(app);
        app = undefined;
        app = await launchPackaged(root);
        page = app.page;
        const restarted = await page.evaluate(() => window.warplynSpelling?.request({ method: "snapshot" }));
        expect(restarted?.ok && restarted.value.personal.words.includes("Warplynpackagedterm")).toBe(true);
        expect(restarted?.ok && restarted.value.dictionaries.requested).toEqual(["en-US", "es"]);
        const rejected = await page.evaluate(() => window.warplynSpelling?.request({ method: "prepare", languages: ["../../private"] }));
        expect(rejected).toEqual({ ok: false });
        await page.evaluate(() => window.warplynSpelling?.request({ method: "removeWord", word: "Warplynpackagedterm" }));
    } finally {
        if (app) {
            await app.page.evaluate(() => window.warplynSpelling?.request({ method: "removeWord", word: "Warplynpackagedterm" })).catch(() => undefined);
            await closePackaged(app);
        }

        await rm(root, { recursive: true, force: true });
    }
});

test("native preload and personal words persist while language activation stays Article-specific", async () => {
    test.setTimeout(120_000);
    const root = await mkdtemp(join(tmpdir(), "warplyn-spelling-settings-"));
    let app: ElectronApplication | undefined;
    try {
        app = await launchSpelling(root);
        let page = await app.firstWindow();
        await page.evaluate(() => window.warplynSpelling?.setArticleLanguage(null));
        const prepared = await page.evaluate(() => window.warplynSpelling?.request({ method: "prepare", languages: ["en-US", "es"] }));
        expect(prepared?.ok).toBe(true);
        await expect.poll(() => page.evaluate(async () => {
            const result = await window.warplynSpelling?.request({ method: "snapshot" });
            return result?.ok && ["en-US", "es"].every((language) => result.value.dictionaries.states[language] === "ready");
        }), { timeout: 60_000 }).toBe(true);
        const added = await page.evaluate(() => window.warplynSpelling?.request({ method: "addWords", words: ["Warplynsyntheticterm"] }));
        expect(added?.ok && added.value.personal.words.includes("Warplynsyntheticterm")).toBe(true);
        await page.getByRole("button", { name: "Settings", exact: true }).click();
        await page.getByRole("button", { name: "Spelling", exact: true }).click();
        const filter = page.getByRole("searchbox", { name: "Filter languages" });
        await expect(filter).toBeVisible();
        const languageList = page.getByRole("group", { name: "Language dictionaries", exact: true });
        expect((await languageList.boundingBox())!.y).toBeGreaterThan((await filter.boundingBox())!.y);
        await expect(languageList.getByRole("button", { name: /Unload.*en-US/ })).toBeVisible();
        await expect(languageList.getByRole("checkbox", { name: /en-US/ })).toHaveCount(0);
        await filter.fill("en-US");
        await expect(languageList.getByRole("checkbox")).toHaveCount(0);
        await languageList.getByRole("button", { name: /Unload.*en-US/ }).click();
        await expect(languageList.getByText("Unloaded", { exact: true })).toBeVisible();
        await expect(languageList.getByRole("checkbox", { name: /en-US/ })).not.toBeChecked();
        expect(await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0]?.webContents.session.getSpellCheckerLanguages())).not.toContain("en-US");
        await languageList.getByRole("checkbox", { name: /en-US/ }).check();
        await page.getByRole("button", { name: "Download dictionaries" }).click();
        await expect(languageList.getByRole("button", { name: /Unload.*en-US/ })).toBeVisible();
        await expect(page.getByRole("button", { name: "Download dictionaries" })).toBeDisabled();
        await filter.clear();
        await page.screenshot({ path: "test-results/spelling-settings-stacked.png" });
        await app.evaluate(({ BrowserWindow }) => {
            const window = BrowserWindow.getAllWindows()[0];
            window?.setMinimumSize(390, 600);
            window?.setContentSize(390, 844);
        });
        await expect(page.getByRole("combobox", { name: "Settings Navigation" })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
        await page.screenshot({ path: "test-results/spelling-settings-stacked-narrow.png" });
        await page.evaluate(() => window.warplynSpelling?.setArticleLanguage("es"));
        expect(await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0]?.webContents.session.getSpellCheckerLanguages())).toEqual(["es"]);
        await app.evaluate(({ BrowserWindow, ipcMain }) => {
            const sender = BrowserWindow.getAllWindows()[0]?.webContents;
            ipcMain.emit("warplyn:desktop-spelling-language", { sender, senderFrame: undefined }, "en");
        });
        expect(await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0]?.webContents.session.getSpellCheckerLanguages())).toEqual(["es"]);
        await app.close();
        app = await launchSpelling(root);
        page = await app.firstWindow();
        const snapshot = await page.evaluate(() => window.warplynSpelling?.request({ method: "snapshot" }));
        expect(snapshot?.ok && snapshot.value.personal.words.includes("Warplynsyntheticterm")).toBe(true);
        expect(snapshot?.ok && snapshot.value.dictionaries.requested).toEqual(["en-US", "es"]);
        await app.evaluate(({ session }) => session.defaultSession.enableNetworkEmulation({ offline: true }));
        await page.evaluate(() => window.warplynSpelling?.setArticleLanguage(null));
        await page.evaluate(() => window.warplynSpelling?.request({ method: "prepare", languages: ["es"] }));
        await expect.poll(() => page.evaluate(async () => {
            const result = await window.warplynSpelling?.request({ method: "snapshot" });
            return result?.ok && result.value.dictionaries.states.es === "ready";
        }), { timeout: 30_000 }).toBe(true);
        const removed = await page.evaluate(() => window.warplynSpelling?.request({ method: "removeWord", word: "Warplynsyntheticterm" }));
        expect(removed?.ok && !removed.value.personal.words.includes("Warplynsyntheticterm")).toBe(true);
    } finally {
        if (app) {
            const page = await app.firstWindow().catch(() => undefined);
            await page?.evaluate(() => window.warplynSpelling?.request({ method: "removeWord", word: "Warplynsyntheticterm" })).catch(() => undefined);
        }

        await app?.close();
        await rm(root, { recursive: true, force: true });
    }
});
