import { APPLICATION_ERROR, getPublishLimitProfile, isPublishLimitProfileId, type Article, type EditorialArtifact, type FactCheck } from "@skladno/shared";
import { resolveTypography } from "@skladno/shared";

import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import type { ArticleService } from "../../articles/article-service.js";
import type { PublishingService } from "../../publishing/publishing-service.js";
import type { StyleCorpusService } from "../../editorial/style/style-corpus-service.js";
import { EDITORIAL_CAPABILITY } from "./editorial-capability-id.js";
import type { ReadCapability } from "./read-capability.js";


export interface ArtifactStore { listEditorialArtifacts(articleId: string): EditorialArtifact[]; getEditorialArtifact(artifactId: string, articleId: string): EditorialArtifact | undefined; }


export interface FactChecksStore { listFactChecks(articleId: string): FactCheck[]; }


export interface EditorialCapabilityReadDependencies {
    articles: ArticleService;
    artifacts: ArtifactStore;
    publishing: PublishingService;
    styleCorpus: StyleCorpusService;
    factChecks: FactChecksStore;
}


export function readEditorialCapability(
    dependencies: EditorialCapabilityReadDependencies,
    capability: Exclude<ReadCapability, "inspect_proposal_summary">,
    article: Article,
): unknown {
    switch (capability) {
        case EDITORIAL_CAPABILITY.INSPECT_ARTICLE:
            return {
                id: article.id,
                title: article.title,
                language: article.language,
                audience: article.audience,
                publishingProfileId: article.publishingProfileId,
                currentRevision: { id: article.currentRevision.id, createdAt: article.currentRevision.createdAt, content: article.currentRevision.content }
            };
        case EDITORIAL_CAPABILITY.INSPECT_LINKED_ARTICLES:
            return dependencies.articles.listArticles()
                .filter((candidate) => candidate.id === article.sourceArticleId || candidate.sourceArticleId === article.id)
                .map((candidate) => ({
                    id: candidate.id,
                    title: candidate.title,
                    language: candidate.language,
                    sourceArticleId: candidate.sourceArticleId,
                    sourceRevisionId: candidate.sourceRevisionId,
                    currentRevisionId: candidate.currentRevisionId,
                    updatedAt: candidate.updatedAt
                }));
        case EDITORIAL_CAPABILITY.INSPECT_REVISIONS:
            return dependencies.articles.listRevisions(article.id).map((revision) => ({ id: revision.id, createdAt: revision.createdAt, provenance: revision.provenance, restoredFromRevisionId: revision.restoredFromRevisionId }));
        case EDITORIAL_CAPABILITY.INSPECT_DRAFT:
            return article.draft
                ? { state: article.draft.baseRevisionId === article.currentRevisionId ? "current" : "stale", baseRevisionId: article.draft.baseRevisionId, version: article.draft.version, updatedAt: article.draft.updatedAt }
                : { state: "none" };
        case EDITORIAL_CAPABILITY.INSPECT_ARTIFACTS:
            return dependencies.artifacts.listEditorialArtifacts(article.id).map(({ id, revisionId, kind, createdAt }) => ({ id, revisionId, kind, createdAt }));
        case EDITORIAL_CAPABILITY.INSPECT_FACT_CHECKS:
            return dependencies.factChecks.listFactChecks(article.id).map((check) => ({
                reviewedRevisionId: check.reviewedRevisionId,
                createdAt: check.createdAt,
                findings: check.findings.map(({ claim, status, sources, uncertainty, checkedAt, occurrenceId, resolution, stale }) => ({ claim, status, sources, uncertainty, checkedAt, occurrenceId, resolution, stale }))
            }));
        case EDITORIAL_CAPABILITY.INSPECT_PUBLISHING_GUIDANCE: {
            const settings = dependencies.publishing.getSettings();
            const profileId = isPublishLimitProfileId(article.publishingProfileId) ? article.publishingProfileId : settings.defaultProfileId;
            return { profile: getPublishLimitProfile(profileId, settings) };
        }
        case EDITORIAL_CAPABILITY.INSPECT_STYLE_CORPUS: {
            const corpus = dependencies.styleCorpus.get();
            return {
                status: corpus.status,
                itemCount: corpus.items.length,
                rules: corpus.rules,
                typographyRuleCount: resolveTypography(article.language, corpus.typographyConfiguration,
                    dependencies.styleCorpus.getArticleTypography(article.id)).rules.length,
                currentRevisionIncluded: corpus.items.some((item) => item.revisionId === article.currentRevisionId)
            };
        }
        case EDITORIAL_CAPABILITY.INSPECT_ARTICLE_STYLE_RULES:
            return { rules: dependencies.styleCorpus.getArticleRules(article.id) };
        case EDITORIAL_CAPABILITY.INSPECT_TRANSLATIONS:
            return readTranslations(dependencies.artifacts, dependencies.articles, article);
    }
}


export function readProposalSummary(artifacts: ArtifactStore, articleId: string, artifactId: string): ApplicationResult<unknown> {
    const artifact = artifacts.getEditorialArtifact(artifactId, articleId);
    if (!artifact)
        return failure(APPLICATION_ERROR.INVALID_REQUEST);

    const content: unknown = JSON.parse(artifact.content);
    return success(content && typeof content === "object" && !Array.isArray(content)
        ? { artifactId: artifact.id, summaries: (content as { proposalSummaries?: unknown }).proposalSummaries ?? [] }
        : { artifactId: artifact.id, summaries: [] });
}


function readTranslations(artifacts: ArtifactStore, articles: ArticleService, article: Article): unknown {
    const prepared = artifacts.listEditorialArtifacts(article.id).flatMap((artifact) => {
        try {
            const content = JSON.parse(artifact.content) as { translation?: { targetLanguage?: unknown } };
            return typeof content.translation?.targetLanguage === "string"
                ? [{ artifactId: artifact.id, revisionId: artifact.revisionId, targetLanguage: content.translation.targetLanguage, fresh: artifact.revisionId === article.currentRevisionId }]
                : [];
        } catch {
            return [];
        }
    });

    return {
        prepared,
        linked: articles.listArticles()
            .filter((candidate) => candidate.sourceArticleId === article.id)
            .map((candidate) => ({
                id: candidate.id,
                title: candidate.title,
                language: candidate.language,
                sourceRevisionId: candidate.sourceRevisionId,
                fresh: candidate.sourceRevisionId === article.currentRevisionId
            }))
    };
}
