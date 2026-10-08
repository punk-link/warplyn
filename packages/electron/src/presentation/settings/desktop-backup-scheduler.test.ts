import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { backup } from "node:sqlite";
import test from "node:test";
import { openDatabase, validateDatabaseSnapshot } from "@skladno/server/electron";
import type { BackupPolicy } from "@skladno/shared";
import { writeRuntimeSettings } from "../../infrastructure/runtime/runtime-settings.js";
import { validateAuthorSkillBackup } from "../../infrastructure/recovery/author-skill-backup.js";
import { waitForBackups } from "../../infrastructure/recovery/backup-lifecycle.js";
import { createDesktopBackupScheduler } from "./desktop-backup-scheduler.js";


// Product scenario: settings.backup-policy-human-reviewed
test("native automatic backups run at startup and every 24 hours, retain only automatic bundles, and retry after failure", async (t) => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-backup-schedule-"));
    const dataDirectory = join(root, "data");
    const backupDirectory = join(root, "backups");
    const runtimePath = join(root, "runtime-settings.json");
    mkdirSync(join(dataDirectory, "skills", "fixture"), { recursive: true });
    writeFileSync(join(dataDirectory, "skills", "fixture", "SKILL.md"), "Synthetic Skill");
    mkdirSync(backupDirectory);
    writeFileSync(join(backupDirectory, "warplyn-backup-manual.sqlite"), "manual");
    writeFileSync(join(backupDirectory, "skladno-backup-legacy.sqlite"), "legacy");
    writeRuntimeSettings(runtimePath, { backupDirectory });
    const database = openDatabase(join(dataDirectory, "database.sqlite"));
    let policy: BackupPolicy = { schedule: "daily", retention: { mode: "count", count: 1 } };
    let captures = 0;
    let failures = 0;
    let fail = false;
    t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: Date.UTC(2026, 9, 7) });
    const scheduler = createDesktopBackupScheduler({
        runtimePath, dataDirectory,
        readPolicy: async () => policy,
        createSnapshot: async (path) => {
            captures++;
            if (fail)
                throw new Error("Synthetic failure");

            // Backup duration must not shift the next interval's start.
            t.mock.timers.tick(60_000);
            await backup(database, path);
        },
        notifyFailure: () => failures++,
    });


    async function advance(milliseconds: number) {
        t.mock.timers.tick(milliseconds);
        await waitForBackups();
        await new Promise<void>((resolve) => setImmediate(resolve));
    }


    try {
        scheduler.start();
        scheduler.start();
        await advance(4_999);
        assert.equal(captures, 0);
        await advance(1);
        assert.equal(captures, 1);
        await advance(86_400_000 - 60_000 - 1);
        assert.equal(captures, 1);
        await advance(1);
        assert.equal(captures, 2);
        const snapshots = readdirSync(backupDirectory).filter((name) => name.startsWith("warplyn-automatic-") && name.endsWith(".sqlite"));
        assert.equal(snapshots.length, 1);
        validateDatabaseSnapshot(join(backupDirectory, snapshots[0]!));
        validateAuthorSkillBackup(join(backupDirectory, snapshots[0]!));
        assert.equal(readdirSync(backupDirectory).filter((name) => name.endsWith(".skills")).length, 1);
        assert.ok(readdirSync(backupDirectory).includes("warplyn-backup-manual.sqlite"));
        assert.ok(readdirSync(backupDirectory).includes("skladno-backup-legacy.sqlite"));
        policy = { ...policy, schedule: "off" };
        await advance(86_400_000 - 60_000);
        assert.equal(captures, 2);
        policy = { ...policy, schedule: "daily" };
        fail = true;
        await advance(86_400_000);
        assert.equal(failures, 1);
        assert.equal(captures, 3);
        fail = false;
        const newDirectory = join(root, "new-backups");
        writeRuntimeSettings(runtimePath, { backupDirectory: newDirectory });
        await advance(86_400_000);
        assert.equal(captures, 4);
        assert.equal(readdirSync(newDirectory).filter((name) => name.endsWith(".sqlite")).length, 1);
        scheduler.dispose();
        await advance(86_400_000);
        assert.equal(captures, 4);
        const restarted = createDesktopBackupScheduler({ runtimePath, dataDirectory, readPolicy: async () => policy, createSnapshot: (path) => backup(database, path), notifyFailure: () => failures++ });
        restarted.start();
        await advance(5_000);
        restarted.dispose();
        assert.equal(readdirSync(newDirectory).filter((name) => name.endsWith(".sqlite")).length, 1);
        assert.equal(failures, 1);
    } finally {
        scheduler.dispose();
        await waitForBackups();
        database.close();
        rmSync(root, { recursive: true, force: true });
    }
});
