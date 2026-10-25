---
name: skladno-user-docs
description: Write or revise Skladno user documentation, including help articles, setup guides, and feature explanations. Use when changing content in site/user-docs or other Author-facing instructions.
---

# Skladno user documentation

Write for Authors using the current application. Check the relevant screen's rendered controls and `packages/web/src/i18n/messages.ts` before naming a setting, action, view, or status. Use the exact English interface label in headings, steps, and cross-references. If the interface differs from the documentation, verify current behavior before choosing wording; do not invent a friendlier label and present it as a second product name.

Use [the glossary](../../../site/user-docs/glossary.md) for domain terms and the implementation or product model for behavior. Describe only available behavior, including prerequisites, fallback behavior, and limits that affect the Author's decision. Explain what to do in the app, not its internal architecture.

Write customer-facing explanations in the context where readers need them. Give an unfamiliar term enough explanation to make the next step clear, but keep routine safeguards brief and proportionate. Do not expose internal budget, prioritization, or release-planning rationale as product copy. Place platform-specific caveats beside the relevant step, and explain what the warning means for the reader.

Use a why-and-how approach: explain when a feature helps the Author, then show how to use it and what happens afterward. Keep prose simple and technical detail limited to what the Author needs to make a decision or follow an instruction. Keep control names, steps, prerequisites, and recovery choices precise.

When covering a list of documentation gaps, map every requested topic to a useful explanation and actionable instructions where appropriate. A glossary definition, passing mention, or link alone does not cover a workflow. Extend or rewrite existing articles where the topic belongs; add an article when it gives Authors a clearer place to find the material. Choose article boundaries around Author tasks, without forcing one article per topic or compressing unrelated topics to meet an article count.

Keep introductory copy connected and useful: add context when sentences feel abrupt, but avoid padding the landing page with obvious guarantees or repeating content already covered by the index or navigation.

Give each entity one name throughout an article. Repeat the same term when clarity needs it; do not alternate synonyms or pair two names for one entity. A heading about the **App model** setting should call it **App model**, matching the control, rather than renaming it “Text generation model for Skladno.” Distinguish genuinely different entities, such as the App model and the Default model.

Use Markdown emphasis for application domain terms in prose, such as *Article*, *Draft*, and *Revision*. Format commands the Author types or runs in inline code, such as `npm run dev`; use fenced code blocks for multiline commands.

Write the product name Warplyn in plain text. Use bold for menu item labels and separate menu-path levels with an arrow, such as **File** → **Settings**. Verify each label and path against the current interface.

Before finishing, read the article from the Author's perspective: is its purpose clear, can every named control be found, does each term mean one thing, and can the Author complete the task from these instructions? Check each requested topic against the finished content before claiming full coverage. Fix related links and references when a label changes.

For documentation examples, follow the landing page story The River at Dusk: use concrete scenes, characters, dialogue, and chapters. Keep examples consistent with that literary context even for technical features, while preserving each feature's real audience and limits. Frame the Assistant as the Author's helper with specific, bounded requests. Treat the Author's control as implicit; omit stock reminders such as "I will decide" or "I will compare" unless needed to explain a real workflow step. Avoid office goals, meeting notes, release notes, and business scenarios. Put longer examples in a visually distinct callout or side note so they do not interrupt the instructions. When adding screenshots, use legible captures from the actual app; let the user provide captures when they prefer to. Make a screenshot open its full-size image and verify the built URL, especially when the site has a non-root base path. Avoid pinning a release number when a link to the current releases page will stay accurate longer.

Check the rendered site navigation as well as the Markdown. Confirm that index entries lead to the right articles and that previous/next links reflect the intended article order; a sidebar link to the index does not make it an article in that sequence. For external-link markers, use a recognizable, visually balanced icon and inspect it in rendered text so it does not read like extra punctuation.

When adding or moving guide pages, update the guide index, VitePress sidebar, and public sitemap together. Run the full site build before checking site metadata: the docs-only build refreshes the guide output but leaves the root site's distribution and sitemap unchanged. Report source checks, builds, and manual UI or browser verification separately so a successful build is not presented as a completed walkthrough.
