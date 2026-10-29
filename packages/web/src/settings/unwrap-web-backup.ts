import { WebBackupError } from "./web-backup-error.js";
import type { WebBackupResult } from "./web-backup-result.js";


export function unwrapWebBackup<T>(result: WebBackupResult<T>): T {
    if (result.ok)
        return result.value;

    throw new WebBackupError(result.code);
}
