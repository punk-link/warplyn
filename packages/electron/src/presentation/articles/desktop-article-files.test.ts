import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, readFile, readdir, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { BrowserWindow, IpcMain, IpcMainInvokeEvent } from "electron";
import { articleFilesChannel, getElectronMessagesFor, type ArticleFilesResult } from "@skladno/shared";
import { registerDesktopArticleFilesAdapter } from "./desktop-article-files.js";
import { createDesktopArticleFilesClient } from "./desktop-article-files-client.js";
import { readArticleMarkdown, writeArticleMarkdown } from "../../infrastructure/articles/article-markdown-files.js";


// Product scenarios: history-and-publishing.article-files-native

test("native file client saves and loads whole Markdown, cancels silently, and returns safe errors", async () => {
    const root = await mkdtemp(join(tmpdir(), "warplyn-article-files-"));
    const path = join(root, "café.md");
    const webContents = { mainFrame: {} };
    const window = { webContents } as unknown as BrowserWindow;
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
    try {
        const content = "# café 🙂\n\n[docs](https://example.com)\n\n```ts\nconst value = 34;\n```";
        assert.equal(await client.saveMarkdown({ fileName: "café", content }), "saved");
        assert.equal(await readFile(path, "utf8"), content);
        assert.deepEqual(await client.loadMarkdown(), { fileName: "café.md", content });
        cancel = true;
        assert.equal(await client.loadMarkdown(), null);
        assert.equal(await client.saveMarkdown({ fileName: "café", content: "changed" }), "cancelled");
        assert.equal(await readFile(path, "utf8"), content);
        cancel = false;
        fail = true;
        await assert.rejects(client.loadMarkdown(), { message: "article_file_load_failed", code: "article_file_load_failed" });
        await assert.rejects(client.saveMarkdown({ fileName: "café", content }), { message: "article_file_save_failed" });
        const before = dialogCount;
        assert.deepEqual(await handler(event, { method: "loadMarkdown", path }), { ok: false, error: "invalid_request" });
        assert.deepEqual(await handler({ ...event, senderFrame: {} } as IpcMainInvokeEvent, { method: "loadMarkdown" }), { ok: false, error: "invalid_request" });
        assert.deepEqual(await handler({ ...event, sender: {} } as IpcMainInvokeEvent, { method: "loadMarkdown" }), { ok: false, error: "invalid_request" });
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
        await assert.rejects(writeArticleMarkdown(path, "\0"), { code: "article_file_invalid" });
        assert.equal(await readFile(path, "utf8"), "original");
        await writeArticleMarkdown(path, "replacement");
        assert.equal(await readFile(path, "utf8"), "replacement");
        const directory = join(root, "directory.md");
        await mkdir(directory);
        await writeFile(join(directory, "keep"), "original");
        await assert.rejects(writeArticleMarkdown(directory, "replacement"));
        assert.equal(await readFile(join(directory, "keep"), "utf8"), "original");
        assert.deepEqual((await readdir(root)).sort(), ["directory.md", "existing.md"]);
        await assert.rejects(readArticleMarkdown(directory), { code: "article_file_invalid" });
        await writeFile(path, Uint8Array.of(0xff));
        await assert.rejects(readArticleMarkdown(path), { code: "article_file_invalid" });
        await assert.rejects(readArticleMarkdown(join(root, "file.txt")), { code: "article_file_invalid" });
    } finally {
        await rm(root, { recursive: true, force: true });
    }
});
