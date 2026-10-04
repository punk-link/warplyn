import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, readFile, readdir, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { BrowserWindow, IpcMain, IpcMainInvokeEvent, SaveDialogOptions } from "electron";
import { articleFilesChannel, articleMarkdownByteLimit, getElectronMessagesFor, type ArticleFilesResult } from "@skladno/shared";
import { registerDesktopArticleFilesAdapter } from "./desktop-article-files.js";
import { createDesktopArticleFilesClient } from "./desktop-article-files-client.js";
import { readArticleFile, writeArticleFile } from "../../infrastructure/articles/article-file-storage.js";


// Product scenarios: history-and-publishing.article-files-native

test("native file client saves and loads whole Markdown, cancels silently, and returns safe errors", async () => {
    const root = await mkdtemp(join(tmpdir(), "warplyn-article-files-"));
    const path = join(root, "café.md");
    const webContents = { mainFrame: {}, on: () => undefined };
    const window = { webContents, once: () => undefined } as unknown as BrowserWindow;
    let handler: (event: IpcMainInvokeEvent, request: unknown) => Promise<ArticleFilesResult> = async () => ({ ok: false, error: "invalid_request" });
    const ipcMain = {
        removeHandler(channel) {
            assert.equal(channel, articleFilesChannel);
        },
        handle(channel, listener) {
            assert.equal(channel, articleFilesChannel);
            handler = listener;
        },
    } satisfies Pick<IpcMain, "handle" | "removeHandler">;
    let cancel = false;
    let fail = false;
    let dialogCount = 0;
    registerDesktopArticleFilesAdapter({
        ipcMain, window, messages: getElectronMessagesFor(),
        dialog: {
            async showOpenDialog() {
                dialogCount++;
                if (fail)
                    throw new Error("private path and raw error");

                return { canceled: cancel, filePaths: [path] };
            },
            async showSaveDialog() {
                dialogCount++;
                if (fail)
                    throw new Error("private path and raw error");

                return { canceled: cancel, filePath: path };
            },
        },
    });
    const event = { sender: webContents, senderFrame: webContents.mainFrame } as unknown as IpcMainInvokeEvent;
    const client = createDesktopArticleFilesClient({ invoke: async (_channel, request) => handler(event, request) });


    async function save(content: string) {
        const target = await client.chooseSaveTarget("café");
        return target ? client.saveFile(target, new TextEncoder().encode(content)) : "cancelled";
    }


    try {
        const content = "# café 🙂\n\n[docs](https://example.com)\n\n```ts\nconst value = 34;\n```";
        assert.equal(await save(content), "saved");
        assert.equal(await readFile(path, "utf8"), content);
        assert.deepEqual(await client.loadFile(), { fileName: "café.md", bytes: new TextEncoder().encode(content) });
        cancel = true;
        assert.equal(await client.loadFile(), null);
        assert.equal(await save("changed"), "cancelled");
        assert.equal(await readFile(path, "utf8"), content);
        cancel = false;
        fail = true;
        await assert.rejects(client.loadFile(), { message: "article_file_load_failed", code: "article_file_load_failed" });
        await assert.rejects(save(content), { message: "article_file_save_failed" });
        const before = dialogCount;
        assert.deepEqual(await handler(event, { method: "loadFile", path }), { ok: false, error: "invalid_request" });
        assert.deepEqual(await handler({ ...event, senderFrame: {} } as IpcMainInvokeEvent, { method: "loadFile" }), { ok: false, error: "invalid_request" });
        assert.deepEqual(await handler({ ...event, sender: {} } as IpcMainInvokeEvent, { method: "loadFile" }), { ok: false, error: "invalid_request" });
        assert.equal(dialogCount, before);
    } finally {
        await rm(root, { recursive: true, force: true });
    }
});


test("file validation and failed replacement preserve destinations and clean temporary files", async () => {
    const root = await mkdtemp(join(tmpdir(), "warplyn-article-files-"));
    try {
        const path = join(root, "existing.md");
        await writeFile(path, "original");
        await assert.rejects(writeArticleFile(path, new Uint8Array(articleMarkdownByteLimit + 1)), { code: "article_file_too_large" });
        assert.equal(await readFile(path, "utf8"), "original");
        await writeArticleFile(path, new TextEncoder().encode("replacement"));
        assert.equal(await readFile(path, "utf8"), "replacement");
        const directory = join(root, "directory.md");
        await mkdir(directory);
        await writeFile(join(directory, "keep"), "original");
        await assert.rejects(writeArticleFile(directory, new TextEncoder().encode("replacement")));
        assert.equal(await readFile(join(directory, "keep"), "utf8"), "original");
        assert.deepEqual((await readdir(root)).sort(), ["directory.md", "existing.md"]);
        await assert.rejects(readArticleFile(directory), { code: "article_file_invalid" });
        await writeFile(path, Uint8Array.of(0xff));
        assert.deepEqual((await readArticleFile(path)).bytes, Uint8Array.of(0xff));
        await assert.rejects(readArticleFile(join(root, "file.txt")), { code: "article_file_invalid" });
    } finally {
        await rm(root, { recursive: true, force: true });
    }
});


test("native format tickets are bounded, single-use and never expose destination paths", async () => {
    const root = await mkdtemp(join(tmpdir(), "warplyn-format-tickets-"));
    const path = join(root, "binary.docx");
    const listeners = new Map<string, () => void>();
    const webContents = { mainFrame: {}, on: (name: string, listener: () => void) => listeners.set(name, listener) };
    const window = { webContents, once: (name: string, listener: () => void) => listeners.set(name, listener) } as unknown as BrowserWindow;
    let handler: (event: IpcMainInvokeEvent, request: unknown) => Promise<ArticleFilesResult> = async () => ({ ok: false, error: "invalid_request" });
    let chosenPath = path;
    registerDesktopArticleFilesAdapter({
        ipcMain: { removeHandler: () => undefined, handle: (_channel, listener) => {
            handler = listener;
        } },
        window, messages: getElectronMessagesFor(),
        dialog: {
            showOpenDialog: async () => ({ canceled: false, filePaths: [path] }),
            showSaveDialog: async (_window, options?: SaveDialogOptions) => {
                assert.deepEqual(options?.filters?.map((filter) => filter.extensions[0]), ["md", "html", "docx", "rtf"]);
                return { canceled: false, filePath: chosenPath };
            },
        },
    });
    const event = { sender: webContents, senderFrame: webContents.mainFrame } as unknown as IpcMainInvokeEvent;
    const client = createDesktopArticleFilesClient({ invoke: async (_channel, request) => handler(event, request) });
    const bytes = Uint8Array.of(0, 255, 123, 0);
    try {
        const target = await client.chooseSaveTarget("binary");
        assert.ok(target);
        assert.equal(target.format, "docx");
        assert.equal(JSON.stringify(target).includes(root), false);
        await assert.rejects(client.chooseSaveTarget("second"), { code: "invalid_request" });
        await assert.rejects(client.saveFile({ ...target, format: "rtf" }, bytes), { code: "invalid_request" });
        assert.deepEqual(await handler({ ...event, sender: {} } as IpcMainInvokeEvent, { method: "saveFile", target, bytes }), { ok: false, error: "invalid_request" });
        assert.equal(await client.saveFile(target, bytes), "saved");
        assert.deepEqual(new Uint8Array(await readFile(path)), bytes);
        await assert.rejects(client.saveFile(target, bytes), { code: "invalid_request" });
        const released = await client.chooseSaveTarget("binary");
        assert.ok(released);
        await client.releaseSaveTarget(released.ticket);
        await assert.rejects(client.saveFile(released, bytes), { code: "invalid_request" });
        const navigated = await client.chooseSaveTarget("binary");
        assert.ok(navigated);
        listeners.get("did-start-navigation")?.();
        await assert.rejects(client.saveFile(navigated, bytes), { code: "invalid_request" });
        chosenPath = join(root, "unknown.pdf");
        await assert.rejects(client.chooseSaveTarget("binary"), { code: "article_file_invalid" });
    } finally {
        listeners.get("closed")?.();
        await rm(root, { recursive: true, force: true });
    }
});
