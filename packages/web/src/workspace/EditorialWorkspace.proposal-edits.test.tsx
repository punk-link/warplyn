import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { App } from "../App.js";
import { createArticleFixture, createFakeClient, resetWorkspaceTestEnvironment } from "./EditorialWorkspace.test-utils.js";


function proposalClient() {
    const client = createFakeClient();
    const article = createArticleFixture("one", "First Article");
    article.currentRevision.content = "First\n\nAnchor\n\nLast";
    client.listArticles = vi.fn().mockImplementation(async () => [article]);
    client.listAssistantMessages = vi.fn().mockResolvedValue([{
        id: "message", articleId: "one", requestId: "request", role: "assistant", kind: "response", status: "completed",
        responseKind: "proposal_prepared", editorialArtifactId: "artifact", baseRevisionId: "one-revision",
        baseRevisionContent: article.currentRevision.content, proposalContent: "Generated first\n\nAnchor\n\nGenerated last",
        createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z",
    }]);
    client.acceptProposal = vi.fn(async (_id, input) => {
        const revision = { id: "accepted", articleId: "one", content: input.content, provenance: input.provenance,
            createdAt: "2026-01-01T00:01:00.000Z" };
        article.currentRevision = revision;
        article.currentRevisionId = revision.id;
        return revision;
    });
    localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 3, libraryWidth: 208, assistantWidth: 384,
        libraryCollapsed: false, assistantCollapsed: false, proposalWarningsDismissed: false, view: "proposal", selectedArticleId: "one" }));
    return client;
}


describe("Author edits in Proposal Review", () => {
    afterEach(resetWorkspaceTestEnvironment);

    // Product scenarios: workspace.proposal.edit-before-apply, workspace.proposal.accepted-restart
    it("applies only accepted edits and recovers their exact text after restart", async () => {
        const client = proposalClient();
        const user = userEvent.setup();
        const mounted = render(<App client={client} />);
        const first = await screen.findByRole("textbox", { name: "Proposed text for change 1" });
        await user.clear(first);
        await user.type(first, "Author first{enter}Second line");
        fireEvent.change(screen.getByRole("textbox", { name: "Proposed text for change 2" }), { target: { value: "Rejected edit" } });
        expect(client.acceptProposal).not.toHaveBeenCalled();
        expect(client.saveArticleDraft).not.toHaveBeenCalled();
        await user.click(screen.getByRole("button", { name: "Stacked" }));
        expect(screen.getByRole("textbox", { name: "Proposed text for change 1" })).toHaveValue("Author first\nSecond line");
        await user.click(screen.getByRole("button", { name: "Highlight changes" }));
        const cards = screen.getAllByRole("article");
        await user.click(within(cards[0]!).getByRole("button", { name: "Accept" }));
        await user.click(within(cards[1]!).getByRole("button", { name: "Reject" }));
        await user.click(screen.getByRole("button", { name: "Apply" }));
        await waitFor(() => expect(client.acceptProposal).toHaveBeenCalledTimes(1));
        expect(client.acceptProposal).toHaveBeenCalledWith("one", expect.objectContaining({
            content: "Author first\nSecond line\n\nAnchor\n\nLast",
            provenance: expect.objectContaining({ acceptedChangeIds: ["change-1"], proposalReplacements: { "change-1": "Author first\nSecond line" } }),
        }));
        expect(await screen.findByRole("textbox", { name: "Article draft" })).toHaveTextContent("Author first");
        expect(screen.queryByRole("heading", { name: "Proposal Review" })).toBeNull();
        mounted.unmount();
        render(<App client={client} />);
        await user.click(await screen.findByRole("tab", { name: "Proposals" }));
        await screen.findByText("This proposal was accepted. Its decisions are read-only.");
        expect(screen.getByRole("textbox", { name: "Proposed text for change 1" })).toHaveValue("Author first\nSecond line");
        expect(screen.getByRole("textbox", { name: "Proposed text for change 1" })).toBeDisabled();
    });

    it.each(["Mark all accepted", "Mark all rejected"])("resets %s to Pending without losing proposed edits", async (decision) => {
        const client = proposalClient();
        const user = userEvent.setup();
        render(<App client={client} />);
        const first = await screen.findByRole("textbox", { name: "Proposed text for change 1" });
        fireEvent.change(first, { target: { value: "Retained Author edit" } });
        await user.click(screen.getByRole("button", { name: "Set all decisions…" }));
        await user.click(screen.getByRole("menuitem", { name: decision }));
        await user.click(screen.getByRole("button", { name: "Set all decisions…" }));
        await user.click(screen.getByRole("menuitem", { name: "Reset all decisions" }));

        expect(screen.getAllByText("Pending")).toHaveLength(2);
        expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
        expect(first).toHaveValue("Retained Author edit");
        expect(client.acceptProposal).not.toHaveBeenCalled();
        expect(client.saveArticleDraft).not.toHaveBeenCalled();
    });

    it.each(["bulk", "individual"])("finishes an all-rejected review through %s decisions without a Revision", async (mode) => {
        const client = proposalClient();
        const user = userEvent.setup();
        render(<App client={client} />);
        await screen.findByRole("textbox", { name: "Proposed text for change 1" });
        expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
        if (mode === "bulk") {
            await user.click(screen.getByRole("button", { name: "Set all decisions…" }));
            await user.click(screen.getByRole("menuitem", { name: "Mark all rejected" }));
        } else {
            const cards = screen.getAllByRole("article");
            await user.click(within(cards[0]!).getByRole("button", { name: "Reject" }));
            expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
            await user.click(within(cards[1]!).getByRole("button", { name: "Reject" }));
        }

        await user.click(screen.getByRole("button", { name: "Apply" }));
        expect(screen.queryByRole("heading", { name: "Proposal Review" })).toBeNull();
        expect(client.acceptProposal).not.toHaveBeenCalled();
        expect(client.saveArticleDraft).not.toHaveBeenCalled();
    });

    it("keeps edits on failure and bulk acceptance uses the latest empty replacement", async () => {
        const client = proposalClient();
        const accept = client.acceptProposal;
        client.acceptProposal = vi.fn().mockRejectedValueOnce(new Error("Failure")).mockImplementation(accept);
        const user = userEvent.setup();
        render(<App client={client} />);
        const first = await screen.findByRole("textbox", { name: "Proposed text for change 1" });
        fireEvent.change(first, { target: { value: "Retry edit" } });
        await user.click(screen.getByRole("button", { name: "Set all decisions…" }));
        await user.click(screen.getByRole("menuitem", { name: "Mark all accepted" }));
        await user.click(screen.getByRole("button", { name: "Apply" }));
        await waitFor(() => expect(screen.getByRole("button", { name: "Apply" })).toBeEnabled());
        expect(first).toHaveValue("Retry edit");
        fireEvent.change(first, { target: { value: "" } });
        await user.click(screen.getByRole("button", { name: "Set all decisions…" }));
        await user.click(screen.getByRole("menuitem", { name: "Mark all accepted" }));
        await user.click(screen.getByRole("button", { name: "Apply" }));
        await screen.findByRole("textbox", { name: "Article draft" });
        expect(screen.queryByRole("heading", { name: "Proposal Review" })).toBeNull();
        expect(client.acceptProposal).toHaveBeenLastCalledWith("one", expect.objectContaining({ content: "\nAnchor\n\nGenerated last" }));
    });

    it("finishes acceptance for its Article after navigation without replacing another Article's text", async () => {
        const client = proposalClient();
        const listArticles = client.listArticles;
        const listMessages = client.listAssistantMessages;
        client.listArticles = vi.fn(async () => [...await listArticles(), createArticleFixture("two", "Second Article")]);
        client.listAssistantMessages = vi.fn(async (id) => id === "one" ? listMessages(id) : []);
        const accept = client.acceptProposal;
        let release: (() => void) | undefined;
        client.acceptProposal = vi.fn(async (...args: Parameters<typeof accept>) => {
            await new Promise<void>((resolve) => {
                release = resolve;
            });
            return accept(...args);
        });
        const user = userEvent.setup();
        render(<App client={client} />);
        const first = await screen.findByRole("textbox", { name: "Proposed text for change 1" });
        fireEvent.change(first, { target: { value: "Accepted while away" } });
        await user.click(screen.getByRole("button", { name: "Set all decisions…" }));
        await user.click(screen.getByRole("menuitem", { name: "Mark all accepted" }));
        await user.click(screen.getByRole("button", { name: "Apply" }));
        await waitFor(() => expect(client.acceptProposal).toHaveBeenCalledOnce());
        expect(first).toBeDisabled();
        const secondArticlePattern = /Second Article/;
        await user.click(screen.getByRole("button", { name: secondArticlePattern }));
        await screen.findByRole("heading", { name: "Second Article" });
        await act(async () => release?.());
        await user.click(screen.getByRole("tab", { name: "Write" }));
        expect(screen.getByRole("textbox", { name: "Article draft" })).toHaveTextContent("Draft");
        const firstArticlePattern = /First Article/;
        await user.click(screen.getByRole("button", { name: firstArticlePattern }));
        expect(await screen.findByRole("textbox", { name: "Article draft" })).toHaveTextContent("Accepted while away");
    });
});
