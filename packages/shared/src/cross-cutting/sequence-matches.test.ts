import assert from "node:assert/strict";
import test from "node:test";
import { findSequenceMatches } from "./sequence-matches.js";


function referenceMatches(base: string[], proposal: string[], ignoreBlankLines: boolean) {
    const lengths = Array.from({ length: base.length + 1 }, () => Array<number>(proposal.length + 1).fill(0));
    for (let left = base.length - 1; left >= 0; left -= 1) {
        for (let right = proposal.length - 1; right >= 0; right -= 1) {
            lengths[left][right] = base[left] === proposal[right] && (!ignoreBlankLines || base[left].trim() !== "")
                ? lengths[left + 1][right + 1] + 1
                : Math.max(lengths[left + 1][right], lengths[left][right + 1]);
        }
    }

    const matches: { baseIndex: number; proposalIndex: number }[] = [];
    let left = 0;
    let right = 0;
    while (left < base.length && right < proposal.length) {
        if (base[left] === proposal[right] && (!ignoreBlankLines || base[left].trim() !== "")) {
            matches.push({ baseIndex: left, proposalIndex: right });
            left += 1;
            right += 1;
        } else if (lengths[left][right + 1] >= lengths[left + 1][right]) {
            right += 1;
        } else {
            left += 1;
        }
    }

    return matches;
}


test("packed alignment retains legacy ties for repeated text and paragraph separators", () => {
    const values: string[][] = [[]];
    let level: string[][] = [[]];
    for (let length = 1; length <= 3; length += 1) {
        level = level.flatMap((prefix) => ["a", "b", "", " "].map((value) => [...prefix, value]));
        values.push(...level);
    }

    for (const base of values) {
        for (const proposal of values) {
            for (const ignoreBlankLines of [false, true])
                assert.deepEqual(findSequenceMatches(base, proposal, ignoreBlankLines), referenceMatches(base, proposal, ignoreBlankLines), JSON.stringify({ base, proposal, ignoreBlankLines }));
        }
    }
});


test("packed alignment handles token positions across machine-word boundaries", () => {
    const base = Array.from({ length: 200 }, (_, index) => `line-${index % 17}`);
    const proposal = [...base.slice(0, 7), "new", ...base.slice(9, 97), ...base.slice(95)];
    assert.deepEqual(findSequenceMatches(base, proposal), referenceMatches(base, proposal, false));
});
