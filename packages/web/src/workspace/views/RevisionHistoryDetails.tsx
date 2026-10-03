import type { ArticleRevision, GeneralSettings } from "@skladno/shared";
import { useIntl } from "react-intl";
import { Badge, Banner, Button, Select } from "../../ui/primitives.js";
import { formatDateTime } from "../../i18n/formatting.js";
import { RevisionArticlePreview } from "../editor/RevisionArticlePreview.js";
import { getRevisionCharacterCount, type RevisionHistoryEntry, getProvenanceMessageId, getRestoredRevisionTarget, getRevisionTitle } from "./revision-history-presentation.js";
import type { ArticleFilesState } from "../state/article-files-state.js";


export function RevisionHistoryDetails({ revisions, bypassedRevisionIds, selected, preview, failed, retry, currentRevisionId, select, onSelect, generalSettings, files }: {
    revisions: RevisionHistoryEntry[];
    bypassedRevisionIds: ReadonlySet<string>;
    selected: RevisionHistoryEntry;
    preview?: ArticleRevision;
    failed: boolean;
    retry: () => void;
    currentRevisionId: string;
    select: (revision: RevisionHistoryEntry) => void;
    onSelect: (revisionId: string) => void;
    generalSettings: GeneralSettings;
    files?: Pick<ArticleFilesState, "pending" | "saveRevision">;
}) {
    const intl = useIntl();
    const newestFirst = [...revisions].reverse();
    const selectedIsCurrent = selected.id === currentRevisionId;
    const selectedProvenance = intl.formatMessage({ id: getProvenanceMessageId(selected, revisions) });
    const selectedTarget = getRestoredRevisionTarget(revisions, selected);
    const selectedTitle = selectedTarget ? intl.formatMessage({ id: selectedTarget.description ? "revisions.restoredTargetDescribed" : "revisions.restoredTarget" }, selectedTarget) : getRevisionTitle(selected, selectedProvenance);
    const formatRevisionDate = (createdAt: string) => formatDateTime(createdAt, generalSettings.interfaceLocale, generalSettings.dateFormat, generalSettings.timeFormat, generalSettings.timeZone);

    return <section className="flex min-w-0 flex-1 flex-col" aria-label={intl.formatMessage({ id: "revisions.articleContent" })}>
        <div className="border-b border-border px-5 py-4">
            <label className="block md:hidden">
                <span className="text-xs font-semibold text-ink">{intl.formatMessage({ id: "revisions.select" })}</span>
                <Select className="mt-1" value={selected.id} onChange={(event) => onSelect(event.target.value)}>
                    {newestFirst.map((revision) => {
                        const target = getRestoredRevisionTarget(revisions, revision);
                        const title = target ? intl.formatMessage({ id: target.description ? "revisions.restoredTargetDescribed" : "revisions.restoredTarget" }, target) : getRevisionTitle(revision, intl.formatMessage({ id: getProvenanceMessageId(revision, revisions) }));
                        return <option key={revision.id} value={revision.id}>{title} — {formatRevisionDate(revision.createdAt)}{bypassedRevisionIds.has(revision.id) && ` · ${intl.formatMessage({ id: "revisions.inactive" })}`}</option>;
                    })}
                </Select>
            </label>
            <div className="mt-3 flex flex-wrap items-start gap-3 md:mt-0">
                <div className="min-w-0 flex-1">
                    <p className="text-micro font-semibold uppercase tracking-overline text-muted">{selectedProvenance}</p>
                    {selected.description && <h2 className="mt-2 text-base font-semibold text-ink">{selectedTitle}</h2>}
                    <p className="mt-1 text-xs text-muted">{formatRevisionDate(selected.createdAt)} · {intl.formatMessage({ id: "revisions.characterCount" }, { count: intl.formatNumber(getRevisionCharacterCount(selected)) })}</p>
                    {selected.restoredFromRevisionId && <p className="mt-2 text-xs text-muted">{intl.formatMessage({ id: "revisions.restoredFromEarlier" })}</p>}
                    {selectedIsCurrent && <p className="mt-2 text-xs text-muted">{intl.formatMessage({ id: "revisions.currentExplanation" })}</p>}
                    {bypassedRevisionIds.has(selected.id) && <p className="mt-2 text-xs text-muted">{intl.formatMessage({ id: "revisions.inactive" })}</p>}
                </div>
                {files && <Button variant="secondary" disabled={files.pending || !preview} onClick={() => preview && void files.saveRevision(preview, revisions.findIndex((revision) => revision.id === selected.id) + 1)}>{intl.formatMessage({ id: "articleFiles.save" })}</Button>}
                {selectedIsCurrent
                    ? <Badge>{intl.formatMessage({ id: "revisions.currentRevision" })}</Badge>
                    : <Button variant="secondary" disabled={!preview} onClick={() => select(selected)}>{intl.formatMessage({ id: "revisions.restore" })}</Button>}
            </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto bg-editor-surface px-8 py-7 [scrollbar-color:var(--color-border-strong)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-strong">
            {preview
                ? <article className="mx-auto w-full max-w-3xl">
                    <RevisionArticlePreview revisionId={preview.id} content={preview.content} />
                </article>
                : <div role="status">
                    {failed ? <Banner tone="error">{intl.formatMessage({ id: "workspace.revisionHistoryFailed" })}
                        <Button variant="secondary" onClick={retry}>{intl.formatMessage({ id: "assistant.retry" })}</Button>
                    </Banner> : intl.formatMessage({ id: "ui.loading" })}
                </div>
            }
        </div>
    </section>;
}
