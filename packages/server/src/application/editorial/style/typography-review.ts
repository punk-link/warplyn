import {
    APPLICATION_ERROR,
    HTTP_STATUS,
    createTextProposal,
    typographyRuleId,
    typographyRuleLabel,
    type StyleProfile,
    type StyleReview,
    type TypographyReview,
} from "@skladno/shared";
import { ApplicationServiceError } from "../../errors/application-service-error.js";
import { typographyProseSpans } from "./typography-prose-spans.js";
import { typographyRuleMatches } from "./typography-rule-matches.js";

type Occurrence = TypographyReview["occurrences"][number];


function collectTypographyPatches(content: string, profile: StyleProfile) {
    const occurrences: Occurrence[] = [];
    let skipped = 0;
    for (const span of typographyProseSpans(content)) {
        const prose = content.slice(span.start, span.end);
        for (const rule of profile.rules.typography) {
            const result = typographyRuleMatches(prose, rule.definition);
            skipped += result.skipped;
            occurrences.push(
                ...result.patches
                    .filter((patch) => prose.slice(patch.start, patch.end) !== patch.replacement)
                    .map((patch) => ({ ...patch, start: patch.start + span.start, end: patch.end + span.start, ruleId: rule.id })),
            );
        }
    }

    const retained: Occurrence[] = [];
    for (const patch of occurrences.sort((left, right) => left.start - right.start || right.end - left.end)) {
        if (patch.start >= (retained.at(-1)?.end ?? 0))
            retained.push(patch);
    }

    return { occurrences: retained, skipped };
}


function applyTypographyPatches(content: string, occurrences: Occurrence[]): string {
    const parts: string[] = [];
    let cursor = 0;
    for (const patch of occurrences) {
        parts.push(content.slice(cursor, patch.start), patch.replacement);
        cursor = patch.end;
    }

    parts.push(content.slice(cursor));
    return parts.join("");
}


function occurrenceLines(proposal: string, occurrences: Occurrence[]) {
    let characterDelta = 0;
    let line = 0;
    let cursor = 0;
    return occurrences.map((occurrence) => {
        const boundary = occurrence.start + characterDelta;
        while (cursor < boundary) {
            if (proposal[cursor] === "\n")
                line++;

            cursor++;
        }

        characterDelta += occurrence.replacement.length - (occurrence.end - occurrence.start);
        return { line, ruleId: occurrence.ruleId };
    });
}


function changeSupport(source: string, proposal: string, occurrences: Occurrence[]) {
    const finalDiff = createTextProposal(source, proposal);
    let lineDelta = 0;
    const locations = occurrenceLines(proposal, occurrences);

    return finalDiff.changes.flatMap((change) => {
        const start = change.baseStart + lineDelta;
        lineDelta += change.proposalLines.length - change.baseLines.length;
        const ruleIds = locations
            .filter((location) => location.line >= start && location.line < start + change.proposalLines.length)
            .map((location) => location.ruleId);

        return ruleIds.length ? [{ changeId: change.id, ruleIds: [...new Set(ruleIds)] }] : [];
    });
}


export function reviewTypography(
    source: string,
    candidate: string,
    profile: StyleProfile,
    previous?: StyleReview,
    local = false,
): { text: string; styleReview: StyleReview } {
    const { occurrences, skipped } = collectTypographyPatches(candidate, profile);
    const text = applyTypographyPatches(candidate, occurrences);
    if (collectTypographyPatches(text, profile).occurrences.length)
        throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_CORRECTIONS_CONFLICT, HTTP_STATUS.BAD_REQUEST);

    const rulesById = new Map(profile.rules.typography.map((rule) => [rule.id, rule]));
    const findings = occurrences.map((occurrence) => ({
        divergence: candidate.slice(occurrence.start, occurrence.end),
        suggestion: occurrence.replacement,
        traitIds: [typographyRuleId(rulesById.get(occurrence.ruleId)!)],
        typographyOccurrence: occurrence,
    }));

    return {
        text,
        styleReview: {
            ...previous,
            findings: [...(previous?.findings ?? []), ...findings],
            profileVersion: profile.version,
            confidence: profile.confidence,
            profileSnapshot: profile,
            traitLabels: {
                ...previous?.traitLabels,
                ...Object.fromEntries(profile.rules.typography.map((rule) => [typographyRuleId(rule), typographyRuleLabel(rule)])),
            },
            typography: {
                local,
                rules: profile.rules.typography,
                occurrences,
                skipped,
                contextualRuleIds: profile.rules.typography.filter((rule) => rule.definition.kind === "contextual").map((rule) => rule.id),
                changes: changeSupport(source, text, occurrences),
            },
        },
    };
}
