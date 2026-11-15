import type { MessageId } from "../messages.js";
import { previewMessages } from "./pt-BR/preview.js";
import { editorMessages } from "./pt-BR/editor.js";
import { typographyMessages } from "./pt-BR/typography.js";
import { settingsMessages } from "./pt-BR/settings.js";
import { settingsMessages2 } from "./pt-BR/settings-2.js";
import { spellingMessages } from "./pt-BR/spelling.js";
import { errorsMessages } from "./pt-BR/errors.js";
import { electronMessages } from "./pt-BR/electron.js";
import { articleMessages } from "./pt-BR/article.js";
import { articleFilesMessages } from "./pt-BR/articleFiles.js";
import { workspaceMessages } from "./pt-BR/workspace.js";
import { styleProfileMessages } from "./pt-BR/styleProfile.js";
import { statusMessages } from "./pt-BR/status.js";
import { revisionsMessages } from "./pt-BR/revisions.js";
import { navigationMessages } from "./pt-BR/navigation.js";
import { articleWorkspaceMessages } from "./pt-BR/articleWorkspace.js";
import { draftSaveMessages } from "./pt-BR/draftSave.js";
import { draftConflictMessages } from "./pt-BR/draftConflict.js";
import { articleHeaderMessages } from "./pt-BR/articleHeader.js";
import { assistantMessages } from "./pt-BR/assistant.js";
import { operationsMessages } from "./pt-BR/operations.js";
import { uiMessages } from "./pt-BR/ui.js";
import { notificationsMessages } from "./pt-BR/notifications.js";
import { viewsMessages } from "./pt-BR/views.js";
import { translationLanguagesMessages } from "./pt-BR/translationLanguages.js";
import { keyBindingsMessages } from "./pt-BR/keyBindings.js";
import { quickStartMessages } from "./pt-BR/quickStart.js";
import { languagesMessages } from "./pt-BR/languages.js";
import { telemetryMessages } from "./pt-BR/telemetry.js";
import { publishingMessages } from "./pt-BR/publishing.js";
import { skillsMessages } from "./pt-BR/skills.js";

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
