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

Use this procedure when investigating context-limit failures or lost Author instructions. The 2026-09-24 investigation reported duplicate current input, inconsistent history bounds, and no token budget. Recheck current code before treating those observations as active defects.

1. Trace capability and fallback history assembly. Confirm current input occurs exactly once and record each path's bounds.
2. Test early instructions across short exchanges, unusually long messages, loaded Skills, and large tool results. Record cases that lose intent or exceed limits.
3. Measure whole-request size, context-limit failures, latency, and repeated instructions. Keep message text, Article bodies, Skill instructions, tool arguments, and raw provider errors out of logs.
4. Compare the entire request and output reserve with the selected model's documented limit. Evaluate a consistent bounded recent-message policy before summaries.
5. Reconsider compaction only if repeated failures survive that policy. Record the evidence and Author-quality threshold supporting the decision.

If summaries become justified, record the covered completed-turn range and current Revision. Rebuild or invalidate after checkpoint restoration, changed Revision, or correction. Verify inspectability, correction, cancellation, recovery, and provider compatibility before release. Persist only after valid completion.

Provider-native compaction may optimize an adapter after common behavior is defined. Verify current provider documentation during that evaluation.

This ADR remains proposed; it neither implements compaction nor claims the reported defects are fixed.
