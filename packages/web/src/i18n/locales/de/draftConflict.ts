import type { MessageId } from "../../messages.js";

export const draftConflictMessages = {
    "draftConflict.banner": (
        "Eine andere Warplyn-Sitzung hat diesen Artikel geändert. Ihr lokaler Entwurf wurde behalten. " +
        "Vergleichen Sie ihn, bevor Sie fortfahren."
    ),
    "draftConflict.compare": "Vergleichen und lösen",
    "draftConflict.heading": "Entwurfskonflikt lösen",
    "draftConflict.description": (
        "Ihr aufbewahrter lokaler Entwurf wird neben dem zuletzt gespeicherten Inhalt angezeigt. Nichts wird " +
        "ersetzt, bis Sie sich entscheiden."
    ),
    "draftConflict.cancel": "Abbrechen",
    "draftConflict.keepMine": "Meinen Entwurf behalten",
    "draftConflict.useDraft": "Neuesten Entwurf verwenden",
    "draftConflict.useRevision": "Neueste gespeicherte Fassung verwenden",
    "draftConflict.confirmDraft": "Ihren aufbewahrten lokalen Text durch den zuletzt gespeicherten Entwurf ersetzen?",
    "draftConflict.confirmRevision": (
        "Den gespeicherten Entwurf verwerfen und Ihren aufbewahrten lokalen Text durch die neueste " +
        "gespeicherte Fassung ersetzen?"
    ),
} satisfies Partial<Record<MessageId, string>>;
