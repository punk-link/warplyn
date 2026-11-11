import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, describe, expect, it, vi } from "vitest";


import type { EditorialWorkspaceClient } from "../application/client.js";
import { messages } from "../i18n/messages.js";
import { getMessage } from "../i18n/test-message.js";
import { NotificationProvider } from "../notifications/NotificationProvider.js";
import { ApplicationSettings } from "./ApplicationSettings.js";
import { resetApplicationSettingsTestEnvironment, settingsSnapshot } from "./ApplicationSettings.test-utils.js";

describe("ApplicationSettings publishing", () => {
    afterEach(resetApplicationSettingsTestEnvironment);

    it("retains an editable custom profile until the author saves its name and limit", async () => {
        const user = userEvent.setup();
        const settings = { defaultProfileId: "default" as const, customProfiles: [] };
        const setPublishingSettings = vi.fn().mockResolvedValue(undefined);
        const client = {
            getApplicationSettings: vi.fn().mockResolvedValue(settingsSnapshot()),
            getPublishingSettings: vi.fn().mockResolvedValue(settings),
            setPublishingSettings,
        } as unknown as EditorialWorkspaceClient;

        render(<IntlProvider locale="en" messages={messages}><NotificationProvider><ApplicationSettings client={client} back={vi.fn()} /></NotificationProvider></IntlProvider>);
        await user.click(await screen.findByRole("button", { name: getMessage("settings.publishing") }));
        await user.clear(screen.getByRole("textbox", { name: getMessage("settings.customProfileName") }));
        await user.type(screen.getByRole("textbox", { name: getMessage("settings.customProfileName") }), "Newsletter");
        const limit = screen.getByRole("spinbutton", { name: getMessage("settings.customProfileLimit") });
        await user.clear(limit);
        await user.type(limit, "1200");
        await user.click(screen.getByRole("button", { name: getMessage("settings.saveCustomProfile") }));
        await waitFor(() => expect(setPublishingSettings).toHaveBeenCalledWith(expect.objectContaining({ customProfiles: [expect.objectContaining({ name: "Newsletter", characterLimit: 1200 })] })));
        await user.type(screen.getByRole("textbox", { name: getMessage("settings.customProfileName") }), "Long read");
        await user.type(screen.getByRole("spinbutton", { name: getMessage("settings.customProfileLimit") }), "5000");
        await user.click(screen.getByRole("button", { name: getMessage("settings.saveCustomProfile") }));
        await waitFor(() => expect(setPublishingSettings).toHaveBeenLastCalledWith(expect.objectContaining({ customProfiles: [expect.objectContaining({ name: "Newsletter", characterLimit: 1200 }), expect.objectContaining({ name: "Long read", characterLimit: 5000 })] })));
        await user.click(screen.getByRole("button", { name: getMessage("settings.removeCustomProfile", { name: "Newsletter" }) }));
        const dialog = screen.getByRole("dialog");
        await user.click(within(dialog).getByRole("button", { name: getMessage("settings.remove") }));
        await waitFor(() => expect(setPublishingSettings).toHaveBeenLastCalledWith(expect.objectContaining({ customProfiles: [expect.objectContaining({ name: "Long read", characterLimit: 5000 })] })));
    });
});
