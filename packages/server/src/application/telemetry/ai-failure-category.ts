import {
    beginTelemetryCapture, type EditorialOperation, type TelemetryAiFailure, type TelemetryAiStage,
    type TelemetryCaptureSource, type TimedTelemetryCapture
} from "@skladno/shared";
import { EditorialEngineError } from "../editorial/engine/editorial-engine-error.js";
import { getAiOperationId } from "./ai-operation-context.js";


export function getAiFailureCategory(error: unknown): TelemetryAiFailure {
    return error instanceof EditorialEngineError ? error.code : "unknown";
}


export function beginAiStageFailureCapture(source: TelemetryCaptureSource | undefined, stage: TelemetryAiStage): (error: unknown) => void {
    const startedAt = performance.now();
    const operationId = getAiOperationId();
    const capture = beginTelemetryCapture(source);

    return (error) => {
        try {
            capture({
                kind: "ai_stage_finished", stage, outcome: "failed", elapsedMs: Math.round(performance.now() - startedAt),
                failure: getAiFailureCategory(error), ...(operationId ? { operationId } : {})
            });
        } catch {
            return;
        }
    };
}


export async function* withAiFailureStage<T>(source: TelemetryCaptureSource | undefined, stage: TelemetryAiStage,
    signal: AbortSignal, iterable: AsyncIterable<T>): AsyncIterable<T> {
    const capture = beginAiStageFailureCapture(source, stage);
    try {
        yield* iterable;
    } catch (error) {
        if (!signal.aborted)
            capture(error);

        throw error;
    }
}


export function runAiFailureStage<T>(source: TelemetryCaptureSource | undefined, stage: TelemetryAiStage, action: () => T): T {
    const capture = beginAiStageFailureCapture(source, stage);
    try {
        return action();
    } catch (error) {
        capture(error);
        throw error;
    }
}


export function captureAssistantOutcome(observed: TimedTelemetryCapture, outcome: "completed" | "cancelled" | "failed",
    failure?: "cancelled" | TelemetryAiFailure): void {
    observed.capture({
        kind: "ai_operation_finished", operation: "assistant", outcome, elapsedMs: observed.elapsedMs(),
        ...(failure ? { failure } : {})
    });
}


export function captureOperationOutcome(observed: TimedTelemetryCapture, operation: EditorialOperation,
    aborted: boolean, failed = false, error?: unknown): void {
    if (aborted) {
        observed.capture({ kind: "ai_operation_finished", operation, outcome: "cancelled", elapsedMs: observed.elapsedMs(), failure: "cancelled" });
        return;
    }

    observed.capture({
        kind: "ai_operation_finished", operation, outcome: failed ? "failed" : "completed",
        elapsedMs: observed.elapsedMs(), ...(failed ? { failure: getAiFailureCategory(error) } : {})
    });
}
