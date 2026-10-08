import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { backup } from "node:sqlite";
import { createLocalApplication, loadServerConfig, openDatabase } from "@skladno/server/electron";
import { createNativeBackupRestoration } from "../../presentation/settings/desktop-settings-recovery.js";
import { createAuthorSkillBackup } from "./author-skill-backup.js";
import { applyPendingRestore } from "./pending-restore.js";
import { readRuntimeSettings } from "../runtime/runtime-settings.js";


function hashes(directory: string): Record<string, string> {
    const result: Record<string, string> = {};
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory())
            for (const [name, hash] of Object.entries(hashes(path)))
                result[`${entry.name}/${name}`] = hash;
        else
            result[entry.name] = createHash("sha256").update(readFileSync(path)).digest("hex");
    }

    return result;
}


function populateLegacySnapshot(path: string): void {
    const db = openDatabase(path);
    try {
        db.exec(`
            INSERT INTO articles (id,title,current_revision_id,created_at,updated_at) VALUES ('article','Legacy Article',NULL,'2026-01-01','2026-01-01');
            INSERT INTO article_revisions (id,article_id,content,provenance_json,created_at) VALUES ('revision','article','Immutable Revision','{"kind":"author-draft"}','2026-01-01');
            UPDATE articles SET current_revision_id='revision';
            INSERT INTO article_drafts VALUES ('article','Latest Draft','revision',1,'2026-01-02');
            INSERT INTO assistant_messages (id,article_id,role,kind,status,content,created_at,updated_at) VALUES ('message','article','assistant','text','completed','Legacy conversation','2026-01-01','2026-01-01');
            INSERT INTO app_settings VALUES ('application-ai-connections','{"connections":[{"id":"legacy-connection","provider":"openai","label":"Legacy","credentialSource":{"kind":"managed"},"active":true,"status":"connected"},{"id":"legacy-env","provider":"openai","label":"Environment","credentialSource":{"kind":"environment-variable","environmentVariableName":"LEGACY_MODEL_KEY"},"active":true,"status":"unchecked"}]}','2026-01-01');
            INSERT INTO app_settings VALUES ('publish-limit-profile','{"defaultProfileId":"custom-00000000-0000-0000-0000-000000000001","customProfiles":[{"id":"custom-00000000-0000-0000-0000-000000000001","name":"Legacy publication","characterLimit":1234}]}','2026-01-01');
        `);
    } finally {
        db.close();
    }
}


test("legacy backup pairs and database-only snapshots restore without changing the source or importing runtime state", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-migration-"));
    try {
        for (const withSkills of [true, false]) {
            const source = join(root, `legacy-${withSkills}`);
            const target = join(root, `warplyn-${withSkills}`);
            mkdirSync(source);
            mkdirSync(target);
            const snapshot = join(source, "skladno-backup-2026-01-01.sqlite");
            populateLegacySnapshot(snapshot);
            if (withSkills) {
                mkdirSync(join(source, "skills", "clarity"), { recursive: true });
                mkdirSync(join(source, "skill-history", "clarity"), { recursive: true });
                writeFileSync(join(source, "skills", "clarity", "SKILL.md"), "Legacy Skill");
                writeFileSync(join(source, "skill-history", "clarity", "revision.json"), "Immutable Skill history");
                await createAuthorSkillBackup({ dataDirectory: source, snapshotPath: snapshot });
            }

            writeFileSync(join(source, "runtime-settings.json"), JSON.stringify({ telemetry: { consent: "granted", installationId: "legacy-id" }, updateNetworkAccess: true }));
            writeFileSync(join(source, ".env"), "LEGACY_MODEL_KEY=disposable-not-imported");
            const before = hashes(source);
            const databasePath = join(target, "skladno.sqlite");
            const runtimePath = join(target, "runtime-settings.json");
            const database = openDatabase(databasePath);
            const diskFailure = createNativeBackupRestoration({
                runtimePath, dataDirectory: target, backupDirectory: source,
                createSnapshot: async () => {
                    throw new Error("ENOSPC");
                },
                chooseBackupSnapshot: async () => snapshot,
                requestCheckpoint: async () => true,
                closeApplication: () => assert.fail("Disk failure must leave the destination open"),
                restart: () => assert.fail("Disk failure must not restart"),
            });
            await assert.rejects(diskFailure.execute(snapshot), /ENOSPC/);
            assert.equal(readRuntimeSettings(runtimePath).pendingRestore, undefined);
            assert.deepEqual(hashes(source), before);
            const restoration = createNativeBackupRestoration({
                runtimePath, dataDirectory: target, backupDirectory: source, createSnapshot: (path) => backup(database, path),
                chooseBackupSnapshot: async () => snapshot,
                requestCheckpoint: async () => true,
                closeApplication: () => database.close(), restart: () => undefined,
            });
            assert.deepEqual(await restoration.select(), { kind: "selected", path: snapshot });
            await restoration.execute(snapshot);
            const restore = applyPendingRestore({ runtimePath, databasePath });
            assert.ok(restore);
            const restored = openDatabase(databasePath);
            try {
                assert.equal(restored.prepare("SELECT content FROM article_revisions").get()?.content, "Immutable Revision");
                assert.equal(restored.prepare("SELECT content FROM article_drafts").get()?.content, "Latest Draft");
                assert.equal(restored.prepare("SELECT content FROM assistant_messages").get()?.content, "Legacy conversation");
                assert.deepEqual(restored.prepare("SELECT key FROM app_settings ORDER BY key").all().map((row) => row.key), ["publish-limit-profile"]);
            } finally {
                restored.close();
            }

            await restore.complete();
            const application = createLocalApplication(loadServerConfig({ WARPLYN_DATA_DIR: target }));
            try {
                assert.equal(application.services.publishing.getSettings().customProfiles[0]?.name, "Legacy publication");
                const settings = await application.services.settings.getSnapshot();
                assert.deepEqual(settings.connections, []);
            } finally {
                application.database.close();
            }

            assert.equal(readRuntimeSettings(runtimePath).telemetry, undefined);
            assert.equal(readRuntimeSettings(runtimePath).updateNetworkAccess, undefined);
            assert.equal(readRuntimeSettings(runtimePath).pendingRestore, undefined);
            assert.equal(existsSync(join(target, ".env")), false);
            if (withSkills) {
                assert.equal(readFileSync(join(target, "skills", "clarity", "SKILL.md"), "utf8"), "Legacy Skill");
                assert.equal(readFileSync(join(target, "skill-history", "clarity", "revision.json"), "utf8"), "Immutable Skill history");
            }

            assert.deepEqual(hashes(source), before);
        }
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});
