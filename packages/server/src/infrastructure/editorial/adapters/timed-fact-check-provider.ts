import { createLocalDiagnostics, type LocalDiagnostics } from "../../diagnostics/local-diagnostics.js";
import type { FactCheckProvider } from "../models/fact-check-provider.js";
import { createProviderError } from "./editorial-provider-error.js";
import { EditorialEngineError } from "../../../application/editorial/engine/editorial-engine-error.js";


const localDiagnostics = createLocalDiagnostics({ environment: {} });
type FactCheckStage = "fact_check_extraction" | "fact_check_matching" | "fact_check_research" | "fact_check_evaluation";


export function timeFactCheckProvider(provider: FactCheckProvider, diagnostics: LocalDiagnostics = localDiagnostics): FactCheckProvider {
    async function measure<T>(stage: FactCheckStage, signal: AbortSignal, operation: () => Promise<T>): Promise<T> {
        const startedAt = performance.now();
        try {
            const result = await operation();
            signal.throwIfAborted();
            diagnostics.write("ai.stage_finished", { stage, elapsedMs: Math.round(performance.now() - startedAt), finishReason: "stop" });
            return result;
        } catch (error) {
            const category = error instanceof EditorialEngineError ? error.code : createProviderError(error, false).code;
            diagnostics.write("ai.stage_failed", { stage, elapsedMs: Math.round(performance.now() - startedAt), category });
            throw error;
        }
    }


    return {
        researchStage: provider.researchStage,
        extractClaims: (article, instructions, signal, previous) =>
            measure("fact_check_extraction", signal, () => provider.extractClaims(article, instructions, signal, previous)),
        researchClaims: (claims, instructions, signal) =>
            measure("fact_check_research", signal, () => provider.researchClaims(claims, instructions, signal)),
        evaluateClaims: (research, instructions, signal) =>
            measure("fact_check_evaluation", signal, () => provider.evaluateClaims(research, instructions, signal)),
        ...(provider.matchClaims ? {
            matchClaims: (claims, candidates, signal) =>
                measure("fact_check_matching", signal, () => provider.matchClaims!(claims, candidates, signal)),
        } : {}),
    };
}
