import assert from "node:assert/strict";
import test from "node:test";
import { MockLanguageModelV3 } from "ai/test";
import type { LanguageModelV3StreamPart } from "@ai-sdk/provider";
import { AI_PROVIDER, APPLICATION_ERROR, type AssistantEvent } from "@skladno/shared";
import type { EditorialEngine } from "../application/editorial/engine/editorial-engine.js";
import { AiSdkAssistantExecutor } from "../infrastructure/editorial/adapters/ai-sdk-assistant-executor.js";
import { CapabilityFixtureEngine, withService } from "./editorial-integration.test-utils.js";


// Product scenario: editorial-workflows.assistant-request-proposal
for (const scope of ["article", "selection"] as const) {
    test(`a rejected replacement check preserves the ${scope} Proposal for review`, async () => {
        const engine = new CapabilityFixtureEngine([{ type: "completed", responseId: "proposal", text: "Clearer wording." }]);
        await withService(engine, async (_url, persistence, services) => {
            const article = services.articles.createArticle({ title: "Synthetic", content: "Original wording." });
            const requestScope = scope === "selection"
                ? { kind: "selection" as const, baseRevisionId: article.currentRevisionId, startOffset: 0, endOffset: 17 }
                : { kind: "article" as const, baseRevisionId: article.currentRevisionId };
            const request = services.assistant.prepare({ kind: "new", requestId: "verification", articleId: article.id, authorMessage: "Improve clarity.", explicitSkillId: "flow_and_clarity", scope: requestScope });
            const events: AssistantEvent[] = [];
            for await (const event of services.assistant.stream(request, new AbortController().signal))
                events.push(event);

            assert.equal(events.at(-1)?.type, "completed");
            assert.equal(persistence.assistant.getRequest(request.requestId)?.status, "completed");
            assert.equal(persistence.editorialArtifacts.listEditorialArtifacts(article.id).length, 1);
            assert.equal(persistence.assistant.listMessages(article.id).find((message) => message.role === "assistant" && message.requestId === request.requestId)?.editCandidate, undefined);
            assert.equal(services.articles.getArticle(article.id)?.currentRevisionId, article.currentRevisionId);
        }, false, { verify: async () => false, verifyReplacement: async () => {
            throw new Error("synthetic verification failure");
        } });
    });
}


test("an unavailable intent check does not authorize an untagged edit", async () => {
    const engine: EditorialEngine = {
        async *stream() {
            yield* [];
        },
        async *streamConversation() {
            yield* [];
        },
        async *streamAssistant(request) {
            assert.equal(request.initialActiveCapabilities, undefined);
            yield { type: "completed", responseId: "reply", text: "Please clarify the intended change." };
        },
    };
    await withService(engine, async (_url, persistence, services) => {
        const article = services.articles.createArticle({ title: "Synthetic", content: "Original wording." });
        const request = services.assistant.prepare({ kind: "new", requestId: "intent", articleId: article.id, authorMessage: "Improve clarity.", scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
        for await (const event of services.assistant.stream(request, new AbortController().signal))
            void event;

        assert.equal(persistence.assistant.getRequest(request.requestId)?.status, "completed");
        assert.deepEqual(persistence.editorialArtifacts.listEditorialArtifacts(article.id), []);
        assert.equal(services.articles.getArticle(article.id)?.currentRevisionId, article.currentRevisionId);
    }, false, { verify: async () => {
        throw new Error("synthetic intent failure");
    } });
});


for (const duplicate of [false, true]) {
    test(`a single-Proposal run needs one model turn${duplicate ? " even with duplicate tool calls" : ""}`, async () => {
        let modelCalls = 0;
        const model = new MockLanguageModelV3({ doStream: async () => {
            modelCalls += 1;
            assert.equal(modelCalls, 1, "No final reply call should be needed");
            return { stream: new ReadableStream<LanguageModelV3StreamPart>({ start(controller) {
                for (const id of duplicate ? ["first", "second"] : ["first"])
                    controller.enqueue({ type: "tool-call", toolCallId: id, toolName: "generate_proposal", input: JSON.stringify({ operation: "flow_revision" }) });

                controller.enqueue({ type: "finish", finishReason: { unified: "tool-calls", raw: undefined }, usage: {
                    inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
                    outputTokens: { total: 1, text: 1, reasoning: 0 },
                } });
                controller.close();
            } }) };
        } });
        const executor = new AiSdkAssistantExecutor({ languageModel: model, provider: AI_PROVIDER.OPENAI, storeResponses: false });
        const fixture = new CapabilityFixtureEngine([{ type: "completed", responseId: "proposal", text: "Clearer wording." }]);
        const engine: EditorialEngine = { stream: fixture.stream.bind(fixture), streamConversation: fixture.streamConversation.bind(fixture), streamAssistant: executor.stream.bind(executor) };
        await withService(engine, async (_url, persistence, services) => {
            const article = services.articles.createArticle({ title: "Synthetic", content: "Original wording." });
            const request = services.assistant.prepare({ kind: "new", requestId: "single", articleId: article.id, authorMessage: "Improve clarity.", explicitSkillId: "flow_and_clarity", scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
            const events: AssistantEvent[] = [];
            for await (const event of services.assistant.stream(request, new AbortController().signal))
                events.push(event);

            assert.equal(events.at(-1)?.type, "completed");
            assert.equal(fixture.requests.length, 1);
            assert.equal(model.doStreamCalls.length, 1);
            assert.equal(persistence.assistant.getRequest(request.requestId)?.executions?.length, 1);
            assert.equal(persistence.editorialArtifacts.listEditorialArtifacts(article.id).length, 1);
            assert.equal(services.articles.getArticle(article.id)?.currentRevisionId, article.currentRevisionId);
        }, false);
    });
}


// Product scenario: editorial-workflows.assistant-request-timeout
for (const stage of ["replacement", "intent", "description"] as const) {
    test(`the request deadline includes ${stage} verification and discards late completion`, async (context) => {
        let release: () => void = () => undefined;
        let started: () => void = () => undefined;
        const pending = new Promise<void>((resolve) => {
            release = resolve;
        });
        const entered = new Promise<void>((resolve) => {
            started = resolve;
        });
        let providerSignal: AbortSignal | undefined;
        const wait = async (signal: AbortSignal) => {
            providerSignal = signal;
            started();
            await pending;
            return true;
        };
        const engine = new CapabilityFixtureEngine([{ type: "completed", responseId: "proposal", text: "Clearer wording." }]);
        await withService(engine, async (_url, persistence, services) => {
            const article = services.articles.createArticle({ title: "Synthetic", content: "Original wording." });
            services.assistant.setEditMode(article.id, "direct");
            const request = services.assistant.prepare({ kind: "new", requestId: "deadline", articleId: article.id, authorMessage: "Improve clarity.", explicitSkillId: "flow_and_clarity", scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
            context.mock.timers.enable({ apis: ["setTimeout"] });
            const completion = (async () => {
                for await (const event of services.assistant.stream(request, new AbortController().signal))
                    assert.notEqual(event.type, "completed");
            })();
            // Keep the broken implementation's probe bounded too.
            const verdict = completion.then(() => "completed", (error: unknown) => error);
            await entered;
            context.mock.timers.tick(120_000);
            await new Promise<void>((resolve) => setImmediate(resolve));
            const aborted = providerSignal?.aborted;
            release();
            const result = await verdict;
            context.mock.timers.reset();
            assert.equal(aborted, true, "The active completion check must be aborted by the deadline");
            assert.ok(result && typeof result === "object" && "code" in result);
            assert.equal(result.code, APPLICATION_ERROR.ASSISTANT_REQUEST_TIMED_OUT);
            assert.equal(persistence.assistant.getRequest(request.requestId)?.errorCode, APPLICATION_ERROR.ASSISTANT_REQUEST_TIMED_OUT);
            await new Promise<void>((resolve) => setImmediate(resolve));
            assert.deepEqual(persistence.editorialArtifacts.listEditorialArtifacts(article.id), []);
            assert.equal(services.articles.getArticle(article.id)?.currentRevisionId, article.currentRevisionId);
        }, false, {
            verify: async (_message, _capability, _input, signal) => stage === "intent" ? wait(signal) : true,
            verifyReplacement: async (_message, _source, _replacement, _target, signal) => stage === "replacement" ? wait(signal) : true,
        }, undefined, { generate: async (_before, _after, _locale, signal) => {
            if (stage === "description")
                await wait(signal);

            return "Improved clarity";
        } });
    });
}


test("delivering a committed completion cannot turn it into a cancelled request", async (context) => {
    const engine = new CapabilityFixtureEngine([{ type: "completed", responseId: "proposal", text: "Clearer wording." }]);
    await withService(engine, async (_url, persistence, services) => {
        const article = services.articles.createArticle({ title: "Synthetic", content: "Original wording." });
        const request = services.assistant.prepare({ kind: "new", requestId: "delivered", articleId: article.id, authorMessage: "Improve clarity.", explicitSkillId: "flow_and_clarity", scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
        const controller = new AbortController();
        context.mock.timers.enable({ apis: ["setTimeout"] });
        let completed = false;
        for await (const event of services.assistant.stream(request, controller.signal)) {
            if (event.type === "completed") {
                completed = true;
                context.mock.timers.tick(120_000);
                controller.abort();
            }
        }

        context.mock.timers.reset();
        assert.equal(completed, true);
        assert.equal(persistence.assistant.getRequest(request.requestId)?.status, "completed");
        assert.equal(persistence.editorialArtifacts.listEditorialArtifacts(article.id).length, 1);
    }, false);
});


test("conflicting artifact calls fail before a second generation and persist no Proposal", async () => {
    const fixture = new CapabilityFixtureEngine([{ type: "completed", responseId: "proposal", text: "Clearer wording." }]);
    const engine: EditorialEngine = {
        stream: fixture.stream.bind(fixture), streamConversation: fixture.streamConversation.bind(fixture),
        async *streamAssistant(request, signal) {
            const tool = request.tools.find((candidate) => candidate.capability === "generate_proposal");
            assert.ok(tool);
            await tool.execute({ operation: "flow_revision" }, signal);
            await tool.execute({ operation: "thesis_to_narrative" }, signal);
            yield { type: "completed", responseId: "reply", text: "Prepared." };
        },
    };
    await withService(engine, async (_url, persistence, services) => {
        const article = services.articles.createArticle({ title: "Synthetic", content: "Original wording." });
        const request = services.assistant.prepare({ kind: "new", requestId: "conflicting", articleId: article.id, authorMessage: "Improve clarity.", explicitSkillId: "flow_and_clarity", scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
        await assert.rejects(async () => {
            for await (const event of services.assistant.stream(request, new AbortController().signal))
                assert.notEqual(event.type, "completed");
        }, { code: "invalid_output" });
        assert.equal(fixture.requests.length, 1);
        assert.deepEqual(persistence.editorialArtifacts.listEditorialArtifacts(article.id), []);
        assert.equal(services.articles.getArticle(article.id)?.currentRevisionId, article.currentRevisionId);
    }, false);
});
