import assert from "node:assert/strict";
import test from "node:test";
import { setImmediate } from "node:timers/promises";
import { ArticleService } from "../../application/articles/article-service.js";
import { withRepository } from "./repositories.test-utils.js";


function deferredDescription() {
    let resolve!: (description: string) => void;
    let reject!: (error: Error) => void;
    const promise = new Promise<string>((complete, fail) => {
        resolve = complete;
        reject = fail;
    });
    return { promise, resolve, reject };
}


// Product scenarios: history-and-publishing.revision-descriptions
test("acceptance returns before description generation and preserves immutable Revision rows", () => withRepository(async (repositories, _close, database) => {
    const article = repositories.articles.createArticle({ title: "Descriptions", content: "before" });
    const generated = deferredDescription();
    const service = new ArticleService(repositories.articles, repositories.assistant, undefined, () => ({
        generate: async (previous, content, locale) => {
            assert.equal(previous, "before");
            assert.equal(content, "after");
            assert.equal(locale, "es");
            return generated.promise;
        },
    }));
    const revision = await service.acceptProposalWithDescription(article.id, {
        baseRevisionId: article.currentRevisionId, content: "after", provenance: {}, interfaceLocale: "es",
    }, new AbortController().signal);
    assert.equal(revision.description, "Removed 1 characters");
    assert.equal(repositories.articles.getArticle(article.id)?.currentRevisionId, revision.id);
    const original = database.prepare("SELECT * FROM article_revisions WHERE id = ?").get(revision.id);

    const newer = repositories.articles.appendArticleRevision(article.id, "newer content", {});
    generated.resolve("Clarified opening");
    await setImmediate();

    assert.deepEqual(database.prepare("SELECT * FROM article_revisions WHERE id = ?").get(revision.id), original);
    assert.equal(repositories.articles.getRevision(article.id, revision.id)?.description, "Clarified opening");
    assert.equal(repositories.articles.listRevisions(article.id).find((item) => item.id === revision.id)?.description, "Clarified opening");
    assert.equal(repositories.articles.listRevisionSummaries(article.id).find((item) => item.id === revision.id)?.description, "Clarified opening");
    assert.equal(repositories.articles.getArticle(article.id)?.currentRevisionId, newer.id);
    assert.equal(repositories.articles.getRevision(article.id, newer.id)?.description, undefined);
}));

test("current Article reads include a completed background description", () => withRepository(async ({ articles, assistant }) => {
    const article = articles.createArticle({ title: "Descriptions", content: "before" });
    const generated = deferredDescription();
    const service = new ArticleService(articles, assistant, undefined, () => ({ generate: () => generated.promise }));
    const revision = await service.acceptProposalWithDescription(article.id, {
        baseRevisionId: article.currentRevisionId, content: "after", provenance: {},
    }, new AbortController().signal);
    generated.resolve("Clarified opening");
    await setImmediate();
    assert.equal(articles.getArticle(article.id)?.currentRevision.description, "Clarified opening");
    assert.equal(articles.listArticles().find((item) => item.id === article.id)?.currentRevision.description, "Clarified opening");
    articles.setGeneratedRevisionDescription(article.id, revision.id, "Duplicate result");
    assert.equal(articles.getRevision(article.id, revision.id)?.description, "Clarified opening");
}));

test("failed, empty and cancelled background generation retains the committed fallback", async () => {
    for (const outcome of ["failed", "empty", "cancelled"]) {
        await withRepository(async ({ articles, assistant }) => {
            const article = articles.createArticle({ title: "Descriptions", content: "before" });
            const generated = deferredDescription();
            const cancellation = new AbortController();
            const service = new ArticleService(articles, assistant, undefined, () => ({ generate: () => generated.promise }));
            const revision = await service.acceptProposalWithDescription(article.id, {
                baseRevisionId: article.currentRevisionId, content: "after", provenance: {},
            }, cancellation.signal);
            if (outcome === "failed") {
                generated.reject(new Error("provider unavailable"));
            } else {
                if (outcome === "cancelled")
                    cancellation.abort();

                generated.resolve(outcome === "empty" ? "  " : "Late description");
            }

            await setImmediate();
            assert.equal(articles.getRevision(article.id, revision.id)?.description, revision.description);
            assert.equal(articles.listRevisions(article.id).length, 2);
        });
    }
});

test("deleted Articles and unavailable storage safely discard delayed descriptions", async (context) => {
    for (const unavailable of [false, true]) {
        await withRepository(async ({ articles, assistant }, _close, database) => {
            const article = articles.createArticle({ title: "Descriptions", content: "before" });
            const generated = deferredDescription();
            const service = new ArticleService(articles, assistant, undefined, () => ({ generate: () => generated.promise }));
            await service.acceptProposalWithDescription(article.id, {
                baseRevisionId: article.currentRevisionId, content: "after", provenance: {},
            }, new AbortController().signal);
            if (unavailable)
                context.mock.method(articles, "setGeneratedRevisionDescription", () => {
                    throw new Error("database is not open");
                });
            else
                articles.deleteArticle(article.id);

            generated.resolve("Late description");
            await setImmediate();
            assert.equal(database.prepare("SELECT COUNT(*) count FROM generated_revision_descriptions").get()?.count, 0);
        });
    }
});

test("rejected acceptance never starts description generation", () => withRepository(async ({ articles, assistant }) => {
    const article = articles.createArticle({ title: "Descriptions", content: "before" });
    const service = new ArticleService(articles, assistant, undefined, () => ({ generate: async () => {
        assert.fail("Rejected acceptance must not send content to a provider");
    } }));
    await assert.rejects(service.acceptProposalWithDescription(article.id, {
        baseRevisionId: "stale", content: "after", provenance: {},
    }, new AbortController().signal));
    assert.equal(articles.listRevisions(article.id).length, 1);
}));
