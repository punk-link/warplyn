import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.add": "Aggiungi nota editoriale…",
    "notes.count": "Note editoriali{separator}{count}",
    "notes.detached": "Da ricollegare",
    "notes.edit": "Modifica nota…",
    "notes.empty": "Nessuna nota editoriale.",
    "notes.failed": "Impossibile aggiornare la nota. Conserva le indicazioni, riapri l’articolo e riprova.",
    "notes.guidance": "Indicazioni per l’Assistente",
    "notes.help": "Le note allegate guidano l’Assistente quando lavora sui passaggi. Restano separate dal testo dell’articolo.",
    "notes.included": "Note che accompagnano questa richiesta",
    "notes.marker": "Nota editoriale {number}",
    "notes.markers": "Note editoriali {numbers}",
    "notes.reattach": "Allega al testo selezionato",
    "notes.reattachHelp": "Seleziona il nuovo passaggio nell’editor, poi riapri questa nota per allegarla.",
    "notes.remove": "Rimuovi nota",
    "notes.save": "Salva nota",
    "notes.select": "Seleziona il testo per allegare una nota.",
    "notes.title": "Note editoriali",
} satisfies Partial<Record<MessageId, string>>;
