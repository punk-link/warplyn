# Article Library Panel and Navigation Rail

Use these decisions for the desktop Article Library Panel.

## Expanded panel

- Keep the panel narrow (`w-52`) and full-height.
- Keep a 72px-equivalent header (`min-h-18`) with the Warplyn spiral and wordmark, New article, and collapse actions.
- Keep search in its own bordered row. Use a compact control (`min-h-9`, `py-1.5`, `pl-8`, `pr-2`) with a search icon.
- Show `Recent` only when Articles exist. With no Articles, leave the library area blank; the central workspace provides the create call to action.
- Represent each Article with the document icon, title, detail line, and selected-state card.
- Use compact two-line Article cards with `py-1.5` for originals, `py-1` for translations, and `space-y-0.5` between rows. Library context-menu rows use `min-h-7 py-1`, with `pointer-coarse:min-h-9` preserving larger touch targets.
- Keep the bottom utility area in this order: Style Profile, Settings, then language/local and save-state indicators. Keep captions and icons left-aligned.

## Collapsed Navigation Rail

- Keep the rail at `w-10` with compact horizontal padding.
- Reserve the same `min-h-18` header height as the expanded panel.
- Use the same Warplyn spiral as the expanded header in an accessible icon button to expand the panel.
- Keep Style Profile and Settings as icon-only controls at the bottom, aligned with the expanded utility rows.
- Keep the save state as an accessible semantic-colored dot at the bottom. Include an accessible name and tooltip/title with the visible save state.
- Keep icon-only controls at least 36px and give every one an accessible label.
