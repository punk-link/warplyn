import { success } from "@skladno/shared";
import { beginTelemetryCapture, defaultInterfaceLocale, type AcceptedChange, type AcceptProposalInput, Article, ArticleDraft, ArticleRevision, CreateArticleInput, SaveArticleDraftInput, SaveArticleRevisionInput, UpdateArticleInput } from "@skladno/shared";

import type { ArticleStore } from "./article-store.js";
import type { AssistantGreetingStore } from "./assistant-greeting-store.js";
import type { TelemetryObserver } from "../telemetry/telemetry-observer.js";
import type { RevisionDescriptionGenerator } from "../editorial/revision-description-generator.js";
import type { ArticleTitleGenerator } from "../editorial/article-title-generator.js";
import { ArticleTitleService } from "./article-title-service.js";
import { runArticleOperation, unwrapArticleOperation, type ArticleOperationResult } from "./article-operation-result.js";


export class ArticleService {
    private readonly titles: ArticleTitleService;


    constructor(
        private readonly store: ArticleStore,
        private readonly assistant: AssistantGreetingStore,
        private readonly telemetry?: TelemetryObserver,
        private readonly revisionDescriptionGenerator?: () => RevisionDescriptionGenerator | undefined,
        articleTitleGenerator: () => ArticleTitleGenerator | undefined = () => undefined,
    ) {
        this.titles = new ArticleTitleService(store, articleTitleGenerator);
    }


    listArticles(): Article[] {
        return this.store.listArticles();
    }


    listArticleSummaries() {
        return this.store.listArticleSummaries().map((article) => ({
            ...article, titleGeneration: this.titles.getGeneration(article.id, article.currentRevisionId),
        }));
    }


    listRevisionSummaries(articleId: string) {
        return this.store.listRevisionSummaries(articleId);
    }


    getRevision(articleId: string, revisionId: string) {
        return this.store.getRevision(articleId, revisionId);
    }


    createArticle(input: CreateArticleInput): Article {
        const article = this.store.createArticle(input);
        this.assistant.ensureGreeting(article.id);

        return article;
    }


    getArticle(articleId: string): Article | undefined {
        const article = this.store.getArticle(articleId);
        return article && { ...article, currentRevision: this.titles.getPromotion(article.currentRevision) };
    }


    updateArticle(articleId: string, input: UpdateArticleInput): Article {
        const article = this.store.updateArticle(articleId, input);
        if (input.title !== undefined || input.language !== undefined)
            this.titles.forget(articleId);

        return article;
    }


    deleteArticle(articleId: string): void {
        this.store.deleteArticle(articleId);
        this.titles.forget(articleId);
    }


    setArticleArchived(articleId: string, archived: boolean): Article[] {
        return this.store.setArticleArchived(articleId, archived);
    }


    setArticlePinned(articleId: string, pinned: boolean): Article {
        return this.store.setArticlePinned(articleId, pinned);
    }


    reorderPinnedArticles(articleIds: string[]): Article[] {
        return this.store.reorderPinnedArticles(articleIds);
    }


    saveDraft(articleId: string, input: SaveArticleDraftInput): ArticleDraft {
        return this.store.saveDraft(articleId, input);
    }


    discardDraft(articleId: string, expectedDraftVersion: number): void {
        this.store.discardDraft(articleId, expectedDraftVersion);
    }


    saveRevision(articleId: string, input: SaveArticleRevisionInput): ArticleRevision {
        return this.store.saveRevision(articleId, input);
    }


    async saveRevisionWithDescription(articleId: string, input: SaveArticleRevisionInput, signal: AbortSignal): Promise<ArticleRevision> {
        return unwrapArticleOperation(await this.promoteSavedRevision(articleId, input, signal));
    }


    private async promoteSavedRevision(
        articleId: string, input: SaveArticleRevisionInput, signal: AbortSignal,
    ): Promise<ArticleOperationResult<ArticleRevision>> {
        const previousContent = this.store.getArticle(articleId)?.currentRevision.content ?? "";
        const revision = runArticleOperation(() => this.store.saveRevision(articleId, input));
        if (!revision.ok)
            return revision;

        this.describeRevision(revision.value, previousContent, input.interfaceLocale ?? defaultInterfaceLocale, signal);
        return success(this.completeRevisionPromotion(revision.value, signal));
    }


    listRevisions(articleId: string): ArticleRevision[] {
        return this.store.listRevisions(articleId);
    }


    acceptChange(articleId: string, change: AcceptedChange): ArticleRevision {
        return this.store.appendArticleRevision(articleId, change.content, change.provenance);
    }


    acceptProposal(articleId: string, input: AcceptProposalInput): ArticleRevision {
        return this.store.acceptProposal(articleId, input);
    }


    async acceptProposalWithDescription(articleId: string, input: AcceptProposalInput, signal: AbortSignal): Promise<ArticleRevision> {
        return unwrapArticleOperation(await this.promoteAcceptedProposal(articleId, input, signal));
    }


    private async promoteAcceptedProposal(
        articleId: string, input: AcceptProposalInput, signal: AbortSignal,
    ): Promise<ArticleOperationResult<ArticleRevision>> {
        const previousContent = this.store.getArticle(articleId)?.currentRevision.content ?? "";
        const revision = runArticleOperation(() => this.store.acceptProposal(articleId, input));
        if (!revision.ok)
            return revision;

        this.describeRevision(revision.value, previousContent, input.interfaceLocale ?? defaultInterfaceLocale, signal);

        return success(this.completeRevisionPromotion(revision.value, signal));
    }


    describeRevision(revision: ArticleRevision, previousContent: string, locale: string, signal: AbortSignal): void {
        void this.generateRevisionDescription(revision, previousContent, locale, signal);
    }


    private async generateRevisionDescription(revision: ArticleRevision, previousContent: string, locale: string, signal: AbortSignal): Promise<void> {
        try {
            const boundedSignal = AbortSignal.any([signal, AbortSignal.timeout(15000)]);
            boundedSignal.throwIfAborted();
            const generated = await this.revisionDescriptionGenerator?.()?.generate(previousContent, revision.content, locale, boundedSignal);
            const description = generated?.trim();
            boundedSignal.throwIfAborted();
            if (description)
                this.store.setGeneratedRevisionDescription(revision.articleId, revision.id, description);
        } catch {
            return;
        }
    }


    async restoreRevisionWithTitle(articleId: string, revisionId: string): Promise<ArticleRevision> {
        return this.completeRevisionPromotion(this.restoreRevision(articleId, revisionId), new AbortController().signal);
    }


    completeRevisionPromotion(revision: ArticleRevision, signal: AbortSignal): ArticleRevision {
        return this.titles.completePromotion(revision, signal);
    }


    restoreRevision(articleId: string, revisionId: string): ArticleRevision {
        const capture = beginTelemetryCapture(this.telemetry);
        try {
            const revision = this.store.restoreRevision(articleId, revisionId);
            capture({ kind: "recovery_finished", recovery: "revision", outcome: "completed" });
            return revision;
        } catch (error) {
            capture({ kind: "recovery_finished", recovery: "revision", outcome: "failed", failure: "unknown" });
            throw error;
        }
    }
}
