# ADR-002: Feature-oriented organization of shared contracts

- Status: Accepted
- Date: 2026-08-09
- Updated: 2026-10-02
- Scope: `packages/shared`
- Depends on: [ADR-001](adr-001-three-layer-server-and-electron.md)

## Context

The renderer, local service, and Electron bridge need shared contracts with clear ownership and no privileged runtime dependencies.

## Decision

Organize shared contracts by product feature, with small foundation modules for application clients, transport, persistence records, and cross-cutting concepts.

Shared code may contain schemas, pure validation, constants, domain algorithms, and client interfaces. It contains no server orchestration and imports no Node, Electron, SQLite, filesystem, or provider SDK modules.

Root and feature barrels only re-export. Separate independently named concepts when they have an independent caller or test contract; cohesive protocol unions may remain together. Domain modules may retain compatibility re-exports. Preserve public root exports when moving contracts.

## Consequences

Contracts remain discoverable by domain and reusable across HTTP and IPC. Grouping cohesive protocols avoids file-per-type boilerplate without turning shared code into another application layer.

## Verification and references

Check public imports and privileged dependency boundaries using the [testing guide](../guides/testing.md). Locate current modules through the [agent-work guide](../guides/context-efficient-agent-work.md).
