# Fact Check latency investigation

Use synthetic/public input and an already approved provider connection for live measurements. Never capture Article text, prompts, claims, credentials, provider payloads, or raw errors. Keep provider/model names and claim/reuse counts in the manual experiment notes, outside application diagnostics. No live provider was used for the measurements below.

## Local stage records

Production Fact Check providers emit `ai.stage_finished` or `ai.stage_failed` records for fixed stages `fact_check_extraction`, `fact_check_matching`, `fact_check_research`, and `fact_check_evaluation`. Each record measures the complete method, including validation. Matching is absent when exact reuse succeeds or no candidate can pass the existing material-anchor guard. Research and evaluation each run once per checked claim. The three concurrent claim workers overlap, so do not sum their timings as elapsed run time.

Existing generic `editorial_generation` records may describe the same underlying generation. Do not add these to the new enclosing method timings. Local records have no run identifier; isolate one operation when collecting an experiment. They are not forwarded to remote telemetry.

For a live follow-up, compare 1, 3, and 12 fresh claims, then repeated and edited runs. Record provider/model, claim count, reuse count, time to first finding, and final completion externally. Compare stage durations against elapsed time to distinguish provider work from orchestration, persistence, and delivery. Preserve source quality, uncertainty, citation validation, cancellation, and partial findings when evaluating any optimization.

## Reproducible synthetic measurement

From the repository root:

```powershell
npx tsx --test packages/server/src/infrastructure/editorial/workflows/fact-claim-matching.test.ts
```

The changed-number test runs the real `streamFactCheck` workflow with synthetic extraction, research, and evaluation. Its matcher delays 40 ms and proposes an identity match that the existing material-anchor guard must reject. The candidate implementation filters that impossible claim before calling the matcher. The test asserts zero matching calls, one research call, a completed result, and no inherited identity. A mixed-claim test checks that filtered claims retain their original indices; a separate negation test covers the other existing guard.

On Windows, the pre-change run made one matching call and one research call, completing in 56.95 ms. After the prefilter, it made zero matching calls and one research call, completing in 1.98 ms. These are single synthetic observations, not a measured live-provider speedup. The stable result is one avoided serial matching call when all unresolved claims are incompatible with every candidate. Fresh and compatible claims do not gain this shortcut.

The baseline was run before changing `matchFactCandidates`: it constructed every unmatched claim before inspecting history candidates, then rejected material-anchor mismatches only after the model returned. To reproduce that baseline, in a disposable checkout restore that prefilter behavior and change the synthetic test's expected matching-call count to one. Keep the final result and research assertions unchanged. Do not compare wall-clock milliseconds as a regression assertion; scheduler variation makes call counts the reliable signal.

No evidence currently justifies reducing search context, changing models, increasing concurrency, batching evaluations, or relaxing reuse checks. Use the local stage timings to choose a later optimization.
