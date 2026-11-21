import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.discardPrompt": "Abandonner les modifications non enregistrées de la note ?",
    "notes.discardChanges": "Abandonner les modifications",
    "notes.add": "Ajouter une note éditoriale…",
    "notes.count": "Notes éditoriales{separator}{count}",
    "notes.detached": "À rattacher",
    "notes.edit": "Modifier la note…",
    "notes.empty": "Aucune note éditoriale pour le moment.",
    "notes.failed": "Impossible de mettre à jour la note. Conservez vos consignes, rouvrez l’article et réessayez.",
    "notes.guidance": "Consignes pour l’Assistant",
    "notes.help": "Les notes jointes guident l’Assistant dans son travail sur ces passages. Elles restent séparées du texte de l’article.",
    "notes.included": "Notes accompagnant cette demande",
    "notes.marker": "Note éditoriale {number}",
    "notes.markers": "Notes éditoriales {numbers}",
    "notes.reattach": "Joindre au texte sélectionné",
    "notes.reattachHelp": "Sélectionnez le nouveau passage dans l’éditeur, puis rouvrez cette note pour la joindre.",
    "notes.remove": "Supprimer la note",
    "notes.save": "Enregistrer la note",
    "notes.select": "Sélectionnez du texte pour joindre une note.",
    "notes.title": "Notes éditoriales",
} satisfies Partial<Record<MessageId, string>>;
