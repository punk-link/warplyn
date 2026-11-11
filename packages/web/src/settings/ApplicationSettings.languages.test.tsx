import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultGeneralSettings } from "@skladno/shared";

import type { EditorialWorkspaceClient } from "../application/client.js";
import { messages } from "../i18n/messages.js";
import { getMessage } from "../i18n/test-message.js";
import { NotificationProvider } from "../notifications/NotificationProvider.js";
import { ApplicationSettings } from "./ApplicationSettings.js";
import { resetApplicationSettingsTestEnvironment, settingsSnapshot } from "./ApplicationSettings.test-utils.js";

describe("ApplicationSettings language defaults", () => {
    afterEach(resetApplicationSettingsTestEnvironment);

    it("keeps language defaults in their own section and preserves them across navigation", async () => {
        const user = userEvent.setup();
        const updateGeneralSettings = vi.fn().mockResolvedValue(defaultGeneralSettings);
        const client = {
            getApplicationSettings: vi.fn().mockResolvedValue(settingsSnapshot()),
            updateGeneralSettings,
            getPublishingSettings: vi.fn().mockResolvedValue({ defaultProfileId: "default", customProfiles: [] }),
        } as unknown as EditorialWorkspaceClient;

        render(<IntlProvider locale="en" messages={messages}>
            <NotificationProvider><ApplicationSettings client={client} back={vi.fn()} /></NotificationProvider>
        </IntlProvider>);
        await user.click(await screen.findByRole("button", { name: getMessage("settings.publishing") }));
        expect(screen.queryByRole("group", { name: getMessage("settings.defaultTranslationLanguages") })).toBeNull();
        await user.click(screen.getByRole("button", { name: getMessage("settings.languageDefaults") }));
        expect(screen.getByRole("heading", { name: getMessage("settings.languageDefaults"), level: 1 })).toBeTruthy();
        const languages = screen.getByRole("group", { name: getMessage("settings.defaultTranslationLanguages") });
        expect(languages.getAttribute("aria-describedby")).toBeTruthy();
        const target = screen.getByRole("combobox", { name: getMessage("translationLanguages.search") });
        await user.type(target, "Spanish");
        await user.click(within(languages).getByRole("button", { name: getMessage("translationLanguages.add") }));
        await user.type(target, "German");
        await user.click(within(languages).getByRole("button", { name: getMessage("translationLanguages.add") }));
        await waitFor(() => expect(updateGeneralSettings).toHaveBeenCalledWith({ ...defaultGeneralSettings, defaultTranslationLanguages: ["es", "de"] }));
        await user.type(target, "Japanese");
        await user.click(within(languages).getByRole("button", { name: getMessage("translationLanguages.add") }));
        await waitFor(() => expect(updateGeneralSettings).toHaveBeenLastCalledWith({
            ...defaultGeneralSettings, defaultTranslationLanguages: ["es", "de", "Japanese"],
        }));
        await user.selectOptions(screen.getByRole("combobox", { name: getMessage("settings.defaultArticleLanguage") }), "es");
        await waitFor(() => expect(updateGeneralSettings).toHaveBeenLastCalledWith({
            ...defaultGeneralSettings, defaultArticleLanguage: "es", defaultTranslationLanguages: ["de", "Japanese"],
        }));
        await user.click(screen.getByRole("button", { name: getMessage("settings.publishing") }));
        expect(screen.queryByRole("group", { name: getMessage("settings.defaultTranslationLanguages") })).toBeNull();
        await user.selectOptions(screen.getByRole("combobox", { name: getMessage("settings.navigation") }), "languages");
        expect(screen.getByRole("button", { name: getMessage("translationLanguages.remove", { language: "Japanese" }) })).toBeTruthy();
    });
});
