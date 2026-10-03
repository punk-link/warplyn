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
