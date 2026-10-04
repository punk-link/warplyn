import assert from "node:assert/strict";
import test from "node:test";
import { APPLICATION_ERROR, type AcceptProposalInput } from "@skladno/shared";
import { withRepository } from "./repositories.test-utils.js";
import type { TestPersistence } from "../../test-support/test-persistence.js";


function prepareRefresh(repositories: TestPersistence) {
    const source = repositories.articles.createArticle({ title: "Source", content: "First source", language: "en" });
    const target = repositories.articles.createArticle({ title: "Independent title", content: "Primera versión", language: "es", sourceArticleId: source.id, sourceRevisionId: source.currentRevisionId });
    const sibling = repositories.articles.createArticle({ title: "German", content: "Erste Version", language: "de", sourceArticleId: source.id, sourceRevisionId: source.currentRevisionId });
    const revision = repositories.articles.saveRevision(source.id, { baseRevisionId: source.currentRevisionId, content: "Updated source" });
    const artifact = repositories.editorialArtifacts.createEditorialArtifact({ articleId: source.id, revisionId: revision.id, kind: "assistant-proposal", content: JSON.stringify({ proposal: "Versión actualizada", translation: { targetLanguage: "Spanish", protectedSpans: [] } }) });
    const input: AcceptProposalInput = { baseRevisionId: target.currentRevisionId, content: "Versión actualizada", provenance: {}, translationRefresh: { editorialArtifactId: artifact.id } };
    return { source, target, sibling, revision, artifact, input };
}


// Product scenarios: history-and-publishing.translation-source-change, history-and-publishing.translation-refresh
test("source edits preserve linked texts; refresh appends history and restores the original freshness", () => withRepository((repositories) => {
    const { source, target, sibling, revision, input } = prepareRefresh(repositories);
    assert.equal(repositories.articles.getArticle(target.id)?.currentRevision.content, target.currentRevision.content);
    assert.equal(repositories.articles.getArticle(sibling.id)?.currentRevision.content, sibling.currentRevision.content);
    assert.notEqual(target.sourceRevisionId, revision.id);
    const refreshed = repositories.articles.acceptProposal(target.id, input);
    assert.equal(repositories.articles.getArticle(target.id)?.sourceRevisionId, revision.id);
    assert.equal(repositories.articles.getArticle(target.id)?.title, target.title);
    assert.equal(repositories.articles.getArticle(sibling.id)?.sourceRevisionId, source.currentRevisionId);
    assert.equal(repositories.articles.listRevisions(target.id).length, 2);
    assert.equal(repositories.articles.getRevision(target.id, target.currentRevisionId)?.content, target.currentRevision.content);
    repositories.articles.restoreRevision(target.id, target.currentRevisionId);
    assert.equal(repositories.articles.getArticle(target.id)?.sourceRevisionId, source.currentRevisionId);
    repositories.articles.restoreRevision(target.id, refreshed.id);
    assert.equal(repositories.articles.getArticle(target.id)?.sourceRevisionId, revision.id);
}));


for (const change of ["source", "target", "draft", "content", "language", "rejected", "protected", "selection"] as const) {
    test(`refresh rejects ${change} conflicts without changing text, freshness, or history`, () => withRepository((repositories, _close, database) => {
        const { source, target, artifact, input } = prepareRefresh(repositories);
        if (change === "source")
            repositories.articles.saveRevision(source.id, { baseRevisionId: repositories.articles.getArticle(source.id)!.currentRevisionId, content: "Newer source" });

        if (change === "target")
            repositories.articles.saveRevision(target.id, { baseRevisionId: target.currentRevisionId, content: "Author edit" });

        if (change === "draft")
            repositories.articles.saveDraft(target.id, { baseRevisionId: target.currentRevisionId, content: "Unfinished edit" });

        if (change === "content")
            input.content = "Forged output";

        if (change === "language")
            repositories.articles.updateArticle(target.id, { language: "de" });

        if (change === "rejected")
            database.prepare("UPDATE editorial_artifacts SET rejected_at = ? WHERE id = ?").run("2026-10-03", artifact.id);

        if (change === "protected")
            repositories.editorialArtifacts.updateEditorialArtifactContent(artifact.id, source.id, JSON.stringify({ proposal: input.content, translation: { targetLanguage: "Spanish", protectedSpans: ["https://example.com"] } }));

        if (change === "selection")
            repositories.editorialArtifacts.updateEditorialArtifactContent(artifact.id, source.id, JSON.stringify({ proposal: input.content, scope: { kind: "selection" }, translation: { targetLanguage: "Spanish", protectedSpans: [] } }));

        const before = repositories.articles.getArticle(target.id);
        const history = repositories.articles.listRevisions(target.id);
        let message: string = APPLICATION_ERROR.INVALID_REQUEST;
        if (change === "draft")
            message = APPLICATION_ERROR.DRAFT_CONFLICT;
        else if (change === "source" || change === "target")
            message = APPLICATION_ERROR.REVISION_CONFLICT;

        assert.throws(() => repositories.articles.acceptProposal(target.id, input), { message });
        assert.deepEqual(repositories.articles.getArticle(target.id), before);
        assert.deepEqual(repositories.articles.listRevisions(target.id), history);
    }));
}


test("restoring a legacy translation recovers its original source link without rewriting history", () => withRepository((repositories, _close, database) => {
    const { source, target, input } = prepareRefresh(repositories);
    database.prepare("UPDATE article_revisions SET provenance_json = ? WHERE id = ?").run(JSON.stringify({ kind: "initial" }), target.currentRevisionId);
    repositories.articles.acceptProposal(target.id, input);
    repositories.articles.restoreRevision(target.id, target.currentRevisionId);
    assert.equal(repositories.articles.getArticle(target.id)?.sourceRevisionId, source.currentRevisionId);
    assert.deepEqual(repositories.articles.getRevision(target.id, target.currentRevisionId)?.provenance, { kind: "initial" });
}));


test("server creation refuses a stale source Revision even if the renderer checked it earlier", () => withRepository((repositories) => {
    const { source } = prepareRefresh(repositories);
    const before = repositories.articles.listArticles();
    assert.throws(() => repositories.articles.createArticle({ title: "Stale", content: "Old translation", sourceArticleId: source.id, sourceRevisionId: source.currentRevisionId }), { message: APPLICATION_ERROR.REVISION_CONFLICT });
    assert.deepEqual(repositories.articles.listArticles(), before);
}));
