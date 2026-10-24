import assert from "node:assert/strict";
import test from "node:test";
import { BUILT_IN_SKILL, FACT_CHECK_STATUS } from "@skladno/shared";
import { CapabilityFixtureEngine, withService } from "./editorial-integration.test-utils.js";

// Product scenarios: editorial-workflows.technical-terminology-review

const passage = "TCP is a connectionless protocol.";
const articleContent = `Private introduction.\n\n${passage}\n\n\`const TCP = 42;\``;
const finding = {
    claim: passage,
    status: FACT_CHECK_STATUS.DISPUTED,
    rationale: "TCP provides a reliable, in-order byte-stream service over a connection.",
    uncertainty: "Low for TCP as defined by this specification; local acronyms may differ.",
    sources: [{ url: "https://www.rfc-editor.org/rfc/rfc9293.html", title: "RFC 9293", quality: "primary" as const }],
};

for (const scope of ["article", "selection"] as const) {
    test(`terminology review retains sourced findings and Author overrides without edits, ${scope}`, async () => {
        const engine = new CapabilityFixtureEngine([
            { type: "completed", responseId: "terminology", text: "", factCheck: { findings: [finding] } },
        ], "fact_check");
        await withService(engine, async (_url, persistence, services) => {
            const article = services.articles.createArticle({ title: "Networking", content: articleContent });
            assert.equal(persistence.factChecks.listFactChecks(article.id).length, 0);
            const startOffset = articleContent.indexOf(passage);
            const requestScope = scope === "article"
                ? { kind: "article" as const, baseRevisionId: article.currentRevisionId }
                : { kind: "selection" as const, baseRevisionId: article.currentRevisionId, startOffset, endOffset: startOffset + passage.length };
            const request = services.assistant.prepare({
                kind: "new", requestId: `terminology-${scope}`, articleId: article.id,
                explicitSkillId: BUILT_IN_SKILL.TECHNICAL_TERMINOLOGY,
                authorMessage: "Verify technical terminology.", scope: requestScope,
            });
            assert.equal(request.resolvedSkill?.execution?.capability, "fact_check");
            for await (const event of services.assistant.stream(request, new AbortController().signal))
                void event;

            const captured = engine.requests[0]!;
            assert.equal(captured.operation, "fact_check");
            assert.equal(captured.article, scope === "article" ? articleContent : passage);
            assert.equal(captured.skill?.reference.id, BUILT_IN_SKILL.TECHNICAL_TERMINOLOGY);
            const evidencePattern = /Cite only sources present in the research evidence/;
            const preservationPattern = /Keep Article text, code, identifiers/;
            assert.match(captured.skill?.instructions ?? "", evidencePattern);
            assert.match(captured.skill?.instructions ?? "", preservationPattern);
            const checked = persistence.factChecks.listFactChecks(article.id)[0]!;
            assert.equal(checked.reviewedRevisionId, article.currentRevisionId);
            assert.deepEqual(checked.findings[0]?.sources, finding.sources);
            services.factChecks.resolve(checked.findings[0]!.occurrenceId!, "accepted_as_written");
            assert.equal(persistence.factChecks.listFactChecks(article.id)[0]?.findings[0]?.resolution, "accepted_as_written");
            assert.equal(services.articles.listRevisions(article.id).length, 1);
            assert.equal(services.articles.getArticle(article.id)?.currentRevision.content, articleContent);
        });
    });
}
