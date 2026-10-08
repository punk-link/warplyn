import type { BackupBundleManifest } from "@skladno/shared";
import { BackupBundleClient } from "./backup-bundle-client";
import { BackupDirectoryHandle } from "./backup-directory-handle";


export const WEB_BACKUP_ERROR = {
    FOLDER_REQUIRED: "web_backup_folder_required",
    FOLDER_PERMISSION: "web_backup_folder_permission",
    FOLDER_PICKER_UNSUPPORTED: "web_backup_folder_picker_unsupported",
    BACKUP_UNAVAILABLE: "web_backup_unavailable",
    RESTORE_UNAVAILABLE: "web_backup_restore_unavailable",
} as const;
type WebBackupErrorCode = typeof WEB_BACKUP_ERROR[keyof typeof WEB_BACKUP_ERROR];


export class WebBackupError extends Error {
    constructor(readonly code: WebBackupErrorCode) {
        super(code);
    }
}


function isSafeBundlePath(path: string): boolean {
    const parts = path.split("/");
    return path === "database.sqlite" || path === "manifest.json" || (parts.length >= 2 && (parts[0] === "skills" || parts[0] === "skill-history")
        && parts.every((part) => part !== "." && part !== ".." && /^[a-zA-Z0-9_-][a-zA-Z0-9._-]*$/.test(part)));
}


function isBackupBundleManifest(value: unknown): value is BackupBundleManifest {
    if (!value || typeof value !== "object" || !("format" in value) || value.format !== 1
        || !("files" in value) || !Array.isArray(value.files) || value.files.length === 0)
        return false;

    return value.files.every((entry: unknown) => entry && typeof entry === "object" && "path" in entry
        && typeof entry.path === "string" && entry.path !== "manifest.json" && isSafeBundlePath(entry.path)
        && "size" in entry && typeof entry.size === "number" && Number.isSafeInteger(entry.size)
        && "sha256" in entry && typeof entry.sha256 === "string" && /^[a-f0-9]{64}$/.test(entry.sha256));
}


async function writeBundleFile(directory: BackupDirectoryHandle, path: string, file: Blob): Promise<void> {
    const parts = path.split("/");
    const name = parts.pop();
    if (!name || !isSafeBundlePath(path))
        throw new WebBackupError(WEB_BACKUP_ERROR.BACKUP_UNAVAILABLE);

    let target = directory;
    for (const part of parts)
        target = await target.getDirectoryHandle(part, { create: true });

    const writer = await (await target.getFileHandle(name, { create: true })).createWritable();

    try {
        await writer.write(file);
    } finally {
        await writer.close();
    }
}


async function readBundleFile(directory: BackupDirectoryHandle, path: string): Promise<Blob> {
    if (!isSafeBundlePath(path))
        throw new WebBackupError(WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE);

    const parts = path.split("/");
    const name = parts.pop();

    if (!name)
        throw new WebBackupError(WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE);

    let target = directory;

    for (const part of parts)
        target = await target.getDirectoryHandle(part);

    return (await target.getFileHandle(name)).getFile();
}


export async function saveBackupBundle(client: BackupBundleClient, folder: BackupDirectoryHandle, name: string): Promise<void> {
    if (!client.createBackupExport || !client.readBackupExport || !client.removeBackupExport)
        throw new WebBackupError(WEB_BACKUP_ERROR.BACKUP_UNAVAILABLE);

    const { id, manifest } = await client.createBackupExport();

    try {
        const directory = await folder.getDirectoryHandle(name, { create: true });
        for (const [index, entry] of manifest.files.entries())
            await writeBundleFile(directory, entry.path, await client.readBackupExport(id, index));

        await writeBundleFile(directory, "manifest.json", new Blob([JSON.stringify(manifest)], { type: "application/json" }));
    } catch (error) {
        await folder.removeEntry(name, { recursive: true }).catch(() => undefined);
        throw error;
    } finally {
        await client.removeBackupExport(id);
    }
}


export async function restoreBackupBundle(client: BackupBundleClient, folder: BackupDirectoryHandle, name: string): Promise<void> {
    if (!client.beginBackupImport || !client.writeBackupImport || !client.restoreBackupImport || !client.removeBackupImport)
        throw new WebBackupError(WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE);

    const directory = await folder.getDirectoryHandle(name);
    const raw = await (await directory.getFileHandle("manifest.json")).getFile();
    const manifest: unknown = JSON.parse(await raw.text());

    if (!isBackupBundleManifest(manifest))
        throw new WebBackupError(WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE);

    const { id } = await client.beginBackupImport(manifest);

    try {
        for (const [index, entry] of manifest.files.entries())
            await client.writeBackupImport(id, index, await readBundleFile(directory, entry.path));

        await client.restoreBackupImport(id);
    } finally {
        await client.removeBackupImport(id);
    }
}
