import type { ReactNode } from "react";
import type { ArticleSummary } from "@skladno/shared";
import { useIntl } from "react-intl";
import { ChevronRightIcon } from "../../ui/icons.js";


function ArchivedArticleSection({ count, expanded, archiveOnly, toggle, children }: { count: number; expanded: boolean; archiveOnly: boolean; toggle: () => void; children: ReactNode }) {
    const intl = useIntl();
    return <section className={archiveOnly ? "" : "mt-4"}>
        {archiveOnly
            ? <p className="px-2 text-micro font-semibold uppercase tracking-overline text-muted">{intl.formatMessage({ id: "navigation.archived" }, { count })}</p>
            : <button className="flex w-full items-center gap-2 px-2 text-micro font-semibold uppercase tracking-overline text-muted focus-visible:outline focus-visible:outline-brand" type="button" aria-expanded={expanded} onClick={toggle}>
                <ChevronRightIcon className={`size-3 transition-transform ${expanded ? "rotate-90" : ""}`} />{intl.formatMessage({ id: "navigation.archived" }, { count })}
            </button>}
        <div className={`grid transition-[grid-template-rows,opacity] duration-150 motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`} aria-hidden={!expanded} {...(!expanded ? { inert: true } : {}) as Record<string, boolean>}>
            <div className="min-h-0 overflow-hidden">
                <div className="mt-2 space-y-0.5">{children}</div>
            </div>
        </div>
    </section>;
}


export function ArticleLibraryNavigation({ pinnedRoots, recentRoots, archivedRoots, archivedOpen, setArchivedOpen, query, archivedContent, empty, renderRoots, archiveOnly = false }: {
    pinnedRoots: ArticleSummary[];
    recentRoots: ArticleSummary[];
    archivedRoots: ArticleSummary[];
    archivedOpen: boolean;
    setArchivedOpen: (update: (current: boolean) => boolean) => void;
    query: string;
    archivedContent: ReactNode;
    empty: boolean;
    renderRoots: (items: ArticleSummary[]) => ReactNode;
    archiveOnly?: boolean;
}) {
    const intl = useIntl();
    const archiveExpanded = archiveOnly || archivedOpen || Boolean(query);

    return <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-2 [scrollbar-color:var(--color-border-strong)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border-strong" aria-label={intl.formatMessage({ id: "navigation.articleLibraryNav" })}>
        {pinnedRoots.length > 0 && <>
            <p className="px-2 text-micro font-semibold uppercase tracking-overline text-muted">{intl.formatMessage({ id: "navigation.pinned" })}</p>
            <div className="mt-2 space-y-0.5">{renderRoots(pinnedRoots)}</div>
        </>}
        {recentRoots.length > 0 && <>
            <p className="mt-4 px-2 text-micro font-semibold uppercase tracking-overline text-muted first:mt-0">{intl.formatMessage({ id: "navigation.recent" })}</p>
            <div className="mt-2 space-y-0.5">{renderRoots(recentRoots)}</div>
        </>}
        {archivedRoots.length > 0 && <ArchivedArticleSection count={archivedRoots.length} expanded={archiveExpanded} archiveOnly={archiveOnly} toggle={() => setArchivedOpen((open) => !open)}>{archivedContent}</ArchivedArticleSection>}
        {query && empty && <p className="px-2 py-5 text-sm text-muted">{intl.formatMessage({ id: "navigation.noArticlesMatch" })}</p>}
        {archiveOnly && !query && archivedRoots.length === 0 && <p className="px-2 py-5 text-sm text-muted">{intl.formatMessage({ id: "navigation.noArchivedArticles" })}</p>}
    </nav>;
}
