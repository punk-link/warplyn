import {
    APPLICATION_ERROR, HTTP_STATUS, REVISION_PROVENANCE_KIND, applyProposalChanges, createTextProposal,
    parseProposalReplacements, withProposalReplacements, type AcceptProposalInput, type TextProposal,
} from "@skladno/shared";
import { ApplicationServiceError } from "../../../application/errors/application-service-error.js";
import { preservesProtectedContent } from "../../../application/editorial/proposals/proposal-result-policy.js";
import type { SqliteDatabase } from "../database.js";
import type { Row } from "./repository-utils.js";


function invalidProposalEdit(): never {
    throw new ApplicationServiceError(APPLICATION_ERROR.PROPOSAL_EDIT_INVALID, HTTP_STATUS.BAD_REQUEST);
}


function acceptedIds(review: TextProposal, input: AcceptProposalInput): Set<string> {
    const known = new Set(review.changes.map((change) => change.id));
    if (input.provenance.wholeProposal === true)
        return known;

    const ids = input.provenance.acceptedChangeIds;
    if (!Array.isArray(ids) || !ids.every((id) => typeof id === "string" && known.has(id)))
        invalidProposalEdit();

    return new Set(ids);
}


function matchesContent(review: TextProposal, ids: ReadonlySet<string>, content: string): boolean {
    return content === applyProposalChanges(review, ids) || content === applyProposalChanges(review, ids, true);
}


export function validateProposalAcceptance(database: SqliteDatabase, articleId: string, input: AcceptProposalInput, baseContent: string): void {
    if (input.translationRefresh)
        return;

    const artifactId = input.provenance.editorialArtifactId;
    if (artifactId === undefined && input.provenance.proposalReplacements === undefined)
        return;

    if (input.provenance.kind !== REVISION_PROVENANCE_KIND.ACCEPTED_PROPOSAL || typeof artifactId !== "string")
        invalidProposalEdit();

    const row = database.prepare((`SELECT content
        FROM editorial_artifacts
        WHERE id = ? AND article_id = ? AND revision_id = ?
            AND kind IN ('editorial-proposal', 'assistant-proposal', 'style-review') AND rejected_at IS NULL`))
        .get(artifactId, articleId, input.baseRevisionId) as Row | undefined;

    if (!row)
        invalidProposalEdit();

    const metadata: unknown = JSON.parse(String(row.content));
    if (typeof metadata !== "object" || metadata === null || !("proposal" in metadata) || typeof metadata.proposal !== "string")
        invalidProposalEdit();

    validateReplacementContent(createTextProposal(baseContent, metadata.proposal), input);
}


function validateReplacementContent(review: TextProposal, input: AcceptProposalInput): void {
    const ids = acceptedIds(review, input);
    const rawReplacements = input.provenance.proposalReplacements;
    if (rawReplacements !== undefined) {
        const replacements = parseProposalReplacements(rawReplacements);
        if (!replacements || Object.keys(replacements).some((id) => !ids.has(id)))
            invalidProposalEdit();

        if (!matchesContent(withProposalReplacements(review, replacements), ids, input.content))
            invalidProposalEdit();
    }

    // Generated corrections may intentionally change facts; Author edits must preserve the reviewed result's protected spans.
    if (!matchesContent(review, ids, input.content) && !preservesProtectedContent(applyProposalChanges(review, ids), input.content))
        invalidProposalEdit();
}
