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
    // Selection offsets and the 500-character budget both count UTF-16 code units.
    let before = Math.max(0, start - 500);
    let after = Math.min(content.length, end + 500);
    if (splitsSurrogatePair(content, before))
        before++;

    if (splitsSurrogatePair(content, after))
        after--;

    return { preceding: content.slice(before, start), following: content.slice(end, after) };
}


export function formatSelectionContext(context?: SelectionContext): string {
    if (!context)
        return "";

    return "\n\nRead-only neighboring context:\n" +
        `Preceding context:\n${JSON.stringify(context.preceding)}\nFollowing context:\n${JSON.stringify(context.following)}`;
}
