import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useViewPreference } from "./useViewPreference.js";

describe("view preferences", () => {
    beforeEach(() => localStorage.clear());
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("remembers each screen's choices after remounting", () => {
        const proposal = renderHook(() => useViewPreference("proposal.layout", "side-by-side", ["side-by-side", "stacked"]));
        const translation = renderHook(() => useViewPreference("translations.layout", "side-by-side", ["side-by-side", "aligned"]));
        const highlight = renderHook(() => useViewPreference("proposal.highlight-changes", false, [false, true]));
        act(() => {
            proposal.result.current[1]("stacked");
            translation.result.current[1]("aligned");
            highlight.result.current[1](true);
        });
        cleanup();

        expect(renderHook(() => useViewPreference("proposal.layout", "side-by-side", ["side-by-side", "stacked"])).result.current[0]).toBe("stacked");
        expect(renderHook(() => useViewPreference("translations.layout", "side-by-side", ["side-by-side", "aligned"])).result.current[0]).toBe("aligned");
        expect(renderHook(() => useViewPreference("proposal.highlight-changes", false, [false, true])).result.current[0]).toBe(true);
    });

    it.each(["broken JSON", '"unsupported"', "{}", "true"])("repairs invalid layout preference %s", (stored) => {
        localStorage.setItem("skladno-view-preference:proposal.layout", stored);
        const { result } = renderHook(() => useViewPreference("proposal.layout", "side-by-side", ["side-by-side", "stacked"]));
        expect(result.current[0]).toBe("side-by-side");
        expect(localStorage.getItem("skladno-view-preference:proposal.layout")).toBe('"side-by-side"');
    });

    it("keeps controls working when storage is unavailable", () => {
        vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
            throw new Error("Unavailable");
        });
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
            throw new Error("Unavailable");
        });
        const { result } = renderHook(() => useViewPreference("proposal.highlight-changes", false, [false, true]));
        act(() => result.current[1](true));
        expect(result.current[0]).toBe(true);
    });
});
