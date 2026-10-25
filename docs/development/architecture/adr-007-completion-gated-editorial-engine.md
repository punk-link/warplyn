# ADR-007: AI generation is isolated behind a completion-gated Editorial Engine

- Status: Accepted
- Date: 2026-08-21
- Updated: 2026-10-25
- Scope: AI generation, streaming, provider storage, and generated artifact persistence
- Depends on: [ADR-001](adr-001-three-layer-server-and-electron.md), [ADR-005](adr-005-article-state-and-consistency.md)

## Context

Provider streams may fail, be cancelled, or contain invalid output. Provider mechanics must not weaken Author approval, privacy, or application contracts.

## Decision

Application services depend on a provider-neutral Editorial Engine. Infrastructure adapters own provider SDKs, options, tools, metadata, errors, context bounding, and configured model resolution.

All App Model generations run as background work, including titles, Revision descriptions, Proposal summaries, and action-intent checks. Authors can keep editing and navigating while generation runs. Save, acceptance, restoration, and their resulting navigation must complete after the required local persistence without waiting for supporting generated metadata. Show an appropriate local fallback or pending state, then expose validated output when available.

Background execution preserves completion and authorization gates. A dependent action, such as a mutation requiring an action-intent check, remains pending until its prerequisite succeeds; unrelated work stays available. Bound generation time, handle failure and cancellation, and discard results whose target was deleted or whose captured state no longer permits the update. Keep Author edits and immutable Revision records intact. Late failure must not turn an already committed operation into a failure. Define whether interrupted work retains a fallback or resumes after restart for each operation.

This is the required direction for App Model work. Proposal-acceptance descriptions follow it; existing title generation and other callers still require review before claiming full compliance.

The explicit typography-only Style review uses a local engine before provider resolution. Mechanical rules operate on conservatively identified prose spans. Full Style review combines these corrections with validated contextual output in one Proposal. Completion retains the captured profile version and rule provenance. Local checking, recovery, and Proposal descriptions make no provider calls.

Typography resolves from the persisted Article language, exact language preferences, and Article overrides, independently of the interface locale. Missing or unconfigured languages never inherit English conventions. Editorial and Assistant preparation capture the effective definitions, language, preset version, sources, and configuration fingerprint once. Bounded capability execution carries that same capture. Only applicable contextual instructions accompany compact style guidance to the provider; other language configurations remain local. Recovery preserves captured evidence, while language or preference changes prompt rerun without reinterpreting the existing Proposal. Preset mechanics and release review follow the [preset guide](../guides/typography-presets.md).

Consume and validate the full stream before completion: required text, finish reason, structured output, and domain validation must succeed. Propagate cancellation and expose only safe domain events and errors. Completion has a local identity independent of provider response IDs.

Generated artifacts become durable only after validated completion. Failed, cancelled, empty, malformed, or incomplete operations persist no generated artifact, with one exception: Assistant Fact Check may retain fully researched and evaluated findings after a time limit, individual claim failure, or failed final reply. Findings remain bound to the unchanged base Revision and are marked incomplete if claims remain. Discard unfinished or failed claims; fail normally if none complete.

All Assistant artifact capabilities share one execution and completion policy. Identical calls reuse one generation; conflicting calls fail before another begins. Required reads and authorized actions precede the artifact. A validated artifact ends orchestration without another model reply, but full-stream and application checks still precede persistence.

The explicit AI operation's deadline covers all required completion validation. Background App Model work has its own bounded lifetime and cannot extend that operation's completion wait. Delivery after committed completion cannot turn success into timeout or cancellation.

Provider response storage is disabled by default where supported. Continuation requires explicit opt-in and matching Article, connection, provider, and model. Local completion identity is never sent to a provider. Raw provider errors, prompts, credentials, Article bodies, and SDK types stay outside application responses and diagnostics.

## Consequences

Providers can change without changing application behavior. Completion checks add adapter work, while partial streams remain temporary presentation state and scoped continuation protects private context.

## Verification and references

Test completion, cancellation, invalid streams, safe errors, scoped continuation, and the Fact Check exception. [Assistant execution and recovery](../reference/assistant-execution-and-recovery.md) owns model routing and continuation eligibility. [ADR-005](adr-005-article-state-and-consistency.md) owns Article changes; use the [testing guide](../guides/testing.md).

