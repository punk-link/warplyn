import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { backup } from "node:sqlite";
import test from "node:test";

import { restoreConnectionSettings } from "./backup-connection-settings.js";
import { openDatabase } from "./database.js";
import { SqliteBackupSnapshotCreator } from "./sqlite-backup-snapshot-creator.js";


test("backup bytes exclude secret fields and deleted values while retaining environment names", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-backup-secrets-"));
    const database = openDatabase(join(root, "active.sqlite"));
    const secret = "synthetic-secret-should-never-travel";
    const connection = { id: "environment", provider: "openai", label: "Environment",
        credentialSource: { kind: "environment-variable", environmentVariableName: "BACKUP_FIXTURE_KEY", value: secret },
        apiKey: secret, status: "connected", active: true };
    const managed = { ...connection, id: "managed", credentialSource: { kind: "managed", apiKey: secret } };
    database.prepare("INSERT INTO app_settings VALUES (?, ?, ?)")
        .run("application-ai-connections", JSON.stringify({ connections: [connection, managed], apiKey: secret }), "2026-10-31");
    const previous = process.env.BACKUP_FIXTURE_KEY;
    process.env.BACKUP_FIXTURE_KEY = secret;
    try {
        const legacy = join(root, "legacy.sqlite");
        await backup(database, legacy);
        restoreConnectionSettings(legacy);
        assert.equal(readFileSync(legacy).includes(Buffer.from(secret)), false);
        const snapshot = await new SqliteBackupSnapshotCreator(database).createTemporary();
        try {
            const bytes = readFileSync(snapshot.path);
            assert.equal(bytes.includes(Buffer.from(secret)), false);
            assert.equal(bytes.includes(Buffer.from("BACKUP_FIXTURE_KEY")), true);
            restoreConnectionSettings(snapshot.path);
            const restored = openDatabase(snapshot.path);
            try {
                const row = restored.prepare("SELECT value_json FROM app_settings WHERE key = 'application-ai-connections'").get();
                const value = JSON.parse(String(row?.value_json));
                assert.equal(value.connections.length, 1);
                assert.deepEqual(value.connections[0].credentialSource,
                    { kind: "environment-variable", environmentVariableName: "BACKUP_FIXTURE_KEY" });
                assert.equal(value.connections[0].status, "unchecked");
                assert.equal(readFileSync(snapshot.path).includes(Buffer.from(secret)), false);
            } finally {
                restored.close();
            }
        } finally {
            await snapshot.cleanup();
        }
    } finally {
        if (previous === undefined)
            delete process.env.BACKUP_FIXTURE_KEY;
        else
            process.env.BACKUP_FIXTURE_KEY = previous;

        database.close();
        rmSync(root, { recursive: true, force: true });
    }
});
