import assert from "node:assert/strict";
import test from "node:test";
import { APPLICATION_ERROR, REVISION_PROVENANCE_KIND } from "@skladno/shared";
import { withRepository } from "./repositories.test-utils.js";
import { persistFactCheckArtifact } from "../../application/editorial/fact-checking/persist-fact-check-artifact.js";


test("edited acceptance validates protected content and replacement metadata before writing one Revision", () => withRepository((repositories) => {
    const { articles, editorialArtifacts } = repositories;
    const base = "Read 42 at https://example.test with `code` and Node.js.";
    const article = articles.createArticle({ title: "Review", content: base });
    const proposal = "Use 42 at https://example.test with `code` and Node.js.";
    const artifact = editorialArtifacts.createEditorialArtifact({ articleId: article.id, revisionId: article.currentRevisionId,
        kind: "assistant-proposal", content: JSON.stringify({ proposal }) });
    const provenance = { kind: REVISION_PROVENANCE_KIND.ACCEPTED_PROPOSAL, baseRevisionId: article.currentRevisionId,
        editorialArtifactId: artifact.id, wholeProposal: true };
    const apply = (content: string, extra = {}) => articles.acceptProposal(article.id, {
        baseRevisionId: article.currentRevisionId, content, provenance: { ...provenance, ...extra },
    });
    for (const [from, to] of [["42", "43"], ["https://example.test", "https://elsewhere.test"], ["`code`", "code"], ["Node.js", "Runtime"]]) {
        const content = proposal.replace(from!, to!);
        assert.throws(() => apply(content), { message: APPLICATION_ERROR.PROPOSAL_EDIT_INVALID });
        assert.throws(() => apply(content, { proposalReplacements: { "change-1": content } }), { message: APPLICATION_ERROR.PROPOSAL_EDIT_INVALID });
        assert.equal(articles.listRevisions(article.id).length, 1);
        assert.equal(articles.getArticle(article.id)?.currentRevision.content, base);
    }

    assert.throws(() => apply(proposal, { proposalReplacements: { "missing": proposal } }), { message: APPLICATION_ERROR.PROPOSAL_EDIT_INVALID });
    assert.throws(() => apply(proposal, { proposalReplacements: { "change-1": 42 } }), { message: APPLICATION_ERROR.PROPOSAL_EDIT_INVALID });
    const edited = proposal.replace("Use", "Please use");
    const revision = apply(edited, { proposalReplacements: { "change-1": edited } });
    assert.equal(revision.content, edited);
    assert.equal(articles.getRevision(article.id, article.currentRevisionId)?.content, base);
    assert.equal(articles.listRevisions(article.id).length, 2);
    assert.throws(() => apply(edited), { message: APPLICATION_ERROR.REVISION_CONFLICT });
    assert.equal(articles.listRevisions(article.id).length, 2);
}));


test("edited fact corrections keep Findings unresolved and exact generated acceptance still resolves them", () => withRepository((repositories) => {
    const { articles, editorialArtifacts, factChecks } = repositories;
    for (const edited of [false, true]) {
        const article = articles.createArticle({ title: "Fact", content: "It is 41." });
        const { factCheck } = persistFactCheckArtifact({ artifacts: editorialArtifacts, factChecks, articleId: article.id,
            revisionId: article.currentRevisionId, metadata: {}, factCheck: { findings: [
                { claim: "It is 41.", status: "disputed", rationale: "Incorrect number.", uncertainty: "Low", sources: [] },
            ] } });
        const occurrenceId = factCheck.findings[0]!.occurrenceId!;
        const artifact = editorialArtifacts.createEditorialArtifact({ articleId: article.id, revisionId: article.currentRevisionId,
            kind: "editorial-proposal", content: JSON.stringify({ proposal: "It is 42.",
                correctionSelection: { expectedRevisionId: article.currentRevisionId, occurrenceIds: [occurrenceId] } }) });
        const content = edited ? "The result is 42." : "It is 42.";
        articles.acceptProposal(article.id, { baseRevisionId: article.currentRevisionId, content, provenance: {
            kind: REVISION_PROVENANCE_KIND.ACCEPTED_PROPOSAL, editorialArtifactId: artifact.id,
            ...(edited ? { acceptedChangeIds: ["change-1"], proposalReplacements: { "change-1": content } } : { wholeProposal: true }),
        } });
        assert.equal(factChecks.listFactChecks(article.id)[0]!.findings[0]!.resolution, edited ? undefined : "corrected_or_removed");
        assert.equal(articles.listRevisions(article.id).length, 2);
    }
}));


test("accepted replacements recover through Assistant history after later Author Revisions", () => withRepository((repositories) => {
    const { articles, editorialArtifacts, assistant } = repositories;
    const article = articles.createArticle({ title: "History", content: "Before" });
    const request = assistant.createRequest({ id: "edited-history", articleId: article.id,
        scope: { kind: "article", baseRevisionId: article.currentRevisionId }, explicitSkillId: "flow_and_clarity" });
    assistant.setAuthorMessage(request.id, "Improve flow");
    assistant.resolveRequest(request.id, "flow_and_clarity", "explicit");
    const artifact = editorialArtifacts.createEditorialArtifact({ articleId: article.id, revisionId: article.currentRevisionId,
        kind: "assistant-proposal", content: JSON.stringify({ proposal: "Generated" }) });
    assistant.completeRequest({ requestId: request.id, articleId: article.id, skillId: "flow_and_clarity",
        responseKind: "proposal_prepared", content: "", proposalContent: "Generated", editorialArtifactId: artifact.id });
    const replacements = { "change-1": "Author wording" };
    const revision = articles.acceptProposal(article.id, { baseRevisionId: article.currentRevisionId, content: "Author wording",
        provenance: { kind: REVISION_PROVENANCE_KIND.ACCEPTED_PROPOSAL, editorialArtifactId: artifact.id,
            acceptedChangeIds: ["change-1"], proposalReplacements: replacements } });
    articles.appendArticleRevision(article.id, "Later Author wording", { kind: "author-draft", baseRevisionId: revision.id });
    const message = assistant.listMessages(article.id).find((item) => item.editorialArtifactId === artifact.id);
    assert.deepEqual(message?.proposalAcceptance, { kind: "changes", revisionId: revision.id, acceptedChangeIds: ["change-1"], replacements });
    assert.equal(message?.proposalContent, "Generated");
}));
