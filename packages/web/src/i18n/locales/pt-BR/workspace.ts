import type { MessageId } from "../../messages.js";

export const workspaceMessages = {
    "workspace.tabs.write": "Escrever",
    "workspace.tabs.proposal": "Propostas",
    "workspace.tabs.revisions": "Versões salvas",
    "workspace.tabs.factCheck": "Verificação de fatos",
    "workspace.tabs.styleProfile": "Perfil de estilo",
    "workspace.tabs.translations": "Traduções",
    "workspace.tabs.ariaLabel": "Visualizações do espaço de trabalho do artigo",
    "workspace.badges.review": "Análise",
    "workspace.badges.stale": "Obsoleto",
    "workspace.badges.findings": "{count, plural, =0 {Nenhum apontamento} one {# apontamento} other {# apontamentos}}",
    "workspace.badges.ready": "Preparar",
    "workspace.badges.nearLimit": "Perto do limite",
    "workspace.badges.overLimit": "Acima do limite",
    "workspace.loadingArticles": "Carregando seus artigos locais…",
    "workspace.serviceUnavailable": "Seu serviço local não está disponível. Inicie e tente novamente.",
    "workspace.aiConnectionRequired": "A escrita local está disponível. Configure um modelo para usar o Assistente.",
    "workspace.addModelKey": "Adicionar chave de modelo",
    "workspace.aiConnectionCapabilities": (
        "Você ainda pode escrever, salvar, organizar e copiar artigos e verificar a tipografia localmente. " +
        "Solicitações de assistente, traduções, verificações de fatos e revisões de estilo completas precisam " +
        "de uma conexão de modelo configurada, incluindo um modelo local compatível."
    ),
    "workspace.saveFailed": "Não foi possível salvar este rascunho. Suas alterações mais recentes ainda estão no editor. Tente salvar novamente.",
    "workspace.revisionHistoryFailed": "Não foi possível carregar o histórico de versões salvas. Seu artigo não foi alterado. Atualize e tente novamente.",
    "workspace.createArticleFailed": "Não foi possível criar este artigo. Tente novamente.",
    "workspace.updateArticleFailed": "Não foi possível atualizar este artigo. Suas alterações mais recentes ainda estão no editor. Tente novamente.",
    "workspace.renameArticleFailed": "Não foi possível renomear este artigo. Seu título anterior ainda está salvo. Tente novamente.",
    "workspace.deleteArticleFailed": "Não foi possível excluir este artigo. Ainda está disponível. Tente novamente.",
    "workspace.restoreRevisionFailed": "Não foi possível restaurar essa versão salva. Seu artigo não foi alterado. Tente novamente.",
    "workspace.styleCorpusLoadFailed": "Não foi possível carregar o perfil de estilo. Atualize e tente novamente.",
    "workspace.styleCorpusAddFailed": "Não foi possível adicionar esse texto ao perfil de estilo. Seu perfil de estilo não foi alterado. Tente novamente.",
    "workspace.styleCorpusRemoveFailed": (
        "Não foi possível remover esse texto do perfil de estilo. Seu perfil de estilo não foi alterado. " +
        "Tente novamente."
    ),
    "workspace.styleCorpusUpdateFailed": "Não foi possível atualizar o perfil de estilo. Seu perfil de estilo anterior ainda está salvo. Tente novamente.",
    "workspace.styleCorpusRebuildFailed": (
        "Não foi possível reconstruir o perfil de estilo. Seu perfil de estilo anterior ainda está " +
        "disponível. Tente novamente."
    ),
    "workspace.styleRulesLoadFailed": "Não foi possível carregar as regras do perfil de estilo. Atualize e tente novamente.",
    "workspace.styleRulesSaveFailed": "Não foi possível salvar as regras do perfil de estilo. Suas regras anteriores ainda estão salvas. Tente novamente.",
    "workspace.styleCorpusSnapshotFailed": (
        "Não foi possível adicionar essa versão salva ao perfil de estilo. Seu perfil de estilo não foi " +
        "alterado. Tente novamente."
    ),
    "workspace.resolveFindingFailed": "Não foi possível atualizar este apontamento. Seu artigo não foi alterado. Tente novamente.",
    "workspace.createTranslationFailed": "Não foi possível criar este artigo de tradução. Seu artigo original não foi alterado. Tente novamente.",
    "workspace.acceptProposalFailed": "Não foi possível aceitar esta proposta. Seu artigo não foi alterado. Tente novamente.",
} satisfies Partial<Record<MessageId, string>>;
