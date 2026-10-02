# ADR-010: Windows updates remain author-controlled

- Status: Accepted
- Date: 2026-08-27
- Updated: 2026-10-02
- Scope: Windows distribution, update discovery, apply and restart, and recovery
- Depends on: [ADR-006](adr-006-sqlite-lifecycle-and-recovery.md), [ADR-008](adr-008-loopback-service-trust-boundary.md), [ADR-009](adr-009-native-settings-credentials-and-data-switching.md)

## Context

Updates replace application binaries and may run forward-only database migrations. Authors must retain control and a recoverable copy of their work.

## Decision

Discover releases directly through GitHub only after persisted Author permission naming the recipient and data boundary. Offer compatible releases according to the Author's channel preference. Checks remain optional; download and restart are explicit. Security classification changes the warning and never forces installation.

Keep network access, release validation, updater control, snapshots, and restart authority in Electron main. Expose only finite desktop operations and validated, localized state. Browser and development builds do not imitate an updater.

On Windows, use the native Squirrel updater. Restart and update first obtains the latest Draft checkpoint and creates a pre-update snapshot. Either failure cancels the update. Then close streams, services, and SQLite through the existing shutdown path before applying the update. Ordinary close or OS shutdown does not apply it.

Mark startup successful only after the database opens, migrations complete, services start, and the renderer is ready. Retain recovery state outside SQLite and a snapshot from the previous installed version until the next update succeeds. Database rollback requires the prior binary and its matching snapshot; opening migrated data with an older binary alone is unsupported.

Linux may discover compatible Debian releases with the same network permission, but installation remains with the system package manager or manual reinstall. Warplyn and Skladno use separate release feeds and package identities.

## Consequences

Authors can defer any update and recover their data. Unsigned Windows packages may trigger warnings or be blocked by policy; HTTPS and package integrity do not establish publisher identity. No separate update service is needed.

## Verification and references

[Desktop release and update policy](../reference/desktop-release-and-update-policy.md) owns tags, channels, scheduling, assets, and status presentation. The [release guide](../guides/mvp-release-and-recovery.md) owns publication and installed upgrade/recovery drills. Test state transitions, consent, checkpoint and snapshot gates, shutdown, and startup success.
