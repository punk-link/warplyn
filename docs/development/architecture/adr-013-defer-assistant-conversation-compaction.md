# ADR-013: Defer Assistant conversation compaction

- Status: Proposed
- Date: 2026-09-24
- Updated: 2026-10-02
- Scope: Assistant conversation context
- Depends on: [ADR-005](adr-005-article-state-and-consistency.md), [ADR-007](adr-007-completion-gated-editorial-engine.md), [ADR-011](adr-011-assistant-skills-and-bounded-capabilities.md)
- Investigation: [skladno-legacy#233](https://github.com/punk-link/skladno-legacy/issues/233)

## Context

A durable local transcript does not guarantee that all earlier intent fits in a model request. Message-count windows can forget earlier decisions, while a few long messages can exceed context limits. The investigation has not established a failure rate or quality threshold that justifies automatic compaction.

## Decision

Defer automatic conversation compaction. Preserve transcripts and checkpoint anchors.

Before adding compaction, investigate duplicate request input and inconsistent conversation bounds. Measure privacy-safe request size, context-limit failures, latency, and repeated Author instructions. Evaluate the whole request, including instructions, Skills, tool schemas, results, current input, and output reserve; message count alone is insufficient.

Reconsider when real use or deterministic tests show repeated context-limit failures or lost Author intent that a bounded recent-message policy cannot address.

If compaction becomes necessary, require provider-neutral local summaries that Authors can inspect and correct, with recent verbatim turns and unchanged original history. Summaries are context hints, never mutation authority or proof of tool execution. Track covered transcript and Revision state, invalidate after restoration or correction, and preserve prior context on failed or cancelled summary generation. Minimum-context and provider-storage rules still apply.

## Consequences

Long conversations may lose distant context or exceed model limits until evidence justifies further work. Summarization would add cost, latency, recovery rules, and risk of changing Author intent. Provider-native formats cannot define the common application contract.

## Investigation and references

The [conversation-context investigation](../guides/assistant-conversation-context-investigation.md) records the implementation observations, alternatives, and follow-up evidence. This ADR remains proposed; it neither implements compaction nor claims the investigation's reported bugs are fixed.
