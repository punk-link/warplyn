import { NARROW_NO_BREAK_SPACE, NO_BREAK_SPACE } from "../text/unicode-characters.js";


export type TypographyDefinition =
    | { kind: "quotes"; outer: "curly" | "guillemets" | "straight"; nested: "curly" | "guillemets" | "straight" }
    | { kind: "dash"; mark: "—" | "–"; spacing: "space" | "none" }
    | { kind: "ellipsis"; form: "…" | "..." }
    | { kind: "nonbreaking-space"; left: string; right: string; space: typeof NO_BREAK_SPACE | typeof NARROW_NO_BREAK_SPACE }
    | { kind: "horizontal-space" }
    | { kind: "literal"; source: string; replacement: string }
    | { kind: "contextual"; instruction: string };


export interface TypographyRule {
    id: string;
    definition: TypographyDefinition;
}


export interface TypographyIssue {
    index: number;
    reason: "invalid" | "duplicate" | "conflict" | "limit";
}


export interface TypographyReview {
    local: boolean;
    rules: TypographyRule[];
    changes: { changeId: string; ruleIds: string[] }[];
    occurrences: { ruleId: string; start: number; end: number; replacement: string }[];
    skipped: number;
    contextualRuleIds: string[];
}


export interface TypographyReviewResult {
    articleId: string;
    baseRevisionId: string;
    baseContent: string;
    proposal: string;
    editorialArtifactId: string;
    styleReview: import("../editorial/editorial.js").StyleReview;
    createdAt: string;
}


export function typographyRuleId(rule: TypographyRule): string {
    return `typography-rule:${rule.id}`;
}


export function typographyRuleLabel(rule: TypographyRule): string {
    const definition = rule.definition;
    switch (definition.kind) {
        case "quotes":
            return `${definition.outer} / ${definition.nested}`;
        case "dash":
            return `${definition.mark} / ${definition.spacing}`;
        case "ellipsis":
            return definition.form;
        case "nonbreaking-space":
            return `${definition.left} ${definition.right} / U+${definition.space.codePointAt(0)!.toString(16).toUpperCase()}`;
        case "horizontal-space":
            return "U+0020";
        case "literal":
            return `${definition.source} → ${definition.replacement}`;
        case "contextual":
            return definition.instruction;
    }
}
