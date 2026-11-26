import type { ProposalDecision } from "./editorial-proposal-actions.js";
import type { ProposalBase } from "./editorial-proposal-helpers.js";


function storageKey(base: ProposalBase): string | undefined {
    const identity = base.editorialArtifactId ?? base.recoveredAt;
    return identity ? `warplyn-proposal-decisions:${JSON.stringify([base.articleId, base.revisionId, identity])}` : undefined;
}


export function loadProposalDecisions(base: ProposalBase): Record<string, ProposalDecision> {
    const key = storageKey(base);
    if (!key)
        return {};

    try {
        const value: unknown = JSON.parse(localStorage.getItem(key) ?? "{}");
        if (!value || typeof value !== "object" || Array.isArray(value))
            return {};

        return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, ProposalDecision] =>
            entry[1] === "pending" || entry[1] === "accepted" || entry[1] === "rejected"));
    } catch {
        return {};
    }
}


export function saveProposalDecisions(base: ProposalBase, decisions: Record<string, ProposalDecision>): void {
    const key = storageKey(base);
    if (key)
        localStorage.setItem(key, JSON.stringify(decisions));
}


export function loadProposalReplacements(base: ProposalBase): Record<string, string> {
    const key = storageKey(base);
    if (!key)
        return {};

    try {
        const value: unknown = JSON.parse(localStorage.getItem(`${key}:replacements`) ?? "{}");
        if (!value || typeof value !== "object" || Array.isArray(value))
            return {};

        return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
    } catch {
        return {};
    }
}


export function saveProposalReplacements(base: ProposalBase, replacements: Record<string, string>): void {
    const key = storageKey(base);
    if (key)
        localStorage.setItem(`${key}:replacements`, JSON.stringify(replacements));
}
