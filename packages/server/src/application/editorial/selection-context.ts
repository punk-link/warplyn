import { APPLICATION_ERROR, HTTP_STATUS } from "@skladno/shared";
import { ApplicationServiceError } from "../errors/application-service-error.js";


export interface SelectionContext {
    preceding: string;
    following: string;
}


function splitsSurrogatePair(content: string, offset: number): boolean {
    const preceding = content.charCodeAt(offset - 1);
    const following = content.charCodeAt(offset);
    return preceding >= 0xD800 && preceding <= 0xDBFF && following >= 0xDC00 && following <= 0xDFFF;
}


export function validateSelectionOffsets(content: string, start: number, end: number): void {
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end > content.length || start >= end ||
        splitsSurrogatePair(content, start) || splitsSurrogatePair(content, end))
        throw new ApplicationServiceError(APPLICATION_ERROR.ASSISTANT_SELECTION_INVALID, HTTP_STATUS.BAD_REQUEST);
}


export function getSelectionContext(content: string, start: number, end: number): SelectionContext {
    validateSelectionOffsets(content, start, end);
    const contextCharacterLimit = 500;
    let contextStart = Math.max(0, start - contextCharacterLimit);
    let contextEnd = Math.min(content.length, end + contextCharacterLimit);
    if (splitsSurrogatePair(content, contextStart))
        contextStart++;

    if (splitsSurrogatePair(content, contextEnd))
        contextEnd--;

    return { preceding: content.slice(contextStart, start), following: content.slice(end, contextEnd) };
}


export function formatSelectionContext(context?: SelectionContext): string {
    if (!context)
        return "";

    return "\n\nRead-only neighboring context:\n" +
        `Preceding context:\n${JSON.stringify(context.preceding)}\nFollowing context:\n${JSON.stringify(context.following)}`;
}
