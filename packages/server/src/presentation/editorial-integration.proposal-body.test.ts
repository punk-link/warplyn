import assert from "node:assert/strict";
import test from "node:test";
import { BUILT_IN_SKILL, EDITORIAL_OPERATION, HTTP_METHOD } from "@skladno/shared";
import { CapabilityFixtureEngine, withService } from "./editorial-integration.test-utils.js";

// Product scenarios: editorial-workflows.proposal-body-only

const title = "Как задать агенту архитектурные границы";
const source = "В старых проектах уже есть структура и правила.";
const output = `## Предложение\n\n**${title}**\n\n${source}`;

for (const route of ["editorial", "assistant"] as const) {
    test(`${route} rejects a copied Article title before saving a Proposal`, async () => {
        const engine = new CapabilityFixtureEngine([{ type: "completed", responseId: "title-copy", text: output }]);
        await withService(engine, async (url, persistence, services) => {
            const article = services.articles.createArticle({ title, content: source });
            if (route === "editorial") {
                const response = await fetch(`${url}/api/articles/${article.id}/editorial`, {
                    method: HTTP_METHOD.POST,
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ requestId: "title-copy", operation: EDITORIAL_OPERATION.FLOW_REVISION }),
                });
                const errorPattern = /"type":"error"/;
                assert.match(await response.text(), errorPattern);
            } else {
                const request = services.assistant.prepare({
                    kind: "new", requestId: "title-copy", articleId: article.id, authorMessage: "Improve clarity.",
                    explicitSkillId: BUILT_IN_SKILL.FLOW_AND_CLARITY,
                    scope: { kind: "article", baseRevisionId: article.currentRevisionId },
                });
                await assert.rejects(async () => {
                    for await (const event of services.assistant.stream(request, new AbortController().signal))
                        void event;
                }, { code: "invalid_output" });
            }

            assert.deepEqual(persistence.editorialArtifacts.listEditorialArtifacts(article.id), []);
            assert.equal(services.articles.getArticle(article.id)?.currentRevision.content, source);
            assert.equal(services.articles.getArticle(article.id)?.title, title);
            assert.equal(services.articles.listRevisions(article.id).length, 1);
        });
    });
}
