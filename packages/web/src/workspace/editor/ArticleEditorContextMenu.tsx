import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useIntl } from "react-intl";
import {
    $getRoot, $getSelection, $setSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, PASTE_COMMAND,
    COMMAND_PRIORITY_LOW, REDO_COMMAND, UNDO_COMMAND, type BaseSelection, type LexicalEditor
} from "lexical";
import { EditorSkillContext } from "./editor-skill-context.js";
import { getSkillPresentation } from "../../i18n/skill-presentation.js";
import { ArticleEditorToolbar } from "./ArticleEditorToolbar.js";
import { getDesktopSpellingClient } from "../../application/desktop-client.js";
import { useNativeEditorMenu } from "./use-native-editor-menu.js";
import { readEditorClipboard } from "./read-editor-clipboard.js";


export function ArticleEditorContextMenu({ editor, openLink }: { editor: LexicalEditor; openLink: () => void }) {
    const intl = useIntl();
    const catalog = useContext(EditorSkillContext);
    const refresh = catalog?.refresh;
    const [position, setPosition] = useState<{ top: number; left: number }>();
    const [submenu, setSubmenu] = useState<"skills" | "formatting">();
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [clipboardError, setClipboardError] = useState(false);
    const selection = useRef<BaseSelection | null>(null);
    const menu = useRef<HTMLDivElement>(null);
    const previousSubmenu = useRef<typeof submenu>();
    const menuGeneration = useRef(0);
    const hasSelection = selection.current && !selection.current.isCollapsed();
    const restore = () => editor.update(() => $setSelection(selection.current?.clone() ?? null), {
        discrete: true, tag: "assistant-selection-restore",
    });

    const close = (focus = true) => {
        menuGeneration.current += 1;
        setPosition(undefined);
        setSubmenu(undefined);

        if (focus) {
            restore();
            editor.focus();
            window.requestAnimationFrame(() => editor.getRootElement()?.focus());
        }
    };

    useNativeEditorMenu(editor, intl, catalog?.skills ?? [], catalog?.prepare, restore);
    useEffect(() => {
        const undo = editor.registerCommand(CAN_UNDO_COMMAND, (value) => {
            setCanUndo(value);
            return false;
        }, COMMAND_PRIORITY_LOW);

        const redo = editor.registerCommand(CAN_REDO_COMMAND, (value) => {
            setCanRedo(value);
            return false;
        }, COMMAND_PRIORITY_LOW);

        return () => {
            undo();
            redo();
        };
    }, [editor]);

    useEffect(() => {
        const open = (event: MouseEvent | KeyboardEvent) => {
            if (event instanceof KeyboardEvent && event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10"))
                return;

            editor.read(() => {
                selection.current = $getSelection()?.clone() ?? null;
            });

            if (getDesktopSpellingClient()) {
                void refresh?.();
                return;
            }

            event.preventDefault();

            menuGeneration.current += 1;
            setClipboardError(false);

            const nativeSelection = window.getSelection();
            const rect = nativeSelection?.rangeCount ? nativeSelection.getRangeAt(0).getBoundingClientRect() : editor.getRootElement()?.getBoundingClientRect();

            setPosition({
                left: event instanceof MouseEvent ? event.clientX : rect?.left ?? 0,
                top: event instanceof MouseEvent ? event.clientY : rect?.bottom ?? 0
            });
            setSubmenu(undefined);
            void refresh?.();
        };

        const unregister = editor.registerRootListener((root, previous) => {
            previous?.removeEventListener("contextmenu", open);
            previous?.removeEventListener("keydown", open);
            root?.addEventListener("contextmenu", open);
            root?.addEventListener("keydown", open);
        });

        return () => {
            unregister();
            editor.getRootElement()?.removeEventListener("contextmenu", open);
            editor.getRootElement()?.removeEventListener("keydown", open);
        };
    }, [editor, refresh]);

    useEffect(() => {
        if (!position)
            return;

        const dismiss = (event: PointerEvent) => {
            if (event.target instanceof Node && !menu.current?.contains(event.target)) {
                setPosition(undefined);
                setSubmenu(undefined);
            }
        };
        document.addEventListener("pointerdown", dismiss);
        return () => document.removeEventListener("pointerdown", dismiss);
    }, [position]);

    useLayoutEffect(() => {
        if (!position || !menu.current)
            return;

        const element = menu.current;
        element.style.left = `${Math.max(0, Math.min(position.left, window.innerWidth - element.offsetWidth))}px`;
        element.style.top = `${Math.max(0, Math.min(position.top, window.innerHeight - element.offsetHeight))}px`;
        const trigger = previousSubmenu.current;
        const target = !submenu && trigger ? element.querySelector<HTMLElement>(`[data-editor-submenu="${trigger}"]`) : undefined;
        (target ?? element.querySelector<HTMLElement>("button:not(:disabled)"))?.focus();
        previousSubmenu.current = submenu;
    }, [position, submenu]);

    if (!position)
        return null;

    const action = (run: () => void) => {
        restore();
        editor.focus();
        run();
        close(false);
    };

    const itemClass = "min-h-9 w-full rounded-control px-2 text-left text-xs hover:bg-brand-soft " +
        "focus-visible:outline focus-visible:outline-brand disabled:opacity-50";
    const compatibleSkills = (catalog?.skills ?? []).filter((skill) => (skill.scopes ?? ["article", "selection"]).includes("selection"));
    const skills = [...compatibleSkills.filter((skill) => skill.reference.source === "built-in"),
        ...compatibleSkills.filter((skill) => skill.reference.source !== "built-in")
            .sort((a, b) => a.name.localeCompare(b.name, intl.locale) || a.reference.id.localeCompare(b.reference.id))];

    return createPortal(<div
        ref={menu}
        data-editor-context-menu
        role="menu"
        aria-label={intl.formatMessage({ id: submenu === "skills" ? "editor.skills" : "editor.contextMenu" })}
        style={position}
        className={("fixed z-50 max-h-screen w-64 max-w-full overflow-auto rounded-control " +
            "border border-border bg-surface-raised p-1 shadow-raised")}
        onClick={(event) => {
            if (submenu === "formatting" && event.target instanceof Element && event.target.closest("button[data-editor-command]"))
                close(false);
        }}
        onChange={() => {
            if (submenu === "formatting")
                close(false);
        }}
        onBlur={(event) => {
            if (event.relatedTarget && event.relatedTarget !== editor.getRootElement() && !event.currentTarget.contains(event.relatedTarget)) {
                close(false);
                return;
            }

            window.requestAnimationFrame(() => {
                if (document.activeElement === editor.getRootElement())
                    menu.current?.querySelector<HTMLElement>("button:not(:disabled)")?.focus();
            });
        }}
        onKeyDown={(event) => {
            if (event.key === "Tab")
                close(false);

            if (event.key === "ArrowRight" && document.activeElement instanceof HTMLButtonElement &&
                document.activeElement.hasAttribute("aria-haspopup")) {
                event.preventDefault();
                document.activeElement.click();
            }

            const items = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")];
            const index = items.indexOf(document.activeElement as HTMLButtonElement);
            if (event.key === "Escape" || event.key === "ArrowLeft") {
                event.preventDefault();
                if (submenu)
                    setSubmenu(undefined);
                else
                    close();
            }

            if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
                event.preventDefault();
                let next = index + (event.key === "ArrowDown" ? 1 : -1);
                if (event.key === "Home")
                    next = 0;

                if (event.key === "End")
                    next = items.length - 1;

                items[(next + items.length) % items.length]?.focus();
            }
        }}>
        {!submenu && <>
            <button
                role="menuitem"
                className={itemClass}
                disabled={!canUndo}
                onClick={() => action(() => editor.dispatchCommand(UNDO_COMMAND, undefined))}>
                {intl.formatMessage({ id: "keyBindings.undo" })}
            </button>
            <button
                role="menuitem"
                className={itemClass}
                disabled={!canRedo}
                onClick={() => action(() => editor.dispatchCommand(REDO_COMMAND, undefined))}>
                {intl.formatMessage({ id: "keyBindings.redo" })}
            </button>
            {(["cut", "copy"] as const).map((command) => (
                <button
                    key={command}
                    role="menuitem"
                    className={itemClass}
                    disabled={!hasSelection}
                    onClick={() => action(() => {
                        document.execCommand(command);
                    })}>
                    {intl.formatMessage({ id: command === "cut" ? "keyBindings.cut" : "keyBindings.copy" })}
                </button>
            ))}
            <button
                role="menuitem"
                className={itemClass}
                disabled={!navigator.clipboard?.readText}
                onClick={() => {
                    const generation = menuGeneration.current;
                    void readEditorClipboard().then((event) => {
                        if (generation === menuGeneration.current)
                            action(() => editor.dispatchCommand(PASTE_COMMAND, event));
                    })
                        .catch(() => setClipboardError(true));
                }}>{intl.formatMessage({ id: "keyBindings.paste" })}
            </button>
            {clipboardError && <p role="alert">{intl.formatMessage({ id: "editor.clipboardFailed" })}</p>}
            <button role="menuitem" className={itemClass} onClick={() => action(() => editor.update(() => {
                $getRoot().select(0, $getRoot().getChildrenSize());
            }))}>{intl.formatMessage({ id: "keyBindings.selectAll" })}
            </button>
            <button
                role="menuitem"
                aria-haspopup="menu"
                data-editor-submenu="formatting"
                className={itemClass}
                onClick={() => {
                    setSubmenu("formatting");
                }}>{intl.formatMessage({ id: "editor.formatting" })}
            </button>
            <button
                role="menuitem"
                aria-haspopup="menu"
                data-editor-submenu="skills"
                className={itemClass}
                disabled={!hasSelection}
                onClick={() => setSubmenu("skills")}>{intl.formatMessage({ id: "editor.skills" })}
            </button>
        </>}
        {submenu === "formatting" && (
            <ArticleEditorToolbar editor={editor} openLink={() => {
                close(false);
                restore();
                editor.focus();
                openLink();
            }} />
        )}
        {submenu === "skills" && skills.map((skill, index) => (
            <div key={skill.reference.id}>
                {index > 0 && skill.reference.source !== skills[index - 1]?.reference.source && <div role="separator" className="border-t border-border" />}
                <button
                    role="menuitem"
                    className={itemClass}
                    onClick={(event) => {
                        restore();
                        catalog?.prepare(skill, event.ctrlKey);
                        close(false);
                    }}>{getSkillPresentation(skill, intl).name}
                </button>
            </div>
        ))}
    </div>, document.body);
}
