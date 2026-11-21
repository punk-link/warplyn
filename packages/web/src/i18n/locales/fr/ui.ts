import type { MessageId } from "../../messages.js";


export const uiMessages = {
    "ui.added": "Ajouté : ",
    "ui.loading": "Chargement",
    "ui.noOriginal": "Aucun texte original",
    "ui.noProposed": "Aucun texte proposé",
    "ui.original": "Original",
    "ui.proposed": "Proposition",
    "ui.proposedChange": "Modification de texte proposée",
    "ui.removed": "Supprimé : ",
} satisfies Partial<Record<MessageId, string>>;
