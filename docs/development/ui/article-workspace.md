# Article Workspace

- Keep the desktop workspace at viewport height. Scroll designated internal regions, not the page shell.
- Keep the Article Status Bar visible as a fixed 24px row.
- Keep the white writing surface constrained within the tinted workspace canvas. The Workspace View owns its quiet scrollbar.
- Preserve alignment across expanded and collapsed panels, including header and footer heights.
- Use sentence case for controls. Use real UI icons with accessible labels.
- Keep empty areas quiet and empty-state titles regular-weight and muted.
- Use `w-full max-w-[calc(100vw-2rem)] sm:max-w-3xl` for focused dialogs unless the task requires another width.
- Route actions through existing application state; do not leave dead controls.

## Editor notes

Add editor note… is available in the formatting toolbar and editor context menu for selected text. Editor notes opens the separate note list and focused editing dialog. Small numbered footnote markers are muted at rest. Hovering or keyboard-focusing a marker temporarily gives its passage the existing soft brand background; activation opens the note. Keep marker controls outside editable Article text so clipboard and exports contain prose only.

Unmatched or ambiguous passages show Needs reattachment in the note list. Authors select a replacement passage before reopening the note and choosing Attach to selected text. Unattached notes do not accompany Assistant requests. The composer lists relevant attached guidance in a collapsed disclosure before sending.
