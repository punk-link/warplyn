---
description: "Revise an Article with AI in Warplyn: focus a request, compare proposed edits, apply selected changes, and keep earlier Revisions available."
---

# Revise an Article with AI and review every change

When a scene has the right events but the pacing feels uneven, Warplyn's Editorial Assistant can help you revise it. Work on a passage or a whole *Article*, compare the proposed wording, and apply the changes you want to keep.

Warplyn is an open-source, local-first writing workspace for Windows and Linux. Your writing stays on your computer. AI assistance requires an internet connection and a supported provider connection with your API key. The relevant text and context go to that provider, whose pricing and data policies apply.

## Start with a focused request

Open your *Article* and select the passage you want to revise. In the Composer, describe what should improve and what should stay. For example, while working on The River at Dusk:

> Improve the flow while keeping Ana's point of view and the quiet mood. Don't add new events.

Select **Send editorial request**. Warplyn sends the selection with up to 500 characters on either side as read-only context. Only the selected passage can be replaced. Check the Composer's context explanation before sending sensitive writing. For more detail, see [Editorial Assistant](editorial-assistant.md).

[![Warplyn's Composer with a fiction revision request.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*An example request in the Composer. The screenshot shows an earlier Skill name.*

## Compare the original and proposed wording

When the request finishes, open **Proposal Review** from its result card. Compare **Original** and **Proposed**, checking that the revision keeps the scene's events, point of view, and voice.

[![Proposal Review comparing Original and Proposed text with individual decisions and Apply.](/images/proposal-review.png)](/images/proposal-review.png)

*An example review for The River at Dusk. Generated wording varies with your request and model.*

Choose **Accept** or **Reject** for individual changes. You can edit **Proposed** wording before applying it. If Warplyn cannot safely split a *Proposal*, it explains that you need to review it as a whole.

## Apply the changes and keep the history

Choose **Apply** after deciding on every change. Accepted text creates a new *Revision*. Rejecting every change leaves the *Article* unchanged and creates no *Revision*. Decisions alone do not change your writing.

Open **Revision History** to inspect earlier saved versions. Restoring one adds another *Revision* and preserves the intervening history. See [Reviewing Articles](reviewing-articles.md) for recovery choices and stale *Proposals*.

AI revisions can miss your intent or change details you wanted to preserve. Review the result before applying it; ask again with a narrower request when needed. A cancelled or failed request leaves the *Article* unchanged.

## Try it with your writing

[Download Warplyn](https://github.com/punk-link/warplyn/releases/latest), follow the [installation guide](installation.md), and connect a supported [AI provider](providers.md). Windows installers are unsigned; the installation guide explains the warning you may see.
