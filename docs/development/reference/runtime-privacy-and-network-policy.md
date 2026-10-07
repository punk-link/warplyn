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

Only packaged Electron exposes finite telemetry consent and event operations through a separate context-isolated desktop client. Main validates the sender, request shape, and event schema and rechecks consent. Browser and development runtimes do not fall back to remote telemetry. Missing delivery configuration is a runtime no-op.

The release workflow packages the approved public capture key and fixes delivery to `https://us.i.posthog.com/batch`; it never packages an admin token. A telemetry-enabled release requires configured delivery even though runtime absence remains safe. Use the [release guide](../guides/mvp-release-and-recovery.md) for authorized account, retention, IP-handling, payload, opt-out, and offline checks.

## Verification

Test safe diagnostic metadata and writer-failure isolation, selected-provider routing and credential isolation, transport validation, and packaged telemetry sender/schema/consent checks. Canonical privacy and telemetry behavior remains in [cross-cutting](../../../product-model/areas/cross-cutting.json) and [Settings](../../../product-model/areas/settings.json) records. Do not collect private content or raw provider errors as evidence.
