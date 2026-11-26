import type { MessageId } from "../../messages.js";


export const workspaceMessages = {
    "workspace.saveProposalReviewFailed": "Não foi possível salvar a revisão da proposta. Tente a alteração novamente antes de fechar o aplicativo.",
    "workspace.acceptProposalFailed": "Não foi possível aceitar esta proposta. Seu artigo não foi alterado. Tente novamente.",
    "workspace.addModelKey": "Adicionar chave de modelo",
    "workspace.aiConnectionCapabilities": (
        "Você ainda pode escrever, salvar, organizar e copiar artigos e verificar a tipografia localmente. So" +
        "licitações de assistente, traduções, verificações de fatos e revisões de estilo completas precisam d" +
        "e uma conexão de modelo configurada, incluindo um modelo local compatível."
    ),
    "workspace.aiConnectionRequired": "A escrita local está disponível. Configure um modelo para usar o Assistente.",
    "workspace.badges.findings": "{count, plural, =0 {Nenhum apontamento} one {# apontamento} other {# apontamentos}}",
    "workspace.badges.nearLimit": "Perto do limite",
    "workspace.badges.overLimit": "Acima do limite",
    "workspace.badges.ready": "Preparar",
    "workspace.badges.review": "Análise",
    "workspace.badges.stale": "Obsoleto",
    "workspace.createArticleFailed": "Não foi possível criar este artigo. Tente novamente.",
    "workspace.createTranslationFailed": "Não foi possível criar este artigo de tradução. Seu artigo original não foi alterado. Tente novamente.",
    "workspace.deleteArticleFailed": "Não foi possível excluir este artigo. Ainda está disponível. Tente novamente.",
    "workspace.loadingArticles": "Carregando seus artigos locais…",
    "workspace.renameArticleFailed": "Não foi possível renomear este artigo. Seu título anterior ainda está salvo. Tente novamente.",
    "workspace.resolveFindingFailed": "Não foi possível atualizar este apontamento. Seu artigo não foi alterado. Tente novamente.",
    "workspace.restoreRevisionFailed": "Não foi possível restaurar essa versão salva. Seu artigo não foi alterado. Tente novamente.",
    "workspace.revisionHistoryFailed": "Não foi possível carregar o histórico de versões salvas. Seu artigo não foi alterado. Atualize e tente novamente.",
    "workspace.saveFailed": "Não foi possível salvar este rascunho. Suas alterações mais recentes ainda estão no editor. Tente salvar novamente.",
    "workspace.serviceUnavailable": "Seu serviço local não está disponível. Inicie e tente novamente.",
    "workspace.styleCorpusAddFailed": "Não foi possível adicionar esse texto ao perfil de estilo. Seu perfil de estilo não foi alterado. Tente novamente.",
    "workspace.styleCorpusLoadFailed": "Não foi possível carregar o perfil de estilo. Atualize e tente novamente.",
    "workspace.styleCorpusRebuildFailed": (
        "Não foi possível reconstruir o perfil de estilo. Seu perfil de estilo anterior ainda está disponível. Tente no" +
        "vamente."
    ),
    "workspace.styleCorpusRemoveFailed": (
        "Não foi possível remover esse texto do perfil de estilo. Seu perfil de estilo não foi alterado. Tent" +
        "e novamente."
    ),
    "workspace.styleCorpusSnapshotFailed": (
        "Não foi possível adicionar essa versão salva ao perfil de estilo. Seu perfil de estilo não foi alterado. Tente" +
        " novamente."
    ),
    "workspace.styleCorpusUpdateFailed": "Não foi possível atualizar o perfil de estilo. Seu perfil de estilo anterior ainda está salvo. Tente novamente.",
    "workspace.styleRulesLoadFailed": "Não foi possível carregar as regras do perfil de estilo. Atualize e tente novamente.",
    "workspace.styleRulesSaveFailed": "Não foi possível salvar as regras do perfil de estilo. Suas regras anteriores ainda estão salvas. Tente novamente.",
    "workspace.tabs.ariaLabel": "Visualizações do espaço de trabalho do artigo",
    "workspace.tabs.factCheck": "Checagem",
    "workspace.tabs.proposal": "Propostas",
    "workspace.tabs.revisions": "Versões",
    "workspace.tabs.styleProfile": "Estilo",
    "workspace.tabs.translations": "Traduções",
    "workspace.tabs.write": "Escrever",
    "workspace.updateArticleFailed": "Não foi possível atualizar este artigo. Suas alterações mais recentes ainda estão no editor. Tente novamente.",
} satisfies Partial<Record<MessageId, string>>;
