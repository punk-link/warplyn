import { failure, type Result } from "@skladno/shared";


export type SkillWriteResult<T> = Result<T, { issue: string }>;


export function skillWriteFailure(issue: string): Extract<SkillWriteResult<never>, { ok: false }> {
    return failure({ issue });
}


export function unwrapSkillWrite<T>(result: SkillWriteResult<T>): T {
    if (result.ok)
        return result.value;

    throw new Error(result.issue);
}
