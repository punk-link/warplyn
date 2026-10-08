import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { expect, it, vi } from "vitest";
import { messages } from "../../i18n/messages.js";
import { SettingsNavigation } from "./SettingsNavigation.js";


it("reaches every desktop section and the back action with arrow keys", async () => {
    const user = userEvent.setup();
    const setSection = vi.fn();
    const back = vi.fn();
    render(<IntlProvider locale="en" messages={messages}><SettingsNavigation section="general" setSection={setSection} back={back} status="" /></IntlProvider>);
    const general = screen.getByRole("button", { name: "General" });
    general.focus();
    await user.keyboard("{ArrowDown}{Enter}");
    expect(setSection).toHaveBeenCalledWith("keyBindings");
    await user.keyboard("{Home}{Enter}");
    expect(back).toHaveBeenCalledOnce();
    await user.keyboard("{End}");
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "About Warplyn" }));
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(screen.getAllByRole("button", { name: "Back to workspace" })[1]);
    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "About Warplyn" }));
});
