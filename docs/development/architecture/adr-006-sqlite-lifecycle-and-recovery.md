# ADR-006: Local data uses forward-only SQLite migrations and snapshot recovery

- Status: Accepted
- Date: 2026-08-21
- Updated: 2026-10-02
- Scope: Local persistence, schema migration, backups, and recovery
- Depends on: [ADR-001](adr-001-three-layer-server-and-electron.md), [ADR-005](adr-005-article-state-and-consistency.md), [ADR-009](adr-009-native-settings-credentials-and-data-switching.md)

## Context

Local private data must survive schema upgrades and interrupted recovery without rewriting Article history or exposing credentials.

## Decision

SQLite is the local system of record, with foreign keys and WAL enabled. Schema migrations are ordered and forward-only, recorded durably, and each unapplied migration runs in one immediate transaction. Supported schemas migrate without deleting the database; unsupported prototype databases are not detected or deleted automatically.

Backups capture consistent database state and recoverable Author Skills and Skill history. Credentials and environment files are excluded. Automatic retention never deletes manual backups. Legacy database-only restore leaves destination Skill files unchanged.

Validate backup integrity before replacing active data and verify application state afterward. Retain complete prior data for recovery and recover interrupted switches. Source backups and immutable Revisions remain unchanged.

Restrict data access to the current user where the platform supports it. Native restore authority and restart coordination follow [ADR-009](adr-009-native-settings-credentials-and-data-switching.md).

## Consequences

Authors can recover through snapshots without a second persistence format. Downgrade migrations, replacing an open database, and upgrades from the pre-Article prototype are unsupported.

## Verification and references

Test transactional migration, integrity validation, retention, interrupted-switch recovery, and supported permissions. [Local data compatibility and recovery](../reference/local-data-compatibility-and-recovery.md) owns formats and compatibility; the [release guide](../guides/mvp-release-and-recovery.md) owns disposable-profile recovery drills.

