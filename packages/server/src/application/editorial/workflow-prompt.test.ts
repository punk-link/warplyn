import assert from "node:assert/strict";
import test from "node:test";
import { BUILT_IN_SKILL, EDITORIAL_OPERATION } from "@skladno/shared";

import { authorControlInstruction, createEditorialMessages } from "./workflow-prompt.js";


function getPromptText(input: Parameters<typeof createEditorialMessages>[0]): string {
    const messages = createEditorialMessages(input);

    return messages.map((message) => typeof message.content === "string" ? message.content : "").join("\n");
}


test("direct thesis composition uses the Narrative Draft prompt", async () => {
    const input = {
        operation: EDITORIAL_OPERATION.THESIS_TO_NARRATIVE,
        article: "Current draft.",
        articleTitle: "Saved title",
        authorContext: "Explain Kubernetes retries for senior engineers.",
    };
    const prompt = getPromptText(input);

    assert.deepEqual(createEditorialMessages(input), createEditorialMessages({ ...input, skillId: BUILT_IN_SKILL.NARRATIVE_DRAFT }));
    const explainKubernetesRetriesPattern = /Explain Kubernetes retries/;
    assert.match(prompt, explainKubernetesRetriesPattern);
    const currentDraftPattern = /Current draft/;
    assert.match(prompt, currentDraftPattern);
    const preserveAuthorClaimsPattern = /Preserve the author's claims, numbers, URLs, code, technical terms/;
    assert.match(prompt, preserveAuthorClaimsPattern);
    const inventFactsExamplesPattern = /Do not invent facts, examples, or sources/;
    assert.match(prompt, inventFactsExamplesPattern);
    assert.ok(prompt.includes(authorControlInstruction));
    const lineEndingPattern = /Current Article title:\nSaved title/;
    assert.match(prompt, lineEndingPattern);
    const titleManagedSeparatelyPattern = /title is managed separately/i;
    assert.match(prompt, titleManagedSeparatelyPattern);
});


// Product scenario: editorial-workflows.talking-points-source
test("talking-points prompt prioritizes the Author's message and defaults to 3–5 theses", async () => {
    const prompt = getPromptText({
        operation: EDITORIAL_OPERATION.THESIS_TO_NARRATIVE,
        article: "Existing Article content.",
        authorContext: "Why retries need an upper bound.",
        skillId: BUILT_IN_SKILL.TALKING_POINTS,
    });

    const lineEndingPattern = /Author's message:\nWhy retries need an upper bound/;
    assert.match(prompt, lineEndingPattern);
    const existingArticleContentPattern = /Existing Article content/;
    assert.doesNotMatch(prompt, existingArticleContentPattern);
    const betweenThesesPattern = /between 3 and 5 theses/;
    assert.match(prompt, betweenThesesPattern);
    const askAuthorFocusedPattern = /ask the Author only the focused questions needed/;
    assert.match(prompt, askAuthorFocusedPattern);
});


test("talking-points prompt falls back to Article content when the composer is empty", async () => {
    const prompt = getPromptText({
        operation: EDITORIAL_OPERATION.THESIS_TO_NARRATIVE,
        article: "Retries can amplify an outage.",
        authorContext: "   ",
        skillId: BUILT_IN_SKILL.TALKING_POINTS,
    });

    const lineEndingPattern = /Article content:\nRetries can amplify an outage/;
    assert.match(prompt, lineEndingPattern);
});


test("talking-points prompt uses an Article selection as primary and allows the Author's message to extend it", async () => {
    const prompt = getPromptText({
        operation: EDITORIAL_OPERATION.THESIS_TO_NARRATIVE,
        article: "Selected evidence with two concrete claims.",
        articleSelection: true,
        authorContext: "Find ideas across the whole Article.",
        skillId: BUILT_IN_SKILL.TALKING_POINTS,
    });

    const lineEndingPattern = /Article selection:\nSelected evidence with two concrete claims/;
    assert.match(prompt, lineEndingPattern);
    const authorMessageSupplementaryPattern = /Author message \(supplementary direction or material that may extend the selection\)/;
    assert.match(prompt, authorMessageSupplementaryPattern);
    const treatSelectionAnyPattern = /treat only the selection and any material explicitly supplied in the Author's message as source material/;
    assert.match(prompt, treatSelectionAnyPattern);
    const selectionPlusAnyPattern = /selection plus any supplementary material the Author explicitly provides/;
    assert.match(prompt, selectionPlusAnyPattern);
});


// Product scenario: editorial-workflows.narrative-draft-source
test("narrative-draft prompt follows Author direction, selection priority, and the resulting Article size hint", async () => {
    const prompt = getPromptText({
        operation: EDITORIAL_OPERATION.THESIS_TO_NARRATIVE,
        article: "Selected theses.",
        articleTitle: "Existing Article title",
        articleSelection: true,
        authorContext: "Add one simple example.",
        skillId: BUILT_IN_SKILL.NARRATIVE_DRAFT,
        surroundingArticleCharacterCount: 800,
        targetArticleCharacterLimit: 1_300,
    });

    const authorDirectionSectionPattern = /Author message \(highest-priority direction and supplementary material\):\nAdd one simple example/;
    assert.match(prompt, authorDirectionSectionPattern);
    const selectedThesesSectionPattern = /Article selection:\nSelected theses/;
    assert.match(prompt, selectedThesesSectionPattern);
    const treatSelectionAnyPattern = /treat only the selection and any material explicitly supplied in the Author's message as source material/;
    assert.match(prompt, treatSelectionAnyPattern);
    const resultingCompleteArticlePattern = /resulting complete Article: about 1300 characters/;
    assert.match(prompt, resultingCompleteArticlePattern);
    const hardLimitYourPattern = /not a hard limit on your response/;
    assert.match(prompt, hardLimitYourPattern);
    const unchangedSurroundingArticlePattern = /unchanged surrounding Article currently contains 800 characters/;
    assert.match(prompt, unchangedSurroundingArticlePattern);
    const outputFormatSectionPattern = /Output format:\nSelected-passage Markdown replacement/;
    assert.match(prompt, outputFormatSectionPattern);
    const titleManagedSeparatelyPattern = /title is managed separately/i;
    assert.match(prompt, titleManagedSeparatelyPattern);
    const existingArticleTitleSectionPattern = /Current Article title:\nExisting Article title/;
    assert.doesNotMatch(prompt, existingArticleTitleSectionPattern);
    const articleAuthorPattern = /not the Article's author/;
    assert.match(prompt, articleAuthorPattern);
    const preferStraightforwardStructurePattern = /Prefer straightforward structure and ideas/;
    assert.match(prompt, preferStraightforwardStructurePattern);
});

test("full Narrative Draft uses the existing Article title without adding it to the body", async () => {
    const prompt = getPromptText({
        operation: EDITORIAL_OPERATION.THESIS_TO_NARRATIVE,
        article: "Draft body.",
        articleTitle: "Existing Article title",
        authorContext: "",
        skillId: BUILT_IN_SKILL.NARRATIVE_DRAFT,
    });

    const lineEndingPattern = /Current Article title:\nExisting Article title/;
    assert.match(prompt, lineEndingPattern);
    const titleManagedSeparatelyPattern = /title is managed separately/i;
    assert.match(prompt, titleManagedSeparatelyPattern);
    const includeTitleLabelPattern = /do not include a title or title label in the proposed body/i;
    assert.match(prompt, includeTitleLabelPattern);
});


test("flow-revision prompt asks for a full-text proposal rather than feedback", async () => {
    const prompt = getPromptText({
        operation: EDITORIAL_OPERATION.FLOW_REVISION,
        article: "Current draft.",
        articleTitle: "Saved title",
        authorContext: "Keep the opening sentence.",
    });

    const reviseCurrentArticlePattern = /Revise the current Article as a complete Article/;
    assert.match(prompt, reviseCurrentArticlePattern);
    const completeArticlePattern = /complete Article/;
    assert.match(prompt, completeArticlePattern);
    const summarizeTurnIntoPattern = /do not summarize it or turn it into feedback/;
    assert.match(prompt, summarizeTurnIntoPattern);
    const makeChangePreservePattern = /make only that change\. Preserve all other wording, punctuation, and formatting exactly/;
    assert.match(prompt, makeChangePreservePattern);
    const keepOpeningSentencePattern = /Keep the opening sentence/;
    assert.match(prompt, keepOpeningSentencePattern);
    const lineEndingPattern = /Current Article title:\nSaved title/;
    assert.match(prompt, lineEndingPattern);
    const includeTitleLabelPattern = /do not include a title or title label in the proposed body/i;
    assert.match(prompt, includeTitleLabelPattern);
});


test("style review sends a compact profile rather than raw corpus text", async () => {
    const prompt = getPromptText({
        operation: EDITORIAL_OPERATION.STYLE_REVIEW,
        article: "Current draft.",
        articleTitle: "Saved title",
        authorContext: "",
        styleProfile: {
            version: 1,
            corpusItemCount: 1,
            characterCount: 120,
            confidence: "low",
            updatedAt: "2026-07-28T00:00:00.000Z",
            traits: [{ id: "paragraphing", label: "Compact paragraphs", evidence: "Observed locally." }],
            phrasesToAvoid: [],
            contributorIds: ["sample-1"],
            rules: { manual: "", typography: [] },
        },
    });

    const suppliedCorpusTraitsPattern = /Supplied corpus traits/;
    assert.match(prompt, suppliedCorpusTraitsPattern);
    const paragraphingCompactParagraphsPattern = /paragraphing: Compact paragraphs/;
    assert.match(prompt, paragraphingCompactParagraphsPattern);
    const additionalAuthorGuidancePattern = /No additional author guidance was provided/;
    assert.match(prompt, additionalAuthorGuidancePattern);
    const lineEndingPattern = /Current Article title:\nSaved title/;
    assert.match(prompt, lineEndingPattern);
    const includeTitleLabelPattern = /do not include a title or title label in the proposed body/i;
    assert.match(prompt, includeTitleLabelPattern);
});

test("selected editorial text does not send the surrounding Article title", () => {
    const prompt = getPromptText({
        operation: EDITORIAL_OPERATION.FLOW_REVISION,
        article: "Selected passage.",
        articleTitle: "Private surrounding title",
        articleSelection: true,
        authorContext: "",
    });

    const privateSurroundingTitlePattern = /Private surrounding title/;
    assert.doesNotMatch(prompt, privateSurroundingTitlePattern);
});


// Product scenario: editorial-workflows.concise-rewrite-contract
test("Concise rewrite specifies safe deletion, preservation, prose output, and exact no-op behavior", () => {
    const fixtures = [
        { article: "It is important to note that retries can cause repeated requests, again and again.", authorContext: "Cut the introduction first." },
        { article: "Retries need limits.", authorContext: "" },
        { article: 'At 42 ms, API-v2 may fail. "Keep this quote." [Evidence](https://example.test) [^1]\n\n```js\nretry(42);\n```', authorContext: "Keep the example." },
    ];
    for (const fixture of fixtures) {
        const prompt = getPromptText({ ...fixture, operation: EDITORIAL_OPERATION.FLOW_REVISION, skillId: BUILT_IN_SKILL.CONCISE_REWRITE, articleTitle: "Saved title" });
        assert.ok(prompt.includes(fixture.article));
        assert.ok(prompt.includes(fixture.authorContext));
        const removeRepetitionThroatPattern = /Remove repetition, throat-clearing, filler/;
        assert.match(prompt, removeRepetitionThroatPattern);
        const claimsNumbersUrlsPattern = /claims, numbers, URLs, quotations, citations, code, technical terms, supported Markdown formatting, author voice, and degree of certainty/;
        assert.match(prompt, claimsNumbersUrlsPattern);
        const addFactsExamplesPattern = /Do not add facts, examples, conclusions, sources, or stronger certainty/;
        assert.match(prompt, addFactsExamplesPattern);
        const fewerCharactersThanPattern = /fewer characters than the source/;
        assert.match(prompt, fewerCharactersThanPattern);
        const returnSourceBytePattern = /return the source byte-for-byte unchanged/;
        assert.match(prompt, returnSourceBytePattern);
        const returnArticleSummaryPattern = /Return an Article, not a summary, outline, list, or feedback/;
        assert.match(prompt, returnArticleSummaryPattern);
        const lineEndingPattern = /Current Article title:\nSaved title/;
        assert.match(prompt, lineEndingPattern);
        assert.ok(prompt.includes(authorControlInstruction));
        const makeChangePattern = /make only that change/;
        assert.doesNotMatch(prompt, makeChangePattern);
    }
});


test("Concise rewrite selection requests only an excerpt replacement without the Article title", () => {
    const prompt = getPromptText({ operation: EDITORIAL_OPERATION.FLOW_REVISION, skillId: BUILT_IN_SKILL.CONCISE_REWRITE, article: "Selected excerpt.", articleTitle: "Private title", articleSelection: true, authorContext: "Keep the example." });
    const selectedPassageMarkdownPattern = /Selected-passage Markdown replacement/;
    assert.match(prompt, selectedPassageMarkdownPattern);
    const lineEndingPattern = /Article selection:\nSelected excerpt/;
    assert.match(prompt, lineEndingPattern);
    const requestSurroundingArticlePattern = /do not request surrounding Article context/;
    assert.match(prompt, requestSurroundingArticlePattern);
    const privateTitlePattern = /Private title/;
    assert.doesNotMatch(prompt, privateTitlePattern);
});


test("translation prompt names the target language and preserves protected tokens", async () => {
    const prompt = getPromptText({
        operation: EDITORIAL_OPERATION.TRANSLATION,
        article: "Use [[SKLADNO_PROTECTED_0]].",
        articleTitle: "Deploy Node.js safely",
        authorContext: "Keep the direct tone.",
        targetLanguage: "Spanish",
    });

    const lineEndingPattern = /Target language:\nSpanish/;
    assert.match(prompt, lineEndingPattern);
    const translateItsTitlePattern = /Translate its title and body in the same response/;
    assert.match(prompt, translateItsTitlePattern);
    const titleFieldTranslationPattern = /title field.*translation field.*body only/i;
    assert.match(prompt, titleFieldTranslationPattern);
    const deployNodeSafelyPattern = /Deploy Node\.js safely/;
    assert.match(prompt, deployNodeSafelyPattern);
    const copyEveryTokenPattern = /copy every token exactly once/;
    assert.match(prompt, copyEveryTokenPattern);
    const skladnoProtectedPattern = /\[\[SKLADNO_PROTECTED_0\]\]/;
    assert.match(prompt, skladnoProtectedPattern);
});
