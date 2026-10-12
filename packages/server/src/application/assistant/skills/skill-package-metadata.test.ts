import assert from "node:assert/strict";
import test from "node:test";
import { defaultSkillExecution } from "@skladno/shared";
import { parseSkillBehavior } from "./skill-package-metadata.js";

test("legacy packages keep a default contract; supported contracts grant no new authority", () => {
    assert.deepEqual(parseSkillBehavior({}), { execution: defaultSkillExecution, scopes: ["article", "selection"] });
    assert.deepEqual(parseSkillBehavior({ execution: { capability: "translate" }, scopes: ["article"] }), { execution: { capability: "translate" }, scopes: ["article"] });
    for (const metadata of [
        { execution: { capability: "run_script" } },
        { execution: { capability: "fact_check", permissions: ["network"] } },
        { execution: { ...defaultSkillExecution, resultPolicy: "auto_accept" } },
        { execution: { capability: "translate" }, scopes: ["selection"] },
        { execution: null }, { scopes: null }, { scopes: [] }, { scopes: ["article", "article"] }, { scopes: ["filesystem"] },
        { presentation: { order: 1, label: "secrets.key" } },
    ])
        assert.equal(parseSkillBehavior(metadata), undefined);
});
