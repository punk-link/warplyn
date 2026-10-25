import { useMemo } from "react";
import { useIntl } from "react-intl";
import { Diff, TextareaField } from "../../ui/primitives.js";
import { renderHighlightedText } from "./proposal-highlight.js";
import type { ProposalDecision } from "./proposal-review-presentation.js";


function HighlightedText({ parts, tone }: { parts: ReturnType<typeof renderHighlightedText>["original"]; tone: "added" | "removed" }) {
    return parts.map((part, index) => part.changed
        ? <mark className={tone === "added" ? "bg-success text-on-brand" : "bg-danger text-on-brand"} key={index}>{part.text}</mark>
        : part.text);
}


export function ProposalChangeDiff({ original, proposed, layout, decision = "pending", highlight, editing }: {
    original: string;
    proposed: string;
    layout: "columns" | "stacked";
    decision?: ProposalDecision;
    highlight: boolean;
    editing?: { index: number; disabled: boolean; setText: (text: string) => void };
}) {
    const intl = useIntl();
    const highlights = useMemo(() => highlight ? renderHighlightedText(original, proposed) : undefined, [highlight, original, proposed]);
    let added = highlights ? <HighlightedText parts={highlights.proposed} tone="added" /> : <>{proposed}</>;
    if (editing)
        added = <div className="grid">
            {highlights && (
                <div
                    className="pointer-events-none min-w-0 whitespace-pre-wrap [grid-area:1/1] [overflow-wrap:break-word]"
                    aria-hidden="true">
                    <HighlightedText parts={highlights.proposed} tone="added" />
                </div>
            )}
            <TextareaField
                variant="inline"
                className="relative [grid-area:1/1]"
                style={highlights ? { color: "transparent", caretColor: "var(--color-ink)" } : undefined}
                aria-label={intl.formatMessage({ id: "views.proposedChangeInput" }, { index: editing.index })}
                value={proposed}
                disabled={editing.disabled}
                rows={1}
                onChange={(event) => editing.setText(event.target.value)} />
        </div>;

    return <Diff
        layout={layout}
        state={decision}
        removed={highlights ? <HighlightedText parts={highlights.original} tone="removed" /> : original}
        added={added} />;
}
