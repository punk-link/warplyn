# Internationalization

Skladno ships one complete interface locale, English (`en`). Application-owned renderer copy lives in `packages/web/src/i18n/messages.ts`; semantic IDs are stable and grouped by responsibility. `locales/en.ts` must contain exactly that inventory.

Use ICU messages for interpolation and count-dependent wording. Parameters are named data such as `{articleTitle}` and `{count}`; never concatenate translated fragments or treat author input as ICU source. Use `intl.formatNumber`/`FormattedNumber` for displayed numbers and `formatDateTime` for timestamps so General date and time preferences stay consistent.

Accessible-only names have their own IDs. Do not translate Article text, proposals, findings, citations, user-entered names, model IDs, environment-variable names, paths, URLs, Markdown, or persisted enum values.

## Application terminology

Use the [Warplyn glossary](../../../site/user-docs/glossary.md) as the authority for application concepts and their English names. Apply the same concepts across renderer copy, native dialogs, accessible names, and translated help. When introducing a concept or changing its meaning, update the glossary before translating it.

Preserve the glossary's distinctions in every locale. Keep qualifiers when shortening a term would make its meaning ambiguous.

For each new locale, include a terminology record in the locale-specific issue. Map each glossary concept used in the interface to its approved local term, grammatical forms, capitalization conventions, and any context-specific variants. Include terms to avoid where a likely synonym would confuse two concepts. Obtain native-language review of this record before translating the catalog; keep it current when terminology changes. English uses the glossary as its terminology record.

Keep contextual message IDs separate even when their English text matches. For example, `articleHeader.saveRevision` and `keyBindings.saveRevision` both refer to saving a Revision, but their translations may differ by context. Translate complete messages using the approved terminology; do not assemble sentences from separately translated term fragments. Inflection, word order, and capitalization follow the target language rather than English spelling rules.

Review terminology by concept across the complete locale, including existing messages when adding new copy. Repeated command labels should express the same action while allowing reviewed grammatical differences. Catalog completeness and valid ICU syntax do not establish terminology consistency; native-language review remains required. Do not enforce identical substrings or ban ordinary words globally, since valid forms and unrelated uses vary by context.

## Command labels

Append the single ellipsis character `…` to commands that require further Author input, such as choosing a file or entering options, before completing. Use matching wording and punctuation in menus, button labels, and tooltips. The file commands are `Save to file…` and `Load from file…` in both desktop and browser. Immediate actions and commands that only ask for confirmation, such as Archive and Delete, use plain labels without an ellipsis.

## Enforcement

Production components consume the application-level `I18nProvider`; fixed-locale or component-local providers are test-only. ESLint rejects uncatalogued JSX copy and literal user-visible attributes, production `IntlProvider` instances, and selectors coupled to localized accessible labels. Intentional product identity text uses the narrow repository allowlist; other exceptions require a local suppression with a reason.

React Intl message IDs are typed from the canonical catalog. Prefer explicit `Record<DomainValue, MessageId>` mappings for domain-to-copy boundaries; do not build unchecked IDs from runtime strings. Catalog tests require every installed locale to contain exactly the canonical IDs with valid ICU syntax. A pseudo-locale component test verifies that core workspace surfaces inherit the surrounding provider and exposes hard-coded English or provider shadowing.

Translated text is presentation data, never an identifier, selector, branch condition, enum, transport value, or persisted control value. Use refs or stable data attributes for DOM behavior. A localized default may be stored only when it becomes author-editable Article content or metadata at creation; after persistence it is Article data and is not translated again.

The local service sends stable `ApplicationErrorCode` payloads only. The renderer maps them in `i18n/errors.ts`; payload parameters must be safe presentation data and never include credentials, article bodies, provider output, paths, or stack traces.

## Adding a locale

Open a locale-specific issue naming the language and human reviewer. Prepare and review the terminology record described above. Copy the canonical inventory, translate every entry while preserving ICU arguments and rich-text placeholders, add metadata, and validate catalog completeness and ICU syntax. Run type, lint, catalog, pseudo-locale, and component tests; obtain native-language review before extending the installed registry and shared locale union. Check the complete locale against its approved terminology, including native dialogs and accessible names. Review responsive clipping, keyboard access, plural cases, dates/numbers, and English fallback behavior.
