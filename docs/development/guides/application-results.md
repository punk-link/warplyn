# Expected application failures

Application decisions use typed success/failure values. Existing public service, client, stream, and tool entry points retain their error contracts so Authors receive the same actionable errors and recoverable conflict state.

## Result contracts

Use `Result<T, FailureDetails>`, `success(value)`, and `failure(details)` from `@skladno/shared` for result types and construction. Domain helpers may constrain failure details, but delegate construction to these factories. Keep operation names about their domain action, such as `readProposalSummary` or `prepareAssistantEngineStream`; do not rename operations after their return type.

`packages/server/src/application/errors/application-result.ts` defines `ApplicationResult<T>`. A success contains `value`; a failure contains an application error code, a required semantic kind, and optional safe parameters. The kinds are invalid input, conflict, missing resource, and unavailable operation. `unwrap-application-result.ts` maps these to the existing safe exception/status contract only at compatibility boundaries. Generic failure payloads contain no credentials, raw provider errors, or private content. Article conflict recovery retains its existing private Article/Draft payload only within the established local recovery contract.

Keep narrower feature results when their consumers need an exhaustive failure set or an existing recovery payload:

- Assistant preparation retains its bounded failure-code union and exhaustive compatibility mapping.
- Article mutation results retain the original Draft/Revision conflict object. The Article, Draft, and `instanceof` identity remain available for conflict recovery.
- Skill write results retain package issue strings for the existing package/source contract. Chat actions map only recognized issues to safe application failures. Unknown faults propagate unchanged.
- Browser backup results retain the existing Web Backup codes. Renderer translation refresh returns existing localized message IDs; selection validation and native automatic backup prerequisites use small local discriminated unions.

These are internal application contracts. They are not new HTTP, IPC, persistence, or renderer-client payloads. Browser backup errors, result types, and compatibility unwrapping have separate owners in `web-backup-error.ts`, `web-backup-result.ts`, and `unwrap-web-backup.ts`.

## Production ownership

| Area | Result owners and consumers |
| --- | --- |
| Settings | `application/settings/application-settings-normalizers.ts` composes general preference, environment-variable, and key-binding validation. `ai-connection-operations.ts` composes complete connection operations, propagating lookup/provider/environment failures before persistence or credential effects. `application-settings-service.ts` unwraps each connection operation once at its public compatibility boundary and uses results for backup prerequisites. Tolerant stored-setting reads remain tolerant. |
| Publishing | `application/publishing/publishing-service.ts` validates and saves settings through its result operation. Invalid profiles never persist. |
| Articles | `application/articles/article-operation-result.ts` adapts only known store conflicts. `article-service.ts` composes those results with Revision promotion and accepted-Proposal metadata work. A conflict starts no subsequent title or accepted-description work. |
| Assistant preparation and reads | `application/assistant/requests/assistant-request-preparation.ts` composes replay, Revision, selection, skill, routing, and typography results. `assistant-service.ts` preserves the public error and telemetry boundary. Message reads validate Article existence through results. |
| Assistant edits and Fact Check selection | `application/assistant/assistant-edit-service.ts` composes preview, description, edit application, and promotion through a complete result operation; checkpoint restoration propagates expected store failures before promotion and Article refresh. Public edit/restore methods unwrap once. `requests/assistant-claim-selection.ts` and `assistant-selected-fact-check.ts` return expected selection failures. |
| Assistant authorization and capabilities | `capabilities/assistant-action-authorization.ts`, `editorial-capability-catalog.ts`, and `editorial-capability-catalog-readers.ts` return prerequisite, scope, and authority failures. The capability loop unwraps only at its tool/stream boundary. `completion/authorize-completed-edit.ts` returns direct-edit eligibility failures before persistence. |
| Assistant engine requests | `application/assistant/assistant-engine-request.ts` returns request-style prerequisite failures before starting the stream. |
| Direct Editorial | `application/editorial/prepare-editorial-stream.ts` composes Article lookup, verified correction selection, style capture, and engine resolution. `editorial-service.ts` unwraps inside its existing telemetry/stream boundary. |
| Shared Editorial decisions | `selection-context.ts`, `fact-checking/verified-correction-selection.ts`, `style/capture-style-typography.ts`, `style/prepare-style-review-profile.ts`, `style/typography-review.ts`, and `workflow-prompt.ts` return expected validation outcomes. Existing exported throwing functions delegate to those result implementations for caller compatibility. |
| Style Corpus and Proposal summaries | `style/style-corpus-service.ts` and `proposals/proposal-summary-service.ts` compose validation, duplicate/configuration checks, generation, and persistence through result operations. |
| Author Skills | `assistant/skills/skill-execution.ts` returns scope failures. `file-assistant-skill-source.ts` exposes result operations for install, replacement, deletion, and validation. `author-skill-service.ts` composes change validation. `author-skill-chat-actions.ts` maps known legacy boundary errors and result issues while retaining journaling and rollback. |
| Browser backups | `packages/web/src/settings/web-backups.ts` composes folder permission and client capability results. `web-backup-bundles.ts` propagates manifest/path/file results, removes incomplete exports, and always releases import/export sessions. Only exported legacy UI functions unwrap. |
| Renderer workflows | `packages/web/src/workspace/state/editorial-results-state.ts` returns translation refresh prerequisite failures before acceptance; its notification boundary localizes them. `assistant-request-state.ts` returns selection freshness results before streaming. |
| Native scheduling | `packages/electron/src/presentation/settings/desktop-backup-scheduler.ts` returns a missing-folder prerequisite result. Its run boundary maps failure through the existing notification exception path, notifies once, performs no snapshot write, and retains its daily retry/disposal lifecycle. |

Server paths in this table are relative to `packages/server/src` unless otherwise specified.

## Exceptions that remain deliberately

Railway composition does not replace transaction rollback, stream termination, transport validation, or corrupt-state detection. The remaining exception sites were reviewed as follows:

| Owners | Reason |
| --- | --- |
| `assistant/completion/assistant-completion.ts` Revision guards | These execute inside `completeRun` transactions. Throwing aborts all pending writes; returning a failure as an ordinary transaction value would commit them. |
| `editorial/editorial-service.ts` completion Revision guard | The stream completion callback must abort before persistence when its captured Revision changed. The exception is handled by the existing stream/telemetry boundary. |
| `assistant/assistant-service.ts` edit-error mapping | Skill rollback precedes mapping a known persistence failure to the established safe error. This is a compatibility/rollback boundary, not a domain decision pipeline. |
| Editorial engine, Proposal result policy, artifact execution, and capability-loop `EditorialEngineError` guards | Invalid, conflicting, or incomplete generated output must terminate iteration and prevent completion/persistence. Provider/stream contracts, cancellation, partial Fact Check recovery, and required cleanup remain explicit. |
| `assistant/skills/author-skill-service.ts` commit/snapshot/version/history guards | Mutation and recovery recheck current hashes, files, and immutable history after validation. These abort journaling/rollback on races or corrupt state. `validateChangeResult` handles normal preflight decisions; chat maps recognized boundary conflicts without swallowing unknown faults. |
| `assistant/skills/file-assistant-skill-source.ts` package-root/staged-file and recovery guards | Filesystem authority checks stop unsafe paths before access. Recovery refuses unrelated external edits before destructive restoration. These remain hard IO/recovery boundaries; ordinary parsed package, metadata, availability, and concurrency checks return results. |
| Built-in Skill loading and capability classification checks | Missing bundled metadata or invalid static registries are application defects, not recoverable Author choices. |
| Skill package parser | Unsafe archive/file exceptions are already caught at its parser boundary and returned as structured package issues. |
| Persistence repositories, backup/restore integrity checks, native credentials, and migration/recovery code | Exceptions enforce database transactions, staged filesystem cleanup, restart rollback, and trust-boundary rejection. Application adapters translate only known domain failures and retain original conflict payloads. |
| HTTP/IPC clients, preload/native bridges, Article file codecs/workers, and filesystem adapters | Keep existing validated transport/codec contracts and error mapping. Malformed payloads, archive/XML bounds, unsafe tickets/paths, and IO errors must still abort their operation. |
| Renderer notification boundaries, defensive stale UI guards, and React/catalog invariants | The existing UI callback/client contract still rejects failures for localized notifications. Domain prerequisite helpers return values; missing providers, invalid catalogs, and impossible UI contexts remain exceptional. |

Do not add result wrappers to trivial store-forwarding methods merely to catch and rethrow the same exception. Use a result where a caller actually decides which next step may run. Do not convert a whole operation with a catch-all: an unknown storage, filesystem, provider, or programming fault must not become an ordinary validation result.

## Verification

Direct tests cover semantic status/parameter mapping, known Article conflict identity and payloads, failure stopping promotion, Settings validation, safe legacy Skill mapping, browser incomplete-bundle cleanup, and native missing-folder retry without snapshot writes. Existing integration tests protect public errors, authority, generation completion, persistence, and recovery. Run the [testing guide](testing.md) gates, including browser journeys and packaged desktop journeys for renderer/native changes.
