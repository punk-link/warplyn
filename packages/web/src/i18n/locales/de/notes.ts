import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.add": "Redaktionsnotiz hinzufügen…",
    "notes.count": "Redaktionsnotizen{separator}{count}",
    "notes.detached": "Erneut zuordnen",
    "notes.edit": "Notiz bearbeiten…",
    "notes.empty": "Noch keine Redaktionsnotizen.",
    "notes.failed": (
        "Die Notiz konnte nicht aktualisiert werden. Bewahren Sie Ihre Anweisungen auf, öffnen Sie den Artikel erneut u" +
        "nd versuchen Sie es noch einmal."
    ),
    "notes.guidance": "Anweisungen für den Assistenten",
    "notes.help": "Angehängte Notizen leiten den Assistenten bei der Arbeit an diesen Passagen an. Sie bleiben vom Artikeltext getrennt.",
    "notes.included": "Notizen zu dieser Anfrage",
    "notes.marker": "Redaktionsnotiz {number}",
    "notes.markers": "Redaktionsnotizen {numbers}",
    "notes.reattach": "An ausgewählten Text anhängen",
    "notes.reattachHelp": "Wählen Sie die neue Passage im Editor aus und öffnen Sie diese Notiz erneut, um sie anzuhängen.",
    "notes.remove": "Notiz entfernen",
    "notes.save": "Notiz speichern",
    "notes.select": "Wählen Sie Text aus, um eine Notiz anzuhängen.",
    "notes.title": "Redaktionsnotizen",
} satisfies Partial<Record<MessageId, string>>;
