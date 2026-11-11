import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { IntlProvider } from "react-intl";
import { afterEach, expect, it } from "vitest";
import { messages } from "../i18n/messages.js";
import { TranslationLanguagePicker } from "./TranslationLanguagePicker.js";

afterEach(cleanup);


function Picker() {
    const [selected, change] = useState<string[]>(["es"]);
    return <IntlProvider locale="en" messages={messages}>
        <TranslationLanguagePicker
            selected={selected}
            change={change}
            sourceLanguage="en"
            existing={["es"]} />
    </IntlProvider>;
}


it("adds common and regional targets through one compact input and keeps keyboard focus", async () => {
    const user = userEvent.setup();
    render(<Picker />);
    const input = screen.getByRole("combobox", { name: "Language or regional variant" });
    const add = screen.getByRole("button", { name: "Add" });
    const hint = document.getElementById(input.getAttribute("aria-describedby") ?? "");
    expect(hint?.textContent).toBe("Enter a name or regional variant, such as Polish or Spanish, Argentina. Codes such as ja or es-AR also work.");
    expect(screen.getByRole("button", { name: "Remove Spanish" })).toBeTruthy();
    expect(add).toHaveProperty("disabled", true);
    await user.type(input, "German");
    await user.tab();
    expect(document.activeElement).toBe(add);
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Remove German" })).toBeTruthy();
    expect(document.activeElement).toBe(input);
    expect(input).toHaveProperty("value", "");
    expect(screen.queryByRole("listbox")).toBeNull();
    await user.type(input, "Spanish, Argentina");
    await user.click(add);
    expect(screen.getByRole("button", { name: "Remove Spanish, Argentina" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Remove Spanish, Argentina" }));
    expect(screen.queryByText("Spanish, Argentina")).toBeNull();
    expect(document.activeElement).toBe(input);
});


it("excludes selected and source languages from suggestions and rejects duplicate aliases", async () => {
    const user = userEvent.setup();
    render(<Picker />);
    const input = screen.getByRole("combobox", { name: "Language or regional variant" });
    await user.click(input);
    expect(screen.getByRole("option", { name: "German" })).toBeTruthy();
    expect(screen.queryByRole("option", { name: "English" })).toBeNull();
    expect(screen.queryByRole("option", { name: "Spanish" })).toBeNull();
    const add = screen.getByRole("button", { name: "Add" });
    await user.type(input, "Spanish");
    expect(add).toHaveProperty("disabled", true);
    await user.clear(input);
    await user.type(input, "English");
    expect(add).toHaveProperty("disabled", true);
    await user.clear(input);
    await user.type(input, "Japanese");
    await user.click(add);
    await user.type(input, "japanese");
    expect(add).toHaveProperty("disabled", true);
});


it("uses styled suggestions with pointer and keyboard selection while retaining custom entry", async () => {
    const user = userEvent.setup();
    render(<Picker />);
    const input = screen.getByRole("combobox", { name: "Language or regional variant" });
    await user.click(input);
    expect(input.getAttribute("aria-expanded")).toBe("true");
    const list = screen.getByRole("listbox", { name: "Language or regional variant" });
    expect(list.className).toContain("bg-surface-raised");
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("option", { name: "Italian" }).getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(input, { key: "Enter", isComposing: true });
    expect(input).toHaveProperty("value", "");
    expect(screen.getByRole("listbox")).toBeTruthy();
    await user.keyboard("{Enter}");
    expect(input).toHaveProperty("value", "Italian");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(screen.queryByRole("button", { name: "Remove Italian" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Add" }));
    await user.click(input);
    await user.click(screen.getByRole("option", { name: "German" }));
    expect(input).toHaveProperty("value", "German");
    expect(document.activeElement).toBe(input);
    await user.clear(input);
    await user.type(input, "Port");
    expect(screen.queryByRole("option", { name: "French" })).toBeNull();
    await user.keyboard("{ArrowDown}{Escape}");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(input).toHaveProperty("value", "Port");
    await user.clear(input);
    await user.type(input, "Spanish, Argentina");
    expect(screen.queryByRole("listbox")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByRole("button", { name: "Remove Spanish, Argentina" })).toBeTruthy();
});


it("leaves Escape available to the surrounding dialog when custom entry has no suggestions", async () => {
    const user = userEvent.setup();
    let escaped = false;
    render(<div onKeyDown={(event) => {
        if (event.key === "Escape" && !event.defaultPrevented)
            escaped = true;
    }}><Picker />
    </div>);
    await user.type(screen.getByRole("combobox", { name: "Language or regional variant" }), "Polish");
    expect(screen.queryByRole("listbox")).toBeNull();
    await user.keyboard("{Escape}");
    expect(escaped).toBe(true);
});
