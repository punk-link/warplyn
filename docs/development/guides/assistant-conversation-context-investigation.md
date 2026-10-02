# Investigating Assistant conversation context

[ADR-013](../architecture/adr-013-defer-assistant-conversation-compaction.md) proposes deferring automatic compaction. This guide preserves the investigation observations and procedure; it is not evidence that the reported defects remain current or have been fixed. The original investigation is [skladno-legacy#233](https://github.com/punk-link/skladno-legacy/issues/233).

## Recorded observations

The 2026-09-24 investigation recorded these implementation details:

- The capability path selected the latest 12 eligible Author and completed Assistant response messages. Greetings, status messages, and generated artifacts were omitted. The full local transcript remained visible.
- The current Author message was persisted before history was read and then appended separately as current input, duplicating it in the capability prompt.
- The fallback conversation path had no message-count limit. Neither path had a token budget.
- Six model steps bounded execution, not message or tool-result size. A 12-message window could forget a decision after six short exchanges.

No failure rate or Author-quality threshold had been established. Recheck current request preparation and history assembly before treating these observations as current behavior or opening follow-up work.

## Investigation procedure

1. Trace both conversation paths and confirm whether current input occurs exactly once. Fix confirmed duplication independently of any compaction feature.
2. Exercise short exchanges with an early instruction, unusually long messages, loaded Skills, and large tool results through deterministic tests.
3. Measure privacy-safe whole-request size, provider/model, context-limit failures, latency, and whether Authors must repeat earlier instructions. Never log message text, Article bodies, Skill instructions, tool arguments, or raw provider errors.
4. Compare the entire request, including output reserve, against the selected model's documented context limit. Establish a consistent bounded prompt policy before adding automatic summaries.
5. Reconsider compaction only when repeated limit failures or loss of Author intent survives that simpler policy.

## Alternatives and conditional requirements

| Approach | Benefit | Limitation |
| --- | --- | --- |
| Recent verbatim turns | Simple, local, portable, recoverable | Can forget older intent; message counts do not bound tokens |
| Provider-native compaction | May reduce application work | Provider-specific formats, retention, and inspectability |
| Local provider-neutral summaries | Inspectable and portable | Extra calls, cost, latency, possible intent loss, and recovery work |

If summaries become justified, preserve original transcripts and checkpoints. Store older completed-turn summaries plus recent verbatim turns, and make summaries inspectable and correctable before use. Record the covered transcript range and current Revision. Invalidate or rebuild after checkpoint restoration, changed Revision, or correction.

Treat summaries only as context hints, never mutation authority or proof a tool ran. Generate and persist only after valid completion; failure or cancellation preserves previous context. Send only needed conversation content and honor provider storage preferences. Verify provider compatibility, correction, stale-summary handling, cancellation, and recovery before release.

Provider-native mechanisms may be optional adapter optimizations after a common behavior is defined. Recheck current primary documentation during that evaluation: [OpenAI compaction](https://developers.openai.com/api/docs/guides/compaction), [Claude compaction on demand](https://platform.claude.com/docs/en/build-with-claude/compaction-on-demand), and [AI SDK message pruning](https://ai-sdk.dev/docs/reference/ai-sdk-ui/prune-messages).
