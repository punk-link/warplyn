import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { lstat, readdir, writeFile } from "node:fs/promises";
import { recordBackupFile } from "@skladno/server/electron";
import { readPersonalDictionaryFile } from "./personal-dictionary-backup.js";


interface FileRecord { size: number; sha256: string }


type FileInventory = Record<string, FileRecord>;
const skillDirectories = ["skills", "skill-history"] as const;


function recordFile(path: string): FileRecord {
    const bytes = readFileSync(path);
    return { size: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") };
}


function recordPersonalDictionaryFiles<T extends FileInventory | Promise<FileInventory>>(bundleDirectory: string, record: (path: string, name: string) => T): T | FileInventory {
    const name = "personal-dictionary.json";
    const path = join(bundleDirectory, name);

    return readPersonalDictionaryFile(path) ? record(path, name) : {};
}


function visit(directory: string, prefix: string, files: FileInventory): void {
    for (const name of readdirSync(directory)) {
        const path = join(directory, name);
        const relative = `${prefix}/${name}`;
        const stat = lstatSync(path);
        if (stat.isDirectory())
            visit(path, relative, files);
        else if (stat.isFile())
            files[relative] = recordFile(path);
        else
            throw new Error("author_skill_backup_unsafe_file");
    }
}


function inventory(root: string): FileInventory {
    const files: FileInventory = {};
    for (const name of skillDirectories) {
        const path = join(root, name);
        if (existsSync(path)) {
            if (!lstatSync(path).isDirectory())
                throw new Error("author_skill_backup_unsafe_file");

            visit(path, name, files);
        }
    }

    return Object.fromEntries(Object.entries(files).sort(([first], [second]) => first.localeCompare(second)));
}


async function visitBackupFiles(directory: string, prefix: string, files: FileInventory): Promise<void> {
    for (const name of await readdir(directory)) {
        const path = join(directory, name);
        const relative = `${prefix}/${name}`;
        const stat = await lstat(path);
        if (stat.isDirectory())
            await visitBackupFiles(path, relative, files);
        else if (stat.isFile())
            files[relative] = await recordBackupFile(path);
        else
            throw new Error("author_skill_backup_unsafe_file");
    }
}


export async function captureAuthorSkillInventory(dataDirectory: string): Promise<FileInventory> {
    const files: FileInventory = {};
    for (const name of skillDirectories) {
        const path = join(dataDirectory, name);
        const stat = await lstat(path).catch((error: unknown) => {
            if (error && typeof error === "object" && "code" in error && error.code === "ENOENT")
                return undefined;

            throw error;
        });
        if (!stat)
            continue;

        if (!stat.isDirectory())
            throw new Error("author_skill_backup_unsafe_file");

        await visitBackupFiles(path, name, files);
    }

    return Object.fromEntries(Object.entries(files).sort(([first], [second]) => first.localeCompare(second)));
}


export async function writeAuthorSkillBackupManifest(snapshotPath: string, bundleDirectory: string, before: FileInventory, dataDirectory: string): Promise<void> {
    const after = await captureAuthorSkillInventory(dataDirectory);
    const copied = await captureAuthorSkillInventory(bundleDirectory);
    if (JSON.stringify(before) !== JSON.stringify(after) || JSON.stringify(before) !== JSON.stringify(copied))
        throw new Error("author_skill_backup_changed");

    const personalFiles = await recordPersonalDictionaryFiles(bundleDirectory, async (path, name) => ({ [name]: await recordBackupFile(path) }));
    const manifest = { format: 1, files: { "database.sqlite": await recordBackupFile(snapshotPath), ...copied, ...personalFiles } };
    await writeFile(join(bundleDirectory, "manifest.json"), JSON.stringify(manifest), { flag: "wx" });
}


export function validateAuthorSkillBackupManifest(snapshotPath: string, bundleDirectory: string): void {
    if (!lstatSync(bundleDirectory).isDirectory())
        throw new Error("author_skill_backup_invalid_manifest");

    const manifestPath = join(bundleDirectory, "manifest.json");
    if (!existsSync(manifestPath) || !lstatSync(manifestPath).isFile())
        throw new Error("author_skill_backup_invalid_manifest");

    const manifest: unknown = JSON.parse(readFileSync(manifestPath, "utf8"));
    if (!manifest || typeof manifest !== "object" || !("format" in manifest) || manifest.format !== 1 || !("files" in manifest))
        throw new Error("author_skill_backup_invalid_manifest");

    const personalFiles = recordPersonalDictionaryFiles(bundleDirectory, (path, name) => ({ [name]: recordFile(path) }));
    const actual = { "database.sqlite": recordFile(snapshotPath), ...inventory(bundleDirectory), ...personalFiles };
    if (JSON.stringify(manifest.files) !== JSON.stringify(actual))
        throw new Error("author_skill_backup_invalid_manifest");
}
