import type { BackupPolicy } from "@skladno/shared";
import { restoreBackupBundle, saveBackupBundle, WEB_BACKUP_ERROR, WebBackupError } from "./web-backup-bundles.js";
import { type BackupDirectoryHandle as BackupBundleDirectoryHandle } from "./backup-directory-handle.js";
import { type BackupBundleClient } from "./backup-bundle-client.js";


interface BackupDirectoryHandle extends BackupBundleDirectoryHandle {
    queryPermission(options: { mode: "readwrite" }): Promise<PermissionState>;
    requestPermission(options: { mode: "readwrite" }): Promise<PermissionState>;
    values(): AsyncIterable<{ kind: string; name: string }>;
}


interface BackupClient extends BackupBundleClient {
    createBackup?: () => Promise<Blob>;
    restoreBackup?: (backup: Blob) => Promise<void>;
}


type BackupKind = "manual" | "automatic";
type WebBackupFailure = typeof WEB_BACKUP_ERROR[keyof typeof WEB_BACKUP_ERROR];
type WebBackupMessageId = "settings.backupFolderFailed" | "settings.backupFolderRequired" | "settings.backupFolderPermissionDenied" | "settings.backupFolderUnsupported" | "settings.backupCreateFailed" | "settings.backupCreateUnavailable" | "settings.restoreBackupFailed" | "settings.restoreBackupUnavailable";
const webBackupMessages: Record<WebBackupFailure, WebBackupMessageId> = {
    [WEB_BACKUP_ERROR.FOLDER_REQUIRED]: "settings.backupFolderRequired",
    [WEB_BACKUP_ERROR.FOLDER_PERMISSION]: "settings.backupFolderPermissionDenied",
    [WEB_BACKUP_ERROR.FOLDER_PICKER_UNSUPPORTED]: "settings.backupFolderUnsupported",
    [WEB_BACKUP_ERROR.BACKUP_UNAVAILABLE]: "settings.backupCreateUnavailable",
    [WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE]: "settings.restoreBackupUnavailable",
};
const databaseName = "skladno-web-backups";
const storeName = "settings";
const folderKey = "folder";
let automaticBackupInProgress = false;
let selectedFolder: BackupDirectoryHandle | undefined;


export function getWebBackupErrorMessageId(error: unknown, fallback: WebBackupMessageId): WebBackupMessageId {
    if (!(error instanceof WebBackupError))
        return fallback;

    return webBackupMessages[error.code];
}


function createBackupFilename(kind: BackupKind): string {
    return `skladno-${kind}-${new Date().toISOString().replaceAll(/[:.]/g, "-")}-${crypto.randomUUID()}.skladno`;
}


function getBackupFolderPicker(): (() => Promise<BackupDirectoryHandle>) | undefined {
    const choose = (window as Window & { showDirectoryPicker?: () => Promise<BackupDirectoryHandle> }).showDirectoryPicker;
    return choose ? () => choose.call(window) : undefined;
}


function openStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(databaseName, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result.transaction(storeName, mode).objectStore(storeName));
    });
}


async function readFolder(): Promise<BackupDirectoryHandle | undefined> {
    if (selectedFolder)
        return selectedFolder;

    const store = await openStore("readonly");
    return new Promise((resolve, reject) => {
        const request = store.get(folderKey);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result as BackupDirectoryHandle | undefined);
    });
}


async function saveFolder(folder: BackupDirectoryHandle): Promise<void> {
    const store = await openStore("readwrite");
    await new Promise<void>((resolve, reject) => {
        const request = store.put(folder, folderKey);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}


async function getWritableFolder(requestPermission: boolean): Promise<BackupDirectoryHandle> {
    const folder = await readFolder();
    if (!folder)
        throw new WebBackupError(WEB_BACKUP_ERROR.FOLDER_REQUIRED);

    const permission = requestPermission ? await folder.requestPermission({ mode: "readwrite" }) : await folder.queryPermission({ mode: "readwrite" });
    if (permission !== "granted")
        throw new WebBackupError(WEB_BACKUP_ERROR.FOLDER_PERMISSION);

    return folder;
}


async function retainAutomaticBackups(folder: BackupDirectoryHandle, policy: BackupPolicy): Promise<void> {
    if (policy.retention.mode === "unlimited")
        return;

    const files: string[] = [];
    for await (const entry of folder.values()) {
        if (entry.name.startsWith("skladno-automatic-") && ((entry.kind === "file" && entry.name.endsWith(".sqlite")) || (entry.kind === "directory" && entry.name.endsWith(".skladno"))))
            files.push(entry.name);
    }

    for (const name of files.sort().reverse().slice(policy.retention.count))
        await folder.removeEntry(name, { recursive: name.endsWith(".skladno") });
}


export async function chooseBackupFolder(): Promise<string> {
    const choose = getBackupFolderPicker();
    if (!choose)
        throw new WebBackupError(WEB_BACKUP_ERROR.FOLDER_PICKER_UNSUPPORTED);

    const folder = await choose();
    selectedFolder = folder;
    try {
        await saveFolder(folder);
    } catch {
        // ponytail: session-only selection when handle persistence is unavailable; add alternate storage only if supported browsers need it.
    }

    return folder.name;
}


export async function getSelectedBackupFolderName(): Promise<string | undefined> {
    return (await readFolder())?.name;
}


export async function listWebBackups(): Promise<string[]> {
    const folder = await getWritableFolder(false);
    const names: string[] = [];
    for await (const entry of folder.values()) {
        if (entry.kind === "file" && entry.name.endsWith(".sqlite"))
            names.push(entry.name);

        if (await isCompleteBackupBundle(folder, entry))
            names.push(entry.name);
    }

    return names.sort().reverse();
}


async function isCompleteBackupBundle(folder: BackupDirectoryHandle, entry: { kind: string; name: string }): Promise<boolean> {
    if (entry.kind !== "directory" || !entry.name.endsWith(".skladno"))
        return false;

    return folder.getDirectoryHandle(entry.name).then((directory) => directory.getFileHandle("manifest.json").then(() => true, () => false), () => false);
}


export async function restoreWebBackup(client: BackupClient, name: string): Promise<void> {
    if (name.includes("/") || name.includes("\\") || (!name.endsWith(".sqlite") && !name.endsWith(".skladno")))
        throw new WebBackupError(WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE);

    const folder = await getWritableFolder(false);
    if (name.endsWith(".skladno")) {
        await restoreBackupBundle(client, folder, name);
        return;
    }

    if (!client.restoreBackup)
        throw new WebBackupError(WEB_BACKUP_ERROR.RESTORE_UNAVAILABLE);

    const backup = await (await folder.getFileHandle(name)).getFile();
    await client.restoreBackup(backup);
}


export async function saveWebBackup(client: BackupClient, kind: BackupKind, policy: BackupPolicy, requestPermission = true): Promise<string> {
    if (!client.createBackupExport && !client.createBackup)
        throw new WebBackupError(WEB_BACKUP_ERROR.BACKUP_UNAVAILABLE);

    const folder = await getWritableFolder(requestPermission);
    const name = createBackupFilename(kind);
    if (client.createBackupExport) {
        await saveBackupBundle(client, folder, name);
        await retainAutomaticBackups(folder, policy);
        return name;
    }

    if (!client.createBackup)
        throw new WebBackupError(WEB_BACKUP_ERROR.BACKUP_UNAVAILABLE);

    const legacyName = name.replace(/\.skladno$/, ".sqlite");
    const file = await folder.getFileHandle(legacyName, { create: true });
    const writer = await file.createWritable();
    try {
        await writer.write(await client.createBackup());
    } finally {
        await writer.close();
    }

    await retainAutomaticBackups(folder, policy);
    return legacyName;
}


export async function saveScheduledWebBackup(client: BackupClient, policy: BackupPolicy): Promise<void> {
    if (policy.schedule !== "daily" || automaticBackupInProgress)
        return;

    automaticBackupInProgress = true;
    try {
        await saveWebBackup(client, "automatic", policy, false);
    } finally {
        automaticBackupInProgress = false;
    }
}
