import type { MessageId } from "../../messages.js";


export const quickStartMessages = {
    "quickStart.addModelKey": "모델 키 추가",
    "quickStart.assistant.description": "오른쪽 패널에서 편집, 검토, 번역, 팩트 체크를 요청하세요. AI의 변경 사항은 수락하기 전까지 제안으로 남으며, 검토 의견은 참고용입니다.",
    "quickStart.assistant.title": "도우미에게 요청하세요.",
    "quickStart.close": "시작 가이드 닫기",
    "quickStart.modelKey.description": (
        "모델 키는 AI 제공업체의 API 키입니다. 데스크톱 앱에서 제공업체를 선택하고 키를 붙여넣어 운영체제 자격 증명 저장소에 저장한 뒤, 모델 목록을 새로 고침하고 기본 모델을 선택하세요. Warpl" +
        "yn은 저장된 키를 다시 표시하지 않습니다."
    ),
    "quickStart.modelKey.title": "모델 키를 추가하세요.",
    "quickStart.skip": "시작 가이드 건너뛰기",
    "quickStart.startWriting": "글쓰기 시작",
    "quickStart.title": "Warplyn에 오신 것을 환영합니다",
    "quickStart.write.description": "왼쪽 패널에서 글을 만들거나 연 뒤 가운데 작업 공간에서 작성하세요. Warplyn은 초안 복구 상태와 저장된 버전 기록을 유지합니다.",
    "quickStart.write.title": "글을 작성하세요.",
} satisfies Partial<Record<MessageId, string>>;
