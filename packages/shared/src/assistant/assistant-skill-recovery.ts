export type AssistantSkillRecoveryStatus =
    | { kind: "ready" }
    | { kind: "blocked"; skillIds: readonly string[]; allAuthorSkills: boolean };
