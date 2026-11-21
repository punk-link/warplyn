---
description: "Write and organize Articles, understand Draft saving, and set up local spelling help."
---

# Writing and organizing Articles

An *Article* is a piece of writing in your Warplyn library. As you edit, Warplyn saves a recoverable *Draft* checkpoint. A *Revision* is a saved point in the *Article*'s history. Save a *Revision* whenever you want to mark a point in the Article’s history.

## Write and save an Article

Choose **New article** in the Library to begin. Rename the *Article* from its title field. Use the formatting toolbar to apply headings, lists, emphasis, links, quotes, and code. When you paste rich text, Warplyn keeps supported text formatting and removes unsafe or unsupported markup. It stores the *Article* as Markdown, so complex page layouts and embedded items do not carry over.

Warplyn saves your current *Draft* automatically as you edit. A *Draft* checkpoint is recoverable working text, not a new item in Revision History. Check the save-state indicator in the Article Status Bar if you need to know whether Warplyn has saved your latest edits for recovery. Warplyn also saves a pending checkpoint when you switch *Articles* or open Settings.

[![Writing workspace showing The River at Dusk in the editor, formatting toolbar, Library, and Saved Draft indicator.](/images/writing-workspace.png)](/images/writing-workspace.png)

*Example Article saved as a Draft in the writing workspace.*

Choose **Save revision** when you want to keep the current *Draft* as a named point in its history. Saving a *Revision* does not remove earlier *Revisions*. For help when local text and a saved *Draft* no longer match, see [Reviewing Articles](reviewing-articles.md#recover-a-draft).

## Keep passage guidance in Editor notes

Use *Editor notes* to keep instructions beside a passage for later Assistant work. They help when a scene needs a particular point of view, a clue must stay ambiguous, or dialogue must preserve a character's voice. Notes stay separate from the *Article* text and are excluded from copied and exported prose.

### Add a note

1. Select the passage in the editor.
2. Choose **Add editor note…** in the formatting toolbar or the editor's right-click menu.
3. Enter your instruction in **Guidance for the Assistant**, then choose **Save note**.

::: tip Example from The River at Dusk
Select the paragraph where Ana notices the boat and add: "Keep Ana uncertain about who owns the boat. Preserve the river sounds and do not reveal the passenger's identity."

Later, select that passage and ask the Assistant to improve its pacing. The saved note supplies the scene-specific guidance without adding it to your prose.
:::

Saving a note does not start an Assistant request or create an *Article Revision*. You can collect guidance while writing and request help later.

### Find, edit, and remove notes

Open **Editor notes** from the formatting toolbar to see the current *Article*'s notes. Small numbered markers beside the prose also open the notes dialog. Hover over or focus a marker to highlight its passage temporarily.

In the list, choose a passage preview to locate it in the editor. Choose **Edit note…** to change its guidance, then **Save note**. Choose **Remove** to delete a note. Removing guidance leaves the passage itself in place.

Save your changes before closing the dialog or switching notes. If you have unsaved changes, Warplyn asks whether to discard them. Choose **Cancel** to keep editing or **Discard changes** to leave without saving.

### Reattach a note after changing a passage

If edits make a note's original passage impossible to identify, the note shows **Needs reattachment**. Its guidance remains available in **Editor notes**, but it cannot guide work on a passage until you attach it again.

1. Close the notes dialog and select the replacement passage in the editor.
2. Reopen **Editor notes** and choose **Edit note…** for the detached note.
3. Choose **Attach to selected text**, then **Save note**.

### Use notes with the Assistant

Attached notes guide explicit Assistant operations that work on their passages. For a selection request, only attached notes overlapping the selection accompany it; unrelated passage notes stay out. Check **Notes accompanying this request** in the Composer before sending.

Keep notes specific to the passage. Put the immediate task in the Composer, such as "Tighten this paragraph," and use a note for guidance you want to keep, such as "Preserve Ana's uncertainty." For procedures you reuse across *Articles*, see [Skills](skills.md); for writing samples and broader style guidance, see [Style Profile](style-profile.md).

## Find and organize Articles

Use Library search to find *Articles*, including archived ones. Choose **Articles** to browse pinned and recent work, or **Archive** to browse archived *Article* groups. The collapsed Navigation Rail has shortcuts for **New article**, **Search**, **Articles**, and **Archive**. Pin an original *Article* from its Library menu to keep a shortcut in the Rail. Use **Move up** or **Move down** to reorder pinned *Articles*. Pinning and reordering do not change *Article* content. Use the *Article* title field to rename an *Article*.

Choose **Archive Article** to remove an *Article* group from the active list while keeping it in **Archive**. Select the archived group and choose **Unarchive Article** to bring it back. Deleting an *Article* requires confirmation and removes its *Revisions* and recoverable *Drafts*. Deleting an original also deletes its linked *translations*; deleting a *translation* leaves its source *Article* in place. If you only need to set it aside, archive it instead.

## Use spelling help

The editor marks likely misspellings using your device's spelling support. In the desktop app, right-click a marked word to choose a suggested replacement or **Add to dictionary**. A replacement is an ordinary edit, so it can be undone and becomes part of the current *Draft*. Spelling checks stay on your device and do not send *Article* text to an AI provider.

In the desktop app, open **Settings** → **Spelling**. Use **Filter languages** to find a language, select it under **Prepare for offline writing**, then choose **Download dictionaries**. Wait for its status to show **Downloaded** before relying on it offline. **Available** means the language is supported; it does not confirm that its dictionary has finished downloading. Choose **Unload** to stop using a prepared dictionary for this session. Preparing dictionaries does not change an *Article*'s language. Downloads need internet access. On Windows, adding or removing personal words also affects the operating system dictionary and may affect other apps.

In **Personal dictionary**, search for saved words or enter one word or technical term per line under **Words to add**, then choose **Add words**. You can add up to 500 words at a time. Remove saved words when you want spelling help to flag them again. The list is shared across *Articles* and languages. The browser app uses browser spelling settings and does not offer dictionary management.

Use **Focus mode** to hide both supporting panels while you write. Choose it again to restore them. Use each panel's collapse control to close or reopen it; drag the divider beside a panel to resize it. On a narrow window, the panels can open as temporary drawers over the editor.

With a keyboard, use **Tab** and **Shift + Tab** to move through the Library, Article header, views, formatting toolbar, editor, status bar, and Assistant. Inside the editor, search, and Composer, the usual text-editing keys keep working. Settings has its own keyboard navigation. In its desktop sidebar, use **Up**, **Down**, **Home**, or **End** to move between sections, then **Enter** or **Space** to open one.

For moving a whole *Article* in or out of Warplyn, see [Article files](article-files.md). For backups of your whole workspace, see [Backups and recovery](backups-and-recovery.md).
