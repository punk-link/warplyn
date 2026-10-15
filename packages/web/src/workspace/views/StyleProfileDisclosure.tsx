import { useId, useState, type PropsWithChildren } from "react";
import { Button } from "../../ui/primitives.js";
import { ChevronRightIcon } from "../../ui/icons.js";


export function StyleProfileDisclosure({ label, summary, children }: PropsWithChildren<{ label: string; summary?: string }>) {
    const id = useId();
    const [expanded, setExpanded] = useState(false);
    return (
        <section className="mb-7">
            <h3>
                <Button
                    variant="quiet"
                    className="w-full px-0"
                    id={`${id}-toggle`}
                    aria-label={label}
                    aria-describedby={summary ? `${id}-summary` : undefined}
                    aria-expanded={expanded}
                    aria-controls={`${id}-panel`}
                    onClick={() => setExpanded((value) => !value)}
                >
                    <span className="flex-1 text-left text-base text-ink">{label}</span>
                    {summary && (
                        <span id={`${id}-summary`} className="ml-3 text-xs font-normal text-muted">
                            {summary}
                        </span>
                    )}
                    <ChevronRightIcon
                        className={`ml-3 size-4 shrink-0 transition-transform motion-reduce:transition-none ${expanded ? "rotate-90" : ""}`}
                    />
                </Button>
            </h3>
            <div
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-toggle`}
                aria-hidden={!expanded}
                {...(!expanded ? { inert: "" } : {})}
                className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${
                    expanded ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="mt-3 border-l border-border-strong pl-4">{children}</div>
                </div>
            </div>
        </section>
    );
}
