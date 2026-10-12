import type { AssistantResponseKind } from "@skladno/shared";


export const responseMessages: Record<AssistantResponseKind, "assistant.response.conversation" | "assistant.response.editApplied" | "assistant.response.skill" | "assistant.response.proposal" | "assistant.response.findings" | "assistant.response.partialFindings" | "assistant.response.proposalAndFindings" | "assistant.response.translation" | "assistant.requestCancelled" | "assistant.requestFailed"> = {
    editorial_conversation: "assistant.response.conversation",
    edit_applied: "assistant.response.editApplied",
    skill_response: "assistant.response.skill",
    proposal_prepared: "assistant.response.proposal",
    findings_prepared: "assistant.response.findings",
    findings_partial: "assistant.response.partialFindings",
    proposal_and_findings_prepared: "assistant.response.proposalAndFindings",
    translation_proposal_prepared: "assistant.response.translation",
    request_cancelled: "assistant.requestCancelled",
    request_failed: "assistant.requestFailed",
};


export function getSelectionPreview(selection: string): string {
    const whitespacePattern = /\s+/g;
    const normalized = selection.replace(whitespacePattern, " ").trim();

    return normalized.length > 20 ? `${normalized.slice(0, 20)}…` : normalized;
}
