import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import type { PropsWithChildren } from "react";
import { summarizeArticle } from "@skladno/shared";
import { afterEach, describe, expect, it, vi } from "vitest";
import { messages } from "../../i18n/messages.js";
import { NotificationProvider } from "../../notifications/NotificationProvider.js";
import { createArticleFixture, createFakeClient } from "../EditorialWorkspace.test-utils.js";
import { useArticleWorkspace } from "./article-workspace-state.js";


function Wrapper({ children }: PropsWithChildren) {
    return <IntlProvider locale="en" messages={messages}><NotificationProvider>{children}</NotificationProvider></IntlProvider>;
}


describe("Article body loading", () => {
    afterEach(cleanup);

    // Product scenarios: workspace.library.create-and-select, workspace.draft.flush-before-context-change
    it("keeps the newest Article first when leaving an unchanged older Draft", async () => {
        const client = createFakeClient();
        const newest = createArticleFixture("newest", "Newest");
        newest.updatedAt = "2026-01-03T00:00:00.000Z";
        const older = createArticleFixture("older", "Older");
        older.updatedAt = "2026-01-01T00:00:00.000Z";
        older.draft = { articleId: older.id, baseRevisionId: older.currentRevisionId, content: "Recovered Draft", version: 1,
            updatedAt: "2026-01-02T00:00:00.000Z" };
        client.listArticleSummaries = vi.fn().mockResolvedValue([newest, older].map(summarizeArticle));
        client.getArticle = vi.fn(async (id: string) => id === newest.id ? newest : older);
        client.saveArticleDraft = vi.fn().mockResolvedValue({ ...older.draft, version: 2, updatedAt: "2026-01-04T00:00:00.000Z" });
        const { result } = renderHook(() => useArticleWorkspace(client, newest.id, vi.fn(), "en"), { wrapper: Wrapper });
        await waitFor(() => expect(result.current.state).toBe("ready"));

        act(() => result.current.selectArticle(older.id));
        await waitFor(() => expect(result.current.content).toBe("Recovered Draft"));
        await act(async () => {
            await result.current.flushSelected();
            result.current.selectArticle(newest.id);
        });
        expect(result.current.articles.map((article) => article.id)).toEqual([newest.id, older.id]);
        expect(client.saveArticleDraft).not.toHaveBeenCalled();
        expect(client.discardArticleDraft).not.toHaveBeenCalled();
    });

    it("loads only the selected body, restores Drafts, and retains edits when switching", async () => {
        const client = createFakeClient();
        const first = createArticleFixture("first", "First");
        const second = createArticleFixture("second", "Second");
        second.draft = { articleId: second.id, baseRevisionId: second.currentRevisionId, content: "Recovered Draft", version: 1, updatedAt: second.updatedAt };
        client.listArticleSummaries = vi.fn().mockResolvedValue([first, second].map(summarizeArticle));
        client.getArticle = vi.fn(async (id: string) => id === first.id ? first : second);
        client.saveArticleDraft = vi.fn().mockResolvedValue({ ...second.draft, content: "Edited Draft", version: 2 });
        const persist = vi.fn();
        const { result } = renderHook(() => useArticleWorkspace(client, first.id, persist, "en"), { wrapper: Wrapper });
        await waitFor(() => expect(result.current.state).toBe("ready"));
        expect(client.getArticle).toHaveBeenCalledTimes(1);
        expect(client.listArticles).not.toHaveBeenCalled();
        expect(result.current.articles.every((article) => !("currentRevision" in article))).toBe(true);

        act(() => result.current.selectArticle(second.id));
        await waitFor(() => expect(result.current.content).toBe("Recovered Draft"));
        act(() => result.current.setContent("Edited Draft"));
        act(() => result.current.selectArticle(first.id));
        await waitFor(() => expect(client.saveArticleDraft).toHaveBeenCalled());
        act(() => result.current.selectArticle(second.id));
        await waitFor(() => expect(result.current.content).toBe("Edited Draft"));
        expect(client.getArticle).toHaveBeenCalledTimes(2);
        expect(result.current.articles.every((article) => !article.draft || !("content" in article.draft))).toBe(true);
        await act(async () => result.current.flushSelected());
    });

    it("hydrates an unvisited Article returned by a metadata update", async () => {
        const client = createFakeClient();
        const first = createArticleFixture("first", "First");
        const second = createArticleFixture("second", "Second");
        second.currentRevision.content = "Unvisited body";
        client.listArticleSummaries = vi.fn().mockResolvedValue([first, second].map(summarizeArticle));
        client.getArticle = vi.fn().mockResolvedValue(first);
        client.setArticlePinned = vi.fn().mockResolvedValue(second);
        const { result } = renderHook(() => useArticleWorkspace(client, first.id, vi.fn(), "en"), { wrapper: Wrapper });
        await waitFor(() => expect(result.current.state).toBe("ready"));
        await act(async () => result.current.setPinned(second.id, true));
        act(() => result.current.selectArticle(second.id));
        await waitFor(() => expect(result.current.content).toBe("Unvisited body"));
        expect(client.getArticle).toHaveBeenCalledTimes(1);
    });
});
