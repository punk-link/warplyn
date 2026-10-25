import { applyProposalChanges, type TextProposal } from "./revisions.js";


export function withProposalReplacements(review: TextProposal, replacements: Readonly<Record<string, string>>): TextProposal {
    const changes = review.changes.map((change) => {
        const replacement = replacements[change.id];
        if (replacement === undefined)
            return change;

        return { ...change, proposalLines: replacement === "" ? [] : replacement.split("\n") };
    });

    const edited = { ...review, changes };

    return { ...edited, proposedContent: applyProposalChanges(edited, new Set(changes.map((change) => change.id))) };
}


export function parseProposalReplacements(value: unknown): Record<string, string> | undefined {
    if (typeof value !== "object" || value === null || Array.isArray(value))
        return undefined;

    const entries = Object.entries(value);
    if (entries.some(([, text]) => typeof text !== "string"))
        return undefined;

    return Object.fromEntries(entries);
}
