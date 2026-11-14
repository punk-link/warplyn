# ADR-010: Desktop updates remain author-controlled

- Status: Accepted
- Date: 2026-08-27
- Updated: 2026-11-14
- Scope: Windows and Linux distribution, update discovery, apply and restart, and recovery
- Depends on: [ADR-006](adr-006-sqlite-lifecycle-and-recovery.md), [ADR-008](adr-008-loopback-service-trust-boundary.md), [ADR-009](adr-009-native-settings-credentials-and-data-switching.md)

## Context

Updates replace application binaries and may run forward-only database migrations. Authors must retain control and a recoverable copy of their work.

## Decision

Discover releases directly through GitHub only after persisted Author permission naming the recipient and data boundary. Offer compatible releases according to the Author's channel preference. Checks remain optional; download and restart are explicit. Security classification changes the warning and never forces installation.

Keep network access, release validation, updater control, snapshots, and restart authority in Electron main. Expose only finite desktop operations and validated, localized state. Browser and development builds do not imitate an updater.

Use an in-memory Electron session with credentials omitted for public release requests and downloads. Updates need no workspace cookies or persisted browser state. This also keeps Linux discovery independent of persistent cookie-store encryption and keyring initialization.

On Windows, use the native Squirrel updater. Restart and update first obtains the latest Draft checkpoint and creates a pre-update snapshot. Either failure cancels the update. Then close streams, services, and SQLite through the existing shutdown path before applying the update. Ordinary close or OS shutdown does not apply it.

Mark startup successful only after the database opens, migrations complete, services start, and the renderer is ready. Retain recovery state outside SQLite and a snapshot from the previous installed version until the next update succeeds. Database rollback requires the prior binary and its matching snapshot; opening migrated data with an older binary alone is unsupported.

Linux may discover compatible Debian releases with the same network permission, but installation remains with the system package manager or manual reinstall. Warplyn and Skladno use separate release feeds and package identities.

Linux x64 also builds an AppImage from the Forge-packaged payload using AppImage's appimagetool 1.9.1 and type2-runtime 20251108, both pinned by SHA-256 from their versioned GitHub releases. A minimal AppRun launcher preserves Electron sandboxing. The evaluated electron-builder 26.18.0 launcher can add `--no-sandbox`, so it is not used. Release assets pair `Warplyn-<version>-linux-x64.AppImage` with `warplyn-appimage-x64.json`, containing the exact version, architecture, filename, byte size and SHA-256. Discovery requires both assets. Downloads remain full-image transfers through the existing GitHub permission, with bounded metadata, validated GitHub release redirects and streamed size/digest verification. Checksums establish transfer integrity, not publisher identity.

Detect AppImage only in a packaged Linux x64 process with an executable inside its reported AppImage mount and an accessible original image. Debian and unknown layouts never gain apply authority. Reuse the finite update IPC and the existing Settings and Utility Area actions.

AppImage installation uses a small application-owned replacement operation. The published `electron-updater` 6.8.11 install implementation unlinks the original before moving its replacement, so it does not satisfy the required failure guarantee. After checkpoint and snapshot, copy the old executable to `<image>.previous` and stage verified bytes beside the installation. Complete preparation before shutdown; atomically rename the staged file over the original only after services close. Relaunch the original on replacement failure. Ordinary exit never applies a staged image. The previous executable and matching snapshot remain available for manual recovery. Installed desktop and previous-preview recovery acceptance remain release gates; WSL evidence alone does not certify them.

## Consequences

Authors can defer any update and recover their data. Unsigned Windows packages may trigger warnings or be blocked by policy; HTTPS and package integrity do not establish publisher identity. No separate update service is needed.

## Verification and references

[Desktop release and update policy](../reference/desktop-release-and-update-policy.md) owns tags, channels, scheduling, assets, and status presentation. The [release guide](../guides/mvp-release-and-recovery.md) owns publication and installed upgrade/recovery drills. Test state transitions, consent, checkpoint and snapshot gates, shutdown, and startup success.
