# Backups and recovery

Choose a **Backup folder** in **Settings → Data & backups**, then select **Create backup**. In supported web browsers, Warplyn asks the browser for permission to write backups only in that folder. New `.skladno` backup folders contain the database, current Author Skills, their Skill Revision history, and a file manifest. They never include `.env` files or API keys.

Browser bundle transfers support files up to 100 MB each and 500 MB per backup. Use the Electron app for larger local data.

In the Electron app, each database snapshot also has a neighboring `.sqlite.skills` folder containing current Author Skills, Skill Revision history, and a manifest. Keep the `.sqlite` file and its `.skills` folder together when copying or restoring a backup. Older database-only `.sqlite` backups remain selectable; restoring one retains the current Skill files and history.

Set **Automatic backups** to **Daily** to create one snapshot the first time Warplyn opens each day, while the browser still permits the chosen folder. **Automatic backup retention** removes only older automatic snapshots; manually created backups are always kept.

## Restore a backup

Use **Restore a backup** in **Settings → Data & backups** to select a backup. Warplyn checks its files before replacing active data and retains a local recovery copy of the prior database and Skill files. Restoring a `.skladno` backup replaces both the database and the saved Skill set. Restoring an older `.sqlite` backup replaces only the database.

For manual database-only recovery from a legacy `.sqlite` file while Warplyn is stopped:

1. Keep a copy of your current local database as a precaution.
2. Copy the selected backup `.sqlite` file over `skladno.sqlite` in your configured Warplyn data directory.
3. Start Warplyn again and verify your Articles and Revisions.

Use Settings to restore a backup that contains Skills so its manifest and Skill history are checked and restored together.

If a backup cannot be created, Warplyn leaves the active database and your editing session unchanged. Check that the destination exists and that your account can write to it, then retry.

## File permissions

By default, the local service stores its database in `~/.warplyn`; set `WARPLYN_DATA_DIR` to use another folder. Warplyn ignores `SKLADNO_DATA_DIR` for storage and refuses paths overlapping the old default or that known override. Use a separate folder and restore a backup instead. On POSIX systems, Warplyn restricts its data folder to the current user and its SQLite database files to that user only, including after an upgrade.

Windows uses its filesystem ACLs, which Node.js does not manage through POSIX file modes. Browser-created backup files likewise retain the permissions of the folder you choose. Store backups in a folder private to your account and review its sharing permissions before using a shared or synced location.
