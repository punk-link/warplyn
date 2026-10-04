export interface BackupSnapshotCreator {
    createTemporary(): Promise<{ path: string; createdAt: string; cleanup(): Promise<void> }>;
}
