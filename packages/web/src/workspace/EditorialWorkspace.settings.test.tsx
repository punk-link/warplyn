import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { defaultGeneralSettings } from "@skladno/shared";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "../App.js";
import { getMessage } from "../i18n/test-message.js";
import { createFakeClient, resetWorkspaceTestEnvironment } from "./EditorialWorkspace.test-utils.js";

describe("Editorial Workspace settings", () => {
    afterEach(resetWorkspaceTestEnvironment);

    it("opens Style Profile as a separate screen and returns to the selected Workspace View", async () => {
        const user = userEvent.setup();
        render(<App client={createFakeClient()} />);
        await screen.findByRole("heading", { name: "First Article" });
        await user.click(screen.getByRole("tab", { name: "Revisions" }));
        expect(screen.queryByRole("tab", { name: "Style Profile" })).toBeNull();
        await user.click(screen.getByRole("button", { name: "Style Profile" }));
        expect(screen.getByRole("heading", { name: "Style Profile" })).toBeTruthy();
        expect(screen.queryByRole("tablist")).toBeNull();
        const back = screen.getAllByRole("button", { name: getMessage("settings.backToWorkspace") }).at(-1)!;
        expect(document.activeElement).toBe(back);
        await user.tab();
        expect(document.activeElement).toBe(screen.getByRole("button", { name: "Detected characteristics" }));
        await user.tab({ shift: true });
        expect(document.activeElement).toBe(back);
        await user.click(screen.getByRole("button", { name: "Manual rules" }));
        await user.type(screen.getByRole("textbox", { name: "Global style rules" }), "Keep my draft.");
        await user.click(screen.getByRole("button", { name: "Writing samples" }));
        expect(screen.queryByRole("textbox", { name: "Global style rules" })).toBeNull();
        await user.click(screen.getByRole("button", { name: "Manual rules" }));
        expect(screen.getByRole("textbox", { name: "Global style rules" }).textContent).toBe("Keep my draft.");
        await user.click(back);
        expect(screen.getByRole("tab", { name: "Revisions" }).getAttribute("aria-selected")).toBe("true");
        expect(screen.getByRole("heading", { name: "First Article" })).toBeTruthy();
        await user.keyboard("{Control>}5{/Control}");
        expect(screen.getByRole("heading", { name: "Style Profile" })).toBeTruthy();
    });

    it("opens global Style Profile controls without an Article", async () => {
        const client = createFakeClient();
        client.listArticles = vi.fn().mockResolvedValue([]);
        const user = userEvent.setup();
        render(<App client={client} />);
        await user.click(await screen.findByRole("button", { name: "Style Profile" }));
        await user.click(screen.getByRole("button", { name: "Manual rules" }));
        expect(screen.getByRole("textbox", { name: "Global style rules" })).toBeTruthy();
        expect(screen.queryByRole("textbox", { name: getMessage("styleProfile.articleRules") })).toBeNull();
        expect(client.getArticleStyleRules).not.toHaveBeenCalled();
        expect(client.getArticleTypography).not.toHaveBeenCalled();
    });

    it("migrates a saved Style Profile tab to Write while keeping Article selection", async () => {
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 4, selectedArticleId: "one", view: "style-profile" }));
        render(<App client={createFakeClient()} />);
        await screen.findByRole("heading", { name: "First Article" });
        expect(screen.getByRole("tab", { name: "Write" }).getAttribute("aria-selected")).toBe("true");
        expect(JSON.parse(localStorage.getItem("skladno-workspace-layout")!).selectedArticleId).toBe("one");
    });

    // Product scenario: application.open-settings-without-empty-workspace
    it("opens Application Settings without replacing the workspace with an empty view", async () => {
        const user = userEvent.setup();
        render(<App client={createFakeClient()} />);
        await user.click((await screen.findAllByRole("button", { name: getMessage("navigation.settings") })).at(-1)!);
        expect(screen.getByRole("heading", { name: getMessage("settings.general") })).toBeTruthy();
        expect(screen.getByText("Preferred appearance")).toBeTruthy();
    });

    // Product scenario: application.ai-connection-onboarding-warning
    it("warns when no active connected AI connection is available and opens AI Settings", async () => {
        const client = createFakeClient();
        const user = userEvent.setup();
        render(<App client={client} />);
        expect(await screen.findByText(getMessage("workspace.aiConnectionRequired"))).toBeTruthy();
        expect(screen.getByText(getMessage("workspace.aiConnectionCapabilities"))).toBeTruthy();
        await user.click(screen.getAllByRole("button", { name: "Add model key" }).at(-1)!);
        expect(await screen.findByRole("heading", { name: "Connections" })).toBeTruthy();
    });

    it.each([
        { active: true, status: "connected" as const },
        { active: true, status: "unavailable" as const },
    ])("shows the AI connection warning only for an unusable connection state", async (connection) => {
        const client = createFakeClient();
        client.getApplicationSettings = vi.fn().mockResolvedValue({ general: defaultGeneralSettings, connections: [{ id: "connection", provider: "openai", label: "Personal AI", credentialSource: { kind: "environment-variable", environmentVariableName: "AI_API_KEY" }, ...connection }], modelPreferences: { defaultModel: "", skillOverrides: {} }, backupPolicy: { schedule: "off", retention: { mode: "count", count: 7 } }, keyBindingOverrides: {} });
        render(<App client={client} />);
        await screen.findByRole("heading", { name: "First Article" });
        if (connection.status === "unavailable")
            expect(await screen.findByText(getMessage("workspace.aiConnectionRequired"))).toBeTruthy();
        else
            await waitFor(() => expect(screen.queryByText(getMessage("workspace.aiConnectionRequired"))).toBeNull());
    });

    it("surfaces Application Settings save failures through the notification center", async () => {
        const client = createFakeClient();
        client.updateGeneralSettings = vi.fn().mockRejectedValue(new Error("private settings detail"));
        const user = userEvent.setup();
        render(<App client={client} />);
        await user.click((await screen.findAllByRole("button", { name: getMessage("navigation.settings") })).at(-1)!);
        const appearance = screen.getByText("Preferred appearance").closest("section")?.querySelector("select");
        await user.selectOptions(appearance!, "dark");
        expect((await screen.findByRole("alert")).textContent).toContain("Couldn't save your Settings. Your previous Settings are unchanged. Try again.");
        expect(screen.queryByText("private settings detail")).toBeNull();
    });
});
