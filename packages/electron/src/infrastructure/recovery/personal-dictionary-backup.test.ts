import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { backup } from "node:sqlite";
import test from "node:test";
import { openDatabase } from "@skladno/server/electron";
import { createNativeBackup } from "../../presentation/settings/desktop-native-backup.js";
import { createNativeBackupRestoration } from "../../presentation/settings/desktop-settings-recovery.js";
import { readRuntimeSettings, writeRuntimeSettings } from "../runtime/runtime-settings.js";
import { getAuthorSkillBackupPath, validateAuthorSkillBackup } from "./author-skill-backup.js";
import { applyPendingRestore } from "./pending-restore.js";
import { readPersonalDictionaryFile, restorePersonalDictionary } from "./personal-dictionary-backup.js";


function dictionary(initial: string[]) {
    const words = new Set(initial);
    return {
        words,
        listWordsInSpellCheckerDictionary: async () => [...words],
        addWordToSpellCheckerDictionary: (word: string) => {
            words.add(word);
            return true;
        },
        removeWordFromSpellCheckerDictionary: (word: string) => words.delete(word),
    };
}


// Product scenarios: settings.personal-dictionary-backup
test("native backup and staged restore preserve personal words, existing vocabulary, and legacy compatibility", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-personal-backup-"));
    try {
        for (const personalWords of [["Node.js", "café", "Word", "word", "Node.js"], [], undefined]) {
            const dataDirectory = join(root, `data-${personalWords?.length ?? "legacy"}`);
            mkdirSync(dataDirectory);
            const databasePath = join(dataDirectory, "skladno.sqlite");
            const database = openDatabase(databasePath);
            const runtimePath = join(dataDirectory, "runtime-settings.json");
            const native = dictionary(["local", "Node.js"]);
            try {
                const selected = await createNativeBackup((path) => backup(database, path), dataDirectory, root, undefined, "manual",
                    personalWords ? async () => personalWords : undefined);
                validateAuthorSkillBackup(selected.path);
                const sourceBytes = readFileSync(selected.path);
                const restoration = createNativeBackupRestoration({
                    runtimePath, dataDirectory, backupDirectory: root,
                    createSnapshot: (path) => backup(database, path),
                    readPersonalWords: native.listWordsInSpellCheckerDictionary,
                    chooseBackupSnapshot: async () => selected.path,
                    requestCheckpoint: async () => true,
                    closeApplication: () => database.close(), restart: () => undefined,
                });
                assert.equal((await restoration.select()).kind, "selected");
                await restoration.execute(selected.path);
                const recoveryPath = readRuntimeSettings(runtimePath).pendingRestore?.recoverySnapshotPath;
                assert.ok(recoveryPath);
                assert.deepEqual(readPersonalDictionaryFile(join(getAuthorSkillBackupPath(recoveryPath), "personal-dictionary.json")), ["Node.js", "local"]);
                const restore = applyPendingRestore({ runtimePath, databasePath, personalDictionary: native });
                assert.ok(restore);
                await restore.complete();
                assert.deepEqual([...native.words].sort(), [...new Set(["local", "Node.js", ...personalWords ?? []])].sort());
                assert.equal(readRuntimeSettings(runtimePath).pendingRestore, undefined);
                assert.deepEqual(readFileSync(selected.path), sourceBytes);
            } finally {
                if (database.isOpen)
                    database.close();
            }
        }
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});


test("native word failures and interrupted dictionary restore roll back only new words", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-personal-rollback-"));
    const databasePath = join(root, "skladno.sqlite");
    const database = openDatabase(databasePath);
    try {
        const selected = await createNativeBackup((path) => backup(database, path), root, join(root, "backups"), undefined, "manual", async () => ["existing", "added", "failed"]);
        const recovery = await createNativeBackup((path) => backup(database, path), root, join(root, "backups"));
        database.close();
        const runtimePath = join(root, "runtime-settings.json");
        writeRuntimeSettings(runtimePath, { pendingRestore: { stagedSnapshotPath: selected.path, recoverySnapshotPath: recovery.path, phase: "ready" } });
        const native = dictionary(["existing"]);
        native.addWordToSpellCheckerDictionary = (word) => {
            if (word === "failed")
                return false;

            native.words.add(word);
            return true;
        };
        const restore = applyPendingRestore({ runtimePath, databasePath, personalDictionary: native });
        assert.ok(restore);
        await assert.rejects(restore.complete(), /personal_dictionary_restore_failed/);
        assert.ok(native.words.has("added"));
        assert.ok(readRuntimeSettings(runtimePath).pendingRestore);
        // Simulate another startup after the native mutation was interrupted.
        const resumed = applyPendingRestore({ runtimePath, databasePath, personalDictionary: native });
        assert.ok(resumed);
        await resumed.rollback();
        assert.deepEqual([...native.words], ["existing"]);
        assert.equal(existsSync(`${selected.path}.personal-restore.json`), false);
        assert.equal(readRuntimeSettings(runtimePath).pendingRestore, undefined);
    } finally {
        if (database.isOpen)
            database.close();

        rmSync(root, { recursive: true, force: true });
    }
});


test("dictionary integrity and shape are validated before native mutation", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-personal-invalid-"));
    const database = openDatabase(join(root, "skladno.sqlite"));
    try {
        const selected = await createNativeBackup((path) => backup(database, path), root, join(root, "backups"), undefined, "manual", async () => ["valid"]);
        const bundle = getAuthorSkillBackupPath(selected.path);
        const personalPath = join(bundle, "personal-dictionary.json");
        writeFileSync(personalPath, JSON.stringify(["tampered"]));
        assert.throws(() => validateAuthorSkillBackup(selected.path), /invalid_manifest/);
        rmSync(personalPath);
        assert.throws(() => validateAuthorSkillBackup(selected.path), /invalid_manifest/);
        writeFileSync(personalPath, JSON.stringify(["invalid\nword"]));
        const native = dictionary(["existing"]);
        await assert.rejects(restorePersonalDictionary(bundle, join(root, "journal.json"), native), /backup_invalid/);
        assert.deepEqual([...native.words], ["existing"]);
        await assert.rejects(createNativeBackup((path) => backup(database, path), root, join(root, "failed"), undefined, "manual", async () => {
            throw new Error("native read failed");
        }), /native read failed/);
    } finally {
        database.close();
        rmSync(root, { recursive: true, force: true });
    }
});
