# ADR-011: Assistant uses skills through bounded application capabilities

- Status: Accepted
- Date: 2026-08-30
- Updated: 2026-10-02
- Scope: Assistant skills, application capabilities, tool execution, Workspace handoffs, and generated artifact completion
- Depends on: [ADR-002](adr-002-shared-contract-organization.md), [ADR-003](adr-003-web-feature-oriented-react-architecture.md), [ADR-005](adr-005-article-state-and-consistency.md), [ADR-007](adr-007-completion-gated-editorial-engine.md), [ADR-008](adr-008-loopback-service-trust-boundary.md)

## Context

Authors need conversational access to editorial work while retaining dedicated Workspace review, explicit approval, minimum-context handling, and recoverable state.

## Decision

Use a server-owned allowlist of narrow application capabilities. Each declares validated input, permitted context, prerequisites, result type, and execution policy. Assistant tools and deterministic Workspace entry points reuse application operations; neither exposes routes, repositories, or service objects to the model.

Classify every Author-facing Editorial Workspace operation as callable, a Workspace handoff, or explicitly excluded. Evaluate new transport operations against that policy; registration never grants Assistant authority. Bounded discovery searches only this classified catalog, cannot widen authority, and must not substitute a nearby operation for an unavailable outcome.

Every run starts with an explicit Author request and has bounded steps and time. Revalidate scope, arguments, prerequisites, and base Revision at execution. Deterministic mutation additionally requires a separate structured check of the exact Author-requested action and arguments; it fails closed. Selection-scoped requests cannot silently expand to the whole Article, and a changed Revision stops the run.

Skills are declarative guidance, grant no capabilities or permissions, and execute no scripts. Load relevant instructions on demand and honor explicit Skill selection. Safety and capability validation take precedence over the Author request, followed by explicitly selected and automatically selected Skills. Ask about non-safety conflicts that would change the intended result.

Author Skill mutation requires an explicit action and target, concurrency validation, immutable Skill history, and recovery of incomplete writes. Article and Skill histories remain separate; chat checkpoint restoration does not change Skills.

[ADR-007](adr-007-completion-gated-editorial-engine.md) owns completion, artifact execution, deadlines, and the Fact Check exception. [ADR-005](adr-005-article-state-and-consistency.md) owns all Article changes, including explicitly authorized conversational edits. Model tool calls and Skills cannot grant Article-acceptance authority.

Keep progress quiet and renderer-safe. Completed artifacts provide explicit handoffs to their owning Workspace Views without changing the current View automatically. Dedicated Views remain usable independently of chat. Persist only minimal local capability activity, excluding private context and raw provider data.

## Consequences

Authors can combine approved editorial work in conversation without losing deliberate review. Capability coverage and authorization require contract tests. Internal capabilities need no MCP wrapper; third-party tools, background runs, direct publishing, arbitrary discovery, and Skill import or sharing remain outside this decision.

## Verification and references

[Assistant execution and recovery](../reference/assistant-execution-and-recovery.md) owns capability coverage, bounded discovery, model routing, Skill lifecycle, and handoff details. Canonical behavior remains in [editorial workflows](../../../product-model/areas/editorial-workflows.json) and [Article Workspace](../../../product-model/areas/article-workspace.json). Test authority, scope, discovery, cancellation, recovery, and independent Workspace use through the [testing guide](../guides/testing.md).
