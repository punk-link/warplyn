import type { Article, ArticleSummary, PublishLimitProfile, TranslationMetadata } from "@skladno/shared";


export interface TranslationsData {
    article: Article;
    sourceArticle?: Article;
    linkedTranslations?: readonly ArticleSummary[];
    translations?: readonly { metadata: TranslationMetadata; content: string; baseRevisionId: string; editorialArtifactId?: string }[];
    stale: boolean;
    translationLanguages?: readonly string[];
    publishProfile?: PublishLimitProfile;
    publishProfileLabel?: string;
    selectedTargetLanguage?: string;
}
