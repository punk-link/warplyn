import type { ReactNode } from "react";
import type { Article, GeneralSettings, PublishLimitProfile } from "@skladno/shared";
import type { ArticleRevisionsState } from "../state/article-revisions-state.js";
import type { ArticleWorkspaceState } from "../state/article-workspace-state.js";
import type { EditorialProposalState } from "../state/editorial-proposal-state.js";
import type { StyleCorpusState } from "../state/style-corpus-state.js";
import { ArticleEditorView } from "../views/ArticleEditorView.js";
import { FactCheckView } from "../views/FactCheckView.js";
import { ProposalReviewView } from "../views/ProposalReviewView.js";
import type { WorkspaceView } from "../workspace-views.js";
import { RevisionHistoryView } from "../views/RevisionHistoryView.js";
import { StyleProfileView } from "../views/StyleProfileView.js";
import { TranslationsView } from "../views/TranslationsView.js";
import type { AssistantSelectionSnapshot } from "../editor/ArticleEditorPlugins.js";


interface WorkspaceViewContent {
    view: WorkspaceView;
    article: Article;
    workspace: ArticleWorkspaceState;
    editorial: EditorialProposalState;
    revisions: ArticleRevisionsState;
    corpus: StyleCorpusState;
    generalSettings: GeneralSettings;
    checkingClaimCount?: number;
    publishProfile: PublishLimitProfile;
    publishProfileLabel: string;
}


interface WorkspaceViewActions {
    runFactCheck: () => void;
    runTranslation: () => void;
    rejectTranslation?: (targetLanguage: string) => Promise<void>;
    onSelectionChange?: (value: AssistantSelectionSnapshot | undefined) => void;
    assistantSelection?: string;
}


interface WorkspaceViewNavigation {
    proposalWarningsDismissed: boolean;
    dismissProposalWarnings: () => void;
    openWrite: () => void;
    openAssistant: () => void;
    selectedTranslationLanguages: Readonly<Record<string, string>>;
    setSelectedTranslationLanguage: (articleId: string, targetLanguage: string) => void;
}


export function WorkspaceViewRouter({ content, actions, navigation }: { content: WorkspaceViewContent; actions: WorkspaceViewActions; navigation: WorkspaceViewNavigation }) {
    const { view, article, workspace, editorial, revisions, corpus, generalSettings, checkingClaimCount, publishProfile, publishProfileLabel } = content;
    const { runFactCheck, runTranslation, rejectTranslation, onSelectionChange, assistantSelection } = actions;
    const { proposalWarningsDismissed, dismissProposalWarnings, openWrite, openAssistant, selectedTranslationLanguages, setSelectedTranslationLanguage } = navigation;
    const renderPanel = (children: ReactNode) => <section data-focus-area={view === "write" ? undefined : "article-editor"} role="tabpanel" id={`workspace-panel-${view}`} aria-labelledby={`workspace-tab-${view}`} className={panelClassName(view)}>{children}</section>;
    const articleRevisions = revisions.revisions.length ? revisions.revisions : [article.currentRevision];

    switch (view) {
        case "write":
            return renderPanel(<ArticleEditorView articleId={article.id} content={workspace.content} setContent={workspace.setContent} onSelectionChange={onSelectionChange} assistantSelection={assistantSelection} />);

        case "proposal":
            return renderPanel(<ProposalReviewView data={{ review: editorial.review, accepted: editorial.accepted, stale: editorial.stale, decisions: editorial.decisions, summaries: editorial.proposalSummaries, summaryState: editorial.proposalSummaryState, warningsDismissed: proposalWarningsDismissed }} actions={{ setDecision: editorial.setDecision, acceptAll: editorial.acceptAll, applyAccepted: editorial.applyAccepted, rejectAll: editorial.rejectAll, dismissProposal: editorial.dismissProposal, dismissWarnings: dismissProposalWarnings, openWrite, openAssistant }} />);

        case "revisions":
            return renderPanel(<RevisionHistoryView revisions={revisions.revisions} currentRevisionId={article.currentRevisionId} select={revisions.setCandidate} generalSettings={generalSettings} />);

        case "fact-check": {
            const revisionNumber = revisions.revisions.findIndex((revision) => revision.id === editorial.factCheck?.reviewedRevisionId);
            const reusedRevisionNumbers = Object.fromEntries(revisions.revisions.map((revision, index) => [revision.id, index + 1]));
            return renderPanel(<FactCheckView data={{ factCheck: editorial.factCheck, currentRevisionId: article.currentRevisionId, revisions: articleRevisions, runs: editorial.factCheckRuns, selectedRun: editorial.selectedFactCheckRun, revisionNumber: revisionNumber < 0 ? undefined : revisionNumber + 1, reusedRevisionNumbers, stale: editorial.factCheckStale, historical: editorial.factCheckHistorical, generalSettings, checkingClaimCount }} actions={{ runAgain: runFactCheck, selectRun: editorial.selectFactCheckRun, resolve: editorial.resolveFactCheck, proposeCorrections: editorial.proposeFactCorrections }} />);
        }

        case "style-profile":
            return renderPanel(<StyleProfileView data={{ corpus: corpus.corpus, findings: editorial.styleReview, findingsStale: editorial.styleReviewStale, articleId: article.id, revisions: revisions.revisions, generalSettings }} actions={{ add: corpus.add, remove: corpus.remove, setIncluded: corpus.setIncluded, setRules: corpus.setRules, rebuild: corpus.rebuild, getArticleRules: corpus.getArticleRules, setArticleRules: corpus.setArticleRules, snapshotArticleRevision: corpus.snapshotArticleRevision }} />);

        case "translations":
            return renderPanel(<TranslationsView data={{ article, sourceArticle: article.sourceArticleId ? workspace.articles.find((item) => item.id === article.sourceArticleId) : undefined, linkedTranslations: workspace.articles.filter((item) => item.sourceArticleId === article.id), translations: editorial.translations, stale: editorial.translationStale || Boolean(article.sourceArticleId && workspace.articles.find((item) => item.id === article.sourceArticleId)?.currentRevisionId !== article.sourceRevisionId), translationLanguages: generalSettings.defaultTranslationLanguages.filter((language) => language !== article.language), publishProfile, publishProfileLabel, selectedTargetLanguage: selectedTranslationLanguages[article.id] }} actions={{ create: editorial.createTranslation, reject: rejectTranslation ?? editorial.rejectTranslation, edit: openWrite, openArticle: workspace.selectArticle, selectTargetLanguage: (targetLanguage) => setSelectedTranslationLanguage(article.id, targetLanguage), translate: runTranslation }} />);

        default: return null;
    }
}


function panelClassName(view: WorkspaceView): string {
    switch (view) {
        case "write":
        case "revisions":
        case "proposal":
            return "flex min-h-0 flex-1 flex-col overflow-hidden";
        case "translations":
            return "flex min-h-0 flex-1 flex-col overflow-hidden p-5";
        case "style-profile":
            return "min-h-0 flex-1 overflow-hidden p-5";
        default:
            return "min-h-0 flex-1 overflow-y-auto p-5 [scrollbar-color:var(--color-border-strong)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-strong";
    }
}
