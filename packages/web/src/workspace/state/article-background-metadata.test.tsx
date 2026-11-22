import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import type { PropsWithChildren } from "react";
import { summarizeArticle, type ArticleSummary } from "@skladno/shared";
import { afterEach, expect, it, vi } from "vitest";
import { messages } from "../../i18n/messages.js";
import { NotificationProvider } from "../../notifications/NotificationProvider.js";
import { createArticleFixture, createFakeClient } from "../EditorialWorkspace.test-utils.js";
import { useArticleWorkspace } from "./article-workspace-state.js";


function Wrapper({ children }: PropsWithChildren) {
    return <IntlProvider locale="en" messages={messages}><NotificationProvider>{children}</NotificationProvider></IntlProvider>;
}


afterEach(cleanup);


it("refreshes a pending Library title after reload without loading its Article body", async () => {
    const client = createFakeClient();
    const source = createArticleFixture("source", "");
    const other = createArticleFixture("other", "Other");
    client.listArticleSummaries = vi.fn().mockResolvedValueOnce([
        { ...summarizeArticle(source), titleGeneration: { status: "pending" } }, summarizeArticle(other),
    ]).mockResolvedValue([{ ...summarizeArticle(source), title: "Generated title" }, summarizeArticle(other)]);
    client.getArticle = vi.fn().mockResolvedValue(other);
    const { result } = renderHook(() => useArticleWorkspace(client, other.id, vi.fn(), "en"), { wrapper: Wrapper });
    await waitFor(() => expect(result.current.state).toBe("ready"));
    await waitFor(() => expect(result.current.articles.find((article) => article.id === source.id)?.title).toBe("Generated title"));
    expect(client.getArticle).toHaveBeenCalledTimes(1);
    expect(client.getArticle).toHaveBeenCalledWith(other.id);
    expect(result.current.selectedArticleId).toBe(other.id);
});


it("late metadata refresh preserves typing, checkpoints and Article navigation", async () => {
    const client = createFakeClient();
    const source = createArticleFixture("source", "");
    const other = createArticleFixture("other", "Other");
    let completed = false;
    client.listArticleSummaries = vi.fn(async () => [completed ? { ...source, title: "Generated title" } : source, other].map(summarizeArticle));
    client.getArticle = vi.fn(async (id) => {
        if (id === other.id)
            return other;

        return source;
    });
    client.saveArticleDraft = vi.fn(async (_id, input) => ({
        ...input, articleId: source.id, version: 1, updatedAt: source.updatedAt,
    }));
    const { result } = renderHook(() => useArticleWorkspace(client, source.id, vi.fn(), "en"), { wrapper: Wrapper });
    await waitFor(() => expect(result.current.state).toBe("ready"));
    act(() => {
        result.current.updateRevision(source.id, { ...source.currentRevision, titleGeneration: { status: "pending" } });
        result.current.setContent("Keep typing while metadata runs");
    });
    await act(async () => {
        await result.current.flushSelected();
    });
    act(() => result.current.selectArticle(other.id));
    await waitFor(() => expect(result.current.selectedArticle?.id).toBe(other.id));
    completed = true;
    await waitFor(() => expect(result.current.articles.find((article) => article.id === source.id)?.title).toBe("Generated title"));
    act(() => result.current.selectArticle(source.id));
    expect(result.current.content).toBe("Keep typing while metadata runs");
    expect(result.current.selectedArticle?.draft?.content).toBe("Keep typing while metadata runs");
});


it("a metadata response racing an Author rename cannot replace it", async () => {
    const client = createFakeClient();
    const source = createArticleFixture("source", "");
    let finish: (articles: ArticleSummary[]) => void = () => undefined;
    client.listArticleSummaries = vi.fn().mockResolvedValueOnce([summarizeArticle(source)])
        .mockImplementation(() => new Promise<ArticleSummary[]>((resolve) => {
            finish = resolve;
        }));
    client.getArticle = vi.fn().mockResolvedValue(source);
    client.updateArticle = vi.fn().mockResolvedValue({ ...source, title: "Author title" });
    const { result } = renderHook(() => useArticleWorkspace(client, source.id, vi.fn(), "en"), { wrapper: Wrapper });
    await waitFor(() => expect(result.current.state).toBe("ready"));
    act(() => result.current.updateRevision(source.id, { ...source.currentRevision, titleGeneration: { status: "pending" } }));
    await waitFor(() => expect(client.listArticleSummaries).toHaveBeenCalledTimes(2));
    await act(async () => {
        await result.current.updateArticle(source.id, { title: "Author title" });
    });
    await act(async () => {
        finish([summarizeArticle({ ...source, title: "Generated title" })]);
    });
    expect(result.current.selectedArticle?.title).toBe("Author title");
});
