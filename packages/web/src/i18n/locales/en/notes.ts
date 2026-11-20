import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.add": "Add editor note…",
    "notes.count": "Editor notes{separator}{count}",
    "notes.detached": "Needs reattachment",
    "notes.edit": "Edit note…",
    "notes.empty": "No editor notes yet.",
    "notes.failed": "The note could not be updated. Keep your guidance, reopen the Article, and try again.",
    "notes.guidance": "Guidance for the Assistant",
    "notes.help": "Attached notes guide the Assistant when it works on their passages. Notes are separate from Article text.",
    "notes.included": "Notes accompanying this request",
    "notes.marker": "Editor note {number}",
    "notes.markers": "Editor notes {numbers}",
    "notes.reattach": "Attach to selected text",
    "notes.reattachHelp": "Select the replacement passage in the editor, then reopen this note to attach it.",
    "notes.remove": "Remove note",
    "notes.save": "Save note",
    "notes.select": "Select text to attach a note.",
    "notes.title": "Editor notes",
} satisfies Partial<Record<MessageId, string>>;
