import { generateText, Output, streamText, type LanguageModel, type ModelMessage, type SystemModelMessage } from "ai";
import { randomUUID } from "node:crypto";
import { BUILT_IN_SKILL, EDITORIAL_OPERATION, type AiProvider } from "@skladno/shared";

import type { EditorialConversationRequest } from "../../../application/editorial/engine/editorial-conversation-request.js";
import type { EditorialAssistantRequest } from "../../../application/editorial/engine/editorial-assistant-request.js";
import type { EditorialEngine } from "../../../application/editorial/engine/editorial-engine.js";
import type { EditorialEngineEvent } from "../../../application/editorial/engine/editorial-engine-event.js";
import { EDITORIAL_ENGINE_ERROR } from "../../../application/editorial/engine/editorial-engine-errors.js";
import { EDITORIAL_ENGINE_EVENT } from "../../../application/editorial/engine/editorial-engine-events.js";
import { EditorialEngineError } from "../../../application/editorial/engine/editorial-engine-error.js";
import type { EditorialEngineRequest } from "../../../application/editorial/engine/editorial-engine-request.js";
import { protectArticleSpans, restoreProtectedSpans } from "../../../application/editorial/translation/translation.js";
import { authorControlInstruction, createEditorialMessages } from "../../../application/editorial/workflow-prompt.js";
import { getBuiltInSkillInstructions } from "../../../application/assistant/skills/get-built-in-skill-instructions.js";
import { streamFactCheck } from "../workflows/fact-check-workflow.js";
import type { FactCheckProvider } from "../models/fact-check-provider.js";
import { getBoundedArticleContext } from "../models/editorial-context.js";
import { formatSelectionContext } from "../../../application/editorial/selection-context.js";
import { selectionContextPolicy } from "../../../application/editorial/selection-context-policy.js";
import { createAiSdkGenerationOptions, getContinuationToken, getEditorialProviderOptions, isAcceptedFinish, createProviderError } from "../adapters/ai-sdk-provider.js";
import { AiSdkAssistantExecutor } from "../adapters/ai-sdk-assistant-executor.js";
import { mapStyleReview, styleReviewSchema, translationSchema } from "../models/ai-sdk-editorial-output.js";

export { createAssistantConversationPrompt, getAssistantStepOptions } from "../adapters/ai-sdk-assistant.js";


interface AiSdkEditorialEngineOptions {
    provider: AiProvider;
    languageModel: LanguageModel;
    factCheckProvider?: FactCheckProvider;
    continuationScope?: { connectionId: string; provider: AiProvider; model: string };
    storeResponses: boolean;
    reasoningEffort?: "low" | "medium" | "high";
}


export class AiSdkEditorialEngine implements EditorialEngine {
    readonly continuationScope;


    private readonly assistant;


    constructor(private readonly options: AiSdkEditorialEngineOptions) {
        this.continuationScope = options.continuationScope;
        this.assistant = new AiSdkAssistantExecutor(options);
    }


    async *stream(request: EditorialEngineRequest, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
        try {
            if (request.operation === EDITORIAL_OPERATION.FACT_CHECK) {
                const provider = this.options.factCheckProvider;
                if (!provider)
                    throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

                yield* streamFactCheck({
                    request: {
                        article: getBoundedArticleContext(request.article),
                        instructions: request.skill?.instructions ?? getBuiltInSkillInstructions(BUILT_IN_SKILL.FACT_CHECKING),
                        reusableFactFindings: request.reusableFactFindings,
                        skipFactCheckClaim: request.skipFactCheckClaim,
                    },
                    signal,
                    provider,
                });

                return;
            }

            if (request.operation === EDITORIAL_OPERATION.STYLE_REVIEW) {
                yield* this.streamStyleReview(request, signal);
                return;
            }

            if (request.operation === EDITORIAL_OPERATION.TRANSLATION) {
                yield* this.streamTranslation(request, signal);
                return;
            }

            const modelMessage = createEditorialMessages({
                operation: request.operation,
                article: request.article,
                articleTitle: request.articleTitle,
                articleSelection: request.articleSelection,
                authorContext: request.authorContext,
                skillId: request.skillId,
                skill: request.skill,
                surroundingArticleCharacterCount: request.surroundingArticleCharacterCount,
                selectionContext: request.selectionContext,
                targetArticleCharacterLimit: request.targetArticleCharacterLimit,
            });

            yield* this.streamProposal(modelMessage, signal, request.previousResponseId);
        } catch (error) {
            if (error instanceof EditorialEngineError || signal.aborted)
                throw error;

            throw createProviderError(error, Boolean(request.previousResponseId));
        }
    }


    async *streamConversation(request: EditorialConversationRequest, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
        const contextPolicy = request.scope === "selection" ? `\n\n${selectionContextPolicy}` : "";
        const messages: ModelMessage[] = [{
            role: "system",
            content: "You are Warplyn's editorial assistant. Answer conversationally and help the author decide what to do next. " +
                `${authorControlInstruction} Do not turn the Article into a proposal unless the author explicitly asks for an editorial operation.` +
                contextPolicy,
        }];

        if (request.article)
            messages.push({
                role: request.scope === "selection" ? "user" : "system",
                content: `${request.scope === "selection" ? "Selected Article context" : "Current Article context"}:\n` +
                    getBoundedArticleContext(request.article) +
                    formatSelectionContext(request.selectionContext)
            });

        messages.push(...request.history.slice(-12).map((turn): ModelMessage => ({ role: turn.role === "author" ? "user" : "assistant", content: turn.content })));

        messages.push({ role: "user", content: request.message });

        try {
            yield* this.streamProposal(messages, signal);
        } catch (error) {
            if (error instanceof EditorialEngineError || signal.aborted)
                throw error;

            throw createProviderError(error, false);
        }
    }


    async *streamAssistant(request: EditorialAssistantRequest, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
        yield* this.assistant.stream(request, signal);
    }


    private createGenerationOptions({ messages, signal, previousResponseId }: { messages: ModelMessage[]; signal: AbortSignal; previousResponseId?: string }) {
        const instructions: SystemModelMessage[] = [];
        const promptMessages: ModelMessage[] = [];
        for (const message of messages) {
            if (message.role === "system")
                instructions.push(message);
            else
                promptMessages.push(message);
        }

        return {
            ...createAiSdkGenerationOptions({
                model: this.options.languageModel,
                signal,
                providerOptions: getEditorialProviderOptions({
                    provider: this.options.provider,
                    storeResponses: this.options.storeResponses,
                    previousResponseId,
                    reasoningEffort: this.options.reasoningEffort,
                }),
            }),
            instructions,
            messages: promptMessages,
        };
    }


    private async *streamProposal(messages: ModelMessage[], signal: AbortSignal, previousResponseId?: string): AsyncIterable<EditorialEngineEvent> {
        const result = streamText(this.createGenerationOptions({ messages, signal, previousResponseId }));
        let text = "";
        let finished = false;

        for await (const part of result.stream) {
            switch (part.type) {
                case "text-delta":
                    text += part.text;
                    yield { type: EDITORIAL_ENGINE_EVENT.TEXT_DELTA, delta: part.text };
                    break;
                case "error":
                    throw createProviderError(part.error, Boolean(previousResponseId));
                case "finish":
                    finished ||= isAcceptedFinish(part.finishReason);
                    break;
                case "abort":
                    throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM, EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM);
            }
        }

        const token = getContinuationToken({ provider: this.options.provider, storeResponses: this.options.storeResponses, metadata: (await result.finalStep).providerMetadata });
        if (!finished || !text.trim())
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM, EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM);

        yield { type: EDITORIAL_ENGINE_EVENT.COMPLETED, responseId: randomUUID(), ...(token ? { continuationToken: token } : {}), text };
    }


    private async *streamStyleReview(request: EditorialEngineRequest, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
        if (!request.styleProfile)
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

        const result = await generateText({
            ...this.createGenerationOptions({
                messages: createEditorialMessages({
                    operation: request.operation,
                    article: getBoundedArticleContext(request.article),
                    articleTitle: request.articleTitle,
                    articleSelection: request.articleSelection,
                    selectionContext: request.selectionContext,
                    authorContext: request.authorContext,
                    skill: request.skill,
                    styleProfile: request.styleProfile,
                    articleStyleRules: request.articleStyleRules,
                }),
                signal,
                previousResponseId: request.previousResponseId,
            }),
            output: Output.object({ schema: styleReviewSchema }),
        });

        if (!result.output || !isAcceptedFinish(result.finishReason))
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

        const token = getContinuationToken({ provider: this.options.provider, storeResponses: this.options.storeResponses, metadata: result.providerMetadata });
        yield {
            type: EDITORIAL_ENGINE_EVENT.COMPLETED,
            responseId: randomUUID(),
            ...(token ? { continuationToken: token } : {}),
            text: result.output.proposal,
            styleReview: mapStyleReview(result.output, request.styleProfile, request.articleStyleRules),
        };
    }


    private async *streamTranslation(request: EditorialEngineRequest, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
        const targetLanguage = request.targetLanguage?.trim();
        if (!targetLanguage)
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

        const protectedArticle = protectArticleSpans(getBoundedArticleContext(request.article));
        const protectedTitle = protectArticleSpans(request.articleTitle ?? "");
        const editorialMessage = createEditorialMessages({
            operation: request.operation,
            article: protectedArticle.protectedText,
            articleTitle: protectedTitle.protectedText,
            authorContext: request.authorContext,
            skill: request.skill,
            targetLanguage
        });
        const result = await generateText({
            ...this.createGenerationOptions({
                messages: editorialMessage,
                signal,
            }),
            output: Output.object({ schema: translationSchema(targetLanguage) }),
        });

        if (!result.output || !isAcceptedFinish(result.finishReason) || result.output.targetLanguage.trim() !== targetLanguage)
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

        const text = restoreProtectedSpans(result.output.translation, protectedArticle.protectedSpans);
        const title = restoreProtectedSpans(result.output.title, protectedTitle.protectedSpans);
        if (!text || title === undefined)
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

        const token = getContinuationToken({
            provider: this.options.provider,
            storeResponses: this.options.storeResponses,
            metadata: result.providerMetadata
        });

        yield {
            type: EDITORIAL_ENGINE_EVENT.COMPLETED,
            responseId: randomUUID(),
            ...(token ? { continuationToken: token } : {}),
            text,
            translation: { targetLanguage, protectedSpans: protectedArticle.protectedSpans, title }
        };
    }
}
