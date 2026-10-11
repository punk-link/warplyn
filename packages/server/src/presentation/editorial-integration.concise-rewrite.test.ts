import assert from "node:assert/strict";
import test from "node:test";
import { MockLanguageModelV3 } from "ai/test";
import type { LanguageModelV3StreamPart } from "@ai-sdk/provider";
import { BUILT_IN_SKILL, HTTP_METHOD, type AssistantEvent } from "@skladno/shared";
import type { EditorialAssistantRequest } from "../application/editorial/engine/editorial-assistant-request.js";
import type { EditorialEngineEvent } from "../application/editorial/engine/editorial-engine-event.js";
import { AiSdkAssistantExecutor, createAssistantInstructions } from "../infrastructure/editorial/adapters/ai-sdk-assistant-executor.js";
import { CapabilityFixtureEngine, FixtureEngine, withService } from "./editorial-integration.test-utils.js";


const source = 'It is important to note that API-v2 may take 42 ms. "Keep this quote." [Evidence](https://example.test) [^1]\n\n```js\nretry(42);\n```';
const shorter = source.replace("It is important to note that ", "");


function toolCall(toolName: string, input: Record<string, string>): ReadableStream<LanguageModelV3StreamPart> {
    return new ReadableStream({ start(controller) {
        controller.enqueue({ type: "tool-call", toolCallId: toolName, toolName, input: JSON.stringify(input) });
        controller.enqueue({ type: "finish", finishReason: { unified: "tool-calls", raw: undefined }, usage: {
            inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 },
            outputTokens: { total: 1, text: 1, reasoning: 0 },
        } });
        controller.close();
    } });
}


class RoutedFixtureEngine extends FixtureEngine {
    constructor(private readonly skillId: string) {
        super([{ type: "completed", responseId: "shorter", text: shorter }]);
    }


    async *streamAssistant(request: EditorialAssistantRequest, signal: AbortSignal): AsyncIterable<EditorialEngineEvent> {
        const instructions = createAssistantInstructions(request);
        assert.match(instructions, /shorten, tighten, or cut repetition use concise_rewrite/);
        assert.match(instructions, /only about readability, flow, or transitions use flow_and_clarity/);
        const model = new MockLanguageModelV3({ doStream: [
            { stream: toolCall("load_skill", { id: this.skillId }) },
            { stream: toolCall("generate_proposal", { operation: "flow_revision" }) },
        ] });
        yield* new AiSdkAssistantExecutor({ languageModel: model, provider: "openai", storeResponses: false }).stream(request, signal);
        assert.notEqual(model.doStreamCalls[0]?.toolChoice?.type, "tool");
    }
}


// Product scenarios: editorial-workflows.concise-rewrite-contract, editorial-workflows.concise-rewrite-proposal
for (const scope of ["article", "selection"] as const) {
    test(`explicit Concise rewrite preserves protected content and stages an isolated ${scope} Proposal`, async () => {
        const engine = new CapabilityFixtureEngine([{ type: "completed", responseId: "concise", text: shorter }]);
        await withService(engine, async (url, persistence, services) => {
            const before = "# Private surrounding heading\n\n";
            const after = "\n\nUntouched **Markdown**.\n";
            const content = scope === "article" ? source : before + source + after;
            const article = services.articles.createArticle({ title: "Private title", content });
            await fetch(`${url}/api/articles/${article.id}/assistant/messages/edit-mode`, { method: HTTP_METHOD.PUT, headers: { "content-type": "application/json" }, body: JSON.stringify({ mode: "direct" }) });
            const requestScope = scope === "article"
                ? { kind: "article" as const, baseRevisionId: article.currentRevisionId }
                : { kind: "selection" as const, baseRevisionId: article.currentRevisionId, startOffset: before.length, endOffset: before.length + source.length };
            const request = services.assistant.prepare({ kind: "new", requestId: "concise", articleId: article.id, authorMessage: "Keep the example.", explicitSkillId: BUILT_IN_SKILL.CONCISE_REWRITE, scope: requestScope });
            const events: AssistantEvent[] = [];
            for await (const event of services.assistant.stream(request, new AbortController().signal))
                events.push(event);

            const artifact = persistence.editorialArtifacts.listEditorialArtifacts(article.id)[0]!;
            const proposed = scope === "article" ? shorter : before + shorter + after;
            assert.equal(events.at(-1)?.type, "completed");
            assert.equal(engine.requests[0]?.article, source);
            assert.equal(engine.requests[0]?.skillId, BUILT_IN_SKILL.CONCISE_REWRITE);
            assert.equal(engine.requests[0]?.articleSelection, scope === "selection" ? true : undefined);
            assert.equal(engine.requests[0]?.authorContext, "Keep the example.");
            assert.equal(JSON.parse(artifact.content).proposal, proposed);
            assert.equal(artifact.revisionId, article.currentRevisionId);
            assert.ok(proposed.length < content.length);
            assert.equal(services.articles.getArticle(article.id)?.currentRevisionId, article.currentRevisionId);
            assert.equal(persistence.assistant.listMessages(article.id).at(-1)?.responseKind, "proposal_prepared");

            const revision = services.articles.acceptProposal(article.id, { baseRevisionId: article.currentRevisionId, content: proposed, provenance: { kind: "accepted-proposal", baseRevisionId: article.currentRevisionId, editorialArtifactId: artifact.id, wholeProposal: true } });
            assert.equal(revision.content, proposed);
            assert.notEqual(revision.id, article.currentRevisionId);
            assert.equal(services.articles.listRevisions(article.id).length, 2);
            assert.throws(() => services.articles.acceptProposal(article.id, { baseRevisionId: article.currentRevisionId, content: proposed, provenance: { kind: "accepted-proposal", baseRevisionId: article.currentRevisionId, editorialArtifactId: artifact.id, wholeProposal: true } }));
        }, false, { verify: async () => true, verifyReplacement: async () => true });
    });
}


test("inferred concise requests retain the Skill identity through the real tool loop while Flow stays unchanged", async () => {
    const fixtures = [
        { message: "Shorten this Article.", skillId: BUILT_IN_SKILL.CONCISE_REWRITE },
        { message: "Tighten this passage.", skillId: BUILT_IN_SKILL.CONCISE_REWRITE },
        { message: "Cut repetition.", skillId: BUILT_IN_SKILL.CONCISE_REWRITE },
        { message: "Improve readability and transitions.", skillId: BUILT_IN_SKILL.FLOW_AND_CLARITY },
    ];
    for (const fixture of fixtures) {
        const engine = new RoutedFixtureEngine(fixture.skillId);
        await withService(engine, async (_url, persistence, services) => {
            const article = services.articles.createArticle({ title: "Draft", content: source });
            const request = services.assistant.prepare({ kind: "new", requestId: "inferred", articleId: article.id, authorMessage: fixture.message, scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
            for await (const event of services.assistant.stream(request, new AbortController().signal))
                assert.notEqual(event.type, "failed");

            const concise = fixture.skillId === BUILT_IN_SKILL.CONCISE_REWRITE;
            assert.equal(engine.requests[0]?.skillId, concise ? BUILT_IN_SKILL.CONCISE_REWRITE : undefined);
            assert.equal(persistence.assistant.getRequest("inferred")?.resolvedSkillId, concise ? BUILT_IN_SKILL.CONCISE_REWRITE : undefined);
            assert.equal(persistence.editorialArtifacts.listEditorialArtifacts(article.id).length, 1);
            assert.equal(services.articles.getArticle(article.id)?.currentRevision.content, source);
        }, false, { verify: async () => true, verifyReplacement: async () => true });
    }
});


test("already-tight prose returns an exact no-op Proposal without changing the Revision", async () => {
    const tight = "  Retries need limits.\n";
    const engine = new CapabilityFixtureEngine([{ type: "completed", responseId: "noop", text: tight }]);
    await withService(engine, async (_url, persistence, services) => {
        const article = services.articles.createArticle({ title: "Draft", content: tight });
        const request = services.assistant.prepare({ kind: "new", requestId: "noop", articleId: article.id, authorMessage: "", explicitSkillId: BUILT_IN_SKILL.CONCISE_REWRITE, scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
        for await (const event of services.assistant.stream(request, new AbortController().signal))
            assert.notEqual(event.type, "failed");

        assert.equal(JSON.parse(persistence.editorialArtifacts.listEditorialArtifacts(article.id)[0]!.content).proposal, tight);
        assert.equal(services.articles.listRevisions(article.id).length, 1);
    });
});


test("unsafe concise output fails without persisting an artifact or changing the Article", async () => {
    for (const output of ["", source + " More.", source.replace("note", "know"), shorter.replace("42", "43"), shorter.replace('"Keep this quote."', '"Changed."'), shorter.replace("https://example.test", "https://other.test"), shorter.replace("[^1]", ""), shorter.replace("retry(42);", "retry(43);")]) {
        const engine = new CapabilityFixtureEngine([{ type: "completed", responseId: "unsafe", text: output }]);
        await withService(engine, async (_url, persistence, services) => {
            const article = services.articles.createArticle({ title: "Draft", content: source });
            const request = services.assistant.prepare({ kind: "new", requestId: "unsafe", articleId: article.id, authorMessage: "", explicitSkillId: BUILT_IN_SKILL.CONCISE_REWRITE, scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
            await assert.rejects(async () => {
                for await (const event of services.assistant.stream(request, new AbortController().signal))
                    assert.notEqual(event.type, "completed");
            }, { code: "invalid_output" });

            assert.equal(persistence.assistant.getRequest("unsafe")?.status, "failed");
            assert.equal(persistence.editorialArtifacts.listEditorialArtifacts(article.id).length, 0);
            assert.equal(services.articles.getArticle(article.id)?.currentRevisionId, article.currentRevisionId);
        });
    }
});


test("cancelled concise work persists no Proposal and retries retain the Skill and scope", async () => {
    const engine = new CapabilityFixtureEngine([{ type: "completed", responseId: "retry", text: shorter }]);
    await withService(engine, async (_url, persistence, services) => {
        const article = services.articles.createArticle({ title: "Draft", content: source });
        const scope = { kind: "article" as const, baseRevisionId: article.currentRevisionId };
        const request = services.assistant.prepare({ kind: "new", requestId: "cancelled", articleId: article.id, authorMessage: "Keep the example.", explicitSkillId: BUILT_IN_SKILL.CONCISE_REWRITE, scope });
        const controller = new AbortController();
        await assert.rejects(async () => {
            for await (const event of services.assistant.stream(request, controller.signal)) {
                if (event.type === "accepted")
                    controller.abort();
            }
        }, { name: "AbortError" });

        assert.equal(persistence.assistant.getRequest("cancelled")?.status, "cancelled");
        assert.equal(persistence.editorialArtifacts.listEditorialArtifacts(article.id).length, 0);
        const retry = services.assistant.prepare({ kind: "retry", requestId: "retry", articleId: article.id, retryOfRequestId: "cancelled" });
        assert.equal(retry.resolvedSkillId, BUILT_IN_SKILL.CONCISE_REWRITE);
        assert.deepEqual(retry.scope, scope);
        for await (const event of services.assistant.stream(retry, new AbortController().signal))
            assert.notEqual(event.type, "failed");

        assert.equal(persistence.editorialArtifacts.listEditorialArtifacts(article.id).length, 1);
        assert.equal(services.articles.getArticle(article.id)?.currentRevisionId, article.currentRevisionId);
    });
});
