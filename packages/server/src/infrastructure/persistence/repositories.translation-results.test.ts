import assert from "node:assert/strict";
import test from "node:test";
import { APPLICATION_ERROR } from "@skladno/shared";
import { withRepository } from "./repositories.test-utils.js";


// Product scenarios: history-and-publishing.translation-result-acceptance
test("same-Revision translation artifacts recover independently and exact acceptance preserves history", () => withRepository((repositories, _close, database) => {
    const source = repositories.articles.createArticle({ title: "Source", content: "Unchanged source", language: "en" });
    const target = repositories.articles.createArticle({ title: "Spanish edition", content: "Original translation", language: "es", sourceArticleId: source.id, sourceRevisionId: source.currentRevisionId });
    const artifacts = ["First Spanish", "Second Spanish"].map((content, index) => {
        const request = repositories.assistant.createRequest({ id: `translation-${index}`, articleId: source.id, scope: { kind: "article", baseRevisionId: source.currentRevisionId }, explicitSkillId: "translation" });
        repositories.assistant.resolveRequest(request.id, "translation", "explicit");
        const artifact = repositories.editorialArtifacts.createEditorialArtifact({ articleId: source.id, revisionId: source.currentRevisionId, kind: "assistant-proposal", content: JSON.stringify({ proposal: content, translation: { targetLanguage: "Spanish", protectedSpans: [] } }) });
        repositories.assistant.completeRequest({ requestId: request.id, articleId: source.id, skillId: "translation", responseKind: "translation_proposal_prepared", content: "", editorialArtifactId: artifact.id });
        return artifact;
    });
    const first = artifacts[0]!;
    const second = artifacts[1]!;
    const messages = repositories.assistant.listMessages(source.id).filter((message) => message.translation);
    assert.deepEqual(messages.map((message) => message.translation?.content), ["First Spanish", "Second Spanish"]);
    assert.equal(new Set(messages.map((message) => message.requestId)).size, 2);
    assert.equal(repositories.articles.listRevisions(source.id).length, 1);
    const accepted = repositories.articles.acceptProposal(target.id, { baseRevisionId: target.currentRevisionId, content: "First Spanish", provenance: {}, translationRefresh: { editorialArtifactId: first.id } });
    assert.equal(accepted.content, "First Spanish");
    assert.equal(accepted.provenance.editorialArtifactId, first.id);
    assert.equal(repositories.articles.getRevision(target.id, target.currentRevisionId)?.content, "Original translation");
    const independent = repositories.articles.createArticle({ title: "Another edition", content: "First Spanish", language: "es", sourceArticleId: source.id, sourceRevisionId: source.currentRevisionId, provenance: { kind: "accepted-translation", editorialArtifactId: first.id } });
    assert.equal(independent.currentRevision.provenance.editorialArtifactId, first.id);
    repositories.assistant.rejectTranslation(source.id, second.id);
    const recovered = repositories.assistant.listMessages(source.id).filter((message) => message.translation);
    assert.equal(recovered.find((message) => message.editorialArtifactId === first.id)?.status, "completed");
    assert.equal(recovered.find((message) => message.editorialArtifactId === second.id)?.status, "rejected");
    assert.equal(repositories.editorialArtifacts.getEditorialArtifact(second.id, source.id), undefined);
    // Older rejections only marked the message; acceptance must still refuse them.
    database.prepare("UPDATE editorial_artifacts SET rejected_at = NULL WHERE id = ?").run(second.id);
    assert.throws(() => repositories.articles.acceptProposal(target.id, { baseRevisionId: accepted.id, content: "Second Spanish", provenance: {}, translationRefresh: { editorialArtifactId: second.id } }), { message: APPLICATION_ERROR.INVALID_REQUEST });
    assert.throws(() => repositories.articles.createArticle({ title: "Rejected edition", content: "Second Spanish", language: "es", sourceArticleId: source.id, sourceRevisionId: source.currentRevisionId, provenance: { kind: "accepted-translation", editorialArtifactId: second.id } }), { message: APPLICATION_ERROR.INVALID_REQUEST });
    assert.equal(repositories.articles.getArticle(target.id)?.currentRevisionId, accepted.id);
    assert.equal(repositories.articles.listRevisions(target.id).length, 2);
}));
