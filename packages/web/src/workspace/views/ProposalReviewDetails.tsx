import { useIntl } from "react-intl";
import type { TextProposal } from "@skladno/shared";
import { Banner, IconButton, Status } from "../../ui/primitives.js";
import { CloseIcon } from "../../ui/icons.js";
import { presentProposalReview } from "./proposal-review-presentation.js";
import { ProposalChangeDiff } from "./ProposalChangeDiff.js";


export function ProposalFallbackDiff({ review, reliable, stale, displayMode, highlight }: {
    review: TextProposal; reliable: boolean; stale: boolean; displayMode: "side-by-side" | "stacked"; highlight: boolean;
}) {
    const intl = useIntl();
    if (reliable && !stale)
        return null;

    return <div className="mt-4">
        {!reliable && <Banner className="mb-3" tone="warning">{intl.formatMessage({ id: "views.proposalFallback" })}</Banner>}
        <ProposalChangeDiff
            original={review.baseContent}
            proposed={review.proposedContent}
            layout={displayMode === "side-by-side" ? "columns" : "stacked"}
            highlight={highlight} />
    </div>;
}


export function ProposalWarnings({ warnings, dismissed, dismiss }: {
    warnings: ReturnType<typeof presentProposalReview>["warnings"]; dismissed: boolean; dismiss: () => void;
}) {
    const intl = useIntl();
    if (!warnings.length || dismissed)
        return null;

    return <div className="relative mb-4">
        <Status label={intl.formatMessage({ id: "views.preservationWarnings" })} tone="warning">
            <ul className="mt-1 list-disc pl-4 pr-8">
                {warnings.map((warning) => <li key={warning}>{intl.formatMessage({ id: `views.warning.${warning}` as never })}</li>)}
            </ul>
        </Status>
        <IconButton
            className="absolute right-2 top-2"
            label={intl.formatMessage({ id: "views.dismissPreservationWarnings" })}
            onClick={dismiss}>
            <CloseIcon className="size-4" />
        </IconButton>
    </div>;
}
