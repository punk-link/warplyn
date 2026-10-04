import { useEffect, useMemo, useRef, useState } from "react";
import { type ArticleSummary, type KeyBindingOverrides } from "@skladno/shared";
import { Button, Dialog } from "../../ui/primitives.js";
import { useIntl } from "react-intl";
import type { KeyBindingDispatcher } from "../../key-bindings/dispatcher.js";
import type { Notifications } from "../../notifications/notifications.js";
import { ArticleLibraryFrame } from "./ArticleLibraryFrame.js";
import { ArticleLibraryNavigation } from "./ArticleLibraryNavigation.js";
import { ArticleLibraryRowLabel } from "./ArticleLibraryRowLabel.js";
import { ArticleLibraryRowMenu } from "./ArticleLibraryRowMenu.js";
import type { ArticleFilesState } from "../state/article-files-state.js";


function groupArticleChildren(articles: readonly ArticleSummary[]): Map<string, ArticleSummary[]> {
    const children = new Map<string, ArticleSummary[]>();
    for (const article of articles) {
        if (!article.sourceArticleId)
            continue;

        const siblings = children.get(article.sourceArticleId) ?? [];
        siblings.push(article);
        children.set(article.sourceArticleId, siblings);
    }

    return children;
}


interface ArticleLibraryData {
    articles: ArticleSummary[];
    selectedArticleId: string | undefined;
    collapsed: boolean;
    language: string | undefined;
}


interface ArticleLibraryActions {
    selectArticle: (articleId: string) => void;
    setCollapsed: (value: boolean) => void;
    createBlank: () => Promise<unknown>;
    openStyleProfile: () => void;
    openSettings: () => void;
    dispatcher?: KeyBindingDispatcher;
    shortcutOverrides?: KeyBindingOverrides;
}


interface ArticleLibraryMutations {
    remove?: (articleId: string) => Promise<void>;
    setArchived?: (articleId: string, archived: boolean) => Promise<void>;
    setPinned?: (articleId: string, pinned: boolean) => Promise<void>;
    reorderPinned?: (articleIds: string[]) => Promise<void>;
    notifyError?: Notifications["notifyError"];
}


function handlePinnedArticleDrop(event: React.DragEvent<HTMLDivElement>, article: ArticleSummary, draggedArticleId: string | undefined, pinnedRoots: ArticleSummary[], reorderPinned: ArticleLibraryMutations["reorderPinned"], run: (action: () => Promise<void>) => void) {
    event.preventDefault();
    if (!draggedArticleId || draggedArticleId === article.id || !reorderPinned)
        return;

    const dragged = pinnedRoots.find((item) => item.id === draggedArticleId);
    if (!dragged)
        return;

    const next = pinnedRoots.filter((item) => item.id !== draggedArticleId);
    next.splice(next.findIndex((item) => item.id === article.id), 0, dragged);
    run(() => reorderPinned(next.map((item) => item.id)));
}


export function ArticleLibraryPanel({ data, navigation, mutations, files, responsiveCollapsed }: { data: ArticleLibraryData; navigation: ArticleLibraryActions; mutations: ArticleLibraryMutations; files?: Pick<ArticleFilesState, "pending" | "saveArticle" | "loadArticle">; responsiveCollapsed?: boolean }) {
    const { articles, selectedArticleId, language } = data;
    const collapsed = responsiveCollapsed ?? data.collapsed;
    const { selectArticle } = navigation;
    const { remove, setArchived, setPinned, reorderPinned, notifyError } = mutations;
    const intl = useIntl();
    const reportError = notifyError ?? (() => undefined);
    const [query, setQuery] = useState("");
    const [archivedOpen, setArchivedOpen] = useState(false);
    const [menuArticleId, setMenuArticleId] = useState<string>();
    const [deleteTarget, setDeleteTarget] = useState<ArticleSummary>();
    const [draggedArticleId, setDraggedArticleId] = useState<string>();
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
    const childrenByArticle = useMemo(() => groupArticleChildren(articles), [articles]);
    useEffect(() => {
        if (!menuArticleId)
            return;

        menuRef.current?.querySelector<HTMLButtonElement>("[role=menuitem]:not(:disabled)")?.focus();
        const dismiss = (event: MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) {
                setMenuArticleId(undefined);
                requestAnimationFrame(() => triggerRefs.current.get(menuArticleId)?.focus());
            }
        };

        window.addEventListener("mousedown", dismiss);
        return () => window.removeEventListener("mousedown", dismiss);
    }, [menuArticleId]);
    const normalizedQuery = query.toLowerCase();
    const isArticleMatch = (article: ArticleSummary) => article.title.toLowerCase().includes(normalizedQuery);
    const articleIds = new Set(articles.map((article) => article.id));
    const roots = articles.filter((article) => !article.sourceArticleId || !articleIds.has(article.sourceArticleId));
    const getChildArticles = (id: string) => childrenByArticle.get(id) ?? [];
    const selected = articles.find((article) => article.id === selectedArticleId);
    const expandedRootId = selected?.sourceArticleId ?? selected?.id;
    const activeRoots = roots.filter((article) => !article.archived);
    const pinnedRoots = activeRoots.filter((article) => article.pinOrder !== undefined).sort((a, b) => a.pinOrder! - b.pinOrder! || a.id.localeCompare(b.id));
    const recentRoots = activeRoots.filter((article) => article.pinOrder === undefined);
    const archivedRoots = roots.filter((article) => article.archived);


    function closeMenu() {
        const id = menuArticleId;
        setMenuArticleId(undefined);
        if (id)
            requestAnimationFrame(() => triggerRefs.current.get(id)?.focus());
    }


    function run(action: () => Promise<void>) {
        void action().catch((error) => reportError(error, { fallbackMessage: intl.formatMessage({ id: "workspace.updateArticleFailed" }) }));
        closeMenu();
    }


    function runFile(action: () => Promise<unknown>, importing = false) {
        const id = menuArticleId;
        setMenuArticleId(undefined);
        void action().then((loaded) => {
            if (id && (!importing || !loaded))
                triggerRefs.current.get(id)?.focus();
        });
    }


    function movePinned(article: ArticleSummary, direction: -1 | 1) {
        const index = pinnedRoots.findIndex((item) => item.id === article.id);
        const nextIndex = index + direction;
        if (index < 0 || nextIndex < 0 || nextIndex >= pinnedRoots.length || !reorderPinned)
            return;

        const next = [...pinnedRoots];
        [next[index], next[nextIndex]] = [next[nextIndex]!, next[index]!];
        run(() => reorderPinned(next.map((item) => item.id)));
    }


    function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        const items = [...(menuRef.current?.querySelectorAll<HTMLButtonElement>("[role=menuitem]:not(:disabled)") ?? [])];
        const index = items.indexOf(document.activeElement as HTMLButtonElement);
        if (event.key === "Escape") {
            event.preventDefault();
            closeMenu();
        }

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            items[(index + (event.key === "ArrowDown" ? 1 : items.length - 1)) % items.length]?.focus();
        }
    }


    const renderArticleRow = ({ article, child = false, childCount = 0, expanded = false, hidden = false, close }: { article: ArticleSummary; child?: boolean; childCount?: number; expanded?: boolean; hidden?: boolean; close: () => void }) => {
        const selectedRow = article.id === selectedArticleId;
        let tone = child ? "text-muted hover:bg-surface-raised" : "text-ink/85 hover:bg-surface-raised";
        if (selectedRow)
            tone = "bg-brand-soft text-ink";

        const canReorder = !child && article.pinOrder !== undefined && !article.archived;
        return <div key={article.id} draggable={canReorder} onDragStart={() => setDraggedArticleId(article.id)} onDragOver={(event) => canReorder && event.preventDefault()} onDrop={(event) => handlePinnedArticleDrop(event, article, draggedArticleId, pinnedRoots, reorderPinned, run)}>
            <button data-library-article data-focus-area-entry={selectedRow || undefined} ref={(element) => {
                if (element)
                    triggerRefs.current.set(article.id, element);
            }} type="button" onClick={() => {
                selectArticle(article.id);
                close();
            }} onContextMenu={(event) => {
                event.preventDefault();
                setMenuArticleId(article.id);
            }} onKeyDown={(event) => {
                if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) {
                    event.preventDefault();
                    setMenuArticleId(article.id);
                }
            }} className={`${child ? "ml-4 w-[calc(100%-1rem)] border-l border-border py-1" : "w-full py-1.5"} rounded-panel px-2 text-left transition-colors ${tone}`} aria-current={selectedRow ? "page" : undefined} aria-expanded={childCount > 0 ? expanded : undefined} tabIndex={hidden ? -1 : undefined}>
                <ArticleLibraryRowLabel article={article} child={child} childCount={childCount} expanded={expanded} />
            </button>
            {menuArticleId === article.id && <ArticleLibraryRowMenu article={article} anchor={triggerRefs.current.get(article.id)} canReorder={canReorder} pinnedRoots={pinnedRoots} menuRef={menuRef} handleMenuKeyDown={handleMenuKeyDown} movePinned={movePinned} run={run} setDeleteTarget={setDeleteTarget} closeMenu={closeMenu} setPinned={setPinned} setArchived={setArchived} files={files} runFile={runFile} />}
        </div>;
    };

    const renderRoots = (items: ArticleSummary[], close: () => void) => items.filter((article) => !query || isArticleMatch(article) || getChildArticles(article.id).some(isArticleMatch)).map((article) => {
        const nested = getChildArticles(article.id).filter((child) => !query || isArticleMatch(article) || isArticleMatch(child));
        const expanded = Boolean(query) || article.id === expandedRootId;
        return <div key={article.id}>{renderArticleRow({ article, childCount: nested.length, expanded, close })}{nested.length > 0 && <div className={`grid transition-[grid-template-rows,opacity] duration-150 motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`} aria-hidden={!expanded}><div className="min-h-0 space-y-0.5 overflow-hidden">{nested.map((child) => renderArticleRow({ article: child, child: true, hidden: !expanded, close }))}</div></div>}</div>;
    });

    const groupCount = deleteTarget && !deleteTarget.sourceArticleId ? getChildArticles(deleteTarget.id).length + 1 : 1;


    return <>
        <ArticleLibraryFrame data={{ collapsed, language, pinnedArticles: pinnedRoots, selectedArticleId }} navigation={navigation} search={{ query, setQuery }} overlay={{ menuRef, modalOpen: Boolean(deleteTarget), dismissMenu: () => setMenuArticleId(undefined) }}>
            {(view, close) => {
                const archiveOnly = view === "archive";
                const visiblePinned = archiveOnly ? [] : pinnedRoots;
                const visibleRecent = archiveOnly ? [] : recentRoots;
                const visibleArchived = view === "articles" && !query ? [] : archivedRoots;
                const archivedContent = renderRoots(visibleArchived, close);
                const empty = [...visiblePinned, ...visibleRecent, ...visibleArchived].every((article) => !isArticleMatch(article) && !getChildArticles(article.id).some(isArticleMatch));
                return <ArticleLibraryNavigation pinnedRoots={visiblePinned} recentRoots={visibleRecent} archivedRoots={visibleArchived} archivedOpen={archivedOpen || archivedRoots.some((article) => article.id === expandedRootId)} setArchivedOpen={setArchivedOpen} query={query} archivedContent={archivedContent} empty={empty} renderRoots={(items) => renderRoots(items, close)} archiveOnly={archiveOnly} />;
            }}
        </ArticleLibraryFrame>
        {deleteTarget && <Dialog className="w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl" open aria-labelledby="delete-library-article-title" onCancel={(event) => {
            event.preventDefault();
            setDeleteTarget(undefined);
        }}>
            <h2 id="delete-library-article-title" className="text-lg font-semibold">{intl.formatMessage({ id: "articleHeader.deleteConfirmationTitle" })}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{intl.formatMessage({ id: "articleHeader.deleteGroupConfirmationDescription" }, { articleTitle: deleteTarget.title, count: groupCount })}</p>
            <div className="mt-5 flex justify-end gap-2">
                <Button variant="secondary" autoFocus onClick={() => setDeleteTarget(undefined)}>{intl.formatMessage({ id: "editor.cancel" })}</Button>
                <Button variant="danger"
                    onClick={() => run(async () => {
                        await (remove?.(deleteTarget.id) ?? Promise.resolve());
                        setDeleteTarget(undefined);
                    })}
                >
                    {intl.formatMessage({ id: "articleHeader.confirmDeleteArticle" })}
                </Button>
            </div>
        </Dialog>}
    </>;
}
