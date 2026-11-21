import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { createEditorNoteAnchor } from "@skladno/shared";
import { renderLocalized, resetWorkspaceTestEnvironment } from "../EditorialWorkspace.test-utils.js";
import { EditorNotesDialog } from "./EditorNotesDialog.js";


afterEach(resetWorkspaceTestEnvironment);

it("requires explicit discard before switching notes or closing with unsaved guidance", () => {
    const anchor = createEditorNoteAnchor("Source", 0, 6, "Source");
    const first = { id: "first", text: "First", version: 1, anchor };
    const second = { ...first, id: "second", text: "Second" };
    const close = vi.fn();
    renderLocalized(<EditorNotesDialog
        binding={{ items: [first, second], change: vi.fn() }}
        content="Source"
        initialNote={first}
        capture={() => undefined}
        locate={vi.fn()}
        close={close} />);
    const field = screen.getByRole("textbox");
    fireEvent.change(field, { target: { value: "Unsaved guidance" } });
    fireEvent.click(screen.getAllByRole("button", { name: "Edit note…" })[1]);
    expect(field).toHaveProperty("value", "Unsaved guidance");
    expect(screen.getByRole("alert").textContent).toContain("Discard unsaved note changes?");
    expect(screen.getAllByRole("button", { name: "Cancel" })).toHaveLength(1);
    fireEvent.click(within(screen.getByRole("alert")).getByRole("button", { name: "Cancel" }));
    expect(field).toHaveProperty("value", "Unsaved guidance");
    expect(document.activeElement).toBe(field);
    fireEvent.click(screen.getAllByRole("button", { name: "Edit note…" })[1]);
    fireEvent.click(screen.getByRole("button", { name: "Discard changes" }));
    expect(field).toHaveProperty("value", "Second");
    fireEvent.change(field, { target: { value: "Keep this" } });
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(close).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Discard changes" }));
    expect(close).toHaveBeenCalledOnce();
});

it("opens note creation for selected text without hiding the existing notes", async () => {
    const anchor = createEditorNoteAnchor("Source", 0, 6, "Source");
    const note = { id: "existing", text: "Existing guidance", version: 1, anchor };
    const change = vi.fn().mockResolvedValue(undefined);
    renderLocalized(<EditorNotesDialog
        binding={{ items: [note], change }}
        content="Source"
        capture={() => anchor}
        locate={vi.fn()}
        close={vi.fn()} />);
    expect(screen.getByText("Existing guidance")).toBeTruthy();
    fireEvent.change(screen.getByRole("textbox", { name: "Guidance for the Assistant" }), { target: { value: "New guidance" } });
    fireEvent.click(screen.getByRole("button", { name: "Save note" }));
    await waitFor(() => expect(change).toHaveBeenCalledWith(expect.objectContaining({
        kind: "save", expectedVersion: 0, text: "New guidance", anchor,
    })));
});

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
    expect(document.activeElement).toBe(field);
    expect(field).toHaveProperty("selectionStart", 0);
    expect(field).toHaveProperty("selectionEnd", note.text.length);
    fireEvent.change(field, { target: { value: "Keep my revised guidance." } });
    fireEvent.click(screen.getByRole("button", { name: "Save note" }));
    await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("The note could not be updated."));
    expect(field).toHaveProperty("value", "Keep my revised guidance.");
    expect(close).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Save note" }));
    await waitFor(() => expect(screen.queryByRole("textbox")).toBeNull());
    expect(close).not.toHaveBeenCalled();
    expect(change).toHaveBeenLastCalledWith({
        kind: "save", id: "note", text: "Keep my revised guidance.", anchor: note.anchor, expectedVersion: 3,
    });
});
