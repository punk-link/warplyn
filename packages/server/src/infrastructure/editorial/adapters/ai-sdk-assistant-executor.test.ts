import assert from "node:assert/strict";
import test from "node:test";
import { MockLanguageModelV3 } from "ai/test";
import type { LanguageModelV3StreamPart } from "@ai-sdk/provider";
import { AI_PROVIDER } from "@skladno/shared";

import { EDITORIAL_ENGINE_ERROR } from "../../../application/editorial/engine/editorial-engine-errors.js";
import { EDITORIAL_ENGINE_EVENT } from "../../../application/editorial/engine/editorial-engine-events.js";
import { AiSdkAssistantExecutor, createAssistantInstructions } from "./ai-sdk-assistant-executor.js";


test("Assistant distinguishes prepared translations from linked translation Articles before rejection", () => {
    const instructions = createAssistantInstructions({ instructions: [], skills: [], interfaceLocale: "en" });
    assert.match(instructions, /service messages.*Interface locale en.*ordinary conversational answers.*language of the Author's question/s);
    assert.match(instructions, /matches an available Skill, load that Skill before choosing capabilities/);
    assert.match(instructions, /inspect_translations first.*artifactId.*reject_translation.*never use inspect_linked_articles/s);
});


test("Assistant completes only after a successful final finish reason", async () => {
    for (const reason of ["length", "content-filter", "error", "other", "stop"] as const) {
        const model = new MockLanguageModelV3({
            doStream: {
                stream: new ReadableStream<LanguageModelV3StreamPart>({
                    start(controller) {
                        controller.enqueue({ type: "text-start", id: "text" });
                        controller.enqueue({ type: "text-delta", id: "text", delta: "Assistant answer" });
                        controller.enqueue({ type: "text-end", id: "text" });
                        controller.enqueue({
                            type: "finish",
                            finishReason: { unified: reason, raw: undefined },
                            usage: {
                                inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
                                outputTokens: { total: 1, text: 1, reasoning: 0 },
                            },
                        });
                        controller.close();
                    },
                }),
            },
        });
        const executor = new AiSdkAssistantExecutor({ languageModel: model, provider: AI_PROVIDER.OPENAI, storeResponses: false });
        const events: string[] = [];
        const consume = async () => {
            for await (const event of executor.stream({
                message: "Hello", article: "", scope: "article", instructions: [], history: [], skills: [],
                tools: [{ capability: "find_capabilities", description: "Discover capabilities", input: "capability-query", execute: async () => [] }],
            }, new AbortController().signal))
                events.push(event.type);
        };

        if (reason === "stop") {
            await consume();
            assert.deepEqual(events, [EDITORIAL_ENGINE_EVENT.TEXT_DELTA, EDITORIAL_ENGINE_EVENT.COMPLETED]);
        } else {
            await assert.rejects(consume(), { code: EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM }, reason);
            assert.deepEqual(events, [EDITORIAL_ENGINE_EVENT.TEXT_DELTA], reason);
        }
    }
});


test("Assistant fails when an artifact tool fails instead of completing with the model's explanation", async () => {
    const usage = {
        inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
        outputTokens: { total: 1, text: 1, reasoning: 0 },
    };
    const model = new MockLanguageModelV3({
        doStream: [
            {
                stream: new ReadableStream<LanguageModelV3StreamPart>({
                    start(controller) {
                        controller.enqueue({ type: "tool-call", toolCallId: "translation", toolName: "translate", input: JSON.stringify({ targetLanguage: "Spanish" }) });
                        controller.enqueue({ type: "finish", finishReason: { unified: "tool-calls", raw: undefined }, usage });
                        controller.close();
                    },
                }),
            },
            {
                stream: new ReadableStream<LanguageModelV3StreamPart>({
                    start(controller) {
                        controller.enqueue({ type: "text-start", id: "text" });
                        controller.enqueue({ type: "text-delta", id: "text", delta: "Translation failed." });
                        controller.enqueue({ type: "text-end", id: "text" });
                        controller.enqueue({ type: "finish", finishReason: { unified: "stop", raw: undefined }, usage });
                        controller.close();
                    },
                }),
            },
        ],
    });
    const executor = new AiSdkAssistantExecutor({ languageModel: model, provider: AI_PROVIDER.OPENAI, storeResponses: false });
    const events: string[] = [];
    const consume = async () => {
        for await (const event of executor.stream({
            message: "Translate to Spanish", article: "Article", scope: "article", instructions: [], history: [], skills: [], initialActiveCapabilities: ["translate"],
            tools: [{
                capability: "translate", description: "Prepare translation", input: "target-language", execute: async () => {
                    throw new Error("translation failed");
                }
            }],
        }, new AbortController().signal))
            events.push(event.type);
    };

    await assert.rejects(consume(), /translation failed/);
    assert.deepEqual(events, []);
    assert.equal(model.doStreamCalls.length, 1, "A terminal tool failure must stop the model loop");
});


test("loading Skill Creator keeps its creation capability available after discovery", async () => {
    const usage = {
        inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
        outputTokens: { total: 1, text: 1, reasoning: 0 },
    };
    const model = new MockLanguageModelV3({
        doStream: [
            { stream: createToolCallStream("load-skill", "load_skill", { id: "skill_creator" }, usage) },
            { stream: createToolCallStream("discover", "find_capabilities", { query: "create a reusable skill" }, usage) },
            { stream: createToolCallStream("create-skill", "create_author_skill", { skillId: "no-em-dashes", skillMarkdown: "# No em dashes" }, usage) },
            { stream: createTextStream("Created the Skill.", usage) },
        ],
    });
    let created = false;
    const events: string[] = [];
    const executor = new AiSdkAssistantExecutor({ languageModel: model, provider: AI_PROVIDER.OPENAI, storeResponses: false });

    for await (const event of executor.stream({
        message: "Create a reusable Skill without em dashes.", article: "", scope: "article", instructions: [], history: [],
        skills: [{ id: "skill_creator", name: "Skill Creator", description: "Creates local Skills.", instructions: "Use create_author_skill.", capabilities: ["create_author_skill"] }],
        tools: [{ capability: "find_capabilities", description: "Discover capabilities", input: "capability-query", execute: async () => [] }, { capability: "create_author_skill", description: "Save a Skill", input: "author-skill", execute: async () => {
            created = true;
            return { skillId: "no-em-dashes" };
        } }],
    }, new AbortController().signal))
        events.push(event.type);

    assert.equal(created, true);
    assert.deepEqual(events, [EDITORIAL_ENGINE_EVENT.TEXT_DELTA, EDITORIAL_ENGINE_EVENT.COMPLETED]);
    assert.deepEqual(model.doStreamCalls.map((call) => call.tools?.map((tool) => tool.name)), [
        ["find_capabilities", "load_skill"],
        ["find_capabilities", "create_author_skill", "load_skill"],
        ["find_capabilities", "create_author_skill", "load_skill"],
        ["find_capabilities", "create_author_skill", "load_skill"],
    ]);
});


function createToolCallStream(id: string, toolName: string, input: Record<string, string>, usage: { inputTokens: { total: number; noCache: number; cacheRead: number; cacheWrite: number }; outputTokens: { total: number; text: number; reasoning: number } }) {
    return new ReadableStream<LanguageModelV3StreamPart>({
        start(controller) {
            controller.enqueue({ type: "tool-call", toolCallId: id, toolName, input: JSON.stringify(input) });
            controller.enqueue({ type: "finish", finishReason: { unified: "tool-calls", raw: undefined }, usage });
            controller.close();
        },
    });
}


function createTextStream(text: string, usage: { inputTokens: { total: number; noCache: number; cacheRead: number; cacheWrite: number }; outputTokens: { total: number; text: number; reasoning: number } }) {
    return new ReadableStream<LanguageModelV3StreamPart>({
        start(controller) {
            controller.enqueue({ type: "text-start", id: "text" });
            controller.enqueue({ type: "text-delta", id: "text", delta: text });
            controller.enqueue({ type: "text-end", id: "text" });
            controller.enqueue({ type: "finish", finishReason: { unified: "stop", raw: undefined }, usage });
            controller.close();
        },
    });
}


test("all registered artifact capabilities end through the same completion gate", async () => {
    const usage = {
        inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
        outputTokens: { total: 1, text: 1, reasoning: 0 },
    };
    const candidates = [
        { capability: "generate_proposal", input: "proposal-operation" },
        { capability: "fact_check", input: "none" },
        { capability: "style_review", input: "none" },
        { capability: "translate", input: "target-language" },
    ] as const;
    for (const candidate of candidates) {
        const input: Record<string, string> = {};
        if (candidate.input === "proposal-operation")
            input.operation = "flow_revision";

        if (candidate.input === "target-language")
            input.targetLanguage = "Spanish";

        const model = new MockLanguageModelV3({ doStream: { stream: createToolCallStream("artifact", candidate.capability, input, usage) } });
        const executor = new AiSdkAssistantExecutor({ languageModel: model, provider: AI_PROVIDER.OPENAI, storeResponses: false });
        const events = [];
        let executed = false;
        for await (const event of executor.stream({
            message: "Prepare the requested artifact.", article: "", scope: "article", instructions: [], history: [], skills: [], initialActiveCapabilities: [candidate.capability],
            tools: [{ ...candidate, execution: "artifact", description: "Prepare the artifact", execute: async () => {
                executed = true;
                return { status: "prepared" };
            } }],
        }, new AbortController().signal))
            events.push(event);

        assert.equal(executed, true, candidate.capability);
        assert.deepEqual(events.map((event) => event.type), ["completed"], candidate.capability);
        assert.equal(model.doStreamCalls.length, 1, candidate.capability);
    }
});


test("a completed artifact cannot hide a malformed sibling tool call", async () => {
    const model = new MockLanguageModelV3({ doStream: { stream: new ReadableStream<LanguageModelV3StreamPart>({ start(controller) {
        controller.enqueue({ type: "tool-call", toolCallId: "valid", toolName: "generate_proposal", input: JSON.stringify({ operation: "flow_revision" }) });
        controller.enqueue({ type: "tool-call", toolCallId: "invalid", toolName: "generate_proposal", input: JSON.stringify({ operation: "unregistered" }) });
        controller.enqueue({ type: "finish", finishReason: { unified: "tool-calls", raw: undefined }, usage: {
            inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
            outputTokens: { total: 1, text: 1, reasoning: 0 },
        } });
        controller.close();
    } }) } });
    const executor = new AiSdkAssistantExecutor({ languageModel: model, provider: AI_PROVIDER.OPENAI, storeResponses: false });
    const events: string[] = [];
    await assert.rejects(async () => {
        for await (const event of executor.stream({
            message: "Improve clarity", article: "", scope: "article", instructions: [], history: [], skills: [], initialActiveCapabilities: ["generate_proposal"],
            tools: [{ capability: "generate_proposal", execution: "artifact", input: "proposal-operation", description: "Prepare Proposal", execute: async () => ({ status: "prepared" }) }],
        }, new AbortController().signal))
            events.push(event.type);
    }, { code: EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT });
    assert.deepEqual(events, []);
});


test("a completed artifact still requires a successful orchestration finish reason", async () => {
    const model = new MockLanguageModelV3({ doStream: { stream: new ReadableStream<LanguageModelV3StreamPart>({ start(controller) {
        controller.enqueue({ type: "tool-call", toolCallId: "artifact", toolName: "fact_check", input: "{}" });
        controller.enqueue({ type: "finish", finishReason: { unified: "length", raw: undefined }, usage: {
            inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
            outputTokens: { total: 1, text: 1, reasoning: 0 },
        } });
        controller.close();
    } }) } });
    const executor = new AiSdkAssistantExecutor({ languageModel: model, provider: AI_PROVIDER.OPENAI, storeResponses: false });
    await assert.rejects(async () => {
        for await (const event of executor.stream({
            message: "Check facts", article: "", scope: "article", instructions: [], history: [], skills: [], initialActiveCapabilities: ["fact_check"],
            tools: [{ capability: "fact_check", execution: "artifact", input: "none", description: "Check facts", execute: async () => ({ status: "prepared" }) }],
        }, new AbortController().signal))
            assert.notEqual(event.type, "completed");
    }, { code: EDITORIAL_ENGINE_ERROR.INCOMPLETE_STREAM });
});
