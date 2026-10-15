import { APPLICATION_ERROR, HTTP_STATUS, EDITORIAL_OPERATION, type StyleProfile } from "@skladno/shared";
import { ApplicationServiceError } from "../errors/application-service-error.js";
import { reviewTypography } from "../editorial/style/typography-review.js";
import { createSkillGuidance } from "./skills/create-skill-guidance.js";

import { getReusableFactFindings } from "../editorial/fact-checking/reusable-fact-findings.js";
import type { StyleCorpusStore } from "../editorial/style/style-corpus-store.js";
import type { EditorialEngineEvent } from "../editorial/engine/editorial-engine-event.js";
import { EDITORIAL_ENGINE_ERROR } from "../editorial/engine/editorial-engine-errors.js";
import { EditorialEngineError } from "../editorial/engine/editorial-engine-error.js";
import type { FactChecksStore } from "./fact-checks-store.js";
import type { AssistantStore } from "./assistant-store.js";
import { getConversationHistory } from "./requests/conversation-history.js";
import type { PreparedAssistantRequest } from "./requests/prepared-assistant-request.js";


export function streamAssistantEngineEvents(request: PreparedAssistantRequest, stores: { assistant: AssistantStore; styleCorpus: StyleCorpusStore; factChecks: FactChecksStore }, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
    const excerpt = getAssistantArticleExcerpt(request);
    if (!request.resolvedSkillId)
        return streamAssistantConversation(request, stores.assistant, excerpt, signal);

    if (!request.operation)
        throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

    const corpus = request.operation === EDITORIAL_OPERATION.STYLE_REVIEW ? stores.styleCorpus.getStyleCorpus() : undefined;
    if (corpus && (corpus.status !== "ready" || !corpus.profile))
        throw new ApplicationServiceError(APPLICATION_ERROR.STYLE_CORPUS_REQUIRED, HTTP_STATUS.BAD_REQUEST);

    const profile = corpus?.profile;
    const articleRules = profile ? stores.styleCorpus.getArticleStyleRules(request.articleId) : "";

    const events = request.engine.stream({
        operation: request.operation,
        article: excerpt,
        articleTitle: request.articleTitle,
        ...(request.scope.kind === "selection" ? { articleSelection: true } : {}),
        authorContext: request.authorMessage,
        skillId: request.resolvedSkillId,
        skill: createSkillGuidance(request.resolvedSkill, request.loadedSkills),
        ...(request.scope.kind === "selection" ? { surroundingArticleCharacterCount: request.articleContent.length - excerpt.length } : {}),
        ...(request.publishingCharacterLimit ? { targetArticleCharacterLimit: request.publishingCharacterLimit } : {}),
        ...(request.targetLanguage ? { targetLanguage: request.targetLanguage } : {}),
        ...(profile
            ? { styleProfile: profile, articleStyleRules: articleRules }
            : {}
        ),
        ...(request.operation === EDITORIAL_OPERATION.FACT_CHECK ? { reusableFactFindings: getReusableFactFindings(stores.factChecks, request.articleId), skipFactCheckClaim: request.skipFactCheckClaim } : {})
    }, signal);
    return profile ? streamTypographyReviewedEvents(events, excerpt, profile, articleRules, signal) : events;
}


async function* streamTypographyReviewedEvents(
    events: AsyncIterable<EditorialEngineEvent>,
    source: string,
    profile: StyleProfile,
    articleRules: string,
    signal: AbortSignal,
): AsyncIterable<EditorialEngineEvent> {
    for await (const event of events) {
        if (event.type !== "completed") {
            yield event;
            continue;
        }

        signal.throwIfAborted();
        const reviewed = reviewTypography(source, event.text, profile, event.styleReview);
        yield { ...event, ...reviewed, styleReview: { ...reviewed.styleReview, articleRules: articleRules.split("\n").filter(Boolean) } };
    }
}


export function getAssistantArticleExcerpt(request: PreparedAssistantRequest): string {
    return request.scope.kind === "selection"
        ? request.articleContent.slice(request.scope.startOffset, request.scope.endOffset)
        : request.articleContent;
}


function streamAssistantConversation(request: PreparedAssistantRequest, assistant: AssistantStore, excerpt: string, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
    return request.engine.streamConversation({
        message: request.authorMessage,
        article: excerpt,
        scope: request.scope.kind,
        history: getConversationHistory(assistant, request.articleId)
    }, signal);
}
