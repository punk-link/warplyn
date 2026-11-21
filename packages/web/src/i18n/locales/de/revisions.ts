import type { MessageId } from "../../messages.js";


export const revisionsMessages = {
    "revisions.acceptedProposal": "Angenommener Vorschlag",
    "revisions.articleContent": "Gespeicherter Artikelinhalt",
    "revisions.assistantEdit": "Bearbeitung durch den Assistenten",
    "revisions.author": "Vom Autor gespeicherte Fassung",
    "revisions.characterCount": "{count} Zeichen",
    "revisions.count": "{count, plural, =0 {Keine gespeicherten Fassungen} one {# gespeicherte Fassung} other {# gespeicherte Fassungen}}",
    "revisions.current": "Aktuell",
    "revisions.currentExplanation": "Dies ist die aktuelle gespeicherte Fassung.",
    "revisions.currentRevision": "Aktuelle gespeicherte Fassung",
    "revisions.empty": "Leere gespeicherte Fassung",
    "revisions.emptyContent": "Diese gespeicherte Fassung enthält keinen Artikeltext.",
    "revisions.heading": "Fassungsverlauf",
    "revisions.historyNavigation": "Fassungsverlauf",
    "revisions.inactive": "Inaktiv",
    "revisions.initial": "Erste gespeicherte Fassung",
    "revisions.restore": "Wiederherstellen",
    "revisions.restored": "Wiederhergestellte Fassung",
    "revisions.restoredFromEarlier": "Aus einer früheren Fassung wiederhergestellt",
    "revisions.restoredTarget": "Wiederhergestellte Fassung Nr. {number}",
    "revisions.restoredTargetDescribed": "Wiederhergestellte Fassung Nr. {number} — {description}",
    "revisions.revision": "Fassung",
    "revisions.saved": "Gespeicherte Fassung",
    "revisions.select": "Fassung wählen",
} satisfies Partial<Record<MessageId, string>>;
