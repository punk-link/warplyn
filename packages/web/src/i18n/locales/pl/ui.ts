import type { MessageId } from "../../messages.js";

export const ui = {
    "ui.loading": "Wczytywanie",
    "ui.proposedChange": "Proponowana zmiana tekstu",
    "ui.original": "Oryginał",
    "ui.proposed": "Propozycja",
    "ui.noOriginal": "Brak oryginalnego tekstu",
    "ui.noProposed": "Brak proponowanego tekstu",
    "ui.removed": "Usunięto: ",
    "ui.added": "Dodano: ",
} satisfies Partial<Record<MessageId, string>>;
