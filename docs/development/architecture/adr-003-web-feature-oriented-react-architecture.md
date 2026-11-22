# ADR-003: Feature-oriented organization of the web renderer

- Status: Accepted
- Date: 2026-08-09
- Updated: 2026-10-03
- Scope: `packages/web`
- Depends on: [ADR-001](adr-001-three-layer-server-and-electron.md), [ADR-002](adr-002-shared-contract-organization.md)

## Context

Authors need predictable interaction across the Workspace and Settings. A single component owning rendering, state, and orchestration makes changes harder to isolate.

## Decision

Organize the renderer by feature, then by responsibility.

Views and components render prepared state and invoke explicit callbacks. Feature state owns browser-side loading, recovery, streams, and workflow coordination. Screen roots compose these responsibilities.

The application shell chooses Workspace, Settings, and Style Profile screens. Workspace state remains mounted across those transitions so Draft checkpoints, background requests, and desktop close handling keep their lifetime. Workspace views receive prepared state; Workspace state receives activation and navigation callbacks without importing Settings or application screen names.

Apply availability gates to the screen that needs the unavailable data. Article loading and errors gate the Workspace view, while Settings and Style Profile render independently. Workspace loading and error views expose Settings directly. A late Article result updates Workspace state without replacing the open application screen or Settings section.

UI accesses application behavior through the injected typed application client or narrow desktop clients. It does not call server routes or privileged modules directly. Cross-cutting renderer services do not import feature components or feature state.

`packages/web/src/application/` owns feature-independent renderer clients and adapters. Application shell components, including Quick Start, live outside that directory. The import-boundary check enforces this direction for production modules.

Prefer loading content on demand. List and navigation operations return only the metadata they need; full content loads when editing, previewing, comparing, or exporting requires it. Filter and limit data at the persistence layer before loading it into application memory or sending it to the renderer. Preserve Draft recovery, ignore stale loading responses, and provide clear loading and retry states. Eager loading is appropriate for small, bounded data or when it avoids noticeable interaction delays.

Extract code for an independent caller, test contract, or visual responsibility. Keep local helpers beside their only caller and preserve established ownership when adding behavior. Reuse the typed ICU catalog, semantic tokens, shared UI primitives, and existing Article-changing state paths. Additional stores, clients, event buses, or runtime abstractions require a demonstrated need.

## Consequences

Authors keep explicit controls and consistent UI behavior. Focused ownership costs some navigation but keeps privileged work outside React and avoids duplicating application logic.

## Verification and references

Use the [design system](../ui/design-system.md), [agent-work guide](../guides/context-efficient-agent-work.md), and [testing guide](../guides/testing.md). Check dependency direction and affected desktop and responsive interactions.
