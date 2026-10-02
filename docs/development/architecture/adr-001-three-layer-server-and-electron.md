# ADR-001: Three-layer server architecture and Electron readiness

- Status: Accepted
- Date: 2026-08-08
- Updated: 2026-10-02
- Scope: `packages/server`, shared application contracts, and Electron integration

## Context

Authors need the same local-first behavior in Electron and the development browser, with credentials and local data isolated from the renderer.

## Decision

Separate the local service into presentation, application, and infrastructure.

- Presentation validates and adapts HTTP or IPC requests, streams domain events, and maps safe errors.
- Application owns use cases and product invariants through narrow, feature-owned ports. It imports no transport, database, filesystem, configuration, or provider implementations.
- Infrastructure implements those ports and owns privileged systems.
- Composition roots construct infrastructure and inject application services into presentation. Presentation does not construct or directly depend on persistence repositories.

Both runtimes reuse the same application behavior and SQLite persistence. Shared contracts are transport-neutral and renderer-safe under [ADR-002](adr-002-shared-contract-organization.md). Electron exposes a finite, context-isolated bridge under [ADR-008](adr-008-loopback-service-trust-boundary.md).

Keep services focused, group dependencies by responsibility, and name operations for their domain effect consistently across ports and callers. Additional abstractions require a demonstrated need.

## Consequences

Authors get consistent behavior across runtimes. Explicit composition requires some wiring, but no dependency-injection container, service locator, event bus, CQRS layer, or aggregate repository facade.

## Verification and references

Adapter and import-boundary checks must prove renderer-safe contracts and shared application behavior. Use the [agent-work guide](../guides/context-efficient-agent-work.md) to locate current owners and the [testing guide](../guides/testing.md) for checks. [ADR-005](adr-005-article-state-and-consistency.md) owns Article consistency; [ADR-007](adr-007-completion-gated-editorial-engine.md) owns generated-output completion.
