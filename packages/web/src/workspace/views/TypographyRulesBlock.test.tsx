import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, expect, it, vi } from "vitest";
import { messages } from "../../i18n/messages.js";
import { TypographyRulesBlock } from "./TypographyRulesBlock.js";

afterEach(cleanup);

it("saves a stable rule and preserves invalid or failed edits", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockRejectedValue(new Error("fixture failure"));
    render(<IntlProvider locale="en" messages={messages}><TypographyRulesBlock save={save} check={vi.fn()} /></IntlProvider>);
    await user.click(screen.getByRole("button", { name: "Add rule" }));
    await user.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(save).toHaveBeenCalledOnce());
    const convention = screen.getByRole("combobox", { name: "Rule 1 convention" });
    expect(convention instanceof HTMLSelectElement && convention.value).toBe("ellipsis");
    await user.selectOptions(screen.getByRole("combobox", { name: "Rule 1 convention" }), "contextual");
    expect(screen.getByRole("button", { name: "Save" }).hasAttribute("disabled")).toBe(true);
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByText("Complete this rule’s fields before saving.")).toBeTruthy();
    await user.type(screen.getByRole("textbox", { name: "Instruction for full Style review" }), "Use contextual punctuation.");
    save.mockResolvedValue(undefined);
    await user.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(save).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: "Save" })));
    expect(save.mock.calls[0]![0][0].id).toBe(save.mock.calls[1]![0][0].id);
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Add rule" }));
});

it("runs saved mechanical rules locally and blocks conflicting conventions", async () => {
    const user = userEvent.setup();
    const check = vi.fn().mockResolvedValue(undefined);
    render(<IntlProvider locale="en" messages={messages}><TypographyRulesBlock rules={[{ id: "dots", definition: { kind: "ellipsis", form: "…" } }]} save={vi.fn()} check={check} /></IntlProvider>);
    await user.click(screen.getByRole("button", { name: "Check typography" }));
    expect(check).toHaveBeenCalledOnce();
    await user.click(screen.getByRole("button", { name: "Add rule" }));
    expect(screen.getByRole("button", { name: "Save" }).hasAttribute("disabled")).toBe(true);
    expect(screen.getByRole("button", { name: "Check typography" }).hasAttribute("disabled")).toBe(true);
});


it("retains an unsaved typography draft when sample changes reload the saved corpus", async () => {
    const user = userEvent.setup();
    const rules = [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }] as const;
    const save = vi.fn();
    const check = vi.fn();
    const { rerender } = render(<IntlProvider locale="en" messages={messages}><TypographyRulesBlock rules={[...rules]} save={save} check={check} /></IntlProvider>);
    await user.click(screen.getByRole("button", { name: "Edit" }));
    await user.selectOptions(screen.getByRole("combobox", { name: "Rule 1 convention" }), "contextual");
    await user.type(screen.getByRole("textbox", { name: "Instruction for full Style review" }), "Keep my punctuation.");
    rerender(<IntlProvider locale="en" messages={messages}><TypographyRulesBlock rules={[...rules]} save={save} check={check} /></IntlProvider>);
    const instruction = screen.getByRole("textbox", { name: "Instruction for full Style review" });
    expect(instruction instanceof HTMLTextAreaElement && instruction.value).toBe("Keep my punctuation.");
});

it("keeps saved rows compact and expands only the active rule with an unsaved label", async () => {
    const user = userEvent.setup();
    const rules = [{ id: "spaces", definition: { kind: "horizontal-space" as const } }];
    render(<IntlProvider locale="en" messages={messages}><TypographyRulesBlock rules={rules} save={vi.fn()} check={vi.fn()} /></IntlProvider>);
    expect(screen.queryByRole("combobox")).toBeNull();
    expect(screen.getByText("Saved")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Edit" }));
    expect(screen.getByRole("combobox", { name: "Rule 1 convention" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Add rule" }));
    expect(screen.queryByRole("combobox", { name: "Rule 1 convention" })).toBeNull();
    expect(screen.getByRole("combobox", { name: "Rule 2 convention" })).toBe(document.activeElement);
    expect(screen.getByText("Unsaved")).toBeTruthy();
    const close = screen.getByRole("button", { name: "Close" });
    const convention = screen.getByRole("combobox", { name: "Rule 2 convention" });
    expect(convention.compareDocumentPosition(close) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await user.click(close);
    expect(screen.queryByRole("combobox")).toBeNull();
    expect(screen.getAllByRole("button", { name: "Edit" })).toContain(document.activeElement);
});
