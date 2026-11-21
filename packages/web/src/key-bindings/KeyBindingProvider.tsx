import { useEffect, useMemo } from "react";
import { areKeyBindingsEqual, KEY_BINDING_COMMAND, resolveKeyBindings, type KeyBindingOverrides } from "@skladno/shared";
import { getEventKeyBinding, KeyBindingDispatcher } from "./dispatcher.js";


const reservedDesktopKeys = new Set(["a", "c", "m", "q", "s", "u", "v", "w", "x", "y", "z", "+", "=", "-", "0"]);
const clipboardKeys = new Set(["c", "v", "x"]);


export function isReservedDesktopShortcut(event: Pick<KeyboardEvent, "key" | "ctrlKey" | "metaKey" | "altKey">): boolean {
    const key = event.key.toLowerCase();
    if (key === "f11")
        return !event.ctrlKey && !event.metaKey && !event.altKey;

    return !event.altKey && (event.ctrlKey || event.metaKey) && reservedDesktopKeys.has(key);
}


function isClipboardShortcut(event: KeyboardEvent): boolean {
    return !event.altKey && (event.ctrlKey || event.metaKey) && clipboardKeys.has(event.key.toLowerCase());
}


export function useKeyBindingDispatcher(overrides: KeyBindingOverrides | undefined, reserveDesktopShortcuts = false): KeyBindingDispatcher {
    const dispatcher = useMemo(() => new KeyBindingDispatcher(), []);

    useEffect(() => {
        dispatcher.setOverrides(overrides ?? {});
    }, [dispatcher, overrides]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent, capture = false) => {
            const binding = getEventKeyBinding(event);
            const notesBinding = resolveKeyBindings(overrides)[KEY_BINDING_COMMAND.EDITOR_NOTES];
            const isNotes = Boolean(binding && notesBinding && areKeyBindingsEqual(binding, notesBinding));
            if (capture !== isNotes)
                return;

            if (event.defaultPrevented && !isClipboardShortcut(event))
                return;

            const target = event.target;
            const scope = target instanceof HTMLElement && target.closest('[data-workspace-panel="editorial-assistant"]') ? "assistant" : "application";
            if (dispatcher.dispatch(event, scope))
                event.stopPropagation();
            else if (reserveDesktopShortcuts && isReservedDesktopShortcut(event))
                event.preventDefault();
        };

        const captureKeyDown = (event: KeyboardEvent) => onKeyDown(event, true);
        const bubbleKeyDown = (event: KeyboardEvent) => onKeyDown(event);
        window.addEventListener("keydown", captureKeyDown, true);
        window.addEventListener("keydown", bubbleKeyDown);

        return () => {
            window.removeEventListener("keydown", captureKeyDown, true);
            window.removeEventListener("keydown", bubbleKeyDown);
        };
    }, [dispatcher, overrides, reserveDesktopShortcuts]);

    return dispatcher;
}
