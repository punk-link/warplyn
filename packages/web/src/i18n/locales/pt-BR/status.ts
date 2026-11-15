import type { MessageId } from "../../messages.js";

export const statusMessages = {
    "status.article": "Status do artigo",
    "status.revision": "v{revisionNumber}",
    "status.revisionSelector": "Versão salva Atual v{revisionNumber}. Escolha uma versão salva.",
    "status.revisionMenu": "Versões salvas",
    "status.characterCount": "{characterCount} / {characterLimit} caracteres",
    "status.characterCount.ariaLabel": "Contagem de caracteres: {characterCount} de {characterLimit} caracteres. Escolha um limite de caracteres.",
    "status.characterLimitPresets": "Predefinições de limite de caracteres",
    "status.windowsUpdateReady": "Atualização baixada. Ela será aplicada automaticamente na próxima vez que você abrir o Warplyn.",
    "status.windowsUpdateAvailable": "Baixar atualização {version} e aprove a instalação automática na próxima vez que você abrir o Warplyn",
    "status.updateAvailable": "Atualização {version} disponível",
    "status.updateDownloading": "A atualização está sendo baixada",
    "status.updateReady": "A atualização está pronta para reiniciar",
    "status.updateFailed": "Falha na verificação de atualização",
} satisfies Partial<Record<MessageId, string>>;
