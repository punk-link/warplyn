import type { MessageId } from "../../messages.js";


export const skillsMessages = {
    "skills.recovery.title": "작성자 스킬 복구",
    "skills.recovery.message": "문제가 있는 작성자 스킬을 사용할 수 없습니다. 파일과 기록은 보존되어 있습니다. 스킬 파일의 충돌을 해결하거나 백업을 복원한 다음 복구를 다시 시도하세요. 글과 기본 제공 스킬은 계속 사용할 수 있습니다.",
    "skills.recovery.retry": "복구 다시 시도",
    "skills.recovery.review": "복구 검토",
    "skills.recovery.ready": "작성자 스킬을 사용할 수 있습니다.",
    "skills.recovery.loadFailed": "스킬 복구 상태를 확인하지 못했습니다. 다시 시도하거나 Warplyn을 다시 여세요.",
    "skills.recovery.retryFailed": "스킬 복구를 다시 시도하지 못했습니다. 파일은 보존되어 있습니다. 다시 시도하거나 백업을 복원하세요.",
    "skills.loadFailed": "스킬을 불러오지 못했습니다. 다시 불러오거나 AI 설정을 다시 여세요.",
    "skills.validation.invalid_frontmatter": "이 스킬의 SKILL.md 파일 맨 위에 올바른 메타데이터 블록이 없습니다. ID, 이름, 설명, 버전을 추가한 뒤 다시 시도하세요.",
    "skills.validation.invalid_instructions": "이 스킬이 따를 Markdown 지침을 추가하세요. 지원되는 크기 제한을 지키세요.",
    "skills.validation.invalid_metadata": "스킬의 세부 정보를 확인하세요. 고유한 소문자 ID, 명확한 이름과 설명, 숫자 버전, 지원되는 범위 및 실행 설정을 사용하세요.",
    "skills.validation.invalid_reference": "이 스킬에 Warplyn이 사용할 수 없는 참조가 있습니다. references 폴더 안에 Markdown 파일로 참조를 보관하고 지원되는 크기 제한을 지키세요.",
    "skills.validation.package_too_large": "이 스킬 패키지가 너무 커서 Warplyn이 불러올 수 없습니다. 지침이나 참조 파일을 줄인 뒤 다시 시도하세요.",
    "skills.validation.unsafe_package": "지원되지 않는 파일이나 파일 위치가 포함되어 이 스킬 패키지를 사용할 수 없습니다. SKILL.md와 선언된 Markdown 참조만 남기세요.",
} satisfies Partial<Record<MessageId, string>>;
