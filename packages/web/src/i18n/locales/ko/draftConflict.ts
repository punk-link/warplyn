import type { MessageId } from "../../messages.js";


export const draftConflictMessages = {
    "draftConflict.banner": "다른 Warplyn 세션에서 이 글을 변경했습니다. 로컬 초안은 유지되었습니다. 계속하기 전에 비교하세요.",
    "draftConflict.cancel": "취소",
    "draftConflict.compare": "비교 및 해결",
    "draftConflict.confirmDraft": "유지된 로컬 텍스트를 최근 저장된 초안으로 바꾸시겠습니까?",
    "draftConflict.confirmRevision": "저장된 초안을 버리고 유지된 로컬 텍스트를 최근 저장된 버전으로 바꾸시겠습니까?",
    "draftConflict.description": "유지된 로컬 초안이 최근 저장된 내용 옆에 표시됩니다. 선택하기 전에는 아무것도 바뀌지 않습니다.",
    "draftConflict.heading": "초안 충돌 해결",
    "draftConflict.keepMine": "내 초안 유지",
    "draftConflict.useDraft": "최신 초안 사용",
    "draftConflict.useRevision": "최근 저장된 버전 사용",
} satisfies Partial<Record<MessageId, string>>;
