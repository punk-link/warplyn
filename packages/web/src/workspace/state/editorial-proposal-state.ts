import { useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { createTextProposal, parseProposalReplacements } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";
import type { ArticleWorkspaceState } from "./article-workspace-state.js";
import { useProposalActions, type ProposalDecision } from "./editorial-proposal-actions.js";
import { useProposalSummaries, type ProposalBase, type ProposalState } from "./editorial-proposal-helpers.js";
import { useEditorialResults } from "./editorial-results-state.js";
import { canRecoverProposal } from "./proposal-recovery.js";
import { useProposalEdits } from "./proposal-edit-state.js";
import { restoredRevisionAcceptance } from "./proposal-acceptance-recovery.js";

export { withFindingFreshness } from "./editorial-results-state.js";


export function useEditorialProposal(client: EditorialWorkspaceClient, workspace: ArticleWorkspaceState) {
    const intl = useIntl();
    const [proposal, setProposal] = useState("");
    const [base, setBase] = useState<ProposalBase>();
    const [decisions, setDecisions] = useState<Record<string, ProposalDecision>>({});
    const [state, setState] = useState<ProposalState>("idle");
    const [message, setMessage] = useState("");
    const [recoveringTypography, setRecoveringTypography] = useState(false);
    const controller = useRef<AbortController>();
    const restoredArticleIds = useRef(new Set<string>());
    const recoveredDates = useRef(new Map<string, string>());
    const recovery = useMemo(() => ({ articleIds: restoredArticleIds, dates: recoveredDates }), []);
    const results = useEditorialResults(client, workspace);
    const articleId = workspace.selectedArticle?.id;
    const { setStyleReview } = results;
    const activeBase = useRef(base);
    activeBase.current = base;
    const activeArticle = useRef(workspace.selectedArticle);
    activeArticle.current = workspace.selectedArticle;

    useEffect(() => {
        let active = true;
        if (!articleId || !client.getTypographyReview)
            return;

        setRecoveringTypography(true);

        void client.getTypographyReview(articleId).then((result) => {
            if (!active || !result)
                return;

            const current = activeBase.current;
            if (current?.editorialArtifactId === result.editorialArtifactId) {
                setBase({ ...current, typography: result.styleReview.typography });
                setStyleReview(articleId, result.baseRevisionId, result.styleReview);
                return;
            }

            if (!canRecoverProposal(articleId, result.createdAt, current, recovery))
                return;

            restoredArticleIds.current.add(articleId);
            recoveredDates.current.set(articleId, result.createdAt);

            const article = activeArticle.current;
            const acceptance = article && restoredRevisionAcceptance(article, result, createTextProposal(result.baseContent, result.proposal));
            setBase({
                articleId,
                content: result.baseContent,
                revisionId: result.baseRevisionId,
                editorialArtifactId: result.editorialArtifactId,
                typography: result.styleReview.typography,
                recoveredAt: result.createdAt,
                ...(acceptance ? {
                    accepted: true,
                    acceptedReplacements: parseProposalReplacements(article.currentRevision.provenance.proposalReplacements)
                } : {}),
            });

            setDecisions(acceptance ?? {});
            setProposal(result.proposal);
            setStyleReview(articleId, result.baseRevisionId, result.styleReview);
        }).catch(() => {
            if (active)
                setMessage(intl.formatMessage({ id: "typography.checkFailed" }));
        }).finally(() => {
            if (active)
                setRecoveringTypography(false);
        });

        return () => {
            active = false;
        };
    }, [articleId, client, setStyleReview, intl, recovery]);

    const proposalArticleId = base?.articleId;
    const baseContent = base?.content;
    const review = useMemo(() => baseContent !== undefined && proposalArticleId === articleId ? createTextProposal(baseContent, proposal) : undefined,
        [proposalArticleId, baseContent, proposal, articleId]);
    const accepted = base?.accepted === true;
    const stale = Boolean(workspace.selectedArticle && base?.articleId === workspace.selectedArticle.id && base.revisionId !== workspace.selectedArticle.currentRevisionId && !accepted);
    const edits = useProposalEdits(review, accepted || stale || state === "streaming", base?.acceptedReplacements,
        base?.editorialArtifactId ?? base?.recoveredAt);

    const summaries = useProposalSummaries(client, intl, {
        state,
        stale,
        review,
        selectedArticleId: workspace.selectedArticle?.id,
        editorialArtifactId: base?.editorialArtifactId,
        skipModelSummaries: recoveringTypography || base?.typography?.local,
    });

    const actions = useProposalActions({
        client,
        workspace,
        intl,
        proposal: { base, review, accepted, stale, decisions },
        summaries: { setProposalSummaries: summaries.setProposalSummaries, setProposalSummaryLocale: summaries.setProposalSummaryLocale },
        results,
        recovery,
        controller,
        edits,
    }, { setProposal, setBase, setDecisions, setState, setMessage });

    return {
        proposal,
        review,
        edits,
        base,
        accepted,
        proposalStale: stale,
        decisions,
        state,
        message,
        summary: { values: summaries.proposalSummaries, state: summaries.proposalSummaryState },
        factCheck: results.factCheck,
        factCheckRuns: results.factCheckRuns,
        selectedFactCheckRun: results.selectedFactCheckRun,
        selectFactCheckRun: results.selectFactCheckRun,
        factCheckStale: results.factCheckStale,
        factCheckHistorical: results.factCheckHistorical,
        styleReview: results.styleReview,
        styleReviewStale: results.styleReviewStale,
        translation: results.translation,
        translations: results.translations,
        translationStale: results.translationStale,
        ...actions,
    };
}


export type EditorialProposalState = ReturnType<typeof useEditorialProposal>;
