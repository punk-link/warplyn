import { useIntl } from "react-intl";
import { useState } from "react";
import {
    ActivityIndicator,
    Banner,
    Button,
    Dialog,
    Diff,
    Drawer,
    EmptyState,
    Field,
    IconButton,
    Progress,
    Select,
    Skeleton,
    Status,
    TextAction,
    TextareaField,
    Tooltip,
} from "../ui/primitives.js";
import { WorkspaceTabBar } from "../workspace/components/WorkspaceTabBar.js";
import type { WorkspaceView } from "../workspace/workspace-views.js";


export function UiLanguagePreview() {
    const intl = useIntl();
    const [view, setView] = useState<WorkspaceView>("write");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [checked, setChecked] = useState(true);

    return (
        <main className="min-h-screen bg-canvas p-4 text-ink sm:p-8">
            <header className="mx-auto mb-8 max-w-6xl">
                <p className="text-xs font-semibold uppercase tracking-overline text-muted">
                    {intl.formatMessage({ id: "preview.developerReference" })}
                </p>
                <h1 className="mt-2 text-3xl font-semibold">{intl.formatMessage({ id: "preview.uILanguagePreview" })}</h1>
                <p className="mt-2 max-w-2xl text-sm text-muted">
                    {intl.formatMessage({ id: "preview.liveExamplesRenderedWithWarplynsShared" })}
                </p>
            </header>
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
                <Drawer className="rounded-panel p-4">
                    <p className="mb-4 font-semibold text-brand">Warplyn</p>
                    <nav aria-label={intl.formatMessage({ id: "preview.previewNavigation" })} className="grid gap-1 text-sm">
                        <a className="rounded-control px-3 py-2 text-muted hover:bg-brand-soft" href="#workspace">
                            {intl.formatMessage({ id: "preview.workspace" })}
                        </a>
                        <a
                            className="rounded-control bg-brand-soft px-3 py-2 font-semibold text-brand"
                            href="#controls"
                            aria-current="page"
                        >
                            {intl.formatMessage({ id: "preview.controls" })}
                        </a>
                        <a className="rounded-control px-3 py-2 text-muted hover:bg-brand-soft" href="#feedback">
                            {intl.formatMessage({ id: "preview.feedback" })}
                        </a>
                    </nav>
                </Drawer>
                <div className="min-w-0 space-y-6">
                    <section id="workspace" className="overflow-hidden rounded-panel border border-border bg-surface">
                        <div className="border-b border-border p-5">
                            <p className="text-xs text-muted">{intl.formatMessage({ id: "preview.articleUpdatedJustNow" })}</p>
                            <h2 className="mt-2 font-editor text-2xl">
                                {intl.formatMessage({ id: "preview.makeSpaceForTheImportantSentence" })}
                            </h2>
                            <p className="mt-1 text-xs text-muted">{intl.formatMessage({ id: "preview.draftSavedLocally" })}</p>
                        </div>
                        <WorkspaceTabBar
                            view={view}
                            setView={setView}
                            badges={{
                                revisions: {
                                    label: "3",
                                    accessibleLabel: intl.formatMessage({ id: "preview.3Revisions" }),
                                    tone: "default",
                                },
                            }}
                        />
                        <div className="p-5">
                            {view === "write" && (
                                <p className="max-w-prose font-editor text-lg leading-8">
                                    {intl.formatMessage({ id: "preview.goodWritingGivesEachIdeaEnough" })}
                                </p>
                            )}
                            {view === "revisions" && (
                                <p className="text-sm text-muted">
                                    {intl.formatMessage({ id: "preview.threeRevisionsPreserveThisArticlesHistory" })}
                                </p>
                            )}
                            {view === "proposal" && (
                                <p className="text-sm text-muted">
                                    {intl.formatMessage({ id: "preview.suggestedChangesWaitForTheAuthors" })}
                                </p>
                            )}
                            {view === "fact-check" && (
                                <p className="text-sm text-muted">{intl.formatMessage({ id: "preview.claimsAndSourcesAppearHereFor" })}</p>
                            )}
                            {view === "translations" && (
                                <p className="text-sm text-muted">
                                    {intl.formatMessage({ id: "preview.translationsStayRecoverableAsSeparateArticles" })}
                                </p>
                            )}
                            <div className="mt-5 flex flex-wrap gap-2">
                                <Button onClick={() => setDialogOpen(true)}>{intl.formatMessage({ id: "preview.reviewChanges" })}</Button>
                                <Button variant="secondary">{intl.formatMessage({ id: "preview.revisionHistory" })}</Button>
                                <Button variant="quiet">{intl.formatMessage({ id: "preview.moreOptions" })}</Button>
                                <Button variant="danger">{intl.formatMessage({ id: "preview.deleteDraft" })}</Button>
                                <Button state="loading" loadingLabel={intl.formatMessage({ id: "preview.saving" })}>
                                    {intl.formatMessage({ id: "preview.save" })}
                                </Button>
                                <IconButton
                                    label={intl.formatMessage({ id: "preview.pinArticle" })}
                                    variant="toolbar"
                                    aria-pressed={checked}
                                    onClick={() => setChecked(!checked)}
                                >
                                    ★
                                </IconButton>
                            </div>
                        </div>
                    </section>

                    <section id="controls" className="rounded-panel border border-border bg-surface p-5">
                        <h2 className="text-base font-semibold">{intl.formatMessage({ id: "preview.fieldsAndChoices" })}</h2>
                        <div className="mt-4 grid gap-5 sm:grid-cols-2">
                            <label className="grid gap-2 text-xs font-semibold">
                                {intl.formatMessage({ id: "preview.articleTitle" })}
                                <Field defaultValue="A useful idea" />
                            </label>
                            <label className="grid gap-2 text-xs font-semibold">
                                {intl.formatMessage({ id: "preview.language" })}
                                <Select defaultValue="en">
                                    <option value="en">{intl.formatMessage({ id: "preview.english" })}</option>
                                    <option value="es">{intl.formatMessage({ id: "preview.espaol" })}</option>
                                </Select>
                            </label>
                            <label className="grid gap-2 text-xs font-semibold sm:col-span-2">
                                {intl.formatMessage({ id: "preview.draftContent" })}
                                <TextareaField defaultValue="A Draft checkpoint preserves work as you write." />
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
                                {intl.formatMessage({ id: "preview.keepRecoveryCheckpoints" })}
                            </label>
                            <div className="flex flex-wrap items-center gap-3">
                                <TextAction href="#feedback">{intl.formatMessage({ id: "preview.learnAboutFeedback" })}</TextAction>
                                <Tooltip content={intl.formatMessage({ id: "preview.recoveryStateIsSavedLocally" })}>
                                    <IconButton label={intl.formatMessage({ id: "preview.help" })}>?</IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </section>

                    <section id="feedback" className="rounded-panel border border-border bg-surface p-5">
                        <h2 className="text-base font-semibold">{intl.formatMessage({ id: "preview.feedbackAndReview" })}</h2>
                        <div className="mt-4 grid gap-4 lg:grid-cols-2">
                            <Status label={intl.formatMessage({ id: "preview.saved" })} tone="success">
                                {intl.formatMessage({ id: "preview.yourDraftIsAvailableLocally" })}
                            </Status>
                            <Banner tone="warning" role="alert">
                                {intl.formatMessage({ id: "preview.thisResultNeedsAnotherLookBefore" })}
                            </Banner>
                            <div className="space-y-2 rounded-panel border border-border p-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <ActivityIndicator />
                                    {intl.formatMessage({ id: "preview.assistantIsPreparingSuggestions" })}
                                </div>
                                <Progress value={62} label={intl.formatMessage({ id: "preview.assistantProgress" })} />
                            </div>
                            <div className="grid gap-2 rounded-panel border border-border p-4">
                                <Skeleton className="h-3 w-2/5" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-3/4" />
                            </div>
                            <Diff
                                removed={intl.formatMessage({ id: "preview.theOriginalWordingIsLessDirect" })}
                                added={intl.formatMessage({ id: "preview.theRevisedWordingIsClearAnd" })}
                            />
                            <div className="rounded-panel border border-border">
                                <EmptyState title={intl.formatMessage({ id: "preview.noRevisionsYet" })}>
                                    <span>{intl.formatMessage({ id: "preview.createACheckpointToPreserveThis" })}</span>
                                    <Button variant="secondary">{intl.formatMessage({ id: "preview.createCheckpoint" })}</Button>
                                </EmptyState>
                            </div>
                        </div>
                        <Button className="mt-4" variant="secondary" onClick={() => setDialogOpen(true)}>
                            {intl.formatMessage({ id: "preview.openConfirmationDialog" })}
                        </Button>
                    </section>
                </div>
            </div>
            <Dialog open={dialogOpen} aria-labelledby="preview-dialog-title" className="w-full max-w-md">
                <h2 id="preview-dialog-title" className="text-base font-semibold">
                    {intl.formatMessage({ id: "preview.restoreThisRevision" })}
                </h2>
                <p className="mt-2 text-sm text-muted">{intl.formatMessage({ id: "preview.restoringAppendsANewRevisionExisting" })}</p>
                <div className="mt-5 flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                        {intl.formatMessage({ id: "preview.cancel" })}
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>{intl.formatMessage({ id: "preview.restoreRevision" })}</Button>
                </div>
            </Dialog>
        </main>
    );
}
