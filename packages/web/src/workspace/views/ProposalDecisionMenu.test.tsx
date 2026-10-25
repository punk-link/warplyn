import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import { messages } from "../../i18n/messages.js";
import { ProposalDecisionMenu } from "./ProposalDecisionMenu.js";


describe("ProposalDecisionMenu", () => {
    afterEach(cleanup);

    it("offers three bulk actions and returns focus after selection", async () => {
        const user = userEvent.setup();
        const markAllAccepted = vi.fn();
        const rejectAll = vi.fn();
        const resetAllDecisions = vi.fn();
        render(<IntlProvider locale="en" messages={messages}>
            <ProposalDecisionMenu
                disabled={false}
                markAllAccepted={markAllAccepted}
                rejectAll={rejectAll}
                resetAllDecisions={resetAllDecisions} />
        </IntlProvider>);
        const trigger = screen.getByRole("button", { name: "Set all decisions…" });
        await user.click(trigger);
        const menu = screen.getByRole("menu", { name: "Set all decisions…" });
        expect(within(menu).getAllByRole("menuitem")).toHaveLength(3);
        expect(within(menu).queryByText("Set all decisions…")).toBeNull();
        await user.click(within(menu).getByRole("menuitem", { name: "Mark all accepted" }));
        expect(markAllAccepted).toHaveBeenCalledOnce();
        expect(rejectAll).not.toHaveBeenCalled();
        expect(screen.queryByRole("menu")).toBeNull();
        expect(document.activeElement).toBe(trigger);

        await user.click(trigger);
        await user.click(screen.getByRole("menuitem", { name: "Mark all rejected" }));
        expect(rejectAll).toHaveBeenCalledOnce();
        expect(document.activeElement).toBe(trigger);

        await user.click(trigger);
        await user.click(screen.getByRole("menuitem", { name: "Reset all decisions" }));
        expect(resetAllDecisions).toHaveBeenCalledOnce();
        expect(document.activeElement).toBe(trigger);
    });

    it("supports keyboard navigation, Escape, and outside dismissal", async () => {
        const user = userEvent.setup();
        render(<IntlProvider locale="en" messages={messages}>
            <ProposalDecisionMenu
                disabled={false}
                markAllAccepted={vi.fn()}
                rejectAll={vi.fn()}
                resetAllDecisions={vi.fn()} />
        </IntlProvider>);
        const trigger = screen.getByRole("button", { name: "Set all decisions…" });
        trigger.focus();
        await user.keyboard("{ArrowDown}");
        await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Mark all accepted" })));
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Mark all rejected" }));
        await user.keyboard("{ArrowDown}");
        expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Reset all decisions" }));
        await user.keyboard("{Escape}");
        expect(screen.queryByRole("menu")).toBeNull();
        expect(document.activeElement).toBe(trigger);

        await user.click(trigger);
        fireEvent.mouseDown(document.body);
        expect(screen.queryByRole("menu")).toBeNull();
    });
});
