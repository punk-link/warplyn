import type { MessageId } from "../../messages.js";


export const publishingMessages = {
    "publishing.characterCount": "{count}자",
    "publishing.charactersOverGuidance": "권장 기준보다 {count}자 초과",
    "publishing.charactersRemaining": "{count}자 남음 (권장 기준)",
    "publishing.copyFailed": "복사하지 못했습니다. 다시 시도하세요.",
    "publishing.default": "기본값",
    "publishing.defaultProfile": "기본 게시 프로필을 사용합니다.",
    "publishing.linkedInArticle": "LinkedIn 글",
    "publishing.linkedInPost": "LinkedIn 게시물",
    "publishing.markdownCopied": "Markdown을 복사했습니다.",
    "publishing.noRestrictions": "제한 없음",
    "publishing.plainTextCopied": "일반 텍스트를 복사했습니다.",
    "publishing.profileSaveFailed": "게시 프로필을 저장하지 못했습니다.",
} satisfies Partial<Record<MessageId, string>>;
