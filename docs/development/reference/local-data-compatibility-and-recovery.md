# Local data compatibility and recovery

[ADR-006](../architecture/adr-006-sqlite-lifecycle-and-recovery.md) owns persistence and backup guarantees; [ADR-009](../architecture/adr-009-native-settings-credentials-and-data-switching.md) owns native credential and restart authority. Use this reference for compatibility and platform details, and the [release guide](../guides/mvp-release-and-recovery.md) for recovery procedures.

## Database and backup formats

Warplyn retains `skladno.sqlite`, existing ordered `schema_migrations`, native `.sqlite` snapshots, Skill companion manifest format `1`, and browser `.skladno` bundles. Product-name prefixes are not restore validation criteria. Supported Article schemas migrate forward; pre-Article prototype upgrades remain unsupported.

Browser backup folders include a consistent SQLite snapshot, current Author Skills, immutable Skill Revision history, and a manifest of file sizes and SHA-256 hashes. Native snapshots use a manifest-bearing companion directory for Skills. Credentials and environment files remain excluded. Automatic retention never removes manual backups.

Validate snapshots on a private temporary copy: even a read-only SQLite connection can create WAL sidecars beside its source. Verify bundle manifests before replacing active data, then verify Articles, Revisions, and Settings at application level. Source backups and immutable Revisions remain unchanged. Database-only snapshots leave destination Skills untouched.

Browser restore retains a complete recovery copy of prior database and Skill files and uses a startup marker to roll back an interrupted switch. Native restore retains a recovery snapshot with Skill files, stages replacement, and applies at restart. Clear pending state only after the new database and services open; allow one rollback attempt without relaunch loops.

## Credentials and native path authority

Windows uses Windows Credential Manager; Linux uses Secret Service through the installed keyring adapter. Unavailable or locked Secret Service, D-Bus, or collections return `managed_credentials_unavailable`. Never fall back to file or kernel keyring storage. Select the platform credential adapter once at composition.

Reject Electron safeStorage as the shared credential store because separately launched browser services must also use managed connections. Shared Settings contracts stay platform-neutral. Browser clients can select, test, and use managed connections; only Electron can mutate them. SQLite stores sanitized connection metadata, never keys.

Electron main retains picker selections and owns dialogs, reveal actions, credential mutation, and restart. Do not add generic filesystem IPC or accept arbitrary renderer paths. Browser backup handles remain browser-owned. Backup destinations stay outside SQLite; native runtime configuration lives under OS application data, is validated and atomic, and contains no credentials or Article content.

On POSIX, restrict application data and database files to the current user. Windows and browser-selected destinations use platform permissions. Live databases must use local filesystems; backups may use network destinations. Backup and data directories cannot contain each other.

## Independent installations and migration

Warplyn uses service/application ID `com.warplyn.desktop`, Electron profile `Warplyn`, configuration prefix `WARPLYN_`, and default data directory `~/.warplyn`. Resolve live storage from `WARPLYN_DATA_DIR` or that default. `SKLADNO_DATA_DIR` only identifies legacy overlap to reject; it is never a storage fallback. Canonical paths prevent junction and symlink aliases from bypassing the guard.

Migration uses explicit backup replacement and restart. Copy compatible database records and backed-up Skills without merging, reading legacy secrets, or copying environment files. Runtime backup destinations, update preferences, telemetry consent and identity, and recovery records remain outside backups.

Native and browser restore clear connection metadata, including environment references, and connection-bound model preferences on a private restore copy. Authors add connections and select models again. Source backups and OS credentials stay unchanged; recovery snapshots retain previous connection settings for rollback.

During public beta, supported installations receive a fresh installation identity and default-enabled telemetry; saved opt-out choices remain respected. The [runtime privacy policy](runtime-privacy-and-network-policy.md) owns that separate consent contract.

## Installation-local spelling data

Spelling preload preferences live in Electron's `runtime-settings.json`. Native language dictionary caches and the personal word list belong to the Electron profile, with OS custom-word changes on Windows and macOS. These are outside Article SQLite backup and restore. Restoring Articles preserves the installation's spelling configuration and native vocabulary. Deleting Article data does not claim to erase profile dictionary caches or OS words. Authors can remove personal terms explicitly in Spelling Settings. Warplyn stores no duplicate vocabulary in SQLite and never deletes OS words during Article-data deletion or restore.

Spelling Settings can unload a language from the current native spelling session and remove its saved preload choice. Unload retains Chromium's cached dictionary files; Electron exposes no public per-language cache deletion API. Opening an Article or preparing dictionaries enables native spelling again. Pending-download checkboxes are transient UI selections, not saved enable/disable preferences.

## Platform acceptance and deferred relocation

Windows 11 x64 and Ubuntu 22.04 x64 are release-validation targets. Compatible Debian-based distributions become guaranteed targets only after the same acceptance pass. Each package ships its matching x64 credential-store binary. Linux reuses Electron dialogs, reveal behavior, user-data configuration, and recovery. Other platforms need their own credential, filesystem, packaging, and recovery evidence.

Runtime-selected live-directory relocation is not implemented. Before exposing it, stage switching at restart, retain the complete old directory, meet restore's validation and bounded rollback guarantees, and prove path containment and interrupted-switch recovery. Do not require a currently unavailable relocation journey in today's release drill.

Test ordered transactional migration, secret isolation, picker authority, configuration precedence, path containment, snapshot compatibility, manifest failures, retained recovery data, and rollback. Run current platform drills from the [release guide](../guides/mvp-release-and-recovery.md) without private production data.
