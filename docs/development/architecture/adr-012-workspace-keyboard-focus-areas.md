# ADR-012: Workspace keyboard navigation uses focus areas

- Status: Accepted
- Date: 2026-09-18
- Updated: 2026-10-02
- Scope: Workspace and Settings keyboard focus
- Depends on: [ADR-003](adr-003-web-feature-oriented-react-architecture.md)

## Context

Authors need quick keyboard access to major work areas without losing conventional behavior inside editors, menus, toolbars, and dialogs.

## Decision

Tab and Shift+Tab traverse visible focus areas. Each area has a stable entry target, with its last valid focused descendant as fallback. Missing, disabled, collapsed, or hidden entries leave the sequence. Preserve editor caret or selection where supported.

Workspace and Settings have separate area sequences. Areas retain their own keyboard rules and native text-editing behavior; dialogs own focus while open. New controls belong to an existing area or an explicit popup or dialog.

Use shared traversal and restoration while keeping local keyboard handlers feature-owned. No global focus store is required.

## Consequences

Authors can return quickly to the editor and composer. Area-based Tab traversal requires deliberate local navigation and stable entry targets.

## Verification and references

The [design system](../ui/design-system.md#keyboard-focus-areas) owns area order and local key mappings. Test forward and reverse traversal, restoration, hidden entries, dialog focus, and Settings separation. Use the [testing guide](../guides/testing.md) and complete the Electron keyboard pass before release.
