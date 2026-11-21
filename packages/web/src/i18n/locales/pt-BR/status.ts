import type { MessageId } from "../../messages.js";


export const statusMessages = {
    "status.article": "Status do artigo",
    "status.characterCount": "{characterCount} / {characterLimit} caracteres",
    "status.characterCount.ariaLabel": "Contagem de caracteres: {characterCount} de {characterLimit} caracteres. Escolha um limite de caracteres.",
    "status.characterLimitPresets": "Predefinições de limite de caracteres",
    "status.revision": "v{revisionNumber}",
    "status.revisionMenu": "Versões salvas",
    "status.revisionSelector": "Versão salva Atual v{revisionNumber}. Escolha uma versão salva.",
    "status.updateAvailable": "Atualização {version} disponível",
    "status.updateDownloading": "A atualização está sendo baixada",
    "status.updateFailed": "Falha na verificação de atualização",
    "status.updateReady": "A atualização está pronta para reiniciar",
    "status.windowsUpdateAvailable": "Baixar atualização {version} e aprove a instalação automática na próxima vez que você abrir o Warplyn",
    "status.windowsUpdateReady": "Atualização baixada. Ela será aplicada automaticamente na próxima vez que você abrir o Warplyn.",
} satisfies Partial<Record<MessageId, string>>;
