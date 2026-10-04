import { APPLICATION_ERROR, HTTP_STATUS, applyProposalChanges, createTextProposal, type AcceptProposalInput } from "@skladno/shared";
import { ApplicationServiceError } from "../../../application/errors/application-service-error.js";
import type { SqliteDatabase } from "../database.js";
import type { Row } from "./repository-utils.js";


export function resolveAcceptedCorrections(database: SqliteDatabase, articleId: string, input: AcceptProposalInput, baseContent: string, timestamp: string): void {
    const artifactId = input.provenance.editorialArtifactId;
    if (typeof artifactId !== "string" || input.provenance.wholeProposal !== true)
        return;

    const row = database.prepare("SELECT content FROM editorial_artifacts WHERE id = ? AND article_id = ? AND revision_id = ? AND kind = 'editorial-proposal' AND rejected_at IS NULL")
        .get(artifactId, articleId, input.baseRevisionId) as Row | undefined;
    if (!row)
        return;

    const metadata = JSON.parse(String(row.content)) as { proposal?: unknown; correctionSelection?: { expectedRevisionId?: unknown; occurrenceIds?: unknown } };
    const selection = metadata.correctionSelection;
    if (!selection)
        return;

    const ids = selection.occurrenceIds;
    if (selection.expectedRevisionId !== input.baseRevisionId || !Array.isArray(ids) || ids.length === 0 || ids.some((id) => typeof id !== "string") || typeof metadata.proposal !== "string")
        throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

    const review = createTextProposal(baseContent, metadata.proposal);
    const expectedContent = applyProposalChanges(review, new Set(review.changes.map((change) => change.id)), true);
    if (input.content === baseContent || input.content !== expectedContent)
        throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

    const resolve = database.prepare("INSERT INTO fact_check_resolutions (occurrence_id, resolution, updated_at) SELECT o.id, 'corrected_or_removed', ? FROM fact_occurrences o JOIN facts f ON f.id = o.fact_id WHERE o.id = ? AND o.revision_id = ? AND f.article_id = ? AND NOT EXISTS (SELECT 1 FROM fact_check_resolutions r WHERE r.occurrence_id = o.id)");
    if (ids.some((id) => resolve.run(timestamp, id, input.baseRevisionId, articleId).changes !== 1))
        throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);
}

