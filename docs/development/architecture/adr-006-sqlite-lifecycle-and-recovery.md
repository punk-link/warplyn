# ADR-006: Local data uses forward-only SQLite migrations and snapshot recovery

- Status: Accepted
- Date: 2026-08-21
- Updated: 2026-10-15
- Scope: Local persistence, schema migration, backups, and recovery
- Depends on: [ADR-001](adr-001-three-layer-server-and-electron.md), [ADR-005](adr-005-article-state-and-consistency.md), [ADR-009](adr-009-native-settings-credentials-and-data-switching.md)

## Context

Local private data must survive schema upgrades and interrupted recovery without rewriting Article history or exposing credentials.

## Decision

SQLite is the local system of record, with foreign keys and WAL enabled. Schema migrations are ordered and forward-only, recorded durably, and each unapplied migration runs in one immediate transaction. Supported schemas migrate without deleting the database; unsupported prototype databases are not detected or deleted automatically.

Typography configuration remains in the existing Style Corpus settings. A typography save atomically writes rules and appends a compact Style Profile snapshot from current included samples and saved guidance. Explicit rules permit a profile without samples. Historical profile JSON remains immutable; legacy rule strings normalize on read with an empty typography list. Sample and manual-guidance changes retain their explicit rebuild workflow.

Language-scoped typography uses versioned corpus settings and the same append-only profile history. Article overrides are stored beside Article-specific guidance with a language tag, without interpreting that guidance as structured rules. Overrides can replace or disable inherited rule slots. Earlier unscoped rules remain recoverable for explicit assignment to a language and do not govern new reviews. Article-only settings permit local checking without samples; they do not create a parallel profile history. Global saves and profile insertion remain one transaction. See the [preset guide](../guides/typography-presets.md) for the single preset catalog and immutable version policy.

Backups capture consistent database state and recoverable Author Skills and Skill history. Desktop backups also capture personal spelling words in the validated native companion folder. Restore merges those words with existing vocabulary and rolls back only new additions on failure. Credentials and environment files are excluded. Automatic retention never deletes manual backups. Legacy database-only restore leaves destination Skill files and personal vocabulary unchanged.

Create snapshots through SQLite's asynchronous online backup API. Copy files asynchronously and hash bounded stream chunks so backup creation yields to editing and IPC. Report completion after the complete backup is written and checked. Database replacement and shutdown wait for pending backups; a failed capture removes its partial output before teardown proceeds.

Validate backup integrity before replacing active data and verify application state afterward. Retain complete prior data for recovery and recover interrupted switches. Source backups and immutable Revisions remain unchanged.

Restrict data access to the current user where the platform supports it. Native restore authority and restart coordination follow [ADR-009](adr-009-native-settings-credentials-and-data-switching.md).

## Consequences

Authors can recover through snapshots without a second persistence format. Downgrade migrations, replacing an open database, and upgrades from the pre-Article prototype are unsupported.

Online snapshots do not compact unused database pages as `VACUUM INTO` did. Backup size and total duration can increase in exchange for a responsive application during capture.

## Verification and references

Test transactional migration, integrity validation, retention, interrupted-switch recovery, and supported permissions. [Local data compatibility and recovery](../reference/local-data-compatibility-and-recovery.md) owns formats and compatibility; the [release guide](../guides/mvp-release-and-recovery.md) owns disposable-profile recovery drills.

