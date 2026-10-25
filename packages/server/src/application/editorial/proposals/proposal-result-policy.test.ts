import assert from "node:assert/strict";
import test from "node:test";
import { validateProposalResult } from "./proposal-result-policy.js";

const title = "Как задать агенту архитектурные границы";
const source = "Структура и правила уже существуют.";

test("body-producing operations reject new standalone copies of the separate title", () => {
    for (const kind of ["flow_revision", "thesis_to_narrative", "style_review", "generate_proposal", "generate_finding_corrections"]) {
        for (const line of [title, `# ${title}`, `## ${title} ##`, `**${title}**`, `__${title}__`, `*${title}*`]) {
            const output = `## Предложение\n\n${line}\n\n${source}`;
            assert.throws(() => validateProposalResult(source, output, undefined, title, kind), { code: "invalid_output" });
        }
    }
});

test("body validation preserves existing headings and ordinary title references", () => {
    const existingHeading = `# ${title}\n\n${source}`;
    assert.doesNotThrow(() => validateProposalResult(existingHeading, existingHeading, undefined, title, "generate_proposal"));
    assert.doesNotThrow(() => validateProposalResult(existingHeading, `**${title}**\n\nEdited body.`, undefined, title, "style_review"));
    assert.doesNotThrow(() => validateProposalResult(source, `## Правила\n\n${source} См. «${title}».`, undefined, title, "flow_revision"));
    assert.throws(() => validateProposalResult(existingHeading, `${existingHeading}\n\n# ${title}`, undefined, title, "generate_proposal"));
    assert.doesNotThrow(() => validateProposalResult(source, source, undefined, "", "flow_revision"));
});

test("title validation does not reinterpret translations, Fact Checks, or conversational replies as body Proposals", () => {
    for (const kind of ["translation", "translate", "fact_check", ""])
        assert.doesNotThrow(() => validateProposalResult(source, title, undefined, title, kind));
});
