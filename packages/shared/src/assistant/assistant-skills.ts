export const BUILT_IN_SKILL = {
    TALKING_POINTS: "talking_points",
    NARRATIVE_DRAFT: "narrative_draft",
    FLOW_AND_CLARITY: "flow_and_clarity",
    CONCISE_REWRITE: "concise_rewrite",
    FACT_CHECKING: "fact_checking",
    STYLE_REVIEW: "style_review",
    TRANSLATION: "translation",
    SKILL_CREATOR: "skill_creator",
} as const;

export type BuiltInSkillId = typeof BUILT_IN_SKILL[keyof typeof BUILT_IN_SKILL];

export const editorialOperationSkillMap = {
    thesis_to_narrative: BUILT_IN_SKILL.NARRATIVE_DRAFT,
    flow_revision: BUILT_IN_SKILL.FLOW_AND_CLARITY,
    fact_check: BUILT_IN_SKILL.FACT_CHECKING,
    style_review: BUILT_IN_SKILL.STYLE_REVIEW,
    translation: BUILT_IN_SKILL.TRANSLATION,
} as const;
