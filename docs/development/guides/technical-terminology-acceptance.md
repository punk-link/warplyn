# Check technical terms acceptance

Issue: [#17](https://github.com/punk-link/warplyn/issues/17).

The built-in Check technical terms Skill reuses Fact Check, including provider
configuration, review history, safe errors, and local advisory resolutions.
There is no background terminology scan or separate terminology database.
The Author benefit is a focused, sourced review without changing their writing.
The tradeoff is model judgment and potentially incomplete or evolving evidence.

## Manual acceptance

Use a disposable Article with no private content and configured Fact Check
providers with web research available. The operation sends the Article or selected
passage to configured providers; research queries may disclose terminology and
claim context. Existing provider response-storage preferences apply.

1. Save an Article containing `TCP is a connectionless protocol.`, a correct
   technical statement, two conflicting names for one concept, an explicitly
   defined local acronym, and code such as `const TCP = 42;`.
2. Confirm that saving alone produces no terminology Findings. Choose Technical
   terminology in Assistant Quick actions. Inspect its provider hint, then Send.
3. Open the result in Fact Check. Confirm that the TCP usage has a reason and a
   relevant primary citation, such as RFC 9293. Check that inconsistent names are
   compared in context. Local definitions and version-specific names must not be
   treated as errors merely because they are unfamiliar. Check uncertainty when
   evidence conflicts or is absent. Open citations and assess their relevance.
4. Accept a questioned usage as written. Reload and confirm its resolution remains
   visible. Confirm Article text, code, identifiers, and Revision count are unchanged.
   A correction requires a separate Proposal and explicit acceptance.
5. Select only the TCP sentence and repeat through Assistant. Confirm the review
   is limited to that selection. Use deterministic integration tests to verify
   that surrounding private text does not reach the generation request.
6. Repeat with an unavailable Fact Check connection, then with a research failure
   or cancellation. Confirm existing safe error and retry or Settings guidance,
   unchanged Article content, and no unfinished claim persisted as a Finding.

Deterministic tests verify routing, scope, persistence, and Author control. They
do not measure terminology accuracy, citation relevance, or false-positive rates.
Record the tested provider/model and manual result without Article bodies or raw
provider output. Follow [testing](testing.md) for browser and desktop gates.
