import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, expect, it, vi } from "vitest";
import { messages } from "../i18n/messages.js";
import { FirstRunUpdatePermission } from "./FirstRunUpdatePermission.js";

afterEach(() => {
    delete window.skladnoUpdates;
    localStorage.clear();
});

it("waits for quick start, requires explicit consent, and remembers dismissal", async () => {
    const state = { kind: "current", currentVersion: "1.0.0", networkAccess: false,
        automaticChecks: true, includePrereleases: false } as const;
    const setNetworkAccess = vi.fn().mockResolvedValue({ ...state, networkAccess: true });
    window.skladnoUpdates = {
        getState: vi.fn().mockResolvedValue(state), setNetworkAccess,
        setAutomaticChecks: vi.fn(), setIncludePrereleases: vi.fn(), checkNow: vi.fn(), download: vi.fn(),
        restartAndUpdate: vi.fn(), openReleaseNotes: vi.fn(), openRecoveryGuide: vi.fn(),
        rendererReady: vi.fn(), subscribe: () => () => undefined,
    };
    const view = (ready: boolean) => (
        <IntlProvider locale="en" messages={messages}>
            <FirstRunUpdatePermission ready={ready} />
        </IntlProvider>
    );
    const mounted = render(view(false));
    expect(window.skladnoUpdates.getState).not.toHaveBeenCalled();
    mounted.rerender(view(true));
    await screen.findByRole("dialog");
    expect(setNetworkAccess).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    mounted.unmount();
    render(view(true));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(setNetworkAccess).not.toHaveBeenCalled();
});
