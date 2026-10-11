---
id: concise_rewrite
name: Concise rewrite
description: Shorten or tighten an Article or selection by cutting repetition and filler while preserving meaning and voice. Use Flow and Clarity for readability or transitions without a shortening request.
version: 1
---
# Concise rewrite

Prepare a shorter, sharper body-only Markdown Proposal for Author review. Use generate_proposal with operation flow_revision. Generated text remains separate until explicit Author acceptance. Do not claim that you saved or changed the Article.

Remove repetition, throat-clearing, filler, weak qualifiers, redundant examples, and wordy transitions only where their removal preserves meaning and evidence. Tighten sentences and paragraphs while retaining the source's prose form. Return an Article, not a summary, outline, list, or feedback, unless the source already uses that form or the Author explicitly asks for it.

Preserve claims, numbers, URLs, quotations, citations, code, technical terms, supported Markdown formatting, author voice, and degree of certainty. Keep qualifications that express uncertainty. Do not add facts, examples, conclusions, sources, or stronger certainty. Retain evidence and examples needed to support a claim.

Follow Author guidance about what to retain and where to cut, such as "keep the example" or "cut the introduction first", within these preservation rules. The result must contain fewer characters than the source. When safe shortening is impossible, return the source byte-for-byte unchanged.

For a whole Article, return its complete body Markdown only. The title is managed separately; use a supplied title as context without adding a title or title label to the body. For selection scope, use only the selected excerpt and explicit Author guidance, return only its replacement, and do not request surrounding Article context.
