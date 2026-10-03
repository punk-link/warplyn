import type { ComponentType } from "react";
import { REVISION_PROVENANCE_KIND, type ArticleRevision, type ArticleRevisionSummary } from "@skladno/shared";
import { ArticleIcon, RevisionAiIcon, RevisionManualIcon, RevisionRestoreIcon } from "../../ui/icons.js";


export type RevisionHistoryEntry = ArticleRevision | ArticleRevisionSummary;


export function getRevisionCharacterCount(revision: RevisionHistoryEntry): number {
    return "content" in revision ? getCharacterCount(revision.content) : revision.characterCount;
}


export function getCharacterCount(content: string): number {
    return Array.from(content).length;
}


export function getProvenanceMessageId(revision: Pick<ArticleRevision, "provenance" | "restoredFromRevisionId"> & Partial<Pick<ArticleRevision, "id">>, revisions?: readonly RevisionHistoryEntry[]): "revisions.empty" | "revisions.initial" | "revisions.author" | "revisions.acceptedProposal" | "revisions.assistantEdit" | "revisions.restored" | "revisions.saved" {
    if (revisions?.[0]?.provenance.kind === REVISION_PROVENANCE_KIND.INITIAL && getRevisionCharacterCount(revisions[0]) === 0) {
        if (revision.id === revisions[0].id)
            return "revisions.empty";

        if (revision.id === revisions[1]?.id)
            return "revisions.initial";
    }

    if (revision.restoredFromRevisionId || revision.provenance.kind === REVISION_PROVENANCE_KIND.RESTORE)
        return "revisions.restored";

    switch (revision.provenance.kind) {
        case REVISION_PROVENANCE_KIND.INITIAL: return "revisions.initial";
        case REVISION_PROVENANCE_KIND.AUTHOR_DRAFT: return "revisions.author";
        case REVISION_PROVENANCE_KIND.ACCEPTED_PROPOSAL: return "revisions.acceptedProposal";
        case REVISION_PROVENANCE_KIND.ASSISTANT_EDIT: return "revisions.assistantEdit";
        default: return "revisions.saved";
    }
}


export function getRevisionTitle(revision: RevisionHistoryEntry, provenance: string): string {
    return revision.description ?? provenance;
}


export function getBypassedRevisionIds(revisions: readonly RevisionHistoryEntry[], currentRevisionId: string): Set<string> {
    const indices = new Map(revisions.map((revision, index) => [revision.id, index]));
    let index = indices.get(currentRevisionId);
    if (index === undefined)
        return new Set();

    const bypassed = new Set(revisions.map((revision) => revision.id));
    while (index >= 0) {
        const revision = revisions[index];
        if (!revision)
            break;

        bypassed.delete(revision.id);
        const targetIndex = indices.get(revision.restoredFromRevisionId ?? "");
        index = targetIndex !== undefined && targetIndex < index ? targetIndex : index - 1;
    }

    return bypassed;
}


export function getRestoredRevisionTarget(revisions: RevisionHistoryEntry[], revision: RevisionHistoryEntry): { number: number; description?: string } | undefined {
    if (!revision.restoredFromRevisionId)
        return undefined;

    const targetIndex = revisions.findIndex((item) => item.id === revision.restoredFromRevisionId);
    const target = targetIndex < 0 ? undefined : revisions[targetIndex];

    return target
        ? {
            number: targetIndex + 1,
            ...(target.description ? { description: target.description } : {})
        }
        : undefined;
}


export type RevisionTimelineKind = "initial" | "manual" | "ai" | "restored";


export function getTimelineKind(revision: RevisionHistoryEntry, revisions?: readonly RevisionHistoryEntry[]): RevisionTimelineKind {
    if (revision.restoredFromRevisionId || revision.provenance.kind === REVISION_PROVENANCE_KIND.RESTORE)
        return "restored";

    if (getProvenanceMessageId(revision, revisions) === "revisions.initial")
        return "initial";

    if (revision.provenance.kind === REVISION_PROVENANCE_KIND.ACCEPTED_PROPOSAL || revision.provenance.kind === REVISION_PROVENANCE_KIND.ASSISTANT_EDIT)
        return "ai";

    return "manual";
}


export const timelineIcons: Record<RevisionTimelineKind, ComponentType<{ className?: string }>> = {
    initial: ArticleIcon,
    manual: RevisionManualIcon,
    ai: RevisionAiIcon,
    restored: RevisionRestoreIcon,
};
