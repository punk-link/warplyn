import type { Result } from "@skladno/shared";
import type { WebBackupError } from "./web-backup-error.js";


export type WebBackupResult<T> = Result<T, { code: WebBackupError["code"] }>;
