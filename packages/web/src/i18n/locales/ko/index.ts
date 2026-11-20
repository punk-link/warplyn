import type { MessageId } from "../../messages.js";
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
import { typographyMessages } from "./typography.js";
import { styleProfileMessages } from "./styleProfile.js";
import { previewMessages } from "./preview.js";
import { editorMessages } from "./editor.js";
import { spellingMessages } from "./spelling.js";
import { settingsMessages } from "./settings.js";
import { assistantMessages } from "./assistant.js";
import { viewsMessages } from "./views.js";
import { errorsMessages } from "./errors.js";
import { electronMessages } from "./electron.js";

export const ko: Record<MessageId, string> = {
    "notes.markers": "편집 메모 {numbers}",
    "notes.add": "편집 메모 추가…",
    "notes.title": "편집 메모",
    "notes.count": "편집 메모{separator}{count}",
    "notes.select": "메모를 첨부할 텍스트를 선택하세요.",
    "notes.help": "첨부된 메모는 어시스턴트가 해당 구절을 작업할 때 지침이 됩니다. 메모는 글 본문과 별도로 저장됩니다.",
    "notes.empty": "아직 편집 메모가 없습니다.",
    "notes.detached": "다시 연결해야 함",
    "notes.edit": "메모 편집…",
    "notes.reattach": "선택한 텍스트에 첨부",
    "notes.reattachHelp": "편집기에서 새 구절을 선택한 다음 이 메모를 다시 열어 첨부하세요.",
    "notes.guidance": "어시스턴트 지침",
    "notes.failed": "메모를 변경하지 못했습니다. 지침을 보관한 후 글을 다시 열고 재시도하세요.",
    "notes.remove": "메모 삭제",
    "notes.save": "메모 저장",
    "notes.marker": "편집 메모 {number}",
    "notes.included": "이 요청에 첨부되는 메모",
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
