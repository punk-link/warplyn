import assert from "node:assert/strict";
import test from "node:test";
import { BUILT_IN_SKILL } from "@skladno/shared";

import { AssistantSkillCatalog } from "./assistant-skill-catalog.js";
import { builtInSkillSource } from "./built-in-skill-source.js";


test("built-in Skills publish compact discovery data and load versioned instructions only when selected", () => {
    const catalog = new AssistantSkillCatalog([builtInSkillSource]);
    const summaries = catalog.discover();

    assert.ok(Object.values(BUILT_IN_SKILL).every((id) => summaries.some((summary) => summary.reference.id === id)));
    assert.ok(summaries.every((summary) => summary.reference.source === "built-in" && summary.name && summary.description));
    assert.deepEqual(summaries.filter((summary) => summary.reference.version === "2").map((summary) => summary.reference.id), [BUILT_IN_SKILL.NARRATIVE_DRAFT, BUILT_IN_SKILL.FLOW_AND_CLARITY, BUILT_IN_SKILL.STYLE_REVIEW, BUILT_IN_SKILL.TRANSLATION]);
    assert.equal("instructions" in summaries[0]!, false);

    const [factChecking] = catalog.load([summaries.find((summary) => summary.reference.id === BUILT_IN_SKILL.FACT_CHECKING)!.reference]);
    const advisoryPattern = /advisory/;
    assert.match(factChecking?.references?.[0] ?? "", advisoryPattern);
    assert.deepEqual(catalog.load([]), []);
});


test("Skill Creator keeps its model instructions in the built-in package", () => {
    const catalog = new AssistantSkillCatalog([builtInSkillSource]);
    const creator = catalog.discover().find((summary) => summary.reference.id === BUILT_IN_SKILL.SKILL_CREATOR);

    assert.equal(creator?.name, "Skill Creator");
    const askConciseClarifyingPattern = /Ask a concise clarifying question/;
    assert.match(catalog.load([creator!.reference])[0]?.instructions ?? "", askConciseClarifyingPattern);
    const useWarplynGlossaryPattern = /Use the Warplyn Glossary as the authority for domain terms/;
    assert.match(catalog.load([creator!.reference])[0]?.instructions ?? "", useWarplynGlossaryPattern);
});


test("explicit and complementary Skill references load through the same catalog", () => {
    const catalog = new AssistantSkillCatalog([builtInSkillSource]);
    const summaries = catalog.discover();
    const translation = summaries.find((summary) => summary.reference.id === BUILT_IN_SKILL.TRANSLATION)!;
    const flow = summaries.find((summary) => summary.reference.id === BUILT_IN_SKILL.FLOW_AND_CLARITY)!;

    assert.deepEqual(catalog.load([translation.reference, flow.reference, translation.reference]).map((skillPackage) => skillPackage.reference.id), [BUILT_IN_SKILL.TRANSLATION, BUILT_IN_SKILL.FLOW_AND_CLARITY]);
});


test("direct loading cannot bypass discovery reservations", () => {
    const reserved = builtInSkillSource.summaries()[0]!;
    const catalog = new AssistantSkillCatalog([
        builtInSkillSource,
        {
            id: "author",
            summaries: () => [{ ...reserved, reference: { ...reserved.reference, source: "author" } }],
            load: () => ({ ...reserved, instructions: "Must not load." }),
        },
    ]);

    assert.deepEqual(catalog.load([{ ...reserved.reference, source: "author" }]), []);
});
