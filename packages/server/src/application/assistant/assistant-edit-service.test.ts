import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { APPLICATION_ERROR, type RestoreAssistantCheckpointResult } from "@skladno/shared";
import { openDatabase } from "../../infrastructure/persistence/database.js";
import { createTestPersistence } from "../../test-support/test-persistence.js";
import { ApplicationServiceError } from "../errors/application-service-error.js";
import { AssistantCheckpointError, AssistantEditError } from "./assistant-store.js";
import { AssistantEditService } from "./assistant-edit-service.js";


function fixture(context: TestContext) {
    const database = openDatabase(":memory:");
    context.after(() => database.close());
    const stores = createTestPersistence(database);
    const article = stores.articleService.createArticle({ title: "Article", content: "Original" });
    const calls = { describe: 0, apply: 0, promote: 0 };
    const articles = {
        getArticle: () => stores.articles.getArticle(article.id),
        describeContentChange: async () => {
            calls.describe++;
            return "Description";
        },
        completeRevisionPromotion: async (revision: typeof article.currentRevision) => {
            calls.promote++;
            return revision;
        },
    };
    const service = new AssistantEditService(stores.assistant, stores.settings, articles);
    return { stores, article, calls, articles, service };
}


test("edit preview failures stop description, persistence, and promotion", async (context) => {
    const { stores, article, calls, service } = fixture(context);
    stores.assistant.previewEdit = () => {
        throw new AssistantEditError("invalid");
    };
    stores.assistant.applyEdit = () => {
        calls.apply++;
        return article.currentRevision;
    };
    await assert.rejects(service.applyEdit(article.id, "missing"), (error: unknown) =>
        error instanceof ApplicationServiceError && error.code === APPLICATION_ERROR.ASSISTANT_EDIT_INVALID && error.status === 400);
    assert.deepEqual(calls, { describe: 0, apply: 0, promote: 0 });
    assert.equal(stores.articles.getArticle(article.id)?.currentRevision.content, "Original");
});


test("edit commit conflicts stop promotion after description and retain public status", async (context) => {
    const { stores, article, calls, service } = fixture(context);
    stores.assistant.previewEdit = () => ({ previousContent: "Original", content: "Changed" });
    stores.assistant.applyEdit = () => {
        calls.apply++;
        throw new AssistantEditError("conflict");
    };
    await assert.rejects(service.applyEdit(article.id, "edit"), (error: unknown) =>
        error instanceof ApplicationServiceError && error.code === APPLICATION_ERROR.ASSISTANT_EDIT_CONFLICT && error.status === 409);
    assert.deepEqual(calls, { describe: 1, apply: 1, promote: 0 });
    assert.equal(stores.articles.getArticle(article.id)?.currentRevision.content, "Original");
});


test("checkpoint conflicts stop promotion and unexpected store faults retain identity", async (context) => {
    const { stores, article, calls, service } = fixture(context);
    stores.assistant.restoreCheckpoint = () => {
        throw new AssistantCheckpointError("conflict");
    };
    await assert.rejects(service.restoreCheckpoint(article.id, "checkpoint", "tail"), (error: unknown) =>
        error instanceof ApplicationServiceError && error.code === APPLICATION_ERROR.ASSISTANT_CHECKPOINT_CONFLICT && error.status === 409);
    assert.equal(calls.promote, 0);
    const unexpected = new Error("store fault");
    stores.assistant.restoreCheckpoint = () => {
        throw unexpected;
    };
    await assert.rejects(service.restoreCheckpoint(article.id, "checkpoint", "tail"), (actual) => actual === unexpected);
    stores.assistant.previewEdit = () => {
        throw unexpected;
    };
    await assert.rejects(service.applyEdit(article.id, "edit"), (actual) => actual === unexpected);
});


test("restored checkpoint refreshes its promoted Article while unchanged revisions skip promotion", async (context) => {
    const { stores, article, calls, service } = fixture(context);
    const result: RestoreAssistantCheckpointResult = {
        messages: [], article, composer: { text: "Continue", usedSelection: false },
    };
    stores.assistant.restoreCheckpoint = () => result;
    assert.equal(await service.restoreCheckpoint(article.id, "checkpoint", "tail"), result);
    assert.equal(calls.promote, 0);
    stores.assistant.restoreCheckpoint = () => {
        const revision = stores.articles.saveRevision(article.id, { baseRevisionId: article.currentRevisionId, content: "Restored" });
        return { ...result, article: { ...article, currentRevisionId: revision.id, currentRevision: revision } };
    };
    const restored = await service.restoreCheckpoint(article.id, "checkpoint", "tail");
    assert.equal(calls.promote, 1);
    assert.equal(restored.article.currentRevision.content, "Restored");
    assert.deepEqual(restored.composer, result.composer);
});
