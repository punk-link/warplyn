import type { Article } from "@skladno/shared";


export interface TranslationsActions {
    create: (targetLanguage: string, target?: Article) => Promise<void>;
    reject?: (targetLanguage: string) => Promise<void>;
    edit?: () => void;
    openArticle?: (articleId: string) => void;
    selectTargetLanguage?: (language: string) => void;
    translate: () => void;
}
