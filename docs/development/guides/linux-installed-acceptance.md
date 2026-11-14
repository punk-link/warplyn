# Linux installed release acceptance

Ubuntu 22.04 x64 with a GNOME desktop and GNOME Keyring is the primary acceptance target for issue #36. Full installed acceptance is pending. No additional distribution/version is guaranteed. Linux verification and release builds are pinned to `ubuntu-22.04`. Headless CI does not establish GNOME desktop or accessibility acceptance.

The Linux workflow uploads package checksums, source SHA, OS, architecture, date, installed package metadata, resolved libraries and desktop test evidence even after failures. The included checklist remains pending until a reviewer records linked results. CI does not certify the manual rows.

Local environment inspection on 2026-11-13 found Ubuntu 22.04.3 x86_64 under WSL with Xvfb and GNOME Keyring, but no Node executable, installed Warplyn, GNOME Shell or Orca. This is environment discovery only, not an acceptance pass.

Follow [release acceptance](mvp-release-and-recovery.md) and the [testing gates](testing.md) using disposable OS accounts, synthetic writing, and test credentials. Never use a production profile. The package name is `warplyn`, application identity is `com.warplyn.desktop`, executable is `/usr/lib/warplyn/Warplyn`, and default Article storage is `~/.warplyn`.

For each release candidate record the source SHA, package version and checksum, OS/version, desktop session, architecture, Electron version, keyring, date, and evidence links. Mark every row pass, fail, or not run and link defects. Do not record private paths, writing, or credentials.

| Gate | Result | Evidence / defect |
| --- | --- | --- |
| Core and browser journeys | Not run | |
| Build, apt install, declared dependencies and amd64 metadata | Not run | |
| Packaged desktop journeys | Not run | |
| Clean setup, launcher, icon and single focused window | Not run | |
| Sandbox enabled without bypass flags; renderer isolation | Not run | |
| Credentials survive restart; locked and missing keyring guidance | Not run | |
| Native spelling, dialogs, folder reveal and external links | Not run | |
| Keyboard and screen-reader walkthrough | Not run | |
| Offline editing, history, export and explicit Proposal acceptance | Not run | |
| Restart and Draft recovery | Not run | |
| Backup, restore and failed-restore recovery | Not run | |
| Legacy migration into separate Warplyn storage | Not run | |
| Second-version apt upgrade and reinstall preserve data and credentials | Not run | |
| Uninstall preserves data and credentials; filesystem permissions | Not run | |

Inspect ownership and permissions of installed files and disposable data. Confirm other local users cannot read credentials or private writing. Compare synthetic Articles, Revisions, Drafts and credential availability before and after upgrade, reinstall and uninstall. Keep the desktop keyring intact for the final credential readback after reinstall.

Promote another distribution/version only after completing the same record there. AppImage is owned by #54; RPM, Flatpak, Snap and ARM64 are outside this acceptance.
