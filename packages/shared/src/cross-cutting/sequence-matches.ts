interface SequenceMatch { baseIndex: number; proposalIndex: number }


function matchingMasks(values: readonly string[], ignoreBlankLines: boolean): Map<string, bigint> {
    const masks = new Map<string, bigint>();
    for (let index = 0; index < values.length; index += 1) {
        const value = values[index];
        if (ignoreBlankLines && !value.trim())
            continue;

        const bit = 1n << BigInt(values.length - index - 1);
        masks.set(value, (masks.get(value) ?? 0n) | bit);
    }

    return masks;
}


function suffixMatchRows(base: readonly string[], proposal: readonly string[], ignoreBlankLines: boolean): bigint[] {
    const masks = matchingMasks(proposal, ignoreBlankLines);
    const rows = Array<bigint>(base.length + 1).fill(0n);
    for (let index = base.length - 1; index >= 0; index -= 1) {
        const previous = rows[index + 1];
        const matches = previous | (masks.get(base[index]) ?? 0n);
        // Each set bit records a one-point increase in the reversed-prefix LCS.
        rows[index] = matches & ~(matches - ((previous << 1n) | 1n));
    }

    return rows;
}


function countMatches(row: bigint, length: number): number {
    const bits = row & ((1n << BigInt(length)) - 1n);
    const nibbleCounts = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];
    let count = 0;
    for (const digit of bits.toString(16))
        count += nibbleCounts[Number.parseInt(digit, 16)];

    return count;
}


function collectSequenceMatches(base: readonly string[], proposal: readonly string[], ignoreBlankLines: boolean): SequenceMatch[] {
    const rows = suffixMatchRows(base, proposal, ignoreBlankLines);
    const matches: SequenceMatch[] = [];
    let baseIndex = 0;
    let proposalIndex = 0;
    let remaining = countMatches(rows[0], proposal.length);

    while (remaining > 0) {
        if (base[baseIndex] === proposal[proposalIndex] && (!ignoreBlankLines || base[baseIndex].trim() !== "")) {
            matches.push({ baseIndex, proposalIndex });
            baseIndex += 1;
            proposalIndex += 1;
            remaining -= 1;

            continue;
        }

        const below = countMatches(rows[baseIndex + 1], proposal.length - proposalIndex);
        const bit = (rows[baseIndex] >> BigInt(proposal.length - proposalIndex - 1)) & 1n;
        const afterAddition = remaining - Number(bit);
        // Preserve the existing Proposal alignment: additions win equal-length ties.
        if (afterAddition >= below) {
            proposalIndex += 1;
            remaining = afterAddition;
        } else {
            baseIndex += 1;
            remaining = below;
        }
    }

    return matches;
}


/** Exact LCS alignment using packed bits instead of a numeric cell for every pair. */
export function findSequenceMatches(base: readonly string[], proposal: readonly string[], ignoreBlankLines = false): SequenceMatch[] {
    const prefix: SequenceMatch[] = [];
    let start = 0;
    while (start < base.length && start < proposal.length && base[start] === proposal[start]
        && (!ignoreBlankLines || base[start].trim() !== "")) {
        prefix.push({ baseIndex: start, proposalIndex: start });
        start += 1;
    }

    if (start === base.length || start === proposal.length)
        return prefix;

    const rest = collectSequenceMatches(base.slice(start), proposal.slice(start), ignoreBlankLines);
    return [...prefix, ...rest.map(({ baseIndex, proposalIndex }) => ({ baseIndex: baseIndex + start, proposalIndex: proposalIndex + start }))];
}
