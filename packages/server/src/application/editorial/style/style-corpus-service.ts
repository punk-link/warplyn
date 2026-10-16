import { APPLICATION_ERROR, HTTP_STATUS, isTypographyRules, typographyIssues, type CreateStyleCorpusItemInput, type StyleCorpus } from "@skladno/shared";

import { ApplicationServiceError } from "../../errors/application-service-error.js";
import type { EditorialEngineResolver } from "../engine/editorial-engine-resolver.js";
import type { StyleCorpusStore } from "./style-corpus-store.js";
import type { ArticleStore } from "../../articles/article-store.js";
import { typographyReviewResult } from "./typography-review-result.js";
import { isTypographyConfigurationUpdate } from "@skladno/shared";


export class StyleCorpusService {
    setTypographyConfiguration(input: unknown): StyleCorpus {
        if (!isTypographyConfigurationUpdate(input))
            throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST);

        return this.store.setTypographyConfiguration(input);
    }


    getArticleTypography(articleId: string) {
        if (!this.articles?.getArticle(articleId))
            throw new ApplicationServiceError(APPLICATION_ERROR.ARTICLE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

        return this.store.getArticleTypography(articleId);
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
        if (!input.content.trim())
            throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

        if (this.store.hasStyleCorpusContent(input.content))
            throw new ApplicationServiceError(APPLICATION_ERROR.DUPLICATE_STYLE_CORPUS_ITEM, HTTP_STATUS.BAD_REQUEST);

        const name = input.name?.trim();
        if (name)
            return this.store.addStyleCorpusItem({ ...input, name });

        const generator = this.engines?.resolveArticleTitleGenerator?.();
        if (!generator)
            throw new ApplicationServiceError(APPLICATION_ERROR.EDITORIAL_CONFIGURATION_MISSING, HTTP_STATUS.BAD_REQUEST);

        const generatedName = (await generator.generate(input.content, signal)).trim();
        if (!generatedName)
            throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

        return this.store.addStyleCorpusItem({ ...input, name: generatedName });
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
        if (!isTypographyRules(input)) {
            const issue = typographyIssues(input)[0];
            throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST, {
                rule: (issue?.index ?? 0) + 1,
            });
        }

        return this.store.setTypographyRules(input);
    }


    getArticleRules(articleId: string): string {
        return this.store.getArticleStyleRules(articleId);
    }


    setArticleRules(articleId: string, rules: string): string {
        return this.store.setArticleStyleRules(articleId, rules);
    }


    addArticleRevision(articleId: string, revisionId: string): StyleCorpus {
        const article = this.articles?.getArticle(articleId);
        const revision = this.articles?.getRevision(articleId, revisionId);
        if (!article || !revision)
            throw new ApplicationServiceError(APPLICATION_ERROR.REVISION_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

        if (this.store.hasStyleCorpusContent(revision.content))
            throw new ApplicationServiceError(APPLICATION_ERROR.DUPLICATE_STYLE_CORPUS_ITEM, HTTP_STATUS.BAD_REQUEST);

        const revisionNumber = this.articles!.listRevisions(articleId).findIndex((item) => item.id === revisionId) + 1;
        return this.store.addStyleCorpusItem({
            name: `${article.title} — Revision ${revisionNumber}`,
            content: revision.content,
            origin: "article-revision",
            articleId,
            revisionId,
        });
    }


    remove(materialId: string): void {
        this.store.removeStyleCorpusItem(materialId);
    }
}
