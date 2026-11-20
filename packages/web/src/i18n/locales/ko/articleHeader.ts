import type { MessageId } from "../../messages.js";


export const articleHeaderMessages = {
    "articleHeader.archiveArticle": "글 보관",
    "articleHeader.archived": "보관됨",
    "articleHeader.authorEdit": "작성자 편집",
    "articleHeader.confirmDeleteArticle": "글 삭제",
    "articleHeader.copied": "복사됨",
    "articleHeader.copy": "복사",
    "articleHeader.copyFailed": "복사 실패",
    "articleHeader.copyMarkdown": "Markdown 복사",
    "articleHeader.copyOptions": "복사 옵션",
    "articleHeader.copyPlainText": "일반 텍스트 복사",
    "articleHeader.deleteArticle": "글 삭제",
    "articleHeader.deleteConfirmationDescription": "‘{articleTitle}’ 및 저장된 모든 버전과 복구 가능한 초안을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    "articleHeader.deleteConfirmationTitle": "글을 삭제하시겠습니까?",
    "articleHeader.deleteGroupConfirmationDescription": (
        "{count, plural, one {‘{articleTitle}’ (글 1개)} other {‘{articleTitle}’ 및 번역을 포함한 글 #개}} 및 관련된 모든 초안과 저장된 버전 기록을" +
        " 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    ),
    "articleHeader.facts": "팩트 체크",
    "articleHeader.flow": "흐름과 명료성",
    "articleHeader.focusMode": "집중 모드",
    "articleHeader.leaveFocusMode": "집중 모드 나가기",
    "articleHeader.metadata": "글 맥락",
    "articleHeader.narrative": "서술형 초안",
    "articleHeader.rename": "글 제목 바꾸기: {articleTitle}",
    "articleHeader.saveRevision": "버전 저장",
    "articleHeader.sourceLanguage": "원문 언어",
    "articleHeader.style": "문체 검토",
    "articleHeader.talkingPoints": "핵심 내용",
    "articleHeader.title": "글 제목",
    "articleHeader.translate": "번역",
    "articleHeader.unarchiveArticle": "글 보관 해제",
    "articleHeader.workflow": "추천 편집 순서",
} satisfies Partial<Record<MessageId, string>>;
