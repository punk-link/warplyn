import type { MessageId } from "../../messages.js";


export const revisionsMessages = {
    "revisions.acceptedProposal": "Proposition acceptée",
    "revisions.articleContent": "Contenu enregistré de l’article",
    "revisions.assistantEdit": "Retouche de l’assistant",
    "revisions.author": "Version enregistrée par l’auteur",
    "revisions.characterCount": "{count} caractères",
    "revisions.count": "{count, plural, =0 {Aucune version enregistrée} one {# version enregistrée} other {# versions enregistrées}}",
    "revisions.current": "Actuelle",
    "revisions.currentExplanation": "Il s’agit de la version enregistrée actuelle.",
    "revisions.currentRevision": "Version enregistrée actuelle",
    "revisions.empty": "Version enregistrée vide",
    "revisions.emptyContent": "Cette version enregistrée ne contient aucun texte d’article.",
    "revisions.heading": "Historique des versions enregistrées",
    "revisions.historyNavigation": "Historique des versions enregistrées",
    "revisions.inactive": "Inactive",
    "revisions.initial": "Version enregistrée initiale",
    "revisions.restore": "Restaurer",
    "revisions.restored": "Version restaurée",
    "revisions.restoredFromEarlier": "Restaurée depuis une version antérieure",
    "revisions.restoredTarget": "Version enregistrée n° {number} restaurée",
    "revisions.restoredTargetDescribed": "Version enregistrée n° {number} restaurée — {description}",
    "revisions.revision": "Version",
    "revisions.saved": "Version enregistrée",
    "revisions.select": "Choisir une version",
} satisfies Partial<Record<MessageId, string>>;
