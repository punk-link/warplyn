# Linux installed release acceptance

## AppImage acceptance for issue #54

AppImage installed acceptance is pending. Per the implementation-session decision, WSL is used for automation; GNOME desktop acceptance remains a separate release gate. The primary target is Ubuntu 22.04.5 x64/GNOME/GNOME Keyring. Additional compatibility targets are Ubuntu 24.04 x64/GNOME and Fedora 43 x64/GNOME. No AppImage target is certified by the existing Debian results below. Record exact session, keyring, sandbox, spelling, dialogs, accessibility, upgrade data retention and failed-startup recovery results for each target, following the release guide.

### AppImage automation evidence, 2026-11-14

The uncommitted issue #54 implementation is based on source commit `1928980084dcab8023634b8057d01a1794afdaa4`. The local AppImage is a working-tree test build, not a published release or installed desktop certification.

- Environment: Ubuntu 22.04.3 x86_64 under WSL2, kernel `6.18.58.1-microsoft-standard-WSL2`, 3.8 GiB RAM, two build processors, Xvfb. Packaging uses appimagetool 1.9.1 and type2-runtime 20251108, with pinned SHA-256 digests checked before use.
- AppImage version: `0.8.4-preview.1`; size: `120171000` bytes; SHA-256: `6cc6c01ed7d9c8992414b822cf4308ff0388130e1b14b9592793efb28bf11d27`.
- Debian version: `0.8.4-preview.1`, architecture `amd64`, SHA-256 `a161ac8ae60c7cfcf883d5f08b2122750899637b0e3826e77a7a6a028c641b79`. Both formats contain an identical `app.asar` payload with SHA-256 `0d8dc4cf9fee53a9b652edb443a69fdeee3741cdca98c60ef1a18f36d3203418`.
- Package validation passed for ELF x64, embedded product/version, Linux keyring native module, executable permissions, sandbox-preserving launcher, desktop entry and checksum metadata. The documented optional desktop launcher also passed `desktop-file-validate`.
- Core verification, 48 browser journeys, site build/metadata, product-model checks and final lint/type checks passed on Windows. Windows and WSL desktop gates each passed serially with 11 passed and one visible spelling test skipped. The WSL parallel run timed out in Assistant typing and native file export; a focused serial rerun and then the full serial gate passed without changing timeouts.
- The packaged update journey exercised GitHub permission, compatible AppImage discovery, shared controls and rejection of a corrupt download through real IPC. Unit tests cover successful staging/replacement, retained executable recovery, wrong format/architecture, malformed metadata, redirects, checksum/truncation failures, and checkpoint/snapshot/preparation gates.

Installed GNOME, keyring, accessibility, previous-preview upgrade and failed-startup recovery acceptance remain pending, as do the additional distribution targets. The older Debian evidence below does not satisfy those gates.

## Debian installed evidence

Ubuntu 22.04 x64 with a GNOME desktop and GNOME Keyring is the primary acceptance target for issue #36. Installed acceptance was completed on Ubuntu 22.04.5 x64 in Hyper-V on 2026-11-14. No additional distribution/version is guaranteed. Linux verification and release builds are pinned to `ubuntu-22.04`. Headless CI does not establish GNOME desktop or accessibility acceptance.

The Linux workflow uploads package checksums, source SHA, OS, architecture, date, installed package metadata, resolved libraries and desktop test evidence even after failures. The included checklist remains pending until a reviewer records linked results. CI does not certify the manual rows.

Local environment inspection on 2026-11-13 found Ubuntu 22.04.3 x86_64 under WSL with Xvfb and GNOME Keyring, but no Node executable, installed Warplyn, GNOME Shell or Orca. This is environment discovery only, not an acceptance pass.

Follow [release acceptance](mvp-release-and-recovery.md) and the [testing gates](testing.md) using disposable OS accounts, synthetic writing, and test credentials. Never use a production profile. The package name is `warplyn`, application identity is `com.warplyn.desktop`, executable is `/usr/lib/warplyn/Warplyn`, and default Article storage is `~/.warplyn`.

For each release candidate record the source SHA, package version and checksum, OS/version, desktop session, architecture, Electron version, keyring, date, and evidence links. Mark every row pass, fail, or not run and link defects. Do not record private paths, writing, or credentials.

| Gate | Result | Evidence / defect |
| --- | --- | --- |
| Core and browser journeys | Pass | Automated Quality run linked below |
| Build, apt install, declared dependencies and amd64 metadata | Pass | Linux CI; SSH installation |
| Packaged desktop journeys | Pass | Automated Linux CI |
| Clean setup, launcher, icon and single focused window | Pass, user reported | GNOME walkthrough |
| Sandbox enabled without bypass flags; renderer isolation | Pass, user reported | Linux desktop CI also passed |
| Credentials survive restart; locked and missing keyring guidance | Pass, user reported | GNOME walkthrough |
| Native spelling, dialogs, folder reveal and external links | Pass, user reported | GNOME walkthrough |
| Keyboard and screen-reader walkthrough | Pass, user reported | GNOME walkthrough |
| Offline editing, history, export and explicit Proposal acceptance | Pass, user reported | GNOME walkthrough |
| Restart and Draft recovery | Pass, user reported | GNOME walkthrough before and after upgrade |
| Backup, restore and failed-restore recovery | Pass, user reported | GNOME walkthrough |
| Legacy migration into separate Warplyn storage | Pass, user reported | GNOME walkthrough |
| Second-version apt upgrade and reinstall preserve data and credentials | Pass | SSH package operations and checksum comparisons; user confirmed usability |
| Uninstall preserves data and credentials; filesystem permissions | Pass | SSH checksum comparisons; user confirmed usability and permissions |

## Acceptance evidence, 2026-11-14

Kirill confirmed completion of all remaining manual checks in the issue #36 implementation session. These are user-reported results, not independently observed automation or recorded screen-reader output. No screenshots or recordings were retained for those checks. No remaining defect was reported.

- Environment observed over SSH: Ubuntu 22.04.5 LTS, x86_64, GNOME Shell 42.9, GNOME Keyring 40.0, Orca 42.0, Hyper-V VM.
- Baseline: `0.8.3`, SHA-256 `75e703e4fddf51edd4959d76b23b92086888a42a3681fdda71cb808061e48b19`.
- Candidate: `0.8.4-preview.1`, SHA-256 `f1f0d5195b50664e141f76bc09f168204cf34f18929c3f39aee04cc7027d472c`.
- Packages came from the official [0.8.3 release](https://github.com/punk-link/warplyn/releases/tag/v0.8.3) and [0.8.4-preview.1 release](https://github.com/punk-link/warplyn/releases/tag/v0.8.4-preview.1).
- SSH verified apt upgrade, same-version reinstall, removal without purge, and installation again. With Warplyn closed, all baseline Article-data and desktop-keyring files retained matching SHA-256 checksums after reinstall, removal and final installation. Kirill confirmed writing, Revision history, Draft and saved connection usability afterward. Private backup and manifests remain inside the disposable VM, not in Git.
- [Linux CI and retained evidence](https://github.com/punk-link/warplyn/actions/runs/43597611975), [core/browser CI](https://github.com/punk-link/warplyn/actions/runs/43597611969), and [Windows desktop CI](https://github.com/punk-link/warplyn/actions/runs/43597612006) passed on `9046d95465bff1f8a8005682c9c0ec05f47cda20`, before [PR #122](https://github.com/punk-link/warplyn/pull/122) merged.

This evidence covers the named Ubuntu VM environment. It does not establish physical-hardware compatibility or support for other distributions. Repeat acceptance for future release candidates; this record does not certify untested versions.

Inspect ownership and permissions of installed files and disposable data. Confirm other local users cannot read credentials or private writing. Compare synthetic Articles, Revisions, Drafts and credential availability before and after upgrade, reinstall and uninstall. Keep the desktop keyring intact for the final credential readback after reinstall.

Promote another distribution/version only after completing the same record there. AppImage is owned by #54; RPM, Flatpak, Snap and ARM64 are outside this acceptance.
