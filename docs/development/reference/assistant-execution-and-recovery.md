# Assistant execution and recovery

Use this reference when changing Assistant orchestration, conversational edits, Skills, or their recovery paths. [ADR-011](../architecture/adr-011-assistant-skills-and-bounded-capabilities.md) owns capability authority, [ADR-007](../architecture/adr-007-completion-gated-editorial-engine.md) owns completion, and [ADR-005](../architecture/adr-005-article-state-and-consistency.md) owns Article consistency. The canonical [editorial](../../../product-model/areas/editorial-workflows.json) and [Workspace](../../../product-model/areas/article-workspace.json) records own visible behavior and scenarios.

## Capability classification and discovery

Classify each Author-facing Editorial Workspace operation as callable, a handoff, or excluded. Every HTTP, streaming, and Electron application operation must map to a classified product operation or record why it is outside Assistant authority. Health checks and other infrastructure operations receive that outside-authority classification. Settings, credentials, backups, updates, desktop lifecycle, and raw routes are outside Editorial coverage.

Callable work includes reading Article metadata and saved context, Revisions, artifacts, publishing guidance, Findings, Article style rules, linked translations, and Style Corpus readiness. Explicitly authorized actions can change current-Article metadata, assign an existing Publishing profile, add the current immutable Revision as a local style sample, or rebuild its Style Profile. Existing Proposal, Fact Check, Style review, and translation generation remain callable. The current product records also allow rejection of one explicitly identified prepared translation Proposal; this does not grant general Proposal-decision authority.

Draft mutation, ordinary Proposal acceptance or rejection, Revision restoration, Finding resolution, translation Article creation, arbitrary Style Corpus changes, Publishing profile definition mutation, copying for publication, direct publishing, Article deletion, filesystem and network access, credentials, stores, and unrestricted routes remain Author actions or exclusions. Conversational reply application follows the separate rules below.

An untagged operational request begins with bounded discovery over the classified server-owned catalog. It returns at most ten relevant callable operations, handoffs, or exclusions with compact descriptions, including close alternatives when useful. Only returned callable schemas become active on the following step. Explicit Skills, Quick Actions, scope, and established run state may select the same bounded set without discovery. Discovery adds no Article context, authority, prerequisites, or execution.

Keep typed strict schemas and revalidate scope, exact action intent, arguments, prerequisites, and base Revision at execution. Uncertain discovery leads to one concise question, a classified handoff, or an honest limitation. An unavailable operation must not be replaced by a nearby capability.

## Foreground execution

Runs allow at most six model steps, including discovery. Capability definitions remain registered in process; per-step active tools restrict schemas sent to the provider. Discovery and completed calls may narrow subsequent steps. Measure step input size, discovery misses, wrong-tool selections, and added latency without weakening validation or replacing typed tools with a generic API-call tool.

Safe calls need no per-call confirmation. Deterministic mutation requires a separate structured check using the configured Text Generation Model. It must establish the exact Author-requested action and arguments in the Author's language and fail closed for unavailable, incomplete, ambiguous, negated, hypothetical, or mismatched input. General conversation and an orchestration tool call do not authorize mutation. Ask for a missing simple parameter; hand off to a Workspace View when a prerequisite needs management.

Selection is an authority boundary. Send only selected text and required metadata. Whole-Article capabilities require an explained need and a new whole-Article request. Stop when the captured current Revision changes rather than rebasing silently.

Only a classified transient failure from a side-effect-free read may retry automatically, once. Artifact and validation failures do not retry. A run normally produces one primary artifact, or an existing related set such as Style Findings and their correction Proposal. This does not require general cross-artifact transactions.

Use ADR-007 for identical-call coalescing, conflicting-call rejection, terminal artifacts, full-stream validation, deadlines, and the completed-Fact-Check exception. Fact Check researches and evaluates at most three claims concurrently. Fully evaluated claims may report internal progress; incomplete or failed claims never become findings.

Conversation uses the configured Assistant model; each capability retains its purpose-specific Editorial model. Requests and stored records use Skill IDs, not Editorial operation IDs.

## Conversational reply edits

A completed exact single replacement from Proposal generation may become a reply edit candidate only after a separate replacement check. Capture the base Revision and selection offsets. An untagged explicit edit request activates Proposal generation through the structured intent check before orchestration. Apply exact single-character substitutions locally to the captured text, preserving every other character; other replacements use a structured model check. Capability summaries do not stream into chat before the final provenance handoff.

The Author may click Apply once in either conversation mode. Default Propose edits for review retains ordinary Proposal review. Opt-in Apply edits directly additionally requires verification of the exact explicit edit instruction and may apply at completion without a Proposal. Capture the per-Article mode at request start; it cannot authorize an unrelated edit. Invalid direct replacements fail rather than becoming review Proposals. In review mode, an unavailable replacement check leaves the completed Proposal available for ordinary review and cannot authorize automatic application.

Both reply-application paths reject any current Draft or stale base Revision. Before persistence, generate a concise Revision description from changed context using the normal local fallback. Atomically append an Assistant-attributed Revision and record the applied reply. Reply application is an Author handoff, never a model-callable acceptance tool.

## Conversation checkpoints

Every persisted Author message anchors a checkpoint. Restore rejects that message, later active conversation, and associated artifacts in one SQLite transaction. Preserve rejected audit records. A linked Revision restoration appends a new restore Revision and leaves later Revisions accessible.

Promote a current Draft first by default; discard only by explicit choice. Use an opaque confirmation token to detect conversation, Revision, and Draft races. Stale confirmation or transaction failure changes neither conversation nor Article state. Return the rejected message to the Composer only after success; do not recreate the old selection. Chat restoration never changes Author Skills.

## Skill packages and recovery

Skills have stable IDs, names, descriptions, Markdown instructions, and optional bundled reference text. Built-ins are versioned application assets. Author packages use the same local format and separate immutable Skill Revisions. Packages grant no scripts, tools, filesystem access, or permissions; enforce metadata, file, reference, and size limits.

Send compact descriptions first and load relevant instructions on demand. Explicit Quick Actions or slash selections guarantee loading; complementary Skills may also load. Untagged requests use model-selected catalog Skills rather than a default workflow. Quick Actions and ordinary conversation share capability access. Dedicated Views remain independently usable. Multiple catalog sources are supported; import, sharing, and custom tools remain deferred.

The initial orchestration turn receives no Article body. Later classified capabilities receive only required context. Create, revise, restore, or delete a Skill only for an explicit Author action and target. Revision and deletion reject concurrent changes using the current package hash; restoration appends a new Skill Revision. Deletion retains history for recovery.

Creation stays in chat. Ask when the goal, trigger, procedure, or reference text is unclear. A valid completed creation becomes available immediately without a separate preview, Install action, validation checklist, or Draft trial. Return safe, specific correction guidance for rejected packages. Later requests or direct local Markdown edits can refine the package; catalog refresh reads those edits.

Keep packages and Skill Revisions under active application data. Record a pending Skill write until its Assistant request completes in SQLite. Startup keeps writes for completed requests; for incomplete requests it restores the prior package and removes the new Skill Revision. Backup includes packages and history; database-only restore leaves existing Skills unchanged.

## Progress and local activity

Use typed, quiet activity such as "Checking facts." Collapse successful activity to a short outcome with optional local detail. Expose no tool identifiers, prompts, private arguments, provider errors, secrets, or privileged handles.

Completed review artifacts use a localized result card and explicit action to the owning View. Do not automatically switch Views or generate an extra closing model reply after a terminal artifact. Ordinary Proposal decisions, Finding resolution, Revision restoration, translation Article creation, Style Profile management, and publishing remain in their screens, subject to the specific callable actions above.

Append only capability ID, status, request ID, base Revision, and timestamps to local execution activity. It follows the conversation lifecycle and stores no prompts, arguments, context, result bodies, secrets, or raw responses.

## Provider adapters and continuation

Resolve only the active finite provider connection and construct only required capability providers. Keep provider mechanics, model/context helpers, model discovery, workflows, and Assistant SDK execution in focused infrastructure modules. Title, Proposal-summary, and intent-check adapters remain separate and share provider configuration.

The current opt-in flag is `WARPLYN_AI_SESSION_CONTINUATION=true`, as defined in [environment configuration](../../../.env.example). Provider tokens are separate from local completion identity and are eligible only when Article, connection, provider, and model match and the adapter supports continuation. Fact Check, translation, cross-Article requests, legacy unscoped sessions, and unsupported adapters start fresh. Honor disabled-by-default provider response storage where available.

## Verification

Use deterministic contract tests for classification coverage, strict discovery bounds, empty results and close alternatives, scope and intent, unavailable operations, Skill IDs, cancellation, step exhaustion, stale Revisions, safe retry, completion, direct Workspace use, and interrupted Skill writes. Reject missing or duplicate operation and transport classifications.

Workspace checks cover quiet progress, stable streaming, explicit handoffs, and keyboard access. Retain regression coverage for [selection scope](https://github.com/punk-link/skladno-legacy/issues/156) and [stream completion](https://github.com/punk-link/skladno-legacy/issues/161). Use the [testing guide](../guides/testing.md).
