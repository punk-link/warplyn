import { findSequenceMatches } from "@skladno/shared";


interface HighlightPart { changed: boolean; text: string }


function appendChangedTokens(parts: HighlightPart[], tokens: string[], start: number, end: number): void {
    for (let index = start; index < end; index += 1)
        parts.push({ changed: true, text: tokens[index] });
}


export function renderHighlightedText(original: string, proposed: string) {
    const originalTokenPattern = /\s+|[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu;
    const originalTokens = original.match(originalTokenPattern) ?? [];
    const proposedTokenPattern = /\s+|[\p{L}\p{N}_]+|[^\s\p{L}\p{N}_]/gu;
    const proposedTokens = proposed.match(proposedTokenPattern) ?? [];
    const originalParts: HighlightPart[] = [];
    const proposedParts: HighlightPart[] = [];
    let originalIndex = 0;
    let proposedIndex = 0;

    const deletionFirstMatches = findSequenceMatches(proposedTokens, originalTokens);
    for (const match of deletionFirstMatches) {
        appendChangedTokens(originalParts, originalTokens, originalIndex, match.proposalIndex);
        appendChangedTokens(proposedParts, proposedTokens, proposedIndex, match.baseIndex);
        originalParts.push({ changed: false, text: originalTokens[match.proposalIndex] });
        proposedParts.push({ changed: false, text: proposedTokens[match.baseIndex] });
        originalIndex = match.proposalIndex + 1;
        proposedIndex = match.baseIndex + 1;
    }

    appendChangedTokens(originalParts, originalTokens, originalIndex, originalTokens.length);
    appendChangedTokens(proposedParts, proposedTokens, proposedIndex, proposedTokens.length);

    return { original: originalParts, proposed: proposedParts };
}
