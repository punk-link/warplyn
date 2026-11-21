import type { MessageId } from "../../messages.js";


export const uiMessages = {
    "ui.added": "Dodano: ",
    "ui.loading": "Wczytywanie",
    "ui.noOriginal": "Brak oryginalnego tekstu",
    "ui.noProposed": "Brak proponowanego tekstu",
    "ui.original": "Oryginał",
    "ui.proposed": "Propozycja",
    "ui.proposedChange": "Proponowana zmiana tekstu",
    "ui.removed": "Usunięto: ",
} satisfies Partial<Record<MessageId, string>>;
