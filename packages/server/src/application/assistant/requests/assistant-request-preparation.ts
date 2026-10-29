import { success, failure } from "@skladno/shared";
import { APPLICATION_ERROR, getPublishLimitProfile, isPublishLimitProfileId, type AssistantMessage, type EditorialOperation } from "@skladno/shared";

import type { ArticleStore } from "../../articles/article-store.js";
import type { AssistantStore } from "../assistant-store.js";
import type { EditorialEngine } from "../../editorial/engine/editorial-engine.js";
import type { EditorialEngineResolver } from "../../editorial/engine/editorial-engine-resolver.js";
import type { StyleCorpusStore } from "../../editorial/style/style-corpus-store.js";
import { getCapabilityForEditorialOperation, type EditorialCapabilityCatalog } from "../capabilities/editorial-capability-catalog.js";
import type { PreparedAssistantRequest } from "./prepared-assistant-request.js";
import type { ReplayedAssistantRequest } from "./replayed-assistant-request.js";
import type { AssistantServiceRequest } from "./assistant-service-request.js";
import type { AssistantSkillCatalog } from "../skills/assistant-skill-catalog.js";
import type { AssistantSkillPackage } from "../skills/assistant-skill-package.js";
import { prepareSkillExecution } from "../skills/skill-execution.js";
import { prepareStyleTypography } from "../../editorial/style/capture-style-typography.js";
import { checkSelectionOffsets } from "../../editorial/selection-context.js";
import type { AssistantPreparationResult } from "./assistant-preparation-result.js";
import { failure as applicationFailure, type ApplicationResult } from "../../errors/application-result.js";
import { applicationFailureError, unwrapApplicationResult } from "../../errors/unwrap-application-result.js";


export class AssistantRequestPreparation {
    constructor(private readonly dependencies: {
        articles: ArticleStore;
        assistant: AssistantStore;
        styleCorpus: StyleCorpusStore;
        engines: EditorialEngineResolver;
        capabilities?: EditorialCapabilityCatalog;
        skills: AssistantSkillCatalog;
    }) { }


    listMessages(articleId: string): AssistantMessage[] {
        return unwrapApplicationResult(this.readArticleMessages(articleId, () => this.dependencies.assistant.listMessages(articleId)));
    }


    listMessageHistory(articleId: string): import("@skladno/shared").AssistantMessageHistory {
        return unwrapApplicationResult(this.readArticleMessages(articleId, () => this.dependencies.assistant.listMessageHistory(articleId)));
    }


    private readArticleMessages<T>(articleId: string, read: () => T): ApplicationResult<T> {
        if (!this.dependencies.articles.getArticle(articleId))
            return applicationFailure(APPLICATION_ERROR.ARTICLE_NOT_FOUND, "not-found");

        return success(read());
    }


    prepare(request: AssistantServiceRequest): AssistantPreparationResult {
        const article = this.dependencies.articles.getArticle(request.articleId);
        if (!article)
            return failure({ code: APPLICATION_ERROR.ARTICLE_NOT_FOUND });

        const replay = this.getReplayInput(request);
        if (!replay.ok)
            return replay;

        const articleContent = article.currentRevision.content;
        const validation = this.validatePreparation(replay.value, article.currentRevisionId, articleContent);
        if (!validation.ok)
            return validation;

        const routing = this.resolveRequestRouting(replay.value);
        if (!routing.ok)
            return routing;

        const resolvedValidation = this.validateResolvedRequest(replay.value, routing.value.operation, routing.value.usesCapabilityLoop);
        if (!resolvedValidation.ok)
            return resolvedValidation;

        const style = this.captureStyle(article);
        if (!style.ok)
            return style;

        const { engine, usesCapabilityLoop, operation, ...skillRouting } = routing.value;
        return success({
            ...replay.value,
            article: { content: articleContent, title: article.title, ...style.value, ...this.publishingLimit(article.publishingProfileId) },
            ...skillRouting,
            execution: { engine, usesCapabilityLoop, operation, capabilityActivities: [], pendingActions: [], authorizedActions: [],
                ...(!usesCapabilityLoop && operation ? { completedCapability: getCapabilityForEditorialOperation(operation) } : {}) },
        });
    }


    private captureStyle(article: { id: string; language?: string }): AssistantPreparationResult<Pick<PreparedAssistantRequest["article"], "styleContext">> {
        const corpus = this.dependencies.styleCorpus.getStyleCorpus();
        if (corpus.status !== "ready" || !corpus.profile)
            return success({});

        const capturedProfile = corpus.profile;
        const typography = this.dependencies.styleCorpus.getArticleTypography(article.id);
        const profile = preparationStep(prepareStyleTypography(
            capturedProfile, article.language, typography), APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID);
        if (!profile.ok)
            return profile;

        return success({ styleContext: {
            profile: profile.value,
            articleRules: this.dependencies.styleCorpus.getArticleStyleRules(article.id),
        } });
    }


    private getReplayInput(request: AssistantServiceRequest): AssistantPreparationResult<ReplayedAssistantRequest> {
        if (request.kind === "new")
            return success(request);

        const original = this.dependencies.assistant.getRequest(request.retryOfRequestId);
        if (!original || original.articleId !== request.articleId || (original.status !== "failed" && original.status !== "cancelled"))
            return failure({ code: APPLICATION_ERROR.ASSISTANT_RETRY_INVALID });

        return success({
            kind: "new",
            requestId: request.requestId,
            authorMessage: original.authorMessage,
            scope: original.scope,
            ...(request.interfaceLocale ? { interfaceLocale: request.interfaceLocale } : {}),
            ...(original.explicitSkillId ? { explicitSkillId: original.explicitSkillId } : {}),
            ...(original.skillOffset === undefined ? {} : { skillOffset: original.skillOffset }),
            ...(original.targetLanguage ? { targetLanguage: original.targetLanguage } : {}),
            retryOfRequestId: original.id,
            articleId: request.articleId,
        });
    }


    private validatePreparation(request: ReplayedAssistantRequest, currentRevisionId: string, articleContent: string): AssistantPreparationResult<void> {
        if (currentRevisionId !== request.scope.baseRevisionId)
            return failure({ code: APPLICATION_ERROR.REVISION_CONFLICT });

        if (request.explicitSkillId && !this.dependencies.skills.discover().some((skill) => skill.reference.id === request.explicitSkillId))
            return failure({ code: APPLICATION_ERROR.ASSISTANT_SKILL_UNSUPPORTED });

        const scope = request.scope;
        if (scope.kind === "selection")
            return preparationStep(checkSelectionOffsets(articleContent, scope.startOffset, scope.endOffset),
                APPLICATION_ERROR.ASSISTANT_SELECTION_INVALID);

        return success(undefined);
    }


    private resolveRequestRouting(request: ReplayedAssistantRequest): AssistantPreparationResult<{
        resolvedSkillId?: string; resolvedSkill?: AssistantSkillPackage; loadedSkills?: AssistantSkillPackage[];
        operation?: EditorialOperation; engine: EditorialEngine; usesCapabilityLoop: boolean;
    }> {
        const resolvedSkillId = request.explicitSkillId;
        if (!resolvedSkillId) {
            const engine = this.dependencies.engines.resolveAssistant?.();
            if (!engine)
                return failure({ code: APPLICATION_ERROR.EDITORIAL_CONFIGURATION_MISSING });

            return success({ engine, usesCapabilityLoop: Boolean(engine.streamAssistant && this.dependencies.capabilities) });
        }

        const summary = this.dependencies.skills.discover().find((skill) => skill.reference.id === resolvedSkillId);
        const resolvedSkill = summary && this.dependencies.skills.load([summary.reference])[0];
        if (!resolvedSkill)
            return failure({ code: APPLICATION_ERROR.ASSISTANT_SKILL_UNSUPPORTED });

        const resolved = preparationStep(prepareSkillExecution(resolvedSkill, request.scope.kind),
            APPLICATION_ERROR.ASSISTANT_SKILL_SCOPE_INCOMPATIBLE);
        if (!resolved.ok)
            return resolved;

        const engine = resolved.value.operation
            ? this.dependencies.engines.resolve(resolved.value.operation, resolvedSkillId)
            : this.dependencies.engines.resolveAssistant?.();
        if (!engine)
            return failure({ code: APPLICATION_ERROR.EDITORIAL_CONFIGURATION_MISSING });

        const usesCapabilityLoop = Boolean(engine.streamAssistant && this.dependencies.capabilities);

        return success({ ...resolved.value, engine, usesCapabilityLoop });
    }


    private validateResolvedRequest(
        request: ReplayedAssistantRequest, operation: EditorialOperation | undefined, usesCapabilityLoop: boolean,
    ): AssistantPreparationResult<void> {
        if (!usesCapabilityLoop && operation === "translation" && !request.targetLanguage?.trim())
            return failure({ code: APPLICATION_ERROR.TARGET_LANGUAGE_REQUIRED });

        if (!usesCapabilityLoop && operation === "style_review" && this.dependencies.styleCorpus.getStyleCorpus().status !== "ready")
            return failure({ code: APPLICATION_ERROR.STYLE_CORPUS_REQUIRED });

        return success(undefined);
    }


    private publishingLimit(publishingProfileId?: string): { publishingCharacterLimit?: number } {
        return isPublishLimitProfileId(publishingProfileId)
            ? { publishingCharacterLimit: getPublishLimitProfile(publishingProfileId).characterLimit }
            : {};
    }
}


function preparationStep<T>(result: ApplicationResult<T>, code: Extract<AssistantPreparationResult, { ok: false }>["code"]): AssistantPreparationResult<T> {
    if (result.ok)
        return result;

    if (result.code !== code)
        throw applicationFailureError(result);

    return failure({ code, ...(result.parameters ? { parameters: result.parameters } : {}) });
}
