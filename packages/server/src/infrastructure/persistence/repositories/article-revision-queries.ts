import type { ArticleRevision } from "@skladno/shared";

import type { SqliteDatabase } from "../database.js";
import { mapRevisionFromRow } from "./article-record-mappers.js";
import type { Row } from "./repository-utils.js";


export function listArticleRevisions(database: SqliteDatabase, articleId: string): ArticleRevision[] {
    return (database.prepare("SELECT * FROM article_revisions WHERE article_id = ? ORDER BY created_at ASC, id ASC").all(articleId) as Row[]).map(mapRevisionFromRow);
}


export function getArticleRevision(database: SqliteDatabase, articleId: string, revisionId: string): ArticleRevision | undefined {
    const row = database.prepare("SELECT * FROM article_revisions WHERE id = ? AND article_id = ?").get(revisionId, articleId) as Row | undefined;

    return row && mapRevisionFromRow(row);
}


export function insertArticleRevision(database: SqliteDatabase, revision: {
    revisionId: string;
    articleId: string;
    content: string;
    description?: string;
    provenance: Record<string, unknown>;
    restoredFromRevisionId?: string;
    timestamp: string;
}): void {
    const { revisionId, articleId, content, description, provenance, restoredFromRevisionId, timestamp } = revision;
    if (restoredFromRevisionId) {
        const historical = getArticleRevision(database, articleId, restoredFromRevisionId);
        if (historical)
            restoreTranslationSourceRevision(database, historical);
    }

    const sourceRevisionId = database.prepare("SELECT source_revision_id FROM articles WHERE id = ?").get(articleId)?.source_revision_id;
    const recordedProvenance = { ...provenance, ...(sourceRevisionId ? { sourceRevisionId } : {}) };
    database.prepare("INSERT INTO article_revisions (id, article_id, content, description, provenance_json, restored_from_revision_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .run(revisionId, articleId, content, description ?? null, JSON.stringify(recordedProvenance), restoredFromRevisionId ?? null, timestamp);
    database.prepare("UPDATE articles SET current_revision_id = ?, updated_at = ? WHERE id = ?")
        .run(revisionId, timestamp, articleId);
}


export function restoreTranslationSourceRevision(database: SqliteDatabase, historical: ArticleRevision): void {
    const sourceRevisionId = historical.provenance.sourceRevisionId ?? findFirstLaterLegacySourceRevision(database, historical);

    if (typeof sourceRevisionId === "string")
        database.prepare("UPDATE articles SET source_revision_id = ? WHERE id = ? AND source_article_id IS NOT NULL").run(sourceRevisionId, historical.articleId);
}


function findFirstLaterLegacySourceRevision(database: SqliteDatabase, historical: ArticleRevision): unknown {
    return database.prepare("SELECT json_extract(provenance_json, '$.previousSourceRevisionId') source_revision_id FROM article_revisions WHERE article_id = ? AND rowid > (SELECT rowid FROM article_revisions WHERE id = ?) AND json_extract(provenance_json, '$.previousSourceRevisionId') IS NOT NULL ORDER BY rowid LIMIT 1")
        .get(historical.articleId, historical.id)?.source_revision_id;
}
