import type { MessageId } from "../../messages.js";


export const settingsUpdatesMessages = {
    "settings.automaticUpdates": "Verifique automaticamente se há atualizações",
    "settings.automaticUpdatesHint": (
        "Verifica o GitHub quando o Warplyn é iniciado e diariamente enquanto ele permanece aberto. As atualizações são" +
        " baixadas somente quando você escolhe Baixar."
    ),
    "settings.checkNow": "Verifique agora",
    "settings.restartAndUpdate": "Reinicie e atualize",
    "settings.updateChanges": "Mudanças em {version}",
    "settings.updateChangesUnavailable": "Os detalhes da versão não estão disponíveis. Você ainda pode atualizar.",
    "settings.updateNetworkAccess": "Permitir acesso à rede para atualizações",
    "settings.updateNetworkAccessHint": (
        "Permite que Warplyn entre em contato com o GitHub para obter metadados de lançamento público e atual" +
        "izações que você escolher baixar. Ele nunca envia conteúdo de artigos, informações de conta, identif" +
        "icadores de dispositivos ou análises."
    ),
    "settings.updateNetworkPermissionDescription": (
        "Warplyn entrará em contato com api.github.com para obter metadados de lançamento público. Ele não en" +
        "viará conteúdo de artigos, informações de conta, identificadores de dispositivos ou análises."
    ),
    "settings.updateNetworkPermissionTitle": "Permitir que Warplyn verifique atualizações no GitHub?",
    "settings.updateRecovery": "Atualizar recuperação",
    "settings.updateStatus": "Atualizar status",
    "settings.updateStatusHint": "Versão atual: {version}",
    "settings.updateStatusUnavailableHint": "As configurações de atualização se aplicam quando esta versão oferece suporte a atualizações.",
    "settings.updates": "Atualizações",
    "settings.updatesAvailable": "Versão {version} está disponível.",
    "settings.updatesChecking": "Verificando atualizações…",
    "settings.updatesCurrent": "Você tem a versão mais recente.",
    "settings.updatesError.apply_failed": (
        "Não foi possível preparar a atualização. Tente novamente ou abra a recuperação de atualização para o" +
        "bter ajuda."
    ),
    "settings.updatesError.discovery_failed": "Não foi possível verificar se há atualizações. Tente novamente.",
    "settings.updatesError.download_failed": "Não foi possível baixar a atualização. Tente novamente.",
    "settings.updatesNetworkAccessRequired": "Permitir acesso à rede para verificar atualizações.",
    "settings.updatesUnavailable": "As atualizações não estão disponíveis nesta versão.",
    "settings.viewReleaseNotes": "Ver notas de lançamento",
    "settings.windowsUpdateDownloadHint": (
        "Baixar uma atualização também aprova a instalação. Depois de baixado, ele será aplicado automaticame" +
        "nte na próxima vez que você abrir o Warplyn, inclusive após fechar o aplicativo normalmente."
    ),
} satisfies Partial<Record<MessageId, string>>;
