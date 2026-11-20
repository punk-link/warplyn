import type { MessageId } from "../../messages.js";
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
import { typographyMessages } from "./typography.js";
import { styleProfileMessages } from "./styleProfile.js";
import { previewMessages } from "./preview.js";
import { editorMessages } from "./editor.js";
import { spellingMessages } from "./spelling.js";
import { settingsMessages } from "./settings.js";
import { settingsMessages2 } from "./settings-2.js";
import { assistantMessages } from "./assistant.js";
import { viewsMessages } from "./views.js";
import { errorsMessages } from "./errors.js";
import { electronMessages } from "./electron.js";

export const de: Record<MessageId, string> = {
    "notes.markers": "Redaktionsnotizen {numbers}",
    "notes.add": "Redaktionsnotiz hinzufügen…",
    "notes.title": "Redaktionsnotizen",
    "notes.count": "Redaktionsnotizen{separator}{count}",
    "notes.select": "Wählen Sie Text aus, um eine Notiz anzuhängen.",
    "notes.help": "Angehängte Notizen leiten den Assistenten bei der Arbeit an diesen Passagen an. Sie bleiben vom Artikeltext getrennt.",
    "notes.empty": "Noch keine Redaktionsnotizen.",
    "notes.detached": "Erneut zuordnen",
    "notes.edit": "Notiz bearbeiten…",
    "notes.reattach": "An ausgewählten Text anhängen",
    "notes.reattachHelp": "Wählen Sie die neue Passage im Editor aus und öffnen Sie diese Notiz erneut, um sie anzuhängen.",
    "notes.guidance": "Anweisungen für den Assistenten",
    "notes.failed":
        "Die Notiz konnte nicht aktualisiert werden. Bewahren Sie Ihre Anweisungen auf, öffnen Sie den Artikel erneut und versuchen Sie es noch einmal.",
    "notes.remove": "Notiz entfernen",
    "notes.save": "Notiz speichern",
    "notes.marker": "Redaktionsnotiz {number}",
    "notes.included": "Notizen zu dieser Anfrage",
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
    ...typographyMessages,
    ...styleProfileMessages,
    ...previewMessages,
    ...editorMessages,
    ...spellingMessages,
    ...settingsMessages,
    ...settingsMessages2,
    ...assistantMessages,
    ...viewsMessages,
    ...errorsMessages,
    ...electronMessages,
};
