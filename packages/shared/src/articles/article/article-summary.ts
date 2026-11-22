import type { Article } from "./article.js";
import type { ArticleDraft } from "../draft/draft.js";


export interface ArticleSummary extends Omit<Article, "currentRevision" | "draft" | "editorNotes"> {
    titleGeneration?: Article["currentRevision"]["titleGeneration"];
    draft?: Omit<ArticleDraft, "content">;
    attention?: {
        review: boolean;
        translation: boolean;
        findings: boolean;
        failed: boolean;
        latestResponse?: string;
    };
}
