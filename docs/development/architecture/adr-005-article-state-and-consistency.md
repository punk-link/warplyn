# ADR-005: Article changes use immutable Revisions and Revision-bound artifacts

- Status: Accepted
- Date: 2026-08-21
- Updated: 2026-10-02
- Scope: Article, Draft, Revision, Proposal, Finding, and translation state
- Depends on: [ADR-001](adr-001-three-layer-server-and-electron.md), [ADR-002](adr-002-shared-contract-organization.md)

## Context

Authors need recoverable work and attributable changes. Delayed AI output must not overwrite newer text.

## Decision

An Article points to its current immutable Revision. Editing creates a mutable Draft checkpoint tied to that Revision. Explicit save promotes only the matching current checkpoint into one new Revision and clears only that checkpoint.

Proposals and advisory Findings record their base Revision and become stale when the current Revision changes. Stale output cannot change content. Accepting a valid Proposal creates one Revision; rejecting or resolving advisory output creates none.

Restoration appends a new Revision with source provenance. It never rewrites history. Conflicting or retained Drafts remain recoverable until the Author explicitly chooses which text to use.

Conversation checkpoint restoration atomically rejects the selected request and later active conversation and artifacts. A linked Article restoration appends a Revision while preserving displaced history. Draft preservation is the default; discard requires explicit choice. A stale confirmation or failed transaction changes neither conversation nor Article state.

A validated Assistant reply replacement may apply once through an Author action or an explicitly authorized opt-in direct-edit mode. Both paths reject stale Revisions and current Drafts, then atomically append an attributable Revision and record application. Failed or incomplete requests never change Article content.

Translations are independently recoverable Articles with their own Drafts and Revisions and recorded source Article and Revision.
Explicit acceptance of a reviewed source translation may refresh a named existing translation. The same transaction validates source freshness, the target Revision, absence of a target Draft, and the completed artifact, then appends a Revision and updates the source link. Each translation Revision records its source snapshot; restoration recovers that snapshot without rewriting history. Refresh preserves the independently edited title. Edit opens the existing translation for the selected language, or creates it when none exists. Previously created duplicate translations remain recoverable; Update identifies the target in its confirmation.

## Consequences

Every durable content change remains recoverable and attributable. Optimistic conflicts may require an Author decision or regenerated output.

## Verification and references

Test exact checkpoint promotion, conflict handling, immutable restoration, stale-artifact blocking, and independent translations. [Assistant execution and recovery](../reference/assistant-execution-and-recovery.md) specifies checkpoint and reply-application details. Canonical visible behavior remains in [Article Workspace](../../../product-model/areas/article-workspace.json) and [editorial workflows](../../../product-model/areas/editorial-workflows.json); use the [testing guide](../guides/testing.md).

