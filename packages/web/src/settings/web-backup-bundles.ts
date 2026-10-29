import { success, failure } from "@skladno/shared";
import type { BackupBundleManifest } from "@skladno/shared";
import { BackupBundleClient } from "./backup-bundle-client";
import { BackupDirectoryHandle } from "./backup-directory-handle";


import { WEB_BACKUP_ERROR } from "./web-backup-error.js";
import type { WebBackupResult } from "./web-backup-result.js";
import { unwrapWebBackup } from "./unwrap-web-backup.js";


function isSafeBundlePath(path: string): boolean {
    const parts = path.split("/");
    const punctuationPattern = /^[a-zA-Z0-9_-][a-zA-Z0-9._-]*$/;
    return path === "database.sqlite" || path === "manifest.json" || (parts.length >= 2 && (parts[0] === "skills" || parts[0] === "skill-history") &&
        parts.every((part) => part !== "." && part !== ".." && punctuationPattern.test(part)));
}


function isBackupBundleManifest(value: unknown): value is BackupBundleManifest {
    if (!value || typeof value !== "object" || !("format" in value) || value.format !== 1 ||
        !("files" in value) || !Array.isArray(value.files) || value.files.length === 0)
        return false;

    const punctuationPattern = /^[a-f0-9]{64}$/;
    return value.files.every((entry: unknown) => entry && typeof entry === "object" && "path" in entry &&
        typeof entry.path === "string" && entry.path !== "manifest.json" && isSafeBundlePath(entry.path) &&
        "size" in entry && typeof entry.size === "number" && Number.isSafeInteger(entry.size) &&
        "sha256" in entry && typeof entry.sha256 === "string" && punctuationPattern.test(entry.sha256));
}


async function writeBundleFile(directory: BackupDirectoryHandle, path: string, file: Blob): Promise<WebBackupResult<void>> {
    const parts = path.split("/");
    const name = parts.pop();
    if (!name || !isSafeBundlePath(path))
        return failure({ code: WEB_BACKUP_ERROR.BACKUP_UNAVAILABLE });

    let target = directory;
    for (const part of parts)
        target = await target.getDirectoryHandle(part, { create: true });

    const writer = await (await target.getFileHandle(name, { create: true })).createWritable();

    try {
        await writer.write(file);
    } finally {
        await writer.close();
    }

    return success(undefined);
}


async function readBundleFile(directory: BackupDirectoryHandle, path: string): Promise<WebBackupResult<Blob>> {
    if (!isSafeBundlePath(path))
        return failure({ code: WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE });

    const parts = path.split("/");
    const name = parts.pop();

    if (!name)
        return failure({ code: WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE });

    let target = directory;

    for (const part of parts)
        target = await target.getDirectoryHandle(part);

    return success(await (await target.getFileHandle(name)).getFile());
}


export async function saveBackupBundle(client: BackupBundleClient, folder: BackupDirectoryHandle, name: string): Promise<void> {
    unwrapWebBackup(await writeBackupBundle(client, folder, name));
}


export async function writeBackupBundle(client: BackupBundleClient, folder: BackupDirectoryHandle, name: string): Promise<WebBackupResult<void>> {
    if (!client.createBackupExport || !client.readBackupExport || !client.removeBackupExport)
        return failure({ code: WEB_BACKUP_ERROR.BACKUP_UNAVAILABLE });

    const { id, manifest } = await client.createBackupExport();

    try {
        const directory = await folder.getDirectoryHandle(name, { create: true });
        const written = await writeBundleContents({ readBackupExport: client.readBackupExport }, directory, id, manifest);
        if (!written.ok)
            await folder.removeEntry(name, { recursive: true }).catch(() => undefined);

        return written;
    } catch (error) {
        await folder.removeEntry(name, { recursive: true }).catch(() => undefined);
        throw error;
    } finally {
        await client.removeBackupExport(id);
    }
}


async function writeBundleContents(
    client: Required<Pick<BackupBundleClient, "readBackupExport">>, directory: BackupDirectoryHandle,
    id: string, manifest: BackupBundleManifest,
): Promise<WebBackupResult<void>> {
    for (const [index, entry] of manifest.files.entries()) {
        const written = await writeBundleFile(directory, entry.path, await client.readBackupExport(id, index));
        if (!written.ok)
            return written;
    }

    return writeBundleFile(directory, "manifest.json", new Blob([JSON.stringify(manifest)], { type: "application/json" }));
}


export async function restoreBackupBundle(client: BackupBundleClient, folder: BackupDirectoryHandle, name: string): Promise<void> {
    unwrapWebBackup(await importBackupBundle(client, folder, name));
}


export async function importBackupBundle(client: BackupBundleClient, folder: BackupDirectoryHandle, name: string): Promise<WebBackupResult<void>> {
    if (!client.beginBackupImport || !client.writeBackupImport || !client.restoreBackupImport || !client.removeBackupImport)
        return failure({ code: WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE });

    const directory = await folder.getDirectoryHandle(name);
    const raw = await (await directory.getFileHandle("manifest.json")).getFile();
    const manifest: unknown = JSON.parse(await raw.text());

    if (!isBackupBundleManifest(manifest))
        return failure({ code: WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE });

    const { id } = await client.beginBackupImport(manifest);

    try {
        for (const [index, entry] of manifest.files.entries()) {
            const file = await readBundleFile(directory, entry.path);
            if (!file.ok)
                return file;

            await client.writeBackupImport(id, index, file.value);
        }

        await client.restoreBackupImport(id);
    } finally {
        await client.removeBackupImport(id);
    }

    return success(undefined);
}
