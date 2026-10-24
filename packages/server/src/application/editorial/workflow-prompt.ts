import type { ModelMessage } from "ai";
import {
    APPLICATION_ERROR,
    EDITORIAL_OPERATION,
    editorialOperationSkillMap,
    HTTP_STATUS,
    typographyRuleId,
    typographyRuleLabel,
    type EditorialOperation,
    type StyleProfile,
} from "@skladno/shared";

import { ApplicationServiceError } from "../errors/application-service-error.js";
import { loadBuiltInSkillPackages } from "../assistant/skills/built-in-skill-packages.js";
import { createSkillGuidance } from "../assistant/skills/create-skill-guidance.js";
import type { SkillGuidance } from "../assistant/skills/skill-guidance.js";
import { formatSelectionContext, type SelectionContext } from "./selection-context.js";
import { selectionContextPolicy } from "./selection-context-policy.js";


interface EditorialPromptInput {
    operation: EditorialOperation;
    article: string;
    articleTitle?: string;
    articleSelection?: boolean;
    selectionContext?: SelectionContext;
    authorContext: string;
    skillId?: string;
    skill?: SkillGuidance;
    surroundingArticleCharacterCount?: number;
    styleProfile?: StyleProfile;
    articleStyleRules?: string;
    targetArticleCharacterLimit?: number;
    targetLanguage?: string;
}


export const authorControlInstruction = "Do not claim that you saved or changed the Article.";


function getSkillInstructions(input: EditorialPromptInput): string {
    return resolvePromptSkill(input)?.instructions ?? "";
}


function resolvePromptSkill(input: EditorialPromptInput): SkillGuidance | undefined {
    return input.skill ?? createSkillGuidance(loadBuiltInSkillPackages().find((skill) => skill.reference.id === (input.skillId ?? editorialOperationSkillMap[input.operation])));
}


function createAuthorGuidance(authorContext: string): string {
    return authorContext.trim() || "No additional author guidance was provided.";
}


function formatStyleTraits(profile: StyleProfile): string {
    return profile.traits
        .map((trait) => `- ${trait.id}: ${trait.label} (${trait.evidence})`)
        .join("\n");
}


function formatNumberedRules(rules: string, prefix: string): string {
    return rules.split("\n").map((rule) => rule.trim()).filter(Boolean).map((rule, index) => `- ${prefix}-${index + 1}: ${rule}`).join("\n") || "None.";
}


export function isEditorialOperation(value: string): value is EditorialOperation {
    return Object.values(EDITORIAL_OPERATION).includes(value as EditorialOperation);
}


function createTalkingPointsPrompt(input: EditorialPromptInput): ModelMessage[] {
    const authorMessage = input.authorContext.trim();
    const source = input.articleSelection ? input.article.trim() : authorMessage || input.article.trim();
    let sourceLabel = "Article content";
    if (authorMessage)
        sourceLabel = "Author's message";

    if (input.articleSelection)
        sourceLabel = "Article selection";

    const guidance = input.articleSelection && authorMessage
        ? `\n\nAuthor message (supplementary direction or material that may extend the selection):\n${authorMessage}`
        : "";

    return [
        {
            role: "system",
            content: getSkillInstructions(input)
        },
        {
            role: "user",
            content: `${sourceLabel}:\n${source || "No source content was provided."}${guidance}`
        },
    ];
}


function createArticleTitleContext(input: EditorialPromptInput): string {
    if (input.articleSelection)
        return "";

    return `Current Article title:\n${input.articleTitle ?? ""}\n\n`;
}


function createNarrativeDraftPrompt(input: EditorialPromptInput): ModelMessage[] {
    const authorMessage = input.authorContext.trim();
    const sourceLabel = input.articleSelection ? "Article selection" : "Article content";
    const authorDirection = authorMessage ? `\n\nAuthor message (highest-priority direction and supplementary material):\n${authorMessage}` : "";
    const lengthHint = input.targetArticleCharacterLimit
        ? `\n\nAdvisory target for the resulting complete Article: about ${input.targetArticleCharacterLimit} characters. This is a composition hint, not a hard limit on your response.${input.articleSelection ? ` The unchanged surrounding Article currently contains ${input.surroundingArticleCharacterCount ?? 0} characters; size this replacement with the complete Article in mind.` : ""}`
        : "";
    const outputFormat = input.articleSelection
        ? "Selected-passage Markdown replacement."
        : "Full Article Markdown proposal.";
    const titleContext = createArticleTitleContext(input);

    return [
        {
            role: "system",
            content: getSkillInstructions(input)
        },
        {
            role: "user",
            content: `Output format:\n${outputFormat}\n\n${titleContext}${sourceLabel}:\n${input.article.trim() || "No Article content was provided."}${authorDirection}${lengthHint}`
        },
    ];
}


function createStyleReviewPrompt(input: EditorialPromptInput): ModelMessage[] {
    if (!input.styleProfile)
        throw new ApplicationServiceError(APPLICATION_ERROR.STYLE_CORPUS_REQUIRED, HTTP_STATUS.BAD_REQUEST);

    return [
        {
            role: "system",
            content: getSkillInstructions(input),
        },
        {
            role: "user",
            content:
                `${createArticleTitleContext(input)}Current article:\n${input.article}\n\n` +
                `Corpus confidence: ${input.styleProfile.confidence} (${input.styleProfile.corpusItemCount} item(s), ` +
                `${input.styleProfile.characterCount} characters).\n\n` +
                `Typography language: ${input.styleProfile.rules.typographyCapture?.language ?? "Unspecified"}.\n` +
                "Use only supplied typography conventions; do not default to English for an unspecified language.\n\n" +
                `Supplied corpus traits:\n${formatStyleTraits(input.styleProfile)}\n\nGlobal rules:\n` +
                `${formatNumberedRules(input.styleProfile.rules.manual, "global-rule")}\n\n` +
                `Contextual typography rules:\n${
                    input.styleProfile.rules.typography
                        .filter((rule) => rule.definition.kind === "contextual")
                        .map((rule) => `${typographyRuleId(rule)}: ${typographyRuleLabel(rule)}`)
                        .join("\n") || "None"
                }\n` +
                "Mechanical typography is checked locally after your Proposal. Preserve numbers, code, URLs, and quoted words. " +
                "If guidance conflicts, leave disputed text unchanged and explain which supplied rules need clarification in a Finding.\n\n" +
                `This Article rules:\n${formatNumberedRules(input.articleStyleRules ?? "", "article-rule")}\n\n` +
                `Author guidance:\n${createAuthorGuidance(input.authorContext)}`,
        },
    ];
}


function createTranslationPrompt(input: EditorialPromptInput): ModelMessage[] {
    if (!input.targetLanguage?.trim())
        throw new ApplicationServiceError(APPLICATION_ERROR.TARGET_LANGUAGE_REQUIRED, HTTP_STATUS.BAD_REQUEST);

    return [
        {
            role: "system",
            content: getSkillInstructions(input)
        },
        {
            role: "user",
            content: `Target language:\n${input.targetLanguage.trim()}\n\nCurrent Article title:\n${input.articleTitle ?? ""}\n\nCurrent article:\n${input.article}\n\nAuthor guidance:\n${createAuthorGuidance(input.authorContext)}`
        },
    ];
}


function createFlowRevisionPrompt(input: EditorialPromptInput): ModelMessage[] {
    const sourceLabel = input.articleSelection ? "Article selection" : "Current article";
    return [
        {
            role: "system",
            content: `${getSkillInstructions(input)}\n\nWhen Author guidance requests a specific textual change, make only that change. Preserve all other wording, punctuation, and formatting exactly.`
        },
        {
            role: "user",
            content: `${createArticleTitleContext(input)}${sourceLabel}:\n${input.article}\n\nAuthor guidance:\n${createAuthorGuidance(input.authorContext)}`
        },
    ];
}


function createReplacementPrompt(input: EditorialPromptInput): ModelMessage[] {
    const sourceLabel = input.articleSelection ? "Article selection" : "Current article";
    const outputFormat = input.articleSelection ? "Selected-passage Markdown replacement." : "Full Article body Markdown proposal.";
    return [
        { role: "system", content: getSkillInstructions(input) },
        { role: "user", content: `Output format:\n${outputFormat}\n\n${createArticleTitleContext(input)}${sourceLabel}:\n${input.article}\n\nAuthor guidance:\n${createAuthorGuidance(input.authorContext)}` },
    ];
}


export function createEditorialMessages(input: EditorialPromptInput): ModelMessage[] {
    const messages = createSourceMessages(input);
    if (input.articleSelection && input.selectionContext)
        messages.push({ role: "user", content: formatSelectionContext(input.selectionContext) });

    if (input.articleSelection)
        return messages.map((message) => message.role === "system"
            ? { ...message, content: `${message.content}\n\n${selectionContextPolicy}` }
            : message);

    return messages;
}


function createSourceMessages(input: EditorialPromptInput): ModelMessage[] {
    const skill = resolvePromptSkill(input);
    input = { ...input, skill };
    if (skill?.execution.capability === "generate_proposal") {
        if (skill.execution.source === "author_or_article")
            return createTalkingPointsPrompt(input);

        if (skill.execution.operation === "thesis_to_narrative")
            return createNarrativeDraftPrompt(input);

        return skill.execution.resultPolicy === "verified_edit" ? createFlowRevisionPrompt(input) : createReplacementPrompt(input);
    }

    if (input.operation === EDITORIAL_OPERATION.THESIS_TO_NARRATIVE)
        return createNarrativeDraftPrompt(input);

    if (input.operation === EDITORIAL_OPERATION.STYLE_REVIEW)
        return createStyleReviewPrompt(input);

    if (input.operation === EDITORIAL_OPERATION.TRANSLATION)
        return createTranslationPrompt(input);

    return createFlowRevisionPrompt(input);
}
