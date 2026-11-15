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
