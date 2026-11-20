import type { MessageId } from "../../messages.js";


export const draftConflictMessages = {
    "draftConflict.banner": (
        "Eine andere Warplyn-Sitzung hat diesen Artikel geändert. Ihr lokaler Entwurf wurde behalten. Vergleichen Sie i" +
        "hn, bevor Sie fortfahren."
    ),
    "draftConflict.cancel": "Abbrechen",
    "draftConflict.compare": "Vergleichen und lösen",
    "draftConflict.confirmDraft": "Ihren aufbewahrten lokalen Text durch den zuletzt gespeicherten Entwurf ersetzen?",
    "draftConflict.confirmRevision": (
        "Den gespeicherten Entwurf verwerfen und Ihren aufbewahrten lokalen Text durch die neueste gespeicher" +
        "te Fassung ersetzen?"
    ),
    "draftConflict.description": (
        "Ihr aufbewahrter lokaler Entwurf wird neben dem zuletzt gespeicherten Inhalt angezeigt. Nichts wird ersetzt, b" +
        "is Sie sich entscheiden."
    ),
    "draftConflict.heading": "Entwurfskonflikt lösen",
    "draftConflict.keepMine": "Meinen Entwurf behalten",
    "draftConflict.useDraft": "Neuesten Entwurf verwenden",
    "draftConflict.useRevision": "Neueste gespeicherte Fassung verwenden",
} satisfies Partial<Record<MessageId, string>>;
