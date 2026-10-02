import { isStepCount, ToolLoopAgent, type LanguageModel, type TextStreamPart, type ToolSet } from "ai";
import { randomUUID } from "node:crypto";
import type { AiProvider, ReasoningEffort } from "@skladno/shared";

import type { EditorialAssistantRequest } from "../../../application/editorial/engine/editorial-assistant-request.js";
import type { EditorialEngineEvent } from "../../../application/editorial/engine/editorial-engine-event.js";
import { EDITORIAL_ENGINE_ERROR } from "../../../application/editorial/engine/editorial-engine-errors.js";
import { EDITORIAL_ENGINE_EVENT } from "../../../application/editorial/engine/editorial-engine-events.js";
import { EditorialEngineError } from "../../../application/editorial/engine/editorial-engine-error.js";
import { createAssistantConversationPrompt, getAssistantStepOptions, createAssistantTools } from "./ai-sdk-assistant.js";
import { createAiSdkGenerationOptions, getContinuationToken, getEditorialProviderOptions, isAcceptedFinish, createProviderError } from "./ai-sdk-provider.js";


interface AiSdkAssistantExecutorOptions {
    languageModel: LanguageModel;
    provider: AiProvider;
    storeResponses: boolean;
    reasoningEffort?: ReasoningEffort;
}


interface AssistantExecutionState {
    skillCapabilities: readonly string[];
    activeCapabilities?: readonly string[];
    failure?: { error: unknown };
    completedArtifact?: string;
}


export function createAssistantInstructions(request: Pick<EditorialAssistantRequest, "instructions" | "skills" | "interfaceLocale">): string {
    return [
        "You are Warplyn's editorial assistant. Use only the supplied tools when an editorial result is needed.",
        `Write service messages, including status updates, confirmations, errors, and summaries of tool or Skill work, in the Interface locale ${request.interfaceLocale ?? "en"}. For ordinary conversational answers that do not use or affect tools or Skills, answer in the language of the Author's question.`,
        "Never claim that a tool ran when it did not. Preserve author control. Finish with a concise response after the necessary work.",
        "Perform necessary reads and explicitly authorized actions before producing the request's single artifact. A completed artifact ends the run; Warplyn supplies its result card without a closing model reply.",
        "When an Author request matches an available Skill, load that Skill before choosing capabilities.",
        "To reject a prepared translation, call inspect_translations first, use its artifactId with reject_translation, and never use inspect_linked_articles; that tool is only for created linked Articles.",
        `Available Skills:\n${request.skills.map((skill) => `${skill.id}: ${skill.name}. ${skill.description}`).join("\n")}`,
        ...request.instructions,
    ].join("\n\n");
}


export class AiSdkAssistantExecutor {
    constructor(private readonly options: AiSdkAssistantExecutorOptions) { }


    async *stream(request: EditorialAssistantRequest, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
        const state: AssistantExecutionState = { skillCapabilities: request.initialActiveCapabilities ?? [], activeCapabilities: request.initialActiveCapabilities };
        const execute = (capability: string, input: Readonly<Record<string, string>>) => this.executeCapability(request, signal, state, capability, input);
        const loadSkill = (capabilities: readonly string[]) => {
            state.skillCapabilities = [...new Set([...state.skillCapabilities, ...capabilities])];
            state.activeCapabilities = [...new Set([...(state.activeCapabilities ?? []), ...capabilities])];
        };
        const agent = this.createAgent(request, createAssistantTools(request, execute, loadSkill), state, signal);
        const result = await agent.stream({ prompt: createAssistantConversationPrompt(request), abortSignal: signal });
        const text = yield* this.consumeModelStream(result.stream, state);
        signal.throwIfAborted();
        const steps = await result.steps;
        const finalStep = await result.finalStep;
        const exhausted = !state.completedArtifact && steps.length >= 6 && finalStep.finishReason === "tool-calls";
        if (exhausted || !isAcceptedFinish(finalStep.finishReason))
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM, EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM);

        if (!text.trim() && !state.completedArtifact)
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM, EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM);

        const token = getContinuationToken({ provider: this.options.provider, storeResponses: this.options.storeResponses, metadata: finalStep.providerMetadata });
        yield { type: EDITORIAL_ENGINE_EVENT.COMPLETED, responseId: randomUUID(), ...(token ? { continuationToken: token } : {}), text };
    }


    private async *consumeModelStream(stream: AsyncIterable<TextStreamPart<ToolSet>>, state: AssistantExecutionState): AsyncGenerator<EditorialEngineEvent, string> {
        let text = "";
        for await (const part of stream) {
            if (part.type === "error")
                state.failure ??= { error: createProviderError(part.error, false) };

            if (part.type === "tool-error")
                state.failure ??= { error: new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT) };

            if (part.type === "text-delta" && !state.failure) {
                text += part.text;
                yield { type: EDITORIAL_ENGINE_EVENT.TEXT_DELTA, delta: part.text };
            }
        }

        if (state.failure)
            throw state.failure.error;

        return text;
    }


    private async executeCapability(request: EditorialAssistantRequest, signal: AbortSignal, state: AssistantExecutionState, capability: string, input: Readonly<Record<string, string>>): Promise<unknown> {
        if (state.failure)
            throw state.failure.error;

        const candidate = request.tools.find((toolCandidate) => toolCandidate.capability === capability);
        if (!candidate)
            throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);

        let result: unknown;
        try {
            result = await candidate.execute(input, signal);
        } catch (error) {
            state.failure ??= { error };
            throw error;
        }

        if (capability === "find_capabilities" && Array.isArray(result)) {
            const discovered = result.flatMap((item) => item && typeof item === "object" && "capability" in item && typeof item.capability === "string" ? [item.capability] : []);
            state.activeCapabilities = [...new Set([...state.skillCapabilities, ...discovered])];
        }

        if (candidate.execution === "artifact")
            state.completedArtifact = capability;

        return result;
    }


    private createAgent(request: EditorialAssistantRequest, tools: ToolSet, state: AssistantExecutionState, signal: AbortSignal) {
        const getActiveTools = () => state.activeCapabilities ? [...state.activeCapabilities, "load_skill"] : ["find_capabilities", "load_skill"];
        const providerOptions = getEditorialProviderOptions(this.options);

        return new ToolLoopAgent<never, ToolSet>({
            ...createAiSdkGenerationOptions({ model: this.options.languageModel, signal, providerOptions, stage: "assistant_step" }),
            instructions: createAssistantInstructions(request),
            tools,
            activeTools: getActiveTools(),
            prepareStep: ({ stepNumber }) => getAssistantStepOptions(stepNumber, state.activeCapabilities),
            stopWhen: [isStepCount(6), () => Boolean(state.failure || state.completedArtifact)],
        });
    }
}
