import type { Article, ArticleSummary, ArticleRevision } from "@skladno/shared";


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


export function withPromotedRevision(article: ArticleSummary, revision: ArticleRevision): Article {
    const title = revision.titleGeneration?.status === "generated" ? revision.titleGeneration.title : article.title;
    return { ...withoutDraft(article), title, updatedAt: revision.createdAt, currentRevisionId: revision.id, currentRevision: revision };
}
