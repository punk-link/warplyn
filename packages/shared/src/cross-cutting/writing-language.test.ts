import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeArticleLanguage, normalizeWritingLanguage } from "./writing-language.js";

test("Article languages preserve custom targets while typography requires language codes", () => {
    assert.equal(normalizeArticleLanguage(" Spanish "), "es");
    assert.equal(normalizeArticleLanguage(" Japanese "), "Japanese");
    assert.equal(normalizeArticleLanguage("Spanish, Argentina"), "Spanish, Argentina");
    assert.equal(normalizeWritingLanguage("Spanish, Argentina"), undefined);
    assert.equal(normalizeArticleLanguage("\nJapanese"), undefined);
    assert.equal(normalizeArticleLanguage("x".repeat(101)), undefined);
    assert.equal(normalizeArticleLanguage("   "), undefined);
});
