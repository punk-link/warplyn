import type { MessageId } from "../messages.js";
import { preview } from "./es/preview.js";
import { editor } from "./es/editor.js";
import { typography } from "./es/typography.js";
import { settings } from "./es/settings.js";
import { settings2 } from "./es/settings-2.js";
import { spelling } from "./es/spelling.js";
import { errors } from "./es/errors.js";
import { electron } from "./es/electron.js";
import { article } from "./es/article.js";
import { articleFiles } from "./es/articleFiles.js";
import { workspace } from "./es/workspace.js";
import { styleProfile } from "./es/styleProfile.js";
import { status } from "./es/status.js";
import { revisions } from "./es/revisions.js";
import { navigation } from "./es/navigation.js";
import { articleWorkspace } from "./es/articleWorkspace.js";
import { draftSave } from "./es/draftSave.js";
import { draftConflict } from "./es/draftConflict.js";
import { articleHeader } from "./es/articleHeader.js";
import { assistant } from "./es/assistant.js";
import { operations } from "./es/operations.js";
import { ui } from "./es/ui.js";
import { notifications } from "./es/notifications.js";
import { views } from "./es/views.js";
import { views2 } from "./es/views-2.js";
import { translationLanguages } from "./es/translationLanguages.js";
import { keyBindings } from "./es/keyBindings.js";
import { quickStart } from "./es/quickStart.js";
import { languages } from "./es/languages.js";
import { telemetry } from "./es/telemetry.js";
import { publishing } from "./es/publishing.js";
import { skills } from "./es/skills.js";

export const es: Record<MessageId, string> = {
    ...preview,
    ...editor,
    ...typography,
    ...settings,
    ...settings2,
    ...spelling,
    ...errors,
    ...electron,
    ...article,
    ...articleFiles,
    ...workspace,
    ...styleProfile,
    ...status,
    ...revisions,
    ...navigation,
    ...articleWorkspace,
    ...draftSave,
    ...draftConflict,
    ...articleHeader,
    ...assistant,
    ...operations,
    ...ui,
    ...notifications,
    ...views,
    ...views2,
    ...translationLanguages,
    ...keyBindings,
    ...quickStart,
    ...languages,
    ...telemetry,
    ...publishing,
    ...skills,
};
