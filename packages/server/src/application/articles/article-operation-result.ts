import { success, failure, type Result } from "@skladno/shared";
import { ArticleDraftConflictError } from "./article-draft-conflict-error.js";
import { ArticleRevisionConflictError } from "./article-revision-conflict-error.js";


export type ArticleOperationResult<T> = Result<T, { error: ArticleDraftConflictError | ArticleRevisionConflictError }>;


export function runArticleOperation<T>(operation: () => T): ArticleOperationResult<T> {
    try {
        return success(operation());
    } catch (error) {
        if (error instanceof ArticleDraftConflictError || error instanceof ArticleRevisionConflictError)
            return failure({ error });

        throw error;
    }
}


export function unwrapArticleOperation<T>(result: ArticleOperationResult<T>): T {
    if (result.ok)
        return result.value;

    throw result.error;
}
