# Typography presets

Add a preset as one versioned module in `packages/shared/src/style/presets`, then register it in `typography-presets.ts`. This catalog is the only preset registration point. The resolver, validation, configuration UI, and review paths consume its data. Language pickers use the existing app language options; a regional preset does not add another language entry. Article metadata validates language tags independently of the preset list, so custom conventions work without a built-in preset. Adding a preset using existing rule kinds requires no changes to those consumers.

Export a `TypographyPreset` with a stable ID and version, BCP 47 language tag, concrete preview, stable rule-slot IDs, sources, omissions, and source/expected examples. Rule IDs identify conventions that Authors can override or disable. Reuse an existing slot ID when replacing that convention; use separate IDs for disjoint punctuation classes.

Start with `review: { status: "pending" }`. Pending presets appear as previews and cannot be activated through HTTP, IPC, or the UI. A native-language reviewer checks the cited conventions, regional scope, examples, preserved counterexamples, and omissions. Only then record `status: "approved"`, the reviewer's name, and the review date. This is human review, not a claim established by passing automated tests.

Run the shared resolver/validation tests and the server's `typography-language.test.ts`. That test iterates the catalog's examples and verifies idempotence and protected content. Add focused cases where a new convention exercises an untested rule interaction. Follow the [testing guide](testing.md) for final gates.

Once a version has been used in saved preferences, retain its module and registration unchanged. Publish changed conventions as a new version. Existing selections continue using the older definitions; upgrading is an explicit Author choice.

New rule kinds are a separate engine change and require contract validation, deterministic matching, rule-conflict handling, localized controls, and tests. Presets cannot contain executable matchers, provider calls, or arbitrary regex supplied by Authors.

Language resolution uses the Article language, explicit known-name aliases, and exact saved language preferences. A saved `en` preference may explicitly select an `en-US` preset. There is no implicit regional fallback. Typography settings stay in the existing corpus/profile history, and Article overrides stay separate from free-text Article guidance. Each review captures its effective rules and provenance once; neither model prompts nor recovery reread mutable preferences.
