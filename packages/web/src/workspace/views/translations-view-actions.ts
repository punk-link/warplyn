import type { ArticleSummary } from "@skladno/shared";


export interface TranslationsActions {
    create: (targetLanguage: string, target?: ArticleSummary) => Promise<void>;
    reject?: (targetLanguage: string) => Promise<void>;
    edit?: () => void;
    openArticle?: (articleId: string) => void;
    selectTargetLanguage?: (language: string) => void;
    translate: () => void;
}
