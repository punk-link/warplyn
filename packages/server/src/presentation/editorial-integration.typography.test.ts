import assert from "node:assert/strict";
import test from "node:test";
import { FixtureEngine, withService } from "./editorial-integration.test-utils.js";


// Product scenarios: editorial-workflows.typography-local-review


async function runReview(baseUrl: string, articleId: string, reviewMode?: string) {
    return fetch(`${baseUrl}/api/articles/${articleId}/editorial`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ requestId: "typography-test", operation: "style_review", reviewMode }),
    });
}


test("typography save, local review, recovery, and summaries work without a provider", () => withService(undefined, async (baseUrl, repositories, services) => {
    const article = repositories.articleService.createArticle({ title: "Typography", content: "Wait...\n\n`code...`", language: "en" });
    const rules = [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }];
    const saved = await fetch(`${baseUrl}/api/style-corpus/typography-configuration`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ language: "en", preferences: { rules, disabled: [] } }),
    });
    assert.equal(saved.status, 200);
    const corpus = await saved.json();
    assert.equal(corpus.status, "ready");
    assert.equal(corpus.profile.version, 1);
    const response = await runReview(baseUrl, article.id, "typography");
    const stream = await response.text();
    const lineEndingPattern = /"text":"Wait…\\n\\n`code\.\.\.`"/u;
    assert.match(stream, lineEndingPattern);
    const localPattern = /"local":true/u;
    assert.match(stream, localPattern);
    const typographyRuleDotsPattern = /typography-rule:dots/u;
    assert.match(stream, typographyRuleDotsPattern);
    const artifact = repositories.editorialArtifacts.listEditorialArtifacts(article.id)[0]!;
    assert.equal(repositories.articles.getArticle(article.id)?.currentRevision.content, article.currentRevision.content);
    const recovered = await fetch(`${baseUrl}/api/articles/${article.id}/typography-review`);
    assert.equal((await recovered.json()).editorialArtifactId, artifact.id);
    assert.deepEqual(
        await services.proposalSummaries.summarize(
            article.id,
            { editorialArtifactId: artifact.id, interfaceLocale: "en", changes: [] },
            new AbortController().signal,
        ),
        [],
    );
    assert.equal(repositories.editorialSessions.getEditorialSession(article.id), undefined);
    const malformed = await fetch(`${baseUrl}/api/style-corpus/typography`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ rules: [{ id: "bad" }] }),
    });
    assert.equal(malformed.status, 400);
    assert.equal(repositories.styleCorpus.getStyleCorpus().profile?.version, 1);
    assert.equal((await runReview(baseUrl, article.id, "unsupported")).status, 400);
}));

test("full review combines contextual output with local typography in one artifact", () => {
    const engine = new FixtureEngine([
        {
            type: "completed",
            responseId: "full-style",
            text: "Clearer words...",
            styleReview: { findings: [{ divergence: "Opening", suggestion: "Clarify", traitIds: ["global-rule-1"] }] },
        },
    ]);
    return withService(engine, async (baseUrl, repositories) => {
        repositories.styleCorpus.setStyleCorpusRules("Keep it clear.");
        repositories.styleCorpus.setTypographyConfiguration({ language: "en", preferences: {
            rules: [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }], disabled: [],
        } });
        const article = repositories.articleService.createArticle({ title: "Combined", content: "Words...", language: "en" });
        const textClearerWordsPattern = /"text":"Clearer words…"/u;
        assert.match(await (await runReview(baseUrl, article.id)).text(), textClearerWordsPattern);
        assert.equal(engine.requests.length, 1);
        const artifacts = repositories.editorialArtifacts.listEditorialArtifacts(article.id);
        assert.equal(artifacts.length, 1);
        assert.equal(JSON.parse(artifacts[0]!.content).styleReview.findings.length, 2);
    });
});


test("Assistant completion retains the captured profile when rules rebuild during generation", () => {
    const engine = new FixtureEngine([]);
    return withService(engine, async (baseUrl, repositories) => {
        repositories.styleCorpus.setTypographyConfiguration({ language: "en", preferences: {
            rules: [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }], disabled: [],
        } });
        const article = repositories.articleService.createArticle({ title: "Snapshot", content: "Wait...", language: "en" });
        engine.stream = async function* (request) {
            assert.equal(request.styleProfile?.version, 1);
            assert.equal(request.styleProfile?.rules.typographyCapture?.language, "en");
            assert.equal(request.styleProfile?.rules.typographyConfiguration, undefined);
            repositories.articles.updateArticle(article.id, { language: "ru" });
            repositories.styleCorpus.setTypographyConfiguration({ language: "en", preferences: {
                rules: [{ id: "dots", definition: { kind: "ellipsis", form: "..." } }], disabled: [],
            } });
            yield { type: "completed", responseId: "captured-style", text: "Wait...", styleReview: { findings: [] } };
        };
        const response = await fetch(`${baseUrl}/api/articles/${article.id}/assistant/requests`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                requestId: "captured-profile",
                authorMessage: "Review style",
                explicitSkillId: "style_review",
                scope: { kind: "article", baseRevisionId: article.currentRevisionId },
            }),
        });
        const text = await response.text();
        const profileversionPattern = /"profileVersion":1/u;
        assert.match(text, profileversionPattern);
        assert.equal(repositories.styleCorpus.getStyleCorpus().profile?.version, 2);
        const artifact = repositories.editorialArtifacts.listEditorialArtifacts(article.id)[0]!;
        assert.equal(JSON.parse(artifact.content).styleProfile.version, 1);
        assert.equal(JSON.parse(artifact.content).proposal, "Wait…");
        assert.equal(JSON.parse(artifact.content).styleReview.typography.capture.language, "en");
        assert.equal(repositories.articles.getArticle(article.id)?.currentRevision.content, "Wait...");
    });
});


test("inconsistent local corrections name the rule problem and retain no generated artifact", () => withService(undefined, async (baseUrl, repositories) => {
    const article = repositories.articleService.createArticle({ title: "Conflict", content: "Wait!!!!", language: "en" });
    repositories.styleCorpus.setTypographyConfiguration({ language: "en", preferences: {
        rules: [{ id: "repeat", definition: { kind: "literal", source: "!!", replacement: "!" } }], disabled: [],
    } });
    const response = await runReview(baseUrl, article.id, "typography");
    const conflictCode = /"errorCode":"typography_corrections_conflict"/u;
    assert.match(await response.text(), conflictCode);
    assert.equal(repositories.editorialArtifacts.listEditorialArtifacts(article.id).length, 0);
    assert.equal(repositories.articles.getArticle(article.id)?.currentRevision.content, "Wait!!!!");
}));
