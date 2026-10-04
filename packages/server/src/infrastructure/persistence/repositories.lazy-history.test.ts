import assert from "node:assert/strict";
import test from "node:test";
import { hydrateAssistantMessageHistory, summarizeArticle } from "@skladno/shared";
import { withRepository } from "./repositories.test-utils.js";


test("Article summaries preserve library metadata and Draft recovery without bodies", () => withRepository(({ articles }) => {
    const source = articles.createArticle({ title: "Source", content: "Original 😀\0text", language: "en" });
    const target = articles.createArticle({ title: "Translation", content: "Translated", sourceArticleId: source.id, sourceRevisionId: source.currentRevisionId });
    articles.saveDraft(target.id, { baseRevisionId: target.currentRevisionId, content: "Recover this Draft" });
    articles.setArticlePinned(source.id, true);
    const summaries = articles.listArticleSummaries();
    assert.deepEqual(summaries, articles.listArticles().map(summarizeArticle));
    assert.ok(summaries.every((item) => !("currentRevision" in item) && (!item.draft || !("content" in item.draft))));
    assert.equal(summaries.find((item) => item.id === target.id)?.sourceRevisionNumber, 1);
    assert.equal(articles.getArticle(target.id)?.draft?.content, "Recover this Draft");
    const revisions = articles.listRevisionSummaries(source.id);
    assert.equal(revisions[0].characterCount, Array.from(source.currentRevision.content).length);
    assert.ok(!("content" in revisions[0]));
    assert.equal(articles.getRevision(target.id, source.currentRevisionId), undefined);
    assert.equal(articles.getRevision(source.id, source.currentRevisionId)?.content, source.currentRevision.content);
}));


test("Assistant history sends each base once and keeps selection offsets and limited conversation order", () => withRepository(({ articles, assistant }, _close, database) => {
    const article = articles.createArticle({ title: "History", content: "😀 selected text" });
    for (let index = 0; index < 10; index++) {
        const id = `request-${index}`;
        assistant.createRequest({ id, articleId: article.id, authorMessage: `Question ${index}`, scope: { kind: "selection", baseRevisionId: article.currentRevisionId, startOffset: 3, endOffset: 11 } });
        assistant.completeRequest({ requestId: id, articleId: article.id, responseKind: "editorial_conversation", content: `Reply ${index}` });
    }

    assistant.createRequest({ id: "failed", articleId: article.id, authorMessage: "", scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
    assistant.failRequest("failed", "failed", "test");
    database.prepare("UPDATE assistant_messages SET created_at = 'same-time' WHERE article_id = ?").run(article.id);
    const history = assistant.listMessageHistory(article.id);
    assert.deepEqual(history.revisionContents, { [article.currentRevisionId]: article.currentRevision.content });
    assert.ok(history.messages.every((message) => !("baseRevisionContent" in message)));
    const messages = hydrateAssistantMessageHistory(history);
    assert.deepEqual(messages, assistant.listMessages(article.id));
    assert.ok(messages.filter((message) => message.role === "author" && message.requestId !== "failed").every((message) => message.selectionText === "selected"));
    const expected = messages.flatMap((message) => {
        if (!message.content || (message.role !== "author" && !(message.role === "assistant" && message.kind === "response")))
            return [];

        return [{ role: message.role, content: message.content }];
    });
    assert.deepEqual(assistant.listConversationHistory(article.id), expected);
    assert.deepEqual(assistant.listConversationHistory(article.id, 12), expected.slice(-12));
    assert.deepEqual(assistant.listConversationHistory(article.id, 1), expected.slice(-1));
    assert.deepEqual(assistant.listConversationHistory("missing", 12), []);
    assert.throws(() => assistant.listConversationHistory(article.id, -1));
}));
