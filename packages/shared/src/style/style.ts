export const styleCorpusPath = "/api/style-corpus";
export const styleCorpusRulesPath = `${styleCorpusPath}/rules`;
export const styleCorpusTypographyPath = `${styleCorpusPath}/typography`;
export const styleCorpusTypographyConfigurationPath = `${styleCorpusPath}/typography-configuration`;
export const createArticleTypographyPath = (articleId: string) => `/api/articles/${encodeURIComponent(articleId)}/typography`;
export const styleCorpusRebuildPath = `${styleCorpusPath}/rebuild`;
export const createArticleStyleRulesPath = (articleId: string) => `/api/articles/${encodeURIComponent(articleId)}/style-rules`;
export const createArticleTypographyReviewPath = (articleId: string) => `/api/articles/${encodeURIComponent(articleId)}/typography-review`;
export const createArticleStyleCorpusSnapshotPath = (articleId: string, revisionId: string) => `/api/articles/${encodeURIComponent(articleId)}/revisions/${encodeURIComponent(revisionId)}/style-corpus-snapshot`;


export interface StyleTrait {
    id: string;
    label: string;
    evidence: string;
}


export interface StyleProfileRules {
    typographyConfiguration?: import("./typography-configuration.js").TypographyConfiguration;
    typographyCapture?: import("./typography-configuration.js").TypographyCapture;
    manual: string;
    typography: import("./typography.js").TypographyRule[];
}


export interface StyleProfile {
    version: number;
    corpusItemCount: number;
    characterCount: number;
    confidence: "low" | "medium" | "high";
    traits: StyleTrait[];
    phrasesToAvoid: string[];
    contributorIds: string[];
    rules: StyleProfileRules;
    updatedAt: string;
}


export interface StyleCorpusItem {
    id: string;
    name: string;
    characterCount: number;
    wordCount: number;
    excerpt: string;
    createdAt: string;
    updatedAt: string;
    included: boolean;
    origin: "manual" | "import" | "article-revision";
    articleId?: string;
    revisionId?: string;
}


export interface StyleCorpus {
    typographyConfiguration?: import("./typography-configuration.js").TypographyConfiguration;
    items: StyleCorpusItem[];
    profile?: StyleProfile;
    rules: string;
    typographyRules?: import("./typography.js").TypographyRule[];
    status: "empty" | "outdated" | "ready";
}


export interface CreateStyleCorpusItemInput {
    name?: string;
    content: string;
    origin?: "manual" | "import" | "article-revision";
    articleId?: string;
    revisionId?: string;
}


export interface StyleCorpusClient {
    setTypographyConfiguration(input: import("./typography-configuration.js").TypographyConfigurationUpdate): Promise<StyleCorpus>;
    getArticleTypography(articleId: string): Promise<import("./typography-configuration.js").ArticleTypography | undefined>;
    getStyleCorpus(): Promise<StyleCorpus>;
    addStyleCorpusItem(input: CreateStyleCorpusItemInput): Promise<StyleCorpus>;
    setStyleCorpusItemIncluded(itemId: string, included: boolean): Promise<StyleCorpus>;
    setStyleCorpusRules(rules: string): Promise<StyleCorpus>;
    setTypographyRules(rules: import("./typography.js").TypographyRule[]): Promise<StyleCorpus>;
    getTypographyReview(articleId: string): Promise<import("./typography.js").TypographyReviewResult | undefined>;
    rebuildStyleCorpus(): Promise<StyleCorpus>;
    removeStyleCorpusItem(materialId: string): Promise<void>;
}


export interface ArticleStyleRulesClient {
    getArticleStyleRules(articleId: string): Promise<string>;
    setArticleStyleRules(articleId: string, rules: string): Promise<string>;
}


export interface ArticleStyleCorpusSnapshotClient {
    addArticleRevisionStyleCorpusItem?(articleId: string, revisionId: string): Promise<StyleCorpus>;
}
