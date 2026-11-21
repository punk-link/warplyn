import type { MessageId } from "../../messages.js";


export const electronMessages = {
    "electron.articleFiles.docx": "Word 파일",
    "electron.articleFiles.html": "HTML 파일",
    "electron.articleFiles.load": "파일에서 글 불러오기",
    "electron.articleFiles.markdown": "Markdown 파일",
    "electron.articleFiles.rtf": "서식 있는 텍스트 파일",
    "electron.articleFiles.save": "글을 파일로 저장",
    "electron.closeFailed.message": "초안 검사점은 저장되었지만 로컬 데이터베이스가 정상적으로 닫히지 않았습니다.",
    "electron.closeFailed.title": "Warplyn을 정상적으로 종료하지 못했습니다",
    "electron.deleteData.backup": "삭제 전 백업 만들기",
    "electron.deleteData.cancel": "취소",
    "electron.deleteData.delete": "모든 로컬 데이터 삭제",
    "electron.deleteData.detail": "삭제 후 Warplyn이 종료됩니다. 백업 폴더가 설정되어 있으면 먼저 백업을 만들 수 있습니다.",
    "electron.deleteData.message": "Warplyn 데이터 폴더에 있는 글, 초안 검사점, 저장된 버전, 도우미 기록, 문체 데이터, 설정 및 로컬 백업이 영구적으로 삭제됩니다.",
    "electron.deleteData.title": "Warplyn의 모든 로컬 데이터를 삭제할까요?",
    "electron.draftCheckpointFailed.detail": "글로 돌아가 다시 시도하거나, 저장되지 않은 최신 변경 사항을 버리고 종료하세요.",
    "electron.draftCheckpointFailed.message": "Warplyn이 최신 초안 검사점을 저장하지 못했습니다.",
    "electron.draftCheckpointFailed.quit": "최신 검사점 없이 종료",
    "electron.draftCheckpointFailed.return": "글로 돌아가기",
    "electron.draftCheckpointFailed.title": "초안 검사점 저장 실패",
    "electron.restoreBackup.cancel": "취소",
    "electron.restoreBackup.detail": (
        "Warplyn이 최신 초안 검사점을 저장하고 현재 데이터의 복구용 사본을 보관한 후 다시 시작합니다. 기존 AI 연결은 로컬에 유지됩니다. 환경 변수 참조는 복원할 수 있지만 API 키와 변수 값은" +
        " 가져오지 않습니다. 설정에서 이 작업을 실행 취소할 수 없습니다."
    ),
    "electron.restoreBackup.message": "Warplyn의 현재 로컬 데이터가 선택한 백업으로 교체됩니다.",
    "electron.restoreBackup.restore": "복원 후 다시 시작",
    "electron.restoreBackup.title": "이 백업을 복원할까요?",
    "electron.restoreFailed.message": "이 데이터를 사용하는 다른 Warplyn 창이나 로컬 개발 서버를 닫고 다시 시도하세요. 현재 데이터는 변경되지 않았습니다.",
    "electron.restoreFailed.title": "백업을 복원하지 못했습니다",
    "electron.spelling.addWord": "사전에 추가",
    "electron.startFailed.message": "로컬 데이터 폴더를 사용할 수 있는지 확인한 후 다시 시도하세요.",
    "electron.startFailed.title": "Warplyn을 시작하지 못했습니다",
} satisfies Partial<Record<MessageId, string>>;
