import type { MessageId } from "../../messages.js";


export const settingsBackupsMessages = {
    "settings.automaticBackupFailed": "자동 백업에 실패했습니다. 데이터 및 백업에서 백업 폴더를 확인한 뒤 수동 백업을 만드세요. 글은 변경되지 않았습니다.",
    "settings.automaticBackups": "자동 백업",
    "settings.automaticBackupsHint": "활성화하면 시작 직후 백업을 만들고, Warplyn이 열려 있는 동안 해당 실행 시점부터 24시간마다 백업합니다. 수동 백업은 자동으로 삭제하지 않습니다.",
    "settings.backupAutomation": "자동 백업",
    "settings.backupCreateFailed": "백업을 만들지 못했습니다. 선택한 폴더와 브라우저 크기 제한을 확인한 뒤 다시 시도하세요. 편집 세션은 변경되지 않았습니다.",
    "settings.backupCreateUnavailable": "이 브라우저 세션에서는 백업을 사용할 수 없습니다.",
    "settings.backupCreated": "{name} 생성됨",
    "settings.backupCreating": "백업 만드는 중…",
    "settings.backupFolder": "백업 폴더",
    "settings.backupFolderFailed": "폴더를 선택하지 못했습니다. 다시 시도하세요.",
    "settings.backupFolderHint": "백업 사본을 저장할 로컬 폴더를 선택하세요. Warplyn은 폴더를 선택한 후에만 그곳에 쓸 수 있습니다.",
    "settings.backupFolderPermissionDenied": "Warplyn이 이 백업 폴더에 접근할 수 없습니다. 폴더를 다시 선택하고 접근을 허용하세요.",
    "settings.backupFolderRequired": "먼저 백업 폴더를 선택하세요.",
    "settings.backupFolderSelected": "{folderName} 사용 중",
    "settings.backupFolderUnsupported": "이 브라우저에서는 백업 폴더를 선택할 수 없습니다.",
    "settings.backupSaveFailed": "백업 설정을 저장하지 못했습니다. 이전 설정은 변경되지 않았습니다. 다시 시도하세요.",
    "settings.backupStorage": "백업 저장소",
    "settings.chooseBackup": "백업 선택",
    "settings.chooseBackupFolder": "폴더 선택…",
    "settings.createBackup": "백업 만들기",
    "settings.createBackupHint": "글, 저장된 버전, 설정, 작성자 스킬 및 스킬 기록을 백업합니다. 브라우저 백업은 파일당 100 MB, 전체 500 MB까지 지원합니다. API 키는 포함하지 않습니다.",
    "settings.dataBackups": "데이터 및 백업",
    "settings.keepAllBackups": "모든 백업 보관",
    "settings.keepBackups": "백업 {count}개 보관",
    "settings.restoreBackup": "백업 복원",
    "settings.restoreBackupConfirm": "{name} 백업을 복원하시겠습니까? 현재 로컬 데이터를 바꾼 뒤 앱을 다시 불러옵니다.",
    "settings.restoreBackupFailed": "백업을 복원하지 못했습니다. 파일과 브라우저 크기 제한을 확인하거나 다른 백업을 선택하세요. 현재 데이터는 변경되지 않았습니다.",
    "settings.restoreBackupHint": (
        "선택한 폴더에서 백업을 고르세요. Warplyn은 파일을 검사하고 복구 사본을 보관한 뒤 글, 저장된 버전, 설정, 스킬을 복원합니다. 기존 AI 연결은 로컬에 유지됩니다. 환경 " +
        "변수 참조는 복원할 수 있지만 API 키와 변수 값은 가져오지 않습니다. 데이터베이스만 포함한 이전 백업은 현재 스킬을 유지합니다."
    ),
    "settings.restoreBackupUnavailable": "이 백업은 복원할 수 없습니다.",
    "settings.retention": "자동 백업 보관",
    "settings.retentionHint": "Warplyn이 보관할 자동 백업 수를 설정합니다. 수동 백업은 자동으로 삭제하지 않습니다.",
    "settings.revealBackupFolder": "폴더 열기",
} satisfies Partial<Record<MessageId, string>>;
