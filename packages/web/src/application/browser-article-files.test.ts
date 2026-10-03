import { afterEach, describe, expect, it, vi } from "vitest";
import { ApplicationClientError, type ArticleFilesClient } from "@skladno/shared";
import { createBrowserArticleFilesClient } from "./browser-article-files.js";
import { createRendererArticleFilesClient } from "./article-files-client.js";


afterEach(() => {
    document.querySelectorAll("input[type=file],a[download]").forEach((element) => element.remove());
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
});


function chooseFile(name: string, bytes: Uint8Array, failure = false) {
    const input = document.querySelector<HTMLInputElement>("input[type=file]");
    const file = new File([bytes.slice().buffer], name);
    Object.defineProperty(file, "arrayBuffer", { value: () => failure ? Promise.reject(new Error("private")) : Promise.resolve(bytes.slice().buffer) });
    Object.defineProperty(input, "files", { value: [file] });
    input?.dispatchEvent(new Event("change"));
}


describe("browser Article files", () => {
    it("imports Unicode Markdown, handles cancellation and reselection, and maps failures", async () => {
        vi.spyOn(HTMLInputElement.prototype, "click").mockImplementation(() => undefined);
        const client = createBrowserArticleFilesClient();
        const content = "\uFEFF# café 🙂\r\n\r\n`code`";
        for (let index = 0; index < 2; index++) {
            const result = client.loadMarkdown();
            chooseFile("café.md", new TextEncoder().encode(content));
            await expect(result).resolves.toEqual({ fileName: "café.md", content: "# café 🙂\n\n`code`" });
        }

        const cancelled = client.loadMarkdown();
        document.querySelector("input[type=file]")?.dispatchEvent(new Event("cancel"));
        await expect(cancelled).resolves.toBeNull();
        expect(document.querySelector("input[type=file]")).toBeNull();
        const invalid = client.loadMarkdown();
        chooseFile("file.md", Uint8Array.of(0xff));
        await expect(invalid).rejects.toMatchObject({ code: "article_file_invalid" });
        const failed = client.loadMarkdown();
        chooseFile("file.md", new Uint8Array(), true);
        await expect(failed).rejects.toMatchObject({ code: "article_file_load_failed", message: "article_file_load_failed" });
    });

    it("downloads whole Markdown with a safe filename and releases the object URL", async () => {
        vi.useFakeTimers();
        const createObjectURL = vi.fn((blob: Blob) => {
            expect(blob.type).toBe("text/markdown;charset=utf-8");
            return "blob:test";
        });
        const revokeObjectURL = vi.fn();
        vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });
        const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
            expect(this.download).toBe("Article_CON.md");
            expect(this.href).toBe("blob:test");
        });
        await expect(createBrowserArticleFilesClient().saveMarkdown({ fileName: "CON", content: "whole **Article** 🙂" })).resolves.toBe("download-started");
        expect(click).toHaveBeenCalledOnce();
        expect(createObjectURL.mock.calls[0]?.[0]).toBeInstanceOf(Blob);
        expect(document.querySelector("a[download]")).toBeNull();
        vi.runAllTimers();
        expect(revokeObjectURL).toHaveBeenCalledWith("blob:test");
    });

    it("chooses the desktop bridge and restores safe errors transferred by contextBridge", async () => {
        const desktop: ArticleFilesClient = { loadMarkdown: vi.fn().mockResolvedValue(null), saveMarkdown: vi.fn().mockRejectedValue(new Error("article_file_invalid")) };
        const client = createRendererArticleFilesClient({ skladnoArticleFiles: desktop });
        await expect(client.loadMarkdown()).resolves.toBeNull();
        expect(desktop.loadMarkdown).toHaveBeenCalledOnce();
        await expect(client.saveMarkdown({ fileName: "file.md", content: "text" })).rejects.toBeInstanceOf(ApplicationClientError);
        expect(createRendererArticleFilesClient({})).toHaveProperty("saveMarkdown");
        expect(new ApplicationClientError("article_file_invalid", undefined, 400).message).toBe("article_file_invalid");
    });
});
