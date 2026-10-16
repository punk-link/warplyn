import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { App } from "../App.js";
import { createArticleFixture, createFakeClient, resetWorkspaceTestEnvironment } from "./EditorialWorkspace.test-utils.js";

afterEach(resetWorkspaceTestEnvironment);

it("local typography bypasses saving and model summaries", async () => {
    const user = userEvent.setup();
    const client = createFakeClient();
    const source = { ...createArticleFixture("one", "First Article"), language: "en" };
    client.listArticles = vi.fn().mockResolvedValue([source]);
    client.getStyleCorpus = vi
        .fn()
        .mockResolvedValue({
            items: [],
            rules: "",
            status: "ready",
            typographyRules: [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }],
            typographyConfiguration: { version: 1, languages: { en: {
                rules: [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }], disabled: [],
            } } },
        });
    client.streamEditorial = vi.fn(async (_articleId, input, emit) => {
        emit({
            type: "completed",
            requestId: input.requestId,
            responseId: "local:fixture",
            text: "Draft",
            editorialArtifactId: "fixture-artifact",
            styleReview: {
                findings: [],
                typography: { local: true, rules: [], changes: [], occurrences: [], skipped: 0, contextualRuleIds: [] },
            },
        });
    });
    render(<App client={client} />);
    await screen.findByRole("heading", { name: "First Article" });
    await user.click(screen.getByRole("button", { name: "Style Profile" }));
    await user.click(screen.getByRole("button", { name: "Typography rules" }));
    await user.click(await screen.findByRole("button", { name: "Check typography" }));
    await waitFor(() => expect(client.streamEditorial).toHaveBeenCalledOnce());
    expect(vi.mocked(client.streamEditorial).mock.calls[0]?.[1].reviewMode).toBe("typography");
    expect(client.saveArticleRevision).not.toHaveBeenCalled();
    expect(client.summarizeProposal).not.toHaveBeenCalled();
});


it("local checking asks to save a changed Draft without saving or invoking an engine", async () => {
    const user = userEvent.setup();
    const client = createFakeClient();
    const article = createArticleFixture("one", "First Article");
    article.language = "en";
    article.draft = { articleId: article.id, baseRevisionId: article.currentRevisionId, content: "Changed Draft", version: 1, updatedAt: article.updatedAt };
    client.listArticles = vi.fn().mockResolvedValue([article]);
    client.saveArticleDraft = vi.fn().mockResolvedValue(article.draft);
    client.getStyleCorpus = vi
        .fn()
        .mockResolvedValue({
            items: [],
            rules: "",
            status: "ready",
            typographyRules: [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }],
            typographyConfiguration: { version: 1, languages: { en: {
                rules: [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }], disabled: [],
            } } },
        });
    render(<App client={client} />);
    await screen.findByRole("heading", { name: "First Article" });
    await user.click(screen.getByRole("button", { name: "Style Profile" }));
    await user.click(screen.getByRole("button", { name: "Typography rules" }));
    await user.click(screen.getByRole("button", { name: "Check typography" }));
    expect(await screen.findByText("Save the current Draft before checking typography. The local check uses the saved Revision.")).toBeTruthy();
    expect(client.streamEditorial).not.toHaveBeenCalled();
    expect(client.saveArticleRevision).not.toHaveBeenCalled();
});
