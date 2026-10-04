import { afterEach, expect, it, vi } from "vitest";
import { runArticleFileWorker } from "./article-file-worker-client.js";


afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
});


it("terminates a stalled parser and returns only a safe retry error", async () => {
    vi.useFakeTimers();
    const terminate = vi.fn();


    class StalledWorker {
        terminate = terminate;


        postMessage = vi.fn();
    }


    vi.stubGlobal("Worker", StalledWorker);
    const result = runArticleFileWorker("rtf", Uint8Array.of(123));
    const rejected = expect(result).rejects.toMatchObject({ code: "article_file_load_failed" });
    await vi.advanceTimersByTimeAsync(15_000);
    await rejected;
    expect(terminate).toHaveBeenCalledOnce();
});
