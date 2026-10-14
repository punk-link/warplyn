---
description: "Use Warplyn's Editorial Assistant to draft, revise, check facts, review style, and translate. Review generated changes before accepting them."
---

# Editorial Assistant

Use the Editorial Assistant when you want help composing, revising, checking facts, reviewing style, or preparing a translation. Every request is explicit. Choosing from **Quick actions** only puts a *Skill* starter in the Composer. Select **Send editorial request** to start work.

If you have selected text, the request uses that selection. Ask again for the whole *Article* when you want to widen the scope.

::: tip Example
While revising a short story, select a passage and ask: “Improve the flow while keeping Ana’s point of view and the quiet mood. Don’t add new events.” The Assistant prepares a *Proposal* for **Proposal Review**. You could also ask it to review a chapter for shifts between past and present tense; style review *Findings* appear in **Style Profile**.
:::

[![Warplyn’s Editorial Assistant with a fiction revision request and the Flow and clarity Skill selected.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Example request in the Composer. Connect a provider before sending it.*

The Assistant shows a short activity message while it works. It does not expose prompts, private inputs, credentials, or provider errors. When work is ready, use the result card to open the right Workspace View:

- **Proposal Review** for generated or revised text.
- **Fact Check** for advisory *Findings*.
- **Style Profile** for style review *Findings*.
- **Translations** for a translation *Proposal*.

Opening a result does not change the *Article*. Review and accept a *Proposal* in its Workspace View. *Findings* remain advisory, and translations remain separate linked *Articles*.

*Skills* help shape a request but do not add permissions. The Assistant chooses relevant *Skills* for an untagged request. It does not route ordinary requests through a default editing workflow. Warplyn does not run background work, publish directly, or change an *Article* without your approval.

Ask the Assistant to create a reusable [Skill](skills.md) when a procedure should be available again. It may ask a short follow-up when the purpose, steps, or references are unclear. A created *Skill* is available at once and has its own local *Skill Revision* history. Creating it does not read your *Article* body or change its *Draft*, *Proposal*, or *Revision*.

You can ask the Editorial Assistant to inspect **Revision History**, saved editorial work, publishing guidance, or Style Corpus readiness. On an explicit request, it can add the current immutable *Revision* to the local Style Corpus and rebuild the Style Profile. It cannot accept *Proposals*, restore *Revisions*, resolve *Findings*, edit *Drafts*, delete style samples, or publish.

## Typography rules

Open **Style Profile** and use **Add rule** in **Typography rules** to choose quotation marks, prose dashes, ellipsis, repeated spaces, or a non-breaking token pair such as `10 kg`. **Literal punctuation replacement** applies an exact punctuation or spacing convention. Use **Contextual typography instruction** when a rule needs judgment.

Rules appear as compact summaries labeled **Saved** or **Unsaved**. Choose **Edit** to open a rule; only one rule is edited at a time. **Save** in Typography rules saves the whole list and rebuilds the *Style Profile* locally. The rebuild includes current included samples and saved guidance, including changes to sample inclusion. Unsaved text in other forms stays unsaved. You can use explicit typography rules without writing samples; samples are needed to derive voice characteristics.

Save the current *Draft*, then select **Check typography** to check the selected *Article* without an AI connection. The check uses the saved *Revision*. Code, URLs, technical identifiers, and ambiguous quotation cases remain unchanged. Contextual rules require a full **Style review** through the Assistant.

Open **Review Proposal** to inspect corrections and their supporting rules. Accept all or selected changes to create a *Revision*. Saving rules or running a check does not apply corrections. A review retains the rule version it used; rerun the check after changing rules.
