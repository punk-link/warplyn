import type { LanguageModel } from "ai";
import { AI_PROVIDER, type AiProvider, type ReasoningEffort } from "@skladno/shared";

import { getOpenAiResponseId, getOpenAiResponsesProviderOptions, type OpenAiResponsesProviderOptions } from "./openai-responses.js";
import { getAiStageDiagnostics } from "./ai-stage-diagnostics.js";


export { createProviderError } from "./editorial-provider-error.js";


export function isAcceptedFinish(reason: string): boolean {
    return reason === "stop" || reason === "tool-calls";
}


export type SupportingTextProviderOptions = OpenAiResponsesProviderOptions | undefined;


export function createAiSdkGenerationOptions({ model, signal, providerOptions, stage = "editorial_generation" }: { model: LanguageModel; signal: AbortSignal; providerOptions?: SupportingTextProviderOptions; stage?: Parameters<typeof getAiStageDiagnostics>[0] }) {
    return {
        model,
        abortSignal: signal,
        telemetry: { isEnabled: false },
        providerOptions,
        ...getAiStageDiagnostics(stage),
    };
}


export function getSupportingTextProviderOptions(provider: AiProvider, reasoningEffort?: ReasoningEffort): SupportingTextProviderOptions {
    return provider === AI_PROVIDER.OPENAI
        ? getOpenAiResponsesProviderOptions(false, undefined, reasoningEffort)
        : undefined;
}


export function getEditorialProviderOptions({ provider, storeResponses, previousResponseId, reasoningEffort }: { provider: AiProvider; storeResponses: boolean; previousResponseId?: string; reasoningEffort?: ReasoningEffort }): SupportingTextProviderOptions {
    return provider === AI_PROVIDER.OPENAI
        ? getOpenAiResponsesProviderOptions(storeResponses, previousResponseId, reasoningEffort)
        : undefined;
}


export function getContinuationToken({ provider, storeResponses, metadata }: { provider: AiProvider; storeResponses: boolean; metadata: unknown }): string | undefined {
    return provider === AI_PROVIDER.OPENAI && storeResponses
        ? getOpenAiResponseId(metadata)
        : undefined;
}
