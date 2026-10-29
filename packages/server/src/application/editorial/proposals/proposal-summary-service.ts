import { APPLICATION_ERROR, type ProposalChange, type ProposalChangeSummary } from "@skladno/shared";

import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import { unwrapApplicationResult } from "../../errors/unwrap-application-result.js";
import type { EditorialEngineResolver } from "../engine/editorial-engine-resolver.js";


interface ProposalSummaryArtifactStore {
    getEditorialArtifact(artifactId: string, articleId: string): { content: string } | undefined;
    updateEditorialArtifactContent(artifactId: string, articleId: string, content: string): void;
}


function parseProposalChanges(value: unknown): ApplicationResult<ProposalChange[]> {
    if (!Array.isArray(value) || value.length > 50)
        return failure(APPLICATION_ERROR.INVALID_REQUEST);

    const result = value.filter((change: unknown): change is ProposalChange => {
        if (!change || typeof change !== "object" || !("id" in change) || typeof change.id !== "string" ||
            !("baseLines" in change) || !Array.isArray(change.baseLines) ||
            !("proposalLines" in change) || !Array.isArray(change.proposalLines))
            return false;

        return change.baseLines.every((line: unknown) => typeof line === "string") &&
            change.proposalLines.every((line: unknown) => typeof line === "string");
    });

    if (result.length !== value.length)
        return failure(APPLICATION_ERROR.INVALID_REQUEST);

    return success(result);
}


export class ProposalSummaryService {
    constructor(
        private readonly engines: EditorialEngineResolver,
        private readonly artifacts: ProposalSummaryArtifactStore,
    ) { }


    async summarize(articleId: string, value: unknown, signal: AbortSignal): Promise<ProposalChangeSummary[]> {
        return unwrapApplicationResult(await this.summarizeProposalChanges(articleId, value, signal));
    }


    private async summarizeProposalChanges(articleId: string, value: unknown, signal: AbortSignal): Promise<ApplicationResult<ProposalChangeSummary[]>> {
        const input = value && typeof value === "object" ? value as { editorialArtifactId?: unknown; interfaceLocale?: unknown; changes?: unknown } : {};
        if (typeof input.editorialArtifactId !== "string" || typeof input.interfaceLocale !== "string" || !input.interfaceLocale.trim())
            return failure(APPLICATION_ERROR.INVALID_REQUEST);

        const requestedChanges = parseProposalChanges(input.changes);
        if (!requestedChanges.ok)
            return requestedChanges;

        const artifact = this.artifacts.getEditorialArtifact(input.editorialArtifactId, articleId);
        if (!artifact)
            return failure(APPLICATION_ERROR.INVALID_REQUEST);

        const content = JSON.parse(artifact.content) as { proposalSummaries?: ProposalChangeSummary[]; proposalSummaryLocale?: string; [key: string]: unknown };
        if (isLocalTypography(content.styleReview))
            return success([]);

        if (content.proposalSummaryLocale === input.interfaceLocale && Array.isArray(content.proposalSummaries))
            return success(content.proposalSummaries);

        const generator = this.engines.resolveProposalSummaryGenerator?.();
        if (!generator)
            return failure(APPLICATION_ERROR.EDITORIAL_CONFIGURATION_MISSING);

        const summaries = await generator.summarize(requestedChanges.value, input.interfaceLocale, signal);
        this.artifacts.updateEditorialArtifactContent(input.editorialArtifactId, articleId, JSON.stringify({
            ...content,
            proposalSummaries: summaries,
            proposalSummaryLocale: input.interfaceLocale,
        }));

        return success(summaries);
    }
}


function isLocalTypography(value: unknown): boolean {
    if (!value || typeof value !== "object" || !("typography" in value))
        return false;

    const typography = value.typography;
    return Boolean(typography && typeof typography === "object" && "local" in typography && typography.local === true);
}
