import type { AssistantMessage } from "@skladno/shared";


export function findLatestRestorableProposal(messages: AssistantMessage[] | undefined): AssistantMessage | undefined {
    const items = messages ?? [];
    for (let index = items.length - 1; index >= 0; index -= 1) {
        const message = items[index];
        if (message.responseKind !== "translation_proposal_prepared" && message.proposalContent && message.baseRevisionId && message.baseRevisionContent)
            return message;
    }
}
