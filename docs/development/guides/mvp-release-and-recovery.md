# MVP release, recovery, and limitations

Use this guide to prepare and verify the browser-based local-first MVP and unsigned Windows and Debian Electron previews. Ubuntu 22.04 x64 is the Linux release-validation baseline. Do not put credentials, an author's Article, or a production database in release evidence.

## Release checklist

1. Start from a clean worktree and install the locked dependencies with `npm ci`.
2. Run the release checks:

   ```powershell
   npm run lint
   npm run typecheck
   npm test
   npm run verify:browser
   npm run build
   npm run product:check
   ```

3. Complete the [accessibility release walkthrough](accessibility-release-walkthrough.md). Its unresolved manual blockers must have an explicit release decision and linked follow-up.
4. Run the clean-profile journey below using a new, empty `WARPLYN_DATA_DIR`. Use a disposable provider credential supplied outside the repository, or verify the non-AI steps without one.
5. Create a manual backup in a private test folder and complete the recovery drill. Record only command results, versions, and pass/fail outcomes.

## Clean-profile manual author journey

Set a new empty data folder for the local service, copy `.env.example` to an untracked `.env` only when AI verification is in scope, then run `npm run dev` and open `http://localhost:5173`.

1. In Settings, verify General, Key bindings, AI, Publishing, and Data & backups open. Select a backup folder that is private to the test account and create a manual backup.
2. Create an Article named `Release check` with the body `A short public release fixture.` and save a Revision.
3. Request an editorial improvement. Confirm the Article remains unchanged until a Proposal is explicitly accepted; accept it and confirm a new Revision appears.
4. In Revisions, restore the initial Revision and confirm restoration appends another Revision instead of rewriting history.
5. Request a fact check. Confirm Findings are advisory, cite sources, and do not alter the Article.
6. Configure a translation language, create a translation, and confirm it opens as a linked, independently editable Article.
   For translation freshness, configure Spanish and German, request both, and accept both as linked Articles. Save a source edit and confirm both show Outdated while their text and History remain unchanged. Open each translation and check its source-change warning. Regenerate Spanish, review its output, select Update existing translation, and confirm the named target. Confirm its title remains unchanged, History contains the old and new Revisions, and only Spanish becomes Current. Restore its earlier Revision and confirm it becomes Outdated again. Repeat with a retained target Draft and with a source edit during generation; neither may overwrite accepted text. Cancel a multi-language request and confirm no queued requests start and completed results remain available. Request another translation from an unchanged source and confirm creating it preserves existing translations.
7. Use the Status Bar Copy control for Markdown and plain text. Confirm it copies output only; it must not publish to a platform.
8. Restart the service and confirm the Articles, Revisions, settings, and backup policy remain available.

Mark a step failed if it silently changes the Article, loses Revision history, exposes a credential, or cannot be recovered. Capture a linked defect rather than substituting private content in the report.

## Article file acceptance

Use disposable Articles and files for these checks:

- In Windows and Ubuntu packaged apps, verify real open/save/cancel dialogs, overwrite confirmation, unreadable input, unwritable destinations, Unicode filenames and content, whole historical Revision export, and restart recovery.
- In the browser, verify picker cancellation and reselection, download preferences, later download-manager cancellation, and accurate download-started feedback.
- In both runtimes, verify header and Library file actions, Tab/Shift+Tab focus areas, screen-reader names and notifications, and collapsed/responsive Article and Revision controls.
- Repeat import/export in Markdown, HTML, DOCX and RTF with paragraphs, bold/italic, nested lists, numbering starting above one, links, quotes, code and Unicode. Check native Save As file-type selection and matching extensions. Open DOCX and RTF exports in Word or LibreOffice, then import independently created files. Confirm supported text remains editable, complex page layout can simplify, and cancelling the import review leaves the current Draft intact.

On 2026-10-02, the maintainer reported all manual checks from the Article Markdown files plan passed. This records maintainer acceptance; repeat the checks for future releases when file operations change.

The added HTML, DOCX and RTF formats require fresh packaged Windows/Ubuntu dialog and Word/LibreOffice acceptance. Automated converter, browser and production-bridge checks do not replace that manual pass.

## Recovery drill

This drill proves recovery from a backup snapshot; it intentionally replaces the active database. Use the clean-profile data folder, not a maintainer's working data.

1. In Electron or the web app, choose **Restore a backup** in Data & backups and select a manual backup from the configured folder.
2. Confirm the selected filename and replacement warning. Electron restarts; the web app reloads after the loopback service reopens the restored database.
3. Verify the Article, Revision history, Draft checkpoint, Assistant history, style data, and Settings state from before the backup are present.
4. Repeat with an incompatible snapshot and confirm the active data remains available after the failure.
5. Record pass/fail, the application revision, OS and browser version, and the backup filename. Do not record the data-folder path if it identifies an author or shared location.

If backup creation fails, leave the active database alone, check the folder permission, and retry. Browser backups require a browser with directory-picker support and retained folder permission. Manual backups are never removed by automatic-backup retention.

## Release boundaries

Verify local data and recovery against [ADR-005](../architecture/adr-005-article-state-and-consistency.md) and [ADR-006](../architecture/adr-006-sqlite-lifecycle-and-recovery.md). Verify diagnostics, AI completion and storage, and renderer isolation against [ADR-004](../architecture/adr-004-local-diagnostics.md), [ADR-007](../architecture/adr-007-completion-gated-editorial-engine.md), and [ADR-008](../architecture/adr-008-loopback-service-trust-boundary.md).

The supported releases are the browser-based local-first MVP and the unsigned Windows and Debian previews described below. Ubuntu 22.04 x64 is the Linux release-validation baseline; compatible Debian-based distributions may use the same package. The [cross-cutting inventory](../product/cross-cutting-inventory.md) owns deferred product boundaries. Publishing profiles remain guidance and Copy remains the only publishing action.

## Windows Electron preview

The release target is Windows 11 x64. Stable releases and prereleases are unsigned, so Windows may show a SmartScreen warning. GitHub release updates are optional and author-controlled. Stable builds default to stable-only updates, preview builds default to including prereleases, and About Settings can change the channel. Signing remains in [warplyn#41](https://github.com/punk-link/warplyn/issues/41). Native backup folder selection, Explorer reveal, and manual snapshots use the restricted desktop Settings client.

Build the unpacked application with `npm run package:electron`, or build the Squirrel.Windows installer with `npm run make:electron`. Both commands build the existing React application first. The packaged renderer uses local IPC and does not require the loopback HTTP server.

The release workflow uses the `WARPLYN_POSTHOG_PROJECT_KEY` variable from the GitHub `Production` environment. Set it to the approved public capture key. The workflow fixes the endpoint to `https://us.i.posthog.com/batch`; it never packages an admin token. A missing variable blocks a telemetry-enabled release rather than making an installed app depend on a shell variable. Before release, manually verify the packaged Settings switch through opt-out, restart, re-enable, offline delivery, and shutdown with a pending Draft checkpoint. Verify PostHog account access, retention, IP handling, and stored payloads only in that authorized release workflow.

Environment-variable credentials remain supported. Managed credentials use Windows Credential Manager and never enter SQLite, backup snapshots, or renderer responses. The installer does not create or import a `.env` file.

Run `npm run release` for the next stable patch or `npm run release:preview` for the next preview. Both commands generate release notes, show the proposed notes and security classification, ask for review approval, run core and browser checks, and commit the approved notes with the version changes before tagging and atomically pushing. Use `npm run release -- 1.2.3` for an explicit stable version or `npm run release:preview -- 1.2.3` for the next preview of that base. Run from `main` with authenticated GitHub CLI and a clean worktree. Only the current release's notes may be uncommitted when resuming. Export `OPENAI_COMMIT_GENERATION_KEY` in the release terminal. For the first Warplyn release only, append `--previous-tag v0.5.5` after reviewing the migration baseline.

Each command fetches tags, reads published release metadata, and generates an Author-focused draft through OpenAI when no draft exists for the selected version. It sends bounded repository source diffs and commit evidence, excludes credentials, binaries, and test data, and requests response storage disabled. Large comparisons use bounded batches followed by consolidation against product contracts. The key stays in the release process and is never needed by the app or publisher. `OPENAI_COMMIT_GENERATION_MODEL` can override the default `gpt-6-luna`; the selected model must support Responses, structured output, and medium reasoning. Add `--manual`, for example `npm run release -- --manual`, to create an empty draft without an API call, fill it in, then rerun the same command. Generation failure saves no new record.

Generated entries use `bugFix: true` for evidenced corrections and `bugFix: false` for other changes. Review this classification with the wording and commit evidence. Fixes appear under Bug fixes, after Changes when both are present. Manual entries can use the same flag; older records without it retain their existing format.

To preview the current tree against a specific version, including uncommitted source changes, run `npm run release -- --compare v0.7.0` or `npm run release:preview -- --compare v0.7.0`. Comparison mode prints the actual generated summary and security suggestion, writes evidence to Git's local `release-notes-preview.json`, and exits without approval, version changes, commits, tags, or publication. Comparison previews are explicitly unreviewed, cannot be released, and create no tracked release record.

Inspect the displayed notes, generated `release-notes/<version>.json`, the printed review file, and relevant `git show <commit>` diffs. Compare the net result with the baseline. Each entry has plain-language `text` and a nonempty `commits` array of full in-range commit IDs. Combine related Author-visible changes and exclude engineering-only or reverted work, regardless of subject prefix. Use plain text without HTML, links, Markdown formatting, or line breaks inside entries. The rendered bullet list must fit 8,000 characters. When no changes affect Authors, `maintenanceOnly` must be `true` and `entries` empty; verify this decision before accepting the maintenance message. Generated drafts retain `reviewed: false`. Type `yes` at the terminal prompt to approve the displayed notes and security classification and continue. Any other response cancels the release without versioning, tagging, or pushing. To correct a draft, cancel, edit the record, leave `reviewed: false`, and rerun the same release command. It reuses the draft without another API call. Preserve its pinned baseline and source commits. Noninteractive runs stop for unreviewed notes; review the saved record and explicitly set `reviewed: true` before rerunning in that environment. The command commits the reviewed record automatically.

Review the generated `security` flag alongside the notes. A security release fixes an evidenced vulnerability in shipped Warplyn, including a vulnerable dependency. Security mentions, general hardening, and routine dependency updates alone do not qualify. When `security` is `true`, `securityReason` gives a brief plain-text justification and `securityCommits` lists supporting in-range commits. Those commits must also support a visible release-note entry, and `maintenanceOnly` must be `false`. When `security` is `false`, keep `securityReason` empty and `securityCommits` empty. Correct the classification before setting `reviewed: true`; the model never approves publication.

The reviewed security flag adds `.security` to a preview version and tag, for example `v1.2.3-preview.1.security`. Keep the record's version and filename unsuffixed, such as `release-notes/1.2.3-preview.1.json`. The next ordinary preview increments the preview number without inheriting the suffix. The existing security tag format supports previews only; a security-classified stable record blocks release with instructions to use a preview instead. Validation rejects intervening product changes, unfinished records, out-of-range evidence, and tags that disagree with the security flag before changing versions or publishing. Checks also reject source or note edits made during verification. If a draft becomes stale, remove the unfinished record, commit the product changes, and rerun the release command to generate a fresh draft. Do not reuse a stale review. A failed verification leaves the approved notes available for a retry without regenerating them.

Both release commands require a clean worktree, validate committed notes, update both package versions and the lockfile, run core and browser verification, commit, tag, and atomically push the commit and tag. CI publishes only when the tag points to a commit already contained in `main`; tags created on feature branches are rejected until their commit reaches `main`. Both platform jobs render the record from the tag and use its body unchanged. An existing matching release can receive assets on retry. A mismatched body, channel, or tag commit stops publication; inspect the published release and intended tag before retrying rather than overwriting its notes.

If a tag was pushed before its commit reached `main`, wait until it is contained in `main`, then dispatch from `main`: `gh workflow run electron-windows.yml --ref main -f tag=v1.2.3`. A rejected tag push does not trigger again when its commit later merges.

For each stable Windows release, CI generates and validates WinGet manifests from the built installer and saves a `winget-v<version>` workflow artifact. Complete the disposable installation, upgrade, and uninstall checks before submitting it using the [WinGet submission procedure](../../../distribution/winget/README.md). Preview releases do not generate WinGet manifests.

### Desktop acceptance scenario

Before releasing spelling changes, use synthetic prose and a disposable Electron profile to check native underlines, right-click and keyboard suggestion menus, screen-reader announcements, focus/caret restoration, correction undo/redo, Draft restart recovery, and explicit immutable Revision save. Verify code and raw URL exclusions, readable links, Article language changes, and Proposal staleness after save. Repeat on Windows and Linux packages; browser coverage does not prove native behavior.

In Spelling Settings, prepare multiple regional dictionaries, check initialization and failure/retry states, then restart offline and verify reuse. Return to an Article and confirm only its language or system fallback is active. Add and remove synthetic technical terms from Settings and the native menu, exercise bulk partial failures, and verify restart persistence without Article changes. Check desktop and narrow Settings layouts. Remove all test words afterward because Windows also changes its OS custom dictionary. Verify that Article restore leaves installation-local spelling data intact.

Inspect native dictionary network destinations and request metadata with synthetic input for the shipped Electron version. Confirm no Article text or personal words are transmitted. Keep raw traffic captures outside commits. Hidden Chromium automation may suppress spelling context data even for a plain textarea. `e2e/electron-spelling.spec.ts` supplies spelling menu parameters for the correction callback test but uses real native replacement, Lexical input, undo/redo, and persistence. Its Russian suggestions scenario uses actual native spelling context and verifies both suggestions and the personal-dictionary action; run it with `WARPLYN_ELECTRON_TEST_HIDDEN=false`. Electron 43 can report `spellcheckEnabled=false` while providing a misspelled word and suggestions, so the menu uses those native results. Keyboard menus remain manual acceptance checks.

Implementation checks passed on Windows 11 x64 with Electron 43.4.1 in October 2026 for native dictionary preparation, offline cache reuse, personal-word restart persistence, renderer language/exclusion behavior, correction callback/Draft/Revision integration, and packaged Spelling Settings, including its narrow layout. Hidden-window screenshot capture after viewport emulation stalls, so the narrow layout uses accessible-control and overflow assertions. Visible detection, keyboard menus, screen readers, synthetic traffic inspection, and Linux packaged acceptance remain release checks.

Run this pass with a disposable `WARPLYN_DATA_DIR` and no private content:

1. Install and launch the x64 preview. Record the expected unsigned-app warning. Confirm the Desktop and Start menu shortcuts are created, the workspace opens, then launch Warplyn again and confirm the existing window restores and receives focus.
2. Complete the clean-profile author journey above through Article creation, Draft checkpointing, Revision save and restore, Proposal acceptance, fact checking, translation, Settings, theme changes, keyboard navigation, and Copy. In Settings, add a managed API key, verify its connection, restart the app, verify it again, then remove the inactive connection. Confirm the key is held only in Windows Credential Manager and the app does not start the HTTP server.
3. Open HTTP and HTTPS links and confirm they use the system browser. Confirm file and custom-scheme navigation does not open. Test light and dark themes and the Windows 11 keyboard accessibility pass.
4. Remove the configured provider credential, retry an AI operation, and confirm the UI reports the unavailable configuration without exposing provider details. Repeat while offline, cancel an in-progress request, and confirm incomplete output does not change the Article.
5. Edit the active Article and close the window before the normal checkpoint delay. Restart and confirm the Draft reopens. Exercise the failed-checkpoint dialog with a disposable unwritable or conflicted fixture and verify both returning to the Article and explicitly quitting without the latest checkpoint.
6. Restart and confirm Articles, Drafts, Revisions, Settings, Findings, and completed Assistant output persist. Upgrade or reinstall over the same data directory and repeat the check.
7. In Data & backups, request Delete all local data and cancel the native confirmation; verify the disposable data is unchanged. Repeat with Create backup and delete, confirm the app exits, and verify only the disposable data directory was removed. Restart to confirm a new empty local profile opens.
8. With a separate disposable profile, uninstall Warplyn. Confirm the installer removed the application but left that profile’s `.warplyn` directory unchanged, then remove the disposable data manually.

### Preview update drill

Compare the actual GitHub Release body with About Settings in the installed older version. Check a release with visible changes, an explicit maintenance-only release, and unavailable details using isolated fixtures where needed. Confirm summaries longer than 1,000 characters remain complete, text wraps in narrow Settings, HTML-like text stays literal, and update actions remain usable when details are missing. Verify keyboard and screen-reader access to the version heading and actions. The packaged automated journey uses a test-owned Electron network fixture and real IPC; it does not replace this installed upgrade drill.

Create a public GitHub prerelease with the setup executable, `RELEASES`, and full `.nupkg`. Install an older preview into a disposable profile, create an Article, Draft, Revision, and Settings change, then use About Settings to allow update network access, check, explicitly download, and Restart and update. Confirm all data reopens and the update status becomes current.

Exercise failed discovery, failed download, and failed snapshot paths. A failed checkpoint or snapshot must leave the existing preview open. For a failed upgraded startup, follow the public [update recovery guide](https://warplyn.com/docs/update-recovery.html): reinstall the previous preview and restore its matching pre-update snapshot. Record old and new versions, Windows architecture, pass/fail, recovery result, and remaining checks without private paths or Article content.

Mark the desktop pass failed if the renderer gains Node, filesystem, database, credential, or unrestricted IPC access; if generated content changes an Article without approval; or if install, upgrade, reinstall, or uninstall changes `.warplyn` data.

## Debian Electron preview

The release-validation target is Ubuntu 22.04 x64. Compatible Debian-based distributions may install the same package when their glibc and Secret Service environment are compatible, but become guaranteed targets only after this pass succeeds there. Build the Debian package with `npm run make:electron:linux`. Install the `.deb` through the system package manager; About Settings can, with the author's permission, check GitHub for a newer matching Debian release and open its release notes. Installation remains a manual package-manager upgrade or `.deb` reinstall.

Run the Desktop acceptance scenario above on an installed `.deb`, using GNOME Keyring or the distribution's Secret Service for the managed-credential checks. Also verify locked and unavailable Secret Service states leave Article editing and environment-variable connections usable, launcher integration opens one focused window, file picking and folder reveal work, and upgrade, reinstall, and uninstall preserve the disposable `.warplyn` data. Record the package version, distribution and version, architecture, pass/fail, and remaining checks without credentials, Article content, or private paths.

## Warplyn migration release boundary

`punk-link/warplyn` publishes only Warplyn packages. The inherited tags contain Skladno source and are not Warplyn releases; never dispatch a release against one. Current release workflows reject legacy product metadata before packaging. Continue the existing version sequence: the inherited stable baseline is `v0.5.5`, so the first published Warplyn version must be newer. Local migration test artifacts can use `0.5.5` without being published.

Use the supported [migration procedure](https://warplyn.com/docs/migration.html): export through Skladno's manual backup, install Warplyn separately, restore with native replacement confirmation, re-add managed API keys, select replacement connection/model roles, and choose backup/network/telemetry preferences again. Never copy a live WAL database, runtime settings, `.env` values, or legacy credentials. Keep both profiles and source backup pairs available.

Before publication, record independent install/launch/uninstall results for both apps, the installed Skladno `v0.5.5` and `v0.4.0-preview.3` backup journeys, and a second-version Warplyn update drill. Automated restore, credential, and packaging checks do not replace those installed acceptance gates. Publish Warplyn installers and the working migration page before the final legacy announcement. Do not enable site or release deployment while the public documentation routes remain broken.
