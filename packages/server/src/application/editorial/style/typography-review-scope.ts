import { createTextProposal, type StyleReview } from "@skladno/shared";


export function scopeTypographyReview(source: string, replacement: string, review: StyleReview | undefined, scope: { kind: "article" } | { kind: "selection"; startOffset: number; endOffset: number }): StyleReview | undefined {
    if (!review?.typography || scope.kind !== "selection")
        return review;

    const selected = source.slice(scope.startOffset, scope.endOffset);
    const prefix = source.slice(0, scope.startOffset);
    const proposal = prefix + replacement + source.slice(scope.endOffset);
    const lineOffset = prefix.split("\n").length - 1;
    const scopedChanges = createTextProposal(selected, replacement).changes;
    const changes = createTextProposal(source, proposal).changes.flatMap((change) => {
        const related = scopedChanges.filter((item) => item.baseStart + lineOffset >= change.baseStart && item.baseStart + lineOffset < Math.max(change.baseEnd, change.baseStart + 1));
        const ruleIds = review.typography!.changes.filter((item) => related.some((relatedChange) => relatedChange.id === item.changeId)).flatMap((item) => item.ruleIds);
        return ruleIds.length ? [{ changeId: change.id, ruleIds: [...new Set(ruleIds)] }] : [];
    });
    const shift = (occurrence: NonNullable<StyleReview["typography"]>["occurrences"][number]) => ({ ...occurrence, start: occurrence.start + scope.startOffset, end: occurrence.end + scope.startOffset });

    return {
        ...review,
        findings: review.findings.map((finding) => finding.typographyOccurrence ? { ...finding, typographyOccurrence: shift(finding.typographyOccurrence) } : finding),
        typography: { ...review.typography, changes, occurrences: review.typography.occurrences.map(shift) },
    };
}
