# Company and product migration follow-up

Status: manual release acceptance remains open. The 2026-09-30 record reported Warplyn v0.6.0 published and legacy announcement implementation merged in PR #249. Recheck remote state before continuing.

Use this checklist to finish the legacy announcement and archival. The [local-data reference](../reference/local-data-compatibility-and-recovery.md#independent-installations-and-migration) owns installation isolation and compatibility. [ADR-010](../architecture/adr-010-author-controlled-preview-updates.md) owns update authority; the [release guide](../guides/mvp-release-and-recovery.md) owns publication and rollback. The [issue map](../reference/skladno-to-warplyn-issue-map.md) preserves all 60 transferred issue mappings.

## Remaining acceptance

Owner: release maintainer. Record versions, platforms, and pass/fail evidence using disposable Windows and Ubuntu profiles.

- Verify older Windows clients discover and safely install the final legacy announcement through stable-only and preview-inclusive checks. Legacy feeds contain only Skladno packages.
- Restore backups from installed Skladno stable v0.5.5 and preview v0.4.0-preview.3, including default/custom folders, database-only snapshots, and Skills with history. Verify Article, Revision, Draft, Assistant history, publishing profiles, and Settings recovery and unchanged source hashes.
- Install both products together, verify independent launchers and credentials, then uninstall each separately. Author data remains recoverable.
- Verify fresh Warplyn installation with a legacy environment override opens its own data.
- Exercise missing/locked credential services, cancellation, corrupt snapshots/manifests, insufficient space, recovery-snapshot failure, and failed startup. Preserve the source and recover the destination.
- Complete a second-version Warplyn update with checkpoint, recovery snapshot, restart, and retained writing and settings.
- Complete native-picker, keyboard, and screen-reader acceptance for migration links, confirmations, and missing-key guidance.

The pre-announcement installed legacy updater compatibility drill was waived on 2026-09-29. That waiver does not cover the final announcement upgrade drill. Automated checks do not substitute for installed acceptance.

## Publication and archival

Owner: release maintainer. Follow the [testing guide](../guides/testing.md) for changed code and packaged desktop gates.

1. Reconcile outstanding organization Actions policies, integrations, Projects membership/access, and public recovery routes against current remote state. Record results or explicit maintainer waivers.
2. Verify Warplyn assets anonymously and complete installed smoke acceptance. Verify the canonical [migration instructions](../../../site/user-docs/migration.md) have working downloads and recovery links.
3. After acceptance passes, publish the final legacy stable announcement with unchanged legacy installer identity. Verify its migration notice replaces routine update controls, offers only an external Warplyn link, and preserves staged legacy-update recovery. Include migration instructions in release notes for Authors who skip this update.
4. Verify repository introductions, website navigation, old recovery URLs, issue redirects, and the issue map. Preserve the original repository redirect by keeping its former location unused.
5. Retire unnecessary legacy workflows and archive only when the announcement is verified and no further legacy patch is needed. Keep historical release assets public.

The recorded maintainer restriction keeps final legacy publication, workflow retirement, and archival blocked until manual gates pass. This checklist grants no publication authorization.

## Failure handling and completion

If redirects fail, pause the announcement and retain manual legacy downloads. If restore fails, keep the Author on Skladno and retry from the untouched backup after fixing the failure. Never open a Warplyn-migrated database in Skladno.

Correct faulty releases with a new version rather than replacing published installers. Returning to Skladno recovers pre-migration work; later Warplyn writing requires a separate export and is not merged back automatically.

Delete this plan when every gate has evidence or an explicit waiver, publication and archival are reconciled, and lasting decisions are in their owning references. Keep private data and credentials out of evidence.
