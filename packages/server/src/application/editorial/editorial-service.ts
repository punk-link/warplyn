import {
    APPLICATION_ERROR,
    beginTimedTelemetryCapture,
    EDITORIAL_OPERATION,
    HTTP_STATUS,
    type Article,
    type CreateEditorialArtifactInput,
    type EditorialArtifact,
    type EditorialOperation,
    type FactCheck,
    type StyleProfile
} from "@skladno/shared";
import { validateProposalResult } from "./proposals/proposal-result-policy.js";
import { ApplicationServiceError } from "../errors/application-service-error.js";
import { prepareEditorialStream, type EditorialStreamContext } from "./prepare-editorial-stream.js";
import { unwrapApplicationResult } from "../errors/unwrap-application-result.js";
import type { EditorialEngineEvent } from "./engine/editorial-engine-event.js";
import { EDITORIAL_ENGINE_ERROR } from "./engine/editorial-engine-errors.js";
import { EDITORIAL_ENGINE_EVENT } from "./engine/editorial-engine-events.js";
import { EditorialEngineError } from "./engine/editorial-engine-error.js";
import type { EditorialEngineResolver } from "./engine/editorial-engine-resolver.js";
import type { EditorialServiceRequest } from "./editorial-request.js";
import { selectionContext } from "./editorial-selection-input.js";
import { getReusableFactFindings } from "./fact-checking/reusable-fact-findings.js";
import { persistFactCheckArtifact } from "./fact-checking/persist-fact-check-artifact.js";
import type { FactCheckArtifactStore } from "./fact-checking/fact-check-artifact-store.js";
import type { FactCheckRunStore } from "./fact-checking/fact-check-run-store.js";
import type { TelemetryObserver } from "../telemetry/telemetry-observer.js";
import { captureOperationOutcome, runAiFailureStage } from "../telemetry/ai-failure-category.js";
import { beginAiOperation, withAiOperation } from "../telemetry/ai-operation-context.js";
import { reviewTypography } from "./style/typography-review.js";


interface EditorialArticleStore {
    getArticle(articleId: string): Article | undefined;
}


interface EditorialSessionStore {
    getEditorialSession(articleId: string): import("@skladno/shared").EditorialSession | undefined;
    saveEditorialSession(articleId: string, session: Pick<import("@skladno/shared").EditorialSession, "continuationToken" | "connectionId" | "provider" | "model">): void;
    removeEditorialSession(articleId: string): void;
}


interface EditorialStyleCorpusStore {
    getArticleTypography?(articleId: string): import("@skladno/shared").ArticleTypography | undefined;
    getStyleCorpus(): { profile?: StyleProfile; status: "empty" | "outdated" | "ready" };
    getArticleStyleRules(articleId: string): string;
}


interface EditorialArtifactsStore extends FactCheckArtifactStore {
    createEditorialArtifact(input: CreateEditorialArtifactInput): EditorialArtifact;
}


interface FactChecksStore extends FactCheckRunStore { listFactChecks(articleId: string): FactCheck[]; }


interface EditorialServiceStores {
    articles: EditorialArticleStore;
    sessions: EditorialSessionStore;
    styleCorpus: EditorialStyleCorpusStore;
    artifacts: EditorialArtifactsStore;
    factChecks: FactChecksStore;
}


interface EditorialServiceRuntime {
    engines: EditorialEngineResolver;
    sessionContinuationEnabled: boolean;
}


function createEngineRequest(request: EditorialServiceRequest, context: EditorialStreamContext, factChecks: FactChecksStore) {
    return {
        operation: request.editorial.operation,
        article: request.articleContext.content ?? context.article.currentRevision.content,
        articleTitle: context.article.title,
        ...selectionContext(request),
        authorContext: context.correction?.context ?? request.editorial.authorContext,
        ...(request.editorial.skillId ? { skillId: request.editorial.skillId } : {}),
        ...(request.editorial.skill ? { skill: request.editorial.skill } : {}),
        ...(request.articleContext.targetArticleCharacterLimit ? { targetArticleCharacterLimit: request.articleContext.targetArticleCharacterLimit } : {}),
        ...(context.style ? { styleProfile: context.style.profile, articleStyleRules: context.style.articleRules } : {}),
        ...(request.articleContext.targetLanguage ? { targetLanguage: request.articleContext.targetLanguage } : {}),
        ...(context.continuation?.previousResponseId ? { previousResponseId: context.continuation.previousResponseId } : {}),
        ...(context.operation.factCheck ? {
            reusableFactFindings: getReusableFactFindings(factChecks, request.articleContext.articleId),
            skipFactCheckClaim: request.factChecking?.skipClaim,
        } : {}),
    };
}


function getEditorialArtifactKind(operation: EditorialOperation, factCheck: boolean): "fact-check" | "style-review" | "editorial-proposal" {
    if (factCheck)
        return "fact-check";

    return operation === EDITORIAL_OPERATION.STYLE_REVIEW ? "style-review" : "editorial-proposal";
}


function createEditorialArtifactMetadata(request: EditorialServiceRequest, context: EditorialStreamContext, event: Extract<EditorialEngineEvent, { type: typeof EDITORIAL_ENGINE_EVENT.COMPLETED }>, includeFactCheck = true) {
    return {
        requestId: request.requestId,
        operation: request.editorial.operation,
        authorContext: request.editorial.authorContext,
        ...(request.articleContext.targetLanguage ? { targetLanguage: request.articleContext.targetLanguage } : {}),
        responseId: event.responseId,
        proposal: event.text,
        ...(event.styleReview?.typography ? { baseContent: request.articleContext.content ?? context.article.currentRevision.content } : {}),
        styleProfile: event.styleReview?.profileSnapshot ?? context.style?.profile,
        articleStyleRules: context.style?.articleRules,
        findings: event.styleReview?.findings,
        ...(event.styleReview ? { styleReview: event.styleReview } : {}),
        ...(includeFactCheck ? { factCheck: event.factCheck } : {}),
        translation: event.translation,
        ...(context.correction ? { correctionSelection: context.correction.selection } : {}),
    };
}


function persistCompletedEditorialOutput(sessions: EditorialSessionStore, artifacts: EditorialArtifactsStore, factChecks: FactChecksStore, request: EditorialServiceRequest, context: EditorialStreamContext, sessionContinuationEnabled: boolean, event: Extract<EditorialEngineEvent, { type: typeof EDITORIAL_ENGINE_EVENT.COMPLETED }>): string {
    if (!context.operation.factCheck && !context.operation.translation && sessionContinuationEnabled && event.continuationToken && context.continuation?.scope)
        sessions.saveEditorialSession(request.articleContext.articleId, { continuationToken: event.continuationToken, ...context.continuation.scope });

    if (!context.operation.factCheck)
        return artifacts.createEditorialArtifact({
            articleId: request.articleContext.articleId,
            revisionId: context.article.currentRevisionId,
            kind: getEditorialArtifactKind(request.editorial.operation, context.operation.factCheck),
            content: JSON.stringify(createEditorialArtifactMetadata(request, context, event)),
        }).id;

    return persistFactCheckArtifact({
        artifacts,
        factChecks,
        articleId: request.articleContext.articleId,
        revisionId: context.article.currentRevisionId,
        metadata: createEditorialArtifactMetadata(request, context, event, false),
        factCheck: event.factCheck!,
    }).artifactId;
}


async function* streamEditorialOperation(request: EditorialServiceRequest, context: EditorialStreamContext, factChecks: FactChecksStore, signal: AbortSignal, onCompleted: (event: Extract<EditorialEngineEvent, { type: typeof EDITORIAL_ENGINE_EVENT.COMPLETED }>) => string | undefined): AsyncIterable<EditorialEngineEvent> {
    let completed = false;
    for await (const event of context.engine.stream(createEngineRequest(request, context, factChecks), signal)) {
        if (event.type === EDITORIAL_ENGINE_EVENT.COMPLETED) {
            if (signal.aborted)
                return;

            const source = request.articleContext.content ?? context.article.currentRevision.content;
            const result = context.style
                ? { ...event, ...reviewTypography(source, event.text, context.style.profile, event.styleReview, Boolean(request.editorial.reviewMode)) }
                : event;
            validateProposalResult(source, result.text, request.editorial.skill?.execution, context.article.title, request.editorial.operation);
            completed = true;
            const editorialArtifactId = onCompleted(result);

            yield { ...result, ...(editorialArtifactId ? { editorialArtifactId } : {}) };

            continue;
        }

        yield event;
    }

    if (!completed && !signal.aborted)
        throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM, EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM);
}


export class EditorialService {
    constructor(
        private readonly stores: EditorialServiceStores,
        private readonly runtime: EditorialServiceRuntime,
        private readonly telemetry?: TelemetryObserver,
    ) { }


    async *stream(request: EditorialServiceRequest, signal: AbortSignal): AsyncIterable<Exclude<EditorialEngineEvent, { type: typeof EDITORIAL_ENGINE_EVENT.FACT_CHECK_PROGRESS }>> {
        const observed = beginAiOperation(this.telemetry);
        yield* withAiOperation(observed.operationId, this.streamObserved(request, signal, observed));
    }


    private async *streamObserved(request: EditorialServiceRequest, signal: AbortSignal,
        observed: ReturnType<typeof beginTimedTelemetryCapture>,
    ): AsyncIterable<Exclude<EditorialEngineEvent, { type: typeof EDITORIAL_ENGINE_EVENT.FACT_CHECK_PROGRESS }>> {

        try {
            const context = runAiFailureStage(this.telemetry, "request_preparation", () =>
                unwrapApplicationResult(prepareEditorialStream(this.stores.articles, this.stores.sessions, this.stores.styleCorpus, this.stores.factChecks,
                    this.runtime.engines, this.runtime.sessionContinuationEnabled, request)));
            const events = streamEditorialOperation(
                request,
                context,
                this.stores.factChecks,
                signal,
                (event) => {
                    if (this.stores.articles.getArticle(request.articleContext.articleId)?.currentRevisionId !== context.article.currentRevisionId)
                        throw new ApplicationServiceError(APPLICATION_ERROR.REVISION_CONFLICT, HTTP_STATUS.CONFLICT);

                    return persistCompletedEditorialOutput(
                        this.stores.sessions, this.stores.artifacts, this.stores.factChecks,
                        request, context, this.runtime.sessionContinuationEnabled, event,
                    );
                },
            );

            for await (const event of events) {
                if (event.type !== EDITORIAL_ENGINE_EVENT.FACT_CHECK_PROGRESS)
                    yield event;
            }

            captureOperationOutcome(observed, request.editorial.operation, signal.aborted);
        } catch (error) {
            if (error instanceof EditorialEngineError && error.code === EDITORIAL_ENGINE_ERROR.SESSION_EXPIRED)
                this.stores.sessions.removeEditorialSession(request.articleContext.articleId);

            captureOperationOutcome(observed, request.editorial.operation, signal.aborted, true, error);
            throw error;
        }
    }


    async *streamStaged(request: EditorialServiceRequest, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
        const context = unwrapApplicationResult(prepareEditorialStream(
            this.stores.articles, this.stores.sessions, this.stores.styleCorpus, this.stores.factChecks,
            this.runtime.engines, this.runtime.sessionContinuationEnabled, request,
        ));

        try {
            yield* streamEditorialOperation(request, context, this.stores.factChecks, signal, () => undefined);
        } catch (error) {
            if (error instanceof EditorialEngineError && error.code === EDITORIAL_ENGINE_ERROR.SESSION_EXPIRED)
                this.stores.sessions.removeEditorialSession(request.articleContext.articleId);

            throw error;
        }
    }
}
