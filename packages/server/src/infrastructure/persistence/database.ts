import { DatabaseSync } from "node:sqlite";
import { migrations } from "./migrations.js";
import { chmodSync, copyFileSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";


export type SqliteDatabase = DatabaseSync;
export const DATABASE_ERROR = {
    SNAPSHOT_INTEGRITY: "integrity",
    SNAPSHOT_FOREIGN_KEYS: "foreign-keys",
    SNAPSHOT_SCHEMA: "schema",
} as const;
export type DatabaseSnapshotErrorCode = typeof DATABASE_ERROR[keyof typeof DATABASE_ERROR];


export class DatabaseSnapshotError extends Error {
    constructor(readonly code: DatabaseSnapshotErrorCode) {
        super(code);
    }
}


function readSnapshotRows(database: DatabaseSync, statement: string): Record<string, unknown>[] {
    return database.prepare(statement).all() as Record<string, unknown>[];
}


/** Checks an unopened backup without running migrations or changing its contents. */


export function validateDatabaseSnapshot(filename: string): void {
    let database: DatabaseSync | undefined;
    let writableSnapshotDirectory: string | undefined;
    try {
        writableSnapshotDirectory = mkdtempSync(join(tmpdir(), "warplyn-snapshot-validation-"));
        const validationCopy = join(writableSnapshotDirectory, "snapshot.sqlite");
        copyFileSync(filename, validationCopy);
        restrictFilePermissions(validationCopy);
        database = new DatabaseSync(validationCopy, { readOnly: true });
        const integrity = readSnapshotRows(database, "PRAGMA integrity_check");
        if (integrity.length !== 1 || integrity[0]?.integrity_check !== "ok")
            throw new DatabaseSnapshotError(DATABASE_ERROR.SNAPSHOT_INTEGRITY);

        if (readSnapshotRows(database, "PRAGMA foreign_key_check").length > 0)
            throw new DatabaseSnapshotError(DATABASE_ERROR.SNAPSHOT_FOREIGN_KEYS);

        const known = new Map<number, string>(migrations.map((migration) => [migration.version, migration.name]));
        const applied = readSnapshotRows(database, "SELECT version, name FROM schema_migrations ORDER BY version");
        if (applied.length === 0 || applied.some((migration) => typeof migration.version !== "number" || known.get(migration.version) !== migration.name))
            throw new DatabaseSnapshotError(DATABASE_ERROR.SNAPSHOT_SCHEMA);
    } catch (error) {
        if (error instanceof DatabaseSnapshotError)
            throw error;

        throw new DatabaseSnapshotError(DATABASE_ERROR.SNAPSHOT_INTEGRITY);
    } finally {
        database?.close();
        if (writableSnapshotDirectory)
            rmSync(writableSnapshotDirectory, { recursive: true, force: true });
    }
}


function restrictFilePermissions(path: string): void {
    if (process.platform !== "win32" && existsSync(path))
        chmodSync(path, 0o600);
}


/** Resets installation-specific AI settings on a private restore copy, never a recovery snapshot. */
export function resetRestoredConnectionSettings(filename: string): void {
    const database = openDatabase(filename);
    try {
        database.exec(`DELETE FROM app_settings WHERE key IN (
            'application-ai-connections', 'application-model-preferences', 'application-app-model'
        )`);
    } finally {
        database.close();
    }
}


function restrictDatabasePermissions(filename: string): void {
    for (const path of [filename, `${filename}-wal`, `${filename}-shm`, `${filename}-journal`])
        restrictFilePermissions(path);
}


export function openDatabase(filename: string): SqliteDatabase {
    restrictDatabasePermissions(filename);
    const database = new DatabaseSync(filename);
    restrictDatabasePermissions(filename);
    database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;");
    database.exec("BEGIN IMMEDIATE;");
    try {
        database.exec(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
            version INTEGER PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL
            );
        `);
        const applied = new Set(
            database.prepare("SELECT version FROM schema_migrations ORDER BY version")
                .all()
                .map((row) => Number(row.version)),
        );

        for (const migration of migrations) {
            if (applied.has(migration.version))
                continue;

            database.exec(migration.sql);
            database.prepare("INSERT INTO schema_migrations (version, name, applied_at) VALUES (?, ?, ?)")
                .run(migration.version, migration.name, new Date().toISOString());
        }

        database.exec("COMMIT;");
    } catch (error) {
        database.exec("ROLLBACK;");
        throw error;
    }

    restrictDatabasePermissions(filename);
    return database;
}
