import { useState } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { messages } from "../../i18n/messages.js";
import { ProposalChangeDiff } from "./ProposalChangeDiff.js";


function EditableDiff({ layout, disabled = false }: { layout: "columns" | "stacked"; disabled?: boolean }) {
    const [text, setText] = useState("Generated");
    return <IntlProvider locale="en" messages={messages}>
        <ProposalChangeDiff
            original="Original"
            proposed={text}
            layout={layout}
            highlight
            editing={{ index: 1, disabled, setText }} />
    </IntlProvider>;
}


describe("Proposed text keyboard editing", () => {
    afterEach(cleanup);

    it.each(["columns", "stacked"] as const)("edits multiline text with highlighting in %s layout", async (layout) => {
        const user = userEvent.setup();
        render(<EditableDiff layout={layout} />);
        const input = screen.getByRole("textbox", { name: "Proposed text for change 1" });
        await user.tab();
        expect(input).toHaveFocus();
        await user.clear(input);
        await user.type(input, "Author{enter}wording");
        expect(input).toHaveValue("Author\nwording");
        const preview = screen.getByText("Author", { selector: "mark" }).parentElement;
        expect(preview).toHaveAttribute("aria-hidden", "true");
        expect(preview).toHaveClass("[grid-area:1/1]");
        expect(input).toHaveClass("[grid-area:1/1]");
        expect(input.style.color).toBe("transparent");
        expect(input.style.caretColor).toBe("var(--color-ink)");
        expect(screen.getByText("Original", { selector: "mark" })).toBeVisible();
        expect(screen.getAllByRole("textbox")).toHaveLength(1);
    });

    it("freezes the input during application", () => {
        render(<EditableDiff layout="columns" disabled />);
        expect(screen.getByRole("textbox", { name: "Proposed text for change 1" })).toBeDisabled();
    });
});
