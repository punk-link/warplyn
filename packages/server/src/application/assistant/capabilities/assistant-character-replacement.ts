import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";


export function getExactCharacterReplacement(request: PreparedAssistantRequest, source: string): string | undefined {
    if (!request.editIntentAuthorized)
        return undefined;

    // ponytail: Handles explicit single-character substitutions; use structured parsing if longer literal edits need this path.
    const match = /^(?:change|replace)\s+(\S)\s+(?:to|with)\s+(\S)$/iu.exec(request.authorMessage.trim());
    const from = match?.[1];
    const to = match?.[2];

    return from && to && from !== to && source.includes(from) ? source.replaceAll(from, to) : undefined;
}
