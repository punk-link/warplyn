import type { MessageId } from "../../messages.js";


export const settingsBackupsMessages = {
    "settings.automaticBackupFailed": (
        "Falha no backup automático. Verifique a pasta de backup em Dados e backups e crie um backup manual. Seus artig" +
        "os permanecem inalterados."
    ),
    "settings.automaticBackups": "Backups automáticos",
    "settings.automaticBackupsHint": (
        "Quando ativado, cria um backup logo após a inicialização e a cada 24 horas a partir dessa execução e" +
        "nquanto o Warplyn permanece aberto. Os backups manuais nunca são removidos automaticamente."
    ),
    "settings.backupAutomation": "Backups automáticos",
    "settings.backupCreateFailed": (
        "Não foi possível criar o backup. Verifique a pasta selecionada e os limites de tamanho do navegador " +
        "e tente novamente. Sua sessão de edição permanece inalterada."
    ),
    "settings.backupCreateUnavailable": "Os backups não estão disponíveis nesta sessão do navegador.",
    "settings.backupCreated": "Criado {name}",
    "settings.backupCreating": "Criando backup…",
    "settings.backupFolder": "Pasta de backup",
    "settings.backupFolderFailed": "Não foi possível escolher essa pasta. Tente novamente.",
    "settings.backupFolderHint": "Escolha uma pasta local para instantâneos de backup. Warplyn só poderá escrever lá depois que você escolher.",
    "settings.backupFolderPermissionDenied": "Warplyn não pode acessar essa pasta de backup. Escolha novamente e permita o acesso.",
    "settings.backupFolderRequired": "Escolha uma pasta de backup primeiro.",
    "settings.backupFolderSelected": "Usando {folderName}",
    "settings.backupFolderUnsupported": "Este navegador não pode escolher uma pasta de backup.",
    "settings.backupSaveFailed": (
        "Não foi possível salvar as configurações de backup. Suas configurações anteriores permanecem inalter" +
        "adas. Tente novamente."
    ),
    "settings.backupStorage": "Armazenamento de backup",
    "settings.chooseBackup": "Escolha um backup",
    "settings.chooseBackupFolder": "Escolher pasta…",
    "settings.createBackup": "Criar backup",
    "settings.createBackupHint": (
        "Faz backup de seus artigos, versões salvas, configurações, habilidades do autor e histórico de habil" +
        "idades. Os backups do navegador suportam arquivos de até 100 MB e 500 MB no total. As chaves de API " +
        "ficam de fora."
    ),
    "settings.dataBackups": "Dados e backups",
    "settings.keepAllBackups": "Mantenha todos os backups",
    "settings.keepBackups": "Manter {count} cópias de segurança",
    "settings.restoreBackup": "Restaurar um backup",
    "settings.restoreBackupConfirm": "Restaurar {name}? Warplyn substituirá os dados locais ativos e recarregará.",
    "settings.restoreBackupFailed": (
        "Não foi possível restaurar esse backup. Verifique os limites de tamanho dos arquivos e do navegador " +
        "ou escolha outro backup. Seus dados ativos permanecem inalterados."
    ),
    "settings.restoreBackupHint": (
        "Escolha um backup da pasta selecionada. Warplyn verifica seus arquivos, mantém uma cópia de recupera" +
        "ção e restaura seus artigos, versões salvas, configurações e habilidades salvas. As conexões de IA e" +
        "xistentes permanecem locais. As referências de variáveis ​​de ambiente podem ser restauradas; Chaves" +
        " de API e valores de variáveis ​​nunca são importados. Backups mais antigos somente de banco de dado" +
        "s mantêm suas habilidades atuais."
    ),
    "settings.restoreBackupUnavailable": "Esse backup não pode ser restaurado.",
    "settings.retention": "Retenção automática de backup",
    "settings.retentionHint": "Controla quantos backups automáticos o Warplyn mantém. Os backups manuais nunca são removidos automaticamente.",
    "settings.revealBackupFolder": "Mostrar pasta",
} satisfies Partial<Record<MessageId, string>>;
