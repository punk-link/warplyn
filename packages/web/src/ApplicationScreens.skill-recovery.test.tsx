import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import type { AssistantSkillRecoveryStatus } from "@skladno/shared";
import { App } from "./App.js";
import { createFakeClient, resetWorkspaceTestEnvironment } from "./workspace/EditorialWorkspace.test-utils.js";


afterEach(resetWorkspaceTestEnvironment);


// Product scenarios: editorial-workflows.skill-recovery-controls
it("keeps the Workspace usable, opens recovery controls, retries and refreshes Skills without reloading Articles", async () => {
    const client = createFakeClient();
    client.getAssistantSkillRecovery = vi.fn().mockResolvedValue({ kind: "blocked", skillIds: ["author-review"], allAuthorSkills: false });
    let finish: (status: AssistantSkillRecoveryStatus) => void = () => undefined;
    client.retryAssistantSkillRecovery = vi.fn(() => new Promise<AssistantSkillRecoveryStatus>((resolve) => {
        finish = resolve;
    }));
    const user = userEvent.setup();
    render(<App client={client} />);
    await screen.findByRole("heading", { name: "First Article" });
    expect(screen.getByRole("textbox", { name: "Article draft" }).textContent).toBe("Draft");
    await user.click(await screen.findByRole("button", { name: "Review recovery" }));
    await screen.findByRole("heading", { name: "Author Skill recovery" });
    const articleLoads = vi.mocked(client.listArticleSummaries).mock.calls.length;
    const skillLoads = vi.mocked(client.listAssistantSkills).mock.calls.length;
    const retry = screen.getByRole("button", { name: "Retry recovery" });
    await user.click(retry);
    expect(retry.hasAttribute("disabled")).toBe(true);
    await act(async () => finish({ kind: "ready" }));
    const ready = await screen.findByText("Author Skills are available.");
    expect(document.activeElement).toBe(ready);
    await waitFor(() => expect(vi.mocked(client.listAssistantSkills).mock.calls.length).toBeGreaterThan(skillLoads));
    expect(screen.queryByRole("button", { name: "Review recovery" })).toBeNull();
    expect(client.listArticleSummaries).toHaveBeenCalledTimes(articleLoads);
    await user.click(screen.getAllByRole("button", { name: "Back" }).at(-1)!);
    expect(screen.getByRole("textbox", { name: "Article draft" }).textContent).toBe("Draft");
});


it("retains unresolved recovery, offers backups and hides private retry errors", async () => {
    const client = createFakeClient();
    client.getAssistantSkillRecovery = vi.fn().mockResolvedValue({ kind: "blocked", skillIds: [], allAuthorSkills: true });
    client.retryAssistantSkillRecovery = vi.fn().mockRejectedValue(new Error("private journal path"));
    const user = userEvent.setup();
    render(<App client={client} />);
    await user.click(await screen.findByRole("button", { name: "Review recovery" }));
    await user.click(screen.getByRole("button", { name: "Retry recovery" }));
    expect(await screen.findByText("Couldn't retry Skill recovery. Your files are preserved. Try again or restore a backup.")).toBeTruthy();
    expect(screen.queryByText("private journal path")).toBeNull();
    expect(screen.getByRole("button", { name: "Retry recovery" }).hasAttribute("disabled")).toBe(false);
    const recovery = screen.getByRole("region", { name: "Author Skill recovery" });
    await user.click(within(recovery).getByRole("button", { name: "Data & backups" }));
    expect(await screen.findByRole("heading", { name: "Data & backups" })).toBeTruthy();
});
