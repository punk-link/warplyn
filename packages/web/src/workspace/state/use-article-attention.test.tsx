import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { createArticleFixture, createFakeClient } from "../EditorialWorkspace.test-utils.js";
import { useArticleAttention } from "./use-article-attention.js";
import { combineArticleAttention } from "./article-attention.js";


afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    localStorage.clear();
});


it("clears a source group's notifications across reloads and shows new responses", async () => {
    const client = createFakeClient();
    const source = createArticleFixture("one", "One");
    const child = { ...createArticleFixture("two", "Two"), sourceArticleId: "one" };
    const articles = [source, child];
    let latestResponse = "2026:first";
    client.listArticleSummaries = vi.fn(async () => articles.map((article) => ({ ...article,
        attention: { review: true, translation: false, findings: false, failed: false, latestResponse },
    })));
    const requests = { stateByArticle: { one: "idle" as const }, messagesByArticle: {} };
    const first = renderHook(() => useArticleAttention(client, articles, requests));
    await waitFor(() => expect(first.result.current.byArticle.two?.review).toBe(true));
    act(() => first.result.current.clearNotification("one"));
    expect(first.result.current.byArticle.one).toMatchObject({ review: false, unread: false });
    expect(first.result.current.byArticle.two).toMatchObject({ review: false, unread: false });
    first.unmount();
    const restartedRequests = { stateByArticle: {}, messagesByArticle: {} };
    const restarted = renderHook(() => useArticleAttention(client, articles, restartedRequests));
    await waitFor(() => expect(client.listArticleSummaries).toHaveBeenCalledTimes(2));
    expect(restarted.result.current.byArticle.one?.review).toBe(false);
    latestResponse = "2026:second";
    await act(async () => {
        window.dispatchEvent(new Event("focus"));
    });
    await waitFor(() => expect(restarted.result.current.byArticle.one?.unread).toBe(true));
});


it("retains attention after refresh failure and keeps read receipts in memory when storage fails", async () => {
    const client = createFakeClient();
    const articles = [createArticleFixture("one", "One")];
    const summaries = articles.map((article) => ({ ...article,
        attention: { review: true, translation: false, findings: false, failed: false, latestResponse: "2026:response" },
    }));
    client.listArticleSummaries = vi.fn().mockResolvedValueOnce(summaries).mockRejectedValue(new Error("Unavailable"));
    const requests = { stateByArticle: {}, messagesByArticle: {} };
    const { result } = renderHook(() => useArticleAttention(client, articles, requests));
    await waitFor(() => expect(result.current.byArticle.one?.unread).toBe(true));
    await act(async () => {
        window.dispatchEvent(new Event("focus"));
    });
    expect(client.listArticleSummaries).toHaveBeenCalledTimes(2);
    expect(result.current.byArticle.one).toMatchObject({ unread: true, review: true });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Storage unavailable");
    });
    act(() => result.current.markSeen("one", "2026:response"));
    expect(result.current.byArticle.one).toMatchObject({ unread: false, review: true });
});


it("persists seen responses while retaining review work and isolating running Articles", async () => {
    const client = createFakeClient();
    const articles = [createArticleFixture("one", "One"), createArticleFixture("two", "Two")];
    client.listArticleSummaries = vi.fn().mockResolvedValue(articles.map((article) => ({ ...article,
        attention: { review: true, translation: true, findings: false, failed: false, latestResponse: "2026:response" },
    })));
    const requests = { stateByArticle: { two: "streaming" as const }, messagesByArticle: {} };
    const first = renderHook(() => useArticleAttention(client, articles, requests));
    await waitFor(() => expect(first.result.current.byArticle.one?.unread).toBe(true));
    expect(first.result.current.byArticle.one?.running).toBe(false);
    expect(first.result.current.byArticle.two?.running).toBe(true);
    act(() => first.result.current.markSeen("one", "2026:response"));
    expect(first.result.current.byArticle.one).toMatchObject({ unread: false, review: true, translation: true });
    expect(first.result.current.byArticle.two?.unread).toBe(true);
    first.unmount();
    const restarted = renderHook(() => useArticleAttention(client, articles, requests));
    await waitFor(() => expect(restarted.result.current.byArticle.one?.review).toBe(true));
    expect(restarted.result.current.byArticle.one?.unread).toBe(false);
    expect(combineArticleAttention([restarted.result.current.byArticle.one, restarted.result.current.byArticle.two]))
        .toMatchObject({ running: true, unread: true, translation: true });
});
