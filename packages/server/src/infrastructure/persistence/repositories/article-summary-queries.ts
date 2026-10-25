import type { ArticleSummary, ArticleRevisionSummary } from "@skladno/shared";
import type { SqliteDatabase } from "../database.js";
import { mapArticleSummaryFromRow, articleSummarySelect } from "./article-record-mappers.js";
import { parseObject, type Row } from "./repository-utils.js";


export function listArticleSummaries(database: SqliteDatabase): ArticleSummary[] {
    return (database.prepare(`${articleSummarySelect} ORDER BY CASE WHEN d.updated_at > a.updated_at THEN d.updated_at ELSE a.updated_at END DESC, a.id ASC`).all() as Row[]).map(mapArticleSummaryFromRow);
}


export function listRevisionSummaries(database: SqliteDatabase, articleId: string): ArticleRevisionSummary[] {
    const rows = database.prepare((`SELECT r.id, r.article_id, length(replace(r.content, char(0), char(1))) AS character_count,
        r.created_at, COALESCE(g.description, r.description) description, r.provenance_json, r.restored_from_revision_id
        FROM article_revisions r
        LEFT JOIN generated_revision_descriptions g ON g.revision_id = r.id
        WHERE r.article_id = ?
        ORDER BY r.created_at, r.id`)).all(articleId) as Row[];
    return rows.map((row) => ({
        id: String(row.id), articleId: String(row.article_id), createdAt: String(row.created_at),
        provenance: parseObject(row.provenance_json), characterCount: Number(row.character_count),
        ...(row.description ? { description: String(row.description) } : {}),
        ...(row.restored_from_revision_id ? { restoredFromRevisionId: String(row.restored_from_revision_id) } : {}),
    }));
}
