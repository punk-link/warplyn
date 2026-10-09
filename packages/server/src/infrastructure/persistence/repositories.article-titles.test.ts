import assert from "node:assert/strict";
import test from "node:test";
import { ArticleService } from "../../application/articles/article-service.js";
import { withRepository } from "./repositories.test-utils.js";

// Product scenarios: history-and-publishing.missing-article-title
const content = "Community gardens give neighbors a place to grow fresh vegetables together. Shared tools and weekly meetings help new gardeners learn practical skills and build lasting friendships.";


test("promotion generates missing metadata once, preserving immutable history and language", () => withRepository(async ({ articles, assistant }) => {
    const article = articles.createArticle({ title: "", content: "", language: "es" });
    let calls = 0;
    const service = new ArticleService(articles, assistant, undefined, undefined, () => ({ generate: async (sent, _signal, language) => {
        calls++;
        assert.equal(sent, content);
        assert.equal(language, "es");
        return "Huertos de la comunidad";
    } }));
    const revision = await service.saveRevisionWithDescription(article.id, { baseRevisionId: article.currentRevisionId, content }, new AbortController().signal);
    assert.deepEqual(revision.titleGeneration, { status: "generated", title: "Huertos de la comunidad" });
    assert.equal(articles.getArticle(article.id)?.title, "Huertos de la comunidad");
    assert.equal(articles.getRevision(article.id, revision.id)?.titleGeneration, undefined);
    assert.equal(articles.listRevisions(article.id).length, 2);
    await service.acceptProposalWithDescription(article.id, { baseRevisionId: revision.id, content, provenance: {} }, new AbortController().signal);
    await service.restoreRevisionWithTitle(article.id, revision.id);
    assert.equal(calls, 1);
    assert.equal(articles.listRevisions(article.id).length, 4);
}));


test("titled, short, repetitive and protected-only Articles send no title context", () => withRepository(async ({ articles, assistant }) => {
    let calls = 0;
    const service = new ArticleService(articles, assistant, undefined, undefined, () => ({ generate: async () => {
        calls++;
        return "Unexpected";
    } }));
    for (const [title, text] of [["Author title", content], ["", "Brief note"], ["", "garden ".repeat(80)], ["", `\`\`\`\n${content}\n\`\`\``]]) {
        const article = articles.createArticle({ title: title!, content: "" });
        const revision = await service.saveRevisionWithDescription(article.id, { baseRevisionId: article.currentRevisionId, content: text! }, new AbortController().signal);
        assert.equal(articles.getArticle(article.id)?.title, title);
        assert.equal(revision.titleGeneration?.status, title ? undefined : "insufficient-context");
    }

    assert.equal(calls, 0);
}));


test("failed, unavailable, malformed and cancelled generation never blocks a committed Revision", () => withRepository(async ({ articles, assistant }) => {
    for (const outcome of ["failure", "unavailable", "", "First\nSecond", "Invented 2027 fact", "x".repeat(121), "cancelled"]) {
        const article = articles.createArticle({ title: "", content: "" });
        const controller = new AbortController();
        const service = new ArticleService(articles, assistant, undefined, undefined, () => outcome === "unavailable" ? undefined : ({ generate: async () => {
            if (outcome === "failure")
                throw new Error("private provider error");

            if (outcome === "cancelled")
                controller.abort();

            return outcome === "cancelled" ? "Community gardens" : outcome;
        } }));
        const revision = await service.saveRevisionWithDescription(article.id, { baseRevisionId: article.currentRevisionId, content }, controller.signal);
        assert.equal(revision.titleGeneration?.status, "failed");
        assert.equal(articles.getArticle(article.id)?.title, "");
        assert.equal(articles.getArticle(article.id)?.currentRevisionId, revision.id);
        assert.equal(articles.listRevisions(article.id).length, 2);
    }
}));


test("delayed results cannot overwrite Author metadata, newer Revisions or deleted Articles", () => withRepository(async ({ articles, assistant }) => {
    for (const action of ["rename", "revision", "delete"]) {
        const article = articles.createArticle({ title: "", content: "" });
        let finish: (title: string) => void = () => undefined;
        const service = new ArticleService(articles, assistant, undefined, undefined, () => ({ generate: () => new Promise<string>((resolve) => {
            finish = resolve;
        }) }));
        const pending = service.saveRevisionWithDescription(article.id, { baseRevisionId: article.currentRevisionId, content }, new AbortController().signal);
        await new Promise<void>((resolve) => setImmediate(resolve));
        if (action === "rename")
            articles.updateArticle(article.id, { title: "Author title" });

        if (action === "revision")
            articles.appendArticleRevision(article.id, "New topic", {});

        if (action === "delete")
            articles.deleteArticle(article.id);

        finish("Community gardens");
        assert.equal((await pending).titleGeneration, undefined);
        let expectedTitle: string | undefined = "";
        if (action === "rename")
            expectedTitle = "Author title";

        if (action === "delete")
            expectedTitle = undefined;

        assert.equal(articles.getArticle(article.id)?.title, expectedTitle);
    }
}));


test("acceptance and restoration retry untitled Articles after an unsuccessful promotion", () => withRepository(async ({ articles, assistant }) => {
    const article = articles.createArticle({ title: "", content });
    let calls = 0;
    const service = new ArticleService(articles, assistant, undefined, undefined, () => ({ generate: async () => {
        if (++calls === 1)
            throw new Error("unavailable");

        return "Community gardens";
    } }));
    const accepted = await service.acceptProposalWithDescription(article.id, { baseRevisionId: article.currentRevisionId, content, provenance: {} }, new AbortController().signal);
    assert.equal(accepted.titleGeneration?.status, "failed");
    const restored = await service.restoreRevisionWithTitle(article.id, article.currentRevisionId);
    assert.equal(restored.titleGeneration?.status, "generated");
    assert.equal(articles.getArticle(article.id)?.title, "Community gardens");
    assert.equal(calls, 2);
}));


test("bounded context cannot leak the tail or turn protected values into new claims", () => withRepository(async ({ articles, assistant }) => {
    const article = articles.createArticle({ title: "", content: "" });
    const source = `${content} In 2026 see https://example.com/gardens. ${"More detail about gardens. ".repeat(600)}PRIVATE TAIL`;
    const service = new ArticleService(articles, assistant, undefined, undefined, () => ({ generate: async (sent) => {
        assert.equal(Array.from(sent).length, 12000);
        assert.equal(sent.includes("PRIVATE TAIL"), false);
        return "Community gardens in 20";
    } }));
    const revision = await service.saveRevisionWithDescription(article.id, { baseRevisionId: article.currentRevisionId, content: source }, new AbortController().signal);
    assert.equal(revision.titleGeneration?.status, "failed");
    assert.equal(articles.getArticle(article.id)?.title, "");
}));
