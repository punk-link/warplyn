import type { Article, ArticleDraft, SaveArticleDraftInput } from "@skladno/shared";

import { ArticleDraftConflictError } from "../../../application/articles/article-draft-conflict-error.js";
import { ArticleRevisionConflictError } from "../../../application/articles/article-revision-conflict-error.js";
import { throwArticleNotFound } from "./article-repository-errors.js";
import { getCurrentTimestamp } from "./repository-utils.js";
import type { SqliteDatabase } from "../database.js";


type FindArticle = (articleId: string) => Article | undefined;


export function saveArticleDraft(database: SqliteDatabase, articleId: string, input: SaveArticleDraftInput, findArticle: FindArticle): ArticleDraft {
    database.exec("BEGIN IMMEDIATE;");
    try {
        const current = findArticle(articleId);
        if (!current)
            throwArticleNotFound();

        if (current.currentRevisionId !== input.baseRevisionId)
            throw new ArticleRevisionConflictError(current);

        const existing = current.draft;
        if (existing?.version !== input.expectedDraftVersion)
            throw new ArticleDraftConflictError(current, existing);

        const timestamp = getCurrentTimestamp();
        const version = (existing?.version ?? 0) + 1;
        database.prepare((`INSERT INTO article_drafts (article_id, content, base_revision_id, version, updated_at)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(article_id) DO UPDATE
            SET content = excluded.content, base_revision_id = excluded.base_revision_id, version = excluded.version, updated_at = excluded.updated_at`))
            .run(articleId, input.content, input.baseRevisionId, version, timestamp);
        database.exec("COMMIT;");
    } catch (error) {
        database.exec("ROLLBACK;");
        throw error;
    }

    return findArticle(articleId)!.draft!;
}


export function discardArticleDraft(database: SqliteDatabase, articleId: string, expectedDraftVersion: number, findArticle: FindArticle): void {
    database.exec("BEGIN IMMEDIATE;");
    try {
        const current = findArticle(articleId);
        if (!current)
            throwArticleNotFound();

        if (current.draft?.version !== expectedDraftVersion)
            throw new ArticleDraftConflictError(current, current.draft);

        database.prepare("DELETE FROM article_drafts WHERE article_id = ? AND version = ?")
            .run(articleId, expectedDraftVersion);
        database.exec("COMMIT;");
    } catch (error) {
        database.exec("ROLLBACK;");
        throw error;
    }
}
