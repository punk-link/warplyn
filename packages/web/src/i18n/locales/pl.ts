import type { MessageId } from "../messages.js";
import { electron } from "./pl/electron.js";
import { assistant } from "./pl/assistant.js";
import { assistant2 } from "./pl/assistant2.js";
import { operations } from "./pl/operations.js";
import { settings } from "./pl/settings.js";
import { settings2 } from "./pl/settings2.js";
import { settings3 } from "./pl/settings3.js";
import { settings4 } from "./pl/settings4.js";
import { revisions } from "./pl/revisions.js";
import { publishing } from "./pl/publishing.js";
import { telemetry } from "./pl/telemetry.js";
import { status } from "./pl/status.js";
import { workspace } from "./pl/workspace.js";
import { errors } from "./pl/errors.js";
import { skills } from "./pl/skills.js";
import { navigation } from "./pl/navigation.js";
import { articleWorkspace } from "./pl/articleWorkspace.js";
import { draftSave } from "./pl/draftSave.js";
import { draftConflict } from "./pl/draftConflict.js";
import { articleHeader } from "./pl/articleHeader.js";
import { preview } from "./pl/preview.js";
import { editor } from "./pl/editor.js";
import { keyBindings } from "./pl/keyBindings.js";
import { quickStart } from "./pl/quickStart.js";
import { languages } from "./pl/languages.js";
import { spelling } from "./pl/spelling.js";
import { article } from "./pl/article.js";
import { articleFiles } from "./pl/articleFiles.js";
import { styleProfile } from "./pl/styleProfile.js";
import { views } from "./pl/views.js";
import { views2 } from "./pl/views2.js";
import { views3 } from "./pl/views3.js";
import { translationLanguages } from "./pl/translationLanguages.js";
import { typography } from "./pl/typography.js";
import { typography2 } from "./pl/typography2.js";
import { ui } from "./pl/ui.js";
import { notifications } from "./pl/notifications.js";

export const pl: Record<MessageId, string> = {
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
