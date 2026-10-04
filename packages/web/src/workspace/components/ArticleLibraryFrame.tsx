import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { KEY_BINDING_COMMAND, type ArticleSummary, type KeyBindingOverrides } from "@skladno/shared";
import { useIntl } from "react-intl";
import type { KeyBindingDispatcher } from "../../key-bindings/dispatcher.js";
import { getShortcutHint } from "../../key-bindings/shortcut-hint.js";
import { ArchiveIcon, ArticleIcon, CloseIcon, SearchIcon, SettingsIcon, UserIcon } from "../../ui/icons.js";
import { Button, Drawer, Field, IconButton } from "../../ui/primitives.js";
import { WarplynIcon } from "../../ui/WarplynIcon.js";
import { UpdateController } from "./UpdateController.js";


function getLanguageCode(language: string | undefined): string {
    const codes: Record<string, string> = { English: "EN", Spanish: "ES", Portuguese: "PT" };
    return language ? codes[language] ?? language.slice(0, 2).toUpperCase() : "EN";
}


type LibraryView = "articles" | "search" | "archive";


function moveLibraryFocus(event: KeyboardEvent<HTMLElement>, scope: HTMLElement) {
    if (!(document.activeElement instanceof HTMLButtonElement))
        return;

    const controls = [...scope.querySelectorAll<HTMLButtonElement>("button:not([role^=menuitem]):not(:disabled)")].filter((button) => !button.closest("[inert], [aria-hidden=true]"));
    const index = controls.indexOf(document.activeElement);
    if (index < 0)
        return;

    event.preventDefault();
    controls[(index + (event.key === "ArrowDown" ? 1 : controls.length - 1)) % controls.length]?.focus();
}


function enterLibraryResults(event: KeyboardEvent<HTMLElement>, drawer: HTMLElement | null) {
    const first = drawer?.querySelector<HTMLButtonElement>("[data-library-article]");
    if (!first)
        return;

    event.preventDefault();
    first.focus();
}


function PinnedArticleShortcuts({ articles, selectedArticleId, drawerOpen, onSelect }: {
    articles: readonly ArticleSummary[];
    selectedArticleId: string | undefined;
    drawerOpen: boolean;
    onSelect: (articleId: string, trigger: HTMLButtonElement) => void;
}) {
    const intl = useIntl();
    if (articles.length === 0)
        return null;

    return <div role="group" aria-label={intl.formatMessage({ id: "navigation.pinned" })} className="mt-2 flex min-h-0 flex-1 flex-col items-center gap-1 overflow-y-auto border-t border-border pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {articles.map((article) => {
            const initials = Array.from(article.title.trim().toLocaleUpperCase(intl.locale)).slice(0, 2).join("");
            const selected = article.id === selectedArticleId;
            return <IconButton key={article.id} variant="quiet" className="shrink-0 text-xs font-medium aria-current:border-brand" label={intl.formatMessage({ id: "navigation.openPinnedArticle" }, { articleTitle: article.title })} title={article.title} data-focus-area-entry={selected && !drawerOpen || undefined} aria-current={selected ? "page" : undefined} aria-pressed={selected} onClick={(event) => onSelect(article.id, event.currentTarget)}>{initials || <ArticleIcon className="size-4" />}</IconButton>;
        })}
    </div>;
}


export function ArticleLibraryFrame({ data, navigation, search, overlay, children }: {
    data: { collapsed: boolean; language: string | undefined; pinnedArticles: readonly ArticleSummary[]; selectedArticleId: string | undefined };
    navigation: {
        selectArticle: (articleId: string) => void;
        setCollapsed: (value: boolean) => void;
        createBlank: () => Promise<unknown>;
        openStyleProfile: () => void;
        openSettings: () => void;
        dispatcher?: KeyBindingDispatcher;
        shortcutOverrides?: KeyBindingOverrides;
    };
    search: { query: string; setQuery: (value: string) => void };
    overlay: { menuRef: RefObject<HTMLDivElement>; modalOpen: boolean; dismissMenu: () => void };
    children: (view: LibraryView | undefined, close: () => void) => ReactNode;
}) {
    const { collapsed, language, pinnedArticles, selectedArticleId } = data;
    const { selectArticle, setCollapsed, createBlank, openStyleProfile, openSettings, dispatcher, shortcutOverrides } = navigation;
    const { menuRef, modalOpen, dismissMenu } = overlay;
    const intl = useIntl();
    const [view, setView] = useState<LibraryView>();
    const frameRef = useRef<HTMLElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLButtonElement>();
    const drawerId = useId();
    const headingId = useId();
    const activeView = collapsed ? view : undefined;
    const close = useCallback(() => {
        setView(undefined);
        dismissMenu();
        triggerRef.current?.focus();
    }, [dismissMenu]);
    useEffect(() => {
        if (!collapsed)
            setView(undefined);
    }, [collapsed]);
    useEffect(() => dispatcher?.register(KEY_BINDING_COMMAND.SEARCH_ARTICLES, () => {
        if (collapsed) {
            triggerRef.current = frameRef.current?.querySelector<HTMLButtonElement>("[data-library-view=search]") ?? undefined;
            setView("search");
        }

        searchRef.current?.focus();
    }), [collapsed, dispatcher]);
    useEffect(() => {
        if (!activeView)
            return;

        if (activeView === "search") {
            searchRef.current?.focus();
        } else {
            const selected = drawerRef.current?.querySelector<HTMLButtonElement>("[aria-current=page]");
            const first = drawerRef.current?.querySelector<HTMLButtonElement>("[data-library-article]") ?? drawerRef.current?.querySelector<HTMLButtonElement>("header button");
            (selected ?? first)?.focus();
        }
    }, [activeView]);
    useEffect(() => {
        if (!activeView || modalOpen)
            return;


        function dismiss(event: PointerEvent) {
            if (!(event.target instanceof Node) || frameRef.current?.contains(event.target) || menuRef.current?.contains(event.target))
                return;

            close();
        }


        function leave(event: FocusEvent) {
            if (event.target instanceof Element && event.target.closest("dialog[open]"))
                return;

            if (event.target instanceof Node && !frameRef.current?.contains(event.target) && !menuRef.current?.contains(event.target)) {
                setView(undefined);
                dismissMenu();
            }
        }


        document.addEventListener("pointerdown", dismiss);
        document.addEventListener("focusin", leave);

        return () => {
            document.removeEventListener("pointerdown", dismiss);
            document.removeEventListener("focusin", leave);
        };
    }, [activeView, close, menuRef, modalOpen, dismissMenu]);


    function openView(next: LibraryView, trigger: HTMLButtonElement) {
        triggerRef.current = trigger;
        if (view === next) {
            close();
            return;
        }

        search.setQuery("");
        setView(next);
    }


    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
        if (event.defaultPrevented)
            return;

        if (event.key === "Escape" && activeView && !modalOpen) {
            event.preventDefault();
            close();
            return;
        }

        if (event.key === "Enter" && activeView && event.target instanceof HTMLInputElement) {
            enterLibraryResults(event, drawerRef.current);
            return;
        }

        if (!["ArrowUp", "ArrowDown"].includes(event.key) || event.target instanceof HTMLInputElement)
            return;

        let scope: HTMLElement = event.currentTarget;
        if (drawerRef.current?.contains(document.activeElement))
            scope = drawerRef.current;

        moveLibraryFocus(event, scope);
    }


    function railButton(next: LibraryView, label: string, icon: ReactNode) {
        const title = next === "search" ? getShortcutHint(label, KEY_BINDING_COMMAND.SEARCH_ARTICLES, shortcutOverrides) : label;
        return <IconButton variant="quiet" label={label} title={title} data-library-view={next} aria-controls={activeView ? drawerId : undefined} aria-expanded={activeView === next} aria-pressed={activeView === next} onClick={(event) => openView(next, event.currentTarget)}>{icon}</IconButton>;
    }


    const searchField = <div className="pl-3 pr-2 pt-3 pb-2">
        <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <Field ref={searchRef} className="min-h-9 py-1.5 pl-8 pr-2" aria-label={intl.formatMessage({ id: "navigation.searchArticles" })} title={getShortcutHint(intl.formatMessage({ id: "navigation.searchArticles" }), KEY_BINDING_COMMAND.SEARCH_ARTICLES, shortcutOverrides)} value={search.query} onChange={(event) => search.setQuery(event.target.value)} placeholder={intl.formatMessage({ id: "navigation.searchArticles" })} />
        </div>
    </div>;
    const newArticle = <IconButton label={intl.formatMessage({ id: "navigation.newArticle" })} title={getShortcutHint(intl.formatMessage({ id: "navigation.newArticle" }), KEY_BINDING_COMMAND.NEW_ARTICLE, shortcutOverrides)} onClick={() => {
        close();
        void createBlank();
    }}>+</IconButton>;
    const headings = { articles: "navigation.articles", search: "navigation.searchArticles", archive: "navigation.archive" } as const;
    const heading = intl.formatMessage({ id: activeView ? headings[activeView] : "navigation.articles" });

    return <aside ref={frameRef} data-workspace-panel="article-library" data-focus-area="library" onKeyDown={handleKeyDown} className={`relative flex h-full w-full flex-col border-r border-border bg-surface-supporting ${collapsed ? "px-0.5 pb-2" : ""}`} aria-label={intl.formatMessage({ id: "navigation.articleLibrary" })}>
        <header className={collapsed ? "flex min-h-18 shrink-0 items-center justify-center border-b border-transparent" : "flex min-h-18 shrink-0 items-center justify-between border-b border-border pl-4 pr-2"}>
            {collapsed
                ? <IconButton className="text-base font-semibold text-brand" label={intl.formatMessage({ id: "navigation.expandArticleLibrary" })} onClick={() => {
                    close();
                    setCollapsed(false);
                }}><WarplynIcon /></IconButton>
                : <><span className="flex items-center gap-2 text-base font-semibold text-brand"><WarplynIcon />Warplyn</span>
                    <div className="flex items-center gap-1">{newArticle}<IconButton label={intl.formatMessage({ id: "navigation.collapseArticleLibrary" })} title={getShortcutHint(intl.formatMessage({ id: "navigation.collapseArticleLibrary" }), KEY_BINDING_COMMAND.TOGGLE_ARTICLE_LIBRARY, shortcutOverrides)} onClick={() => setCollapsed(true)}>‹</IconButton></div></>}
        </header>
        {collapsed
            ? <div className="flex shrink-0 flex-col items-center gap-1">
                {newArticle}
                {railButton("search", intl.formatMessage({ id: "navigation.searchArticles" }), <SearchIcon className="size-4" />)}
                {railButton("articles", intl.formatMessage({ id: "navigation.articles" }), <ArticleIcon className="size-4" />)}
                {railButton("archive", intl.formatMessage({ id: "navigation.archive" }), <ArchiveIcon className="size-4" />)}
            </div>
            : <>{searchField}{children(undefined, close)}</>}
        {collapsed && <PinnedArticleShortcuts articles={pinnedArticles} selectedArticleId={selectedArticleId} drawerOpen={Boolean(activeView)} onSelect={(articleId, trigger) => {
            triggerRef.current = trigger;
            close();
            selectArticle(articleId);
        }} />}
        <footer className={collapsed ? "mt-auto flex shrink-0 flex-col items-center gap-1 border-t border-border px-0.5 py-2" : "shrink-0 border-t border-border px-2 py-2"}>
            {collapsed
                ? <><IconButton label={intl.formatMessage({ id: "navigation.styleProfile" })} onClick={() => {
                    close();
                    openStyleProfile();
                }}><UserIcon className="size-4" /></IconButton>
                    <IconButton label={intl.formatMessage({ id: "navigation.settings" })} title={getShortcutHint(intl.formatMessage({ id: "navigation.settings" }), KEY_BINDING_COMMAND.OPEN_SETTINGS, shortcutOverrides)} onClick={() => {
                        close();
                        openSettings();
                    }}><SettingsIcon className="size-4" /></IconButton>
                    <UpdateController /></>
                : <><Button compact className="flex w-full items-center justify-start !py-1.5 text-left" variant="quiet" onClick={openStyleProfile}><UserIcon className="size-4 shrink-0" /><span className="ml-2">{intl.formatMessage({ id: "navigation.styleProfile" })}</span></Button>
                    <Button compact className="flex w-full items-center justify-start !py-1.5 text-left" variant="quiet" title={getShortcutHint(intl.formatMessage({ id: "navigation.settings" }), KEY_BINDING_COMMAND.OPEN_SETTINGS, shortcutOverrides)} onClick={openSettings}><SettingsIcon className="size-4 shrink-0" /><span className="ml-2">{intl.formatMessage({ id: "navigation.settings" })}</span></Button>
                    <div className="relative flex items-center justify-between px-2 pb-1 pt-2 pr-11 text-micro font-medium text-muted"><span>{getLanguageCode(language)} · {intl.formatMessage({ id: "navigation.local" })}</span><UpdateController className="absolute right-2 top-1/2 -translate-y-1/2" /></div></>}
        </footer>
        {activeView && <Drawer className="absolute inset-y-0 left-full z-10 flex w-52 max-w-[calc(100vw-2.5rem)] flex-col !border-l-0 !bg-surface-supporting" aria-labelledby={headingId}>
            <div ref={drawerRef} className="flex min-h-0 flex-1 flex-col">
                <header className="flex min-h-18 items-center justify-between border-b border-border pl-4 pr-2"><h2 id={headingId} className="text-sm font-semibold">{heading}</h2><IconButton label={intl.formatMessage({ id: "navigation.closeArticleLibrary" })} onClick={close}><CloseIcon className="size-4" /></IconButton></header>
                <div id={drawerId} className="flex min-h-0 flex-1 flex-col">{searchField}{children(activeView, close)}</div>
            </div>
        </Drawer>}
    </aside>;
}
