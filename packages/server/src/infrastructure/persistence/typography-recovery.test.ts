import assert from "node:assert/strict";
import { copyFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { openDatabase, validateDatabaseSnapshot } from "./database.js";
import { migrations } from "./migrations.js";
import { StyleCorpusRepository } from "./repositories/style-corpus-repository.js";
import { SqliteBackupSnapshotCreator } from "./sqlite-backup-snapshot-creator.js";
import type { TypographyRule } from "@skladno/shared";

test("a version-24 database migrates on its restore copy and preserves its legacy rules", async () => {
    const directory = mkdtempSync(join(tmpdir(), "warplyn-typography-upgrade-"));
    const source = join(directory, "legacy.sqlite");
    const destination = join(directory, "restored.sqlite");
    const legacy = new DatabaseSync(source);
    const rules: TypographyRule[] = [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }];
    legacy.exec("CREATE TABLE schema_migrations (version INTEGER PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL)");
    for (const migration of migrations.filter((entry) => entry.version <= 24)) {
        legacy.exec(migration.sql);
        legacy.prepare("INSERT INTO schema_migrations VALUES (?, ?, ?)").run(migration.version, migration.name, "2026-10-13");
    }

    legacy.prepare("UPDATE style_corpus_settings SET typography_json = ? WHERE id = 1").run(JSON.stringify(rules));
    legacy.close();
    try {
        validateDatabaseSnapshot(source);
        copyFileSync(source, destination);
        const database = openDatabase(destination);
        try {
            const store = new StyleCorpusRepository(database);
            assert.deepEqual(store.getStyleCorpus().typographyRules, rules);
            assert.deepEqual(store.getStyleCorpus().typographyConfiguration?.languages, {});
            store.setTypographyConfiguration({ language: "fr", preferences: { rules, disabled: [] } });
            const snapshot = await new SqliteBackupSnapshotCreator(database).createTemporary();
            const restored = openDatabase(snapshot.path);
            try {
                assert.deepEqual(new StyleCorpusRepository(restored).getStyleCorpus(), store.getStyleCorpus());
            } finally {
                restored.close();
                await snapshot.cleanup();
            }
        } finally {
            database.close();
        }

        const original = new DatabaseSync(source, { readOnly: true });
        assert.equal(original.prepare("SELECT MAX(version) AS version FROM schema_migrations").get()?.version, 24);
        assert.equal(original.prepare("SELECT typography_json FROM style_corpus_settings").get()?.typography_json, JSON.stringify(rules));
        original.close();
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
});
