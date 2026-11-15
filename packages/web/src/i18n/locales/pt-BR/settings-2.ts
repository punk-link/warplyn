import type { MessageId } from "../../messages.js";

export const settingsMessages2 = {
    "settings.updateNetworkPermissionTitle": "Permitir que Warplyn verifique atualizações no GitHub?",
    "settings.updateNetworkPermissionDescription": (
        "Warplyn entrará em contato com api.github.com para obter metadados de lançamento público. Ele não " +
        "enviará conteúdo de artigos, informações de conta, identificadores de dispositivos ou análises."
    ),
    "settings.allowNetworkAccess": "Permitir",
    "settings.automaticUpdates": "Verifique automaticamente se há atualizações",
    "settings.automaticUpdatesHint": (
        "Verifica o GitHub quando o Warplyn é iniciado e diariamente enquanto ele permanece aberto. As " +
        "atualizações são baixadas somente quando você escolhe Baixar."
    ),
    "settings.windowsUpdateDownloadHint": (
        "Baixar uma atualização também aprova a instalação. Depois de baixado, ele será aplicado " +
        "automaticamente na próxima vez que você abrir o Warplyn, inclusive após fechar o aplicativo " +
        "normalmente."
    ),
    "settings.includePrereleaseUpdates": "Incluir atualizações de pré-lançamento",
    "settings.includePrereleaseUpdatesHint": "Quando desativado, o Warplyn oferece apenas versões estáveis.",
    "settings.updateStatus": "Atualizar status",
    "settings.updateStatusHint": "Versão atual: {version}",
    "settings.updateStatusUnavailableHint": "As configurações de atualização se aplicam quando esta versão oferece suporte a atualizações.",
    "settings.updatesChecking": "Verificando atualizações…",
    "settings.updatesCurrent": "Você tem a versão mais recente.",
    "settings.updatesNetworkAccessRequired": "Permitir acesso à rede para verificar atualizações.",
    "settings.updatesUnavailable": "As atualizações não estão disponíveis nesta versão.",
    "settings.updatesAvailable": "Versão {version} está disponível.",
    "settings.updatesError.discovery_failed": "Não foi possível verificar se há atualizações. Tente novamente.",
    "settings.updatesError.download_failed": "Não foi possível baixar a atualização. Tente novamente.",
    "settings.updatesError.apply_failed": (
        "Não foi possível preparar a atualização. Tente novamente ou abra a recuperação de atualização para " +
        "obter ajuda."
    ),
    "settings.checkNow": "Verifique agora",
    "settings.viewReleaseNotes": "Ver notas de lançamento",
    "settings.updateChanges": "Mudanças em {version}",
    "settings.securityUpdate": "Atualização de segurança",
    "settings.updateChangesUnavailable": "Os detalhes da versão não estão disponíveis. Você ainda pode atualizar.",
    "settings.downloadUpdate": "Download",
    "settings.restartAndUpdate": "Reinicie e atualize",
    "settings.retry": "Tentar novamente",
    "settings.updateRecovery": "Atualizar recuperação",
    "settings.on": "Sobre",
    "settings.modelsLoadFailed": "Não foi possível carregar os modelos disponíveis. Suas configurações não foram alteradas. Tente novamente.",
    "settings.connectionAddFailed": (
        "Não foi possível adicionar essa conexão de IA. Suas configurações não foram alteradas. Verifique os " +
        "detalhes e tente novamente."
    ),
    "settings.connectionUpdateFailed": (
        "Não foi possível atualizar essa conexão AI. Suas configurações anteriores permanecem inalteradas. " +
        "Tente novamente."
    ),
    "settings.connectionRemoveFailed": "Não foi possível remover essa conexão AI. Ainda está disponível em Configurações. Tente novamente.",
    "settings.publishingSaveFailed": (
        "Não foi possível salvar as configurações de publicação. Suas configurações anteriores permanecem " +
        "inalteradas. Tente novamente."
    ),
    "settings.customProfileName": "Nome de perfil personalizado",
    "settings.customProfileNameHint": "O rótulo local usado para seu limite de publicação personalizado.",
    "settings.customProfileLimit": "Limite de caracteres personalizado",
    "settings.customProfileLimitHint": "Um limite de orientação não negativo. Nunca bloqueia a cópia.",
    "settings.customProfileInvalid": "Insira um nome e um limite inteiro de caracteres não negativos.",
    "settings.saveCustomProfile": "Salvar perfil personalizado",
    "settings.customProfiles": "Perfis personalizados",
    "settings.customProfilesHint": "Adicione quantos perfis locais com limite de caracteres forem necessários.",
    "settings.addCustomProfile": "Adicionar perfil personalizado",
    "settings.remove": "Remover",
    "settings.removeCustomProfile": "Remover {name}",
    "settings.removeCustomProfileTitle": "Remover perfil personalizado?",
    "settings.removeCustomProfileDescription": "Remover <profile>{name}</profile> de seus perfis de publicação locais?",
    "settings.removeCustomDefaultDescription": "Remover <profile>{name}</profile>? O perfil de publicação padrão será revertido para Padrão.",
    "settings.defaultAssistantEditMode": "Modo de edição padrão do Assistente",
    "settings.defaultAssistantEditModeHint": (
        "As conversas sobre novos artigos usam este modo; as conversas existentes mantêm as deles. O modo " +
        "direto ignora a revisão da proposta apenas para edições solicitadas explicitamente. Outras propostas " +
        "ainda precisam de revisão."
    ),
    "settings.assistantBehavior": "Edição e solicitações",
    "settings.showExecutionProgress": "Mostrar o progresso da execução",
    "settings.showExecutionProgressHint": "Mostre a ação atual e uma trilha de atividade recolhível no bate-papo do Assistente.",
} satisfies Partial<Record<MessageId, string>>;
