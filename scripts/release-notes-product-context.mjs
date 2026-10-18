import assert from "node:assert/strict";
import { existsSync, lstatSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { git } from "./release-notes-range.mjs";


function historicalArea(ref, path, cwd) {
    let content;
    try {
        content = git(["show", `${ref}:${path}`], cwd);
    } catch {
        return { capabilities: [] };
    }

    return JSON.parse(content);
}


function capabilitySnapshots(area) {
    assert(Array.isArray(area.capabilities), "Product records must contain a capabilities array before generating release notes.");
    return new Map(area.capabilities.map((capability) => [capability.id, {
        id: capability.id, title: capability.title, status: capability.status, contract: capability.contract,
        persistence: capability.persistence, limitations: capability.limitations,
    }]));
}


export function productReleaseChanges(path, record, { workingTree, cwd }) {
    const before = capabilitySnapshots(historicalArea(record.previousCommit, path, cwd));
    let current = historicalArea(record.sourceCommit, path, cwd);
    if (workingTree) {
        const absolute = join(cwd, path);
        if (existsSync(absolute)) {
            assert(!lstatSync(absolute).isSymbolicLink(), "Product records must be regular files for release generation.");
            current = JSON.parse(readFileSync(absolute, "utf8"));
        } else {
            current = { capabilities: [] };
        }
    }

    const after = capabilitySnapshots(current);
    return [...new Set([...before.keys(), ...after.keys()])]
        .filter((id) => JSON.stringify(before.get(id)) !== JSON.stringify(after.get(id)))
        .map((id) => ({ before: before.get(id) ?? null, after: after.get(id) ?? null }));
}
