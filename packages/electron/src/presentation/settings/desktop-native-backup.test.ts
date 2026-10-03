import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { backup, DatabaseSync } from "node:sqlite";
import test from "node:test";
import { openDatabase, validateDatabaseSnapshot } from "@skladno/server/electron";
import { validateAuthorSkillBackup } from "../../infrastructure/recovery/author-skill-backup.js";
import { waitForBackups } from "../../infrastructure/recovery/backup-lifecycle.js";
import { createNativeBackup } from "./desktop-native-backup.js";


test("a large native backup yields to the event loop and remains restorable", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-async-backup-"));
    const data = join(root, "data");
    const destination = join(root, "backups");
    mkdirSync(data);
    const database = openDatabase(join(data, "database.sqlite"));
    database.exec("CREATE TABLE backup_fixture (body BLOB); INSERT INTO backup_fixture VALUES (zeroblob(16777216));");
    mkdirSync(join(data, "skills", "fixture"), { recursive: true });
    writeFileSync(join(data, "skills", "fixture", "SKILL.md"), "fixture\n".repeat(100_000));
    let ticks = 0;
    const heartbeat = setInterval(() => {
        ticks++;
        assert.equal(database.prepare("SELECT COUNT(*) AS count FROM backup_fixture").get()?.count, 1);
    }, 1);
    try {
        const snapshot = await createNativeBackup((path) => backup(database, path), data, destination);
        clearInterval(heartbeat);
        assert.ok(ticks > 0, "Main-thread callbacks must run during backup creation");
        validateDatabaseSnapshot(snapshot.path);
        validateAuthorSkillBackup(snapshot.path);
        const restored = new DatabaseSync(snapshot.path, { readOnly: true });
        try {
            assert.equal(restored.prepare("SELECT length(body) AS size FROM backup_fixture").get()?.size, 16_777_216);
        } finally {
            restored.close();
        }
    } finally {
        clearInterval(heartbeat);
        database.close();
        rmSync(root, { recursive: true, force: true });
    }
});


test("teardown waits for a failed backup to clean up its partial snapshot", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-async-backup-failure-"));
    const destination = join(root, "backups");
    let rejectSnapshot: ((error: Error) => void) | undefined;
    let snapshotStarted: (() => void) | undefined;
    const started = new Promise<void>((resolve) => {
        snapshotStarted = resolve;
    });
    const pending = createNativeBackup((path) => {
        writeFileSync(path, "partial");
        snapshotStarted?.();
        return new Promise<void>((_resolve, reject) => {
            rejectSnapshot = reject;
        });
    }, root, destination);
    const rejected = assert.rejects(pending, /fixture failure/);
    try {
        await started;
        let drained = false;
        const teardown = waitForBackups().then(() => {
            drained = true;
        });
        await Promise.resolve();
        assert.equal(drained, false);
        rejectSnapshot?.(new Error("fixture failure"));
        await rejected;
        await teardown;
        assert.equal(drained, true);
        assert.deepEqual(readdirSync(destination), []);
    } finally {
        rejectSnapshot?.(new Error("fixture failure"));
        await waitForBackups();
        rmSync(root, { recursive: true, force: true });
    }
});
