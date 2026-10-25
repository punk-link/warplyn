import { useIntl } from "react-intl";
import type { TypographyReview } from "@skladno/shared";
import { TypographyChangeSupport } from "./TypographyChangeSupport.js";


export function ProposalChangeSupport({ edited, typography, changeId, summary, loading }: {
    edited: boolean;
    typography?: TypographyReview;
    changeId: string;
    summary?: string;
    loading: boolean;
}) {
    const intl = useIntl();
    if (edited)
        return <p>{intl.formatMessage({ id: "views.proposalAuthorEdited" })}</p>;

    if (typography?.changes.some((item) => item.changeId === changeId))
        return <TypographyChangeSupport typography={typography} changeId={changeId} />;

    const fallback = loading ? "views.proposalSummaryLoading" : "views.proposalSummaryUnavailable";

    return <p>{summary ?? intl.formatMessage({ id: fallback })}</p>;
}
