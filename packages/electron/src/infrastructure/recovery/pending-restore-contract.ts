export interface PendingRestore {
    complete(): Promise<void>;
    rollback(): Promise<void>;
}
