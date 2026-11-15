import type { MessageId } from "../messages.js";
import { electron } from "./it/electron.js";
import { assistant } from "./it/assistant.js";
import { assistant2 } from "./it/assistant2.js";
import { operations } from "./it/operations.js";
import { settings } from "./it/settings.js";
import { settings2 } from "./it/settings2.js";
import { settings3 } from "./it/settings3.js";
import { settings4 } from "./it/settings4.js";
import { revisions } from "./it/revisions.js";
import { publishing } from "./it/publishing.js";
import { telemetry } from "./it/telemetry.js";
import { status } from "./it/status.js";
import { workspace } from "./it/workspace.js";
import { errors } from "./it/errors.js";
import { skills } from "./it/skills.js";
import { navigation } from "./it/navigation.js";
import { articleWorkspace } from "./it/articleWorkspace.js";
import { draftSave } from "./it/draftSave.js";
import { draftConflict } from "./it/draftConflict.js";
import { articleHeader } from "./it/articleHeader.js";
import { preview } from "./it/preview.js";
import { editor } from "./it/editor.js";
import { keyBindings } from "./it/keyBindings.js";
import { quickStart } from "./it/quickStart.js";
import { languages } from "./it/languages.js";
import { spelling } from "./it/spelling.js";
import { article } from "./it/article.js";
import { articleFiles } from "./it/articleFiles.js";
import { styleProfile } from "./it/styleProfile.js";
import { views } from "./it/views.js";
import { views2 } from "./it/views2.js";
import { views3 } from "./it/views3.js";
import { translationLanguages } from "./it/translationLanguages.js";
import { typography } from "./it/typography.js";
import { typography2 } from "./it/typography2.js";
import { ui } from "./it/ui.js";
import { notifications } from "./it/notifications.js";

export const it: Record<MessageId, string> = {
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
