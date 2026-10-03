import assert from "node:assert/strict";
import { copyFileSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

import { DatabaseSnapshotError, openDatabase, validateDatabaseSnapshot } from "./database.js";
import { SqliteBackupSnapshotCreator } from "./sqlite-backup-snapshot-creator.js";
import { migrations } from "./migrations.js";


// product: settings.backup-policy-human-reviewed
test("an older database-only schema validates and migrates on its destination copy", () => {
    const directory = mkdtempSync(join(tmpdir(), "warplyn-old-schema-"));
    const source = join(directory, "skladno-old.sqlite");
    const destination = join(directory, "warplyn.sqlite");
    const legacy = new DatabaseSync(source);
    legacy.exec("CREATE TABLE schema_migrations (version INTEGER PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL)");
    legacy.exec(migrations[0]!.sql);
    legacy.prepare("INSERT INTO schema_migrations VALUES (?,?,?)").run(1, migrations[0]!.name, "2026-01-01");
    legacy.close();
    try {
        validateDatabaseSnapshot(source);
        copyFileSync(source, destination);
        const restored = openDatabase(destination);
        assert.equal(restored.prepare("SELECT COUNT(*) AS count FROM schema_migrations").get()?.count, migrations.length);
        restored.close();
        const unchanged = new DatabaseSync(source, { readOnly: true });
        assert.equal(unchanged.prepare("SELECT COUNT(*) AS count FROM schema_migrations").get()?.count, 1);
        unchanged.close();
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
});


test("creates a restorable temporary snapshot", async () => {
    const directory = mkdtempSync(join(tmpdir(), "skladno-backup-"));
    const database = openDatabase(join(directory, "skladno.sqlite"));
    database.prepare("INSERT INTO app_settings (key, value_json, updated_at) VALUES (?, ?, ?)").run("test", JSON.stringify({ article: "private" }), "2026-08-18T00:00:00.000Z");

    try {
        const backup = await new SqliteBackupSnapshotCreator(database, () => new Date("2026-08-18T00:00:00.000Z")).createTemporary();
        if (process.platform !== "win32") {
            const databasePath = join(directory, "skladno.sqlite");
            assert.equal(statSync(databasePath).mode & 0o777, 0o600);
            assert.equal(statSync(`${databasePath}-wal`).mode & 0o777, 0o600);
            assert.equal(statSync(`${databasePath}-shm`).mode & 0o777, 0o600);
            assert.equal(statSync(backup.path).mode & 0o777, 0o600);
            assert.equal(statSync(dirname(backup.path)).mode & 0o777, 0o700);
        }

        const restored = openDatabase(backup.path);
        try {
            assert.deepEqual(JSON.parse(String(restored.prepare("SELECT value_json FROM app_settings WHERE key = 'test'").get()?.value_json)), { article: "private" });
        } finally {
            restored.close();
            await backup.cleanup();
        }
    } finally {
        database.close();
        rmSync(directory, { recursive: true, force: true });
    }
});


test("a snapshot restores the active local database", async () => {
    const directory = mkdtempSync(join(tmpdir(), "skladno-backup-"));
    const databasePath = join(directory, "skladno.sqlite");
    const database = openDatabase(databasePath);

    try {
        database.prepare("INSERT INTO app_settings (key, value_json, updated_at) VALUES (?, ?, ?)").run("release-fixture", JSON.stringify({ revision: 1 }), "2026-08-18T00:00:00.000Z");
        const backup = await new SqliteBackupSnapshotCreator(database).createTemporary();
        database.prepare("UPDATE app_settings SET value_json = ? WHERE key = 'release-fixture'").run(JSON.stringify({ revision: 2 }));
        database.close();
        copyFileSync(backup.path, databasePath);

        const restored = openDatabase(databasePath);
        try {
            assert.deepEqual(JSON.parse(String(restored.prepare("SELECT value_json FROM app_settings WHERE key = 'release-fixture'").get()?.value_json)), { revision: 1 });
        } finally {
            restored.close();
            await backup.cleanup();
        }
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
});


test("rejects an incompatible snapshot with an internal error code", () => {
    const directory = mkdtempSync(join(tmpdir(), "skladno-backup-"));
    const snapshotPath = join(directory, "incompatible.sqlite");
    const database = new DatabaseSync(snapshotPath);
    database.exec("CREATE TABLE schema_migrations (version INTEGER PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL)");
    database.close();

    try {
        assert.throws(
            () => validateDatabaseSnapshot(snapshotPath),
            (error: unknown) => error instanceof DatabaseSnapshotError && error.code === "schema",
        );
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
});
