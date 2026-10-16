import type { ProposalBase } from "./editorial-proposal-helpers.js";


export function canRecoverProposal(
    articleId: string,
    createdAt: string,
    current: ProposalBase | undefined,
    recovery: { articleIds: { current: Set<string> }; dates: { current: Map<string, string> } },
): boolean {
    if (current?.articleId === articleId && !current.recoveredAt)
        return false;

    const previousDate = recovery.dates.current.get(articleId);
    if (recovery.articleIds.current.has(articleId) && !previousDate)
        return false;

    return !previousDate || createdAt > previousDate;
}
