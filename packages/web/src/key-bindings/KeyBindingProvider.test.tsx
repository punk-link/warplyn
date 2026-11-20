import { renderHook } from "@testing-library/react";
import { KEY_BINDING_COMMAND } from "@skladno/shared";
import { expect, it, vi } from "vitest";
import { useKeyBindingDispatcher } from "./KeyBindingProvider.js";

it("handles modified letters before editable controls consume their input", () => {
    const { result, unmount } = renderHook(() => useKeyBindingDispatcher(undefined));
    const open = vi.fn();
    result.current.register(KEY_BINDING_COMMAND.EDITOR_NOTES, open);
    const input = document.createElement("textarea");
    document.body.append(input);
    const editor = vi.fn((event: KeyboardEvent) => {
        expect(event.defaultPrevented).toBe(true);
    });
    input.addEventListener("keydown", editor);
    input.dispatchEvent(new KeyboardEvent("keydown", {
        key: "ñ", code: "KeyN", ctrlKey: true, altKey: true, bubbles: true, cancelable: true,
    }));
    expect(open).toHaveBeenCalledOnce();
    expect(editor).toHaveBeenCalledOnce();
    input.remove();
    unmount();
});
