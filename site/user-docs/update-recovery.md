---
description: "Recover from a failed Warplyn desktop update using the previous version and its matching snapshot."
---

# Desktop update recovery

Preview updates are optional. If Warplyn cannot start after an update, reinstall the previous preview and restore the matching pre-update snapshot.

::: warning Avoid opening the newer database
Do not open a database created by a newer preview with an older version. Restore the snapshot recorded before the update first.
:::

1. Download and reinstall the previous preview from its [GitHub release](https://github.com/punk-link/warplyn/releases).
2. Restore the matching pre-update SQLite snapshot recorded by Warplyn before the update.
3. Start the previous preview and check your *Articles*, *Drafts*, *Revisions*, and settings.

## Linux AppImage

Keep your AppImage in a folder you can write to. See [Install Warplyn](installation.md#linux-appimage) for runtime requirements, launching and optional desktop integration. AppImage installed desktop acceptance remains pending.

After permitting GitHub update access, use **Download**, then **Restart and update**. A normal close does not install the downloaded update. Debian packages continue to use your package manager.

If an AppImage update fails to start, close Warplyn. The previous executable is retained beside the image with a `.previous` suffix. Restore the matching pre-update snapshot before launching the previous version, following the warning above. Keep both executables and the snapshot until recovery succeeds. If the image folder is unwritable, move the image into a folder you own or download the replacement manually. Do not disable the Electron sandbox to make an image launch.
