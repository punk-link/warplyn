import { APPLICATION_ERROR, isTypographyRules, typographyIssues, type CreateStyleCorpusItemInput, type StyleCorpus } from "@skladno/shared";

import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import { unwrapApplicationResult } from "../../errors/unwrap-application-result.js";
import type { EditorialEngineResolver } from "../engine/editorial-engine-resolver.js";
import type { StyleCorpusStore } from "./style-corpus-store.js";
import type { ArticleStore } from "../../articles/article-store.js";
import { typographyReviewResult } from "./typography-review-result.js";
import { isTypographyConfigurationUpdate } from "@skladno/shared";


export class StyleCorpusService {
    setTypographyConfiguration(input: unknown): StyleCorpus {
        return unwrapApplicationResult(this.updateTypographyConfiguration(input));
    }


    private updateTypographyConfiguration(input: unknown): ApplicationResult<StyleCorpus> {
        if (!isTypographyConfigurationUpdate(input))
            return failure(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID);

        return success(this.store.setTypographyConfiguration(input));
    }


    getArticleTypography(articleId: string) {
        return unwrapApplicationResult(this.readArticleTypography(articleId));
    }


    private readArticleTypography(articleId: string): ApplicationResult<import("@skladno/shared").ArticleTypography | undefined> {
        if (!this.articles?.getArticle(articleId))
            return failure(APPLICATION_ERROR.ARTICLE_NOT_FOUND, "not-found");

        return success(this.store.getArticleTypography(articleId));
    }


    constructor(
        private readonly store: StyleCorpusStore,
        private readonly engines?: EditorialEngineResolver,
        private readonly articles?: ArticleStore,
        private readonly artifacts?: {
            getLatestTypographyArtifact(articleId: string): import("@skladno/shared").EditorialArtifact | undefined;
        },
    ) {}


    getTypographyReview(articleId: string) {
        return typographyReviewResult(this.artifacts?.getLatestTypographyArtifact(articleId));
    }


    get(): StyleCorpus {
        return this.store.getStyleCorpus();
    }


    async add(input: CreateStyleCorpusItemInput, signal: AbortSignal): Promise<StyleCorpus> {
        return unwrapApplicationResult(await this.addCorpusItem(input, signal));
    }


    private async addCorpusItem(input: CreateStyleCorpusItemInput, signal: AbortSignal): Promise<ApplicationResult<StyleCorpus>> {
        if (!input.content.trim())
            return failure(APPLICATION_ERROR.INVALID_REQUEST);

        if (this.store.hasStyleCorpusContent(input.content))
            return failure(APPLICATION_ERROR.DUPLICATE_STYLE_CORPUS_ITEM);

        const name = input.name?.trim();
        if (name)
            return success(this.store.addStyleCorpusItem({ ...input, name }));

        const generator = this.engines?.resolveArticleTitleGenerator?.();
        if (!generator)
            return failure(APPLICATION_ERROR.EDITORIAL_CONFIGURATION_MISSING);

        const generatedName = (await generator.generate(input.content, signal)).trim();
        if (!generatedName)
            return failure(APPLICATION_ERROR.INVALID_REQUEST);

        return success(this.store.addStyleCorpusItem({ ...input, name: generatedName }));
    }


    setIncluded(id: string, included: boolean): StyleCorpus {
        return this.store.setStyleCorpusItemIncluded(id, included);
    }


    setRules(rules: string): StyleCorpus {
        return this.store.setStyleCorpusRules(rules);
    }


    rebuild(): StyleCorpus {
        return this.store.rebuildStyleProfile();
    }


    setTypographyRules(input: unknown): StyleCorpus {
        return unwrapApplicationResult(this.updateTypographyRules(input));
    }


    private updateTypographyRules(input: unknown): ApplicationResult<StyleCorpus> {
        if (!isTypographyRules(input)) {
            const issue = typographyIssues(input)[0];
            return failure(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, "invalid", {
                rule: (issue?.index ?? 0) + 1,
            });
        }

        return success(this.store.setTypographyRules(input));
    }


    getArticleRules(articleId: string): string {
        return this.store.getArticleStyleRules(articleId);
    }


    setArticleRules(articleId: string, rules: string): string {
        return this.store.setArticleStyleRules(articleId, rules);
    }


    addArticleRevision(articleId: string, revisionId: string): StyleCorpus {
        return unwrapApplicationResult(this.includeArticleRevision(articleId, revisionId));
    }


    includeArticleRevision(articleId: string, revisionId: string): ApplicationResult<StyleCorpus> {
        const article = this.articles?.getArticle(articleId);
        const revision = this.articles?.getRevision(articleId, revisionId);
        if (!article || !revision)
            return failure(APPLICATION_ERROR.REVISION_NOT_FOUND, "not-found");

        if (this.store.hasStyleCorpusContent(revision.content))
            return failure(APPLICATION_ERROR.DUPLICATE_STYLE_CORPUS_ITEM);

        const revisionNumber = this.articles!.listRevisions(articleId).findIndex((item) => item.id === revisionId) + 1;
        return success(this.store.addStyleCorpusItem({
            name: `${article.title} — Revision ${revisionNumber}`,
            content: revision.content,
            origin: "article-revision",
            articleId,
            revisionId,
        }));
    }


    remove(materialId: string): void {
        this.store.removeStyleCorpusItem(materialId);
    }
}
