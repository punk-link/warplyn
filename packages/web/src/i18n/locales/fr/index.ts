import type { MessageId } from "../../messages.js";
import { assistantMessages } from "./assistant.js";
import { previewMessages } from "./preview.js";
import { editorMessages } from "./editor.js";
import { spellingMessages } from "./spelling.js";
import { electronMessages } from "./electron.js";
import { errorsMessages } from "./errors.js";
import { settingsMessages } from "./settings.js";
import { settingsMessages2 } from "./settings-2.js";
import { typographyMessages } from "./typography.js";
import { styleProfileMessages } from "./styleProfile.js";
import { viewsMessages } from "./views.js";
import { articleMessages } from "./article.js";
import { articleFilesMessages } from "./articleFiles.js";
import { workspaceMessages } from "./workspace.js";
import { statusMessages } from "./status.js";
import { revisionsMessages } from "./revisions.js";
import { navigationMessages } from "./navigation.js";
import { articleWorkspaceMessages } from "./articleWorkspace.js";
import { draftSaveMessages } from "./draftSave.js";
import { draftConflictMessages } from "./draftConflict.js";
import { articleHeaderMessages } from "./articleHeader.js";
import { operationsMessages } from "./operations.js";
import { uiMessages } from "./ui.js";
import { notificationsMessages } from "./notifications.js";
import { translationLanguagesMessages } from "./translationLanguages.js";
import { keyBindingsMessages } from "./keyBindings.js";
import { quickStartMessages } from "./quickStart.js";
import { languagesMessages } from "./languages.js";
import { telemetryMessages } from "./telemetry.js";
import { publishingMessages } from "./publishing.js";
import { skillsMessages } from "./skills.js";

export const fr: Record<MessageId, string> = {
    "notes.markers": "Notes éditoriales {numbers}",
    "notes.add": "Ajouter une note éditoriale…",
    "notes.title": "Notes éditoriales",
    "notes.count": "Notes éditoriales{separator}{count}",
    "notes.select": "Sélectionnez du texte pour joindre une note.",
    "notes.help": "Les notes jointes guident l’Assistant dans son travail sur ces passages. Elles restent séparées du texte de l’article.",
    "notes.empty": "Aucune note éditoriale pour le moment.",
    "notes.detached": "À rattacher",
    "notes.edit": "Modifier la note…",
    "notes.reattach": "Joindre au texte sélectionné",
    "notes.reattachHelp": "Sélectionnez le nouveau passage dans l’éditeur, puis rouvrez cette note pour la joindre.",
    "notes.guidance": "Consignes pour l’Assistant",
    "notes.failed": "Impossible de mettre à jour la note. Conservez vos consignes, rouvrez l’article et réessayez.",
    "notes.remove": "Supprimer la note",
    "notes.save": "Enregistrer la note",
    "notes.marker": "Note éditoriale {number}",
    "notes.included": "Notes accompagnant cette demande",
    ...assistantMessages,
    ...previewMessages,
    ...editorMessages,
    ...spellingMessages,
    ...electronMessages,
    ...errorsMessages,
    ...settingsMessages,
    ...settingsMessages2,
    ...typographyMessages,
    ...styleProfileMessages,
    ...viewsMessages,
    ...articleMessages,
    ...articleFilesMessages,
    ...workspaceMessages,
    ...statusMessages,
    ...revisionsMessages,
    ...navigationMessages,
    ...articleWorkspaceMessages,
    ...draftSaveMessages,
    ...draftConflictMessages,
    ...articleHeaderMessages,
    ...operationsMessages,
    ...uiMessages,
    ...notificationsMessages,
    ...translationLanguagesMessages,
    ...keyBindingsMessages,
    ...quickStartMessages,
    ...languagesMessages,
    ...telemetryMessages,
    ...publishingMessages,
    ...skillsMessages,
};
