---
description: "Create, compare, and update linked translation Articles while keeping each language's work recoverable."
---

# Translations

A *translation* is a separate linked *Article*. It has its own title, *Draft*, and *Revision* history, so work in one language does not overwrite the source.

## Request a translation

Open the source *Article* and choose **New translation…** in **Translations**. The dialog may preselect the current *Article* language. If there is no viewed language to use, it offers the preferred languages from **Settings** → **Publishing** → **Language defaults**. Select and confirm each target. Warplyn uses the whole *Article* for translation, even if you had selected a passage in the editor. If the source has unsaved edits, save them as a *Revision* first so the *translation* can identify the exact text it used.

The Assistant creates a reviewable *translation* result for each language. Open a result to compare its title and text with the source. Choose **Side by side** to compare full passages, or **Aligned paragraphs** when you want corresponding paragraphs together. Protected text such as names, numbers, URLs, and code must remain intact. Warplyn marks results that change protected text or use an older source *Revision*. Review these notices before continuing.

::: warning Save the source first
A *translation* request uses a saved *Revision*. If the source has unsaved edits, save them as a *Revision* before requesting one so the result is tied to the text you intend.
:::

## Create or update a translation Article

When a result is ready, use **Edit** to open its linked *translation Article*. If one does not exist yet, Warplyn creates it. Review the *translation* and save its *Draft* or **Save revision** when you are ready. The source *Article* stays unchanged.

To use a newer result for an existing *translation*, choose **Update** and confirm the target *Article*. Warplyn adds the translated text as a new *Revision* and keeps the *translation*'s title and earlier history. Update is blocked if the source or target changed since review, the target has an unsaved *Draft*, or the result no longer passes validation.

Choose **Reject** to remove a generated result from approval. This does not delete the source or a *translation Article* you already created. Earlier results remain available. You can create another result from **New translation…**.

::: tip Update keeps translation history
When you choose **Update**, Warplyn adds the result as a new *Revision* to the linked *translation Article*. Its title and earlier *Revisions* remain available.
:::

Each language keeps its own results. Use the language tabs and result selector to revisit a *translation* or compare a new attempt with an earlier one. A result identifies when it was created and which source *Revision* it used. If the source has changed, the result is stale and cannot create a new linked *Article*. Request a fresh *translation* and review it against the current source *Revision*.
