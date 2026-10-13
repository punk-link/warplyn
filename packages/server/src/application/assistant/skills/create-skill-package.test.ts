import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { defaultSkillExecution } from "@skladno/shared";
import { createSkillPackage } from "./create-skill-package.js";


test("legacy package hashes remain stable and execution changes invalidate them", () => {
    const input = { reference: { source: "author", id: "author-review", version: "1" }, name: "Author review", description: "Review prose", instructions: "Preserve facts." };
    const legacyHash = createHash("sha256").update([input.reference.id, input.reference.version, input.name, input.description, input.instructions].join("\n")).digest("hex");
    assert.equal(createSkillPackage(input).contentHash, legacyHash);
    assert.equal(createSkillPackage({ ...input, execution: defaultSkillExecution, scopes: ["article", "selection"] }).contentHash, legacyHash);
    assert.notEqual(createSkillPackage({ ...input, execution: { capability: "generate_proposal", operation: "flow_revision", source: "article", resultPolicy: "review" } }).contentHash, legacyHash);
    assert.notEqual(createSkillPackage({ ...input, scopes: ["article"] }).contentHash, legacyHash);
});
