import type { SqliteDatabase } from "../database.js";
import { requireArticleTitle } from "./article-repository-errors.js";
import { getCurrentTimestamp } from "./repository-utils.js";


export function setGeneratedArticleTitle(database: SqliteDatabase, articleId: string, revisionId: string, title: string, expectedTitle?: string): boolean {
    const guard = expectedTitle === undefined ? "trim(title) = ''" : "title = ?";
    const parameters = [requireArticleTitle(title), getCurrentTimestamp(), articleId, revisionId];
    if (expectedTitle !== undefined)
        parameters.push(expectedTitle);

    const result = database.prepare(`UPDATE articles SET title = ?, updated_at = ? WHERE id = ? AND current_revision_id = ? AND ${guard}`)
        .run(...parameters);
    return result.changes > 0;
}
