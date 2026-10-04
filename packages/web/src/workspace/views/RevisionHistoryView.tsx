import { useEffect, useState } from "react";
import { defaultGeneralSettings, type ArticleRevision, type GeneralSettings } from "@skladno/shared";
import { RevisionHistoryDetails } from "./RevisionHistoryDetails.js";
import { RevisionHistoryNavigation } from "./RevisionHistoryNavigation.js";
import { getBypassedRevisionIds, type RevisionHistoryEntry } from "./revision-history-presentation.js";
import type { ArticleFilesState } from "../state/article-files-state.js";


export function RevisionHistoryView({ revisions, currentRevisionId, loadRevision, select, generalSettings = defaultGeneralSettings, files }: {
    revisions: RevisionHistoryEntry[];
    loadRevision: (revisionId: string) => Promise<ArticleRevision>;
    currentRevisionId: string;
    select: (item: RevisionHistoryEntry) => void;
    generalSettings?: GeneralSettings;
    files?: Pick<ArticleFilesState, "pending" | "saveRevision">;
}) {
    const [selectedRevisionId, setSelectedRevisionId] = useState(currentRevisionId);
    const [failed, setFailed] = useState(false);
    const [attempt, setAttempt] = useState(0);
    const [preview, setPreview] = useState<ArticleRevision>();
    const selected = revisions.find((revision) => revision.id === selectedRevisionId) ?? revisions.find((revision) => revision.id === currentRevisionId);
    const bypassedRevisionIds = getBypassedRevisionIds(revisions, currentRevisionId);

    useEffect(() => {
        setSelectedRevisionId(currentRevisionId);
    }, [currentRevisionId]);

    useEffect(() => {
        let cancelled = false;
        setPreview(undefined);
        setFailed(false);
        if (selected && !("content" in selected))
            void loadRevision(selected.id).then((revision) => {
                if (!cancelled)
                    setPreview(revision);
            }).catch(() => {
                if (!cancelled)
                    setFailed(true);
            });

        return () => {
            cancelled = true;
        };
    }, [selected, loadRevision, attempt]);

    const fullRevision = selected && "content" in selected ? selected : preview;
    if (!selected)
        return null;

    return <div className="flex min-h-0 flex-1 overflow-hidden rounded-panel border border-border bg-surface-raised">
        <RevisionHistoryNavigation revisions={revisions} bypassedRevisionIds={bypassedRevisionIds} selectedRevisionId={selected.id} onSelect={(revision) => setSelectedRevisionId(revision.id)} generalSettings={generalSettings} />
        <RevisionHistoryDetails preview={fullRevision?.id === selected.id ? fullRevision : undefined} failed={failed} retry={() => setAttempt((value) => value + 1)} onSelect={setSelectedRevisionId} revisions={revisions} bypassedRevisionIds={bypassedRevisionIds} selected={selected} currentRevisionId={currentRevisionId} select={select} generalSettings={generalSettings} files={files} />
    </div>;
}
