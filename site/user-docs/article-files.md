---
description: "Save or load whole Articles as Markdown, HTML, DOCX, or RTF files."
---

# Article files

Use **Save to file** and **Load from file** to move whole *Articles* between Warplyn and other writing tools. These actions work in the desktop app and the web app.

## Save to file

1. Open the *Article* you want to save.
2. Choose **Save to file** beside **Save revision** in the Article header. You can also right-click an *Article* in the Library and choose **Save to file…** without opening it.
3. In the desktop app's save window, select Markdown, HTML, DOCX, or RTF in the file type dropdown, then choose a filename and location. Keep the matching filename extension. In the web app, choose **File format**, then **Download** and use your browser's download controls.

The file contains the entire current *Draft*, including unsaved edits. Highlighting text does not limit what is saved. This action does not create a *Revision*. **Save revision** remains the action for adding the current *Draft* to your history.

The web app reports **Article download started** when it hands the file to the browser. Check the browser's downloads for completion or errors.

## Load from file

1. Choose **Load from file** beside **Save revision** in the Article header, or right-click an *Article* in the Library and choose **Load from file…**. If the library is empty, choose **Create** first.
2. Select one `.md`, `.html`, `.htm`, `.docx`, or `.rtf` file.
3. For HTML, DOCX, and RTF, check **Review imported Article**, then choose **Import**. You can cancel the review. Markdown opens directly.
4. Warplyn opens the imported text as a separate *Article*. The previous *Article* and its recoverable *Draft* remain available in the Library.

A leading level-one heading supplies the new title. Otherwise, Warplyn uses the filename without its extension. The heading stays in the *Article* body. Loading the same file again creates another independent *Article*.

Choose a file no larger than 10 MiB. Markdown and HTML must use UTF-8. DOCX and RTF work without Microsoft Office installed.

Warplyn keeps paragraphs, headings, editable nested lists and numbering, bold, italic, strikethrough, safe links, quotes, code, and Unicode text where supported by the source format. Page layout, fonts, images, embedded objects, and complex format-specific features may be omitted or simplified. Table text becomes ordinary Article content. Check the import preview before continuing. Unsupported Markdown extensions may also lose formatting in the editor.

You can cancel the file picker without importing anything. If your current *Draft* cannot be saved for recovery, fix the save error and retry loading.

## Save a Revision to file

1. Open **Revisions**.
2. Open the saved *Revision* you want to export.
3. Choose **Save to file** beside its details.

The file contains the whole *Article* from that *Revision*, regardless of your current *Draft*. Exporting does not restore the *Revision* or change your history. Its suggested filename includes the *Revision* number.

File export also has a 10 MiB limit. If a desktop save fails, choose a writable location and retry. A failed replacement keeps the existing destination file intact.

Exported files contain *Article* text, not your complete history, conversations, or settings. Use [Backups and recovery](backups-and-recovery.md) to protect the full workspace.
