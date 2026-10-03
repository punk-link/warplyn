import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { copyFile, cp, lstat, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import type { BackupBundleManifest } from "@skladno/shared";

import { validateDatabaseSnapshot } from "./database.js";
import { recordBackupFile } from "./backup-file-record.js";


interface Snapshot { path: string; cleanup(): Promise<void> }


interface Session { directory: string; manifest: BackupBundleManifest; kind: "export" | "import"; expiry: ReturnType<typeof setTimeout> }


const skillDirectories = ["skills", "skill-history"] as const;
const safePart = /^[a-zA-Z0-9_-][a-zA-Z0-9._-]*$/;


function isSafeBundlePath(path: string): boolean {
    if (path === "database.sqlite")
        return true;

    const parts = path.split("/");
    return parts.length >= 2 && skillDirectories.some((directory) => directory === parts[0])
        && parts.every((part) => part !== "." && part !== ".." && safePart.test(part));
}


async function fileRecord(root: string, path: string): Promise<BackupBundleManifest["files"][number]> {
    return { path, ...await recordBackupFile(join(root, ...path.split("/"))) };
}


async function visit(directory: string, prefix: string, root: string, files: BackupBundleManifest["files"]): Promise<void> {
    for (const name of await readdir(directory)) {
        const path = `${prefix}/${name}`;
        if (!isSafeBundlePath(path))
            throw new Error("backup_bundle_unsafe_path");

        const absolute = join(directory, name);
        const stat = await lstat(absolute);
        if (stat.isDirectory())
            await visit(absolute, path, root, files);
        else if (stat.isFile())
            files.push(await fileRecord(root, path));
        else
            throw new Error("backup_bundle_unsafe_file");
    }
}


async function inventory(root: string): Promise<BackupBundleManifest["files"]> {
    const files: BackupBundleManifest["files"] = [];
    for (const directory of skillDirectories) {
        const absolute = join(root, directory);
        const stat = await lstat(absolute).catch((error: unknown) => {
            if (error && typeof error === "object" && "code" in error && error.code === "ENOENT")
                return undefined;

            throw error;
        });
        if (!stat)
            continue;

        if (!stat.isDirectory())
            throw new Error("backup_bundle_unsafe_file");

        await visit(absolute, directory, root, files);
    }

    return files.sort((first, second) => first.path.localeCompare(second.path));
}


function sameFiles(first: BackupBundleManifest["files"], second: BackupBundleManifest["files"]): boolean {
    return JSON.stringify(first) === JSON.stringify(second);
}


export async function validateBackupBundle(directory: string, manifest: BackupBundleManifest): Promise<void> {
    if (manifest.files.length > 10_000)
        throw new Error("backup_bundle_invalid_manifest");

    const paths = manifest.files.map((file) => file.path);
    if (paths[0] !== "database.sqlite" || new Set(paths).size !== paths.length
        || paths.some((path) => !isSafeBundlePath(path)))
        throw new Error("backup_bundle_invalid_manifest");

    const actual = [await fileRecord(directory, "database.sqlite"), ...await inventory(directory)];
    if (!sameFiles(manifest.files, actual))
        throw new Error("backup_bundle_invalid_manifest");

    validateDatabaseSnapshot(join(directory, "database.sqlite"));
}


export class BackupBundleTransfers {
    private readonly sessions = new Map<string, Session>();


    constructor(
        private readonly dataDirectory: string,
        private readonly createSnapshot: () => Promise<Snapshot>,
        private readonly restore: (directory: string, manifest: BackupBundleManifest) => Promise<void>,
    ) { }


    async createExport(): Promise<{ id: string; manifest: BackupBundleManifest }> {
        const directory = await mkdtemp(join(tmpdir(), "skladno-backup-export-"));
        let snapshot: Snapshot | undefined;
        try {
            const before = await inventory(this.dataDirectory);
            snapshot = await this.createSnapshot();
            await copyFile(snapshot.path, join(directory, "database.sqlite"));
            for (const name of skillDirectories) {
                const source = join(this.dataDirectory, name);
                if (existsSync(source))
                    await cp(source, join(directory, name), { recursive: true, errorOnExist: true });
            }

            const copied = await inventory(directory);
            if (!sameFiles(before, await inventory(this.dataDirectory)) || !sameFiles(before, copied))
                throw new Error("backup_bundle_changed");

            const manifest: BackupBundleManifest = { format: 1, files: [await fileRecord(directory, "database.sqlite"), ...copied] };
            if (!isBackupBundleManifest(manifest))
                throw new Error("backup_bundle_too_large");

            await writeFile(join(directory, "manifest.json"), JSON.stringify(manifest));
            const id = randomUUID();
            this.addSession(id, { directory, manifest, kind: "export" });
            return { id, manifest };
        } catch (error) {
            await rm(directory, { recursive: true, force: true });
            throw error;
        } finally {
            await snapshot?.cleanup();
        }
    }


    async readExport(id: string, index: number): Promise<Uint8Array> {
        const session = this.getSession(id, "export");
        const file = session.manifest.files[index];
        if (!file)
            throw new Error("backup_bundle_invalid_file");

        const actual = await fileRecord(session.directory, file.path);
        if (!sameFiles([file], [actual]))
            throw new Error("backup_bundle_changed");

        return readFile(join(session.directory, ...file.path.split("/")));
    }


    async beginImport(value: unknown): Promise<string> {
        if (!isBackupBundleManifest(value))
            throw new Error("backup_bundle_invalid_manifest");

        const directory = await mkdtemp(join(tmpdir(), "skladno-backup-import-"));
        const id = randomUUID();
        this.addSession(id, { directory, manifest: value, kind: "import" });
        return id;
    }


    async writeImport(id: string, index: number, bytes: Uint8Array): Promise<void> {
        const session = this.getSession(id, "import");
        const file = session.manifest.files[index];
        if (!file || bytes.length !== file.size || bytes.length > 100_000_000)
            throw new Error("backup_bundle_invalid_file");

        const target = join(session.directory, ...file.path.split("/"));
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, bytes, { flag: "wx" });
        if (!sameFiles([file], [await fileRecord(session.directory, file.path)]))
            throw new Error("backup_bundle_invalid_file");
    }


    async restoreImport(id: string): Promise<void> {
        const session = this.getSession(id, "import");
        try {
            await validateBackupBundle(session.directory, session.manifest);
            await this.restore(session.directory, session.manifest);
        } finally {
            await this.remove(id);
        }
    }


    async remove(id: string): Promise<void> {
        const session = this.sessions.get(id);
        if (!session)
            return;

        this.sessions.delete(id);
        clearTimeout(session.expiry);
        await rm(session.directory, { recursive: true, force: true });
    }


    private addSession(id: string, value: Omit<Session, "expiry">): void {
        const expiry = setTimeout(() => void this.remove(id), 60 * 60 * 1000);
        expiry.unref();
        this.sessions.set(id, { ...value, expiry });
    }


    private getSession(id: string, kind: Session["kind"]): Session {
        const session = this.sessions.get(id);
        if (!session || session.kind !== kind)
            throw new Error("backup_bundle_missing_session");

        return session;
    }
}


function isBackupBundleManifest(value: unknown): value is BackupBundleManifest {
    if (!value || typeof value !== "object" || !("format" in value) || value.format !== 1
        || !("files" in value) || !Array.isArray(value.files) || value.files.length === 0 || value.files.length > 10_000)
        return false;

    const files = value.files;
    let total = 0;
    for (const file of files) {
        if (!file || typeof file !== "object" || typeof file.path !== "string" || !isSafeBundlePath(file.path)
            || !Number.isInteger(file.size) || file.size < 0 || file.size > 100_000_000
            || typeof file.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(file.sha256))
            return false;

        total += file.size;
    }

    return total <= 500_000_000 && files[0]?.path === "database.sqlite"
        && new Set(files.map((file) => file.path)).size === files.length;
}
