import { useEffect, useState } from "react";
import { defaultGeneralSettings, type ArticleRevision, type GeneralSettings } from "@skladno/shared";
import { RevisionHistoryDetails } from "./RevisionHistoryDetails.js";
import { RevisionHistoryNavigation } from "./RevisionHistoryNavigation.js";
import { getBypassedRevisionIds } from "./revision-history-presentation.js";
import type { ArticleFilesState } from "../state/article-files-state.js";


export function RevisionHistoryView({ revisions, currentRevisionId, select, generalSettings = defaultGeneralSettings, files }: {
    revisions: ArticleRevision[];
    currentRevisionId: string;
    select: (item: ArticleRevision) => void;
    generalSettings?: GeneralSettings;
    files?: Pick<ArticleFilesState, "pending" | "saveRevision">;
}) {
    const [selectedRevisionId, setSelectedRevisionId] = useState(currentRevisionId);
    const selected = revisions.find((revision) => revision.id === selectedRevisionId) ?? revisions.find((revision) => revision.id === currentRevisionId);
    const bypassedRevisionIds = getBypassedRevisionIds(revisions, currentRevisionId);

    useEffect(() => {
        setSelectedRevisionId(currentRevisionId);
    }, [currentRevisionId]);

    if (!selected)
        return null;

    return <div className="flex min-h-0 flex-1 overflow-hidden rounded-panel border border-border bg-surface-raised">
        <RevisionHistoryNavigation revisions={revisions} bypassedRevisionIds={bypassedRevisionIds} selectedRevisionId={selected.id} onSelect={(revision) => setSelectedRevisionId(revision.id)} generalSettings={generalSettings} />
        <RevisionHistoryDetails revisions={revisions} bypassedRevisionIds={bypassedRevisionIds} selected={selected} currentRevisionId={currentRevisionId} select={select} generalSettings={generalSettings} files={files} />
    </div>;
}
