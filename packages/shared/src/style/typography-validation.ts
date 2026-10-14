import type { TypographyDefinition, TypographyIssue, TypographyRule } from "./typography.js";


function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}


function isText(value: unknown, limit = 100): value is string {
    return typeof value === "string" && value.trim().length > 0 && value.length <= limit;
}


function isQuoteForm(value: unknown): boolean {
    return value === "curly" || value === "guillemets" || value === "straight";
}


function isPunctuation(value: unknown, allowEmpty = false): value is string {
    if (typeof value !== "string" || value.length > 30 || (!allowEmpty && value.length === 0))
        return false;

    const punctuationPattern = /^[\p{P}\p{Zs}]*$/u;
    const punctuationPattern2 = /[`*_#[\]<>\\/]/u;
    return punctuationPattern.test(value) && !punctuationPattern2.test(value);
}


function isDefinition(value: unknown): value is TypographyDefinition {
    if (!isRecord(value))
        return false;

    const whitespacePattern = /\s/u;
    switch (value.kind) {
        case "quotes":
            return isQuoteForm(value.outer) && isQuoteForm(value.nested);
        case "dash":
            return (value.mark === "—" || value.mark === "–") && (value.spacing === "space" || value.spacing === "none");
        case "ellipsis":
            return value.form === "…" || value.form === "...";
        case "nonbreaking-space":
            return isText(value.left, 40) && isText(value.right, 40) && !whitespacePattern.test(value.left + value.right) && (value.space === "\u00a0" || value.space === "\u202f");
        case "horizontal-space":
            return true;
        case "literal":
            return isPunctuation(value.source) && isPunctuation(value.replacement, true) && value.source !== value.replacement;
        case "contextual":
            return isText(value.instruction, 1000);
        default:
            return false;
    }
}


export function isTypographyRule(value: unknown): value is TypographyRule {
    const punctuationPattern = /^[\w-]+$/u;
    return isRecord(value) && isText(value.id, 80) && punctuationPattern.test(value.id) && isDefinition(value.definition);
}


function conflicts(left: TypographyDefinition, right: TypographyDefinition): boolean {
    if (left.kind === "contextual" || right.kind === "contextual")
        return false;

    if (left.kind === "literal" && right.kind === "literal")
        return left.source.includes(right.source) || right.source.includes(left.source) || left.replacement.includes(right.source) || right.replacement.includes(left.source);

    if (left.kind === "literal")
        return literalConflicts(left, right);

    if (right.kind === "literal")
        return literalConflicts(right, left);

    if (left.kind === "nonbreaking-space" && right.kind === "nonbreaking-space")
        return left.left === right.left && left.right === right.right;

    return left.kind === right.kind;
}


function literalConflicts(literal: Extract<TypographyDefinition, { kind: "literal" }>, other: TypographyDefinition): boolean {
    const text = literal.source + literal.replacement;
    const quoteMarks = /["'“”‘’«»]/u;
    const dashMarks = /[-–—]/u;
    const ellipsisMarks = /[.…]/u;
    const repeatedSpaces = / {2,}/u;
    const spacesOnly = /^ +$/u;
    const horizontalSpaces = /[ \u00a0\u202f]/u;
    switch (other.kind) {
        case "quotes":
            return quoteMarks.test(text);
        case "dash":
            return dashMarks.test(text);
        case "ellipsis":
            return ellipsisMarks.test(text);
        case "horizontal-space":
            return repeatedSpaces.test(literal.replacement) || spacesOnly.test(literal.source);
        case "nonbreaking-space":
            return horizontalSpaces.test(text);
        default:
            return false;
    }
}


export function typographyIssues(value: unknown): TypographyIssue[] {
    if (!Array.isArray(value) || value.length > 30)
        return [{ index: 0, reason: "limit" }];

    const issues: TypographyIssue[] = [];
    const rules: TypographyRule[] = [];
    value.forEach((candidate: unknown, index: number) => {
        if (!isTypographyRule(candidate)) {
            issues.push({ index, reason: "invalid" });
            return;
        }

        if (candidate.definition.kind === "literal" && candidate.definition.replacement.includes(candidate.definition.source))
            issues.push({ index, reason: "conflict" });

        if (rules.some((rule) => rule.id === candidate.id || JSON.stringify(rule.definition) === JSON.stringify(candidate.definition)))
            issues.push({ index, reason: "duplicate" });
        else if (rules.some((rule) => conflicts(rule.definition, candidate.definition)))
            issues.push({ index, reason: "conflict" });

        rules.push(candidate);
    });
    return issues;
}


export function isTypographyRules(value: unknown): value is TypographyRule[] {
    return typographyIssues(value).length === 0;
}
