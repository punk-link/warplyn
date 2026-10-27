import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";
import { beginTimedTelemetryCapture, type TelemetryCaptureSource, type TimedTelemetryCapture } from "@skladno/shared";


const operations = new AsyncLocalStorage<string>();


export function getAiOperationId(): string | undefined {
    return operations.getStore();
}


export function beginAiOperation(source?: TelemetryCaptureSource): TimedTelemetryCapture & { operationId: string } {
    const observed = beginTimedTelemetryCapture(source);
    const operationId = randomUUID();
    return {
        operationId,
        elapsedMs: observed.elapsedMs,
        capture: (event) => observed.capture(event.kind === "ai_operation_finished" ? { ...event, operationId } : event),
    };
}


export async function* withAiOperation<T>(operationId: string, iterable: AsyncIterable<T>): AsyncIterable<T> {
    const iterator = iterable[Symbol.asyncIterator]();
    try {
        while (true) {
            const next = await operations.run(operationId, () => iterator.next());
            if (next.done)
                return;

            yield next.value;
        }
    } finally {
        await operations.run(operationId, () => iterator.return?.());
    }
}
