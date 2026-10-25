import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createTextProposal } from "@skladno/shared";
import { useProposalEdits } from "./proposal-edit-state.js";


describe("Proposal edit lifecycle", () => {
    it("keeps edits until the Proposal identity changes and freezes submissions synchronously", () => {
        const review = createTextProposal("Original", "Generated");
        const { result, rerender } = renderHook(({ source, blocked }) => useProposalEdits(source, blocked),
            { initialProps: { source: review, blocked: false } });
        act(() => result.current.setReplacement("change-1", "Author text"));
        expect(result.current.effectiveReview?.proposedContent).toBe("Author text");
        act(() => {
            expect(result.current.beginSubmission()).toBe(true);
            expect(result.current.beginSubmission()).toBe(false);
            result.current.setReplacement("change-1", "Too late");
        });
        expect(result.current.replacements["change-1"]).toBe("Author text");
        act(() => result.current.endSubmission());
        expect(result.current.replacements["change-1"]).toBe("Author text");
        rerender({ source: review, blocked: true });
        act(() => result.current.setReplacement("change-1", "Blocked"));
        expect(result.current.beginSubmission()).toBe(false);
        expect(result.current.replacements["change-1"]).toBe("Author text");
        rerender({ source: createTextProposal("Other", "Other generated"), blocked: false });
        expect(result.current.replacements).toEqual({});
    });

    it("restores accepted replacement metadata and blocks unreliable reviews and unknown IDs", () => {
        const review = createTextProposal("Original", "Generated");
        const { result, rerender } = renderHook(({ source }) => useProposalEdits(source, false, { "change-1": "Accepted edit" }),
            { initialProps: { source: review } });
        expect(result.current.effectiveReview?.proposedContent).toBe("Accepted edit");
        act(() => result.current.setReplacement("missing", "Invalid"));
        expect(result.current.replacements.missing).toBeUndefined();
        rerender({ source: { ...review, proposedContent: "Unreliable" } });
        act(() => result.current.setReplacement("change-1", "Invalid"));
        expect(result.current.beginSubmission()).toBe(false);
        expect(result.current.replacements["change-1"]).toBe("Accepted edit");
    });
});
