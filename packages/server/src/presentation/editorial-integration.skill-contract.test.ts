import assert from "node:assert/strict";
import test from "node:test";
import { loadBuiltInSkillPackages } from "../application/assistant/skills/built-in-skill-packages.js";
import { CapabilityFixtureEngine, withService } from "./editorial-integration.test-utils.js";
import type { EditorialAssistantRequest } from "../application/editorial/engine/editorial-assistant-request.js";

// Product scenarios: editorial-workflows.skill-execution-contract

const source = "It is important to note that retries take 42 ms.";
const shorter = "Retries take 42 ms.";
const markdown = `---
id: custom-tighten
name: Custom tighten
description: Shorten prose without losing facts.
version: 1
scopes: [article, selection]
execution:
  capability: generate_proposal
  operation: flow_revision
  source: article
  resultPolicy: shorter_preserving_content
---
Shorten the source, preserving all facts. Return a complete replacement.
`;

for (const scope of ["article", "selection"] as const) {
    for (const output of [shorter, source, `${source} Extra words.`, "Retries take 41 ms."]) {
        test(`custom shortening policy validates ${scope} output: ${output}`, async () => {
            const engine = new CapabilityFixtureEngine([{ type: "completed", responseId: "result", text: output }]);
            await withService(engine, async (url, persistence, services) => {
                services.authorSkills!.create({ skillId: "custom-tighten", files: { "SKILL.md": markdown } });
                const article = services.articles.createArticle({ title: "Draft", content: scope === "article" ? source : `Before ${source} After` });
                await fetch(`${url}/api/articles/${article.id}/assistant/messages/edit-mode`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ mode: "direct" }) });
                const requestScope = scope === "article"
                    ? { kind: "article" as const, baseRevisionId: article.currentRevisionId }
                    : { kind: "selection" as const, baseRevisionId: article.currentRevisionId, startOffset: 7, endOffset: 7 + source.length };
                const request = services.assistant.prepare({ kind: "new", requestId: "custom", articleId: article.id, authorMessage: "Shorten it.", explicitSkillId: "custom-tighten", scope: requestScope });
                const captured = request.resolvedSkill;
                const installed = services.authorSkills!.readCurrent("custom-tighten");
                assert.ok(captured?.contentHash);
                assert.deepEqual(captured.execution, loadBuiltInSkillPackages().find((skill) => skill.reference.id === "concise_rewrite")?.execution);
                // A package edit after preparation must not change this run's contract or instructions.
                services.authorSkills!.update({ skillId: "custom-tighten", expectedHash: installed!.contentHash, files: { "SKILL.md": markdown.replace("shorter_preserving_content", "verified_edit") } });
                const consume = async () => {
                    for await (const event of services.assistant.stream(request, new AbortController().signal))
                        void event;
                };
                if (output === shorter || output === source)
                    await consume();
                else
                    await assert.rejects(consume(), { code: "invalid_output" });

                const artifacts = persistence.editorialArtifacts.listEditorialArtifacts(article.id);
                assert.equal(artifacts.length, output === shorter || output === source ? 1 : 0);
                if (artifacts[0])
                    assert.equal(JSON.parse(artifacts[0].content).proposal, scope === "article" ? output : `Before ${output} After`);

                assert.equal(engine.requests[0]?.article, source);
                assert.equal(engine.requests[0]?.skill?.contentHash, captured.contentHash);
                const shortenSourcePattern = /Shorten the source/;
                assert.match(engine.requests[0]?.skill?.instructions ?? "", shortenSourcePattern);
                assert.equal(services.articles.listRevisions(article.id).length, 1);
            }, false, { verify: async () => true, verifyReplacement: async () => true });
        });
    }
}


test("inferred Author Skill keeps its primary contract when a complementary built-in loads", async () => {
    class InferredEngine extends CapabilityFixtureEngine {
        override async *streamAssistant(request: EditorialAssistantRequest) {
            request.onSkillLoaded?.("custom-tighten");
            request.onSkillLoaded?.("flow_and_clarity");
            yield* super.streamAssistant(request);
        }
    }


    const engine = new InferredEngine([{ type: "completed", responseId: "result", text: shorter }]);
    await withService(engine, async (_url, persistence, services) => {
        services.authorSkills!.create({ skillId: "custom-tighten", files: { "SKILL.md": markdown } });
        const article = services.articles.createArticle({ title: "Draft", content: source });
        const request = services.assistant.prepare({ kind: "new", requestId: "inferred-custom", articleId: article.id, authorMessage: "Shorten it.", scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
        for await (const event of services.assistant.stream(request, new AbortController().signal))
            void event;

        assert.equal(persistence.assistant.getRequest(request.requestId)?.resolvedSkillId, "custom-tighten");
        assert.equal(engine.requests[0]?.skill?.execution.capability, "generate_proposal");
        const shortenSourcePattern = /Shorten the source/;
        assert.match(engine.requests[0]?.skill?.instructions ?? "", shortenSourcePattern);
        const flowClarityPattern = /Flow and Clarity/;
        assert.match(engine.requests[0]?.skill?.instructions ?? "", flowClarityPattern);
        assert.equal(persistence.assistant.listMessages(article.id).at(-1)?.editCandidate, undefined);
        assert.equal(persistence.editorialArtifacts.listEditorialArtifacts(article.id).length, 1);
    }, false, { verify: async () => true, verifyReplacement: async () => true });
});
