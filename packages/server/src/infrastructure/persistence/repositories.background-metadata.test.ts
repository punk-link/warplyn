import assert from "node:assert/strict";
import test from "node:test";
import { setImmediate, setTimeout } from "node:timers/promises";
import { ArticleService } from "../../application/articles/article-service.js";
import { withRepository } from "./repositories.test-utils.js";


test("save commits and returns while both metadata generators remain unresolved", () => withRepository(async ({ articles, assistant }, _close, database) => {
    const article = articles.createArticle({ title: "", content: "Before" });
    const content = "Community gardens give neighbors a place to grow fresh vegetables together. " +
        "Shared tools and weekly meetings help new gardeners learn practical skills.";
    let finishDescription: (value: string) => void = () => undefined;
    let finishTitle: (value: string) => void = () => undefined;
    const service = new ArticleService(articles, assistant, undefined, () => ({ generate: (previous, next) => {
        assert.equal(previous, "Before");
        assert.equal(next, content);
        return new Promise<string>((resolve) => {
            finishDescription = resolve;
        });
    } }), () => ({ generate: () => new Promise<string>((resolve) => {
        finishTitle = resolve;
    }) }));
    const saved = await service.saveRevisionWithDescription(article.id, { baseRevisionId: article.currentRevisionId, content }, new AbortController().signal);
    assert.equal(saved.titleGeneration?.status, "pending");
    assert.equal(articles.getArticle(article.id)?.currentRevisionId, saved.id);
    const immutable = database.prepare("SELECT * FROM article_revisions WHERE id = ?").get(saved.id);
    articles.saveDraft(article.id, { baseRevisionId: saved.id, content: "Keep typing" });
    articles.updateArticle(article.id, { title: "Author title" });
    finishDescription("Clarified opening");
    finishTitle("Community gardens");
    await setImmediate();
    assert.equal(articles.getArticle(article.id)?.title, "Author title");
    assert.equal(articles.getArticle(article.id)?.draft?.content, "Keep typing");
    assert.equal(articles.getRevision(article.id, saved.id)?.description, "Clarified opening");
    assert.deepEqual(database.prepare("SELECT * FROM article_revisions WHERE id = ?").get(saved.id), immutable);
}));


test("acceptance and restoration return while title generation remains unresolved", () => withRepository(async ({ articles, assistant }) => {
    const content = "Community gardens give neighbors a place to grow fresh vegetables together. " +
        "Shared tools and weekly meetings help new gardeners learn practical skills.";
    const article = articles.createArticle({ title: "", content });
    const completions: ((title: string) => void)[] = [];
    const service = new ArticleService(articles, assistant, undefined, undefined, () => ({
        generate: () => new Promise<string>((resolve) => completions.push(resolve)),
    }));
    const accepted = await service.acceptProposalWithDescription(article.id,
        { baseRevisionId: article.currentRevisionId, content, provenance: {} }, new AbortController().signal);
    const restored = await service.restoreRevisionWithTitle(article.id, article.currentRevisionId);
    assert.equal(accepted.titleGeneration?.status, "pending");
    assert.equal(restored.titleGeneration?.status, "pending");
    assert.equal(articles.getArticle(article.id)?.currentRevisionId, restored.id);
    completions[0]!("Stale gardens");
    await setImmediate();
    assert.equal(articles.getArticle(article.id)?.title, "");
    completions[1]!("Community gardens");
    await setImmediate();
    assert.equal(articles.getArticle(article.id)?.title, "Community gardens");
    assert.equal(articles.listRevisions(article.id).length, 3);
}));


test("explicit title and language edits invalidate pending title work", async () => {
    for (const input of [{ title: "Author title" }, { language: "es" }]) {
        await withRepository(async ({ articles, assistant }) => {
            const article = articles.createArticle({ title: "", content: "" });
            let finish: (title: string) => void = () => undefined;
            const service = new ArticleService(articles, assistant, undefined, undefined, () => ({
                generate: () => new Promise<string>((resolve) => {
                    finish = resolve;
                }),
            }));
            const content = "Community gardens give neighbors a place to grow fresh vegetables together. " +
                "Shared tools and weekly meetings help new gardeners learn practical skills.";
            await service.saveRevisionWithDescription(article.id, { baseRevisionId: article.currentRevisionId, content }, new AbortController().signal);
            service.updateArticle(article.id, input);
            finish("Community gardens");
            await setImmediate();
            assert.equal(articles.getArticle(article.id)?.title, input.title ?? "");
            assert.equal(service.getArticle(article.id)?.currentRevision.titleGeneration, undefined);
        });
    }
});


test("metadata deadlines discard output when a generator ignores cancellation", () => withRepository(async ({ articles, assistant }) => {
    const article = articles.createArticle({ title: "", content: "" });
    const content = "Community gardens give neighbors a place to grow fresh vegetables together. " +
        "Shared tools and weekly meetings help new gardeners learn practical skills.";
    let finishTitle: (value: string) => void = () => undefined;
    let finishDescription: (value: string) => void = () => undefined;
    const service = new ArticleService(articles, assistant, undefined, () => ({
        generate: () => new Promise<string>((resolve) => {
            finishDescription = resolve;
        }),
    }), () => ({ generate: () => new Promise<string>((resolve) => {
        finishTitle = resolve;
    }) }));
    const revision = await service.saveRevisionWithDescription(article.id,
        { baseRevisionId: article.currentRevisionId, content }, new AbortController().signal);
    assert.equal(revision.titleGeneration?.status, "pending");
    await setTimeout(15100);
    assert.equal(service.getArticle(article.id)?.currentRevision.titleGeneration?.status, "failed");
    finishTitle("Community gardens");
    finishDescription("Late description");
    await setImmediate();
    assert.equal(articles.getArticle(article.id)?.title, "");
    assert.equal(articles.getRevision(article.id, revision.id)?.description, undefined);
}));
