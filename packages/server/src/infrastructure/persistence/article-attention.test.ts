import assert from "node:assert/strict";
import test from "node:test";
import { FACT_CHECK_STATUS } from "@skladno/shared";
import { withRepository } from "./repositories.test-utils.js";

test("Library attention follows current review work and accepted translations without returning bodies", () => withRepository(({
    articles, assistant, editorialArtifacts: editorial,
}, _close, database) => {
    const article = articles.createArticle({ title: "Source", content: "Private body" });
    const other = articles.createArticle({ title: "Other", content: "Independent" });
    const getAttention = () => articles.listArticleSummaries().find((item) => item.id === article.id)?.attention;
    assert.equal(getAttention(), undefined);
    const artifact = editorial.createEditorialArtifact({ articleId: article.id, revisionId: article.currentRevisionId,
        kind: "proposal", content: JSON.stringify({ proposal: "Private generated body" }) });
    assistant.createRequest({ id: "review", articleId: article.id, scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
    const response = assistant.completeRequest({ requestId: "review", articleId: article.id, responseKind: "proposal_prepared",
        content: "Private reply", editorialArtifactId: artifact.id });
    assert.equal(getAttention()?.review, true);
    assert.equal(getAttention()?.latestResponse, `${response.createdAt}:${response.id}`);
    assert.equal(articles.listArticleSummaries().find((item) => item.id === other.id)?.attention, undefined);
    database.prepare("UPDATE editorial_artifacts SET rejected_at = 'now' WHERE id = ?").run(artifact.id);
    assert.equal(getAttention()?.review, false);

    const translation = editorial.createEditorialArtifact({ articleId: article.id, revisionId: article.currentRevisionId,
        kind: "translation", content: "{}" });
    assistant.createRequest({ id: "translation", articleId: article.id, scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
    assistant.completeRequest({ requestId: "translation", articleId: article.id, responseKind: "translation_proposal_prepared",
        content: "Translation ready", editorialArtifactId: translation.id });
    assert.equal(getAttention()?.translation, true);
    database.prepare("UPDATE article_revisions SET provenance_json = ? WHERE id = ?")
        .run(JSON.stringify({ editorialArtifactId: translation.id }), other.currentRevisionId);
    assert.equal(getAttention()?.translation, false);
    assistant.createRequest({ id: "failed", articleId: article.id, scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
    assistant.failRequest("failed", "failed", "editorial_request_failed");
    assert.equal(getAttention()?.failed, true);
    const serialized = JSON.stringify(articles.listArticleSummaries());
    assert.ok(!serialized.includes("Private"));
}));


test("resolved or stale Findings stop requesting Library attention", () => withRepository(({
    articles, editorialArtifacts, factChecks,
}, _close, database) => {
    const article = articles.createArticle({ title: "Checked", content: "A claim." });
    const check = { findings: [{ factId: "fact", occurrenceId: "occurrence", checkedAt: article.createdAt,
        claim: "A claim.", status: FACT_CHECK_STATUS.SUPPORTED, rationale: "Evidence", uncertainty: "", sources: [],
    }] };
    const artifact = editorialArtifacts.createEditorialArtifact({ articleId: article.id, revisionId: article.currentRevisionId,
        kind: "fact-check", content: JSON.stringify({ factCheck: check }) });
    factChecks.saveFactCheckRun(artifact.id, article.id, article.currentRevisionId, check);
    const pending = () => articles.listArticleSummaries().find((item) => item.id === article.id)?.attention?.findings ?? false;
    assert.equal(pending(), true);
    factChecks.resolveFactCheckFinding("occurrence", "evidence_accepted");
    assert.equal(pending(), false);
    database.prepare("DELETE FROM fact_check_resolutions WHERE occurrence_id = ?").run("occurrence");
    assert.equal(pending(), true);
    articles.saveRevision(article.id, { content: "A changed claim.", baseRevisionId: article.currentRevisionId });
    assert.equal(pending(), false);
}));
