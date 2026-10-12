---
id: skill_creator
name: Skill Creator
description: Create, revise, restore, or delete a local Skill when the Author explicitly requests it.
version: 1
execution:
  capability: manage_skills
scopes: [article, selection]
presentation:
  order: 80
  label: assistant.skill.skillCreator.label
---
# Skill Creator

Use this Skill when the Author explicitly asks to create, revise, restore, or delete a reusable Skill. For creation, infer a concise stable ID, name, description, and Markdown procedure from the request and conversation.

Use the Warplyn Glossary as the authority for domain terms. Keep its distinctions intact, especially Article rather than document, Draft checkpoints versus immutable Revisions, and Proposals or Findings as advisory work requiring explicit author approval.

Ask a concise clarifying question when uncertainty about the purpose, triggers, procedure, or reference material would change the resulting Skill. Do not create a Skill for a suggestion, hypothetical, or ordinary editorial request.

When the request is clear, create complete `SKILL.md` Markdown with valid frontmatter. Use the `create_author_skill` tool to save it. The tool gives no extra permissions. Do not claim that you changed the Article, Draft, Proposal, or Article Revision.

The tool accepts `skillId` and `skillMarkdown`. The Markdown must start with YAML frontmatter containing all four required fields: `id`, `name`, `description`, and `version`. Set `id` to exactly the tool's `skillId`. Use a new ID of 3–64 lowercase letters, digits, hyphens, or underscores, starting with a letter. Choose a name not already in the catalog, at most 80 characters, and a description at most 280 characters. Set `version: 1`.

Adapt this complete example to the Author's request. Pass the Markdown itself, without the enclosing code fence, as `skillMarkdown`:

Include `scopes` and `execution` for new Skills. `scopes` is a non-empty list of `article` and/or `selection`. Choose one existing capability:

- `generate_proposal` requires `operation`, `source`, and `resultPolicy`. Use `flow_revision` for rewriting or `thesis_to_narrative` for composition. Use `source: article` to work from the Article or selection; `author_or_article` prioritizes selection, then the Author's message, then the Article.
- Proposal `resultPolicy: review` always requires Proposal acceptance. `shorter_preserving_content` also rejects changed output unless it is shorter and passes protected-content checks; unchanged output is allowed. Use `verified_edit` only for exact requested edits that may use the Author's existing direct-edit preference after separate server verification. Metadata never authorizes acceptance.
- `fact_check`, `style_review`, `translate`, and `manage_skills` accept only the `capability` field in `execution`. Translation requires `scopes: [article]` and a target language. Style review requires an available Style Profile. Skill management retains exact-action authorization and separate Skill history.

Choose the contract from the requested outcome. Keep model instructions consistent with it. Do not invent capabilities, result policies, script execution, permission fields, or aliases. Existing packages without execution metadata remain valid and use the legacy flow-revision behavior. Preserve existing metadata when revising a Skill unless the requested change requires a different contract. Omit `presentation` from Author-created packages; it is for bundled ordering and localized labels.

```markdown
---
id: concise-review
name: "Concise review"
description: "Review an Article for unnecessary repetition when the Author asks for concision."
version: 1
scopes: [article, selection]
execution:
  capability: generate_proposal
  operation: flow_revision
  source: article
  resultPolicy: shorter_preserving_content
---
# Concise review

Remove repeated ideas and propose shorter wording. Preserve claims, numbers, URLs, quotations, citations, code, technical terms, and the Author's voice. Return the source unchanged if safe shortening is impossible. Use generate_proposal with operation flow_revision and leave acceptance to the Author.
```

Include the entire procedure in this one file, using only the documented metadata and no references to other files. The tool saves only `SKILL.md`. Keep instructions below 64 KiB and the complete package below 96 KiB. A successful creation must appear in the catalog with the intended execution contract. Creating a Skill does not run its procedure on the current Article.

For a revision, call `get_author_skill` to read the installed Markdown and content hash. Preserve the Skill ID, edit only what the Author requested, then call `update_author_skill` with that hash and the complete revised Markdown. The application advances the version and records a Skill Revision. For deletion, read the current hash first, then call `delete_author_skill` only on an explicit delete request. Deletion keeps Skill Revision history.

For restoration, call `list_author_skill_revisions` and `read_author_skill_revision` so the Author can identify the intended snapshot. Use `restore_author_skill` with that Revision ID and the current hash from `get_author_skill`; use an empty hash if the Skill has been deleted. Restoring a Skill is separate from restoring an Assistant chat checkpoint. Do not change a Skill when the Author only restores chat history.
