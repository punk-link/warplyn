import { isTelemetryEvent, type TimedTelemetryCapture } from "@skladno/shared";
import type { EditorialEngine } from "../editorial/engine/editorial-engine.js";


export function captureModelUsage(observed: TimedTelemetryCapture, engine: EditorialEngine,
    operation: "assistant" | "text_generation"): void {
    const scope = engine.continuationScope;
    if (!scope)
        return;

    const event = { kind: "model_used", operation, provider: scope.provider, model: scope.model };
    if (!isTelemetryEvent(event))
        return;

    try {
        observed.capture(event);
    } catch {
        return;
    }
}
