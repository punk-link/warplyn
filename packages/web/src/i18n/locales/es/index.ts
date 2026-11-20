import type { MessageId } from "../../messages.js";
import { preview } from "./preview.js";
import { editor } from "./editor.js";
import { typography } from "./typography.js";
import { settings } from "./settings.js";
import { settings2 } from "./settings-2.js";
import { spelling } from "./spelling.js";
import { errors } from "./errors.js";
import { electron } from "./electron.js";
import { article } from "./article.js";
import { articleFiles } from "./articleFiles.js";
import { workspace } from "./workspace.js";
import { styleProfile } from "./styleProfile.js";
import { status } from "./status.js";
import { revisions } from "./revisions.js";
import { navigation } from "./navigation.js";
import { articleWorkspace } from "./articleWorkspace.js";
import { draftSave } from "./draftSave.js";
import { draftConflict } from "./draftConflict.js";
import { articleHeader } from "./articleHeader.js";
import { assistant } from "./assistant.js";
import { operations } from "./operations.js";
import { ui } from "./ui.js";
import { notifications } from "./notifications.js";
import { views } from "./views.js";
import { views2 } from "./views-2.js";
import { translationLanguages } from "./translationLanguages.js";
import { keyBindings } from "./keyBindings.js";
import { quickStart } from "./quickStart.js";
import { languages } from "./languages.js";
import { telemetry } from "./telemetry.js";
import { publishing } from "./publishing.js";
import { skills } from "./skills.js";

export const es: Record<MessageId, string> = {
    "notes.markers": "Notas editoriales {numbers}",
    "notes.add": "Añadir nota editorial…",
    "notes.title": "Notas editoriales",
    "notes.count": "Notas editoriales{separator}{count}",
    "notes.select": "Selecciona texto para adjuntar una nota.",
    "notes.help": "Las notas adjuntas orientan al Asistente al trabajar en esos pasajes. Se guardan por separado del texto del artículo.",
    "notes.empty": "Aún no hay notas editoriales.",
    "notes.detached": "Necesita vincularse de nuevo",
    "notes.edit": "Editar nota…",
    "notes.reattach": "Adjuntar al texto seleccionado",
    "notes.reattachHelp": "Selecciona el nuevo pasaje en el editor y vuelve a abrir esta nota para adjuntarla.",
    "notes.guidance": "Indicaciones para el Asistente",
    "notes.failed": "No se pudo actualizar la nota. Conserva tus indicaciones, vuelve a abrir el artículo e inténtalo de nuevo.",
    "notes.remove": "Eliminar nota",
    "notes.save": "Guardar nota",
    "notes.marker": "Nota editorial {number}",
    "notes.included": "Notas que acompañan esta solicitud",
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
