import type { MessageId } from "../../messages.js";


export const statusMessages = {
    "status.article": "글 상태",
    "status.characterCount": "{characterCount} / {characterLimit}자",
    "status.characterCount.ariaLabel": "글자 수: {characterCount} / {characterLimit}자. 글자 수 제한을 선택하세요.",
    "status.characterLimitPresets": "글자 수 제한 프리셋",
    "status.revision": "v{revisionNumber}",
    "status.revisionMenu": "저장된 버전",
    "status.revisionSelector": "현재 저장된 버전 v{revisionNumber}. 저장된 버전을 선택하세요.",
    "status.updateAvailable": "업데이트 {version} 사용 가능",
    "status.updateDownloading": "업데이트 다운로드 중",
    "status.updateFailed": "업데이트 확인 실패",
    "status.updateReady": "업데이트 준비 완료. 다시 시작하세요",
    "status.windowsUpdateAvailable": "업데이트 {version} 다운로드 및 다음 Warplyn 실행 시 자동 설치 승인",
    "status.windowsUpdateReady": "업데이트를 다운로드했습니다. 다음에 Warplyn을 열면 자동으로 적용됩니다.",
} satisfies Partial<Record<MessageId, string>>;
