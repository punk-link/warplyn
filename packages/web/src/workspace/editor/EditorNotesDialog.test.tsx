import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { createEditorNoteAnchor } from "@skladno/shared";
import { renderLocalized, resetWorkspaceTestEnvironment } from "../EditorialWorkspace.test-utils.js";
import { EditorNotesDialog } from "./EditorNotesDialog.js";


afterEach(resetWorkspaceTestEnvironment);

it("keeps Author guidance after a failed save and retries with the original note version", async () => {
    const note = { id: "note", text: "Original guidance", version: 3, anchor: createEditorNoteAnchor("Source", 0, 6, "Source") };
    const change = vi.fn().mockRejectedValueOnce(new Error("Synthetic conflict")).mockResolvedValue(undefined);
    const close = vi.fn();
    renderLocalized(<EditorNotesDialog
        binding={{ items: [note], change }}
        content="Source"
        initialNote={note}
        capture={() => undefined}
        locate={vi.fn()}
        close={close} />);
    const field = screen.getByRole("textbox", { name: "Guidance for the Assistant" });
    fireEvent.change(field, { target: { value: "Keep my revised guidance." } });
    fireEvent.click(screen.getByRole("button", { name: "Save note" }));
    await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("The note could not be updated."));
    expect(field).toHaveProperty("value", "Keep my revised guidance.");
    expect(close).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Save note" }));
    await waitFor(() => expect(close).toHaveBeenCalledOnce());
    expect(change).toHaveBeenLastCalledWith({
        kind: "save", id: "note", text: "Keep my revised guidance.", anchor: note.anchor, expectedVersion: 3,
    });
});
