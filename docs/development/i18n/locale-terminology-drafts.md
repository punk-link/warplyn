# Locale terminology drafts

Status: working terminology proposals for issue #114. The Author authorized installing translation drafts before named-reviewer approval for this implementation. Human review remains pending and is required before release approval. These records cover the core glossary concepts; expand them with interface-specific variants during review.

| Locale | Review issue | Available reviewer | Review status |
| --- | --- | --- | --- |
| es (neutral) | [#124](https://github.com/punk-link/warplyn/issues/124) | Kirill | Pending |
| pt-BR | [#125](https://github.com/punk-link/warplyn/issues/125) | Kirill | Pending |
| fr | [#126](https://github.com/punk-link/warplyn/issues/126) | Unassigned | Pending |
| de | [#127](https://github.com/punk-link/warplyn/issues/127) | Unassigned | Pending |
| ru | [#128](https://github.com/punk-link/warplyn/issues/128) | Kirill | Pending |
| ja | [#129](https://github.com/punk-link/warplyn/issues/129) | Unassigned | Pending |
| zh-CN | [#130](https://github.com/punk-link/warplyn/issues/130) | Unassigned | Pending |
| it | [#131](https://github.com/punk-link/warplyn/issues/131) | Unassigned | Pending |
| pl | [#132](https://github.com/punk-link/warplyn/issues/132) | Kirill | Pending |
| ko | [#133](https://github.com/punk-link/warplyn/issues/133) | Unassigned | Pending |

Use sentence-style capitalization for labels where natural in the locale, with locale-appropriate noun capitalization in German. Inflect the proposed terms in complete messages. Preserve the distinctions between mutable Drafts, saved immutable Revisions, candidate Proposals, and advisory Findings. These are provisional conventions, not completed grammatical review.

| Concept | es (neutral) | pt-BR | fr | de | ru | ja | zh-CN | it | pl | ko |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Article: independently recoverable editorial work | artículo | artigo | article | Artikel | статья | 記事 | 文章 | articolo | artykuł | 글 |
| Draft: mutable working Article text | borrador | rascunho | brouillon | Entwurf | черновик | 下書き | 草稿 | bozza | szkic | 초안 |
| Draft checkpoint: recoverable mutable Draft tied to a Revision | punto de control | ponto de verificação | point de contrôle | Prüfpunkt | чекпоинт | チェックポイント | 检查点 | checkpoint | punkt kontrolny | 검사점 |
| Revision: immutable saved Article snapshot | versión guardada | versão salva | version enregistrée | gespeicherte Fassung | сохранённая версия | 保存済みバージョン | 已保存版本 | versione salvata | zapisana wersja | 저장된 버전 |
| Proposal: AI-generated candidate requiring author approval | propuesta | proposta | proposition | Vorschlag | предложение | 提案 | 待审核提案 | proposta | propozycja | 제안 |
| Finding: advisory fact-check or style-review output | observación | apontamento | observation | Hinweis | замечание | 指摘事項 | 审查意见 | rilievo | uwaga | 검토 의견 |
| Skill: reusable instruction package; grants no capability | habilidad | habilidade | compétence | Fähigkeit | навык | スキル | 技能 | abilità | umiejętność | 스킬 |
| Editorial Assistant: assistant for editorial work | asistente editorial | assistente editorial | assistant éditorial | redaktioneller Assistent | помощник | 編集アシスタント | 写作助理 | assistente editoriale | asystent redakcyjny | 글쓰기 도우미 |
| Workspace: main authoring area | espacio de trabajo | espaço de trabalho | espace de travail | Arbeitsbereich | рабочая область | 作業スペース | 工作区 | area di lavoro | obszar roboczy | 작업 공간 |
| Backup: local recoverable data copy | copia de seguridad | cópia de segurança | sauvegarde | Sicherungskopie | резервная копия | バックアップ | 备份 | copia di sicurezza | kopia zapasowa | 백업 |

## Usage notes for reviewers

- Treat the table entries as UI labels, not definitions. Use the shortest familiar local term that is clear in context, including established loanwords. Omit qualifiers already supplied by the interface. Put explanations in help text or tooltips, and add a qualifier only when the actual UI would otherwise be ambiguous.
- Carry the Russian choices from this review into UI copy: **Draft** is *черновик*, **Draft checkpoint** is *чекпоинт*, **Revision** is *сохранённая версия*, **Skill** is *навык*, and **Editorial Assistant** is *помощник*. Do not expand the labels to *чекпоинт черновика* or *помощник по работе с текстом*. Avoid *драфт*, *ревизия*, and *скилл* for these concepts.
- Keep **Article** distinct from a generic file or document; it is an independently recoverable unit of editorial work.
- Keep **Draft** distinct from **Revision**. A Draft is mutable working text and may be unsaved; a Revision is an immutable saved snapshot. Saving recovery state does not turn a Draft into a Revision.
- A **Draft checkpoint** holds mutable recovery state tied to a base Revision. The sourced short labels below replace the earlier descriptive phrases. Check that they work for Authors in context and do not promise a history of restore points. Another product's usage supports a candidate but does not approve a Warplyn translation.
- For Japanese **Revision**, retain *保存済みバージョン* as the review candidate. Avoid *保存版*, which can suggest an edition worth keeping. Check whether a shorter label preserves the saved-version meaning in the actual UI.
- Keep **Proposal** distinct from **Finding**. A Proposal contains candidate content that the Author may approve; a Finding is advisory and does not change an Article.
- A **Skill** is a reusable instruction package and grants no capabilities. Its short label may also be an ordinary word for an ability; explain the product meaning separately instead of replacing the label with a definition. Portuguese, Japanese, and Chinese candidates have supporting sources below. Other locales still need terminology research or native confirmation.
- Review the remaining longer labels, including **Editorial Assistant**, in their UI context. Apply the same preference for familiar short labels across locales without assuming that every language uses the same loanwords.
- Preserve product names, model identifiers, URLs, and author-entered content as specified by the internationalization guide.
- Confirm articles, grammatical gender, inflection, capitalization, and contextual variants with named native reviewers. Record approval in the locale-specific terminology record before installing a locale. The choices and research here do not replace that approval.

## Terminology research

Research checked on 2026-11-14. These sources establish usage, not native-language approval or identical product semantics. In particular, Hyper-V checkpoints capture historical state, while Warplyn's Draft checkpoint is mutable. Choosing those short labels for Warplyn is a terminology proposal.

| Locale | Checkpoint candidate | Source |
| --- | --- | --- |
| es | punto de control | [Microsoft Hyper-V terminology](https://learn.microsoft.com/es-es/windows-server/virtualization/hyper-v/features-terminology) |
| pt-BR | ponto de verificação | [Microsoft checkpoint guide](https://learn.microsoft.com/pt-br/virtualization/hyper-v-on-windows/user-guide/checkpoints) |
| fr | point de contrôle | [Microsoft Hyper-V terminology](https://learn.microsoft.com/fr-fr/windows-server/virtualization/hyper-v/features-terminology) |
| de | Prüfpunkt | [Microsoft checkpoint guide](https://learn.microsoft.com/de-de/windows-server/virtualization/hyper-v/manage/choose-between-standard-or-production-checkpoints-in-hyper-v) |
| ru | чекпоинт | Author's terminology choice in this review |
| ja | チェックポイント | [Microsoft checkpoint guide](https://learn.microsoft.com/ja-jp/windows-server/virtualization/hyper-v/manage/choose-between-standard-or-production-checkpoints-in-hyper-v) |
| zh-CN | 检查点 | [Microsoft checkpoint guide](https://learn.microsoft.com/zh-cn/windows-server/virtualization/hyper-v/checkpoints) |
| it | checkpoint | [Microsoft Hyper-V terminology](https://learn.microsoft.com/it-it/windows-server/virtualization/hyper-v/features-terminology) |
| pl | punkt kontrolny | [Microsoft checkpoint guide](https://learn.microsoft.com/pl-pl/windows-server/virtualization/hyper-v/checkpoints) |
| ko | 검사점 | [Microsoft Hyper-V terminology](https://learn.microsoft.com/ko-kr/windows-server/virtualization/hyper-v/features-terminology) |

Short **Skill** labels also have precedent for instruction packages: Portuguese *habilidade* in [GitHub's agent skills documentation](https://docs.github.com/pt/copilot/concepts/agents/about-agent-skills), Japanese *スキル* in [Microsoft's agent skills documentation](https://learn.microsoft.com/ja-jp/agent-framework/agents/skills), and Chinese *技能* in [GitHub's customization documentation](https://docs.github.com/zh/copilot/concepts/customizations/comparing-customizations). Other Skill candidates remain unverified by this research pass.
