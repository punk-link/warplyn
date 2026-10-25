import { useMemo, useRef, useState } from "react";
import { applyProposalChanges, withProposalReplacements, type TextProposal } from "@skladno/shared";


export function useProposalEdits(review: TextProposal | undefined, blocked: boolean, recovered?: Record<string, string>, identity?: string) {
    const [draft, setDraft] = useState({ source: review, identity, replacements: recovered ?? {} });
    const [submitting, setSubmitting] = useState(false);
    const submittingRef = useRef(false);
    if (draft.source !== review || draft.identity !== identity)
        setDraft({ source: review, identity, replacements: recovered ?? {} });

    const replacements = useMemo(() => draft.source === review && draft.identity === identity ? draft.replacements : recovered ?? {},
        [draft, review, recovered, identity]);
    const effectiveReview = useMemo(() => review && withProposalReplacements(review, replacements), [review, replacements]);
    const reliable = Boolean(review && applyProposalChanges(review, new Set(review.changes.map((change) => change.id))) === review.proposedContent);


    function setReplacement(id: string, text: string) {
        if (blocked || submittingRef.current || !reliable || !review?.changes.some((change) => change.id === id))
            return;

        setDraft((current) => ({ source: review, identity, replacements: { ...current.replacements, [id]: text } }));
    }


    function beginSubmission(wholeProposal = false): boolean {
        if (blocked || submittingRef.current || (!reliable && !wholeProposal))
            return false;

        submittingRef.current = true;
        setSubmitting(true);
        return true;
    }


    function endSubmission() {
        submittingRef.current = false;
        setSubmitting(false);
    }


    return { replacements, effectiveReview, submitting, setReplacement, beginSubmission, endSubmission };
}
