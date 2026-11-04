import assert from "node:assert/strict";
import test from "node:test";

import { createLocalDiagnostics } from "../../diagnostics/local-diagnostics.js";
import { timeFactCheckProvider } from "./timed-fact-check-provider.js";
import type { FactCheckProvider } from "../models/fact-check-provider.js";


function provider(): FactCheckProvider {
    return {
        researchStage: "private-stage-name",
        extractClaims: async () => ({ responseId: "private-response", claims: [{ claim: "private-claim" }] }),
        matchClaims: async () => [],
        researchClaims: async () => [],
        evaluateClaims: async () => ({ responseId: "private-response", findings: [] }),
    };
}


test("Fact Check timings use fixed local stages without private inputs or outputs", async () => {
    const lines: string[] = [];
    const timed = timeFactCheckProvider(provider(), createLocalDiagnostics({ stdout: (line) => lines.push(line), environment: {} }));
    const signal = new AbortController().signal;
    const extracted = await timed.extractClaims("private-article", "private-instructions", signal);
    await timed.matchClaims!(["private-claim"], [], signal);
    await timed.researchClaims(extracted.claims, "private-instructions", signal);
    await timed.evaluateClaims([], "private-instructions", signal);
    assert.equal(extracted.responseId, "private-response");
    assert.deepEqual(lines.map((line) => JSON.parse(line).stage), [
        "fact_check_extraction", "fact_check_matching", "fact_check_research", "fact_check_evaluation",
    ]);
    for (const line of lines) {
        const record = JSON.parse(line);
        assert.equal(record.event, "ai.stage_finished");
        assert.equal(typeof record.elapsedMs, "number");
        assert.equal(line.includes("private"), false);
    }
});


test("failed timing preserves the original error and excludes raw provider errors", async () => {
    const lines: string[] = [];
    const failure = new Error("private-provider-error");
    const source = { ...provider(), researchClaims: async () => {
        throw failure;
    } };
    const timed = timeFactCheckProvider(source,
        createLocalDiagnostics({ stderr: (line) => lines.push(line), environment: {} }));
    await assert.rejects(timed.researchClaims([], "private-instructions", new AbortController().signal), (error) => error === failure);
    assert.equal(lines.length, 1);
    assert.equal(JSON.parse(lines[0]!).event, "ai.stage_failed");
    assert.equal(lines[0]!.includes("private"), false);
});


test("cancelled provider results cannot become successful stage records", async () => {
    const lines: string[] = [];
    const controller = new AbortController();
    controller.abort();
    const timed = timeFactCheckProvider(provider(), createLocalDiagnostics({
        stdout: (line) => lines.push(line), stderr: (line) => lines.push(line), environment: {},
    }));
    await assert.rejects(timed.extractClaims("private-article", "private-instructions", controller.signal));
    assert.equal(lines.length, 1);
    assert.equal(JSON.parse(lines[0]!).event, "ai.stage_failed");
});


test("diagnostic writer failures leave provider results and optional matching unchanged", async () => {
    const source = provider();
    delete source.matchClaims;
    const timed = timeFactCheckProvider(source, createLocalDiagnostics({ stdout: () => {
        throw new Error("Writer unavailable");
    } }));
    assert.equal(timed.matchClaims, undefined);
    assert.equal((await timed.extractClaims("private-article", "private-instructions", new AbortController().signal)).responseId, "private-response");
});
