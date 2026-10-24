import assert from "node:assert/strict";
import test from "node:test";
import { MockLanguageModelV3 } from "ai/test";
import type { LanguageModelV3StreamPart } from "@ai-sdk/provider";
import { AiSdkAssistantExecutor, createAssistantInstructions } from "./ai-sdk-assistant-executor.js";
import { createAssistantConversationPrompt } from "./ai-sdk-assistant.js";
import { selectionContextPolicy } from "../../../application/editorial/selection-context-policy.js";
import { AiSdkEditorialEngine } from "../engines/ai-sdk-editorial-engine.js";


function modelStream(parts: LanguageModelV3StreamPart[]) {
    return { stream: new ReadableStream<LanguageModelV3StreamPart>({ start(controller) {
        for (const part of parts)
            controller.enqueue(part);

        controller.close();
    } }) };
}


test("selection questions read bounded context on demand while general replies disclose no Article text", async () => {
    const usage = { inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 }, outputTokens: { total: 1, text: 1, reasoning: 0 } };
    const answerParts: LanguageModelV3StreamPart[] = [
        { type: "text-start", id: "answer" }, { type: "text-delta", id: "answer", delta: "Answer" }, { type: "text-end", id: "answer" },
        { type: "finish", finishReason: { unified: "stop", raw: undefined }, usage },
    ];
    for (const needsArticle of [true, false]) {
        const answer = modelStream(answerParts);
        const read = modelStream([
            { type: "tool-call", toolCallId: "selection", toolName: "read_selection", input: "{}" },
            { type: "finish", finishReason: { unified: "tool-calls", raw: undefined }, usage },
        ]);
        const model = new MockLanguageModelV3({ doStream: needsArticle ? [read, answer] : [answer] });
        const executor = new AiSdkAssistantExecutor({ languageModel: model, provider: "openai", storeResponses: false });
        let reads = 0;
        const request = {
            message: needsArticle ? "What does the selected writing mean?" : "Hello", article: "", scope: "selection" as const,
            history: [], instructions: [], skills: [], tools: [{
                capability: "read_selection", input: "none" as const, description: "Read the selected writing only when needed.",
                execute: async () => {
                    reads++;
                    return { selectedSource: "selected-source", readOnlyContext: "neighbor-definition" };
                },
            }],
        };
        const prompt = JSON.stringify(createAssistantConversationPrompt(request));
        assert.ok(prompt.includes("available through read_selection"));
        for await (const event of executor.stream(request, new AbortController().signal))
            void event;

        assert.equal(reads, needsArticle ? 1 : 0);
        assert.ok(JSON.stringify(model.doStreamCalls[0]?.prompt).includes(selectionContextPolicy));
        assert.ok(!JSON.stringify(model.doStreamCalls[0]?.prompt).includes("neighbor-definition"));
        if (needsArticle)
            assert.ok(JSON.stringify(model.doStreamCalls[1]?.prompt).includes("neighbor-definition"));
    }
});


test("orchestration applies the same policy after Author Skill guidance and before later Skill loads", () => {
    const instructions = ["Legacy Author Skill: return a full Article."];
    const request = { instructions, skills: [], interfaceLocale: "en", scope: "selection" as const };
    const system = createAssistantInstructions(request);
    assert.ok(system.endsWith(selectionContextPolicy));
    assert.ok(system.indexOf(instructions[0]!) < system.indexOf(selectionContextPolicy));
    assert.ok(createAssistantInstructions({ ...request, instructions: [] }).endsWith(selectionContextPolicy));
    assert.ok(!createAssistantInstructions({ ...request, scope: "article" }).includes(selectionContextPolicy));
});


test("direct conversation receives policy as instructions and neighbors as data", async () => {
    const usage = { inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 }, outputTokens: { total: 1, text: 1, reasoning: 0 } };
    const model = new MockLanguageModelV3({ doStream: modelStream([
        { type: "text-start", id: "answer" }, { type: "text-delta", id: "answer", delta: "Answer" }, { type: "text-end", id: "answer" },
        { type: "finish", finishReason: { unified: "stop", raw: undefined }, usage },
    ]) });
    const engine = new AiSdkEditorialEngine({ languageModel: model, provider: "openai", storeResponses: false });
    for await (const event of engine.streamConversation({
        message: "Explain the selection", article: "Selected source.", scope: "selection", history: [],
        selectionContext: { preceding: "UNTRUSTED NEIGHBOR", following: "following passage" },
    }, new AbortController().signal))
        void event;

    const messages = model.doStreamCalls[0]!.prompt;
    const system = messages.find((message) => message.role === "system");
    assert.ok(String(system?.content).endsWith(selectionContextPolicy));
    assert.ok(!String(system?.content).includes("UNTRUSTED NEIGHBOR"));
    assert.ok(messages.some((message) => message.role === "user" && JSON.stringify(message.content).includes("UNTRUSTED NEIGHBOR")));
});
