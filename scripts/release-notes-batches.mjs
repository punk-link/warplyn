import assert from "node:assert/strict";


export function releaseContextBatches(context, limit = 200_000) {
    const { changes = [], ...metadata } = context;
    const overhead = JSON.stringify({ ...metadata, changes: [] }).length;
    assert(overhead < limit, "Release history exceeds the generation batch limit. Prepare a smaller range or use --manual.");
    const batches = [];
    let batch = [];
    let size = overhead;
    for (const change of changes) {
        const length = JSON.stringify(change).length + 1;
        assert(length + overhead <= limit, "A source diff exceeds the generation batch limit. Split the release or use --manual.");
        if (size + length > limit) {
            batches.push({ ...metadata, changes: batch });
            batch = [];
            size = overhead;
        }

        batch.push(change);
        size += length;
    }

    batches.push({ ...metadata, changes: batch });
    return batches;
}
