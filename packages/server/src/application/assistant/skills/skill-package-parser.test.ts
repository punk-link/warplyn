import assert from "node:assert/strict";
import test from "node:test";
import { parseSkillPackage } from "./skill-package-parser.js";


const text = [
    "---",
    "id: author-review",
    "name: Author review",
    "description: Review a draft.",
    "version: 1",
    "references:",
    "  - references/guidance.md",
    "---",
    "Keep the Author in control.",
].join("\n");


test("parses skill behavior with references supplied independently of filesystem storage", () => {
    const result = parseSkillPackage({
        text,
        source: "author",
        readReferences: (references) => {
            assert.deepEqual(references, ["references/guidance.md"]);
            return ["Preserve voice."];
        },
    });
    assert.ok(result.ok);
    assert.equal(result.skillPackage.reference.id, "author-review");
    assert.equal(result.skillPackage.instructions, "Keep the Author in control.");
    assert.deepEqual(result.skillPackage.references, ["Preserve voice."]);
});


test("rejects reserved identities before asking the source to load references", () => {
    const result = parseSkillPackage({
        text,
        source: "author",
        reservedIds: ["author-review"],
        readReferences: () => {
            assert.fail("Invalid metadata must not trigger reference access");
        },
    });
    assert.deepEqual(result, {
        ok: false,
        issues: [{ code: "invalid_metadata", messageId: "skills.validation.invalid_metadata" }],
    });
});


test("preserves safe reference-loading failures", () => {
    const result = parseSkillPackage({
        text,
        source: "author",
        readReferences: () => ({
            ok: false,
            issues: [{ code: "unsafe_package", messageId: "skills.validation.unsafe_package" }],
        }),
    });
    assert.deepEqual(result, {
        ok: false,
        issues: [{ code: "unsafe_package", messageId: "skills.validation.unsafe_package" }],
    });
});
