import type { MessageId } from "../messages.js";
import { articleMessages } from "./ko/article.js";
import { articleFilesMessages } from "./ko/articleFiles.js";
import { workspaceMessages } from "./ko/workspace.js";
import { statusMessages } from "./ko/status.js";
import { revisionsMessages } from "./ko/revisions.js";
import { navigationMessages } from "./ko/navigation.js";
import { articleWorkspaceMessages } from "./ko/articleWorkspace.js";
import { draftSaveMessages } from "./ko/draftSave.js";
import { draftConflictMessages } from "./ko/draftConflict.js";
import { articleHeaderMessages } from "./ko/articleHeader.js";
import { operationsMessages } from "./ko/operations.js";
import { uiMessages } from "./ko/ui.js";
import { notificationsMessages } from "./ko/notifications.js";
import { translationLanguagesMessages } from "./ko/translationLanguages.js";
import { keyBindingsMessages } from "./ko/keyBindings.js";
import { quickStartMessages } from "./ko/quickStart.js";
import { languagesMessages } from "./ko/languages.js";
import { telemetryMessages } from "./ko/telemetry.js";
import { publishingMessages } from "./ko/publishing.js";
import { skillsMessages } from "./ko/skills.js";
import { typographyMessages } from "./ko/typography.js";
import { styleProfileMessages } from "./ko/styleProfile.js";
import { previewMessages } from "./ko/preview.js";
import { editorMessages } from "./ko/editor.js";
import { spellingMessages } from "./ko/spelling.js";
import { settingsMessages } from "./ko/settings.js";
import { assistantMessages } from "./ko/assistant.js";
import { viewsMessages } from "./ko/views.js";
import { errorsMessages } from "./ko/errors.js";
import { electronMessages } from "./ko/electron.js";

export const ko: Record<MessageId, string> = {
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
    ...assistantMessages,
    ...viewsMessages,
    ...errorsMessages,
    ...electronMessages,
};
