# Offline writing

The installed desktop app keeps Articles, Draft checkpoints and immutable Revisions locally. Writing and local recovery do not require a model connection. Configuration availability controls the Assistant setup message; it is not an internet reachability test. Never use a global connectivity flag to disable models, since a configured local endpoint may remain reachable.

Markdown, HTML, RTF and DOCX conversion uses installed dependencies. Export does not need a model. Native spelling depends on the operating system and installed dictionaries. Prepare the required languages in Settings while connected before travelling; an unprepared dictionary may require a download. Dictionary preparation failure must not prevent writing. Typography mechanics remain local.

Remote Assistant requests require their configured provider to be reachable. Failed or incomplete generation must preserve the Article and its history and must not persist partial generated artifacts. Retry is an explicit Author action. ADR-007 describes completion validation and the limited exception for completed Fact Check findings.

This guarantee does not promise that the application makes no network requests. Update checks, optional telemetry, dictionary preparation and explicitly requested remote operations may attempt external access. It does not provide synchronization between devices. A development browser also requires its local web and application services to remain running.

## Implementation and regression coverage

`articles-repository.ts` owns SQLite Article creation and delegates local Draft and Revision writes to repository operations. These paths do not resolve a provider. `article-docx-export.ts` imports the packaged `docx` dependency; file conversion is separate from generation. `SpellingDictionaryPreparation` persists requested preload languages and records readiness, failure and timeout separately, so requested languages are not automatically considered ready.

Browser author and file journeys reject external HTTP requests while allowing localhost and loopback. They exercise deterministic provider failures, cancellation, Draft recovery, immutable saves and export. The packaged Assistant failure journey disables external hostname resolution on both launches and checks saved text and Revision history after restart. This is a regression fixture, not an operating-system firewall test or a real remote-provider outage test. Keep the manual disconnected acceptance below for that distinction.

## Manual acceptance

Install the packaged app, prepare spelling languages, and create an Article with two saved Revisions and an unsaved Draft checkpoint. Close the app. Disconnect external networking while preserving loopback and reopen it. Confirm the Draft recovers, edit and save another Revision, search the Library, inspect and restore an older Revision, and export each supported format. Reopen the exports and compare formatting and text.

Request the Assistant through a configured remote connection. Confirm useful failure feedback, preserved input or explicit Retry, unchanged Article history and no partial Proposal. Continue editing and restart again. Repeat with no configured connection and verify the Assistant setup message and Settings action. Finally test an already running local model with external networking still disconnected. Record platform, prepared dictionaries and results without private content.
