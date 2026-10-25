import assert from "node:assert/strict";
import test from "node:test";
import { APPLICATION_ERROR, REVISION_PROVENANCE_KIND } from "@skladno/shared";
import { FixtureEngine, withService } from "./editorial-integration.test-utils.js";


test("HTTP acceptance rejects forged protected edits and stale requests without changing history", async () => {
    await withService(new FixtureEngine([]), async (baseUrl, repositories) => {
        const { articles, editorialArtifacts } = repositories;
        const article = articles.createArticle({ title: "Protected", content: "Original 42 https://example.test `code`" });
        const proposal = "Generated 42 https://example.test `code`";
        const artifact = editorialArtifacts.createEditorialArtifact({ articleId: article.id, revisionId: article.currentRevisionId,
            kind: "assistant-proposal", content: JSON.stringify({ proposal }) });
        const provenance = { kind: REVISION_PROVENANCE_KIND.ACCEPTED_PROPOSAL, editorialArtifactId: artifact.id, wholeProposal: true };
        const apply = (content: string) => fetch(`${baseUrl}/api/articles/${article.id}/proposal-acceptances`, {
            method: "POST", headers: { "content-type": "application/json" },
            body: JSON.stringify({ baseRevisionId: article.currentRevisionId, content, provenance }),
        });
        const invalid = await apply("Forged 43 https://example.test `code`");
        assert.equal(invalid.status, 400);
        assert.deepEqual((await invalid.json()).error, { code: APPLICATION_ERROR.PROPOSAL_EDIT_INVALID });
        assert.equal(articles.listRevisions(article.id).length, 1);
        const edited = "Author 42 https://example.test `code`";
        assert.equal((await apply(edited)).status, 201);
        assert.equal(articles.getArticle(article.id)?.currentRevision.content, edited);
        assert.equal((await apply(edited)).status, 409);
        assert.equal(articles.listRevisions(article.id).length, 2);
    });
});
