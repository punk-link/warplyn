import assert from "node:assert/strict";
import test from "node:test";
import { isTelemetryEvent, type TelemetryEvent } from "@skladno/shared";
import { captureModelUsage } from "./model-usage.js";
import type { EditorialEngine } from "../editorial/engine/editorial-engine.js";

test("model usage contains only validated configured identifiers and isolates delivery failure", () => {
    const events: TelemetryEvent[] = [];
    const engine: EditorialEngine = {
        continuationScope: { connectionId: "private", provider: "openai", model: "gpt-5.6" },
        async *stream() {
            return;
        }, async *streamConversation() {
            return;
        },
    };
    captureModelUsage({ capture: (event) => {
        events.push(event);
    }, elapsedMs: () => 0 }, engine, "assistant");
    assert.deepEqual(events, [{ kind: "model_used", operation: "assistant", provider: "openai", model: "gpt-5.6" }]);
    assert.doesNotThrow(() => captureModelUsage({ capture: () => {
        throw new Error("offline");
    }, elapsedMs: () => 0 }, engine, "assistant"));
    const event = events[0];
    for (const extra of ["prompt", "output", "articleId", "requestId", "operationId", "tokens", "credentials"])
        assert.equal(isTelemetryEvent({ ...event, [extra]: "private" }), false);

    for (const model of ["", "   ", "a".repeat(257), null, 42])
        assert.equal(isTelemetryEvent({ ...event, model }), false);

    for (const provider of ["", "   ", "a".repeat(257), null, 42])
        assert.equal(isTelemetryEvent({ ...event, provider }), false);

    assert.equal(isTelemetryEvent({ ...event, provider: "future provider", model: "custom/モデル (preview)" }), true);
    assert.equal(isTelemetryEvent({ ...event, provider: "a".repeat(256), model: "a".repeat(256) }), true);
    assert.equal(isTelemetryEvent({ ...event, operation: undefined }), false);
    assert.equal(isTelemetryEvent({ ...event, operation: "unknown" }), false);
    captureModelUsage({ capture: (value) => {
        events.push(value);
    }, elapsedMs: () => 0 }, engine, "text_generation");
    assert.deepEqual(events[1], { kind: "model_used", operation: "text_generation", provider: "openai", model: "gpt-5.6" });
    for (let index = 0; index < 40; index++) {
        captureModelUsage({ capture: (value) => {
            events.push(value);
        }, elapsedMs: () => 0 }, {
            ...engine,
            continuationScope: { connectionId: "private", provider: "openai", model: `bounded-${index}` },
        }, "assistant");
    }

    assert.equal(events.length, 42);
});
