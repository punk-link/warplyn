import assert from "node:assert/strict";
import test from "node:test";
import type { TelemetryEvent } from "@skladno/shared";
import { getAiStageDiagnostics } from "../../infrastructure/editorial/adapters/ai-stage-diagnostics.js";
import { beginAiOperation, withAiOperation } from "./ai-operation-context.js";
import { withAiFailureStage } from "./ai-failure-category.js";


test("concurrent AI operations correlate their stages without sharing identifiers", async () => {
    const events: TelemetryEvent[] = [];
    const telemetry = { beginCapture: () => (event: TelemetryEvent) => events.push(event) };
    const run = async () => {
        const observed = beginAiOperation(telemetry);


        async function* execute() {
            const stage = getAiStageDiagnostics("assistant_step", telemetry);
            await Promise.resolve();
            stage.onError({ error: new Error("private error") });
            observed.capture({ kind: "ai_operation_finished", operation: "assistant", outcome: "failed", elapsedMs: 1, failure: "provider" });
            yield undefined;
        }


        const iterator = withAiOperation(observed.operationId, execute())[Symbol.asyncIterator]();
        await iterator.next();
        await iterator.next();

        return observed.operationId;
    };
    const ids = await Promise.all([run(), run()]);
    assert.notEqual(ids[0], ids[1]);
    for (const id of ids) {
        const correlated = events.filter((event) => "operationId" in event && event.operationId === id);
        assert.deepEqual(correlated.map((event) => event.kind), ["ai_stage_finished", "ai_operation_finished"]);
    }

    const privateErrorPattern = /private error/;
    assert.doesNotMatch(JSON.stringify(events), privateErrorPattern);
});


test("orchestration failures carry their operation ID without the error message", async () => {
    const events: TelemetryEvent[] = [];
    const telemetry = { beginCapture: () => (event: TelemetryEvent) => events.push(event) };
    const observed = beginAiOperation(telemetry);


    async function* failed(): AsyncIterable<never> {
        throw new Error("private routing data");
    }


    const stream = withAiOperation(observed.operationId, withAiFailureStage(telemetry, "assistant_orchestration", new AbortController().signal, failed()));
    await assert.rejects(stream[Symbol.asyncIterator]().next());
    assert.deepEqual(events.map((event) => event.kind === "ai_stage_finished" && [event.stage, event.operationId, event.failure]),
        [["assistant_orchestration", observed.operationId, "unknown"]]);
    const privateRoutingPattern = /private routing data/;
    assert.doesNotMatch(JSON.stringify(events), privateRoutingPattern);
});
