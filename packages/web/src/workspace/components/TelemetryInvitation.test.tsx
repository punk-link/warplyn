import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, expect, it, vi } from "vitest";
import { messages } from "../../i18n/messages.js";
import { TelemetryInvitation } from "./TelemetryInvitation.js";

afterEach(() => {
    cleanup();
    localStorage.clear();
    delete window.skladnoTelemetry;
});


function show() {
    return render(<IntlProvider locale="en" messages={messages}><TelemetryInvitation /></IntlProvider>);
}


function supportedTelemetry() {
    const client = {
        getTelemetryConsent: vi.fn().mockResolvedValue({ supported: true, enabled: false }),
        setTelemetryConsent: vi.fn().mockResolvedValue({ supported: true, enabled: true }),
        beginTelemetryCapture: vi.fn(), captureTelemetry: vi.fn(),
    };
    window.skladnoTelemetry = client;
    return client;
}


it("enables sharing only on request and hides after confirmation", async () => {
    const client = supportedTelemetry();
    show();
    const enable = await screen.findByRole("button", { name: "Enable sharing" });
    expect(client.setTelemetryConsent).not.toHaveBeenCalled();
    await userEvent.click(enable);
    expect(client.setTelemetryConsent).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("button", { name: "Enable sharing" })).toBeNull();
});

it("remembers dismissal without changing consent", async () => {
    const client = supportedTelemetry();
    const first = show();
    await userEvent.click(await screen.findByRole("button", { name: "Dismiss" }));
    first.unmount();
    show();
    expect(screen.queryByRole("button", { name: "Enable sharing" })).toBeNull();
    expect(client.setTelemetryConsent).not.toHaveBeenCalled();
});

it("keeps the invitation and a useful error when saving fails", async () => {
    const client = supportedTelemetry();
    client.setTelemetryConsent.mockRejectedValue(new Error("offline"));
    show();
    await userEvent.click(await screen.findByRole("button", { name: "Enable sharing" }));
    expect((await screen.findByRole("alert")).textContent).toBe(messages["settings.telemetrySaveFailed"]);
    expect(screen.getByRole("button", { name: "Enable sharing" }).hasAttribute("disabled")).toBe(false);
});

it("stays hidden when telemetry is unsupported or already enabled", async () => {
    const client = supportedTelemetry();
    client.getTelemetryConsent.mockResolvedValue({ supported: false, enabled: false });
    const first = show();
    await vi.waitFor(() => expect(client.getTelemetryConsent).toHaveBeenCalled());
    expect(screen.queryByRole("button")).toBeNull();
    first.unmount();
    client.getTelemetryConsent.mockResolvedValue({ supported: true, enabled: true });
    show();
    await vi.waitFor(() => expect(client.getTelemetryConsent).toHaveBeenCalledTimes(2));
    expect(screen.queryByRole("button")).toBeNull();
});
