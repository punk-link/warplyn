import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { IntlProvider } from "react-intl";
import type { EditorialWorkspaceClient } from "../application/client.js";
import { messages } from "../i18n/messages.js";
import { AutomaticBackups } from "./AutomaticBackups.js";

const { notify, saveScheduledWebBackup, getDesktopSettingsClient } = vi.hoisted(() => ({ notify: vi.fn(), saveScheduledWebBackup: vi.fn(), getDesktopSettingsClient: vi.fn() }));
vi.mock("../notifications/NotificationProvider.js", () => ({ useNotifications: () => ({ notify }) }));
vi.mock("../application/desktop-client.js", () => ({ getDesktopSettingsClient }));
vi.mock("./web-backups.js", () => ({ saveScheduledWebBackup }));

afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.resetAllMocks();
});


it("runs browser backups at startup and daily, reports failures, and stops on unmount", async () => {
    vi.useFakeTimers();
    const backupPolicy = { schedule: "daily", retention: { mode: "count", count: 7 } };
    const getApplicationSettings = vi.fn().mockResolvedValue({ backupPolicy });
    const client = { getApplicationSettings } as unknown as EditorialWorkspaceClient;
    const view = render(<IntlProvider locale="en" messages={messages}><AutomaticBackups client={client} /></IntlProvider>);
    await vi.advanceTimersByTimeAsync(4_999);
    expect(saveScheduledWebBackup).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(saveScheduledWebBackup).toHaveBeenCalledWith(client, backupPolicy);
    saveScheduledWebBackup.mockRejectedValueOnce(new Error("Synthetic failure"));
    await vi.advanceTimersByTimeAsync(86_400_000);
    expect(notify).toHaveBeenCalledOnce();
    await vi.advanceTimersByTimeAsync(86_400_000);
    expect(saveScheduledWebBackup).toHaveBeenCalledTimes(3);
    view.unmount();
    await vi.advanceTimersByTimeAsync(86_400_000);
    expect(saveScheduledWebBackup).toHaveBeenCalledTimes(3);
});


it("leaves Electron backups to the main process", async () => {
    vi.useFakeTimers();
    getDesktopSettingsClient.mockReturnValue({});
    const getApplicationSettings = vi.fn();
    const client = { getApplicationSettings } as unknown as EditorialWorkspaceClient;
    const view = render(<IntlProvider locale="en" messages={messages}><AutomaticBackups client={client} /></IntlProvider>);
    await vi.advanceTimersByTimeAsync(86_400_000);
    expect(getApplicationSettings).not.toHaveBeenCalled();
    expect(saveScheduledWebBackup).not.toHaveBeenCalled();
    window.dispatchEvent(new Event("warplyn:automatic-backup-failed"));
    expect(notify).toHaveBeenCalledWith({ tone: "error", title: messages["settings.automaticBackupFailed"] });
    view.unmount();
    window.dispatchEvent(new Event("warplyn:automatic-backup-failed"));
    expect(notify).toHaveBeenCalledOnce();
});
