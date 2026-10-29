import { success, failure, type Result } from "@skladno/shared";
import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import type { BackupPolicy, TelemetryCaptureSource } from "@skladno/shared";
import { readRuntimeSettings } from "../../infrastructure/runtime/runtime-settings.js";
import { runBackup } from "../../infrastructure/recovery/backup-lifecycle.js";
import { createNativeBackup } from "./desktop-native-backup.js";

const dailyInterval = 86_400_000;
const automaticPrefix = "warplyn-automatic-";


async function retainAutomaticBackups(directory: string, policy: BackupPolicy): Promise<void> {
    if (policy.retention.mode === "unlimited")
        return;

    const snapshots = (await readdir(directory, { withFileTypes: true }))
        .filter((entry) => entry.isFile() && entry.name.startsWith(automaticPrefix) && entry.name.endsWith(".sqlite"))
        .map((entry) => entry.name).sort().reverse();
    for (const name of snapshots.slice(policy.retention.count)) {
        await rm(join(directory, name), { force: true });
        await rm(join(directory, `${name}.skills`), { recursive: true, force: true });
    }
}


export function createDesktopBackupScheduler(options: {
    runtimePath: string;
    dataDirectory: string;
    readPolicy(): Promise<BackupPolicy>;
    createSnapshot(path: string): Promise<unknown>;
    readPersonalWords?(): Promise<string[]>;
    notifyFailure(): void;
    telemetry?: TelemetryCaptureSource;
}) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;


    async function createAutomaticBackup(): Promise<Result<void, { code: "backup_folder_required" }>> {
        const policy = await options.readPolicy();
        if (disposed || policy.schedule !== "daily")
            return success(undefined);

        const { backupDirectory } = readRuntimeSettings(options.runtimePath);
        if (!backupDirectory)
            return failure({ code: "backup_folder_required" });

        await createNativeBackup(options.createSnapshot, options.dataDirectory, backupDirectory, options.telemetry, "automatic", options.readPersonalWords);
        await retainAutomaticBackups(backupDirectory, policy);

        return success(undefined);
    }


    async function run(): Promise<void> {
        const startedAt = Date.now();
        try {
            let failed: boolean;
            try {
                failed = !(await runBackup(createAutomaticBackup)).ok;
            } catch {
                failed = true;
            }

            if (failed && !disposed)
                options.notifyFailure();
        } finally {
            if (!disposed)
                timer = setTimeout(run, Math.max(0, dailyInterval - (Date.now() - startedAt)));
        }
    }


    return {
        start() {
            if (timer || disposed)
                return;

            timer = setTimeout(run, 5_000);
        },
        dispose() {
            disposed = true;
            clearTimeout(timer);
        },
    };
}
