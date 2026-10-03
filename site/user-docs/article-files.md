---
description: "Save whole Articles and saved Revisions as Markdown files, or load Markdown into a separate Article."
---

# Article files

Use **Save to file** and **Load from file** to move whole *Articles* between Warplyn and other writing tools. These actions work in the desktop app and the web app.

## Save to file

1. Open the *Article* you want to save.
2. Choose **Save to file** beside **Save revision** in the Article header. You can also right-click an *Article* in the Library and choose **Save to file…** without opening it.
3. In the desktop app, choose a filename and location, then confirm the save. In the web app, use your browser's download controls to find the `.md` file or choose its location.

The file contains the entire current *Draft*, including unsaved edits. Highlighting text does not limit what is saved. This action does not create a *Revision*. **Save revision** remains the action for adding the current *Draft* to your history.

The web app reports **Article download started** when it hands the file to the browser. Check the browser's downloads for completion or errors.

## Load from file

1. Choose **Load from file** beside **Save revision** in the Article header, or right-click an *Article* in the Library and choose **Load from file…**. If the library is empty, choose **Create** first.
2. Select one `.md` file.
3. Warplyn opens the imported text as a separate *Article*. The previous *Article* and its recoverable *Draft* remain available in the library.

A leading level-one Markdown heading supplies the new title. Otherwise, Warplyn uses the filename without `.md`. The heading stays in the *Article* body. Loading the same file again creates another independent *Article*.

Choose a UTF-8 Markdown file no larger than 10 MiB. Warplyn preserves supported headings, lists, quotes, formatting, links, code, and Unicode text. Unsupported Markdown extensions may not retain their formatting in the editor. You can cancel the file picker without importing anything. If your current *Draft* cannot be saved for recovery, fix the save error and retry loading.

## Save a Revision to file

1. Open **Revisions**.
2. Open the saved *Revision* you want to export.
3. Choose **Save to file** beside its details.

The file contains the whole *Article* from that *Revision*, regardless of your current *Draft*. Exporting does not restore the *Revision* or change your history. Its suggested filename includes the *Revision* number.

File export also has a 10 MiB limit. If a desktop save fails, choose a writable location and retry. A failed replacement keeps the existing destination file intact.

Markdown files contain *Article* text, not your complete history, conversations, or settings. Use [Backups and recovery](backups-and-recovery.md) to protect the full workspace.
