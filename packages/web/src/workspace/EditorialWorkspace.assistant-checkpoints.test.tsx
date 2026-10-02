import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, expect, it, vi } from "vitest";
import { APPLICATION_ERROR, ApplicationClientError, type AssistantMessage } from "@skladno/shared";
import { App } from "../App.js";
import { getMessage } from "../i18n/test-message.js";
import { createArticleFixture, createFakeClient, resetWorkspaceTestEnvironment } from "./EditorialWorkspace.test-utils.js";

afterEach(resetWorkspaceTestEnvironment);

beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
        this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn();
});

it.each([true, false])("clears request feedback only after a successful checkpoint restore, success=%s", async (succeeds) => {
    const client = createFakeClient();
    const article = createArticleFixture("one", "First Article");
    const authorMessage = {
        id: "author-message", requestId: "failed-request", articleId: article.id, role: "author", kind: "message", status: "completed",
        content: "Review this Article", createdAt: article.createdAt, updatedAt: article.updatedAt,
    } satisfies AssistantMessage;
    const composer = { text: authorMessage.content, usedSelection: false };
    client.listAssistantMessages = vi.fn().mockResolvedValue([authorMessage]);
    client.streamAssistantRequest = vi.fn().mockRejectedValue(new ApplicationClientError(APPLICATION_ERROR.ACTIVE_CONNECTION_REQUIRED, undefined, 400));
    client.previewAssistantCheckpoint = vi.fn().mockResolvedValue({
        messageId: authorMessage.id, tailToken: "tail", composer, draftDecisionRequired: false,
        counts: { messages: 1, requests: 1, proposals: 0, findings: 0, translations: 0, retries: 0 },
    });
    client.restoreAssistantCheckpoint = succeeds
        ? vi.fn().mockResolvedValue({ messages: [], article, composer })
        : vi.fn().mockRejectedValue(new ApplicationClientError(APPLICATION_ERROR.ASSISTANT_CHECKPOINT_INVALID, undefined, 400));
    const user = userEvent.setup();
    localStorage.setItem("skladno.quick-start.v1", "complete");
    render(<App client={client} />);
    await screen.findByRole("heading", { name: article.title });
    await user.click(screen.getByRole("button", { name: getMessage("assistant.expand") }));
    await user.click(screen.getByRole("button", { name: getMessage("assistant.quickActions") }));
    await user.click(screen.getByRole("option", { name: getMessage("assistant.skill.talkingPoints.label") }));
    await user.click(screen.getByRole("button", { name: getMessage("assistant.send") }));
    await screen.findByRole("button", { name: "Open Application Settings" });
    await user.click(await screen.findByRole("button", { name: /Edit from Author message at/ }));
    const dialog = await screen.findByRole("dialog", { name: getMessage("assistant.checkpoint.heading") });
    await user.click(within(dialog).getByRole("button", { name: getMessage("assistant.checkpoint.restore") }));
    await waitFor(() => expect(client.restoreAssistantCheckpoint).toHaveBeenCalledWith("one", "author-message", { tailToken: "tail" }));

    if (succeeds) {
        await waitFor(() => expect(screen.queryByText(getMessage("assistant.requestStartFailed"))).toBeNull());
        expect(screen.queryByText("Error details")).toBeNull();
        expect(screen.queryByRole("button", { name: "Open Application Settings" })).toBeNull();
        expect(screen.getByRole("combobox", { name: getMessage("assistant.guidance") }).textContent).toBe(authorMessage.content);
    } else {
        await screen.findByText(getMessage("errors.assistantCheckpointInvalid"));
        expect(screen.getByText(getMessage("assistant.requestStartFailed"))).toBeTruthy();
        expect(screen.getByRole("button", { name: "Open Application Settings" })).toBeTruthy();
    }
});
