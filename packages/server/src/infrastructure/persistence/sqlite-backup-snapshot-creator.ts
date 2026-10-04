import { chmod, mkdtemp, rm } from "node:fs/promises";
import { backup } from "node:sqlite";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type { BackupSnapshotCreator } from "../../application/settings/backup-snapshot-creator.js";
import type { SqliteDatabase } from "./database.js";


function createBackupFilename(now: Date): string {
    const timestamp = now.toISOString().replaceAll(/[:.]/g, "-");
    return `skladno-backup-${timestamp}.sqlite`;
}


export class SqliteBackupSnapshotCreator implements BackupSnapshotCreator {
    constructor(
        private readonly database: SqliteDatabase,
        private readonly now = () => new Date(),
    ) { }


    async createTemporary(): Promise<{ path: string; createdAt: string; cleanup(): Promise<void> }> {
        const destination = await mkdtemp(join(tmpdir(), "skladno-backup-"));
        if (process.platform !== "win32")
            await chmod(destination, 0o700);

        const created = this.now();
        const path = join(destination, createBackupFilename(created));
        try {
            await backup(this.database, path);
            if (process.platform !== "win32")
                await chmod(path, 0o600);

            return { path, createdAt: created.toISOString(), cleanup: () => rm(destination, { recursive: true, force: true }) };
        } catch (error) {
            await rm(destination, { recursive: true, force: true });
            throw error;
        }
    }
}
