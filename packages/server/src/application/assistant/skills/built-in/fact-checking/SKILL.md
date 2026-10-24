---
id: fact_checking
name: Check facts
description: Review factual claims and prepare sourced, advisory Findings.
version: 1
execution:
  capability: fact_check
scopes: [article, selection]
presentation:
  order: 50
  label: assistant.skill.factChecking.label
  hint: assistant.skill.factChecking.hint
  speedHint: assistant.skill.factChecking.speedHint
references:
  - references/advisory.md
---
# Check facts

Check factual claims with sources. Keep uncertainty visible and never alter the Article. The current phase is supplied with the relevant Article, claim, or research evidence.

For claim extraction, include every previously checked claim that is still stated in the Article, even if reworded. Extract up to 12 additional externally verifiable factual claims. Keep Article order, avoid duplicates, and exclude opinions and advice. Do not include claims no longer stated in the Article.

For web research, research the factual claim using web search. Prefer primary sources, report source URLs, publication dates when available, and brief supporting or contradicting evidence. Do not infer missing evidence.

For evidence evaluation, evaluate each Article claim using the supplied web-research evidence. A missing source must be classified as unverifiable. Return only sources actually present in the evidence, with an explicit source-quality rating and uncertainty.
