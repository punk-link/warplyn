import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ASSISTANT_EVENT, type AssistantMessage } from "@skladno/shared";
import { App } from "../App.js";
import { createArticleFixture, createFakeClient, resetWorkspaceTestEnvironment } from "./EditorialWorkspace.test-utils.js";


// Product scenarios: editorial-workflows.fresh-translation, history-and-publishing.translation-results-recovery
describe("fresh translations through Assistant", () => {
    afterEach(resetWorkspaceTestEnvironment);

    it("retains same-Revision results after failure, cancellation, rejection, and reload", async () => {
        const user = userEvent.setup();
        const client = createFakeClient();
        const source = { ...createArticleFixture("one", "First Article"), language: "en" };
        client.listArticles = vi.fn().mockResolvedValue([source]);
        const history: AssistantMessage[] = [];
        client.listAssistantMessages = vi.fn(async () => [...history]);
        let outcome: "complete" | "fail" | "wait" = "complete";
        client.streamAssistantRequest = vi.fn(async (_id, request, onEvent, signal) => {
            if (outcome === "fail")
                throw new Error("Fixture failure");

            if (outcome === "wait") {
                await new Promise<void>((resolve) => signal?.addEventListener("abort", () => resolve(), { once: true }));
                return;
            }

            const number = history.length + 1;
            const message: AssistantMessage = {
                id: `message-${number}`, articleId: source.id, requestId: request.requestId, role: "assistant", kind: "response", status: "completed",
                responseKind: "translation_proposal_prepared", baseRevisionId: source.currentRevisionId, editorialArtifactId: `artifact-${number}`,
                translation: { content: `Spanish result ${number}`, metadata: { targetLanguage: "Spanish", protectedSpans: [] } },
                createdAt: `2026-01-01T0${number}:00:00Z`, updatedAt: `2026-01-01T0${number}:00:00Z`,
            };
            history.push(message);
            onEvent({ type: ASSISTANT_EVENT.COMPLETED, requestId: request.requestId, messageId: message.id, responseKind: "translation_proposal_prepared", editorialArtifactId: message.editorialArtifactId, result: { translation: message.translation } });
        });
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 3, view: "translations", selectedArticleId: source.id }));
        localStorage.setItem("skladno.quick-start.v1", "complete");
        const workspace = render(<App client={client} />);
        await screen.findByRole("heading", { name: source.title });
        const generate = async () => {
            await user.click(screen.getByRole("button", { name: "New translation…" }));
            const spanish = within(screen.getByRole("dialog")).getByRole("checkbox", { name: "Spanish" });
            if (!(spanish instanceof HTMLInputElement) || !spanish.checked)
                await user.click(spanish);

            await user.click(screen.getByRole("button", { name: "Generate Spanish translation" }));
        };
        await generate();
        await screen.findByText("Spanish result 1");
        await generate();
        await screen.findByText("Spanish result 2");
        await user.click(screen.getByRole("button", { name: "Translation result" }));
        await user.click(screen.getAllByRole("menuitemradio")[1]!);
        outcome = "fail";
        await generate();
        await screen.findByRole("alert");
        expect(screen.getByText("Spanish result 1")).toBeTruthy();
        outcome = "wait";
        await generate();
        await waitFor(() => expect(client.streamAssistantRequest).toHaveBeenCalledTimes(4));
        await user.click(screen.getByRole("button", { name: "Stop request" }));
        await waitFor(() => expect(screen.queryByRole("button", { name: "Stop request" })).toBeNull());
        expect(screen.getByText("Spanish result 1")).toBeTruthy();
        const requests = vi.mocked(client.streamAssistantRequest).mock.calls.map(([, request]) => request);
        expect(new Set(requests.map((request) => request.requestId)).size).toBe(4);
        expect(requests.every((request) => request.kind === "new" && request.scope.kind === "article" && request.scope.baseRevisionId === source.currentRevisionId)).toBe(true);
        expect(client.saveArticleRevision).not.toHaveBeenCalled();
        workspace.unmount();
        render(<App client={client} />);
        await screen.findByText("Spanish result 2");
        await user.click(screen.getByRole("button", { name: "Translation result" }));
        await user.click(screen.getAllByRole("menuitemradio")[1]!);
        client.rejectTranslation = vi.fn(async (_id, artifactId) => {
            const rejected = history.find((message) => message.editorialArtifactId === artifactId);
            if (rejected)
                rejected.status = "rejected";
        });
        await user.click(screen.getByRole("button", { name: "Reject" }));
        await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Reject" }));
        expect(client.rejectTranslation).toHaveBeenCalledWith(source.id, "artifact-1");
        await screen.findByText("Spanish result 2");
        expect(history[1]?.status).toBe("completed");
    }, 15_000);
});
