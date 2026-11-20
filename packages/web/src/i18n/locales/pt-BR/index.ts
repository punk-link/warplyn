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
    "notes.markers": "Notas editoriais {numbers}",
    "notes.add": "Adicionar nota editorial…",
    "notes.title": "Notas editoriais",
    "notes.count": "Notas editoriais{separator}{count}",
    "notes.select": "Selecione o texto para anexar uma nota.",
    "notes.help": "As notas anexadas orientam o Assistente ao trabalhar nos trechos. Elas ficam separadas do texto do artigo.",
    "notes.empty": "Ainda não há notas editoriais.",
    "notes.detached": "Precisa ser anexada novamente",
    "notes.edit": "Editar nota…",
    "notes.reattach": "Anexar ao texto selecionado",
    "notes.reattachHelp": "Selecione o novo trecho no editor e reabra esta nota para anexá-la.",
    "notes.guidance": "Orientações para o Assistente",
    "notes.failed": "Não foi possível atualizar a nota. Preserve suas orientações, reabra o artigo e tente novamente.",
    "notes.remove": "Remover nota",
    "notes.save": "Salvar nota",
    "notes.marker": "Nota editorial {number}",
    "notes.included": "Notas que acompanham esta solicitação",
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
