import type { MessageId } from "../../messages.js";
import { articleMessages } from "./article.js";
import { articleFilesMessages } from "./articleFiles.js";
import { articleHeaderMessages } from "./articleHeader.js";
import { articleWorkspaceMessages } from "./articleWorkspace.js";
import { assistantMessages } from "./assistant.js";
import { draftConflictMessages } from "./draftConflict.js";
import { draftSaveMessages } from "./draftSave.js";
import { editorMessages } from "./editor.js";
import { electronMessages } from "./electron.js";
import { errorsMessages } from "./errors.js";
import { keyBindingsMessages } from "./keyBindings.js";
import { languagesMessages } from "./languages.js";
import { navigationMessages } from "./navigation.js";
import { notesMessages } from "./notes.js";
import { notificationsMessages } from "./notifications.js";
import { operationsMessages } from "./operations.js";
import { previewMessages } from "./preview.js";
import { publishingMessages } from "./publishing.js";
import { quickStartMessages } from "./quickStart.js";
import { revisionsMessages } from "./revisions.js";
import { settingsUpdatesMessages } from "./settings-updates.js";
import { settingsBackupsMessages } from "./settings-backups.js";
import { settingsMessages } from "./settings.js";
import { skillsMessages } from "./skills.js";
import { spellingMessages } from "./spelling.js";
import { statusMessages } from "./status.js";
import { styleProfileMessages } from "./styleProfile.js";
import { telemetryMessages } from "./telemetry.js";
import { translationLanguagesMessages } from "./translationLanguages.js";
import { typographyMessages } from "./typography.js";
import { uiMessages } from "./ui.js";
import { viewsMessages } from "./views.js";
import { workspaceMessages } from "./workspace.js";


export const pl: Record<MessageId, string> = {
    ...articleMessages,
    ...articleFilesMessages,
    ...articleHeaderMessages,
    ...articleWorkspaceMessages,
    ...assistantMessages,
    ...draftConflictMessages,
    ...draftSaveMessages,
    ...editorMessages,
    ...electronMessages,
    ...errorsMessages,
    ...keyBindingsMessages,
    ...languagesMessages,
    ...navigationMessages,
    ...notesMessages,
    ...notificationsMessages,
    ...operationsMessages,
    ...previewMessages,
    ...publishingMessages,
    ...quickStartMessages,
    ...revisionsMessages,
    ...settingsMessages,
    ...settingsBackupsMessages,
    ...settingsUpdatesMessages,
    ...skillsMessages,
    ...spellingMessages,
    ...statusMessages,
    ...styleProfileMessages,
    ...telemetryMessages,
    ...translationLanguagesMessages,
    ...typographyMessages,
    ...uiMessages,
    ...viewsMessages,
    ...workspaceMessages,
};
