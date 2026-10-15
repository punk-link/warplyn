import { useEffect, useState, type ChangeEvent } from "react";
import { defaultGeneralSettings, type ArticleRevisionSummary, type GeneralSettings, type StyleCorpus, type StyleReview } from "@skladno/shared";
import { Banner, Button } from "../../ui/primitives.js";
import { useIntl } from "react-intl";
import type { MessageId } from "../../i18n/messages.js";
import { StyleProfileDialogs } from "./StyleProfileDialogs.js";
import { StyleProfileInsights } from "./StyleProfileInsights.js";
import { StyleProfileGuidance } from "./StyleProfileGuidance.js";
import { StyleProfileReview } from "./StyleProfileReview.js";
import { StyleProfileSources } from "./StyleProfileSources.js";
import { TypographyRulesBlock } from "./TypographyRulesBlock.js";


interface StyleProfileViewData {
    corpus: StyleCorpus | undefined;
    findings: StyleReview | undefined;
    findingsStale: boolean;
    articleId: string;
    revisions?: readonly (ArticleRevisionSummary | import("@skladno/shared").ArticleRevision)[];
    generalSettings?: GeneralSettings;
    typographyStatus?: { busy: boolean; message: string; hasProposal: boolean };
}


interface StyleProfileViewActions {
    add: (name: string | undefined, content: string, origin?: "import") => Promise<void>;
    remove: (id: string) => Promise<void>;
    setIncluded: (id: string, included: boolean) => Promise<void>;
    setRules: (rules: string) => Promise<void>;
    rebuild: () => Promise<void>;
    getArticleRules: (articleId: string) => Promise<string>;
    setArticleRules: (articleId: string, rules: string) => Promise<string>;
    snapshotArticleRevision?: (articleId: string, revisionId: string) => Promise<void>;
    typography?: { save: (rules: import("@skladno/shared").TypographyRule[]) => Promise<void>; check: () => Promise<void>; openProposal: () => void };
}


export function StyleProfileView({ data, actions }: { data: StyleProfileViewData; actions: StyleProfileViewActions }) {
    const { corpus, findings, findingsStale, articleId, revisions = [], generalSettings = defaultGeneralSettings } = data;
    const { add, remove, setIncluded, setRules, rebuild, getArticleRules, setArticleRules, snapshotArticleRevision = async () => undefined } = actions;
    const intl = useIntl();
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [rules, setRulesDraft] = useState(corpus?.rules ?? "");
    const [savedRules, setSavedRules] = useState(corpus?.rules ?? "");
    const [rebuilt, setRebuilt] = useState(false);
    const [adding, setAdding] = useState(false);
    const [validationFailed, setValidationFailed] = useState(false);
    const [uploadFailed, setUploadFailed] = useState(false);
    const [articleRules, setArticleRulesDraft] = useState("");
    const [savedArticleRules, setSavedArticleRules] = useState("");
    const [pendingAction, setPendingAction] = useState<string>();
    const [removingId, setRemovingId] = useState<string>();
    const [snapshotRevisionId, setSnapshotRevisionId] = useState<string>();
    const activeCount = corpus?.items.filter((item) => item.included).length ?? 0;
    const selectableRevisions = revisions.map((revision, index) => ({ revision, number: index + 1 })).sort((left, right) => right.revision.createdAt.localeCompare(left.revision.createdAt));
    const summary = corpus?.profile
        ? intl.formatMessage({ id: "styleProfile.summary" }, { version: corpus.profile.version, confidence: corpus.profile.confidence })
        : intl.formatMessage({ id: "styleProfile.none" });
    const run = (action: string, operation: () => Promise<unknown>, onSuccess?: () => void) => {
        setPendingAction(action);
        void operation().then(() => onSuccess?.(), () => undefined).then(() => setPendingAction(undefined));
    };
    const submit = (origin?: "import") => {
        if (!content.trim()) {
            setValidationFailed(true);
            return;
        }

        run("add", () => add(name, content, origin), () => {
            setValidationFailed(false);
            setName("");
            setContent("");
            setAdding(false);
        });
    };
    const importFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file)
            return;

        const txtPattern = /\.(txt|md)$/i;
        if (!txtPattern.test(file.name)) {
            setUploadFailed(true);
            event.target.value = "";
            return;
        }

        void file.text().then((text) => {
            setUploadFailed(false);
            const txtPattern = /\.(txt|md)$/i;
            setName(file.name.replace(txtPattern, ""));
            setContent(text);
        }, () => setUploadFailed(true));
        event.target.value = "";
    };

    useEffect(() => {
        void getArticleRules(articleId).then((nextRules) => {
            setArticleRulesDraft(nextRules);
            setSavedArticleRules(nextRules);
        }, () => undefined);
    }, [articleId, getArticleRules]);

    useEffect(() => {
        const nextRules = corpus?.rules ?? "";
        setRulesDraft(nextRules);
        setSavedRules(nextRules);
    }, [corpus?.rules]);

    const getRuleStatus = (draft: string, saved: string): MessageId => {
        if (!draft.trim())
            return "styleProfile.rulesNone";

        if (draft === saved)
            return "styleProfile.rulesApplied";

        return "styleProfile.rulesUnsaved";
    };
    const confirmRemove = () => {
        if (!removingId)
            return;

        const id = removingId;
        setRemovingId(undefined);
        run(`remove:${id}`, () => remove(id));
    };
    const confirmSnapshot = () => {
        if (!snapshotRevisionId)
            return;

        const revisionId = snapshotRevisionId;
        setSnapshotRevisionId(undefined);
        run(`snapshot:${revisionId}`, () => snapshotArticleRevision(articleId, revisionId));
    };
    const saveTypography = async (nextRules: import("@skladno/shared").TypographyRule[]) => {
        setPendingAction("typography");
        try {
            await actions.typography?.save(nextRules);
        } finally {
            setPendingAction(undefined);
        }
    };

    return (
        <div className="mx-auto flex h-full min-h-0 w-full min-w-0 max-w-4xl flex-col">
            <header className="mb-6 shrink-0 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold">{intl.formatMessage({ id: "views.styleProfile" })}</h2>
                    <p className="mt-1 text-xs text-muted">
                        {summary} · {intl.formatMessage({ id: "styleProfile.activeSources" }, { count: activeCount })}
                        {corpus?.status === "outdated" ? ` · ${intl.formatMessage({ id: "styleProfile.outdated" })}` : ""}
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3">
                    {rebuilt && (
                        <span className="text-xs text-success" role="status">
                            {intl.formatMessage({ id: "styleProfile.rebuilt" }, { count: activeCount })}
                        </span>
                    )}
                    <Button
                        variant="secondary"
                        state={pendingAction === "rebuild" ? "loading" : "default"}
                        disabled={corpus?.status === "empty" || Boolean(pendingAction)}
                        onClick={() => run("rebuild", rebuild, () => setRebuilt(true))}
                    >
                        {intl.formatMessage({ id: "styleProfile.rebuild" })}
                    </Button>
                </div>
            </header>
            {corpus?.profile?.confidence === "low" && (
                <Banner className="mb-4" tone="warning">
                    {intl.formatMessage({ id: corpus.profile.corpusItemCount ? "styleProfile.lowConfidence" : "typography.rulesOnly" })}
                </Banner>
            )}
            <div
                className={
                    "min-h-0 min-w-0 flex-1 overflow-y-auto pl-1 pr-5 [scrollbar-color:var(--color-border-strong)_transparent] " +
                    "[scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 " +
                    "[&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-strong"
                }
            >
                <div className="w-full">
                    <StyleProfileInsights corpus={corpus} generalSettings={generalSettings} />
                    <StyleProfileReview findings={findings} stale={findingsStale} />
                    {actions.typography && (
                        <TypographyRulesBlock
                            rules={corpus?.typographyRules}
                            save={saveTypography}
                            check={actions.typography.check}
                            busy={Boolean(pendingAction) || data.typographyStatus?.busy}
                        />
                    )}
                    {data.typographyStatus?.message && (
                        <Banner tone="error" role="alert">
                            {data.typographyStatus.message}
                        </Banner>
                    )}
                    {data.typographyStatus?.hasProposal && actions.typography && (
                        <Button variant="secondary" className="mb-4" onClick={actions.typography.openProposal}>
                            {intl.formatMessage({ id: "typography.reviewProposal" })}
                        </Button>
                    )}
                    {findings?.typography && <TypographyReviewStatus findings={findings} currentVersion={corpus?.profile?.version} />}
                    <StyleProfileGuidance
                        data={{ pendingAction, rules, savedRules, articleRules, savedArticleRules }}
                        actions={{
                            setRules: setRulesDraft,
                            setArticleRules: setArticleRulesDraft,
                            onSaveRules: () =>
                                run(
                                    "rules",
                                    () => setRules(rules),
                                    () => setSavedRules(rules),
                                ),
                            onSaveArticleRules: () =>
                                run(
                                    "article-rules",
                                    () => setArticleRules(articleId, articleRules),
                                    () => setSavedArticleRules(articleRules),
                                ),
                            getRuleStatus,
                        }}
                    />
                    <StyleProfileSources
                        data={{
                            corpus,
                            revisions: selectableRevisions,
                            generalSettings,
                            pendingAction,
                            adding,
                            name,
                            content,
                            validationFailed,
                            uploadFailed,
                        }}
                        actions={{
                            setAdding,
                            setName,
                            setContent,
                            onImport: importFile,
                            onSubmit: submit,
                            onRemove: setRemovingId,
                            onSetIncluded: (id, included) => run(`include:${id}`, () => setIncluded(id, included)),
                            onSnapshot: setSnapshotRevisionId,
                        }}
                    />
                </div>
            </div>
            <StyleProfileDialogs
                data={{ removingId, snapshotRevisionId, revisions: selectableRevisions }}
                actions={{
                    onCloseRemove: () => setRemovingId(undefined),
                    onConfirmRemove: confirmRemove,
                    onCloseSnapshot: () => setSnapshotRevisionId(undefined),
                    onSelectSnapshot: setSnapshotRevisionId,
                    onConfirmSnapshot: confirmSnapshot,
                }}
            />
        </div>
    );
}


function TypographyReviewStatus({ findings, currentVersion }: { findings: StyleReview; currentVersion: number | undefined }) {
    const intl = useIntl();
    const typography = findings.typography;
    if (!typography)
        return null;

    return (
        <div className="mb-4 space-y-2 text-xs text-muted" role="status">
            {findings.profileVersion !== currentVersion && (
                <Banner tone="warning">
                    {intl.formatMessage({ id: "typography.olderProfile" }, { version: findings.profileVersion })}
                </Banner>
            )}
            {!typography.occurrences.length && <p>{intl.formatMessage({ id: "typography.noViolations" })}</p>}
            {typography.skipped > 0 && <p>{intl.formatMessage({ id: "typography.skipped" }, { count: typography.skipped })}</p>}
            {typography.local && typography.contextualRuleIds.length > 0 && (
                <p>{intl.formatMessage({ id: "typography.contextualSkipped" }, { count: typography.contextualRuleIds.length })}</p>
            )}
        </div>
    );
}
