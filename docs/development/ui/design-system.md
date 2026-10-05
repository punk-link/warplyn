# Skladno UI foundation

Use the shared tokens in `packages/web/src/design-tokens.css`, loaded by `packages/web/src/styles.css`, and the shared components in `packages/web/src/ui/primitives.tsx`. Feature code must not introduce raw palette, radius, focus, elevation, font-size, or tracking values.

The [visual atlas](visual-atlas.md) maps typography, color, and visual roles to the token layer. `design-tokens.css` owns token values. Add a genuinely new role to both before using it.

## Components and feedback

Reuse the shared primitives for controls, status, loading, empty states, tabs, temporary focused tasks, and diffs. Preserve their accessible names, keyboard behavior, loading behavior, reduced-motion treatment, and non-color state cues.

`Button` uses compact horizontal and vertical padding by default without reducing its 36px minimum height. Set `compact={false}` only when an action needs wider horizontal padding. Use `IconButton` with a localized `label` for icon-only actions. Its `variant` selects `default`, `secondary`, `quiet`, `danger`, `danger-quiet`, or `toolbar`; `round` selects a circular control. Pass `aria-pressed` for toggle state and use the existing variant styling rather than repeating button classes in feature code. `IconButton` does not provide the loading state supported by `Button`; callers must preserve pending-action disabling where needed.

Use application popup notifications for cross-screen outcomes and background actions. Keep validation and workflow feedback beside the operation that produced it. Notifications do not move focus; use `status` for informational or successful outcomes and `alert` for warnings or errors.

## Accessibility

For copy and locale formatting changes, follow the [internationalization guide](../guides/internationalization.md). For a release accessibility review, use the [walkthrough](../guides/accessibility-release-walkthrough.md) and its [finding routing rules](../guides/accessibility-review-routing.md).

- Resolve application-owned visible and accessible copy through the typed ICU catalog; never use translated text as logic or persisted values.
- Give every focusable control a visible focus indicator, every icon-only control an accessible name, and every status a visible non-color cue.
- Keep controls at least 36px by default; use 44px for sparse icon-only actions where space allows.
- Dense Library context menus use 28px rows for fine pointers and retain at least 36px for coarse pointers. Keep their keyboard focus indicators visible.
- Connect persistent help to its control with `aria-describedby`; tooltips supplement rather than replace labels or essential instructions.
- Recheck WCAG AA contrast whenever a token changes.

## Workspace hierarchy

Keep the Article as the visual and keyboard-order center. Navigation and assistant surfaces are secondary and may collapse; responsive layouts must preserve a comfortable editorial line length rather than permanently narrowing the editor.

Use the established supporting surface, alignment, and quiet scrollbar treatments across workspace regions. Keep intentional empty areas quiet, use real UI icons rather than unrelated glyphs or emojis, and preserve existing controls and responsive states.

## Keyboard focus areas

[ADR-012](../architecture/adr-012-workspace-keyboard-focus-areas.md) owns the area-based navigation decision. Tab and Shift+Tab traverse these visible Workspace areas in order:

1. Library
2. Article header
3. Workspace views
4. Formatting toolbar
5. Article editor
6. Article status
7. Assistant chat
8. Assistant composer

Settings uses its own sequence: Settings navigation, then Settings content. Enter the stable target or fall back to the last valid focused descendant; skip missing, disabled, collapsed, or hidden entries. Restore the editor caret or selection where Lexical supports it. Dialogs own focus while open.

Library uses Up and Down outside Search. Article Header and Article Status use Left and Right. Workspace Views, menus, and the toolbar keep their roving keyboard behavior. Editor, composer, and Search keep native text-editing keys. Assistant chat uses Up and Down to scroll and Left and Right for actionable results.

Shared focus traversal owns movement and restoration. Features retain their local keyboard handlers; new controls belong to an existing area or an explicit popup or dialog. Test both traversal directions, restored targets, hidden entries, local actions, and Settings separation. Complete the Electron keyboard pass before release.

## Canonical feature guidance

Feature behavior belongs in the canonical records rather than this visual foundation:

- [`product-model/areas`](../../../product-model/areas) records capabilities and contracts.
- The UI guardrail references define the [Article Library Panel and Navigation Rail](../../../.codex/skills/skladno-ui-guardrails/references/article-library-panel.md) and [Editorial Assistant Panel](../../../.codex/skills/skladno-ui-guardrails/references/editorial-assistant-panel.md).
- Generated inventories in [`docs/development/product`](../product) summarize the product model and must not be edited directly.
