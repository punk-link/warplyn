import { useLayoutEffect, useState, type KeyboardEvent, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { ArticleSummary } from "@skladno/shared";
import { useIntl } from "react-intl";
import { ArchiveIcon, ArrowLeftIcon, DeleteIcon, LoadFileIcon, PinIcon, SaveFileIcon } from "../../ui/icons.js";
import type { ArticleFilesState } from "../state/article-files-state.js";


export function ArticleLibraryRowMenu({ article, anchor, canReorder, pinnedRoots, menuRef, handleMenuKeyDown, movePinned, run, setDeleteTarget, closeMenu, setPinned, setArchived, files, runFile }: {
    article: ArticleSummary;
    anchor: HTMLButtonElement | undefined;
    canReorder: boolean;
    pinnedRoots: ArticleSummary[];
    menuRef: RefObject<HTMLDivElement>;
    handleMenuKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
    movePinned: (article: ArticleSummary, direction: -1 | 1) => void;
    run: (action: () => Promise<void>) => void;
    setDeleteTarget: (article: ArticleSummary) => void;
    closeMenu: () => void;
    setPinned?: (articleId: string, pinned: boolean) => Promise<void>;
    setArchived?: (articleId: string, archived: boolean) => Promise<void>;
    files?: Pick<ArticleFilesState, "pending" | "saveArticle" | "loadArticle">;
    runFile: (action: () => Promise<unknown>, importing?: boolean) => void;
}) {
    const intl = useIntl();
    const [position, setPosition] = useState({ top: 0, left: 0 });
    useLayoutEffect(() => {
        if (!anchor || !menuRef.current)
            return;

        const rect = anchor.getBoundingClientRect();
        setPosition({
            top: Math.max(0, Math.min(rect.bottom, window.innerHeight - menuRef.current.offsetHeight)),
            left: Math.max(0, Math.min(rect.left, window.innerWidth - menuRef.current.offsetWidth)),
        });
    }, [anchor, menuRef]);

    return createPortal(<div ref={menuRef} style={position} className="fixed z-20 max-h-screen w-44 overflow-y-auto rounded-control border border-border bg-surface-raised p-1 shadow-raised" role="menu" aria-label={article.title.trim() || intl.formatMessage({ id: "article.defaultTitle" })} onKeyDown={handleMenuKeyDown}>
        {files && <>
            <button className="flex min-h-7 w-full py-1 pointer-coarse:min-h-9 items-center gap-2 rounded-control px-2 text-left text-xs hover:bg-brand-soft focus-visible:bg-brand-soft focus-visible:outline focus-visible:outline-brand disabled:opacity-50" type="button" role="menuitem" disabled={files.pending} onClick={() => runFile(() => files.saveArticle(article))}><SaveFileIcon className="size-3 shrink-0" />{intl.formatMessage({ id: "articleFiles.menuSave" })}</button>
            <button className="flex min-h-7 w-full py-1 pointer-coarse:min-h-9 items-center gap-2 rounded-control px-2 text-left text-xs hover:bg-brand-soft focus-visible:bg-brand-soft focus-visible:outline focus-visible:outline-brand disabled:opacity-50" type="button" role="menuitem" disabled={files.pending} onClick={() => runFile(files.loadArticle, true)}><LoadFileIcon className="size-3 shrink-0" />{intl.formatMessage({ id: "articleFiles.menuLoad" })}</button>
            <div role="separator" className="my-0.5 border-t border-border" />
        </>}
        {!article.sourceArticleId && !article.archived && <button className="flex min-h-7 w-full py-1 pointer-coarse:min-h-9 items-center gap-2 rounded-control px-2 text-left text-xs hover:bg-brand-soft focus:outline-none" type="button" role="menuitem" onClick={() => run(() => setPinned?.(article.id, article.pinOrder === undefined) ?? Promise.resolve())}><PinIcon className="size-3 shrink-0" />{intl.formatMessage({ id: article.pinOrder === undefined ? "navigation.pin" : "navigation.unpin" })}</button>}
        {!article.sourceArticleId && <button className="flex min-h-7 w-full py-1 pointer-coarse:min-h-9 items-center gap-2 rounded-control px-2 text-left text-xs hover:bg-brand-soft focus:outline-none" type="button" role="menuitem" onClick={() => run(() => setArchived?.(article.id, !article.archived) ?? Promise.resolve())}><ArchiveIcon className="size-3 shrink-0" />{intl.formatMessage({ id: article.archived ? "navigation.unarchive" : "navigation.archive" })}</button>}
        {canReorder && <>
            <button className="flex min-h-7 w-full py-1 pointer-coarse:min-h-9 items-center gap-2 rounded-control px-2 text-left text-xs hover:bg-brand-soft focus:outline-none disabled:opacity-50" type="button" role="menuitem" disabled={pinnedRoots[0]?.id === article.id} onClick={() => movePinned(article, -1)}><ArrowLeftIcon className="size-3 shrink-0 rotate-90" />{intl.formatMessage({ id: "navigation.movePinnedUp" })}</button>
            <button className="flex min-h-7 w-full py-1 pointer-coarse:min-h-9 items-center gap-2 rounded-control px-2 text-left text-xs hover:bg-brand-soft focus:outline-none disabled:opacity-50" type="button" role="menuitem" disabled={pinnedRoots.at(-1)?.id === article.id} onClick={() => movePinned(article, 1)}><ArrowLeftIcon className="size-3 shrink-0 -rotate-90" />{intl.formatMessage({ id: "navigation.movePinnedDown" })}</button>
        </>}
        <button className="flex min-h-7 w-full py-1 pointer-coarse:min-h-9 items-center gap-2 rounded-control px-2 text-left text-xs text-danger hover:bg-danger-soft focus:outline-none" type="button" role="menuitem" onClick={() => {
            setDeleteTarget(article);
            closeMenu();
        }}>
            <DeleteIcon className="size-3 shrink-0" />{intl.formatMessage({ id: "navigation.delete" })}
        </button>
    </div>, document.body);
}
