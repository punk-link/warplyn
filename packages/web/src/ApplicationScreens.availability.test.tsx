import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { summarizeArticle, type Article, type ArticleSummary } from "@skladno/shared";
import { App } from "./App.js";
import { createArticleFixture, createFakeClient, resetWorkspaceTestEnvironment } from "./workspace/EditorialWorkspace.test-utils.js";


beforeEach(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
afterEach(resetWorkspaceTestEnvironment);


function deferred<T>() {
    let resolve: (value: T) => void = () => undefined;
    let reject: (error: Error) => void = () => undefined;
    const promise = new Promise<T>((complete, fail) => {
        resolve = complete;
        reject = fail;
    });
    return { promise, resolve, reject };
}


function settingsBack() {
    return screen.getAllByRole("button", { name: "Back" }).at(-1)!;
}


// Product scenarios: application.settings-independent-of-articles
it("opens Settings and backups while the Article list is unresolved", async () => {
    const client = createFakeClient();
    const pending = deferred<ArticleSummary[]>();
    client.listArticleSummaries = vi.fn(() => pending.promise);
    const user = userEvent.setup();
    render(<App client={client} />);
    expect(await screen.findByRole("status")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Settings" }));
    expect(await screen.findByRole("heading", { name: "General" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Data & backups" }));
    expect(await screen.findByRole("heading", { name: "Data & backups" })).toBeTruthy();
    expect(client.getArticle).not.toHaveBeenCalled();
});


it("keeps Settings usable when a pending Article load fails, and shows that error only on return", async () => {
    const client = createFakeClient();
    const pending = deferred<ArticleSummary[]>();
    client.listArticleSummaries = vi.fn(() => pending.promise);
    const user = userEvent.setup();
    render(<App client={client} />);
    await user.click(await screen.findByRole("button", { name: "Settings" }));
    await screen.findByRole("heading", { name: "General" });
    await act(async () => pending.reject(new Error("private Article storage failure")));
    expect(screen.getByRole("heading", { name: "General" })).toBeTruthy();
    expect(screen.queryByText("private Article storage failure")).toBeNull();
    await user.click(settingsBack());
    expect(await screen.findByRole("alert")).toHaveTextContent("Your local service is unavailable.");
    await user.click(screen.getByRole("button", { name: "Settings" }));
    expect(await screen.findByRole("heading", { name: "General" })).toBeTruthy();
});


it("opens Settings from an existing Article error and retains that error on return", async () => {
    const client = createFakeClient();
    client.listArticleSummaries = vi.fn().mockRejectedValue(new Error("Article list unavailable"));
    const user = userEvent.setup();
    render(<App client={client} />);
    await screen.findByRole("alert");
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await screen.findByRole("heading", { name: "General" });
    await user.click(settingsBack());
    await screen.findByRole("alert");
});


it("opens the independent Style Profile through its shortcut while Articles are unavailable", async () => {
    const client = createFakeClient();
    client.listArticleSummaries = vi.fn().mockRejectedValue(new Error("Article list unavailable"));
    const user = userEvent.setup();
    render(<App client={client} />);
    await screen.findByRole("alert");
    await user.keyboard("{Control>}5{/Control}");
    expect(await screen.findByRole("heading", { name: "Detected characteristics" })).toBeTruthy();
});


for (const stage of ["list", "body"] as const) {
    it(`keeps Settings mounted when the Article ${stage} finishes, then restores its recoverable Draft`, async () => {
        const client = createFakeClient();
        const article = createArticleFixture("one", "Recovered Article");
        article.draft = { articleId: article.id, baseRevisionId: article.currentRevisionId, content: "Recovered Draft", version: 2,
            updatedAt: article.updatedAt };
        const list = deferred<ArticleSummary[]>();
        const body = deferred<Article>();
        client.listArticleSummaries = vi.fn(() => stage === "list" ? list.promise : Promise.resolve([summarizeArticle(article)]));
        client.getArticle = vi.fn(() => stage === "body" ? body.promise : Promise.resolve(article));
        const user = userEvent.setup();
        render(<App client={client} />);
        await user.click(await screen.findByRole("button", { name: "Settings" }));
        await screen.findByRole("heading", { name: "General" });
        await user.click(screen.getByRole("button", { name: "Key bindings" }));
        await screen.findByRole("heading", { name: "Key bindings" });
        await act(async () => {
            list.resolve([summarizeArticle(article)]);
            body.resolve(article);
        });
        expect(screen.getByRole("heading", { name: "Key bindings" })).toBeTruthy();
        await user.click(settingsBack());
        expect(await screen.findByRole("textbox", { name: "Article draft" })).toHaveTextContent("Recovered Draft");
        expect(screen.getByRole("heading", { name: "Recovered Article" })).toBeTruthy();
    });
}
