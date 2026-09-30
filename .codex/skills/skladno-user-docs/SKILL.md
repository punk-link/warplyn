---
name: skladno-user-docs
description: Write or revise Skladno user documentation, including help articles, setup guides, and feature explanations. Use when changing content in site/user-docs or other Author-facing instructions.
---

# Skladno user documentation

Write for Authors using the current application. Check the relevant screen's rendered controls and `packages/web/src/i18n/messages.ts` before naming a setting, action, view, or status. Use the exact English interface label in headings, steps, and cross-references. If the interface differs from the documentation, verify current behavior before choosing wording; do not invent a friendlier label and present it as a second product name.

Use [the glossary](../../../site/user-docs/glossary.md) for domain terms and the implementation or product model for behavior. Describe only available behavior, including prerequisites, fallback behavior, and limits that affect the Author's decision. Explain what to do in the app, not its internal architecture.

Write customer-facing explanations in the context where readers need them. Give an unfamiliar term enough explanation to make the next step clear, but keep routine safeguards brief and proportionate. Do not expose internal budget, prioritization, or release-planning rationale as product copy. Place platform-specific caveats beside the relevant step, and explain what the warning means for the reader.

Keep introductory copy connected and useful: add context when sentences feel abrupt, but avoid padding the landing page with obvious guarantees or repeating content already covered by the index or navigation.

Give each entity one name throughout an article. Repeat the same term when clarity needs it; do not alternate synonyms or pair two names for one entity. A heading about the **App model** setting should call it **App model**, matching the control, rather than renaming it “Text generation model for Skladno.” Distinguish genuinely different entities, such as the App model and the Default model.

Use Markdown emphasis for application domain terms in prose, such as *Article*, *Draft*, and *Revision*. Format commands the Author types or runs in inline code, such as `npm run dev`; use fenced code blocks for multiline commands.

Write the product name Warplyn in plain text. Use bold for menu item labels and separate menu-path levels with an arrow, such as **File** → **Settings**. Verify each label and path against the current interface.

Before finishing, read the article from the Author's perspective: can every named control be found, does each term mean one thing, and do the steps match the current app? Fix related links and references when a label changes.

For documentation examples, use concrete, ordinary writing scenarios that match the product's current audience. Prefer a neutral writer example over marketing copy unless marketing is explicitly in scope. Put longer examples in a visually distinct callout or side note so they do not interrupt the instructions. When adding screenshots, use legible captures from the actual app; let the user provide captures when they prefer to. Make a screenshot open its full-size image and verify the built URL, especially when the site has a non-root base path. Avoid pinning a release number when a link to the current releases page will stay accurate longer.

Check the rendered site navigation as well as the Markdown. Confirm that index entries lead to the right articles and that previous/next links reflect the intended article order; a sidebar link to the index does not make it an article in that sequence. For external-link markers, use a recognizable, visually balanced icon and inspect it in rendered text so it does not read like extra punctuation.
