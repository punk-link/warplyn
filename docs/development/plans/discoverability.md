# Warplyn discoverability checklist

Created 2026-11-05. Status: implementation authorized on 2026-11-05; repository work completed, account tasks and deployment remain. Use Warp for the unrelated `punk-link/warp` project.

Goal: help prospective Authors find Warplyn, understand its writing workflow, and install it successfully. Preserve the agreed writing workspace positioning and accurate privacy and connectivity expectations.

## Evidence and priorities

Checks on 2026-11-05 confirmed Google verification DNS TXT exists, `www.warplyn.com` returns NXDOMAIN, and `punk-link/warp` incorrectly lists `https://warplyn.com` as its homepage. The checkout already has README screenshots and installation links, homepage metadata, robots.txt, a sitemap, and task-specific docs. The checked-in WinGet 0.6.2 manifests are intentionally templates; stable releases generate current manifests.

Search-tool results showed weak branded visibility. They do not establish Google indexing status, backlink coverage, or the cause of weak rankings. Recheck live facts before implementation.

## Actions needing your help

These require account access, private dashboard evidence, or a product/business decision. The agent can prepare changes and perform accessible work; ask for help only when access or a decision is actually missing.

- [ ] **P0: Enable the www address.** Owner: domain/hosting account holder, with agent preparation. Add the appropriate DNS record, provision HTTPS, and permanently redirect `https://www.warplyn.com/*` to the matching apex URL. Done when DNS resolves, the certificate is valid, and paths and query strings survive the redirect.
- [ ] **P0: Inspect Search Console.** Owner: you, or agent with dashboard access. Inspect `/` and representative docs pages; record crawl status, selected canonical, indexing exclusions, sitemap submission and processing status. Inspect Bing separately. Share actionable findings without credentials. Done when each sampled URL has a known status and any exclusion has a specific follow-up. Existing TXT verification needs no duplicate meta tag.
- [ ] **P1: Choose launch channels and approve public submissions.** Owner: you. Agent prepares a demo, accurate copy, and a short relevant shortlist after the workflow page is ready. Select audiences and approve posts/listings before publication. Done when approved submissions have URLs and a way to assess visits or feedback. External posting requires explicit authorization.
- [ ] **P2: Decide installer signing investment.** Owner: you, with agent research. Review signing requirements, costs, and observed installation friction. Done when there is a recorded decision to implement signing or defer it with a reason. Signing is a conversion concern, not an indexing fix.

## Actions the agent can handle

- [ ] **P0: Correct stale project identity.** Owners: `punk-link/warp` GitHub homepage metadata and reported `https://warp.punk.link/Privacy` content. Inspect the unrelated project's actual destination, correct the homepage, and remove incorrect Warplyn branding where appropriate. Audit old Skladno/domain links and preserve useful redirects. Use existing GitHub access; request your help only if permissions or destination ownership are missing. Done when public metadata describes each project accurately and migrated URLs reach relevant destinations. Closing or renaming Warp is outside scope.
- [x] **P1: Verify deployed crawlability.** Owners: `site/index.html`, `site/public/robots.txt`, `site/public/sitemap.xml`, deployment configuration, and `scripts/check-site-metadata.mjs`. Check HTTP status, response headers, readable HTML, canonical URLs, sitemap entries, and representative docs against the deployed site. Turn GSC findings into targeted fixes when available. Done when sampled pages return intended content and indexable responses, and site metadata validation passes. Fetch-tool failures alone are not site defects.
- [x] **P1: Clarify the first screen.** Owners: `site/index.html` and existing site styles. Keep the motto and add or refine nearby copy explaining an open-source writing workspace for Windows and Linux, with Author-approved changes. Follow `docs/development/guides/product-positioning.md`. Done when the first screen explains purpose and control without requiring scrolling, and browser journeys pass for desktop and mobile layouts.
- [ ] **P1: Complete WinGet readiness.** Owners: `distribution/winget/README.md`, manifest templates, and stable-release manifest generation. Check existing catalog entries and open submissions first. Validate the latest generated manifests; exercise silent installation, upgrade, and uninstall in a disposable Windows environment. Prepare a submission only after those pass. Done when lifecycle evidence and valid current manifests exist; catalog publication remains pending until the submission is accepted. Request your help only if a disposable environment or submission access is unavailable.
- [x] **P1: Build one workflow demonstration.** Owners: `site/`, `site/user-docs/`, sitemap and site metadata validation. Show revising an Article through request, proposed changes, acceptance, and preserved history, with representative screenshots, limitations, and download/docs links. Reuse established site patterns. Done when the page is linked, accurate, accessible, included in the sitemap, and passes site checks and browser journeys. Expand to additional distinct workflows only when audience evidence justifies them.
- [ ] **P1: Align public descriptions.** Owners: README, GitHub description/topics/social preview, website links, and prepared directory copy. Keep the agreed category and supported platforms consistent. Mention Markdown only for actual workflows; distinguish local writing from connected AI assistance. Done when audited surfaces agree and links resolve. Use existing account access for metadata; prepare external posts for the approval above.
- [x] **P2: Describe the application in structured data.** Owner: `site/index.html` and `scripts/check-site-metadata.mjs`. Add accurate `SoftwareApplication` information and a suitable GitHub identity link if consistent with visible content. Avoid manually maintained release versions unless needed. Done when markup validates and platform, license, price, and download claims match the page. No ranking or rich-result promise; FAQ markup is not a required deliverable.
- [ ] **P2: Establish measurement.** Owners: existing analytics integration and search dashboards. Inventory existing aggregate events before adding instrumentation. Measure indexed pages, branded/nonbrand impressions, workflow visits, and download clicks; record installation complaints separately. Done when a baseline and a follow-up review date exist. Use available aggregate data; expanded telemetry or private-data collection requires separate scope. Dashboard access may need your help.
- [x] **P3: Evaluate llms.txt only with evidence.** Owner: site public assets. First verify readable HTML, stable links, and docs accessibility. Done when a concrete consumer need supports adding it, or it is explicitly deferred. Its absence is not an established cause of failed AI discovery.

## Execution and handoff

### Completed work and evidence, 2026-11-05

- Public GitHub metadata is updated: Warp's homepage is `https://warp.punk.link`; Warplyn's description names its category, Windows/Linux support, Author control, and MIT license. Topics now cover writing, local-first, desktop, Electron, and open source, replacing text-editor targeting.
- Warp source cleanup is prepared in [draft PR #306](https://github.com/punk-link/warp/pull/306), head `910cd76f2f07e4a0b556642ebe3651147bae3f5f`. UI titles, English/Spanish names, privacy URLs, footer, OpenGraph resources, robots/sitemap, and deployment references use Warp and warp.punk.link. No Warplyn references remain in the checkout. The PR is not deployed; the live privacy page could not be verified because its TLS connection failed from this environment. Review certificate provisioning for the new Helm TLS secret before deploying. Source checkout: `C:/Projects/warp-discoverability`.
- Direct HTTP checks returned 200 for the deployed Warplyn homepage, robots.txt, sitemap, and reviewing-articles guide. Sampled HTML had the expected apex canonicals and no X-Robots-Tag exclusion. The prior web-fetch failures did not establish a hosting defect. GSC evidence is still needed for indexing conclusions.
- Homepage copy now explains category and platforms beside the motto, and links to `site/user-docs/revise-an-article-with-ai.md`. The workflow guide uses existing app screenshots, covers request/context, comparison, acceptance, and recoverable history, and links to installation. Guide index, sidebar, and sitemap are updated.
- Homepage SoftwareApplication JSON-LD describes platforms, license, and download URL; WebSite links to GitHub. Site validation parses the JSON and checks the application fields. No manually maintained version or unsupported pricing promise was added.
- WinGet exact-ID search found no catalog entry; GitHub PR search found no existing Warplyn submission. Downloaded current `winget-v0.8.1` artifact from Windows release run `41950976472`. `winget validate` passes for its `0.8.1` directory. Published installer SHA-256 matches `D03D7AEF67E99074D04AAE0F8B5CB72EC80591B29E1571DD7FEC72BE7DF68D75`. Artifacts remain outside tracked files under `.git/discoverability-artifacts/`. No template change was needed. Silent install, upgrade, and uninstall require a disposable Windows environment before submission.
- Existing Google Analytics supports guide pageviews and `download_clicked`; homepage/plans PostHog supports website pageviews and download button location. Reused these without expanding collection. Dashboard totals, successful ingestion, and installation conversion remain unverified. Review the baseline and follow-up below when dashboard access is available.
- llms.txt is explicitly deferred: no identified consumer requirement justifies it yet.

### Validation

- Warplyn: `npm run build:site`, `npm run check:site` for 30 pages, `npm run verify:core`, and `git diff --check` passed. Product impact matched existing public website analytics; no product capability changed.
- Browser gate: `npm run verify:browser` passed all 46 journeys. Additional Chromium checks passed homepage-to-workflow navigation at 1440px and 390px, both guide images loading, local guide links returning 200, and no horizontal overflow. Mobile homepage and guide screenshots were visually inspected. Images open at full size. Screenshots are local verification artifacts under `.git/discoverability-artifacts/`.
- Desktop gate: not applicable to the Warplyn site-only change. WinGet installation lifecycle is a separate pending validation, not covered by browser tests or schema validation.
- Warp: four localization tests, client production build, focused OpenGraph server tests, and diff whitespace checks passed. Client typecheck failed in dependency declarations for Vue/i18n, type-fest, and Vite, outside the branding edits. Server restore reported dependency advisories. Full Warp E2E, Helm rendering, live deployment, and certificate verification remain unrun. Draft PR checks were in progress at handoff.

### Remaining help and follow-up

1. Domain/hosting access: repair www DNS, HTTPS and redirect; verify before checking off P0.
2. GSC/Bing/analytics access: inspect indexing and sitemap status; record the prior 28 days of branded/nonbrand impressions, workflow visits and download clicks. Use the new workflow URL to segment visits after deployment. Record unavailable metrics as unavailable. Review again on 2026-12-03; download clicks do not establish installs.
3. Warp deployment: review draft PR #306, resolve its dependency-check limitations as appropriate, and deploy with matching TLS/ingress configuration. Recheck public titles, privacy links, robots and sitemap afterward.
4. WinGet: supply a disposable Windows VM for fresh silent installation, upgrade from the prior release, and uninstall. Submission remains blocked on those checks, not on missing manifests.
5. Promotion: select channels and approve the prepared copy below. Installer signing remains a business decision. No launch posts or directory submissions have been sent.

### Prepared promotion copy for review

Use the workflow URL after these site changes deploy: `https://warplyn.com/docs/revise-an-article-with-ai.html`.

Suggested title: **Warplyn: an open-source writing workspace for Windows and Linux**

Suggested description: Warplyn helps you develop and revise Articles with an Editorial Assistant. Compare proposed edits and apply the changes you want to keep, with recoverable Revision history. Writing stays on your computer; AI requests send relevant text and context to your chosen provider and require your API key. Windows and Debian Linux downloads are available. The project is MIT licensed and in beta; Windows installers are unsigned.

Suggested first channels: AlternativeTo for an accurate product listing, and a writing or local-first community whose current self-promotion rules allow a workflow demonstration. Consider Show HN once the demo and installation path are ready. Check each channel's rules before submitting; avoid a simultaneous mass launch. Use existing aggregate pageview and download events to assess response rather than adding tracking identifiers.

Start with www, stale identity, and indexing evidence; then first-screen clarity, WinGet readiness, and one workflow demonstration. Prepare promotion after those deliverables exist. Metadata enrichment and llms.txt remain secondary.

For implementation, read the affected-area guides and run product impact analysis where behavior or owner paths change. Select checks using [the testing guide](../guides/testing.md). Report core/site checks, browser journeys, and applicable packaged desktop journeys separately, including checks not run. WinGet changes require the disposable installation lifecycle checks above; a plan-only edit requires no application tests.

Record completion evidence beside each checkbox. Move lasting decisions into the appropriate guide or ADR and delete this plan when no work remains.
