---
description: "Check factual claims, review sources and verdicts, and decide how to handle Fact Check findings."
---

# Fact Check

Use **Check facts** to research verifiable claims in an *Article*, such as historical details or statements about a place. The Assistant returns advisory *Findings* with explanations, sources, and uncertainty. A check does not change your text.

Fact checking needs an [AI connection and model](providers.md) that supports sourced fact checking. Provider charges may apply.

## Start a check

1. Open the *Article*. Select a passage if you want to focus the check.
2. Open **Quick actions** and choose **Check facts**. You can also ask the Assistant to check facts in your text.
3. Review the claims the Assistant selects and deselect any you do not want checked.
4. Select **Send editorial request**.
5. Open **Fact Check** to inspect the results for the saved *Revision* being checked.

::: tip Example
In The River at Dusk, Ana says the full moon will raise the water enough to cover the path. Check that claim against sources relevant to the river and the story's setting. Read whether the sources describe that particular river before changing the scene.
:::

You can keep writing or navigate elsewhere while the check runs. If a run is incomplete, only completed *Findings* are available. Request another check for the unfinished claims.

## Read the verdict and sources

Select a claim in **Fact Check** to read its explanation, sources, check date, and uncertainty.

| Verdict | What it means |
| --- | --- |
| **Supported** | The evidence found supports the claim. It is still worth checking whether the sources fit your context. |
| **Disputed** | The evidence found challenges the claim. Read the explanation and sources before deciding what to change. |
| **Unverifiable** | The check could not establish the claim from the available evidence. This does not by itself mean the claim is false. |

Open the source links and check their relevance, dates, and wording. A *Finding* is advice, not proof. The check date tells you when the claim was checked; it does not mean every source was published then.

## Decide what to do with a Finding

For an unresolved *Finding* in the latest check of the current *Revision*, choose the action that matches your decision.

| Action | Result |
| --- | --- |
| **Accept as written** | Records that you intend to keep the claim as written. The *Finding* shows **Accepted as written**. |
| **Accept evidence** | Records that you reviewed and accepted the evidence. The *Finding* shows **Evidence accepted**. |
| **Propose correction** | For a **Disputed** or **Unverifiable** claim, asks the Assistant to prepare a correction *Proposal*. Review it before applying changes. |

Both acceptance actions mark the *Finding* as resolved, remove its decision buttons, and stop it requesting attention in the Article library. Neither changes the *Article* or the verdict. They record different reasons for your decision and otherwise have the same effect on the review workflow.

For example, **Disputed · Evidence accepted** means the check disputed the claim and you accepted the evidence it presented. It does **not** mean the claim has been corrected or is now supported. If the text needs changing, edit the *Article* or request a correction before resolving the *Finding*.

To request several corrections together, select unresolved **Disputed** or **Unverifiable** claims and choose **Propose corrections**. In [Proposal Review](reviewing-articles.md#review-a-proposal), inspect the suggested wording and apply the changes you accept. Applying accepted text creates a new *Revision*.

## Recheck after changes

*Findings* belong to the *Revision* that was checked. When another *Revision* becomes current, earlier *Findings* remain readable but are stale. Choose **Run Fact Check again** before acting on them.

Use **Fact Check history** to inspect earlier runs. Earlier runs are read-only; the latest run for the current *Revision* is the one you can act on.

A later check can reuse evidence and acceptance decisions when it recognizes an unchanged fact, including a rephrased claim. Reused results show **Evidence reused from Revision** and retain their earlier check date. Changed factual meaning can require new research.

Running a check again does not guarantee fresh research for every unchanged claim. For time-sensitive details, inspect the source and check dates and ask the Assistant explicitly to verify the claim against current sources.
