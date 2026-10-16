import assert from "node:assert/strict";
import test from "node:test";
import { withService } from "./editorial-integration.test-utils.js";

// Product scenarios: editorial-workflows.typography-local-review

test("local review requires applicable language rules and translations use their own saved conventions", () =>
    withService(undefined, async (baseUrl, repositories) => {
        const corpus = repositories.styleCorpus;
        corpus.setTypographyConfiguration({ language: "en", preferences: {
            rules: [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }], disabled: [],
        } });
        const source = repositories.articleService.createArticle({ title: "Source", content: "Wait...", language: "en" });
        const target = repositories.articleService.createArticle({
            title: "Target", content: "Подождите...", language: "ru", sourceArticleId: source.id,
        });
        const unknown = repositories.articleService.createArticle({ title: "Unknown", content: "Wait..." });
        const review = (articleId: string) => fetch(`${baseUrl}/api/articles/${articleId}/editorial`, {
            method: "POST", headers: { "content-type": "application/json" },
            body: JSON.stringify({ requestId: crypto.randomUUID(), operation: "style_review", reviewMode: "typography" }),
        });
        for (const article of [target, unknown]) {
            const response = await review(article.id);
            const stream = await response.text();
            const errorcodeTypographyRulesPattern = /"errorCode":"typography_rules_required"/u;
            assert.match(stream, errorcodeTypographyRulesPattern);
            const typeCompletedPattern = /"type":"completed"/u;
            assert.doesNotMatch(stream, typeCompletedPattern);
            assert.equal(repositories.editorialArtifacts.listEditorialArtifacts(article.id).length, 0);
        }

        corpus.setTypographyConfiguration({ language: "ru", preferences: {
            rules: [{ id: "quotes", definition: { kind: "quotes", outer: "guillemets", nested: "curly" } }], disabled: [],
        } });
        const response = await review(target.id);
        assert.equal(response.status, 200);
        await response.text();
        const artifact = repositories.editorialArtifacts.listEditorialArtifacts(target.id)[0]!;
        const metadata = JSON.parse(artifact.content);
        assert.equal(metadata.styleReview.typography.capture.language, "ru");
        assert.equal(metadata.proposal, "Подождите...");
        assert.equal(metadata.styleReview.typography.rules[0].id, "quotes");
        assert.equal(repositories.articles.getArticle(source.id)?.currentRevision.content, "Wait...");
        const invalid = await fetch(`${baseUrl}/api/style-corpus/typography-configuration`, {
            method: "PUT", headers: { "content-type": "application/json" },
            body: JSON.stringify({ language: "en", preferences: { preset: { id: "en-US", version: 1 }, rules: [], disabled: [] } }),
        });
        assert.equal(invalid.status, 400);
        const missing = await fetch(`${baseUrl}/api/articles/missing/typography`);
        assert.equal(missing.status, 404);
        const regional = await fetch(`${baseUrl}/api/articles`, {
            method: "POST", headers: { "content-type": "application/json" },
            body: JSON.stringify({ title: "Regional", content: "Bonjour !", language: "FR-fr" }),
        });
        assert.equal(regional.status, 201);
        assert.equal((await regional.json()).language, "fr-FR");
    }));
