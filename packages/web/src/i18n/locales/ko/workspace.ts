import type { MessageId } from "../../messages.js";


export const workspaceMessages = {
    "workspace.acceptProposalFailed": "제안을 수락하지 못했습니다. 글은 변경되지 않았습니다. 다시 시도하세요.",
    "workspace.addModelKey": "모델 키 추가",
    "workspace.aiConnectionCapabilities": (
        "글을 작성하고 저장, 정리, 복사하거나 로컬에서 타이포그래피를 검사할 수 있습니다. 도우미 요청, 번역, 팩트 체크, 전체 문체 검토에는 지원되는 로컬 모델을 포함하여 설정된 모델" +
        " 연결이 필요합니다."
    ),
    "workspace.aiConnectionRequired": "로컬 글쓰기는 사용할 수 있습니다. 도우미를 사용하려면 모델을 설정하세요.",
    "workspace.badges.findings": "{count, plural, =0 {검토 의견 없음} other {검토 의견 #개}}",
    "workspace.badges.nearLimit": "제한에 근접",
    "workspace.badges.overLimit": "제한 초과",
    "workspace.badges.ready": "준비됨",
    "workspace.badges.review": "검토",
    "workspace.badges.stale": "오래됨",
    "workspace.createArticleFailed": "글을 만들지 못했습니다. 다시 시도하세요.",
    "workspace.createTranslationFailed": "번역 글을 만들지 못했습니다. 원본 글은 변경되지 않았습니다. 다시 시도하세요.",
    "workspace.deleteArticleFailed": "글을 삭제하지 못했습니다. 글은 그대로 남아 있습니다. 다시 시도하세요.",
    "workspace.loadingArticles": "로컬 글을 불러오는 중…",
    "workspace.renameArticleFailed": "글 제목을 바꾸지 못했습니다. 이전 제목이 그대로 저장되어 있습니다. 다시 시도하세요.",
    "workspace.resolveFindingFailed": "검토 의견을 업데이트하지 못했습니다. 글은 변경되지 않았습니다. 다시 시도하세요.",
    "workspace.restoreRevisionFailed": "저장된 버전을 복원하지 못했습니다. 글은 변경되지 않았습니다. 다시 시도하세요.",
    "workspace.revisionHistoryFailed": "저장된 버전 기록을 불러오지 못했습니다. 글은 변경되지 않았습니다. 새로 고침한 뒤 다시 시도하세요.",
    "workspace.saveFailed": "초안을 저장하지 못했습니다. 최근 변경 사항은 편집기에 남아 있습니다. 다시 저장해 보세요.",
    "workspace.serviceUnavailable": "로컬 서비스를 사용할 수 없습니다. 서비스를 시작한 뒤 다시 시도하세요.",
    "workspace.styleCorpusAddFailed": "텍스트를 문체 프로필에 추가하지 못했습니다. 문체 프로필은 변경되지 않았습니다. 다시 시도하세요.",
    "workspace.styleCorpusLoadFailed": "문체 프로필을 불러오지 못했습니다. 새로 고침한 뒤 다시 시도하세요.",
    "workspace.styleCorpusRebuildFailed": "문체 프로필을 다시 만들지 못했습니다. 이전 문체 프로필은 그대로 사용할 수 있습니다. 다시 시도하세요.",
    "workspace.styleCorpusRemoveFailed": "텍스트를 문체 프로필에서 제거하지 못했습니다. 문체 프로필은 변경되지 않았습니다. 다시 시도하세요.",
    "workspace.styleCorpusSnapshotFailed": "저장된 버전을 문체 프로필에 추가하지 못했습니다. 문체 프로필은 변경되지 않았습니다. 다시 시도하세요.",
    "workspace.styleCorpusUpdateFailed": "문체 프로필을 업데이트하지 못했습니다. 이전 문체 프로필이 그대로 저장되어 있습니다. 다시 시도하세요.",
    "workspace.styleRulesLoadFailed": "문체 프로필 규칙을 불러오지 못했습니다. 새로 고침한 뒤 다시 시도하세요.",
    "workspace.styleRulesSaveFailed": "문체 프로필 규칙을 저장하지 못했습니다. 이전 규칙이 그대로 저장되어 있습니다. 다시 시도하세요.",
    "workspace.tabs.ariaLabel": "글 작업 공간 보기",
    "workspace.tabs.factCheck": "팩트 체크",
    "workspace.tabs.proposal": "제안",
    "workspace.tabs.revisions": "버전",
    "workspace.tabs.styleProfile": "문체",
    "workspace.tabs.translations": "번역",
    "workspace.tabs.write": "글쓰기",
    "workspace.updateArticleFailed": "글을 업데이트하지 못했습니다. 최근 변경 사항은 편집기에 남아 있습니다. 다시 시도하세요.",
} satisfies Partial<Record<MessageId, string>>;
