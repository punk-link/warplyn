import assert from "node:assert/strict";
import test from "node:test";
import { resolveTypography, type TypographyConfigurationUpdate, type TypographyRule } from "@skladno/shared";
import { withRepository } from "./repositories.test-utils.js";

// Product scenarios: history-and-publishing.typography-snapshots

const dots: TypographyRule[] = [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }];
const input: TypographyConfigurationUpdate = { language: "en", preferences: { rules: dots, disabled: [] } };

test("language settings preserve legacy rules and immutable snapshots, with atomic rollback", () => withRepository((repositories, _close, db) => {
    const corpus = repositories.styleCorpus;
    corpus.setTypographyRules(dots);
    const original = db.prepare("SELECT profile_json FROM style_profile_versions WHERE version = 1").get()?.profile_json;
    const saved = corpus.setTypographyConfiguration(input);
    assert.equal(saved.profile?.version, 2);
    assert.deepEqual(saved.typographyRules, dots);
    assert.equal(corpus.setTypographyConfiguration(input).profile?.version, 2);
    corpus.setTypographyConfiguration({ language: "ru", preferences: { rules: [], disabled: [] } });
    assert.deepEqual(corpus.getStyleCorpus().typographyConfiguration?.languages.en?.rules, dots);
    assert.equal(db.prepare("SELECT profile_json FROM style_profile_versions WHERE version = 1").get()?.profile_json, original);
    const before = corpus.getStyleCorpus();
    db.exec("CREATE TRIGGER reject_scoped_profile BEFORE INSERT ON style_profile_versions BEGIN SELECT RAISE(ABORT, 'rollback'); END;");
    assert.throws(() => corpus.setTypographyConfiguration({ ...input, preferences: { rules: [], disabled: [] } }));
    assert.deepEqual(corpus.getStyleCorpus(), before);
}));

test("Article preferences work without samples and keep free-text guidance separate", () => withRepository((repositories) => {
    const corpus = repositories.styleCorpus;
    const article = repositories.articles.createArticle({ title: "Article", content: "Wait...", language: "en" });
    const target = repositories.articles.createArticle({ title: "Translation", content: "Подождите...", language: "ru", sourceArticleId: article.id });
    corpus.setArticleStyleRules(article.id, "Keep my voice.");
    const result = corpus.setTypographyConfiguration({ ...input, articleId: article.id });
    assert.equal(result.status, "ready");
    assert.equal(corpus.getArticleStyleRules(article.id), "Keep my voice.");
    assert.deepEqual(corpus.getArticleTypography(article.id)?.preferences.rules, dots);
    assert.equal(corpus.getArticleTypography(target.id), undefined);
    corpus.setTypographyConfiguration({ ...input, language: "ru" });
    const version = corpus.getStyleCorpus().profile?.version;
    corpus.setTypographyConfiguration({ language: "en", articleId: article.id, preferences: { rules: [], disabled: [] } });
    assert.equal(corpus.getStyleCorpus().profile?.version, version);
    assert.equal(resolveTypography("ru", corpus.getStyleCorpus().typographyConfiguration, corpus.getArticleTypography(article.id)).rules.length, 1);
    assert.throws(() => corpus.setTypographyConfiguration({ ...input, articleId: "missing" }), { code: "article_not_found" });
}));

test("effective Article rules are validated after inheritance", () => withRepository((repositories) => {
    const article = repositories.articles.createArticle({ title: "Article", content: "Wait...", language: "en" });
    repositories.styleCorpus.setTypographyConfiguration(input);
    const conflicting: TypographyRule[] = [{ id: "other", definition: { kind: "ellipsis", form: "..." } }];
    assert.throws(() => repositories.styleCorpus.setTypographyConfiguration({
        language: "en", articleId: article.id, preferences: { rules: conflicting, disabled: [] },
    }), { code: "typography_rules_invalid" });
    assert.equal(repositories.styleCorpus.getArticleTypography(article.id), undefined);
    repositories.styleCorpus.setTypographyConfiguration({
        language: "en", articleId: article.id, preferences: { rules: conflicting, disabled: ["dots"] },
    });
    const before = repositories.styleCorpus.getStyleCorpus();
    assert.throws(() => repositories.styleCorpus.setTypographyConfiguration({ language: "en", preferences: {
        rules: [{ id: "new-dots", definition: { kind: "ellipsis", form: "…" } }], disabled: [],
    } }), { code: "typography_rules_invalid" });
    assert.deepEqual(repositories.styleCorpus.getStyleCorpus(), before);
}));
