import { createLocalDiagnostics } from "../../diagnostics/local-diagnostics.js";
import { EditorialEngineError } from "../../../application/editorial/engine/editorial-engine-error.js";
import { createProviderError } from "./editorial-provider-error.js";
import { beginTelemetryCapture, type TelemetryAiFailure, type TelemetryAiStage, type TelemetryCaptureSource } from "@skladno/shared";
import { getAiOperationId } from "../../../application/telemetry/ai-operation-context.js";


const environmentFreeDiagnostics = createLocalDiagnostics({ environment: {} });
const finishReasons = new Set(["stop", "tool-calls", "length", "content-filter", "error", "other"]);


export function getAiStageDiagnostics(stage: TelemetryAiStage, telemetry?: TelemetryCaptureSource, signal?: AbortSignal) {
    let startedAt = performance.now();
    const capture = beginTelemetryCapture(telemetry);
    const operationId = getAiOperationId();
    let reported = false;
    const report = (outcome: "completed" | "failed" | "cancelled", failure?: TelemetryAiFailure, httpStatus?: number) => {
        if (reported)
            return;

        reported = true;
        try {
            capture({
                kind: "ai_stage_finished", stage, outcome, elapsedMs: Math.round(performance.now() - startedAt),
                ...(failure ? { failure } : {}), ...(httpStatus ? { httpStatus } : {}), ...(operationId ? { operationId } : {})
            });
        } catch {
            // Optional telemetry must not interrupt generation.
        }
    };
    return {
        onStepStart: () => {
            startedAt = performance.now();
            reported = false;
        },
        onStepEnd: ({ finishReason }: { finishReason: string }) => {
            environmentFreeDiagnostics.write("ai.stage_finished", { stage, elapsedMs: Math.round(performance.now() - startedAt), finishReason: finishReasons.has(finishReason) ? finishReason : "unknown" });
            report(finishReason === "stop" || finishReason === "tool-calls" ? "completed" : "failed");
        },
        onAbort: () => report("cancelled"),
        onError: ({ error }: { error: unknown }) => {
            const category = error instanceof EditorialEngineError ? error.code : createProviderError(error, false).code;
            const status = error && typeof error === "object" && "statusCode" in error && typeof error.statusCode === "number" && Number.isInteger(error.statusCode) && error.statusCode >= 400 && error.statusCode <= 599 ? error.statusCode : undefined;
            environmentFreeDiagnostics.write("ai.stage_failed", { stage, elapsedMs: Math.round(performance.now() - startedAt), category, ...(status ? { status } : {}) });

            if (signal?.aborted)
                report("cancelled");
            else
                report("failed", category, status);
        },
    };
}
