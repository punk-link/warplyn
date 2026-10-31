# Testing

## Test-change explanations

The local release command explains changes to tests, fixtures, snapshots, and Playwright/Vitest
configuration before the release approval prompt. It prints the explanation and saves
`release-test-changes.md` under the Git metadata directory, outside committed release notes.
It describes changed expectations and potentially lost protections; it does not execute tests
or approve the change. Existing verification gates still run before publication.

The report uses local `OPENAI_COMMIT_GENERATION_KEY` and `gpt-6-luna`, matching release-note generation.
It sends changed test patches and changed `packages/` implementation patches to OpenAI with
`store: false`. It compares the release record's previous commit with its exact source commit and includes source links.
Inputs above the size limit produce an explicit unavailable report rather than a partial explanation.
Nonstandard test filenames and unchanged helpers can leave gaps; explanations must acknowledge uncertainty.

No CI key or workflow is needed. Generation failures stop release preparation before approval or
publication. Retry, or use the existing `--manual` release mode and inspect the test diff yourself.
Manual mode records explicitly that no AI explanation was generated. Already-reviewed release
notes still receive a fresh test explanation on rerun.

Use the smallest check that can fail for the changed behavior, then run the applicable gates below. Run commands from the repository root unless a working directory is specified.

## Commands

- `npm run verify:pr -- 83` resolves PR #83's current base through GitHub CLI and checks the prepared PR branch, including staged, unstaged, and untracked changes. It runs core verification and browser journeys. Omit the number to use the current branch's PR. Add `--desktop` when the journey table below requires Electron coverage. GitHub CLI must be authenticated; Chromium must be installed with `npx playwright install chromium`.
- `npm run verify:core` attempts every static check, reports their results together, then runs workspace and script tests only when all static checks pass. It does not run E2E.
- `npm run verify:browser` runs Chromium author journeys.
- `npm run verify:desktop` runs Electron journeys against development and packaged builds. Build prerequisites are below.
- `npm test --workspace <workspace>` runs the selected workspace tests.
- `npm run lint` checks changed JavaScript and TypeScript lines against a 160-character limit, import boundaries, and ESLint rules. Functions and constructors allow at most nine parameters. Structured TypeScript declarations and object literals, including inferred return objects, allow at most 20 data properties, counting inherited, intersected, and spread keys once each. Callable members, including arrow-function properties and optional or nullable callbacks, are excluded as methods; members that can hold other non-callable data still count. Explicit lookup tables use an index signature or mapped key type through a type annotation or `satisfies` and are exempt. Property checks cover entire modified functions, including unchanged return blocks. Legacy violations outside modified functions and declarations do not block unrelated changes. Nested groups must represent coherent domain concepts, not generic wrappers. CI compares the pull request's base and head commits; locally, lint checks staged and unstaged changes against `HEAD`.
- `npm run complexity:check` fails at cognitive complexity 16 or higher and reports scores 10–15 for review.
- `npm run typecheck` checks the TypeScript project references.
- `npm run product:impact -- <affected paths>` returns capabilities and scenarios that the change must preserve.
- `npm run product:check` validates canonical records, generated inventories, and product-scenario markers in workspace tests.

### PR comparison and final verification

Both changed-code checkers print their comparison scope. With no refs, local lint compares against `HEAD`; this does not check earlier commits on the branch. With both `BASE_SHA` and `HEAD_SHA`, they compare those commits as CI does. With only `BASE_SHA`, they compare the current working tree against its merge base with that commit, including all PR commits and local edits.

Use `verify:pr` while fixing a PR so a clean local diff cannot hide failures elsewhere in the PR. It obtains the current base commit, fetches it if missing, and checks that the current branch matches the PR. It prints the candidate HEAD and distinguishes dirty working-tree verification from a clean committed candidate. After the final commit, rerun it and push that same verified commit. Rerun after any further edits, commits, rebases, or base changes.

To reproduce an existing CI failure, read the failed step's log and use its exact base and head SHAs. Run independent static checks even if the first one fails; `verify:core` now does this automatically. Do not describe a HEAD-only local pass as CI-equivalent PR verification.

On Windows, `verify:pr -- 83 --desktop` packages Electron before running desktop journeys. On Linux, build and install the package first as described below, then run the command with `WARPLYN_ELECTRON_EXECUTABLE` set under `xvfb-run`. Core, browser, and desktop outcomes must still be reported separately.

Use focused tests while editing. Before pushing or handing off changes on a PR, run `verify:pr` against the final changes and add `--desktop` when the table below requires it. For work without a PR, run `verify:core` and the applicable journey gates:

| Changed behavior | Additional gate |
| --- | --- |
| UI, accessible names, navigation, or renderer-to-service journeys | `npm run verify:browser` |
| Electron IPC, preload, native integration, packaging, or desktop lifecycle | Package the app, then `npm run verify:desktop` |
| Shared renderer behavior used by desktop journeys | Both browser and desktop gates |

CI uses these same commands. Quality also audits production dependencies; desktop jobs also run Electron unit tests and build platform packages. Linux additionally installs and validates the Debian package. A core pass alone does not establish merge readiness. Report core, browser, and desktop results separately, including platform and any required checks not run. Run browser and desktop journeys sequentially because they use the same web port.

In CI, Quality runs core and browser verification in separate jobs. The browser job builds shared contracts before starting its service. The required `verify` check passes only when both jobs succeed.

For documentation-only changes, inspect the diff, check local links and referenced paths, verify command examples against package scripts, and run `git diff --check`. Lint, typecheck, and application tests are unnecessary unless executable code or configuration also changes. Product-model edits require `npm run product:docs` followed by `npm run product:check`.

### Focused tests

The workspace runners differ. Appending a file to a script that already includes a test glob still selects the glob's tests.

Pure renderer logic tests opt into Node with `// @vitest-environment node`. Tests that exercise the DOM or editor rendering retain the default jsdom environment.

| Target | Command | Working directory |
| --- | --- | --- |
| Web | `npm test --workspace @skladno/web -- src/workspace/EditorialWorkspace.persistence.test.tsx` | Repository root |
| Server or Electron | `npx tsx --test <relative-test-file.test.ts>` | `packages/server` or `packages/electron` |
| Shared | `node --test <relative-built-test-file.test.js>` | `packages/shared` |
| Repository scripts | `node --test scripts/<name>.test.mjs` | Repository root |

Before shared tests, run `npm run typecheck` from the root to refresh `dist`; these tests execute compiled JavaScript. Select existing test paths and check the workspace's `package.json` if its runner changes.

### Electron verification

Electron E2E keeps the desktop window hidden by default, with renderer background throttling disabled so automation can run without taking desktop focus. On Windows, run `npm run package:electron` before `npm run verify:desktop`; packaging builds both the web renderer and Electron. On Linux, run `npm run make:electron:linux`, install the resulting Debian package, then run `WARPLYN_ELECTRON_EXECUTABLE=/usr/lib/warplyn/Warplyn xvfb-run --auto-servernum npm run verify:desktop`, as CI does. Run the desktop gate again after rebuilding any changed production code.

Hidden desktop journeys use two workers with separate data and profile directories. The `native-dictionary` project runs its files serially because OS personal vocabulary is shared across profiles. Visible desktop runs use one worker. Use `npm run verify:desktop -- --workers=1` to compare serial timings.

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

