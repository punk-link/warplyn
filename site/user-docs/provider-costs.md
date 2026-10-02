---
description: "Understand what affects AI request costs in Warplyn, how API billing works, and how to review your provider's usage charges."
---

# AI provider costs

AI assistance is optional. Warplyn does not bill you for requests. Your AI provider may charge your account when Warplyn sends one.

## What affects the cost

Your provider sets its own rates. A request's cost can depend on:

- the provider and model you choose
- how much *Article* text and instruction context the request includes
- how much text the model returns

When you select text before sending a request, Warplyn sends that selection. Without a selection, the request may include the whole *Article* and relevant context. A narrower request can cost less, depending on provider rates.

::: tip API billing
A subscription to a provider's chat service may not include API use. Check the provider's current API pricing and billing terms before connecting a key.
:::

For routine work, such as smoothing a passage or making a focused revision, try a lower-cost model first. Use a more expensive model when the results show that the task needs one.

## Check your usage

Review usage, charges, alerts, and spending limits in your provider's account. Warplyn does not show the provider's bill or enforce spending limits. Contact the provider about its billing, refunds, or account charges.

The model used for a request affects its cost. In **Settings** → **AI assistant**, choose a **Default model**, an **App model**, and models for specific tasks. See [AI providers and models](providers.md) to set them up.

::: tip You can work without AI
You can write and manage *Articles* without an AI connection. Editing, saving *Revisions*, and using local backups do not send AI requests.
:::
