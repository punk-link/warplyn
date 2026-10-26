import assert from "node:assert/strict";
import test from "node:test";
import { beginTelemetryCapture, beginTimedTelemetryCapture, isTelemetryEvent, type TelemetryEvent } from "./telemetry.js";

test("telemetry accepts only finite allowlisted event shapes", () => {
    assert.equal(isTelemetryEvent({ kind: "proposal_reviewed", decision: "accepted" }), true);
    assert.equal(isTelemetryEvent({ kind: "app_failure", source: "renderer", failure: "unknown", termination: "crashed" }), true);
    assert.equal(isTelemetryEvent({ kind: "ai_operation_finished", operation: "flow_revision", outcome: "completed", elapsedMs: 12 }), true);
    assert.equal(isTelemetryEvent({ kind: "proposal_reviewed", decision: "accepted", title: "private Article" }), false);
    assert.equal(isTelemetryEvent({ kind: "ai_operation_finished", operation: "flow_revision", outcome: "completed", elapsedMs: -1 }), false);
    assert.equal(isTelemetryEvent({ kind: "unknown", context: { secret: "never send" } }), false);
    assert.equal(isTelemetryEvent({ kind: "app_failure", source: "renderer", failure: "unknown", termination: "private text" }), false);
});


test("telemetry captures retain their start time and safely no-op without an observer", () => {
    const events: TelemetryEvent[] = [];
    const event: TelemetryEvent = { kind: "backup_finished", outcome: "completed", elapsedMs: 0 };
    const capture = beginTelemetryCapture({ beginCapture: () => (captured) => events.push(captured) });
    const timed = beginTimedTelemetryCapture();

    capture(event);
    timed.capture(event);

    assert.deepEqual(events, [event]);
    assert.ok(timed.elapsedMs() >= 0);
});


test("AI stage timings reject private fields and unbounded values", () => {
    const event = { kind: "ai_stage_finished", stage: "replacement_verification", outcome: "completed", elapsedMs: 1200 };
    assert.equal(isTelemetryEvent(event), true);
    for (const extra of [{ prompt: "private" }, { model: "private" }, { requestId: "private" }, { tokenUsage: 12 }])
        assert.equal(isTelemetryEvent({ ...event, ...extra }), false);

    for (const stage of ["private stage", {}, null])
        assert.equal(isTelemetryEvent({ ...event, stage }), false);

    for (const elapsedMs of [-1, NaN, Infinity, 86_400_001])
        assert.equal(isTelemetryEvent({ ...event, elapsedMs }), false);

    assert.equal(isTelemetryEvent({ ...event, outcome: "private" }), false);
});
