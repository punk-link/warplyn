import type { Article, ArticleSummary, GeneralSettings, PublishLimitProfile, TranslationMetadata } from "@skladno/shared";


export interface TranslationsData {
    article: Article;
    sourceArticle?: Article;
    linkedTranslations?: readonly ArticleSummary[];
    translations?: readonly { metadata: TranslationMetadata; content: string; baseRevisionId: string; editorialArtifactId?: string; resultId?: string; createdAt?: string }[];
    sourceContent?: string;
    requestActive?: boolean;
    generalSettings?: GeneralSettings;
    revisionNumbers?: Readonly<Record<string, number>>;
    stale: boolean;
    translationLanguages?: readonly string[];
    publishProfile?: PublishLimitProfile;
    publishProfileLabel?: string;
    selectedTargetLanguage?: string;
}
