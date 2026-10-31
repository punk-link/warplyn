# Runtime privacy and network policy

[ADR-004](../architecture/adr-004-local-diagnostics.md) owns diagnostic privacy and [ADR-008](../architecture/adr-008-loopback-service-trust-boundary.md) owns transport authority. Changes expanding recipients, origins, permissions, persistence, or provider storage require explicit security review.

## Provider destinations

The approved provider destinations are:

| Connection | Host |
| --- | --- |
| OpenAI | `api.openai.com` |
| OpenCode Zen | `opencode.ai` |
| Anthropic | `api.anthropic.com` |
| Google Gemini API | `generativelanguage.googleapis.com` |
| xAI Grok | `api.x.ai` |
| DeepSeek | `api.deepseek.com` |

Only the explicitly selected connection receives its credential and minimum request context. Model discovery uses the selected provider's documented models endpoint. Sourced Fact Check requires a supported research adapter. This inventory grants no arbitrary model-directed network access.

Update discovery uses GitHub under the separate Author permission in [ADR-010](../architecture/adr-010-author-controlled-preview-updates.md) and the [desktop update policy](desktop-release-and-update-policy.md). The browser service remains loopback-only by default with its configured origin; broader exposure requires a separate authentication decision.

## Native spelling dictionaries

Desktop spelling checks Article text locally through Electron/Chromium. No spelling text, personal words, suggestions, or Article identifiers are passed to a remote checker, provider, diagnostics, or telemetry. Main accepts only bounded language IDs and explicit bounded personal-word mutations from the trusted main frame. The renderer cannot choose a dictionary URL or filesystem path.

Language dictionaries use Electron's standard Chromium CDN acquisition. Chromium's documented dictionary base is `https://redirector.gvt1.com/edgedl/chrome/dict/`, with Google CDN delivery redirects. This authorization is limited to native dictionary acquisition for system/Article languages and Author-selected preload languages, not arbitrary browsing or model-directed requests. Requests expose the requested dictionary filename/language, ordinary network metadata, and the device's IP address; they contain no Article text or personal vocabulary. See the [Chromium dictionary implementation](https://chromium.googlesource.com/chromium/src/+/master/chrome/browser/spellchecker/spellcheck_hunspell_dictionary.cc) and [Electron spelling documentation](https://www.electronjs.org/docs/latest/tutorial/spellchecker).

Settings explains internet access before preloading. Native initialization confirms readiness; cached dictionaries can be reused offline. Changes to the CDN override, redirects, or a custom dictionary service need a new review. Release acceptance inspects synthetic dictionary traffic for the shipped Electron version without committing raw logs. The native personal dictionary remains local, but Windows and macOS also modify the OS custom dictionary, as explained before mutations in Settings.

## Local diagnostics

Write JSON Lines for startup to stdout and failures to stderr. Allow only stable event context and safe error metadata. Exclude raw messages and stacks, request URLs and identifiers, request bodies, Article and model bodies, secrets, and environment values. Catch writer failures and create no application-owned log file or retention store.

Provider-stage records allow only fixed stage names, elapsed milliseconds, allowlisted finish reasons and failure categories, and validated HTTP failure status codes. They contain no request identifiers or provider payloads. Do not scrub these fixed public values against arbitrary environment substrings, which can corrupt stage names and timestamps. SDK stream-error callbacks use these records instead of default raw-error logging.

## Packaged beta telemetry

Remote telemetry is separate from local diagnostics and uses only a versioned allowlisted contract. It never forwards diagnostic context or stdout/stderr. Public-beta consent is installation-local and default-on; Authors can revoke it at any time, and saved opt-out preferences are respected.

Schema version 2 adds `ai_stage_finished` for fixed stages `assistant_step`, `editorial_generation`, `action_intent_verification`, and `replacement_verification`. Its only operation data is stage, elapsed milliseconds, and a completed, failed, or cancelled outcome. It uses the existing consent owner and bounded PostHog queue. It sends no prompts, output, Article or request identifiers, provider metadata, model names, or token usage. AI SDK telemetry remains disabled; these events are constructed independently of SDK tracing payloads.

Schema version 3 adds allowlisted AI failure categories to terminal events and an allowlisted failure category and validated HTTP status to failed AI stage events when available. AI operation and stage events may include a randomly generated per-operation UUID unrelated to Article or request identifiers. Preparation, Assistant orchestration, tool execution, final output validation, and completion report failed stages. These fields do not contain provider error messages or payloads.

The packaged desktop delivery queue stores at most 100 validated events in the application profile, with owner-only file mode on POSIX and the profile's inherited access controls on Windows. Events expire after 24 hours when the queue is next checked, and transient delivery errors retry until expiry. The queue is validated again on restart and associated only with the current consent identity. Opt-out aborts delivery and removes the queue; an interrupted deletion is completed on the next startup with consent denied. Permanent errors and queue overflow still drop events. Each outbound event has a random UUID retained across retries and restarts for ingestion deduplication, with its original timestamp. Legacy queued events receive a UUID when first loaded.

Security review for this queue: only the finite event schema enters storage; restart rejects malformed records, oversized files, stale timestamps, and a different consent identity. Renderer telemetry requests cannot supply operation IDs; the server generates them. Writes use a restricted temporary file and replacement, and storage failures do not interrupt Authors. The queue is pseudonymous rather than encrypted; access depends on profile permissions, and a process running as the same OS user is outside this boundary. An opt-out is saved before queue deletion so a crash during deletion cannot authorize replay on restart.

Only packaged Electron exposes finite telemetry consent and event operations through a separate context-isolated desktop client. Main validates the sender, request shape, and event schema and rechecks consent. Browser and development runtimes do not fall back to remote telemetry. Missing delivery configuration is a runtime no-op.

The release workflow packages the approved public capture key and fixes delivery to `https://us.i.posthog.com/batch`; it never packages an admin token. A telemetry-enabled release requires configured delivery even though runtime absence remains safe. Use the [release guide](../guides/mvp-release-and-recovery.md) for authorized account, retention, IP-handling, payload, opt-out, and offline checks.

## Public website analytics

The landing and plans pages send PostHog pageviews and explicit `download_clicked` events to the existing US project. `analyticsSource` distinguishes `website` from `desktop` without replacing failure events' existing `source` field. Website PostHog tracking uses cookieless server hashing, no person profiles, no session replay, and no general autocapture. It never links website visitors to desktop installation IDs.

The landing pages and VitePress user guide share one Google Analytics initializer for the existing measurement property. It records `download_clicked` for links to the latest GitHub release. Both Google and PostHog honor Do Not Track and Global Privacy Control, initialize only in production, and retain independent identities and storage behavior. Google may use cookies; PostHog's cookieless guarantee does not apply to Google. Documentation does not initialize PostHog. The Yandex verification file remains a site-ownership proof and does not load a Metrica counter.

Build the site with `VITE_POSTHOG_PROJECT_KEY` set to the same public capture key used by desktop releases. The Site workflow reads `WARPLYN_POSTHOG_PROJECT_KEY` from the `Production` environment. Other hosting build environments must set `VITE_POSTHOG_PROJECT_KEY` too. Missing keys disable website PostHog tracking; Vite development mode never starts it.

Before enabling delivery, enable **Cookieless server hash mode** under PostHog **Project Settings > Web analytics**. See [PostHog's cookieless tracking setup](https://posthog.com/tutorials/cookieless-tracking). Verify production events and storage with a disposable browser profile. Website PostHog tracking does not extend to the user guide.

Create a website dashboard filtered by `analyticsSource = website`: `$pageview` unique visitors, `download_clicked` unique visitors, and a pageview-to-download funnel broken down by referring domain or UTM campaign. Break down download clicks by `buttonLocation` to compare placement. Create a desktop dashboard filtered by `analyticsSource = desktop`, using unique installations performing `app_session_started` for launch activity. Older desktop events lack this property; use explicit event names to include historical launches. A download click only opens GitHub releases and does not establish a completed download or installation.

## Desktop analytics interpretation

The [desktop activity dashboard](https://us.posthog.com/project/602062/dashboard/2258316) includes AI outcome counts, median and p95 elapsed milliseconds, Proposal decisions, backup/recovery failures, an activation funnel, and weekly Draft-checkpoint retention. These use existing finite events without replay or AI SDK tracing.

The activation funnel measures launch, completed AI operation, and Proposal review in order within 14 days. It includes returning installations and does not establish first-time onboarding or connection verification. Steps need not refer to the same Article or operation. Draft-checkpoint retention measures persistence activity, including save/discard attempts. Proposal rejection is a valid Author decision, not an AI quality verdict. Unique identities represent consenting installations; opt-out and re-enablement reset identity. Historical counts may include duplicates.

## Verification

Test safe diagnostic metadata and writer-failure isolation, selected-provider routing and credential isolation, transport validation, and packaged telemetry sender/schema/consent checks. Canonical privacy and telemetry behavior remains in [cross-cutting](../../../product-model/areas/cross-cutting.json) and [Settings](../../../product-model/areas/settings.json) records. Do not collect private content or raw provider errors as evidence.
