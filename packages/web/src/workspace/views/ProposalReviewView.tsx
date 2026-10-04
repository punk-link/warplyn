import { useMemo, useRef, useState } from "react";
import { findSequenceMatches, type TextProposal } from "@skladno/shared";
import { Banner, Button, Diff, EmptyState, IconButton, Status } from "../../ui/primitives.js";
import { useIntl } from "react-intl";
import { presentProposalReview, type ProposalDecision } from "./proposal-review-presentation.js";
import { AssistantIcon, ChevronRightIcon, CloseIcon, HighlightChangesIcon, SideBySideIcon, StackedDiffIcon } from "../../ui/icons.js";


interface HighlightPart { changed: boolean; text: string }


function appendChangedTokens(parts: HighlightPart[], tokens: string[], start: number, end: number): void {
    for (let index = start; index < end; index += 1)
        parts.push({ changed: true, text: tokens[index] });
}


function renderHighlightedText(original: string, proposed: string) {
    const originalTokens = original.match(/\s+|[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu) ?? [];
    const proposedTokens = proposed.match(/\s+|[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu) ?? [];
    const originalParts: HighlightPart[] = [];
    const proposedParts: HighlightPart[] = [];
    let originalIndex = 0;
    let proposedIndex = 0;

    const deletionFirstMatches = findSequenceMatches(proposedTokens, originalTokens);
    for (const match of deletionFirstMatches) {
        appendChangedTokens(originalParts, originalTokens, originalIndex, match.proposalIndex);
        appendChangedTokens(proposedParts, proposedTokens, proposedIndex, match.baseIndex);
        originalParts.push({ changed: false, text: originalTokens[match.proposalIndex] });
        proposedParts.push({ changed: false, text: proposedTokens[match.baseIndex] });
        originalIndex = match.proposalIndex + 1;
        proposedIndex = match.baseIndex + 1;
    }

    appendChangedTokens(originalParts, originalTokens, originalIndex, originalTokens.length);
    appendChangedTokens(proposedParts, proposedTokens, proposedIndex, proposedTokens.length);

    return { original: originalParts, proposed: proposedParts };
}


function HighlightedText({ parts, tone }: { parts: HighlightPart[]; tone: "added" | "removed" }) {
    return parts.map((part, index) => part.changed
        ? <mark className={tone === "added" ? "bg-success text-on-brand" : "bg-danger text-on-brand"} key={index}>{part.text}</mark>
        : part.text);
}


function ProposalDiff({ original, proposed, layout, decision = "pending", highlight }: { original: string; proposed: string; layout: "columns" | "stacked"; decision?: ProposalDecision; highlight: boolean }) {
    const highlights = useMemo(() => highlight ? renderHighlightedText(original, proposed) : undefined, [highlight, original, proposed]);
    return <Diff layout={layout} state={decision}
        removed={highlights ? <HighlightedText parts={highlights.original} tone="removed" /> : original}
        added={highlights ? <HighlightedText parts={highlights.proposed} tone="added" /> : proposed} />;
}


function ProposalReviewHeader({ presentation, counts, stale, accepted, displayMode, setDisplayMode, highlightChanges, setHighlightChanges, rejectAll, acceptAll, applyAccepted, acceptanceBlocked, allResolved, moveChange, openWrite, openAssistant, dismissProposal }: {
    presentation: ReturnType<typeof presentProposalReview>;
    counts: { pending: number; accepted: number; rejected: number };
    stale: boolean;
    accepted: boolean;
    displayMode: "side-by-side" | "stacked";
    setDisplayMode: (mode: "side-by-side" | "stacked") => void;
    highlightChanges: boolean;
    setHighlightChanges: (update: (current: boolean) => boolean) => void;
    rejectAll: () => void;
    acceptAll: () => Promise<void>;
    applyAccepted: () => Promise<void>;
    acceptanceBlocked: boolean;
    allResolved: boolean;
    moveChange: (direction: -1 | 1) => void;
    openWrite: () => void;
    openAssistant: () => void;
    dismissProposal: () => void;
}) {
    const intl = useIntl();
    const disabled = accepted || stale || presentation.changes.length === 0;
    return <header className="shrink-0 border-b border-border bg-canvas">
        <div className="mx-auto w-full max-w-6xl px-4 py-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold">{intl.formatMessage({ id: "views.proposalReview" })}</h2>
                    <p className="mt-1 text-xs text-muted">{stale || !presentation.reliable
                        ? intl.formatMessage({ id: "views.proposalWhole" }, { changes: presentation.changes.length })
                        : intl.formatMessage({ id: "views.proposalCounts" }, { total: presentation.changes.length, pending: counts.pending, accepted: counts.accepted, rejected: counts.rejected })}</p>
                </div>
                <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
                    {presentation.changes.length > 0 && <div className="flex items-center gap-1" aria-label={intl.formatMessage({ id: "views.proposalDisplayMode" })}>
                        <IconButton variant="quiet" label={intl.formatMessage({ id: "views.proposalSideBySide" })} title={intl.formatMessage({ id: "views.proposalSideBySide" })} aria-pressed={displayMode === "side-by-side"} onClick={() => setDisplayMode("side-by-side")}><SideBySideIcon /></IconButton>
                        <IconButton variant="quiet" label={intl.formatMessage({ id: "views.proposalStacked" })} title={intl.formatMessage({ id: "views.proposalStacked" })} aria-pressed={displayMode === "stacked"} onClick={() => setDisplayMode("stacked")}><StackedDiffIcon /></IconButton>
                        <IconButton variant="quiet" label={intl.formatMessage({ id: "views.proposalHighlight" })} title={intl.formatMessage({ id: "views.proposalHighlight" })} aria-pressed={highlightChanges} onClick={() => setHighlightChanges((current) => !current)}><HighlightChangesIcon /></IconButton>
                    </div>}
                    {presentation.changes.length > 1 && <nav className="flex gap-2" aria-label={intl.formatMessage({ id: "views.changeNavigation" })}>
                        <IconButton variant="quiet" label={intl.formatMessage({ id: "views.previousChange" })} title={intl.formatMessage({ id: "views.previousChange" })} onClick={() => moveChange(-1)}><ChevronRightIcon className="size-4 rotate-180" /></IconButton>
                        <IconButton variant="quiet" label={intl.formatMessage({ id: "views.nextChange" })} title={intl.formatMessage({ id: "views.nextChange" })} onClick={() => moveChange(1)}><ChevronRightIcon className="size-4" /></IconButton>
                    </nav>}
                    {stale ? <>
                        <Button variant="secondary" onClick={openWrite}>{intl.formatMessage({ id: "views.reviewCurrentArticle" })}</Button>
                        <Button variant="secondary" onClick={openAssistant}>{intl.formatMessage({ id: "views.regenerateInAssistant" })}</Button>
                        <Button variant="secondary" onClick={dismissProposal}>{intl.formatMessage({ id: "views.dismissProposal" })}</Button>
                    </> : <>
                        <Button variant="secondary" disabled={disabled} onClick={rejectAll}>{intl.formatMessage({ id: "views.rejectAll" })}</Button>
                        <Button variant="secondary" disabled={disabled} onClick={() => void acceptAll()}>{intl.formatMessage({ id: "views.acceptAll" })}</Button>
                        <Button disabled={acceptanceBlocked || !allResolved || counts.accepted === 0} onClick={() => void applyAccepted()}>{intl.formatMessage({ id: "views.applyAccepted" })}</Button>
                    </>}
                </div>
            </div>
            {stale && <p role="alert" className="mt-2 text-xs text-warning">{intl.formatMessage({ id: "views.proposalStale" })}</p>}
        </div>
    </header>;
}


interface ProposalReviewData {
    review: TextProposal | undefined;
    accepted?: boolean;
    stale: boolean;
    decisions: Record<string, ProposalDecision>;
    summaries?: Record<string, string>;
    summaryState?: "idle" | "loading" | "unavailable";
    warningsDismissed: boolean;
}


interface ProposalReviewActions {
    setDecision: (id: string, decision: ProposalDecision) => void;
    acceptAll: () => Promise<void>;
    applyAccepted: () => Promise<void>;
    rejectAll: () => void;
    dismissProposal: () => void;
    dismissWarnings: () => void;
    openWrite: () => void;
    openAssistant: () => void;
}


export function ProposalReviewView({ data, actions }: { data: ProposalReviewData; actions: ProposalReviewActions }) {
    const { review, accepted = false, stale, decisions, summaries, summaryState, warningsDismissed } = data;
    const { setDecision, acceptAll, applyAccepted, rejectAll, dismissProposal, dismissWarnings, openWrite, openAssistant } = actions;
    const intl = useIntl();
    const cards = useRef<(HTMLElement | null)[]>([]);
    const [displayMode, setDisplayMode] = useState<"side-by-side" | "stacked">("side-by-side");
    const [highlightChanges, setHighlightChanges] = useState(false);
    const [currentChange, setCurrentChange] = useState<number>();


    function moveChange(direction: -1 | 1) {
        const index = currentChange === undefined ? 0 : (currentChange + direction + cards.current.length) % cards.current.length;
        const card = cards.current[index];

        setCurrentChange(index);
        card?.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        card?.focus({ preventScroll: true });
    }


    if (!review)
        return <EmptyState title={intl.formatMessage({ id: "views.proposalEmptyTitle" })}>{intl.formatMessage({ id: "views.proposalEmpty" })}</EmptyState>;

    const presentation = presentProposalReview(review);
    const counts = presentation.changes.reduce((result, change) => ({ ...result, [decisions[change.id] ?? "pending"]: result[decisions[change.id] ?? "pending"] + 1 }), { pending: 0, accepted: 0, rejected: 0 });
    const acceptanceBlocked = accepted || stale || !presentation.reliable;
    const allResolved = counts.pending === 0 && presentation.changes.length > 0;

    return <div className="flex min-h-0 flex-1 flex-col">
        <ProposalReviewHeader presentation={presentation} counts={counts} stale={stale} accepted={accepted} displayMode={displayMode} setDisplayMode={setDisplayMode} highlightChanges={highlightChanges} setHighlightChanges={setHighlightChanges} rejectAll={rejectAll} acceptAll={acceptAll} applyAccepted={applyAccepted} acceptanceBlocked={acceptanceBlocked} allResolved={allResolved} moveChange={moveChange} openWrite={openWrite} openAssistant={openAssistant} dismissProposal={dismissProposal} />
        <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-color:var(--color-border-strong)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-strong">
            <div className="mx-auto w-full max-w-6xl p-4 pb-5">
                {accepted && <Status className="mb-4" label={intl.formatMessage({ id: "views.proposalAccepted" })} tone="success" />}
                <ProposalWarnings warnings={presentation.warnings} dismissed={warningsDismissed} dismiss={dismissWarnings} />
                <ProposalFallbackDiff review={review} reliable={presentation.reliable} stale={stale} displayMode={displayMode} highlight={highlightChanges} />
                {presentation.changes.length === 0
                    ? <EmptyState title={intl.formatMessage({ id: "views.proposalNoChanges" })}>
                        <Button variant="secondary" onClick={dismissProposal}>{intl.formatMessage({ id: "views.dismissProposal" })}</Button>
                    </EmptyState>
                    : presentation.reliable && !stale && <div className="mt-3 space-y-3">{presentation.changes.map((change, index) => {
                        const decision = decisions[change.id] ?? "pending";
                        const decisionStyles = { accepted: "border-success bg-success-soft", rejected: "border-danger bg-danger-soft", pending: "border-border bg-surface-raised" };
                        const decisionClasses = decisionStyles[decision];
                        return <article key={change.id} ref={(element) => {
                            cards.current[index] = element;
                        }} tabIndex={-1} className={`rounded-panel border p-3 ${decisionClasses}`}>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-semibold">{intl.formatMessage({ id: `views.changeType.${change.kind}` as never }, { index: index + 1, total: presentation.changes.length })}</h3>
                                    <p className="mt-1 text-xs text-muted">{intl.formatMessage({ id: `views.decision.${decision}` as never })}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="secondary" state={decision === "rejected" ? "error" : "default"} disabled={accepted || stale} onClick={() => setDecision(change.id, "rejected")}>{intl.formatMessage({ id: "views.rejectChange" })}</Button>
                                    <Button state={decision === "accepted" ? "success" : "default"} disabled={accepted || stale} onClick={() => setDecision(change.id, "accepted")}>{intl.formatMessage({ id: "views.acceptChange" })}</Button>
                                </div>
                            </div>
                            <div className="mt-4 flex min-h-9 items-start gap-2 border-y border-border py-3 text-sm" aria-live="polite">
                                <AssistantIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                                <p>{summaries?.[change.id] ?? (summaryState === "loading" ? intl.formatMessage({ id: "views.proposalSummaryLoading" }) : intl.formatMessage({ id: "views.proposalSummaryUnavailable" }))}</p>
                            </div>
                            <div className="mt-4">
                                <ProposalDiff decision={decision} original={change.baseLines.join("\n")} proposed={change.proposalLines.join("\n")} layout={displayMode === "side-by-side" ? "columns" : "stacked"} highlight={highlightChanges} />
                            </div>
                        </article>;
                    })}</div>
                }
            </div>
        </div>
    </div>;
}


function ProposalFallbackDiff({ review, reliable, stale, displayMode, highlight }: { review: TextProposal; reliable: boolean; stale: boolean; displayMode: "side-by-side" | "stacked"; highlight: boolean }) {
    const intl = useIntl();
    if (reliable && !stale)
        return null;

    return <div className="mt-4">
        {!reliable && <Banner className="mb-3" tone="warning">{intl.formatMessage({ id: "views.proposalFallback" })}</Banner>}
        <ProposalDiff original={review.baseContent} proposed={review.proposedContent} layout={displayMode === "side-by-side" ? "columns" : "stacked"} highlight={highlight} />
    </div>;
}


function ProposalWarnings({ warnings, dismissed, dismiss }: { warnings: ReturnType<typeof presentProposalReview>["warnings"]; dismissed: boolean; dismiss: () => void }) {
    const intl = useIntl();
    if (!warnings.length || dismissed)
        return null;

    return <div className="relative mb-4">
        <Status label={intl.formatMessage({ id: "views.preservationWarnings" })} tone="warning">
            <ul className="mt-1 list-disc pl-4 pr-8">
                {warnings.map((warning) => <li key={warning}>{intl.formatMessage({ id: `views.warning.${warning}` as never })}</li>)}
            </ul>
        </Status>
        <IconButton className="absolute right-2 top-2" label={intl.formatMessage({ id: "views.dismissPreservationWarnings" })} onClick={dismiss}><CloseIcon className="size-4" /></IconButton>
    </div>;
}
