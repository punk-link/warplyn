import { describe, expect, it } from "vitest";
import { runTranslationBatch } from "./translation-request-batch.js";


describe("parallel translation requests", () => {
    it("runs at most three languages together, deduplicates, and waits for every result", async () => {
        const releases: (() => void)[] = [];
        const started: string[] = [];
        const batch = runTranslationBatch(["es", "de", "fr", "it", "es"], new AbortController().signal, async (language) => {
            started.push(language);
            await new Promise<void>((resolve) => releases.push(resolve));
        });
        expect(started).toEqual(["es", "de", "fr"]);
        releases[0]();
        await Promise.resolve();
        await Promise.resolve();
        expect(started).toEqual(["es", "de", "fr", "it"]);
        releases.slice(1).forEach((release) => release());
        await batch;
    });

    it("keeps successful results when another language fails", async () => {
        const completed: string[] = [];
        const failure = new Error("failed");
        await expect(runTranslationBatch(["es", "de", "fr", "it"], new AbortController().signal, async (language) => {
            if (language === "de")
                throw failure;

            completed.push(language);
        })).rejects.toBe(failure);
        expect(completed).toEqual(["es", "fr", "it"]);
    });

    it("cancels active work and starts no queued languages", async () => {
        const controller = new AbortController();
        const started: string[] = [];
        const batch = runTranslationBatch(["es", "de", "fr", "it"], controller.signal, async (language) => {
            started.push(language);
            await new Promise<void>((resolve) => controller.signal.addEventListener("abort", () => resolve(), { once: true }));
            controller.signal.throwIfAborted();
        });
        controller.abort();
        await expect(batch).rejects.toMatchObject({ name: "AbortError" });
        expect(started).toEqual(["es", "de", "fr"]);
    });
});
