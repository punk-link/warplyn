import { screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { messages } from "../../i18n/messages.js";
import { afterEach, expect, it, vi } from "vitest";
import { renderLocalized, resetWorkspaceTestEnvironment } from "../EditorialWorkspace.test-utils.js";
import { getMessage } from "../../i18n/test-message.js";
import { EditorialAssistantPanel } from "./EditorialAssistantPanel.js";

afterEach(resetWorkspaceTestEnvironment);

it("shows setup only after configuration loads and preserves the composer through recovery", () => {
    const actions = { onRequest: vi.fn(), onCancel: vi.fn(), openSettings: vi.fn() };
    const panel = (available: boolean | undefined) => (
        <EditorialAssistantPanel
            data={{ state: "idle", message: "", hasUsableAiConnection: available }}
            actions={actions} layout={{ collapsed: false, setCollapsed: vi.fn() }} />
    );
    const view = renderLocalized(panel(undefined));
    const composer = screen.getByRole("combobox", { name: getMessage("assistant.guidance") });
    expect(screen.queryByText(getMessage("assistant.setupRequired"))).toBeNull();
    view.rerender(<IntlProvider locale="en" messages={messages}>{panel(false)}</IntlProvider>);
    expect(screen.getByText(getMessage("assistant.setupRequired"))).toBeTruthy();
    screen.getByRole("button", { name: getMessage("workspace.addModelKey") }).click();
    expect(actions.openSettings).toHaveBeenCalledOnce();
    view.rerender(<IntlProvider locale="en" messages={messages}>{panel(true)}</IntlProvider>);
    expect(screen.queryByText(getMessage("assistant.setupRequired"))).toBeNull();
    expect(screen.getByRole("combobox", { name: getMessage("assistant.guidance") })).toBe(composer);
    expect(actions.onRequest).not.toHaveBeenCalled();
});

