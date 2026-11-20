import type { MessageId } from "../../messages.js";


export const electronMessages = {
    "electron.articleFiles.docx": "Word files",
    "electron.articleFiles.html": "HTML files",
    "electron.articleFiles.load": "Load Article from file",
    "electron.articleFiles.markdown": "Markdown files",
    "electron.articleFiles.rtf": "Rich text files",
    "electron.articleFiles.save": "Save Article to file",
    "electron.closeFailed.message": "The Draft checkpoint completed, but the local database did not close cleanly.",
    "electron.closeFailed.title": "Warplyn could not close cleanly",
    "electron.deleteData.backup": "Create a backup before deletion",
    "electron.deleteData.cancel": "Cancel",
    "electron.deleteData.delete": "Delete all local data",
    "electron.deleteData.detail": "Warplyn will close after deletion. A backup can be created first when a backup folder is configured.",
    "electron.deleteData.message": (
        "This permanently removes Articles, Draft checkpoints, Revisions, Assistant history, style data, settings, and " +
        "local backups in Warplyn’s data directory."
    ),
    "electron.deleteData.title": "Delete all local Warplyn data?",
    "electron.draftCheckpointFailed.detail": "Return to the Article and try again, or quit without the latest unsaved changes.",
    "electron.draftCheckpointFailed.message": "Warplyn could not save the latest Draft checkpoint.",
    "electron.draftCheckpointFailed.quit": "Quit without latest checkpoint",
    "electron.draftCheckpointFailed.return": "Return to Article",
    "electron.draftCheckpointFailed.title": "Draft checkpoint failed",
    "electron.restoreBackup.cancel": "Cancel",
    "electron.restoreBackup.detail": (
        "Warplyn will save the latest Draft checkpoints, keep a recovery copy of the active data, then restar" +
        "t. Existing AI connections stay local. Environment-variable references can be restored; API keys and" +
        " variable values are never imported. This cannot be undone from Settings."
    ),
    "electron.restoreBackup.message": "This replaces your active local Warplyn data with the selected backup.",
    "electron.restoreBackup.restore": "Restore and restart",
    "electron.restoreBackup.title": "Restore this backup?",
    "electron.restoreFailed.message": (
        "Close any other Warplyn windows or local development servers using this data, then try again. Your active data" +
        " is unchanged."
    ),
    "electron.restoreFailed.title": "Couldn’t restore the backup",
    "electron.spelling.addWord": "Add to dictionary",
    "electron.startFailed.message": "Check that the local data directory is available, then try again.",
    "electron.startFailed.title": "Warplyn could not start",
} satisfies Partial<Record<MessageId, string>>;
