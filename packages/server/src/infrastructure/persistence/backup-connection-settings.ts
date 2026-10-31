import { existsSync } from "node:fs";

import { normalizeAiConnections, normalizeAppModel, normalizeModelPreferences } from "../../application/settings/application-settings-normalizers.js";
import { openDatabase, type SqliteDatabase } from "./database.js";


const connectionKey = "application-ai-connections";
const modelKeys = ["application-model-preferences", "application-app-model"];


function readSetting(database: SqliteDatabase, key: string): unknown {
    const row = database.prepare("SELECT value_json FROM app_settings WHERE key = ?").get(key);
    return row ? JSON.parse(String(row.value_json)) : undefined;
}


function writeSetting(database: SqliteDatabase, key: string, value: unknown): void {
    database.prepare("INSERT OR REPLACE INTO app_settings (key, value_json, updated_at) VALUES (?, ?, ?)")
        .run(key, JSON.stringify(value), new Date().toISOString());
}


function preserveLocalSettings(restored: SqliteDatabase, destination: SqliteDatabase): void {
    writeSetting(restored, connectionKey, normalizeAiConnections(readSetting(destination, connectionKey)));
    for (const key of modelKeys) {
        restored.prepare("DELETE FROM app_settings WHERE key = ?").run(key);
        const value = readSetting(destination, key);
        if (value !== undefined)
            writeSetting(restored, key, value);
    }
}


/** Rebuild credential metadata from allowed fields and erase removed bytes from the snapshot. */
export function sanitizeBackupConnectionSettings(filename: string): void {
    const database = openDatabase(filename);
    try {
        database.exec("PRAGMA secure_delete = ON");
        const connections = normalizeAiConnections(readSetting(database, connectionKey));
        writeSetting(database, connectionKey, connections);
        writeSetting(database, modelKeys[0]!, normalizeModelPreferences(readSetting(database, modelKeys[0]!)));
        const appModel = normalizeAppModel(readSetting(database, modelKeys[1]!));
        database.prepare("DELETE FROM app_settings WHERE key = ?").run(modelKeys[1]!);
        if (appModel)
            writeSetting(database, modelKeys[1]!, appModel);

        database.exec("VACUUM; PRAGMA wal_checkpoint(TRUNCATE)");
    } finally {
        database.close();
    }
}


/** Keep the destination setup; a fresh installation imports only environment references. */
export function restoreConnectionSettings(filename: string, destinationPath?: string): void {
    sanitizeBackupConnectionSettings(filename);
    const restored = openDatabase(filename);
    let destination: SqliteDatabase | undefined;
    try {
        if (destinationPath && existsSync(destinationPath))
            destination = openDatabase(destinationPath);

        const local = normalizeAiConnections(destination && readSetting(destination, connectionKey));
        if (destination && local.connections.length > 0) {
            preserveLocalSettings(restored, destination);
        } else {
            const saved = normalizeAiConnections(readSetting(restored, connectionKey));
            const connections = saved.connections.filter((connection) => connection.credentialSource.kind === "environment-variable")
                .map((connection) => ({ ...connection, status: "unchecked" }));
            writeSetting(restored, connectionKey, { connections });
            for (const key of modelKeys)
                restored.prepare("DELETE FROM app_settings WHERE key = ?").run(key);
        }
    } finally {
        destination?.close();
        restored.close();
    }
}
