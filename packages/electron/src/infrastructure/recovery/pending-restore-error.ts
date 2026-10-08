export const RECOVERY_ERROR = {
    PENDING_RESTORE_FAILED: "recovery.pending_restore_failed",
} as const;


export class PendingRestoreError extends Error {
    readonly code = RECOVERY_ERROR.PENDING_RESTORE_FAILED;


    constructor(cause: unknown) {
        super(undefined, { cause });
        this.name = "PendingRestoreError";
    }
}
