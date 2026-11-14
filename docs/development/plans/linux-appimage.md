# Linux AppImage acceptance

Source: [issue #54](https://github.com/punk-link/warplyn/issues/54).
Status: implementation complete; installed acceptance pending.

## Implemented

Linux x64 builds an AppImage and version-bound SHA-256 metadata alongside Debian. AppImage runtime detection, format/architecture selection, permission-gated full-image downloads, explicit restart, checkpoint/snapshot safeguards, atomic replacement and a retained recovery executable are implemented. Existing Settings and Utility Area actions share the coordinator. Debian remains manual. Release validation, publication, user instructions, ADR-010 and product records are updated.

The packaging and updater decisions now belong to [ADR-010](../architecture/adr-010-author-controlled-preview-updates.md). The [release guide](../guides/mvp-release-and-recovery.md) owns the installed drill; the [Linux acceptance record](../guides/linux-installed-acceptance.md) owns environment evidence. No new npm dependency remains.

## Automated verification

- Core verification passed, including static checks and script/workspace tests. Final lint and type checks also passed.
- Browser journeys passed, 48 tests.
- Windows packaged desktop gate passed serially, 11 passed and one visible spelling test skipped.
- WSL built and validated AppImage, including ELF architecture, embedded product/version, native Linux keyring payload, sandbox-preserving launcher and checksum metadata. The packaged update journey passed with a real IPC download-integrity failure. The full serial gate passed, 11 passed and one visible spelling test skipped. Two timing failures in the parallel WSL run passed serially without changing timeouts. Debian was rebuilt from the same packaged payload; package identity, version, amd64 architecture and application-payload hash were verified.
- Site build, metadata checks, product generation/check and diff whitespace checks passed.

## Remaining acceptance

The installed preview.2-to-preview.3 drill exposed a downloader failure: Electron rejects manual redirect mode when GitHub redirects release assets. The working-tree fix follows native redirects in the isolated update session and checks every destination before contact. A real preview.3 download and checksum verification passed with that fix. Native transport regression coverage checks trusted redirects and blocks untrusted destinations before contact. The older installed downloader needs a one-time manual replacement with a fixed preview before the installed upgrade drill can continue; retrying the affected client does not resolve this failure.

The redirect fix passed core verification and packaged desktop gates on Windows and WSL, each with 12 passed and one visible spelling test skipped. Initial Article-review and Linux file-export failures passed in focused reruns and then full isolated gate reruns without test changes. The browser gate was not rerun for this Electron-main transport change. A local, unpublished preview.3 build is under `packages/electron/out/update-redirect-fix`; its AppImage SHA-256 is `dfeacb87c2e7210f107548a8144791eee35fd10a789db102a4a7f301e89ad420`. It is not the published preview.3 artifact.

The Author explicitly chose WSL for automation and left installed desktop acceptance pending. Keep the AppImage product capability partial until these release gates have evidence:

1. On Ubuntu 22.04.5 x64 with GNOME and GNOME Keyring, upgrade from a previous preview AppImage using disposable Article, Revision, Draft and Settings data. Explicitly download and restart; verify retained writing, credentials, history, startup success and recovery snapshot. Check ordinary exit never applies an update.
2. Exercise failed download, checkpoint, snapshot, replacement and upgraded startup. Recover with the retained previous executable and its matching snapshot. Verify Article and Settings recovery; never open a migrated database with the older binary alone.
3. Record desktop/session, native keyring, sandbox, spelling, dialogs, launcher integration, keyboard/screen reader and recovery results. Repeat Debian manual upgrades to verify format separation.
4. Complete compatibility checks on Ubuntu 24.04 x64/GNOME and Fedora 43 x64/GNOME. Record exact versions and pass/fail/not-run evidence. These are targets, not current support certifications.

Retain source SHA, artifact versions/hashes and environment evidence without private writing, credentials or paths. Update the Linux acceptance record and product status when the gates pass, then delete this plan. RPM, Flatpak, Snap and ARM64 remain outside scope.
