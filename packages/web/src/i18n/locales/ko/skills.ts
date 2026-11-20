import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.loadFailed": "스킬을 불러오지 못했습니다. 다시 불러오거나 AI 설정을 다시 여세요.",
    "skills.validation.invalid_frontmatter": "이 스킬의 SKILL.md 파일 맨 위에 올바른 메타데이터 블록이 없습니다. ID, 이름, 설명, 버전을 추가한 뒤 다시 시도하세요.",
    "skills.validation.invalid_instructions": "이 스킬이 따를 Markdown 지침을 추가하세요. 지원되는 크기 제한을 지키세요.",
    "skills.validation.invalid_metadata": "스킬의 세부 정보를 확인하세요. 고유한 소문자 ID, 명확한 이름과 설명, 숫자 버전, 지원되는 범위 및 실행 설정을 사용하세요.",
    "skills.validation.invalid_reference": "이 스킬에 Warplyn이 사용할 수 없는 참조가 있습니다. references 폴더 안에 Markdown 파일로 참조를 보관하고 지원되는 크기 제한을 지키세요.",
    "skills.validation.package_too_large": "이 스킬 패키지가 너무 커서 Warplyn이 불러올 수 없습니다. 지침이나 참조 파일을 줄인 뒤 다시 시도하세요.",
    "skills.validation.unsafe_package": "지원되지 않는 파일이나 파일 위치가 포함되어 이 스킬 패키지를 사용할 수 없습니다. SKILL.md와 선언된 Markdown 참조만 남기세요.",
} satisfies Partial<Record<MessageId, string>>;
