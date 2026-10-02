# Desktop release and update policy

[ADR-010](../architecture/adr-010-author-controlled-preview-updates.md) owns update authority and recovery. The [release guide](../guides/mvp-release-and-recovery.md) owns build, publication, installed upgrade, and rollback procedures. [Settings product records](../../../product-model/areas/settings.json) own visible update behavior.

## Feeds, versions, and assets

Use GitHub Releases directly. Stable builds are releases; previews are prereleases with SemVer tags such as `v0.1.0-preview.2`. The exact optional security suffix is `.security`, for example `v0.1.1-preview.1.security`. Validate tags against package versions before publishing.

Windows 11 x64 is the only in-app download/apply target. Squirrel.Windows requires the installer, full package, and `RELEASES` manifest; validate the complete uploaded asset set. Electron's public update service is not used. Debian installation remains through the system package manager or manual `.deb` reinstall.

Warplyn uses only `punk-link/warplyn` and requires its own `com.warplyn.desktop-…-full.nupkg` or `warplyn_…_amd64.deb` asset identity. Skladno installers remain in `punk-link/skladno-legacy`. Inherited tags describe historical source and are not Warplyn downloads. Release workflows reject legacy product metadata before packaging or publishing.

Stable and preview Windows releases remain unsigned until [signing work](https://github.com/punk-link/warplyn/issues/41) is complete. Do not describe HTTPS or package integrity as Authenticode publisher identity or promise general enterprise installation.

## Permission, scheduling, and channels

About Settings obtains persisted network permission in a dialog naming GitHub and the data boundary. After consent, packaged main checks at startup and at most once every 24 hours unless automatic checks are disabled. Explicit Check remains available. Use Electron's Chromium network stack to respect normal system networking policy.

Discovery sends repository identity, installed version, platform, architecture, and normal connection metadata. It sends no device identifier, account, Article content, or analytics.

Offer only the newest compatible release allowed by channel preference. Stable installations default to stable-only; previews default to including prereleases. Authors may change the preference and ignore any release indefinitely. Stable outranks previews of the same version. Security classification changes only the warning, never check, download, restart, deadline, or install authority.

Download only after an Author request, using the selected release assets. Validate external metadata before exposing renderer state. Map raw GitHub and Squirrel failures to stable localized errors in main.

## Presentation and recovery

Settings owns permission and automatic-check switches, channel preference, current version, check status, release summary, explicit Check, Download, and Restart actions, and privacy/recovery guidance.

The Article Status Bar and Library utility area show one update controller when relevant. Represent available, downloading, ready, security-warning, and failed states with accessible names and non-color cues. Downloading uses a quiet pulse, with a static busy mark for reduced motion. Clicking opens About Settings and focuses Updates; details and failures stay there.

Restart requires the latest Draft checkpoint and pre-update SQLite snapshot, followed by normal shutdown. Keep prior version and recovery snapshot outside SQLite. Successful startup requires database open, migrations, services, and renderer readiness; retain the previous installed-version snapshot until the next successful update. Squirrel may recover failed installation. After migration, recovery requires reinstalling the prior binary and restoring its matching snapshot.

Linux may discover a matching Debian release and open notes after the same GitHub permission, but exposes no in-app download/apply action. Browser and development builds expose no updater imitation. Percentage rollout, additional channel systems, downgrade migrations, mandatory updates, update analytics, macOS, and ARM64 remain outside this decision.

Test tag and metadata validation, channel ranking, scheduling, security warnings, reduced motion, safe failures, recovery gates, and startup success. Complete installed upgrade and failure drills from the release guide before publication.
