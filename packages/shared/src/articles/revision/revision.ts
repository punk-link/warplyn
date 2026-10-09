export const REVISION_PROVENANCE_KIND = {
    INITIAL: "initial",
    AUTHOR_DRAFT: "author-draft",
    ACCEPTED_PROPOSAL: "accepted-proposal",
    ASSISTANT_EDIT: "assistant-edit",
    RESTORE: "restore",
} as const;


export type RevisionProvenanceKind = typeof REVISION_PROVENANCE_KIND[keyof typeof REVISION_PROVENANCE_KIND];


export interface ArticleRevision {
    id: string;
    articleId: string;
    content: string;
    createdAt: string;
    description?: string;
    provenance: Record<string, unknown>;
    restoredFromRevisionId?: string;
    titleGeneration?: { status: "generated"; title: string } | { status: "insufficient-context" | "failed" };
}


export type ArticleRevisionSummary = Omit<ArticleRevision, "content"> & { characterCount: number };


export interface SaveArticleRevisionInput {
    content: string;
    baseRevisionId: string;
    expectedDraftVersion?: number;
    interfaceLocale?: string;
}


export interface AcceptedChange {
    content: string;
    provenance: Record<string, unknown>;
}
