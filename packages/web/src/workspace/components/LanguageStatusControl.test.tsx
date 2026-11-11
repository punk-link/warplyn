import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { articleLanguages } from "@skladno/shared";
import { renderLocalized, resetWorkspaceTestEnvironment } from "../EditorialWorkspace.test-utils.js";
import { LanguageStatusControl } from "./LanguageStatusControl.js";

afterEach(resetWorkspaceTestEnvironment);

it("offers the existing app languages without adding preset regions and displays saved tags", async () => {
    const user = userEvent.setup();
    const setLanguage = vi.fn().mockResolvedValue(undefined);
    const names = new Intl.DisplayNames(["en"], { type: "language" });
    renderLocalized(<LanguageStatusControl
        language="en-US"
        setLanguage={setLanguage}
        open
        onToggle={vi.fn()}
        onOpen={vi.fn()}
        onClose={vi.fn()} />);
    expect(screen.getAllByRole("menuitemradio")).toHaveLength(articleLanguages.length);
    for (const language of articleLanguages) {
        const option = screen.getByRole("menuitemradio", { name: names.of(language) });
        await user.click(option);
        expect(setLanguage).toHaveBeenLastCalledWith(language);
    }

    expect(screen.getByRole("button", { name: "Source language" }).textContent).toContain(names.of("en-US"));
});


it.each([
    { input: "ja", expected: "ja" },
    { input: "Polish", expected: "Polish" },
    { input: "Spanish, Argentina", expected: "Spanish, Argentina" },
    { input: "es-ar", expected: "es-AR" },
    { input: "Spanish", expected: "es" },
])("sets $input without requiring a preset", async ({ input, expected }) => {
    const user = userEvent.setup();
    const setLanguage = vi.fn().mockResolvedValue(undefined);
    renderLocalized(<LanguageStatusControl
        language="en"
        setLanguage={setLanguage}
        open
        onToggle={vi.fn()}
        onOpen={vi.fn()}
        onClose={vi.fn()} />);
    await user.click(screen.getByRole("menuitem", { name: "Other language…" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Source language" }));
    await user.click(screen.getByRole("menuitem", { name: "Other language…" }));
    await user.type(screen.getByRole("textbox", { name: "Language or regional variant" }), input);
    await user.click(screen.getByRole("button", { name: "Use language" }));
    expect(setLanguage).toHaveBeenCalledWith(expected);
});
