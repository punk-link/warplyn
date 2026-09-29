# Company repository and product-name migration

Status: execution in progress. Prepared 2026-09-28 against version 0.5.5. The original repository was transferred to `punk-link/skladno-legacy` on 2026-09-29, and all 60 open issues moved to the new `punk-link/warplyn` repository. Phase 4 and 5 implementation and automated compatibility checks are complete in the Warplyn checkout. Installed co-existence/uninstall and published-version acceptance remain pending. No release has been published.

## Outcome and decisions

Move stewardship to the company, preserve GitHub conversations, and ship the renamed product as a separate application. Authors explicitly install it and restore their Skladno backup. Their original application, data, credentials, and backups remain available.

Use two public repositories:

| Repository | Purpose |
| --- | --- |
| `punk-link/skladno-legacy` | The transferred original repository, historical issues and PRs, existing releases, and final Skladno announcement release |
| `punk-link/warplyn` | Existing Git history plus renamed-product development, transferred active issues, and a separate release feed |

The Author benefit is continuity of writing and recoverability without a fragile installer upgrade. The tradeoff is a manual installation, backup restore, and API-key setup. GitHub conversations remain accessible, although historical work stays in the legacy repository.

Settled scope:

- Preserve the original repository through GitHub's native transfer. Do not delete it or recreate `kirillta/skladno`.
- Move active issues with native issue transfer after both repositories belong to the company. Do not recreate their comments under a bot account.
- Keep old and new release assets strictly separated. New installers never enter the legacy feed.
- Give the new app a distinct installation identity, data directory, Electron profile, credential namespace, and update source.
- Reuse the existing backup/restore flow for migration. Do not build automatic profile discovery or a second import engine for this beta.
- Preserve compatible database settings and Author Skills. Re-enter managed API keys; do not read or delete legacy secrets.
- Re-select machine-specific backup preferences. This deliberately narrows the earlier suggestion to copy runtime settings, because backup restore already provides the useful content migration.
- Continue the current version sequence for clarity, although separate app identities do not require it. Choose actual versions after checking published tags.
- Do not rename internal workspace package scopes, IPC names, or database schema solely for branding. They are not installation identity and changing them adds no Author benefit.

## Inputs to settle before execution

The maintainer supplies these values once; placeholders below are not commands to execute literally.

| Input | Required decision |
| --- | --- |
| Company organization | GitHub owner with permission to receive the transfer and create repositories |
| Product name and repository slug | Final visible name, `NEW-REPO`, executable name, Debian package name |
| Company application identifier | Stable provider-neutral identifier, preferably based on a company-controlled domain |
| Storage names | New default data-folder name and new environment-variable prefix |
| Public migration URL | Stable page containing installers, backup instructions, and recovery help |
| Versions | Final legacy stable version and first renamed-product version |
| Release owner | Person executing transfer, publication, issue transfers, and desktop acceptance |

Planning does not authorize external changes. Execute those actions only when migration execution is requested. Prepare code and release evidence before publication. Native issue transfers notify participants; include them in the explicitly authorized execution scope.

## Verified pre-migration baseline and owners

Paths in this table are relative to the repository root.

| Responsibility | Current owner and behavior |
| --- | --- |
| Installer identity | `packages/electron/forge.config.js`: Squirrel name and app bundle ID `io.github.kirillta.skladno`, executable `Skladno`, Debian package `skladno` |
| Visible package name | `packages/electron/package.json`: `productName` is `Skladno` |
| Startup and OS identity | `packages/electron/src/presentation/main.ts`: app ID, user-data paths, restore startup, injected GitHub fetch |
| Updates | `packages/electron/src/presentation/updates/desktop-update-coordinator.ts`: legacy discovery URL and separately hardcoded release-download URL |
| Release selection | `packages/electron/src/presentation/updates/desktop-update-releases.ts`: newest compatible stable/preview by asset presence; no mandatory intermediate upgrade |
| Article storage | `packages/server/src/infrastructure/configuration/config.ts`: `SKLADNO_DATA_DIR` or home `.skladno`, database `skladno.sqlite` |
| Runtime settings | `packages/electron/src/infrastructure/runtime/runtime-settings.ts`: backup folder, update preferences/state, pending restore, telemetry consent/identity |
| Native snapshots | `packages/electron/src/presentation/settings/desktop-native-backup.ts`: consistent SQLite snapshot plus `.sqlite.skills` companion directory |
| Restore preparation | `packages/electron/src/presentation/settings/desktop-settings-recovery.ts`: validates and stages backup, checkpoints destination, creates recovery snapshot, restarts |
| Restore commit/rollback | `packages/electron/src/infrastructure/recovery/pending-restore.ts` and `author-skill-backup.ts` |
| Credentials | `packages/server/src/infrastructure/configuration/windows-credential-store.ts` and `linux-credential-store.ts`: OS secrets under the legacy service identifier |
| Settings presentation | `packages/web/src/settings/components/UpdatesSettingsGroup.tsx`, `DataBackupsSettingsSection.tsx`, and `AiConnectionsSection.tsx` |
| Release automation | `.github/workflows/electron-windows.yml`, `electron-linux.yml`, `site.yml`; `scripts/release.mjs` |

Current runtime settings do not persist a selected live data directory, despite the broader relocation contract in ADR-009. Custom source locations currently come from `SKLADNO_DATA_DIR`. Exporting through the running old app avoids guessing where its database is. Do not expand this migration into implementing general data relocation.

The final implementation must follow [ADR-006](../architecture/adr-006-sqlite-lifecycle-and-recovery.md), [ADR-008](../architecture/adr-008-loopback-service-trust-boundary.md), [ADR-009](../architecture/adr-009-native-settings-credentials-and-data-switching.md), and [ADR-010](../architecture/adr-010-author-controlled-preview-updates.md). UI work must follow the [design system](../ui/design-system.md) and [internationalization guide](../guides/internationalization.md).

## Phase 1: inventory and protect the release feeds

Owner: maintainer. No application behavior changes yet.

- [ ] Inventory published releases and tags, including highest stable and preview versions. Verify the current checkout is the intended starting point.
- [ ] Record open issues, labels, milestones, assignees, open PRs, Discussions, wiki, Projects, branch protections, repository rules, environments, integrations, Pages configuration, and package-registry links where present.
- [ ] Save a private Git mirror and a release-asset inventory with checksums. Git alone is not a backup of GitHub issues or releases; export issue/milestone metadata separately for reconciliation.
- [ ] Record the last supported Skladno backup format and an installed-version test matrix. Use disposable content only.
- [ ] Reserve the two company repository names and confirm public release access is allowed by organization policy.
- [ ] Prepare a concise migration page before the announcement release links to it. Until installers exist, it must clearly state that migration is not yet available.

Gate: there is a known legacy release baseline, an artifact inventory, and no ambiguity about which repository may publish each app.

### Phase 1 record, 2026-09-29

- Checkout `4492763b7468186a4229a6890ccb28bc12e32754` matches `origin/main`. The worktree already contained this untracked plan. The highest published stable release is `v0.5.5`; the highest published preview is `v0.4.0-preview.3`. There are 30 published releases and 101 release assets.
- A private mirror and GitHub metadata exports are in the maintainer's `skladno-migration-private` folder outside the repository. The mirror passed `git fsck --full --no-reflogs`. `release-assets.csv` records each asset URL, byte size, and GitHub-published SHA-256 digest. The binaries were not downloaded, so those digests have not been independently recalculated. `issues-and-prs.json`, `issue-comments.json`, `pulls.json`, `review-comments.json`, `milestones.json`, `labels.json`, and `issue-reconciliation.csv` support transfer reconciliation. Git does not contain those records.
- At inventory time there were 156 issues, 60 open issues, no open PRs, 9 labels, and 17 milestones. Branches and repository settings were exported. The repository reports no Discussions, Pages is not enabled, and the `main` branch has no protection or repository ruleset. `Production` and `github-pages` environments exist. Workflow permissions default to read. No webhooks were returned. The wiki flag is enabled, but its Git repository was not found. Project inventory requires a token with `read:project`, and package inventory requires `read:packages`; project membership and package links still need a maintainer check. GitHub App integrations could not be enumerated with this token.
- Last observed native backup format is a `.sqlite` snapshot with an adjacent `.sqlite.skills` directory and manifest format `1`. Older database-only `.sqlite` snapshots remain accepted. The checkout's latest database migration is version `22`; snapshot validation checks known applied migrations, integrity, and foreign keys. Installed-version testing remains to be done on disposable Windows 11 x64 and Ubuntu 22.04 x64 profiles: latest stable `v0.5.5`, highest preview `v0.4.0-preview.3`, and an older database-only backup source. Record backup/restore results and source hashes without private content.
- The migration page is at `site/user-docs/migration.md`, with `https://warplyn.com/docs/migration.html` chosen as its stable public URL. It says migration is unavailable until replacement installers and tested instructions exist. Site deployment is still pending.
- `punk-link` is the chosen organization; the repository slugs are `skladno-legacy` and `warplyn`. The authenticated maintainer is an active organization admin. Neither destination repository currently exists, and the organization allows members to create public repositories. Its existing public repositories show public repository access is in use. Organization Actions policy could not be read with the current token; check it before enabling release workflows. The legacy destination must remain uncreated for GitHub's native transfer, so name availability is verified but cannot be guaranteed until transfer. The `warplyn` repository is also deferred to Phase 3, when the plan calls for creating it with Actions disabled before history import.
- The maintainer authorized the Phase 2 transfer on 2026-09-29 with the recorded inventory limitations. `punk-link/skladno-legacy` alone may publish Skladno installers; the future `punk-link/warplyn` repository alone may publish renamed-app installers. Final product identity and installed-version migration checks remain requirements for later phases.

## Phase 2: transfer the original repository

Owner: maintainer. Depends on phase 1 and confirmed organization/name inputs.

- [x] Use GitHub's native repository transfer to move `kirillta/skladno` to `punk-link/skladno-legacy`. Keep it public.
- [x] Update local remotes and review collaborator permissions and assignees because personal-to-organization transfers can clear assignments for nonmembers.
- [x] Compare issues, comments, milestones, PRs, Discussions, tags, release assets, and repository settings with the inventory. Verify representative old URLs still resolve.
- [ ] Check organization Actions policies, workflow permissions, deployment environments, and installed integrations. Existing secrets may transfer, but company access and policy still need validation.
- [x] Verify the `Production` environment and `SKLADNO_POSTHOG_PROJECT_KEY` release configuration without printing secrets.
- [ ] Verify Pages and the existing `warplyn.com` recovery/documentation routes separately. Repository redirects do not migrate Pages routing. Keep old recovery links functional.
- [x] Waived by the maintainer on 2026-09-29: the installed legacy updater compatibility drill. Anonymous legacy API and asset downloads were verified separately.
- [x] Do not recreate a repository at `kirillta/skladno`, even as a redirect placeholder.

Gate: the repository transfer and anonymous legacy API/asset checks succeeded. The maintainer waived the installed legacy updater compatibility drill on 2026-09-29 and authorized Phase 3. Public documentation recovery and restricted policy/integration checks remain outstanding before publication.

GitHub documents preserved repository assets and URL redirects, and warns that reusing the original location deletes redirects. This does not substitute for the native updater drill. [Repository transfer documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository).

### Phase 2 record, 2026-09-29

- Native transfer completed through `gh api` with `new_owner=punk-link` and `new_name=skladno-legacy`. Repository ID `1315173608`, public visibility, and `main` commit `4492763b7468186a4229a6890ccb28bc12e32754` are preserved. The checkout's `origin` now uses `https://github.com/punk-link/skladno-legacy.git`. The private pre-transfer mirror remains unchanged.
- Before/after exports are in the private archive's `phase2` folder. Issue and PR issue-record comparisons found no changes to IDs, numbers, titles, bodies, state, comment counts, labels, assignees, milestones, or authors. All 92 PRs, 30 releases, 17 milestones, 9 labels, and 15 issue comments retain their IDs. Milestone descriptions/due dates, label colors/descriptions, and comment bodies/timestamps match. All branch/tag refs and all 101 asset names, sizes, and published digests match. Discussions remain disabled; there were no review comments. The wiki remains unverified as recorded in Phase 1.
- `kirillta` retains admin access. Organization access now also grants `vasiariabov` admin and `Dronsan89` and `Alpha17Skirata` write access. No permissions were changed manually. Issue assignments match the immediate pre-transfer inventory.
- Repository Actions remain enabled with all actions allowed; workflow permissions remain read and cannot approve PRs. Both `Production` and `github-pages` environments remain present. `Production` contains a nonempty `SKLADNO_POSTHOG_PROJECT_KEY`; its value was not printed. Repository and Production secret listings are empty. Repository rulesets and webhooks remain empty; `main` remains unprotected. Organization Actions policy requires `admin:org` scope, and installed GitHub App integrations still require a separate authorized settings check.
- Anonymous requests to the original release API, issue `168`, and release `v0.5.5` resolve successfully to the transferred repository. The original `v0.5.5/RELEASES` and full `.nupkg` download URLs work. Downloaded SHA-256 hashes exactly match the Phase 1 inventory: `e3410c0030fcf511105f8e20d049632885f5e2089826084585e3d54c35020cb7` and `0139206fe0e4d1950c4bc980159fdd830d7046eefe1bea07b833242b40f4623e` respectively.
- Pages is disabled, matching the pre-transfer inventory. Site run `36445502932` failed on 2026-09-28 before transfer because Pages was not enabled. On 2026-09-29, the public update-recovery, backups-and-recovery, and migration routes all returned HTTP `421 Misdirected Request` through Cloudflare with an nginx response. Hosting/domain recovery remains outstanding; repository redirects do not repair it.
- The maintainer waived the installed legacy updater compatibility drill on 2026-09-29 and authorized Phase 3. It was not executed. Public documentation recovery and restricted organization-policy/integration checks remain outstanding before publication. No releases were published and no repository was recreated at the old location.

## Phase 3: create the new repository and move active work

Owner: maintainer. The repository transfer is complete; the installed updater compatibility drill was explicitly waived. Publication checks remain separate.

- [x] Create an empty public `punk-link/warplyn`. Disable Actions before importing refs so old workflows cannot publish legacy installers or deploy the old website from the new repository.
- [x] Push the existing Git history and intended branches/tags. Do not copy release assets or blindly mirror GitHub-owned refs. Mark historical tags as inherited history, not renamed-app downloads.
- [x] Keep license notices and contributor attribution. Update ownership metadata without rewriting history.
- [x] Copy labels with their descriptions/colors. Recreate milestones needed for active work with matching titles and exact due dates, preserving descriptions and state where applicable.
- [x] Test one approved active issue transfer. Verify its conversation, attachments, author attribution, assignment, labels, milestone, and old-URL redirect before transferring the rest.
- [x] Transfer remaining active issues and record an old-to-new issue URL map. Issue numbers can change. Native transfer requires both repositories to have the same owner.
- [x] Keep closed issues and historical PRs in the legacy repository. No active PRs required reopening.
- [x] Keep the historical repository linked from the new README. Discussions are disabled and no published wiki was found; no discussion or wiki content was moved.
- [ ] Review Projects separately. User/organization Projects are not Git commits; verify transferred issues' project membership, fields, and access. Retain the existing board if usable rather than rebuilding it by default.
- [x] Rewrite active documentation references such as bare `#168` to mapped new issues or fully qualified legacy URLs. Do not edit old comments or commits solely to renumber references.
- [x] Configure branch protections, environments, collaborators, and required checks in the new repository. Actions remains disabled until the workflows are corrected in Phase 4.

Example for an individually reviewed issue:

```powershell
gh issue transfer https://github.com/COMPANY/skladno-legacy/issues/123 COMPANY/NEW-REPO
```

Gate: every active issue is accounted for, comments remain attached to their authors, destination milestones are correct, and historical work remains reachable. GitHub preserves comments and assignees on native issue transfer, with label/milestone matching rules. [Issue transfer documentation](https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/transferring-an-issue-to-another-repository).

### Phase 3 record, 2026-09-29

- Created public `punk-link/warplyn`, repository ID `1396442300`, and disabled Actions before pushing any refs. Imported `main` at `77a83700c6664751bc33d8421438c32a9f3dd21c` and the legacy repository's 34 tags. One additional local-only tag was removed from the destination after reconciliation. Old feature branches and GitHub-owned refs remain in legacy; no release assets were copied. The new README identifies inherited tags as history and states that no Warplyn installers exist.
- Copied all nine labels with exact descriptions and colors. Recreated the ten milestones referenced by open issues with matching titles, descriptions, states, and due dates. All ten source due dates were unset, and remain unset.
- Pilot transfer `skladno-legacy#247` became `warplyn#1`; its attachment returned HTTP 200 and its legacy URL redirected correctly. Then transferred all remaining open issues natively. The [issue URL map](../guides/skladno-to-warplyn-issue-map.md) records all 60 mappings. All 60 authors, creation times, titles, labels, assignments, and milestone titles reconciled. None had comments. GitHub qualified or remapped issue references in bodies during transfer; all other body content matched. `warplyn#6` lost its milestone during native transfer and was restored to `P8 — Editorial intelligence` before final verification.
- Legacy retains 96 closed issues, 92 historical PRs, and 30 releases. There were no open PRs to reopen. The private `phase3` archive contains before/after exports, the CSV URL map, and `verify-transfer.ps1`, which passed against the final exports.
- The new repository inherits the same four collaborators and roles. `main` requires PRs, conversation resolution, and current `verify`, `verify-windows`, and `verify-linux` checks; force pushes and branch deletion are disabled. Administrator bypass remains available. Default workflow permissions are read and cannot approve PRs. Empty `Production` and `github-pages` environments exist; no credentials or telemetry configuration were copied. Actions remains disabled, with zero workflow runs and zero new releases. Enable corrected workflows only after Phase 4 release identity and feed changes.
- The public legacy Projects page shows no linked open or closed projects. Private project membership and fields remain unverified because the token lacks `read:project`; do not claim private Projects were reconciled. Discussions are disabled, and no published wiki was found. Historical repository links remain in the new README.
- Legacy organization issue URLs redirect to new issues, including `skladno-legacy#12` to `warplyn#2` and `skladno-legacy#168` to `warplyn#41`. Tested earlier `kirillta/skladno/issues/...` URLs returned HTTP 404 after issue transfer, including a closed historical issue. The original repository URL still redirects correctly. Active documentation uses direct new or legacy URLs; old comments and commits were not edited.
- New-repository preparation is in `C:/Projects/warplyn`. The original checkout remains pointed at `punk-link/skladno-legacy`; switching the user's project is a separate step. Application branding, installer identity, provider namespaces, update feeds, and publication remain Phase 4 or later work.

## Phase 4: build the independently installed renamed app

Owner: implementation maintainer, in the new repository. Depends on identity decisions; can proceed while active issues are reconciled.

- [x] Change visible branding, icons if supplied, package metadata, installer filenames, shortcut labels, Debian metadata, site copy, and localized app references.
- [x] Set distinct Squirrel package identity, executable, app ID, Debian package/binary identity, Electron `userData` location, default data directory, and credential service identifier on both supported platforms.
- [x] Use the new environment prefix for the live data directory. Do not silently fall back to `SKLADNO_DATA_DIR`, which could make both apps open the same database. Document the new override and refuse known legacy-directory targets during migration.
- [x] Keep the database filename and schema compatible unless a functional need requires changing them. Storage-directory separation provides isolation without a schema rename.
- [x] Point both discovery call sites and the download base at `punk-link/warplyn`. Update recovery/help links, release workflow titles, Linux homepage assertions, and release asset checks.
- [x] Keep the ordinary author-controlled update flow in the new app, including channel selection, checkpoint, snapshot, and restart safeguards.
- [x] Give the new app fresh runtime update state and fresh network/telemetry consent. Never reuse the old telemetry installation ID or pending recovery records.
- [x] Configure the new repository's release environment explicitly. Do not turn inherited old tags into releases by rerunning unmodified legacy workflows.

Installed acceptance pending: both apps can be installed and launched independently, with separate profiles and credential namespaces. Uninstalling either leaves the other's installation and both sets of Author data intact. An update check in either app cannot select the other app's releases.

## Phase 5: migrate through the existing backup and restore flow

Owner: implementation maintainer. Depends on phase 4 storage isolation.

The supported beta journey is explicit and uses existing controls:

1. In Skladno, finish or cancel active AI work and close/reopen the app to ensure the latest Draft checkpoint has completed. Stop external edits to Author Skill files during backup creation.
2. Select a private migration backup folder in Data & backups and create a manual backup from the active Skladno profile. This works even when its data directory was overridden.
3. Keep the `.sqlite` file and its adjacent `.sqlite.skills` directory together, with their original names. Close Skladno after backup creation.
4. Install and launch the renamed app into its separate empty profile. In Data & backups, select the migration backup folder and restore the Skladno snapshot. Confirm the replacement and restart.
5. Verify Articles, latest Draft, Revision history, Assistant history, settings, publishing profiles, and Author Skills before doing new writing.
6. Add managed AI connections again and select the replacement connections/models for the affected roles. Existing connection metadata may remain, but the old secrets are not available in the new namespace.
7. Select a separate ongoing backup folder for the new app. Keep the migration backup and legacy backups untouched. Choose update-network and telemetry preferences again.
8. Keep Skladno installed until the Author verifies the import. Subsequent edits belong to the app in which they were made; there is no synchronization or merge.

Implementation work and checks:

- [x] Prove that the new app accepts legacy backup filenames, schema versions, and Skill manifests. Reuse `createNativeBackupRestoration` and the existing staged restore/rollback code.
- [x] Preserve legacy manifest format identifiers even when visible branding changes. Validate content and supported schema, not the new product-name prefix.
- [x] Test the native backup pair and older database-only snapshots. Explain that database-only backups cannot restore Skill files they never contained.
- [x] Preserve all compatible SQLite settings and history without rewriting immutable Revisions. Do not claim that machine/runtime preferences are included in the backup.
- [x] Verify imported managed connections without secrets report a useful missing-key state. Prefer the existing Add connection and role-selection flow over adding credential migration or a new secret editor.
- [x] Preserve environment-variable references as metadata, but never copy `.env` files or values. Document that environment-provided connections depend on the new process environment.
- [x] Leave legacy credential entries untouched, including when removing imported connections in the new app.
- [x] Ensure restore cancellation, invalid snapshots, corrupt Skill manifests, insufficient disk space, and failed startup leave the destination recoverable and the source backup unchanged.
- [x] Support migration into a fresh profile. If the new app already contains work, require its existing backup/replacement confirmation; do not attempt database merging.
- [x] Keep all filesystem operations and native pickers in Electron main. Any necessary UI changes use existing Settings layout, localized accessible controls, and stable actionable errors. Diagnostics contain no private content, credentials, or identifying paths.

Installed acceptance pending: the full journey succeeds on disposable Windows and Ubuntu profiles, and source data/backup hashes remain unchanged by restore. There is no dependency on copying a live WAL-mode database or sharing its directory.

### Phase 4 and 5 implementation record, 2026-09-29

- Confirmed identities: visible product/executable `Warplyn`, Squirrel/app/credential ID `com.warplyn.desktop`, Debian package `warplyn`, Electron profile `Warplyn`, default data folder `.warplyn`, configuration prefix `WARPLYN_`, and release repository `punk-link/warplyn`. Existing icons and contributor/license attribution remain; no replacement artwork was supplied. Internal workspace scopes, IPC names, protected translation tokens, database filename, schema migrations, and backup format identifiers remain compatible.
- Warplyn ignores the legacy data override for live storage. A shared startup guard rejects known legacy default/override overlap in either direction, including canonical junction and symlink aliases. Runtime update state and telemetry consent are separate; telemetry starts disabled without an installation ID. Both credential adapters use the new namespace. Native Windows Credential Manager and a disposable Ubuntu Secret Service session proved identical connection IDs cannot read or delete legacy entries.
- Both GitHub discovery call sites and the download base use the new repository. Release selection rejects legacy package identities. Current release workflows reject checked-out legacy product metadata and validate new asset identities. `Production` has an explicitly configured `WARPLYN_POSTHOG_PROJECT_KEY`, without exposing its value. Actions remains disabled and there are zero Warplyn releases. Local test artifacts use version `0.5.5`; the first published Warplyn version must exceed inherited `v0.5.5`.
- Reused native selection, checkpoint, staging, recovery snapshot, restart, validation, commit, and rollback. The disposable migration test restores a legacy-named backup pair and a database-only snapshot, including Article/Revision/Draft/Assistant records, publishing profiles, managed/environment connection metadata, and Skill files/history. It verifies missing managed-key guidance, unchanged source SHA-256 inventories, no `.env` import, no runtime consent/update-state import, and safe recovery-snapshot failure with an induced `ENOSPC` error. Existing tests cover cancellation, incompatible/corrupt snapshots, manifest corruption, and startup rollback. Older-schema validation/migration leaves the source schema unchanged.
- The source-integrity check found that read-only SQLite validation could create WAL sidecars beside a backup. Validation now opens a private temporary copy and cleans it up. The restored destination uses the existing migrations; immutable Revisions are not rewritten. The legacy `v0.5.5` schema and recovery owners match the pre-change checkout; migration introduces no schema or format rename.
- Windows: Squirrel setup executable, `RELEASES`, and `com.warplyn.desktop-0.5.5-full.nupkg` built successfully. The packaged Assistant IPC/failure/restart scenario passed. Ubuntu 22.04 x64 in WSL: server/Electron compatibility tests passed, `warplyn_0.5.5_amd64.deb` built, package/homepage/architecture/native-module checks passed, and the installed Debian application passed the same restart scenario with its installed sandbox helper. No sandbox protections were disabled. Native credential namespace checks passed on both platforms.
- Verification: product records, complexity, lint, typecheck, script/server/shared/Electron tests, build, site build, 17 browser E2E cases, and packaged desktop checks passed. `npm run verify` passed once; later default-parallel runs hit an unrelated existing five-second Assistant UI timeout under concurrent build load. The full same 53-file/242-test UI suite passed with `vitest run --maxWorkers=2`; the focused final source checks passed. Private logs and SHA-256 artifact evidence are retained outside Git.
- Removed the task-installed Ubuntu Warplyn package after its installed restart test. SHA-256 checks of disposable `.warplyn` and `.skladno` SQLite data passed after uninstall, and the Warplyn executable was removed. This proves new-package uninstall retention on Ubuntu; it does not claim the two-installed-products matrix or Windows uninstall pass.
- Author instructions are in `site/user-docs/migration.md` at the confirmed public URL `https://warplyn.com/docs/migration.html`. The locally rendered page clearly says installers are unpublished. Site calls to action point to migration status. Deployment remains blocked by the previously recorded HTTP 421 hosting problem; no site or release publication occurred. Lasting storage, credential, consent, feed, and recovery contracts are recorded in ADR-006/009/010 and the release guide.
- Remaining installed acceptance: both products installed together and independently uninstalled on disposable Windows/Ubuntu profiles; the full manual backup journey from installed stable `v0.5.5` and preview `v0.4.0-preview.3` (including custom-source locations); native-picker/keyboard/screen-reader acceptance; and a second-version Warplyn update drill. Automated compatibility and installed Ubuntu restart checks do not claim these passes. Keep the phase gates open until this evidence exists; the legacy updater compatibility drill alone was waived earlier.

## Phase 6: ship the final Skladno announcement release

Owner: implementation maintainer and release owner, in the legacy repository. Prepare in parallel; publish only after new installers and migration instructions are available.

- [ ] Keep every legacy installer identity, executable, data path, credential namespace, and backup format unchanged.
- [ ] Add a clear About/Updates notice and explicit external action, such as `Download NEW NAME`, linking to the stable migration page. State that this installs a separate app and requires backup restore and API-key setup.
- [ ] In this final build, replace routine update discovery/download controls with the migration notice. Do not fetch the new release feed, automatically download the new installer, or launch it.
- [ ] Update any shared update-state contract, status-bar controller, key binding, and localized copy needed so the final build does not retain misleading check/download actions. Preserve startup recovery completion for users arriving through a staged legacy update.
- [ ] Publish a normal legacy stable release greater than every supported published legacy version. Include the existing installer, `RELEASES`, full `.nupkg`, and Debian package. Stable publication makes the announcement reachable from stable-only and preview-inclusive clients.
- [ ] Put migration instructions in its release notes as well. Older builds can read them without first installing the final build; Linux users continue to install packages manually.
- [ ] Do not assume users will install this final build. The backup journey must also work from tested earlier Skladno versions with supported backup formats. Users with checks disabled can use the website and manual downloads.

Gate: a real older Windows installation discovers only the final Skladno release, updates safely, and then offers the external new-app download. Neither that build nor older builds ever receive renamed-app packages from the legacy feed.

## Phase 7: release validation and publication order

Owner: release owner. Use the [testing guide](../guides/testing.md) and [release guide](../guides/mvp-release-and-recovery.md).

For implementation in each repository, first run product impact against its actual changed owner paths. Update matching `product-model/areas` records only when implementing changed behavior; regenerate inventories rather than editing them. This plan alone does not mark capabilities implemented.

Required automated checks for the completed changes:

```powershell
npm run verify
npm run test:e2e
npm run build
npm run build:site
```

Run `npm run product:docs` before verification when product records changed. Package with `npm run make:electron` on Windows and `npm run make:electron:linux` on Linux. Add focused checks to the existing update, Settings, backup/restore, configuration, and credential-adapter tests for changed behavior; do not build a new migration test framework.

| Manual drill | Required result |
| --- | --- |
| Old installation after repository transfer | Installed compatibility drill waived by the maintainer on 2026-09-29; anonymous API and asset checks passed |
| Stable-only and preview-inclusive checks | Final legacy stable release is discoverable; no new-app package appears |
| Fresh new install with legacy environment override present | New app opens its own data, never the old database |
| Default and custom legacy data source | Export contains the actual source profile; restored content is complete |
| Backup with current Skills and Skill history | Both restore and validate alongside the database |
| Missing/locked OS credential service | Editing and recovery work; key setup gives actionable guidance |
| Restore cancel, corruption, failure, restart | Destination recovers; original app and migration backup remain unchanged |
| New app update to a second test version | New feed discovery, download, checkpoint, recovery, and restart work |
| Both apps installed; uninstall each separately | Independent launchers; neither installation deletes Author data |
| UI keyboard and screen reader pass | Migration notice, links, confirmation, and missing-key guidance are usable |

Publish in this order:

1. Complete transfer and legacy redirect drill.
2. Complete new-app packaging and backup compatibility tests using local/CI artifacts.
3. Publish the first new-app release in the new repository. Verify assets anonymously and complete an installed smoke test.
4. Publish the finished migration page with working download links and recovery instructions.
5. Publish the final legacy announcement release and verify its installed upgrade path.
6. Update both READMEs, website navigation, and download links. Preserve old recovery URLs.
7. Finish active issue transfers, verify links and Projects, and stop legacy feature development.
8. Disable unnecessary legacy deployment/release workflows. Archive the legacy repository only after the announcement and issue migration are verified and no further legacy patch is needed. Keep all release assets public.

Do not add code signing, a custom update service, automatic secret migration, or a database merge system to this project. Existing unsigned-distribution guidance remains accurate.

## Failure handling and completion

If transfer redirects fail, pause the announcement rollout and keep manual legacy downloads available while fixing the observed problem. If new-app restore fails, keep the Author on Skladno; retain the failed destination for recovery only as needed and retry from the untouched backup after a fix. Do not point Skladno at a database migrated by the new app.

If the renamed release is faulty, publish a corrected release and update download guidance. Do not overwrite a published version with different installer contents. Returning to Skladno recovers the pre-migration state; writing done later in the new app requires a separate export and is not automatically merged back.

Completion requires recorded pass/fail evidence for both supported desktop baselines, an issue URL map, verified legacy and new release feeds, and accessible migration/recovery documentation. Record versions and outcomes, not private data or credentials.

After implementation, move lasting compatibility and release decisions into ADR-006/009/010 and the release guide, add Author-facing instructions under `site/user-docs`, and delete this completed plan. Unfinished work remains explicitly listed; no capability is declared complete solely because code or a release exists.
