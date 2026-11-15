import type { MessageId } from "../../messages.js";

export const articleFilesMessages = {
    "articleFiles.save": "Salvar em arquivo",
    "articleFiles.load": "Carregar do arquivo",
    "articleFiles.menuSave": "Salvar em arquivo…",
    "articleFiles.menuLoad": "Carregar do arquivo…",
    "articleFiles.saved": "Artigo salvo em arquivo",
    "articleFiles.downloadStarted": "O download do artigo foi iniciado",
    "articleFiles.loaded": "Artigo carregado do arquivo",
    "articleFiles.loadFailed": "Não foi possível carregar o artigo. Escolha um arquivo Markdown, HTML, DOCX ou RTF legível e tente novamente.",
    "articleFiles.saveFailed": "Não foi possível salvar o artigo no arquivo. Escolha um local gravável e tente novamente.",
    "articleFiles.invalid": "Escolha um arquivo .md, .html, .docx ou .rtf válido. Arquivos Markdown e HTML devem usar UTF-8.",
    "articleFiles.format": "Formato de arquivo",
    "articleFiles.formatMarkdown": "Remarcação (.md)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatDocx": "Palavra (.docx)",
    "articleFiles.formatRtf": "Texto rico (.rtf)",
    "articleFiles.review": "Revise o artigo importado",
    "articleFiles.layoutWarning": (
        "Parágrafos, listas e formatação básica são mantidos. Os layouts de página e de tabela são " +
        "simplificados. Imagens, comentários e objetos incorporados são omitidos. Revise o artigo convertido " +
        "antes de importar."
    ),
    "articleFiles.import": "Importar",
    "articleFiles.download": "Download",
    "articleFiles.tooLarge": "Este arquivo de artigo excede o limite de 10 MiB. Escolha um arquivo menor ou encurte o artigo antes de salvar.",
} satisfies Partial<Record<MessageId, string>>;
