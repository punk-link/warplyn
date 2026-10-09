import type { SqliteDatabase } from "../database.js";
import { requireArticleTitle } from "./article-repository-errors.js";
import { getCurrentTimestamp } from "./repository-utils.js";


export function setGeneratedArticleTitle(database: SqliteDatabase, articleId: string, revisionId: string, title: string): boolean {
    const result = database.prepare("UPDATE articles SET title = ?, updated_at = ? WHERE id = ? AND current_revision_id = ? AND trim(title) = ''")
        .run(requireArticleTitle(title), getCurrentTimestamp(), articleId, revisionId);
    return result.changes > 0;
}
