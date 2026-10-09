# Testing

Use the smallest check that can fail for the changed behavior, then run the applicable gates below. Run commands from the repository root unless a working directory is specified.

## Commands

- `npm run verify:core` runs the product check, complexity check, lint, typecheck, and workspace and script tests. `npm run verify` remains an alias for this core gate; neither command runs E2E.
- `npm run verify:browser` runs Chromium author journeys, also available as `npm run test:e2e`.
- `npm run verify:desktop` runs Electron journeys against development and packaged builds. Build prerequisites are below.
- `npm test --workspace <workspace>` runs the selected workspace tests.
- `npm run lint` checks import boundaries and ESLint rules.
- `npm run complexity:check` fails at cognitive complexity 16 or higher and reports scores 10–15 for review.
- `npm run typecheck` checks the TypeScript project references.
- `npm run product:impact -- <affected paths>` returns capabilities and scenarios that the change must preserve.
- `npm run product:check` validates canonical records, generated inventories, and product-scenario markers in workspace tests.

Use focused tests while editing. Before pushing or handing off source changes, run `verify:core` and the applicable journey gates against the final changes:

| Changed behavior | Additional gate |
| --- | --- |
| UI, accessible names, navigation, or renderer-to-service journeys | `npm run verify:browser` |
| Electron IPC, preload, native integration, packaging, or desktop lifecycle | Package the app, then `npm run verify:desktop` |
| Shared renderer behavior used by desktop journeys | Both browser and desktop gates |

CI uses these same commands. Quality also audits production dependencies; desktop jobs also run Electron unit tests and build platform packages. Linux additionally installs and validates the Debian package. A core pass alone does not establish merge readiness. Report core, browser, and desktop results separately, including platform and any required checks not run. Run browser and desktop journeys sequentially because they use the same web port.

For documentation-only changes, inspect the diff, check local links and referenced paths, verify command examples against package scripts, and run `git diff --check`. Lint, typecheck, and application tests are unnecessary unless executable code or configuration also changes. Product-model edits require `npm run product:docs` followed by `npm run product:check`.

### Focused tests

The workspace runners differ. Appending a file to a script that already includes a test glob still selects the glob's tests.

| Target | Command | Working directory |
| --- | --- | --- |
| Web | `npm test --workspace @skladno/web -- src/workspace/EditorialWorkspace.persistence.test.tsx` | Repository root |
| Server or Electron | `npx tsx --test <relative-test-file.test.ts>` | `packages/server` or `packages/electron` |
| Shared | `node --test <relative-built-test-file.test.js>` | `packages/shared` |
| Repository scripts | `node --test scripts/<name>.test.mjs` | Repository root |

Before shared tests, run `npm run typecheck` from the root to refresh `dist`; these tests execute compiled JavaScript. Select existing test paths and check the workspace's `package.json` if its runner changes.

### Electron verification

Electron E2E keeps the desktop window hidden by default, with renderer background throttling disabled so automation can run without taking desktop focus. On Windows, run `npm run package:electron` before `npm run verify:desktop`; packaging builds both the web renderer and Electron. On Linux, run `npm run make:electron:linux`, install the resulting Debian package, then run `WARPLYN_ELECTRON_EXECUTABLE=/usr/lib/warplyn/Warplyn xvfb-run --auto-servernum npm run verify:desktop`, as CI does. Run the desktop gate again after rebuilding any changed production code.

For visible debugging in PowerShell, set `$env:WARPLYN_ELECTRON_TEST_HIDDEN = "false"` before running the tests, then run `Remove-Item Env:WARPLYN_ELECTRON_TEST_HIDDEN` to restore the default. The real native spelling-marker test requires this visible mode and remains separate from the deterministic synthetic correction test.

Browser E2E does not exercise Electron IPC, preload isolation, native dialogs, credentials, packaging, or shutdown. For changes to these paths, run the relevant Electron and server tests and the affected desktop scenario in the [release guide](mvp-release-and-recovery.md). Report any desktop checks that could not be run separately from browser results.

### E2E failures

Browser and desktop failures retain screenshots, traces, and error context under `test-results/browser` and `test-results/desktop`. CI uploads these directories on failure for seven days. Open a trace with `npx playwright show-trace <path-to-trace.zip>`. Use isolated test fixtures without provider credentials or private Author content.

Reproduce a failure with `npm run verify:browser -- <spec-file>` or `npm run verify:desktop -- <spec-file> --grep <test-name>`. Fix and rerun the focused scenario, then its full gate. Keep locators scoped to the intended control and its displayed accessible name; stored values can differ from display fallbacks. Synthetic spelling suggestions should not depend on dictionary downloads; dedicated dictionary journeys retain real initialization coverage. Increase timeouts only when evidence shows the operation is valid but slow.

## Deterministic AI tests

Provider tests use injected models, fetch implementations, or the deterministic E2E service. They require no API key or network call. Add fixtures at the narrowest existing provider or application boundary. Test stable domain events and safety behavior rather than SDK wording.

Browser Assistant E2E uses the deterministic engine in `packages/server/src/test-support/e2e-service.ts`. Keep `resolveAssistant`, the Editorial integration, capability execution, completion, and persistence in that fixture so browser tests exercise the production Assistant path. Assert the Author-visible result and the persisted Article or Revision after reload. The Windows pull-request workflow also runs `playwright.electron.config.ts` against the packaged app to check the preload and IPC path, request failure, and restart recovery without a provider credential.

For an escaped Assistant regression, add a test that fails on the broken behavior and check one nearby variant, such as selection versus whole Article or tagged versus untagged input. Explain in the change why the previous checks passed.

Cancellation, malformed streams, provider failures, response-storage settings, and structured output must remain deterministic. Persisted generated output is asserted only after a valid completion.

## Product evidence

A test used as automated product evidence marks every protected scenario with `// Product scenarios: <scenario-id>, ...`. The checker rejects missing and unknown markers. Update `product-model/areas` only when capability, status, contract, persistence, or visible behavior changes.

## Manual verification

Automation does not replace visual, keyboard, screen-reader, provider-quality, or recovery checks when those are part of the change. Record the environment, result, and remaining checks without private Article content, credentials, local paths, or raw provider output.

Playwright uses `.e2e-data`, starts its own loopback service and web client, and removes no author-managed data. If a port conflicts, identify its process first. Stop only a task-owned process; coordinate with the user before stopping unrelated work.

