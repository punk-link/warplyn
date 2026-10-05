import { useId, useState } from "react";
import { useIntl } from "react-intl";


function ProtectedValue({ value, count }: { value: string; count: number }) {
    const intl = useIntl();
    const id = useId();
    const [expanded, setExpanded] = useState(false);
    const explanation = intl.formatMessage({ id: "views.translationProtectedExplanation" }, { count });
    return <span>
        <button type="button" data-protected-value aria-label={intl.formatMessage({ id: "views.translationProtectedValue" }, { value })} aria-describedby={id} aria-controls={id} aria-expanded={expanded} title={explanation}
            className="min-h-9 max-w-full whitespace-pre-wrap break-anywhere rounded-control text-left text-brand underline decoration-dotted underline-offset-4 hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onClick={() => setExpanded(!expanded)} onKeyDown={(event) => {
                if (event.key === "Escape") {
                    event.preventDefault();
                    setExpanded(false);
                }
            }}>{value}</button>
        <span id={id} className={expanded ? "mx-1 whitespace-normal break-anywhere rounded-control bg-brand-soft px-2 py-1 font-ui text-xs text-ink" : "sr-only"}>{explanation}</span>
    </span>;
}


export function ProtectedTranslationText({ content, protectedSpans }: { content: string; protectedSpans: readonly string[] }) {
    const counts = new Map<string, number>();
    for (const value of protectedSpans) {
        if (value)
            counts.set(value, (counts.get(value) ?? 0) + 1);
    }

    if (!counts.size)
        return <>{content}</>;

    const values = [...counts.keys()].sort((a, b) => b.length - a.length);
    const pattern = new RegExp(values.map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
    const pieces = [];
    let end = 0;

    for (const match of content.matchAll(pattern)) {
        pieces.push(content.slice(end, match.index));
        pieces.push(<ProtectedValue key={`${match.index}:${match[0]}`} value={match[0]} count={counts.get(match[0]) ?? 0} />);
        end = match.index + match[0].length;
    }

    pieces.push(content.slice(end));
    return <>{pieces}</>;
}
