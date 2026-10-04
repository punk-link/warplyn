const pendingBackups = new Set<Promise<unknown>>();


export function runBackup<T>(operation: () => Promise<T>): Promise<T> {
    const pending = operation();
    pendingBackups.add(pending);
    void pending.finally(() => pendingBackups.delete(pending)).catch(() => undefined);
    return pending;
}


/** Teardown waits for complete backups, including their Skill files and manifests. */
export async function waitForBackups(): Promise<void> {
    while (pendingBackups.size > 0)
        await Promise.allSettled(pendingBackups);
}
