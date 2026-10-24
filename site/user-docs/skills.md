---
description: "Check technical terminology with a built-in Warplyn Skill, or create and manage reusable Skills for your own writing tasks."
---

# Skills

*Skills* are local Markdown instruction packages. They help the Assistant choose and sequence editorial capabilities. They do not add permissions or make changes to an *Article*.

## Technical terminology

Use the built-in **Technical terminology** *Skill* to check technical language in an IT *Article*. It looks for confused concepts, misleading acronym expansions, incorrect product or API names, and inconsistent names for the same concept. It compares usage with sources for the relevant domain and version, while allowing for local definitions and evolving terminology.

1. Open your *Article*. Select a passage if you want to check only that text.
2. In the Assistant, open **Quick actions** and choose **Technical terminology**.
3. Select **Send editorial request**. Choosing the *Skill* alone does not start a check.
4. Open the completed result in **Fact Check**. Read each *Finding*, its explanation, linked sources, and uncertainty before deciding what to change.

If a questioned usage is intentional or appropriate, choose **Accept as written**. This records your decision without changing the *Article* or creating a *Revision*. Corrections require a separate *Proposal* and your acceptance. The check does not automatically rewrite prose, code, or identifiers.

::: tip Example
An *Article* calls TCP a connectionless protocol. **Technical terminology** can compare that usage with the protocol specification and explain the distinction. A locally defined acronym with the same letters may be valid in a different context, so inspect the evidence before accepting a correction.
:::

This check needs an AI connection and a model that supports sourced fact checking. See [AI providers and models](providers.md) for setup. Your *Article* or selected passage is sent to the configured AI service, and web-research queries may include its technical terms and claim context. Provider charges may apply. If the connection or research is unavailable, follow the request's error guidance to check your settings or retry.

Sources may be incomplete, outdated, or use a term differently in another domain. A *Finding* is advice, not proof that your wording is wrong. There is no background terminology scan.

## Create and manage your own Skills

Ask the Assistant to create a reusable *Skill* in plain language. Explain the repeated job and any rules or references it needs. If a missing detail would change the *Skill*, the Assistant asks a short follow-up instead of guessing.

::: tip Example
If you often revise fiction, ask: “Create a *Skill* called ‘Fiction line edit’. Tighten sentences while preserving the narrator’s voice, character names, and events. Don’t add details; flag passages that are unclear instead.” The Assistant can reuse those instructions whenever you ask for a line edit.
:::

[![Warplyn’s Editorial Assistant with a fiction line-edit Skill creation request and Skill Creator selected.](/images/skill-creator-example.png)](/images/skill-creator-example.png)

*Example Skill creation request in the Composer. Connect a provider before sending it.*

After a successful creation, the *Skill* is available for new Assistant requests immediately. The creation request does not send your *Article* body to the model and does not change the *Article*, *Draft*, *Proposal*, or *Revision*.

Each created *Skill* has a local, immutable *Skill Revision* history. This is separate from *Article* Revision history. You can also edit the local Markdown package directly. Warplyn refreshes the catalog for the next request. Removing its `SKILL.md` file removes it from the available *Skills* list.

Ask the Assistant to revise or delete a *Skill* by name. It reads the current package before changing it and checks whether the file changed in the meantime. A revision keeps the *Skill* ID and adds a new *Skill Revision*. Deletion removes the *Skill* from new requests but retains its history.

To restore earlier instructions, ask for that *Skill*'s *Revisions* and identify the one to restore. Restoration writes a new live version and appends another *Skill Revision*. You can also restore a deleted *Skill* this way. Restoring an Assistant chat checkpoint does not restore or change any *Skill*; *Skill* restoration is a separate request.
