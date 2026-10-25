import { applyProposalChanges, parseProposalReplacements, REVISION_PROVENANCE_KIND, type Article, type AssistantMessage,
    type TextProposal } from "@skladno/shared";
import type { ProposalDecision } from "./editorial-proposal-actions.js";
import type { ProposalBase } from "./editorial-proposal-helpers.js";


export function restoredAcceptance(article: Article, message: AssistantMessage, review: TextProposal): Record<string, ProposalDecision> | undefined {
    if (message.proposalAcceptance?.kind === "whole")
        return Object.fromEntries(review.changes.map((change) => [change.id, "accepted"]));

    if (message.proposalAcceptance?.kind === "changes") {
        const acceptedChangeIds = new Set(message.proposalAcceptance.acceptedChangeIds);
        return Object.fromEntries(review.changes.map((change) => [change.id, acceptedChangeIds.has(change.id) ? "accepted" : "rejected"]));
    }

    return restoredRevisionAcceptance(article, message, review);
}


export function restoredRevisionAcceptance(article: Article, message: Pick<AssistantMessage, "baseRevisionId" | "editorialArtifactId">,
    review: TextProposal): Record<string, ProposalDecision> | undefined {
    const provenance = article.currentRevision.provenance;
    if (provenance.kind !== REVISION_PROVENANCE_KIND.ACCEPTED_PROPOSAL || provenance.baseRevisionId !== message.baseRevisionId)
        return undefined;

    const wholeProposal = provenance.wholeProposal === true;
    const acceptedChangeIds = restoredChangeIds(provenance.acceptedChangeIds);
    const artifactMatches = matchingProposalArtifact(provenance.editorialArtifactId, message.editorialArtifactId);
    if (wholeProposal && (artifactMatches || article.currentRevision.content === review.proposedContent))
        return Object.fromEntries(review.changes.map((change) => [change.id, "accepted"]));

    if (wholeProposal || !acceptedChangeIds)
        return undefined;

    const acceptedContent = applyProposalChanges(review, acceptedChangeIds);
    const acceptedContentWithBlankLines = applyProposalChanges(review, acceptedChangeIds, true);
    if (!artifactMatches && article.currentRevision.content !== acceptedContent && article.currentRevision.content !== acceptedContentWithBlankLines)
        return undefined;

    return Object.fromEntries(review.changes.map((change) => [change.id, acceptedChangeIds.has(change.id) ? "accepted" : "rejected"]));
}


function matchingProposalArtifact(stored: unknown, artifactId: string | undefined): boolean {
    return typeof stored === "string" && stored === artifactId;
}


function restoredChangeIds(value: unknown): Set<string> | undefined {
    return Array.isArray(value) && value.every((id) => typeof id === "string") ? new Set(value) : undefined;
}


export function restoredProposalBase(article: Article, message: AssistantMessage, accepted: boolean): ProposalBase {
    const matchesRevision = matchingProposalArtifact(article.currentRevision.provenance.editorialArtifactId, message.editorialArtifactId);
    let acceptedReplacements = message.proposalAcceptance?.replacements;
    if (accepted && matchesRevision)
        acceptedReplacements = parseProposalReplacements(article.currentRevision.provenance.proposalReplacements);

    return {
        articleId: article.id, content: message.baseRevisionContent!, revisionId: message.baseRevisionId!, recoveredAt: message.createdAt,
        ...(message.editorialArtifactId ? { editorialArtifactId: message.editorialArtifactId } : {}), ...(accepted ? { accepted: true } : {}),
        ...(acceptedReplacements ? { acceptedReplacements } : {}),
    };
}
