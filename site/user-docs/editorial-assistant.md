---
description: "Use Warplyn's Editorial Assistant to draft, revise, check facts, review style, and translate. Review generated changes before accepting them."
---

# Editorial Assistant

Use the Editorial Assistant when you want help composing, revising, checking facts, reviewing style, or preparing a translation. Every request is explicit. Choosing from **Quick actions** only puts a *Skill* starter in the Composer. Select **Send editorial request** to start work.

If you have selected text, the request uses that selection. Ask again for the whole *Article* when you want to widen the scope.

::: tip Example
While revising a short story, select a passage and ask: “Improve the flow while keeping Ana’s point of view and the quiet mood. Don’t add new events.” The Assistant prepares a *Proposal* for **Proposal Review**. You could also ask it to review a chapter for shifts between past and present tense; style review *Findings* appear in **Style Profile**.
:::

[![Warplyn’s Editorial Assistant with a fiction revision request and a Skill selected.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Example request in the Composer. Connect a provider before sending it. The screenshot shows an earlier Skill name.*

The Assistant shows a short activity message while it works. It does not expose prompts, private inputs, credentials, or provider errors. When work is ready, use the result card to open the result:

- **Proposal Review** for generated or revised text.
- **Fact Check** for advisory *Findings*.
- **Style Profile** for style review *Findings*.
- **Translations** for a translation *Proposal*.

Opening a result does not change the *Article*. Review and accept a *Proposal* in its Workspace View. *Findings* remain advisory, and translations remain separate linked *Articles*.

For a focused review of technical terms, choose **Check technical terms** from **Quick actions**. Its sourced *Findings* appear in **Fact Check**. See [Check technical terms](skills.md#check-technical-terms) for the review steps and limits.

*Skills* help shape a request but do not add permissions. The Assistant chooses relevant *Skills* for an untagged request. It does not route ordinary requests through a default editing workflow. Warplyn does not run background work, publish directly, or change an *Article* without your approval.

Ask the Assistant to create a reusable [Skill](skills.md) when a procedure should be available again. It may ask a short follow-up when the purpose, steps, or references are unclear. A created *Skill* is available at once and has its own local *Skill Revision* history. Creating it does not read your *Article* body or change its *Draft*, *Proposal*, or *Revision*.

You can ask the Editorial Assistant to inspect **Revision History**, saved editorial work, publishing guidance, or Style Corpus readiness. On an explicit request, it can add the current immutable *Revision* to the local Style Corpus and rebuild the Style Profile. It cannot accept *Proposals*, restore *Revisions*, resolve *Findings*, edit *Drafts*, delete style samples, or publish.

## Style Profile

Open **Style Profile** from the Article Library utility area. Use its side menu to select **Detected characteristics**, **Typography rules**, **Manual rules**, or **Writing samples**. Narrow screens use a section selector. Switching sections keeps unfinished input. **Detected characteristics** includes style review *Findings*. **Back to workspace** returns to your *Article* and the previous Workspace View.

## Typography rules

Open **Style Profile**, choose **Typography rules**, then select **Typography language**. Conventions are saved separately for each writing language, independently of the interface language. **Apply rules to** chooses between **All Articles in this language** and **This Article only**. A translation uses its own language and preferences.

The status bar's **Source language** menu includes regional languages from the preset catalog. For another language, choose **Other language…** and enter its language code, such as `ja` for Japanese. You can then save custom typography rules for that language without a built-in preset.

Use **Add rule** in **Typography rules** to choose quotation marks, prose dashes, ellipsis, punctuation spacing, repeated spaces, or a non-breaking token pair such as `10 kg`. **Custom pair** supports opening and closing quotation marks and spacing inside them. **Literal punctuation replacement** applies an exact punctuation or spacing convention. Use **Contextual typography instruction** when a rule needs judgment.

**Convention preset** shows regional convention previews. Previews labeled **awaiting native-language review** cannot be applied yet; you can configure your own rules. Regional conventions do not automatically apply to other regions. If your earlier rules were global, **Copy earlier rules to this language** assigns a copy without deleting the originals.

Article rules inherit the saved language conventions. Editing an inherited rule overrides it; removing one disables it for that scope. **Restore inherited rules** clears those overrides. Switching languages retains unsaved rule edits while Style Profile remains open.

Rules appear as compact summaries labeled **Saved** or **Unsaved**. Choose **Edit** to open a rule; only one rule is edited at a time. **Save** saves the selected scope. Saving language preferences also rebuilds the *Style Profile* locally from current included samples and saved guidance, including changes to sample inclusion. Article overrides are saved for that *Article*. Unsaved text in other forms stays unsaved. You can use explicit typography rules without writing samples; samples are needed to derive voice characteristics.

Save the current *Draft*, then select **Check typography** to check the selected *Article* without an AI connection. The check uses the saved *Revision* and its language, shown in the status bar. Choose that same language in **Typography language** when checking. Code, URLs, technical identifiers, and ambiguous quotation cases remain unchanged. Contextual rules require a full **Review writing style** through the Assistant. A language without applicable mechanical rules has no local typography coverage; add and save your own rules before checking it.

Open **Review Proposal** to inspect corrections and their supporting rules. Accept all or selected changes to create a *Revision*. Saving rules or running a check does not apply corrections. A review retains the language and rule definitions it used; a notice offers rerun after changing the language or applicable preferences. Typography does not detect language boundaries within mixed-language passages. Ambiguous cases remain unchanged.
