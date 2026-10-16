# Language-aware typography release follow-up

Status: engineering implemented; manual release checks remain.

Architecture and extension procedures now live in [ADR-006](../architecture/adr-006-sqlite-lifecycle-and-recovery.md), [ADR-007](../architecture/adr-007-completion-gated-editorial-engine.md), and the [typography preset guide](../guides/typography-presets.md). Author instructions live in [Editorial Assistant](../../../site/user-docs/editorial-assistant.md#typography-rules).

## Remaining work

1. Obtain native-language review of each candidate before activating it. The candidates are [US English v1](../../../packages/shared/src/style/presets/en-us-v1.ts), [Russian v1](../../../packages/shared/src/style/presets/ru-ru-v1.ts), and [French for France v1](../../../packages/shared/src/style/presets/fr-fr-v1.ts). Check sources, region, quotation nesting, punctuation spacing, unchanged counterexamples, and declared omissions. Record the human reviewer and date alongside approved status. Until then, keep activation disabled and previews labeled as awaiting review. Custom rules remain available.
2. Complete manual screen-reader review of language selection, custom-language entry, inherited-rule controls, and review coverage notices. Automated keyboard and persistence journeys supplement this check.
3. After any preset approval or definition change, rerun its catalog-driven shared and server fixtures and applicable release gates. Preserve any version already used in saved preferences. Delete this follow-up plan once release acceptance is complete.

## Verification record

The implementation includes tests for language and regional isolation, exact preference precedence, explicit custom languages, legacy-rule assignment, immutable snapshots, transactional rollback, Article overrides, version-24 database recovery, captured conventions during generation, protected prose spans, quotation pairs, punctuation spacing, UI drafts, and HTTP/IPC parity. Gate results belong in the implementation handoff; passing tests do not constitute native-language approval.

Final verification on Windows, 2026-10-15:

- Core: `npm run verify:core` passed, including all 342 renderer tests across 76 files with the default parallel settings. Earlier parallel-run timeouts did not recur; assertions, time limits, and worker configuration remain unchanged.
- Browser: all 38 journeys passed after aligning the standard language options. Port 5173 was occupied by an existing development server, so a temporary configuration used port 5174 with matching service origin and clipboard permissions. The first alternate-port run failed two clipboard tests because their grants targeted port 5173; the corrected run passed. Desktop and 760-pixel screenshots were inspected; language, scope, and preset controls fit both layouts.
- Desktop: `npm run package:electron` succeeded, then all 10 desktop journeys passed with one existing hidden-mode skip. A temporary configuration omitted server startup to preserve the existing renderer server on port 5173; native integration tests used it with isolated data. The real native spelling-marker journey still requires visible-window verification.
- Documentation build and final lint passed. Manual screen-reader review and native-language preset approval have not been performed.

Presets have one registration point, `packages/shared/src/style/typography-presets.ts`. Adding a module there supplies previews, rule resolution, and generic fixture coverage. Language pickers use the existing app language options independently of regional presets. This follow-up does not require additional preset-specific code in the app.

Regional language choices are deferred for post-beta consideration in [GitHub issue #89](https://github.com/punk-link/warplyn/issues/89).
