import type { Article } from "./article.js";
import type { ArticleDraft } from "../draft/draft.js";


export interface ArticleSummary extends Omit<Article, "currentRevision" | "draft"> {
    draft?: Omit<ArticleDraft, "content">;
}


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
