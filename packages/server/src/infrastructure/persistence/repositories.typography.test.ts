import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { openDatabase } from "./database.js";
import { StyleCorpusRepository } from "./repositories/style-corpus-repository.js";
import { withRepository } from "./repositories.test-utils.js";
import { decodeStyleProfile } from "./repositories/style-profile-decoder.js";

// Product scenarios: history-and-publishing.typography-snapshots

test("saving typography atomically rebuilds immutable rules-only profiles", () => withRepository((repositories, _close, database) => {
    const rules = [{ id: "ellipsis", definition: { kind: "ellipsis", form: "…" } }] as const;
    const first = repositories.styleCorpus.setTypographyRules([...rules]);
    assert.equal(first.status, "ready");
    assert.deepEqual(first.profile?.traits, []);
    assert.equal(first.profile?.version, 1);
    assert.deepEqual(first.profile?.rules.typography, rules);
    assert.equal(repositories.styleCorpus.setTypographyRules([...rules]).profile?.version, 1);
    const changed = repositories.styleCorpus.setTypographyRules([{ id: "ellipsis", definition: { kind: "ellipsis", form: "..." } }]);
    assert.equal(changed.profile?.version, 2);
    const saved = database.prepare("SELECT profile_json FROM style_profile_versions WHERE version = 1").get();
    assert.equal(decodeStyleProfile(String(saved?.profile_json)).rules.typography[0]?.definition.kind, "ellipsis");
    database.exec("CREATE TRIGGER reject_profile BEFORE INSERT ON style_profile_versions BEGIN SELECT RAISE(ABORT, 'test rollback'); END;");
    assert.throws(() => repositories.styleCorpus.setTypographyRules([]));
    assert.deepEqual(repositories.styleCorpus.getStyleCorpus(), changed);
    database.exec("DROP TRIGGER reject_profile;");
    const cleared = repositories.styleCorpus.setTypographyRules([]);
    assert.equal(cleared.profile?.version, 3);
    assert.equal(cleared.status, "empty");
}));

test("profile changes retain captured samples and reject invalid configuration", () => withRepository((repositories) => {
    repositories.styleCorpus.setStyleCorpusRules("Keep my voice.");
    assert.equal(repositories.styleCorpus.rebuildStyleProfile().status, "ready");
    repositories.styleCorpus.addStyleCorpusItem({ name: "Sample", content: "I write clearly." });
    const saved = repositories.styleCorpus.setTypographyRules([{ id: "spacing", definition: { kind: "horizontal-space" } }]);
    assert.equal(saved.profile?.corpusItemCount, 1);
    assert.equal(saved.profile?.rules.manual, "Keep my voice.");
    assert.throws(() => repositories.styleCorpus.setTypographyRules([{ id: "blank", definition: { kind: "contextual", instruction: " " } }]), { code: "typography_rules_invalid" });
    assert.deepEqual(repositories.styleCorpus.getStyleCorpus(), saved);
}));

test("legacy profile rules decode without rewriting the stored snapshot", () => {
    const json = JSON.stringify({ version: 1, corpusItemCount: 0, characterCount: 0, confidence: "low", traits: [], phrasesToAvoid: [], contributorIds: [], updatedAt: "2026-10-13T00:00:00Z", rules: "Legacy guidance" });
    assert.deepEqual(decodeStyleProfile(json).rules, { manual: "Legacy guidance", typography: [] });
    assert.equal(JSON.parse(json).rules, "Legacy guidance");
    assert.throws(() => decodeStyleProfile(JSON.stringify({ rules: { manual: "", typography: [{ id: "bad" }] } })), { code: "typography_rules_invalid" });
});


test("typography rules and profile snapshots survive database reopening", () => {
    const directory = mkdtempSync(join(tmpdir(), "warplyn-typography-"));
    const filename = join(directory, "fixture.sqlite");
    let database = openDatabase(filename);
    try {
        const saved = new StyleCorpusRepository(database).setTypographyRules([{ id: "spacing", definition: { kind: "horizontal-space" } }]);
        database.close();
        database = openDatabase(filename);
        assert.deepEqual(new StyleCorpusRepository(database).getStyleCorpus(), saved);
    } finally {
        database.close();
        rmSync(directory, { recursive: true, force: true });
    }
});
