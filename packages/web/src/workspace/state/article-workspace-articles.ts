import type { Article, ArticleSummary } from "@skladno/shared";


function getArticleActivityTimestamp(article: ArticleSummary): string {
    return article.draft && article.draft.updatedAt > article.updatedAt ? article.draft.updatedAt : article.updatedAt;
}


export function sortArticlesByActivity<T extends ArticleSummary>(articles: T[]): T[] {
    return [...articles].sort((first, second) => getArticleActivityTimestamp(second).localeCompare(getArticleActivityTimestamp(first)) || first.id.localeCompare(second.id));
}


export function withoutDraft<T extends ArticleSummary>(article: T): Omit<T, "draft"> {
    const { draft: _draft, ...result } = article;
    void _draft;
    return result;
}


export function getArticleContentForWorkspace(article: Article): string {
    return article.draft?.baseRevisionId === article.currentRevisionId ? article.draft.content : article.currentRevision.content;
}
