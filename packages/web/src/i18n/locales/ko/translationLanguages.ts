import type { MessageId } from "../../messages.js";

export const translationLanguagesMessages = {
    "translationLanguages.search": "언어 또는 지역별 언어",
    "translationLanguages.placeholder": "언어 이름 또는 코드 입력",
    "translationLanguages.entryHint": "폴란드어나 스페인어, 아르헨티나와 같이 언어 또는 지역별 언어를 입력하세요. ja 또는 es-AR 같은 코드도 사용할 수 있습니다.",
    "translationLanguages.hint": "번역 품질은 모델과 대상 언어에 따라 달라집니다.",
    "translationLanguages.remove": "{language} 제거",
    "translationLanguages.add": "추가",
    "translationLanguages.existing": "번역 있음",
} satisfies Partial<Record<MessageId, string>>;
