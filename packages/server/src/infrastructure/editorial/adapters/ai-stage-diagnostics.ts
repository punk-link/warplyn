import { createLocalDiagnostics } from "../../diagnostics/local-diagnostics.js";
import { EditorialEngineError } from "../../../application/editorial/engine/editorial-engine-error.js";
import { createProviderError } from "./editorial-provider-error.js";


const environmentFreeDiagnostics = createLocalDiagnostics({ environment: {} });
const finishReasons = new Set(["stop", "tool-calls", "length", "content-filter", "error", "other"]);


export function getAiStageDiagnostics(stage: "assistant_step" | "editorial_generation" | "action_intent_verification" | "replacement_verification") {
    let startedAt = performance.now();
    return {
        onStepStart: () => {
            startedAt = performance.now();
        },
        onStepEnd: ({ finishReason }: { finishReason: string }) => {
            environmentFreeDiagnostics.write("ai.stage_finished", { stage, elapsedMs: Math.round(performance.now() - startedAt), finishReason: finishReasons.has(finishReason) ? finishReason : "unknown" });
        },
        onError: ({ error }: { error: unknown }) => {
            const category = error instanceof EditorialEngineError ? error.code : createProviderError(error, false).code;
            const status = error && typeof error === "object" && "statusCode" in error && typeof error.statusCode === "number" && Number.isInteger(error.statusCode) && error.statusCode >= 400 && error.statusCode <= 599 ? error.statusCode : undefined;
            environmentFreeDiagnostics.write("ai.stage_failed", { stage, elapsedMs: Math.round(performance.now() - startedAt), category, ...(status ? { status } : {}) });
        },
    };
}
