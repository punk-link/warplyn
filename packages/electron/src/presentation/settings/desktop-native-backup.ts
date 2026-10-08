import { randomUUID } from "node:crypto";
import { mkdir, rename, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import { beginTimedTelemetryCapture, type TelemetryCaptureSource } from "@skladno/shared";
import { createAuthorSkillBackup, getAuthorSkillBackupPath } from "../../infrastructure/recovery/author-skill-backup.js";
import { captureAuthorSkillInventory } from "../../infrastructure/recovery/author-skill-backup-manifest.js";
import { runBackup } from "../../infrastructure/recovery/backup-lifecycle.js";


export function createNativeBackup(createSnapshot: (path: string) => Promise<unknown>, dataDirectory: string, backupDirectory: string, telemetry?: TelemetryCaptureSource, kind: "manual" | "automatic" = "manual"): Promise<{ path: string; createdAt: string }> {
    return runBackup(() => writeNativeBackup(createSnapshot, dataDirectory, backupDirectory, telemetry, kind));
}


async function writeNativeBackup(createSnapshot: (path: string) => Promise<unknown>, dataDirectory: string, backupDirectory: string, telemetry: TelemetryCaptureSource | undefined, kind: "manual" | "automatic"): Promise<{ path: string; createdAt: string }> {
    const observed = beginTimedTelemetryCapture(telemetry);
    let path: string | undefined;
    let temporary: string | undefined;
    let snapshotCreated = false;
    try {
        await mkdir(backupDirectory, { recursive: true });
        const created = new Date();
        const prefix = kind === "automatic" ? "warplyn-automatic" : "warplyn-backup";
        const filename = `${prefix}-${created.toISOString().replaceAll(/[:.]/g, "-")}-${randomUUID()}.sqlite`;
        temporary = join(backupDirectory, `.${filename}.${randomUUID()}.tmp`);
        path = join(backupDirectory, filename);
        const expectedInventory = await captureAuthorSkillInventory(dataDirectory);

        await createSnapshot(temporary);
        await rename(temporary, path);
        snapshotCreated = true;

        if ((await stat(path)).size === 0)
            throw new Error("Backup is empty.");

        await createAuthorSkillBackup({ dataDirectory, snapshotPath: path, expectedInventory });
        observed.capture({ kind: "backup_finished", outcome: "completed", elapsedMs: observed.elapsedMs() });

        return { path, createdAt: created.toISOString() };
    } catch (error) {
        if (temporary)
            await rm(temporary, { force: true });

        if (path && snapshotCreated) {
            await rm(path, { force: true });
            await rm(getAuthorSkillBackupPath(path), { recursive: true, force: true });
        }

        observed.capture({ kind: "backup_finished", outcome: "failed", elapsedMs: observed.elapsedMs(), failure: "unknown" });

        throw error;
    }
}
