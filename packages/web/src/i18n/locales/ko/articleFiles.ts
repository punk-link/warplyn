import type { MessageId } from "../../messages.js";


export const articleFilesMessages = {
    "articleFiles.download": "다운로드",
    "articleFiles.downloadStarted": "글 다운로드를 시작했습니다",
    "articleFiles.format": "파일 형식",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatRtf": "서식 있는 텍스트 (.rtf)",
    "articleFiles.import": "가져오기",
    "articleFiles.invalid": "올바른 .md, .html, .docx 또는 .rtf 파일을 선택하세요. Markdown 및 HTML 파일은 UTF-8 인코딩이어야 합니다.",
    "articleFiles.layoutWarning": "문단, 목록, 기본 서식은 유지됩니다. 페이지 및 표 레이아웃은 단순화됩니다. 이미지, 댓글, 삽입된 개체는 제외됩니다. 가져오기 전에 변환된 글을 검토하세요.",
    "articleFiles.load": "파일에서 불러오기",
    "articleFiles.loadFailed": "글을 불러오지 못했습니다. 읽을 수 있는 Markdown, HTML, DOCX 또는 RTF 파일을 선택하고 다시 시도하세요.",
    "articleFiles.loaded": "파일에서 글을 불러왔습니다",
    "articleFiles.menuLoad": "파일에서 불러오기…",
    "articleFiles.menuSave": "파일로 저장…",
    "articleFiles.review": "가져올 글 검토",
    "articleFiles.save": "파일로 저장",
    "articleFiles.saveFailed": "글을 파일로 저장하지 못했습니다. 쓰기 가능한 위치를 선택하고 다시 시도하세요.",
    "articleFiles.saved": "글을 파일로 저장했습니다",
    "articleFiles.tooLarge": "글 파일이 10 MiB 제한을 초과합니다. 더 작은 파일을 선택하거나 글을 줄인 후 저장하세요.",
} satisfies Partial<Record<MessageId, string>>;
