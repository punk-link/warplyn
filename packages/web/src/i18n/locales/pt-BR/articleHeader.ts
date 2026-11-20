import type { MessageId } from "../../messages.js";


export const articleHeaderMessages = {
    "articleHeader.archiveArticle": "Arquivar artigo",
    "articleHeader.archived": "Arquivado",
    "articleHeader.authorEdit": "Edição do autor",
    "articleHeader.confirmDeleteArticle": "Excluir artigo",
    "articleHeader.copied": "Copiado",
    "articleHeader.copy": "Cópia",
    "articleHeader.copyFailed": "Falha na cópia",
    "articleHeader.copyMarkdown": "Copiar redução",
    "articleHeader.copyOptions": "Opções de cópia",
    "articleHeader.copyPlainText": "Copiar texto simples",
    "articleHeader.deleteArticle": "Excluir artigo",
    "articleHeader.deleteConfirmationDescription": (
        "Excluir “{articleTitle}” e todas as suas versões salvas e rascunhos recuperáveis? Isso não pode ser desfeito."
    ),
    "articleHeader.deleteConfirmationTitle": "Excluir artigo?",
    "articleHeader.deleteGroupConfirmationDescription": (
        "Excluir {count, plural, one {“{articleTitle}” (1 artigo)} other {“{articleTitle}” e # artigos inclui" +
        "ndo traduções}}, com todos os rascunhos e histórico de versões salvas afetados? Isto não pode ser de" +
        "sfeito."
    ),
    "articleHeader.facts": "Verificação de fatos",
    "articleHeader.flow": "Fluxo e clareza",
    "articleHeader.focusMode": "Modo de foco",
    "articleHeader.leaveFocusMode": "Sair do modo de foco",
    "articleHeader.metadata": "Contexto do artigo",
    "articleHeader.narrative": "Rascunho narrativo",
    "articleHeader.rename": "Renomear artigo: {articleTitle}",
    "articleHeader.saveRevision": "Salvar versão",
    "articleHeader.sourceLanguage": "Idioma de origem",
    "articleHeader.style": "Revisão de estilo",
    "articleHeader.talkingPoints": "Pontos de discussão",
    "articleHeader.title": "Título do artigo",
    "articleHeader.translate": "Tradução",
    "articleHeader.unarchiveArticle": "Desarquivar artigo",
    "articleHeader.workflow": "Fluxo de trabalho editorial sugerido",
} satisfies Partial<Record<MessageId, string>>;
