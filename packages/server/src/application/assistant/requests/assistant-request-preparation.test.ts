import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { APPLICATION_ERROR, HTTP_STATUS, type AssistantRequestScope } from "@skladno/shared";
import { openDatabase } from "../../../infrastructure/persistence/database.js";
import { createTestPersistence } from "../../../test-support/test-persistence.js";
import type { EditorialEngine } from "../../editorial/engine/editorial-engine.js";
import { ApplicationServiceError } from "../../errors/application-service-error.js";
import { AssistantSkillCatalog } from "../skills/assistant-skill-catalog.js";
import type { AssistantSkillPackage } from "../skills/assistant-skill-package.js";
import { AssistantRequestPreparation } from "./assistant-request-preparation.js";
import { assistantPreparationError } from "./assistant-preparation-error.js";
import type { AssistantServiceRequest } from "./assistant-service-request.js";


function fixture(context: TestContext) {
    const database = openDatabase(":memory:");
    context.after(() => database.close());
    const stores = createTestPersistence(database);
    const article = stores.articleService.createArticle({ title: "Draft", content: "A😀 sentence." });
    const scope: AssistantRequestScope = { kind: "article", baseRevisionId: article.currentRevisionId };
    const request: AssistantServiceRequest = { kind: "new", articleId: article.id, requestId: "request", authorMessage: "Edit", scope };
    const skill: AssistantSkillPackage = { reference: { source: "test", id: "skill", version: "1" },
        name: "Test", description: "Test", instructions: "Edit", execution: { capability: "translate" }, scopes: ["article"] };
    const skills = new AssistantSkillCatalog([{ id: "test", summaries: () => [skill], load: () => skill }]);
    let resolutions = 0;
    const engine: EditorialEngine = {
        async *stream() {
            assert.fail("preparation must not generate");
        },
        async *streamConversation() {
            assert.fail("preparation must not generate");
        },
    };
    const resolve = () => {
        resolutions++;
        return engine;
    };
    const engines = { resolve, resolveAssistant: resolve };
    const dependencies = { articles: stores.articles, assistant: stores.assistant, styleCorpus: stores.styleCorpus, engines, skills };
    const preparation = new AssistantRequestPreparation(dependencies);
    return { database, stores, article, request, skill, dependencies, preparation, resolutions: () => resolutions };
}


test("preparation succeeds for whole Article and valid UTF-16 selection without persistence or generation", (context) => {
    const fixtureState = fixture(context);
    const { preparation, request, stores, article } = fixtureState;
    const before = stores.articles.getArticle(article.id);
    const scopes: AssistantRequestScope[] = [request.scope,
        { kind: "selection", baseRevisionId: article.currentRevisionId, startOffset: 1, endOffset: 3 }];
    for (const scope of scopes) {
        const result = preparation.prepare({ ...request, scope });
        assert.ok(result.ok);
        assert.equal(result.value.article.content, article.currentRevision.content);
        assert.deepEqual(result.value.scope, scope);
    }

    assert.equal(stores.assistant.getRequest(request.requestId), undefined);
    assert.deepEqual(stores.articles.getArticle(article.id), before);
    assert.deepEqual(stores.editorialArtifacts.listEditorialArtifacts(article.id), []);
});


test("prerequisite failures stop before engine resolution and preserve failure precedence", (context) => {
    const { preparation, request, resolutions, stores, article } = fixture(context);
    const cases: { request: AssistantServiceRequest; code: string }[] = [
        { request: { ...request, articleId: "missing", explicitSkillId: "missing" }, code: APPLICATION_ERROR.ARTICLE_NOT_FOUND },
        { request: { kind: "retry", articleId: article.id, requestId: "retry", retryOfRequestId: "missing" },
            code: APPLICATION_ERROR.ASSISTANT_RETRY_INVALID },
        { request: { ...request, scope: { kind: "article", baseRevisionId: "stale" }, explicitSkillId: "missing" },
            code: APPLICATION_ERROR.REVISION_CONFLICT },
        { request: { ...request, explicitSkillId: "missing" }, code: APPLICATION_ERROR.ASSISTANT_SKILL_UNSUPPORTED },
        { request: { ...request, scope: { kind: "selection", baseRevisionId: article.currentRevisionId, startOffset: 2, endOffset: 4 } },
            code: APPLICATION_ERROR.ASSISTANT_SELECTION_INVALID },
        { request: { ...request, explicitSkillId: "skill",
            scope: { kind: "selection", baseRevisionId: article.currentRevisionId, startOffset: 0, endOffset: 1 } },
        code: APPLICATION_ERROR.ASSISTANT_SKILL_SCOPE_INCOMPATIBLE },
    ];
    for (const entry of cases)
        assert.deepEqual(preparation.prepare(entry.request), { ok: false, code: entry.code });

    assert.equal(resolutions(), 0);
    assert.equal(stores.assistant.getRequest(request.requestId), undefined);
    assert.equal(stores.articles.listRevisions(article.id).length, 1);
});


test("routing returns missing configuration, target language, and style corpus failures", (context) => {
    const { preparation, dependencies, request, skill } = fixture(context);
    const missing = new AssistantRequestPreparation({ ...dependencies, engines: { resolve: () => undefined } });
    assert.deepEqual(missing.prepare(request), { ok: false, code: APPLICATION_ERROR.EDITORIAL_CONFIGURATION_MISSING });
    assert.deepEqual(missing.prepare({ ...request, explicitSkillId: "skill" }),
        { ok: false, code: APPLICATION_ERROR.EDITORIAL_CONFIGURATION_MISSING });
    assert.deepEqual(preparation.prepare({ ...request, explicitSkillId: "skill" }),
        { ok: false, code: APPLICATION_ERROR.TARGET_LANGUAGE_REQUIRED });
    skill.execution = { capability: "style_review" };
    assert.deepEqual(preparation.prepare({ ...request, explicitSkillId: "skill" }),
        { ok: false, code: APPLICATION_ERROR.STYLE_CORPUS_REQUIRED });
});


test("retry reconstructs original scope and content only for failed or cancelled requests", (context) => {
    const { preparation, request, stores, article } = fixture(context);
    stores.assistant.createRequest({ id: request.requestId, articleId: article.id, authorMessage: "Original", scope: request.scope });
    const retry: AssistantServiceRequest = { kind: "retry", articleId: article.id, requestId: "retry", retryOfRequestId: request.requestId };
    assert.deepEqual(preparation.prepare(retry), { ok: false, code: APPLICATION_ERROR.ASSISTANT_RETRY_INVALID });
    for (const status of ["failed", "cancelled"] as const) {
        stores.assistant.failRequest(request.requestId, status, "test");
        const result = preparation.prepare(retry);
        assert.ok(result.ok);
        assert.equal(result.value.authorMessage, "Original");
        assert.deepEqual(result.value.scope, request.scope);
        assert.equal(stores.assistant.getRequest("retry"), undefined);
    }
});


test("unexpected store and resolver errors propagate unchanged even with an expected domain code", (context) => {
    const { dependencies, request } = fixture(context);
    const error = new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST);
    const resolver = new AssistantRequestPreparation({ ...dependencies, engines: { resolve: () => undefined,
        resolveAssistant: () => {
            throw error;
        } } });
    assert.throws(() => resolver.prepare(request), (actual) => actual === error);
    dependencies.articles.getArticle = () => {
        throw error;
    };
    assert.throws(() => new AssistantRequestPreparation(dependencies).prepare(request), (actual) => actual === error);
});


test("preparation failures preserve safe parameters and public status mapping", () => {
    for (const [code, status] of [
        [APPLICATION_ERROR.ARTICLE_NOT_FOUND, HTTP_STATUS.NOT_FOUND],
        [APPLICATION_ERROR.REVISION_CONFLICT, HTTP_STATUS.CONFLICT],
        [APPLICATION_ERROR.TARGET_LANGUAGE_REQUIRED, HTTP_STATUS.BAD_REQUEST],
    ] as const) {
        const error = assistantPreparationError({ ok: false, code, parameters: { count: 1 } });
        assert.equal(error.code, code);
        assert.equal(error.status, status);
        assert.deepEqual(error.parameters, { count: 1 });
    }
});


test("invalid captured typography becomes a failure while typography store faults remain exceptional", (context) => {
    const { preparation, dependencies, request, article, stores } = fixture(context);
    stores.articles.updateArticle(article.id, { language: "en" });
    const corpus = stores.styleCorpus.getStyleCorpus();
    dependencies.styleCorpus.getStyleCorpus = () => ({ ...corpus, status: "ready", profile: {
        version: 1, confidence: "low", characterCount: 0, corpusItemCount: 0, contributorIds: [], traits: [], phrasesToAvoid: [],
        updatedAt: "2026-10-28T00:00:00Z", rules: { manual: "", typography: [], typographyConfiguration: { version: 1, languages: { en: {
            disabled: [], rules: [{ id: "", definition: { kind: "horizontal-space" } }],
        } } } },
    } });
    assert.deepEqual(preparation.prepare(request), { ok: false, code: APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID });
    const error = new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_INVALID, HTTP_STATUS.BAD_REQUEST);
    dependencies.styleCorpus.getArticleTypography = () => {
        throw error;
    };
    assert.throws(() => preparation.prepare(request), (actual) => actual === error);
});
