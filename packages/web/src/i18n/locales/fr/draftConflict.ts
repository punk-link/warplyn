import type { MessageId } from "../../messages.js";


export const draftConflictMessages = {
    "draftConflict.banner": "Une autre session de Warplyn a modifié cet article. Votre brouillon local a été conservé ; comparez-le avant de continuer.",
    "draftConflict.cancel": "Annuler",
    "draftConflict.compare": "Comparer et résoudre",
    "draftConflict.confirmDraft": "Remplacer votre texte local conservé par le dernier brouillon enregistré ?",
    "draftConflict.confirmRevision": "Supprimer le brouillon enregistré et remplacer votre texte local conservé par la dernière version enregistrée ?",
    "draftConflict.description": (
        "Votre brouillon local conservé est affiché à côté du dernier contenu enregistré. Rien n’est remplacé tant que " +
        "vous n’avez pas fait votre choix."
    ),
    "draftConflict.heading": "Résoudre le conflit de brouillons",
    "draftConflict.keepMine": "Conserver mon brouillon",
    "draftConflict.useDraft": "Utiliser le dernier brouillon",
    "draftConflict.useRevision": "Utiliser la dernière version enregistrée",
} satisfies Partial<Record<MessageId, string>>;
