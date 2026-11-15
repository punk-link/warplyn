import type { MessageId } from "../../messages.js";

export const articleHeaderMessages = {
    "articleHeader.title": "글 제목",
    "articleHeader.rename": "글 제목 바꾸기: {articleTitle}",
    "articleHeader.sourceLanguage": "원문 언어",
    "articleHeader.metadata": "글 맥락",
    "articleHeader.saveRevision": "버전 저장",
    "articleHeader.focusMode": "집중 모드",
    "articleHeader.leaveFocusMode": "집중 모드 나가기",
    "articleHeader.deleteArticle": "글 삭제",
    "articleHeader.deleteConfirmationTitle": "글을 삭제하시겠습니까?",
    "articleHeader.deleteConfirmationDescription": "‘{articleTitle}’ 및 저장된 모든 버전과 복구 가능한 초안을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    "articleHeader.deleteGroupConfirmationDescription": (
        "{count, plural, one {‘{articleTitle}’ (글 1개)} other {‘{articleTitle}’ 및 번역을 포함한 글 #개}} 및 관련된 모든 초안과 " +
        "저장된 버전 기록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    ),
    "articleHeader.archiveArticle": "글 보관",
    "articleHeader.archived": "보관됨",
    "articleHeader.unarchiveArticle": "글 보관 해제",
    "articleHeader.confirmDeleteArticle": "글 삭제",
    "articleHeader.workflow": "추천 편집 순서",
    "articleHeader.talkingPoints": "핵심 내용",
    "articleHeader.narrative": "서술형 초안",
    "articleHeader.authorEdit": "작성자 편집",
    "articleHeader.flow": "흐름과 명료성",
    "articleHeader.facts": "팩트 체크",
    "articleHeader.style": "문체 검토",
    "articleHeader.translate": "번역",
    "articleHeader.copy": "복사",
    "articleHeader.copied": "복사됨",
    "articleHeader.copyFailed": "복사 실패",
    "articleHeader.copyOptions": "복사 옵션",
    "articleHeader.copyMarkdown": "Markdown 복사",
    "articleHeader.copyPlainText": "일반 텍스트 복사",
} satisfies Partial<Record<MessageId, string>>;
