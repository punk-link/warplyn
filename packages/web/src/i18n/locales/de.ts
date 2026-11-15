import type { MessageId } from "../messages.js";
import { articleMessages } from "./de/article.js";
import { articleFilesMessages } from "./de/articleFiles.js";
import { workspaceMessages } from "./de/workspace.js";
import { statusMessages } from "./de/status.js";
import { revisionsMessages } from "./de/revisions.js";
import { navigationMessages } from "./de/navigation.js";
import { articleWorkspaceMessages } from "./de/articleWorkspace.js";
import { draftSaveMessages } from "./de/draftSave.js";
import { draftConflictMessages } from "./de/draftConflict.js";
import { articleHeaderMessages } from "./de/articleHeader.js";
import { operationsMessages } from "./de/operations.js";
import { uiMessages } from "./de/ui.js";
import { notificationsMessages } from "./de/notifications.js";
import { translationLanguagesMessages } from "./de/translationLanguages.js";
import { keyBindingsMessages } from "./de/keyBindings.js";
import { quickStartMessages } from "./de/quickStart.js";
import { languagesMessages } from "./de/languages.js";
import { telemetryMessages } from "./de/telemetry.js";
import { publishingMessages } from "./de/publishing.js";
import { skillsMessages } from "./de/skills.js";
import { typographyMessages } from "./de/typography.js";
import { styleProfileMessages } from "./de/styleProfile.js";
import { previewMessages } from "./de/preview.js";
import { editorMessages } from "./de/editor.js";
import { spellingMessages } from "./de/spelling.js";
import { settingsMessages } from "./de/settings.js";
import { settingsMessages2 } from "./de/settings-2.js";
import { assistantMessages } from "./de/assistant.js";
import { viewsMessages } from "./de/views.js";
import { errorsMessages } from "./de/errors.js";
import { electronMessages } from "./de/electron.js";

export const de: Record<MessageId, string> = {
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
