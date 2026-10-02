---
description: "Recover from a failed Warplyn Windows preview update by reinstalling the previous preview and restoring its matching snapshot."
---

# Windows preview update recovery

Preview updates are optional. If Warplyn cannot start after an update, reinstall the previous preview and restore the matching pre-update snapshot.

::: warning Avoid opening the newer database
Do not open a database created by a newer preview with an older version. Restore the snapshot recorded before the update first.
:::

1. Download and reinstall the previous preview from its [GitHub release](https://github.com/punk-link/warplyn/releases).
2. Restore the matching pre-update SQLite snapshot recorded by Warplyn before the update.
3. Start the previous preview and check your *Articles*, *Drafts*, *Revisions*, and settings.
