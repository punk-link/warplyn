import { APPLICATION_ERROR, type FactCheckClaimPreview } from "@skladno/shared";

import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import { unwrapApplicationResult } from "../../errors/unwrap-application-result.js";


export class AssistantClaimSelection {
    private readonly active = new Map<string, { articleId: string; skipped: Set<string>; pending: Set<string> }>();


    start(articleId: string, requestId: string): (claim: string) => boolean {
        const selection = { articleId, skipped: new Set<string>(), pending: new Set<string>() };
        this.active.set(requestId, selection);
        return (claim) => selection.skipped.has(claim);
    }


    updateClaims(requestId: string, claims: FactCheckClaimPreview[]): void {
        const selection = this.active.get(requestId);
        if (selection)
            selection.pending = new Set(claims.filter(({ checked, claim }) => !checked || selection.skipped.has(claim)).map(({ claim }) => claim));
    }


    setSelected(articleId: string, requestId: string, claim: string, selected: boolean): void {
        unwrapApplicationResult(this.updateSelectedClaim(articleId, requestId, claim, selected));
    }


    private updateSelectedClaim(articleId: string, requestId: string, claim: string, selected: boolean): ApplicationResult<void> {
        const selection = this.active.get(requestId);
        if (!selection || selection.articleId !== articleId || !selection.pending.has(claim) || !claim.trim() || claim.length > 2000)
            return failure(APPLICATION_ERROR.INVALID_REQUEST);

        if (selected)
            selection.skipped.delete(claim);
        else
            selection.skipped.add(claim);

        return success(undefined);
    }


    finish(requestId: string): void {
        this.active.delete(requestId);
    }
}
