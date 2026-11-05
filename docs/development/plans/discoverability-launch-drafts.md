# Discoverability launch drafts

Prepared 2026-11-05. These drafts are for review; nothing has been submitted. Keep the [discoverability checklist](discoverability.md) as the status owner.

## Publication prerequisites

- The workflow URL must return the guide, not a 404 or the homepage: https://warplyn.com/docs/revise-an-article-with-ai.html. It returned 404 during this audit.
- Confirm current platform support, installer warnings, provider setup, and download links before posting.
- The maintainer chooses the audience and authorizes publication. Submit under the maintainer's own account; do not invent personal motivations or solicit votes.

## AlternativeTo listing

The [AlternativeTo FAQ](https://alternativeto.net/faq/#add-a-new-application) permits developers to suggest their own application through the application submission form. A verified email is required. Use the form rather than advertising through a user profile. Submissions are reviewed; approval and review timing are not guaranteed. No paid review is authorized.

Suggested fields, adapted to the options the current form provides:

| Field | Draft |
| --- | --- |
| Name | Warplyn |
| Website | https://warplyn.com/ |
| Source | https://github.com/punk-link/warplyn |
| Platforms | Windows 11 x64; Debian Linux x64 |
| License | Open source, MIT |
| Pricing explanation | Current app features are free; AI providers charge separately. Optional extras may be paid. Confirm the form's pricing classification against the current plans page. |
| Suggested tags | writing, text editing, local-first, AI assistant, article writing |
| Short description | A local-first writing workspace with optional AI editorial assistance. |

Long description:

> Warplyn is an open-source, local-first writing workspace for Windows and Linux. Write and revise Articles, with an AI Editorial Assistant when you want help.
>
> Ask for help developing a draft, revising a passage, checking claims against sources, or translating an Article. Compare proposed changes before applying them. Accepted edits create Revisions, and earlier versions remain recoverable. Translations are separate linked Articles.
>
> Your writing is stored on your computer. AI assistance requires an internet connection and your own supported provider API key. Requests send the relevant text and context to that provider, whose pricing and data policies apply.
>
> Warplyn is in beta. Windows installers are unsigned. It helps you prepare writing for publication; you publish through your chosen platform.

Use the existing Composer and Proposal Review screenshots if the form accepts them. The Composer image shows an earlier Skill name, so keep its explanatory caption or refresh it first. Avoid claiming full offline AI operation or compatibility with macOS.

## Show HN submission

The [Show HN guidelines](https://news.ycombinator.com/showhn.html) require something readers can try, rather than a landing page alone. Desktop software qualifies in principle. Link the runnable project and explain the provider-key requirement. The maker should be available to discuss it; do not ask others for votes or comments.

Title:

> Show HN: Warplyn, a local-first writing workspace with optional AI assistance

Submission URL:

https://github.com/punk-link/warplyn

Opening comment draft for the maintainer:

> Warplyn is a desktop writing workspace for Windows and Debian Linux. The source is MIT licensed, and installers are available from the repository's releases.
>
> The Editorial Assistant can help develop and revise Articles, check claims, and prepare translations. Edits arrive as proposals: you compare the original and proposed wording, choose changes, and apply them. Accepted changes create a Revision, so earlier writing stays recoverable.
>
> AI is optional. Your Articles stay on your computer; using the Assistant requires an internet connection and your own supported provider API key. Relevant text and context are sent to that provider. Provider charges are separate.
>
> Here is a walkthrough of a revision request and review: https://warplyn.com/docs/revise-an-article-with-ai.html
>
> The app is in beta and the Windows installer is unsigned. Feedback on writing, reviewing edits, and setup would be useful.

Add a brief personal explanation of why you built it in your own words. The draft deliberately makes no claim about your motivations. Recheck the guidelines immediately before submission.

## Measurement without new collection

Record the publication URL and date, the existing aggregate workflow-page visits, and download-click events. Compare the same reporting windows before and after publication, with a follow-up 28 days after capturing the baseline. Existing privacy controls remain in force. A download click is not proof of installation, and increased traffic alone does not establish which channel caused it.
