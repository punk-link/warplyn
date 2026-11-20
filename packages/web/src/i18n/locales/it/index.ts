import type { MessageId } from "../../messages.js";
import { electron } from "./electron.js";
import { assistant } from "./assistant.js";
import { assistant2 } from "./assistant2.js";
import { operations } from "./operations.js";
import { settings } from "./settings.js";
import { settings2 } from "./settings2.js";
import { settings3 } from "./settings3.js";
import { settings4 } from "./settings4.js";
import { revisions } from "./revisions.js";
import { publishing } from "./publishing.js";
import { telemetry } from "./telemetry.js";
import { status } from "./status.js";
import { workspace } from "./workspace.js";
import { errors } from "./errors.js";
import { skills } from "./skills.js";
import { navigation } from "./navigation.js";
import { articleWorkspace } from "./articleWorkspace.js";
import { draftSave } from "./draftSave.js";
import { draftConflict } from "./draftConflict.js";
import { articleHeader } from "./articleHeader.js";
import { preview } from "./preview.js";
import { editor } from "./editor.js";
import { keyBindings } from "./keyBindings.js";
import { quickStart } from "./quickStart.js";
import { languages } from "./languages.js";
import { spelling } from "./spelling.js";
import { article } from "./article.js";
import { articleFiles } from "./articleFiles.js";
import { styleProfile } from "./styleProfile.js";
import { views } from "./views.js";
import { views2 } from "./views2.js";
import { views3 } from "./views3.js";
import { translationLanguages } from "./translationLanguages.js";
import { typography } from "./typography.js";
import { typography2 } from "./typography2.js";
import { ui } from "./ui.js";
import { notifications } from "./notifications.js";

export const it: Record<MessageId, string> = {
    "notes.markers": "Note editoriali {numbers}",
    "notes.add": "Aggiungi nota editoriale…",
    "notes.title": "Note editoriali",
    "notes.count": "Note editoriali{separator}{count}",
    "notes.select": "Seleziona il testo per allegare una nota.",
    "notes.help": "Le note allegate guidano l’Assistente quando lavora sui passaggi. Restano separate dal testo dell’articolo.",
    "notes.empty": "Nessuna nota editoriale.",
    "notes.detached": "Da ricollegare",
    "notes.edit": "Modifica nota…",
    "notes.reattach": "Allega al testo selezionato",
    "notes.reattachHelp": "Seleziona il nuovo passaggio nell’editor, poi riapri questa nota per allegarla.",
    "notes.guidance": "Indicazioni per l’Assistente",
    "notes.failed": "Impossibile aggiornare la nota. Conserva le indicazioni, riapri l’articolo e riprova.",
    "notes.remove": "Rimuovi nota",
    "notes.save": "Salva nota",
    "notes.marker": "Nota editoriale {number}",
    "notes.included": "Note che accompagnano questa richiesta",
    ...electron,
    ...assistant,
    ...assistant2,
    ...operations,
    ...settings,
    ...settings2,
    ...settings3,
    ...settings4,
    ...revisions,
    ...publishing,
    ...telemetry,
    ...status,
    ...workspace,
    ...errors,
    ...skills,
    ...navigation,
    ...articleWorkspace,
    ...draftSave,
    ...draftConflict,
    ...articleHeader,
    ...preview,
    ...editor,
    ...keyBindings,
    ...quickStart,
    ...languages,
    ...spelling,
    ...article,
    ...articleFiles,
    ...styleProfile,
    ...views,
    ...views2,
    ...views3,
    ...translationLanguages,
    ...typography,
    ...typography2,
    ...ui,
    ...notifications,
};
