import type { MessageId } from "../../messages.js";
import { previewMessages } from "./preview.js";
import { editorMessages } from "./editor.js";
import { typographyMessages } from "./typography.js";
import { settingsMessages } from "./settings.js";
import { settingsMessages2 } from "./settings-2.js";
import { spellingMessages } from "./spelling.js";
import { errorsMessages } from "./errors.js";
import { electronMessages } from "./electron.js";
import { articleMessages } from "./article.js";
import { articleFilesMessages } from "./articleFiles.js";
import { workspaceMessages } from "./workspace.js";
import { styleProfileMessages } from "./styleProfile.js";
import { statusMessages } from "./status.js";
import { revisionsMessages } from "./revisions.js";
import { navigationMessages } from "./navigation.js";
import { articleWorkspaceMessages } from "./articleWorkspace.js";
import { draftSaveMessages } from "./draftSave.js";
import { draftConflictMessages } from "./draftConflict.js";
import { articleHeaderMessages } from "./articleHeader.js";
import { assistantMessages } from "./assistant.js";
import { operationsMessages } from "./operations.js";
import { uiMessages } from "./ui.js";
import { notificationsMessages } from "./notifications.js";
import { viewsMessages } from "./views.js";
import { translationLanguagesMessages } from "./translationLanguages.js";
import { keyBindingsMessages } from "./keyBindings.js";
import { quickStartMessages } from "./quickStart.js";
import { languagesMessages } from "./languages.js";
import { telemetryMessages } from "./telemetry.js";
import { publishingMessages } from "./publishing.js";
import { skillsMessages } from "./skills.js";

export const ptBR: Record<MessageId, string> = {
    ...previewMessages,
    ...editorMessages,
    ...typographyMessages,
    ...settingsMessages,
    ...settingsMessages2,
    ...spellingMessages,
    ...errorsMessages,
    ...electronMessages,
    ...articleMessages,
    ...articleFilesMessages,
    ...workspaceMessages,
    ...styleProfileMessages,
    ...statusMessages,
    ...revisionsMessages,
    ...navigationMessages,
    ...articleWorkspaceMessages,
    ...draftSaveMessages,
    ...draftConflictMessages,
    ...articleHeaderMessages,
    ...assistantMessages,
    ...operationsMessages,
    ...uiMessages,
    ...notificationsMessages,
    ...viewsMessages,
    ...translationLanguagesMessages,
    ...keyBindingsMessages,
    ...quickStartMessages,
    ...languagesMessages,
    ...telemetryMessages,
    ...publishingMessages,
    ...skillsMessages,
};
