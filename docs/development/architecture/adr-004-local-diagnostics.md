# ADR-004: Local diagnostics use redacted process streams

- Status: Accepted
- Date: 2026-08-19
- Updated: 2026-10-02
- Scope: `packages/server`

## Context

Local operational diagnostics must help diagnose failures without exposing credentials, private Article content, or provider payloads.

## Decision

Use one failure-isolated diagnostics boundary. Write JSON Lines to stdout for successful startup and stderr for failures, using only stable event context and allowlisted safe metadata.

Exclude raw errors and stacks, request URLs and identifiers, request and model bodies, Article content, and environment-variable values. Diagnostic writer failures must not fail the application. Skladno creates no diagnostic log store or renderer settings control; hosts may retain process streams externally.

Remote telemetry is a separate, finite contract. It never forwards local diagnostic context or process streams. Packaged beta consent, sender validation, and delivery restrictions are specified in the [runtime privacy and network policy](../reference/runtime-privacy-and-network-policy.md).

## Consequences

Operators can collect local diagnostics through process tooling without another application data store. Restricted metadata limits diagnostic detail in exchange for protecting Author privacy.

## Verification and references

Test redaction, safe metadata, provider-stage records, and writer-failure isolation. The [runtime policy](../reference/runtime-privacy-and-network-policy.md) owns allowed stage fields; the [testing guide](../guides/testing.md) owns check procedures.
