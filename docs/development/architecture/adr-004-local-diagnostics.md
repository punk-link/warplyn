# ADR-004: Local diagnostics use redacted process streams

- Status: Accepted
- Date: 2026-08-19
- Scope: `packages/server`

## Context

Skladno needs local operational diagnostics for service startup, recoverable
failures, and backup failures. Its logs must not expose API keys,
environment-variable values, or private Article and model bodies.

## Decision

The server has one diagnostics boundary. It writes JSON Lines to stdout for
successful startup and stderr for failures. It records only stable event
context and safe error metadata. It excludes raw error messages, stacks,
request URLs, identifiers, request bodies, Article bodies, model bodies, and
environment-variable values.

The diagnostics boundary catches its own failures. It does not create a log
file, retain logs, or add a renderer-visible settings control.

Editorial adapters record provider-step and verification stages through this boundary. Stage records contain only fixed stage names, elapsed milliseconds, allowlisted finish reasons and failure categories, and validated HTTP failure status codes. They contain no request identifiers or provider payloads. These fixed public values are not scrubbed against arbitrary environment substrings, which could otherwise corrupt stage names and timestamps. SDK stream-error callbacks use these records instead of the SDK's default raw-error logger.

## Consequences

During the public beta, the packaged Electron runtime may separately emit only the versioned, allowlisted remote telemetry contract with installation-local default-on consent that the author can revoke at any time. It must not forward local diagnostic context or stdout/stderr, and missing delivery configuration remains a no-op.

Host process and system logs can collect diagnostics without a second local
data store. Operators who need retained or routed logs configure that outside
Skladno.

## Verification

`packages/server/src/infrastructure/diagnostics/local-diagnostics.test.ts`
checks redaction, safe error metadata, and writer-failure isolation.
