import type { Article } from "./article.js";
import type { ArticleSummary } from "./article-summary.js";


export function summarizeArticle(article: ArticleSummary & Partial<Pick<Article, "currentRevision" | "editorNotes">>): ArticleSummary {
    const { currentRevision: _revision, editorNotes: _notes, draft, ...summary } = article;
    if (_revision?.titleGeneration)
        summary.titleGeneration = _revision.titleGeneration;
    else if (_revision)
        delete summary.titleGeneration;

    void _notes;
    if (!draft)
        return summary;

    if ("content" in draft) {
        const { content: _content, ...checkpoint } = draft;
        void _content;
        return { ...summary, draft: checkpoint };
    }

    return { ...summary, draft };
}
