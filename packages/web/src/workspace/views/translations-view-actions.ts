import type { ArticleSummary } from "@skladno/shared";


export interface TranslationsActions {
    create: (resultId: string, target?: ArticleSummary) => Promise<void>;
    reject?: (resultId: string) => Promise<void>;
    edit?: () => void;
    openArticle?: (articleId: string) => void;
    selectTargetLanguage?: (language: string) => void;
    translate: (languages: readonly string[]) => void;
}
