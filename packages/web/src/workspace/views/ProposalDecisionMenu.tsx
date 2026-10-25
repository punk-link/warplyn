import { useEffect, useId, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { Button } from "../../ui/primitives.js";
import { ChevronDownIcon } from "../../ui/icons.js";
import { handleStatusMenuKeyDown, openStatusMenu } from "../components/ArticleStatusBarMenu.js";


export function ProposalDecisionMenu({ disabled, markAllAccepted, rejectAll, resetAllDecisions }: {
    disabled: boolean;
    markAllAccepted: () => void;
    rejectAll: () => void;
    resetAllDecisions: () => void;
}) {
    const intl = useIntl();
    const [open, setOpen] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const menuId = useId();
    const label = intl.formatMessage({ id: "views.setAllDecisions" });
    if (disabled && open)
        setOpen(false);

    useEffect(() => {
        function closeOnOutsideMouseDown(event: MouseEvent) {
            if (event.target instanceof Node && !root.current?.contains(event.target))
                setOpen(false);
        }


        document.addEventListener("mousedown", closeOnOutsideMouseDown);
        return () => document.removeEventListener("mousedown", closeOnOutsideMouseDown);
    }, []);


    function closeMenu() {
        setOpen(false);
        trigger.current?.focus();
    }


    function chooseDecision(action: () => void) {
        action();
        closeMenu();
    }


    return <div ref={root} className="relative" onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
            setOpen(false);
    }}>
        <Button
            ref={trigger}
            variant="secondary"
            className="gap-2"
            disabled={disabled}
            aria-controls={open ? menuId : undefined}
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => setOpen((current) => !current)}
            onKeyDown={(event) => {
                if (event.key === "Escape")
                    closeMenu();

                openStatusMenu(event, () => setOpen(true), menuId);
            }}>
            {label}
            <ChevronDownIcon className={`size-4 shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
        </Button>
        {open && !disabled && (
            <div
                id={menuId}
                role="menu"
                aria-label={label}
                className="absolute right-0 top-full z-20 mt-1 min-w-full rounded-control border border-border bg-surface-raised p-1 shadow-raised"
                onKeyDown={(event) => handleStatusMenuKeyDown(event, closeMenu)}>
                <button
                    type="button"
                    role="menuitem"
                    className={"flex min-h-9 w-full items-center whitespace-nowrap rounded-control px-2 text-left text-xs text-ink " +
                        "hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"}
                    onClick={() => chooseDecision(markAllAccepted)}>{intl.formatMessage({ id: "views.acceptAll" })}
                </button>
                <button
                    type="button"
                    role="menuitem"
                    className={"flex min-h-9 w-full items-center whitespace-nowrap rounded-control px-2 text-left text-xs text-ink " +
                        "hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"}
                    onClick={() => chooseDecision(rejectAll)}>{intl.formatMessage({ id: "views.rejectAll" })}
                </button>
                <button
                    type="button"
                    role="menuitem"
                    className={"flex min-h-9 w-full items-center whitespace-nowrap rounded-control px-2 text-left text-xs text-ink " +
                        "hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"}
                    onClick={() => chooseDecision(resetAllDecisions)}>{intl.formatMessage({ id: "views.resetAllDecisions" })}
                </button>
            </div>
        )}
    </div>;
}
