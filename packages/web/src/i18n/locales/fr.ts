import type { MessageId } from "../messages.js";
import { assistantMessages } from "./fr/assistant.js";
import { previewMessages } from "./fr/preview.js";
import { editorMessages } from "./fr/editor.js";
import { spellingMessages } from "./fr/spelling.js";
import { electronMessages } from "./fr/electron.js";
import { errorsMessages } from "./fr/errors.js";
import { settingsMessages } from "./fr/settings.js";
import { settingsMessages2 } from "./fr/settings-2.js";
import { typographyMessages } from "./fr/typography.js";
import { styleProfileMessages } from "./fr/styleProfile.js";
import { viewsMessages } from "./fr/views.js";
import { articleMessages } from "./fr/article.js";
import { articleFilesMessages } from "./fr/articleFiles.js";
import { workspaceMessages } from "./fr/workspace.js";
import { statusMessages } from "./fr/status.js";
import { revisionsMessages } from "./fr/revisions.js";
import { navigationMessages } from "./fr/navigation.js";
import { articleWorkspaceMessages } from "./fr/articleWorkspace.js";
import { draftSaveMessages } from "./fr/draftSave.js";
import { draftConflictMessages } from "./fr/draftConflict.js";
import { articleHeaderMessages } from "./fr/articleHeader.js";
import { operationsMessages } from "./fr/operations.js";
import { uiMessages } from "./fr/ui.js";
import { notificationsMessages } from "./fr/notifications.js";
import { translationLanguagesMessages } from "./fr/translationLanguages.js";
import { keyBindingsMessages } from "./fr/keyBindings.js";
import { quickStartMessages } from "./fr/quickStart.js";
import { languagesMessages } from "./fr/languages.js";
import { telemetryMessages } from "./fr/telemetry.js";
import { publishingMessages } from "./fr/publishing.js";
import { skillsMessages } from "./fr/skills.js";

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
