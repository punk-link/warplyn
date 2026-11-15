import type { MessageId } from "../../messages.js";

export const uiMessages = {
    "ui.loading": "Chargement",
    "ui.proposedChange": "Modification de texte proposée",
    "ui.original": "Original",
    "ui.proposed": "Proposition",
    "ui.noOriginal": "Aucun texte original",
    "ui.noProposed": "Aucun texte proposé",
    "ui.removed": "Supprimé : ",
    "ui.added": "Ajouté : ",
} satisfies Partial<Record<MessageId, string>>;
