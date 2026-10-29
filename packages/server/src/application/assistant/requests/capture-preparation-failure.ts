import type { beginAiOperation } from "../../telemetry/ai-operation-context.js";
import { getAiFailureCategory } from "../../telemetry/ai-failure-category.js";


export function capturePreparationFailure(observed: ReturnType<typeof beginAiOperation>, error: unknown): void {
    observed.capture({ kind: "ai_stage_finished", stage: "request_preparation", outcome: "failed",
        elapsedMs: observed.elapsedMs(), failure: getAiFailureCategory(error), operationId: observed.operationId });
    observed.capture({
        kind: "ai_operation_finished",
        operation: "assistant",
        outcome: "failed",
        elapsedMs: observed.elapsedMs(),
        failure: getAiFailureCategory(error)
    });
}
