import type { MessageId } from "../../messages.js";

export const articleMessages = {
    "article.defaultTitle": "제목 없는 글",
    "article.titleGenerationFailed": "글 제목 없이 버전을 저장했습니다",
    "article.titleContextRequired": "내용을 더 추가한 뒤 새 버전을 저장하거나 글 제목을 직접 바꾸세요.",
    "article.titleGenerationNextStep": "글 제목을 직접 바꾸거나 설정에서 텍스트 생성 모델을 확인한 뒤 새 버전을 저장하세요.",
} satisfies Partial<Record<MessageId, string>>;
