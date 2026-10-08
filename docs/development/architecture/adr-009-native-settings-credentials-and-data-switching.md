# ADR-009: Native Settings use platform adapters and restart-safe data switching

- Status: Accepted
- Date: 2026-08-23
- Updated: 2026-10-02
- Scope: Electron Settings, managed credentials, native backups, restore, and data relocation
- Depends on: [ADR-001](adr-001-three-layer-server-and-electron.md), [ADR-006](adr-006-sqlite-lifecycle-and-recovery.md), [ADR-008](adr-008-loopback-service-trust-boundary.md)

## Context

Native credentials, backup picking, and restore need OS access without granting that authority to the renderer. Replacing an open SQLite database would risk Author data.

## Decision

Represent credentials as environment references or OS-managed secrets through platform-neutral application ports. Persist only sanitized connection metadata. Never fall back to secret files or insecure storage if the OS credential service is unavailable. No client receives credential values.

Browser clients may select, test, and use managed connections; only Electron may create, rename, or remove them. Electron main owns native dialogs, retained picker selections, reveal actions, credential mutation, and restart coordination through a separate finite bridge. Renderers cannot submit arbitrary privileged paths.

Keep backup destinations and runtime recovery configuration outside SQLite. Write runtime configuration atomically, without credentials or Article content.

Electron main owns automatic backups. With the daily policy enabled, attempt a complete native backup five seconds after startup and every 24 hours from the previous attempt's start. Read the current policy and destination for each attempt; report failures without moving focus and continue the schedule. Retention removes only automatic snapshots and their Skill companions. Stop scheduling before shutdown or data replacement and wait for in-progress backup and retention work before closing SQLite. Browser builds follow the same cadence through their retained folder permission handle.

Native restore stages a snapshot and applies it during restart. Retain a complete recovery snapshot first, clear pending state only after the database and application services open successfully, and attempt at most one automatic rollback. Never enter a relaunch loop or automatically delete old data or orphaned credentials.

Live data belongs on a local filesystem; backups may use network destinations. Backup and live-data directories cannot contain one another.

Runtime-selected relocation is not implemented. Any future relocation must retain the old directory and meet the same restart, validation, rollback, and recovery guarantees before exposure.

Warplyn is an independent installation. Legacy migration uses explicit backup replacement, preserves source backups and OS credentials, and requires fresh connection setup. [Local data compatibility and recovery](../reference/local-data-compatibility-and-recovery.md) owns installation identities and restore sanitization.

## Consequences

Authors gain native recovery and managed credentials without exposing secrets through backups or the renderer. OS credential availability and restart-based restore limit convenience in exchange for recoverability.

## Verification and references

Test credential isolation, finite IPC, path authority, staged restore, retained recovery data, and bounded rollback. The [data reference](../reference/local-data-compatibility-and-recovery.md) specifies platform behavior and future relocation requirements. Run implemented desktop acceptance drills from the [release guide](../guides/mvp-release-and-recovery.md); relocation acceptance is required only before that capability ships.
