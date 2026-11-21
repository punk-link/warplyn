import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.discardPrompt": "메모의 저장하지 않은 변경 사항을 버릴까요?",
    "notes.discardChanges": "변경 사항 버리기",
    "notes.add": "편집 메모 추가…",
    "notes.count": "편집 메모{separator}{count}",
    "notes.detached": "다시 연결해야 함",
    "notes.edit": "메모 편집…",
    "notes.empty": "아직 편집 메모가 없습니다.",
    "notes.failed": "메모를 변경하지 못했습니다. 지침을 보관한 후 글을 다시 열고 재시도하세요.",
    "notes.guidance": "어시스턴트 지침",
    "notes.help": "첨부된 메모는 어시스턴트가 해당 구절을 작업할 때 지침이 됩니다. 메모는 글 본문과 별도로 저장됩니다.",
    "notes.included": "이 요청에 첨부되는 메모",
    "notes.marker": "편집 메모 {number}",
    "notes.markers": "편집 메모 {numbers}",
    "notes.reattach": "선택한 텍스트에 첨부",
    "notes.reattachHelp": "편집기에서 새 구절을 선택한 다음 이 메모를 다시 열어 첨부하세요.",
    "notes.remove": "메모 삭제",
    "notes.save": "메모 저장",
    "notes.select": "메모를 첨부할 텍스트를 선택하세요.",
    "notes.title": "편집 메모",
} satisfies Partial<Record<MessageId, string>>;
