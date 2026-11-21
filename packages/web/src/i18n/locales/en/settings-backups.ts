import type { MessageId } from "../../messages.js";


export const settingsBackupsMessages = {
    "settings.automaticBackupFailed": (
        "Automatic backup failed. Check the backup folder in Data & backups, then create a manual backup. Your Articles" +
        " are unchanged."
    ),
    "settings.automaticBackups": "Automatic backups",
    "settings.automaticBackupsHint": (
        "When enabled, creates a backup shortly after startup and every 24 hours from that run while Warplyn stays open" +
        ". Manual backups are never removed automatically."
    ),
    "settings.backupAutomation": "Automatic backups",
    "settings.backupCreateFailed": (
        "Couldn’t create the backup. Check the selected folder and browser size limits, then try again. Your editing se" +
        "ssion is unchanged."
    ),
    "settings.backupCreateUnavailable": "Backups are unavailable in this browser session.",
    "settings.backupCreated": "Created {name}",
    "settings.backupCreating": "Creating backup…",
    "settings.backupFolder": "Backup folder",
    "settings.backupFolderFailed": "Couldn’t choose that folder. Try again.",
    "settings.backupFolderHint": "Choose a local folder for backup snapshots. Warplyn can write there only after you choose it.",
    "settings.backupFolderPermissionDenied": "Warplyn cannot access that backup folder. Choose it again and allow access.",
    "settings.backupFolderRequired": "Choose a backup folder first.",
    "settings.backupFolderSelected": "Using {folderName}",
    "settings.backupFolderUnsupported": "This browser cannot choose a backup folder.",
    "settings.backupSaveFailed": "Couldn't save backup Settings. Your previous Settings are unchanged. Try again.",
    "settings.backupStorage": "Backup storage",
    "settings.chooseBackup": "Choose a backup",
    "settings.chooseBackupFolder": "Choose folder…",
    "settings.createBackup": "Create backup",
    "settings.createBackupHint": (
        "Backs up your Articles, Revisions, settings, Author Skills, and Skill history. Browser backups support files u" +
        "p to 100 MB and 500 MB total. API keys stay out."
    ),
    "settings.dataBackups": "Data & backups",
    "settings.keepAllBackups": "Keep all backups",
    "settings.keepBackups": "Keep {count} backups",
    "settings.restoreBackup": "Restore a backup",
    "settings.restoreBackupConfirm": "Restore {name}? Warplyn will replace active local data and reload.",
    "settings.restoreBackupFailed": (
        "Couldn’t restore that backup. Check its files and browser size limits or choose another backup. Your active da" +
        "ta is unchanged."
    ),
    "settings.restoreBackupHint": (
        "Choose a backup from the selected folder. Warplyn checks its files, keeps a recovery copy, then rest" +
        "ores its Articles, Revisions, settings, and saved Skills. Existing AI connections stay local. Enviro" +
        "nment-variable references can be restored; API keys and variable values are never imported. Older da" +
        "tabase-only backups keep your current Skills."
    ),
    "settings.restoreBackupUnavailable": "That backup cannot be restored.",
    "settings.retention": "Automatic backup retention",
    "settings.retentionHint": "Controls how many automatic backups Warplyn keeps. Manual backups are never removed automatically.",
    "settings.revealBackupFolder": "Reveal folder",
} satisfies Partial<Record<MessageId, string>>;
