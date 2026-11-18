import type { MessageId } from "../../messages.js";

export const articleHeaderMessages = {
    "articleHeader.title": "Título do artigo",
    "articleHeader.rename": "Renomear artigo: {articleTitle}",
    "articleHeader.sourceLanguage": "Idioma de origem",
    "articleHeader.metadata": "Contexto do artigo",
    "articleHeader.saveRevision": "Salvar versão",
    "articleHeader.focusMode": "Modo de foco",
    "articleHeader.leaveFocusMode": "Sair do modo de foco",
    "articleHeader.deleteArticle": "Excluir artigo",
    "articleHeader.deleteConfirmationTitle": "Excluir artigo?",
    "articleHeader.deleteConfirmationDescription": (
        "Excluir “{articleTitle}” e todas as suas versões salvas e rascunhos recuperáveis? Isso não pode ser " +
        "desfeito."
    ),
    "articleHeader.deleteGroupConfirmationDescription": (
        "Excluir {count, plural, one {“{articleTitle}” (1 artigo)} other {“{articleTitle}” e # artigos " +
        "incluindo traduções}}, com todos os rascunhos e histórico de versões salvas afetados? Isto não pode " +
        "ser desfeito."
    ),
    "articleHeader.archiveArticle": "Arquivar artigo",
    "articleHeader.archived": "Arquivado",
    "articleHeader.unarchiveArticle": "Desarquivar artigo",
    "articleHeader.confirmDeleteArticle": "Excluir artigo",
    "articleHeader.workflow": "Fluxo de trabalho editorial sugerido",
    "articleHeader.talkingPoints": "Pontos de discussão",
    "articleHeader.narrative": "Rascunho narrativo",
    "articleHeader.authorEdit": "Edição do autor",
    "articleHeader.flow": "Fluxo e clareza",
    "articleHeader.facts": "Verificação de fatos",
    "articleHeader.style": "Revisão de estilo",
    "articleHeader.translate": "Tradução",
    "articleHeader.copy": "Cópia",
    "articleHeader.copied": "Copiado",
    "articleHeader.copyFailed": "Falha na cópia",
    "articleHeader.copyOptions": "Opções de cópia",
    "articleHeader.copyMarkdown": "Copiar redução",
    "articleHeader.copyPlainText": "Copiar texto simples",
} satisfies Partial<Record<MessageId, string>>;
