import type { Article } from "./article.js";
import type { ArticleSummary } from "./article-summary.js";


export function summarizeArticle(article: ArticleSummary & Partial<Pick<Article, "currentRevision">>): ArticleSummary {
    const { currentRevision: _revision, draft, ...summary } = article;
    void _revision;
    if (!draft)
        return summary;

    if ("content" in draft) {
        const { content: _content, ...checkpoint } = draft;
        void _content;
        return { ...summary, draft: checkpoint };
    }

    return { ...summary, draft };
}
