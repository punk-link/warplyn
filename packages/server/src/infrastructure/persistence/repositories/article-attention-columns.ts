/** Library attention metadata excludes conversation and generated content bodies. */
export const articleAttentionColumns = `
    (SELECT m.created_at || ':' || m.id FROM assistant_messages m
        WHERE m.article_id = a.id AND m.role = 'assistant' AND m.kind = 'response' AND m.status = 'completed'
        ORDER BY m.created_at DESC, m.id DESC LIMIT 1) attention_response,
    (SELECT q.status = 'failed' FROM assistant_requests q WHERE q.article_id = a.id
        ORDER BY q.created_at DESC, q.rowid DESC LIMIT 1) attention_failed,
    (EXISTS(SELECT 1 FROM assistant_messages m JOIN assistant_requests q ON q.id = m.request_id
        LEFT JOIN editorial_artifacts e ON e.id = m.editorial_artifact_id
        WHERE m.article_id = a.id AND m.status = 'completed' AND q.base_revision_id = r.id
        AND (m.editorial_artifact_id IS NULL OR e.rejected_at IS NULL)
        AND (m.proposal_content IS NOT NULL OR m.response_kind = 'proposal_prepared'
            OR (m.edit_candidate_json IS NOT NULL AND m.applied_revision_id IS NULL))
        AND NOT EXISTS(SELECT 1 FROM article_revisions accepted WHERE accepted.article_id = a.id
            AND json_extract(accepted.provenance_json, '$.editorialArtifactId') = m.editorial_artifact_id))
        OR EXISTS(SELECT 1 FROM editorial_artifacts e WHERE e.article_id = a.id AND e.revision_id = r.id
            AND e.rejected_at IS NULL AND CASE WHEN json_valid(e.content) THEN json_extract(e.content, '$.proposal') END IS NOT NULL
            AND NOT EXISTS(SELECT 1 FROM article_revisions accepted WHERE accepted.article_id = a.id
                AND json_extract(accepted.provenance_json, '$.editorialArtifactId') = e.id))) attention_review,
    EXISTS(SELECT 1 FROM assistant_messages m JOIN editorial_artifacts e ON e.id = m.editorial_artifact_id
        WHERE m.article_id = a.id AND m.status = 'completed' AND m.response_kind = 'translation_proposal_prepared'
        AND e.revision_id = r.id AND e.rejected_at IS NULL
        AND NOT EXISTS(SELECT 1 FROM article_revisions accepted
            WHERE json_extract(accepted.provenance_json, '$.editorialArtifactId') = e.id)) attention_translation,
    EXISTS(SELECT 1 FROM fact_occurrences f JOIN editorial_artifacts e ON e.id = f.editorial_artifact_id
        LEFT JOIN fact_check_resolutions resolved ON resolved.occurrence_id = f.id
        WHERE e.article_id = a.id AND f.revision_id = r.id AND e.rejected_at IS NULL
        AND resolved.occurrence_id IS NULL) attention_findings`;
