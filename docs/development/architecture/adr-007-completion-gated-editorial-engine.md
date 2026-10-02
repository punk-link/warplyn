# ADR-007: AI generation is isolated behind a completion-gated Editorial Engine

- Status: Accepted
- Date: 2026-08-21
- Updated: 2026-10-02
- Scope: AI generation, streaming, provider storage, and generated artifact persistence
- Depends on: [ADR-001](adr-001-three-layer-server-and-electron.md), [ADR-005](adr-005-article-state-and-consistency.md)

## Context

Provider streams may fail, be cancelled, or contain invalid output. Provider mechanics must not weaken Author approval, privacy, or application contracts.

## Decision

Application services depend on a provider-neutral Editorial Engine. Infrastructure adapters own provider SDKs, options, tools, metadata, errors, context bounding, and configured model resolution.

Consume and validate the full stream before completion: required text, finish reason, structured output, and domain validation must succeed. Propagate cancellation and expose only safe domain events and errors. Completion has a local identity independent of provider response IDs.

Generated artifacts become durable only after validated completion. Failed, cancelled, empty, malformed, or incomplete operations persist no generated artifact, with one exception: Assistant Fact Check may retain fully researched and evaluated findings after a time limit, individual claim failure, or failed final reply. Findings remain bound to the unchanged base Revision and are marked incomplete if claims remain. Discard unfinished or failed claims; fail normally if none complete.

All Assistant artifact capabilities share one execution and completion policy. Identical calls reuse one generation; conflicting calls fail before another begins. Required reads and authorized actions precede the artifact. A validated artifact ends orchestration without another model reply, but full-stream and application checks still precede persistence.

The deadline covers all completion validation and Revision descriptions. Delivery after committed completion cannot turn success into timeout or cancellation.

Provider response storage is disabled by default where supported. Continuation requires explicit opt-in and matching Article, connection, provider, and model. Local completion identity is never sent to a provider. Raw provider errors, prompts, credentials, Article bodies, and SDK types stay outside application responses and diagnostics.

## Consequences

Providers can change without changing application behavior. Completion checks add adapter work, while partial streams remain temporary presentation state and scoped continuation protects private context.

## Verification and references

Test completion, cancellation, invalid streams, safe errors, scoped continuation, and the Fact Check exception. [Assistant execution and recovery](../reference/assistant-execution-and-recovery.md) owns model routing and continuation eligibility. [ADR-005](adr-005-article-state-and-consistency.md) owns Article changes; use the [testing guide](../guides/testing.md).

