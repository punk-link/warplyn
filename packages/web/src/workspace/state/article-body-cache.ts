import { summarizeArticle, type Article, type ArticleSummary } from "@skladno/shared";


export function cacheArticleUpdate(cache: Map<string, Article>, article: Article | ArticleSummary): ArticleSummary {
    if ("currentRevision" in article) {
        cache.set(article.id, article);
        return summarizeArticle(article);
    }

    const loaded = cache.get(article.id);
    if (!loaded)
        return summarizeArticle(article);

    if (loaded.currentRevisionId !== article.currentRevisionId) {
        cache.delete(article.id);
        return summarizeArticle(article);
    }

    const draft = article.draft;
    if (draft && !("content" in draft) && draft.version !== loaded.draft?.version) {
        cache.delete(article.id);
        return summarizeArticle(article);
    }

    const content = draft && "content" in draft ? String(draft.content) : loaded.draft?.content;
    cache.set(article.id, { ...loaded, ...article, draft: draft && content !== undefined ? { ...draft, content } : undefined });

    return summarizeArticle(article);
}
