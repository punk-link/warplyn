import type { MessageId } from "../../messages.js";


export const revisionsMessages = {
    "revisions.acceptedProposal": "수락된 제안",
    "revisions.articleContent": "저장된 글 내용",
    "revisions.assistantEdit": "도우미 편집",
    "revisions.author": "작성자가 저장한 버전",
    "revisions.characterCount": "{count}자",
    "revisions.count": "{count, plural, =0 {저장된 버전 없음} other {저장된 버전 #개}}",
    "revisions.current": "현재",
    "revisions.currentExplanation": "현재 저장된 버전입니다.",
    "revisions.currentRevision": "현재 저장된 버전",
    "revisions.empty": "비어 있는 저장된 버전",
    "revisions.emptyContent": "이 버전에는 저장된 글 내용이 없습니다.",
    "revisions.heading": "저장된 버전 기록",
    "revisions.historyNavigation": "저장된 버전 기록",
    "revisions.inactive": "비활성",
    "revisions.initial": "최초 저장된 버전",
    "revisions.restore": "이 버전 복원",
    "revisions.restored": "복원된 버전",
    "revisions.restoredFromEarlier": "이전 버전에서 복원됨",
    "revisions.restoredTarget": "복원된 버전 #{number}",
    "revisions.restoredTargetDescribed": "복원된 버전 #{number} — {description}",
    "revisions.revision": "저장된 버전",
    "revisions.saved": "저장된 버전",
    "revisions.select": "저장된 버전 선택",
} satisfies Partial<Record<MessageId, string>>;
