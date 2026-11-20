import type { MessageId } from "../../messages.js";


export const electronMessages = {
    "electron.articleFiles.docx": "Arquivos do Word",
    "electron.articleFiles.html": "Arquivos HTML",
    "electron.articleFiles.load": "Carregar artigo do arquivo",
    "electron.articleFiles.markdown": "Arquivos de redução",
    "electron.articleFiles.rtf": "Arquivos de texto rico",
    "electron.articleFiles.save": "Salvar artigo em arquivo",
    "electron.closeFailed.message": "O ponto de verificação rascunho foi concluído, mas o banco de dados local não foi fechado corretamente.",
    "electron.closeFailed.title": "Warplyn não conseguiu fechar de forma limpa",
    "electron.deleteData.backup": "Crie um backup antes da exclusão",
    "electron.deleteData.cancel": "Cancelar",
    "electron.deleteData.delete": "Exclua todos os dados locais",
    "electron.deleteData.detail": "Warplyn fechará após a exclusão. Um backup pode ser criado primeiro quando uma pasta de backup é configurada.",
    "electron.deleteData.message": (
        "Isso remove permanentemente artigos, pontos de verificação, versões salvas, histórico do assistente," +
        " dados de estilo, configurações e backups locais no diretório de dados do Warplyn."
    ),
    "electron.deleteData.title": "Excluir todos os dados locais do Warplyn?",
    "electron.draftCheckpointFailed.detail": "Volte ao artigo e tente novamente ou saia sem as últimas alterações não salvas.",
    "electron.draftCheckpointFailed.message": "Warplyn não conseguiu salvar o último ponto de verificação do rascunho.",
    "electron.draftCheckpointFailed.quit": "Sair sem o último ponto de verificação",
    "electron.draftCheckpointFailed.return": "Voltar ao artigo",
    "electron.draftCheckpointFailed.title": "Falha no ponto de verificação",
    "electron.restoreBackup.cancel": "Cancelar",
    "electron.restoreBackup.detail": (
        "Warplyn salvará os pontos de verificação mais recentes do rascunho, manterá uma cópia de recuperação" +
        " dos dados ativos e reiniciará. As conexões de IA existentes permanecem locais. As referências de va" +
        "riáveis ​​de ambiente podem ser restauradas; Chaves de API e valores de variáveis ​​nunca são import" +
        "ados. Isso não pode ser desfeito em Configurações."
    ),
    "electron.restoreBackup.message": "Isso substitui seus dados Warplyn locais ativos pelo backup selecionado.",
    "electron.restoreBackup.restore": "Restaurar e reiniciar",
    "electron.restoreBackup.title": "Restaurar este backup?",
    "electron.restoreFailed.message": (
        "Feche todas as outras janelas Warplyn ou servidores de desenvolvimento locais usando esses dados e tente novam" +
        "ente. Seus dados ativos permanecem inalterados."
    ),
    "electron.restoreFailed.title": "Não foi possível restaurar o backup",
    "electron.spelling.addWord": "Adicionar ao dicionário",
    "electron.startFailed.message": "Verifique se o diretório de dados local está disponível e tente novamente.",
    "electron.startFailed.title": "Warplyn não pôde iniciar",
} satisfies Partial<Record<MessageId, string>>;
