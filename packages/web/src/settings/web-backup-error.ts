export const WEB_BACKUP_ERROR = {
    FOLDER_REQUIRED: "web_backup_folder_required",
    FOLDER_PERMISSION: "web_backup_folder_permission",
    FOLDER_PICKER_UNSUPPORTED: "web_backup_folder_picker_unsupported",
    BACKUP_UNAVAILABLE: "web_backup_unavailable",
    RESTORE_UNAVAILABLE: "web_backup_restore_unavailable",
} as const;


export class WebBackupError extends Error {
    constructor(readonly code: typeof WEB_BACKUP_ERROR[keyof typeof WEB_BACKUP_ERROR]) {
        super(code);
    }
}
