# Moving from Skladno to Warplyn

Warplyn is available as a separate application. Keep Skladno and its data until you have verified your restored work. Do not move its live data folder into Warplyn.

Download the Windows 11 x64 installer or Debian x64 package from the [latest Warplyn release](https://github.com/punk-link/warplyn/releases/latest). See [Installation](installation.md) for platform instructions.

Before migrating, choose a **Backup folder** in **Settings** → **Data & backups** and select **Create backup**. Keep each `.sqlite` backup with its neighboring `.sqlite.skills` folder. See [Backups and recovery](backups-and-recovery.md) for details.

## Migration procedure

1. In Skladno, finish or cancel active AI work, then close and reopen the app so the latest *Draft* checkpoint is saved. Stop external edits to Author *Skill* files during backup creation.
2. Create a manual backup from the running Skladno app, including when it uses a custom data directory. Keep the `.sqlite` file and its neighboring `.sqlite.skills` folder together with their original names. Close Skladno after backup creation.
3. Install and open Warplyn into its separate empty profile. Never point it at your live Skladno data directory.
4. In **Settings** → **Data & backups**, choose the migration backup folder and select **Restore a backup**. Select the Skladno snapshot, confirm replacement, and let Warplyn restart. If Warplyn already contains work, create its own backup first: restore replaces work and does not merge databases.
5. Check *Articles*, latest *Drafts*, *Revision* history, Assistant conversations, *Settings*, publishing profiles, and Author *Skills* before writing anything new.
6. In **Settings** → **AI assistant**, add connections again and select models for your roles. Restore clears saved connections and model selections because credentials are not part of the backup. Skladno credentials remain unchanged.
7. For environment-variable connections, add the variable name again and ensure that variable exists in Warplyn's process environment. Backups never copy `.env` files or their values.
8. Choose a separate ongoing backup folder for Warplyn. Choose update-network and telemetry preferences again. Migration does not copy backup-folder preferences, telemetry identity, staged updates, or pending recovery records.

Native backups with a `.sqlite.skills` folder restore current Author *Skills* and immutable *Skill* history. Older database-only `.sqlite` snapshots restore the database and leave destination *Skills* unchanged; they cannot restore files they never contained. Database filenames and manifest formats remain compatible with Skladno.

## Recovery

Keep Skladno installed until you have verified the restore. The apps do not synchronize or merge later edits. Returning to Skladno returns to its pre-migration state.

If restore fails, keep using Skladno and retain the original backup pair. Warplyn validates the backup and retains a destination recovery snapshot; failed startup rolls back to that snapshot. Retry after resolving the reported problem. See [Backups and recovery](backups-and-recovery.md) and [Update recovery](update-recovery.md).

Warplyn uses `~/.warplyn` by default and `WARPLYN_DATA_DIR` for a custom folder. It ignores `SKLADNO_DATA_DIR` for live storage and refuses paths overlapping known legacy locations. Use an empty separate folder and restore instead of copying a live SQLite database.
