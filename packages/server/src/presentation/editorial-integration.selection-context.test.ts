import assert from "node:assert/strict";
import test from "node:test";
import { FixtureEngine, withService } from "./editorial-integration.test-utils.js";
import type { EditorialEngine } from "../application/editorial/engine/editorial-engine.js";
import { MockLanguageModelV3 } from "ai/test";
import type { LanguageModelV3StreamPart } from "@ai-sdk/provider";
import { AiSdkEditorialEngine } from "../infrastructure/editorial/engines/ai-sdk-editorial-engine.js";
import { selectionContextPolicy } from "../application/editorial/selection-context-policy.js";


test("invalid or stale selections fail before an engine can receive neighboring context", async () => {
    const engine = new FixtureEngine([]);
    await withService(engine, async (_url, _persistence, services) => {
        const article = services.articles.createArticle({ title: "Synthetic", content: "😀 selected after" });
        for (const offsets of [{ startOffset: -1, endOffset: 3 }, { startOffset: 1, endOffset: 3 }, { startOffset: 0, endOffset: 99 }])
            assert.throws(() => services.assistant.prepare({
                kind: "new", requestId: "invalid", articleId: article.id, authorMessage: "What does this mean?",
                scope: { kind: "selection", baseRevisionId: article.currentRevisionId, ...offsets },
            }), { code: "assistant_selection_invalid" });

        assert.throws(() => services.assistant.prepare({
            kind: "new", requestId: "stale", articleId: article.id, authorMessage: "What does this mean?",
            scope: { kind: "selection", baseRevisionId: "stale-revision", startOffset: 3, endOffset: 11 },
        }), { code: "revision_conflict" });
        assert.equal(engine.requests.length, 0);
    });
});


test("a Revision changed during routing blocks the selection reader before disclosure", async () => {
    let changeRevision: () => void = () => {
        assert.fail("Revision change must be configured before routing");
    };
    const engine: EditorialEngine = {
        async *stream() {
            yield* [];
        },
        async *streamConversation() {
            yield* [];
        },
        async *streamAssistant(request, signal) {
            changeRevision();
            const read = request.tools.find((tool) => tool.capability === "read_selection");
            assert.ok(read);
            await read.execute({}, signal);
            assert.fail("A stale selection must not be disclosed");
        },
    };
    await withService(engine, async (_url, persistence, services) => {
        const article = services.articles.createArticle({ title: "Synthetic", content: "before selected after" });
        const request = services.assistant.prepare({
            kind: "new", requestId: "reader-race", articleId: article.id, authorMessage: "What does this mean?",
            scope: { kind: "selection", baseRevisionId: article.currentRevisionId, startOffset: 7, endOffset: 15 },
        });
        changeRevision = () => {
            services.articles.acceptChange(article.id, { content: "changed", provenance: {} });
        };
        await assert.rejects(async () => {
            for await (const event of services.assistant.stream(request, new AbortController().signal))
                void event;
        }, { code: "revision_conflict" });
        assert.equal(persistence.editorialArtifacts.listEditorialArtifacts(article.id).length, 0);
    });
});


test("an unmodified legacy Author Skill receives policy at routing and generation boundaries", async () => {
    const usage = { inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 }, outputTokens: { total: 1, text: 1, reasoning: 0 } };
    const parts: LanguageModelV3StreamPart[][] = [[
        { type: "tool-call", toolCallId: "proposal", toolName: "generate_proposal", input: JSON.stringify({ operation: "flow_revision" }) },
        { type: "finish", finishReason: { unified: "tool-calls", raw: undefined }, usage },
    ], [
        { type: "text-start", id: "replacement" }, { type: "text-delta", id: "replacement", delta: "improved" },
        { type: "text-end", id: "replacement" }, { type: "finish", finishReason: { unified: "stop", raw: undefined }, usage },
    ]];
    const model = new MockLanguageModelV3({ doStream: parts.map((response) => ({
        stream: new ReadableStream<LanguageModelV3StreamPart>({ start(controller) {
            for (const part of response)
                controller.enqueue(part);

            controller.close();
        } }),
    })) });
    const engine = new AiSdkEditorialEngine({ languageModel: model, provider: "openai", storeResponses: false });
    await withService(engine, async (_url, persistence, services) => {
        const skill = services.authorSkills!.create({ skillId: "legacy-rewrite", files: {
            "SKILL.md": "---\nid: legacy-rewrite\nname: Legacy rewrite\ndescription: Rephrase writing.\nversion: 1\n---\n" +
                "# Legacy rewrite\n\nRewrite the full Article. This package has no selection-context instructions.\n",
        } });
        const article = services.articles.createArticle({ title: "Synthetic", content: "BEFORE selected AFTER" });
        const request = services.assistant.prepare({
            kind: "new", requestId: "author-context", articleId: article.id, authorMessage: "Rephrase this.", explicitSkillId: "legacy-rewrite",
            scope: { kind: "selection", baseRevisionId: article.currentRevisionId, startOffset: 7, endOffset: 15 },
        });
        for await (const event of services.assistant.stream(request, new AbortController().signal))
            assert.notEqual(event.type, "failed");

        assert.equal(model.doStreamCalls.length, 2);
        for (const call of model.doStreamCalls) {
            const system = call.prompt.find((message) => message.role === "system");
            assert.ok(String(system?.content).endsWith(selectionContextPolicy));
            assert.ok(!String(system?.content).includes("BEFORE"));
        }

        assert.ok(JSON.stringify(model.doStreamCalls[1]?.prompt).includes("BEFORE"));
        const reply = persistence.assistant.listMessages(article.id).find((message) => message.requestId === "author-context" && message.role === "assistant");
        assert.equal(reply?.proposalContent, "BEFORE improved AFTER");
        assert.equal(services.articles.getArticle(article.id)?.currentRevision.content, "BEFORE selected AFTER");
        assert.equal(services.authorSkills!.readCurrent("legacy-rewrite")?.contentHash, skill.contentHash);
        assert.equal(services.authorSkills!.listRevisions("legacy-rewrite").length, 1);
    }, false);
});
