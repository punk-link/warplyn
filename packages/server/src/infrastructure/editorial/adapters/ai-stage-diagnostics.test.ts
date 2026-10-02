import assert from "node:assert/strict";
import test from "node:test";
import { MockLanguageModelV3 } from "ai/test";
import type { LanguageModelV3StreamPart } from "@ai-sdk/provider";
import { AI_PROVIDER } from "@skladno/shared";
import { AiSdkAssistantExecutor } from "./ai-sdk-assistant-executor.js";
import { AiSdkAssistantActionIntentVerifier } from "./ai-sdk-assistant-action-intent-verifier.js";
import { getAiStageDiagnostics } from "./ai-stage-diagnostics.js";
import { EDITORIAL_ENGINE_ERROR } from "../../../application/editorial/engine/editorial-engine-errors.js";


// Product scenario: cross-cutting.private-diagnostics
test("provider stream errors use safe diagnostics instead of SDK raw-error logging", async (context) => {
    const lines: string[] = [];
    context.mock.method(process.stderr, "write", (line: string | Uint8Array) => {
        lines.push(String(line));
        return true;
    });
    const rawLog = context.mock.method(console, "error", () => undefined);
    const error = Object.assign(new Error("private Article and secret credential"), { statusCode: 503 });
    const model = new MockLanguageModelV3({ doStream: { stream: new ReadableStream<LanguageModelV3StreamPart>({ start(controller) {
        controller.enqueue({ type: "error", error });
        controller.close();
    } }) } });
    const executor = new AiSdkAssistantExecutor({ languageModel: model, provider: AI_PROVIDER.OPENAI, storeResponses: false });
    const events: string[] = [];
    await assert.rejects(async () => {
        for await (const event of executor.stream({ message: "Private prompt", article: "", scope: "article", instructions: [], history: [], skills: [], tools: [] }, new AbortController().signal))
            events.push(event.type);
    }, { code: EDITORIAL_ENGINE_ERROR.PROVIDER, message: EDITORIAL_ENGINE_ERROR.PROVIDER });
    assert.deepEqual(events, []);
    assert.equal(rawLog.mock.callCount(), 0);
    assert.equal(lines.length, 1);
    const diagnostic = JSON.parse(lines[0]!);
    assert.equal(diagnostic.stage, "assistant_step");
    assert.equal(diagnostic.status, 503);
    assert.equal(typeof diagnostic.elapsedMs, "number");
    assert.doesNotMatch(lines.join(""), /private Article|secret credential|Private prompt|stack|statusCode/);
});


test("verification failures identify the failed stage without leaking provider data", async (context) => {
    const lines: string[] = [];
    context.mock.method(process.stderr, "write", (line: string | Uint8Array) => {
        lines.push(String(line));
        return true;
    });
    const model = new MockLanguageModelV3({ doGenerate: async () => {
        throw new Error("private verifier payload");
    } });
    const verifier = new AiSdkAssistantActionIntentVerifier(model);
    await assert.rejects(verifier.verifyReplacement("Private prompt", "Private source", "Private replacement", "article", new AbortController().signal), { code: EDITORIAL_ENGINE_ERROR.PROVIDER });
    assert.equal(lines.length, 1);
    assert.equal(JSON.parse(lines[0]!).stage, "replacement_verification");
    assert.doesNotMatch(lines.join(""), /private verifier payload|Private prompt|Private source|Private replacement/);
});


test("diagnostics allowlist finish reasons and HTTP failure status", (context) => {
    const lines: string[] = [];
    context.mock.method(process.stdout, "write", (line: string | Uint8Array) => {
        lines.push(String(line));
        return true;
    });
    context.mock.method(process.stderr, "write", (line: string | Uint8Array) => {
        lines.push(String(line));
        return true;
    });
    const callbacks = getAiStageDiagnostics("editorial_generation");
    callbacks.onStepStart();
    callbacks.onStepEnd({ finishReason: "private finish metadata" });
    callbacks.onError({ error: { statusCode: "private status", message: "private payload" } });
    assert.equal(JSON.parse(lines[0]!).finishReason, "unknown");
    assert.equal(JSON.parse(lines[1]!).status, undefined);
    assert.doesNotMatch(lines.join(""), /private finish metadata|private status|private payload/);
});
