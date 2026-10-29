import assert from "node:assert/strict";
import test from "node:test";
import { openDatabase } from "../../infrastructure/persistence/database.js";
import { createTestPersistence } from "../../test-support/test-persistence.js";
import { ArticleDraftConflictError } from "./article-draft-conflict-error.js";
import { ArticleRevisionConflictError } from "./article-revision-conflict-error.js";
import { runArticleOperation, unwrapArticleOperation } from "./article-operation-result.js";
import { ArticleService } from "./article-service.js";


test("Article conflict results preserve the original recovery payload and unexpected faults", (context) => {
    const database = openDatabase(":memory:");
    context.after(() => database.close());
    const stores = createTestPersistence(database);
    const article = stores.articleService.createArticle({ title: "Article", content: "Recoverable text" });
    const draft = stores.articles.saveDraft(article.id, { baseRevisionId: article.currentRevisionId, content: "Draft text" });
    for (const conflict of [new ArticleDraftConflictError(article, draft), new ArticleRevisionConflictError(article)]) {
        const result = runArticleOperation(() => {
            throw conflict;
        });
        assert.ok(!result.ok);
        assert.equal(result.error, conflict);
        assert.equal(result.error.article, article);
        if (result.error instanceof ArticleDraftConflictError)
            assert.equal(result.error.draft, draft);

        assert.throws(() => unwrapArticleOperation(result), (actual) => actual === conflict);
    }

    const unexpected = new Error("storage fault");
    assert.throws(() => runArticleOperation(() => {
        throw unexpected;
    }), (actual) => actual === unexpected);
});


test("a failed Revision save stops title generation and preserves conflict identity", async (context) => {
    const database = openDatabase(":memory:");
    context.after(() => database.close());
    const stores = createTestPersistence(database);
    const article = stores.articleService.createArticle({ title: "", content: "Original" });
    const conflict = new ArticleRevisionConflictError(article);
    stores.articles.saveRevision = () => {
        throw conflict;
    };
    let titleCalls = 0;
    const service = new ArticleService(stores.articles, stores.assistant, undefined, undefined, () => ({ generate: async () => {
        titleCalls++;
        return "Generated title";
    } }));
    await assert.rejects(service.saveRevisionWithDescription(article.id, { baseRevisionId: article.currentRevisionId, content: "Changed" },
        new AbortController().signal), (actual) => actual === conflict);
    assert.equal(titleCalls, 0);
    assert.equal(stores.articles.getArticle(article.id)?.currentRevision.content, "Original");
});
