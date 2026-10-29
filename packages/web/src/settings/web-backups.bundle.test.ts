import { createHash } from "node:crypto";
import { describe, expect, it, vi } from "vitest";

import { chooseBackupFolder, listWebBackups, restoreWebBackup, saveScheduledWebBackup, saveWebBackup } from "./web-backups.js";
import { writeBackupBundle } from "./web-backup-bundles.js";
import { WEB_BACKUP_ERROR } from "./web-backup-error.js";


// Product scenarios: settings.backup-policy-human-reviewed, settings.browser-skill-backup-restore


class MemoryFolder {
    readonly name = "backups";


    readonly files = new Map<string, Blob>();


    readonly directories = new Map<string, MemoryFolder>();


    async queryPermission(): Promise<PermissionState> {
        return "granted";
    }


    async requestPermission(): Promise<PermissionState> {
        return "granted";
    }


    async getFileHandle(name: string, options?: { create?: boolean }) {
        if (!options?.create && !this.files.has(name))
            throw new Error("missing file");

        return {
            getFile: async () => this.files.get(name)!,
            createWritable: async () => ({
                write: async (file: Blob) => {
                    this.files.set(name, file);
                },
                close: async () => undefined,
            }),
        };
    }


    async getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<MemoryFolder> {
        let directory = this.directories.get(name);
        if (!directory && options?.create) {
            directory = new MemoryFolder();
            this.directories.set(name, directory);
        }

        if (!directory)
            throw new Error("missing directory");

        return directory;
    }


    async *values(): AsyncIterable<{ kind: string; name: string }> {
        for (const name of this.files.keys())
            yield { kind: "file", name };

        for (const name of this.directories.keys())
            yield { kind: "directory", name };
    }


    async removeEntry(name: string): Promise<void> {
        this.files.delete(name);
        this.directories.delete(name);
    }
}


describe("browser Skill backup bundle", () => {
    it("returns an unsafe-path failure and removes the incomplete bundle and export", async () => {
        const folder = new MemoryFolder();
        const removeBackupExport = vi.fn().mockResolvedValue(undefined);
        const result = await writeBackupBundle({
            createBackupExport: async () => ({ id: "export", manifest: { format: 1, files: [{
                path: "../private", size: 1, sha256: "a".repeat(64),
            }] } }),
            readBackupExport: async () => new Blob(["content"]), removeBackupExport,
        }, folder, "invalid.skladno");
        expect(result).toEqual({ ok: false, code: WEB_BACKUP_ERROR.BACKUP_UNAVAILABLE });
        expect(folder.directories.size).toBe(0);
        expect(removeBackupExport).toHaveBeenCalledExactlyOnceWith("export");
    });

    it("allows a fresh automatic backup on each startup even on the same day", async () => {
        const folder = new MemoryFolder();
        vi.stubGlobal("showDirectoryPicker", async () => folder);
        try {
            await chooseBackupFolder();
            localStorage.setItem("last-automatic-backup", new Date().toISOString().slice(0, 10));
            const createBackup = vi.fn().mockResolvedValue(new Blob(["Synthetic SQLite snapshot"]));
            const policy = { schedule: "daily" as const, retention: { mode: "unlimited" as const } };
            await saveScheduledWebBackup({ createBackup }, policy);
            await saveScheduledWebBackup({ createBackup }, policy);
            expect(createBackup).toHaveBeenCalledTimes(2);
            expect(folder.files.size).toBe(2);
            await saveScheduledWebBackup({ createBackup }, { ...policy, schedule: "off" });
            expect(createBackup).toHaveBeenCalledTimes(2);
        } finally {
            localStorage.removeItem("last-automatic-backup");
            vi.unstubAllGlobals();
        }
    });

    it("saves and restores the database with Skill files through a folder handle", async () => {
        const folder = new MemoryFolder();
        vi.stubGlobal("showDirectoryPicker", async () => folder);
        await chooseBackupFolder();

        const contents = [new Blob(["database"]), new Blob(["skill"]), new Blob(["history"])];
        const paths = ["database.sqlite", "skills/clarity/SKILL.md", "skill-history/clarity/revision-1/SKILL.md"];
        const manifest = { format: 1 as const, files: paths.map((path, index) => ({
            path, size: contents[index]!.size,
            sha256: createHash("sha256").update(["database", "skill", "history"][index]!).digest("hex"),
        })) };
        const received: string[] = [];
        const client = {
            createBackupExport: async () => ({ id: "export", manifest }),
            readBackupExport: async (_id: string, index: number) => contents[index]!,
            removeBackupExport: async () => undefined,
            beginBackupImport: async () => ({ id: "import" }),
            writeBackupImport: async (_id: string, _index: number, file: Blob) => {
                received.push(await file.text());
            },
            restoreBackupImport: async () => undefined,
            removeBackupImport: async () => undefined,
        };

        const name = await saveWebBackup(client, "manual", { schedule: "off", retention: { mode: "unlimited" } });
        expect(name.endsWith(".skladno")).toBe(true);
        expect(await listWebBackups()).toContain(name);
        await restoreWebBackup(client, name);
        expect(received).toEqual(["database", "skill", "history"]);

        folder.files.set("legacy.sqlite", new Blob(["legacy database"]));
        folder.directories.set("incomplete.skladno", new MemoryFolder());
        expect(await listWebBackups()).toContain("legacy.sqlite");
        expect(await listWebBackups()).not.toContain("incomplete.skladno");
        const restoreLegacy = vi.fn().mockResolvedValue(undefined);
        await restoreWebBackup({ restoreBackup: restoreLegacy }, "legacy.sqlite");
        expect(await restoreLegacy.mock.calls[0]![0].text()).toBe("legacy database");
        vi.unstubAllGlobals();
    });
});
