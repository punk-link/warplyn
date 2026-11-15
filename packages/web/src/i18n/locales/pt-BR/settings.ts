import type { MessageId } from "../../messages.js";

export const settingsMessages = {
    "settings.spelling": "Ortografia",
    "settings.assistantRequestTimeout": "Solicitar limite de tempo",
    "settings.assistantRequestTimeoutHint": (
        "Interrompa as solicitações do Assistente após esse horário. Aplica-se a novas solicitações, " +
        "incluindo novas tentativas. Seu artigo permanece inalterado se a solicitação expirar."
    ),
    "settings.requestTimeoutMinutes": "{minutes, plural, one {# minuto} other {# minutos}}",
    "settings.requestTimeoutUnlimited": "Ilimitado",
    "settings.animations": "Animações",
    "settings.animationsHint": (
        "Indicadores animados, mensagens do Assistente e efeitos de interface. As preferências de movimento " +
        "reduzido do dispositivo ainda se aplicam."
    ),
    "settings.general.interfaceLocale.english": "Inglês",
    "settings.navigation": "Navegação nas configurações",
    "settings.backToWorkspace": "Voltar",
    "settings.general": "Em geral",
    "settings.keyBindings": "Atalhos de teclas",
    "settings.keyBindingsIntro": "Escolha os atalhos que Warplyn usa neste computador. As alterações afetam o uso futuro e nunca alteram um Artigo.",
    "settings.keyBindingCategory.general": "Em geral",
    "settings.keyBindingCategory.editing": "Edição",
    "settings.keyBindingCategory.workspace": "Painéis e visualizações",
    "settings.keyBindingCategory.window": "Janela",
    "settings.keyBindingCategory.assistant": "Assistente Editorial",
    "settings.assistantSendMode": "Enviar com",
    "settings.assistantSendModeHint": "Escolha se Enter envia a solicitação ou adiciona uma nova linha.",
    "settings.sendWithEnter": "Digitar",
    "settings.sendWithCtrlEnter": "Ctrl + Enter",
    "settings.recordKeyBinding": "Gravar ligação de chave para {command}",
    "settings.recordingKeyBinding": "Pressione um atalho…",
    "settings.clearKeyBinding": "Claro",
    "settings.resetKeyBinding": "Redefinir para o padrão",
    "settings.keyBindingConflict": "Limpe ou altere primeiro.",
    "settings.keyBindingConflictTitle": "Atribuído a",
    "settings.ai": "Assistente de IA",
    "settings.providers": "Provedores",
    "settings.publishing": "Publicação",
    "settings.dataBackups": "Dados e backups",
    "settings.about": "Sobre Warplyn",
    "settings.aboutDescription": "Um espaço de trabalho de escrita local com um assistente editorial de IA quando você precisar de ajuda.",
    "settings.projectResources": "Recursos do projeto",
    "settings.mitLicense": "Licença MIT",
    "settings.documentation": "Documentação",
    "settings.sourceCode": "Código fonte",
    "settings.reportProblem": "Informar um problema",
    "settings.quickStart": "Início rápido",
    "settings.quickStartHint": "Revise como funcionam os artigos, o assistente e as chaves de modelo.",
    "settings.openQuickStart": "Abra o início rápido",
    "settings.appearanceAndLanguage": "Aparência e idioma",
    "settings.dateAndTime": "Data e hora",
    "settings.connections": "Conexões",
    "settings.models": "Modelos",
    "settings.publishingProfiles": "Publicando perfis",
    "settings.languageDefaults": "Padrões de idioma",
    "settings.backupStorage": "Armazenamento de backup",
    "settings.backupAutomation": "Backups automáticos",
    "settings.preferredAppearance": "Aparência preferida",
    "settings.appearanceHint": (
        "Escolha a aparência que Warplyn usa. O sistema segue a preferência do seu dispositivo e é atualizado " +
        "enquanto o Warplyn está aberto."
    ),
    "settings.system": "Sistema",
    "settings.light": "Claro",
    "settings.dark": "Escuro",
    "settings.applyAppearance": "Aplicar agora",
    "settings.interfaceLanguage": "Idioma da interface",
    "settings.interfaceLanguageHint": (
        "Altera o idioma dos controles e mensagens do Warplyn. O conteúdo dos seus artigos não é alterado."
    ),
    "settings.dateFormat": "Formato de data",
    "settings.dateFormatHint": "Altera a forma como as datas são mostradas no Warplyn. Isso não altera as datas salvas ou o histórico de versões salvas.",
    "settings.systemDateFormat": "Formato de data do sistema ({value})",
    "settings.resetDateFormat": "Usar formato de data do sistema",
    "settings.dayFirstSlash": "DD/MM/AAAA",
    "settings.dayFirstDots": "DD.MM.AAAA",
    "settings.monthFirstSlash": "MM/DD/AAAA",
    "settings.isoDate": "AAAA-MM-DD",
    "settings.twelveHour": "12 horas",
    "settings.twentyFourHour": "24 horas",
    "settings.timeFormat": "Formato de hora",
    "settings.timeFormatHint": "Altera a forma como os tempos são mostrados no Warplyn. Isso não altera as datas salvas ou o histórico de versões salvas.",
    "settings.systemTimeFormat": "Formato de hora do sistema ({value})",
    "settings.resetTimeFormat": "Usar formato de hora do sistema",
    "settings.timeZone": "Fuso horário",
    "settings.timeZoneHint": (
        "O fuso horário do sistema segue este dispositivo. Escolha uma região para manter o tempo enquanto " +
        "você viaja. Isso altera apenas os horários exibidos, não os carimbos de data/hora salvos."
    ),
    "settings.systemTimeZone": "Fuso horário do sistema {timeZone}",
    "settings.localTimeZone": "hora local",
    "settings.resetTimeZone": "Usar fuso horário do sistema",
    "settings.example": "Exemplo: {value}",
    "settings.defaultArticleLanguage": "Idioma padrão do artigo",
    "settings.defaultArticleLanguageHint": "Usado para novos artigos quando você não escolhe um idioma. Os artigos existentes não são alterados.",
    "settings.defaultTranslationLanguages": "Idiomas de tradução padrão",
    "settings.defaultTranslationLanguagesHint": "Pré-selecionado ao iniciar uma nova tradução. Você pode alterar os destinos antes de gerar.",
    "settings.addConnection": "Adicione uma conexão AI",
    "settings.connectionHint": "A chave do seu provedor permanece privada neste computador. Warplyn armazena apenas o nome de onde está guardado.",
    "settings.provider": "Provedor",
    "settings.providerHint": "Escolha o serviço que emitiu esta chave de API.",
    "settings.provider.openai": "OpenAI",
    "settings.provider.opencode": "OpenCode Zen",
    "settings.provider.anthropic": "Anthropic",
    "settings.provider.google": "Google Gemini API",
    "settings.provider.xai": "xAI Grok",
    "settings.provider.deepseek": "DeepSeek",
    "settings.providerLimitations": (
        "As Operações Editoriais disponíveis dependem do modelo selecionado. A verificação de fatos " +
        "originados, os resultados estruturados e os controles de raciocínio podem estar indisponíveis."
    ),
    "settings.chooseConnectionMethod": "Como você gostaria de fornecer sua chave?",
    "settings.chooseConnectionMethodHint": "Escolha um método. Você pode adicionar outra conexão mais tarde.",
    "settings.environmentVariable": "Variável de ambiente",
    "settings.addApiKey": "Adicione uma chave de API",
    "settings.addApiKeyHint": "Warplyn verifica a chave e a armazena no Windows Credential Manager. Nunca é exibido ou salvo nos dados do Warplyn.",
    "settings.apiKey": "Chave de API",
    "settings.apiKeyHint": "Cole a chave do seu provedor de IA.",
    "settings.apiKeyPlaceholder": "Cole sua chave de API",
    "settings.addApiKeyButton": "Adicionar chave de API",
    "settings.connectionName": "Nome da conexão",
    "settings.connectionNameHint": "Use um nome familiar, como Personal AI.",
    "settings.connectionNamePlaceholder": "Por exemplo, IA pessoal",
    "settings.environmentName": "Nome da variável de ambiente",
    "settings.environmentNameHint": "O nome usado quando o serviço local é iniciado. Sua chave nunca é exibida.",
    "settings.environmentNamePlaceholder": "Por exemplo, AI_API_KEY",
    "settings.addConnectionButton": "Adicionar conexão",
    "settings.configuredConnections": "Conexões configuradas",
    "settings.configuredConnectionsHint": (
        "Essas configurações de conexão são salvas localmente. Conexões ativas contribuem com modelos. Sua " +
        "chave não é armazenada ou exibida."
    ),
    "settings.activeConnection": "Conexão ativa",
    "settings.activeConnectionShort": "Ativo",
    "settings.activateConnectionShort": "Ativar",
    "settings.deactivateConnectionShort": "Desativar",
    "settings.useConnection": "Use esta conexão",
    "settings.useConnectionShort": "Use isto",
    "settings.renameConnection": "Renomear conexão",
    "settings.renameConnectionShort": "Renomear",
    "settings.renameConnectionTitle": "Renomear conexão AI",
    "settings.renameConnectionHint": "Escolha um nome local para esta conexão.",
    "settings.saveConnectionName": "Salvar",
    "settings.removeConnection": "Remover conexão",
    "settings.removeConnectionShort": "Remover",
    "settings.removeConnectionTitle": "Remover conexão AI?",
    "settings.removeConnectionDescription": "Isso remove {connectionName} de Warplyn. Ele não remove a variável de ambiente ou sua chave do computador.",
    "settings.defaultModel": "Modelo padrão",
    "settings.defaultModelHint": "Usado para trabalho de IA, a menos que uma tarefa tenha sua própria escolha de modelo.",
    "settings.appModel": "Modelo de aplicativo",
    "settings.appModelHint": "Usado para recursos do Warplyn, como resumos e títulos. Se não for definido, Warplyn usará o modelo padrão.",
    "settings.model": "Modelo",
    "settings.modelHint": "Verifique uma conexão e atualize os modelos disponíveis antes de escolher uma.",
    "settings.reasoningEffort": "Nível de raciocínio",
    "settings.reasoningEffortHint": "Controla quanto trabalho este modelo realiza antes de responder. Níveis mais altos podem demorar mais.",
    "settings.reasoningLow": "Baixo",
    "settings.reasoningMedium": "Médio",
    "settings.reasoningHigh": "Alto",
    "settings.noModels": "Ainda não há modelos disponíveis",
    "settings.chooseModel": "Escolha um modelo",
    "settings.favoriteModels": "Favoritos",
    "settings.searchModels": "Pesquisar modelos",
    "settings.clearModelSearch": "Limpar pesquisa de modelo",
    "settings.modelVendorFilters": "Filtrar modelos por fornecedor",
    "settings.modelVendor.openai": "OpenAI",
    "settings.modelVendor.other": "Outro",
    "settings.addFavoriteModel": "Adicionar {model} para favoritos",
    "settings.removeFavoriteModel": "Remover {model} dos favoritos",
    "settings.noMatchingModels": "Nenhum modelo corresponde a este filtro.",
    "settings.refreshModels": "Atualizar modelos",
    "settings.specificModels": "Modelos para tarefas específicas",
    "settings.specificModelsHint": "Escolha um modelo para uma tarefa ou use o modelo padrão. Isso afeta apenas solicitações futuras de IA.",
    "settings.useDefaultModel": "Usar modelo padrão",
    "settings.specificModelHint": "Deixe ativado Usar modelo padrão, a menos que esta tarefa precise de um modelo diferente.",
    "settings.publishingProfile": "Perfil com limite de caracteres",
    "settings.publishingProfileHint": "Mostra quando a publicação do texto se aproxima deste comprimento. O limite é orientativo e nunca impede a cópia.",
    "settings.publishingProfileNote": (
        "Este perfil é usado pela barra de status do artigo e pelo controle de cópia. Perfis personalizados " +
        "editáveis ​​serão baseados nesses princípios básicos."
    ),
    "settings.profileCharacters": "{label} — {count} caracteres",
    "settings.backupFolder": "Pasta de backup",
    "settings.backupFolderHint": "Escolha uma pasta local para instantâneos de backup. Warplyn só poderá escrever lá depois que você escolher.",
    "settings.chooseBackupFolder": "Escolher pasta…",
    "settings.revealBackupFolder": "Mostrar pasta",
    "settings.managedCredential": "Credencial gerenciada",
    "settings.backupFolderSelected": "Usando {folderName}",
    "settings.backupFolderFailed": "Não foi possível escolher essa pasta. Tente novamente.",
    "settings.backupFolderRequired": "Escolha uma pasta de backup primeiro.",
    "settings.backupFolderPermissionDenied": "Warplyn não pode acessar essa pasta de backup. Escolha novamente e permita o acesso.",
    "settings.backupFolderUnsupported": "Este navegador não pode escolher uma pasta de backup.",
    "settings.automaticBackups": "Backups automáticos",
    "settings.automaticBackupsHint": (
        "Quando ativado, cria um backup logo após a inicialização e a cada 24 horas a partir dessa execução " +
        "enquanto o Warplyn permanece aberto. Os backups manuais nunca são removidos automaticamente."
    ),
    "settings.automaticBackupFailed": (
        "Falha no backup automático. Verifique a pasta de backup em Dados e backups e crie um backup manual. " +
        "Seus artigos permanecem inalterados."
    ),
    "settings.off": "Desligado",
    "settings.daily": "Diário",
    "settings.retention": "Retenção automática de backup",
    "settings.retentionHint": "Controla quantos backups automáticos o Warplyn mantém. Os backups manuais nunca são removidos automaticamente.",
    "settings.keepBackups": "Manter {count} cópias de segurança",
    "settings.keepAllBackups": "Mantenha todos os backups",
    "settings.createBackup": "Criar backup",
    "settings.createBackupHint": (
        "Faz backup de seus artigos, versões salvas, configurações, habilidades do autor e histórico de " +
        "habilidades. Os backups do navegador suportam arquivos de até 100 MB e 500 MB no total. As chaves de " +
        "API ficam de fora."
    ),
    "settings.backupCreating": "Criando backup…",
    "settings.backupCreated": "Criado {name}",
    "settings.backupCreateFailed": (
        "Não foi possível criar o backup. Verifique a pasta selecionada e os limites de tamanho do navegador " +
        "e tente novamente. Sua sessão de edição permanece inalterada."
    ),
    "settings.backupCreateUnavailable": "Os backups não estão disponíveis nesta sessão do navegador.",
    "settings.restoreBackup": "Restaurar um backup",
    "settings.restoreBackupHint": (
        "Escolha um backup da pasta selecionada. Warplyn verifica seus arquivos, mantém uma cópia de " +
        "recuperação e restaura seus artigos, versões salvas, configurações e habilidades salvas. As conexões " +
        "de IA existentes permanecem locais. As referências de variáveis ​​de ambiente podem ser restauradas; " +
        "Chaves de API e valores de variáveis ​​nunca são importados. Backups mais antigos somente de banco " +
        "de dados mantêm suas habilidades atuais."
    ),
    "settings.restoreBackupFailed": (
        "Não foi possível restaurar esse backup. Verifique os limites de tamanho dos arquivos e do navegador " +
        "ou escolha outro backup. Seus dados ativos permanecem inalterados."
    ),
    "settings.restoreBackupUnavailable": "Esse backup não pode ser restaurado.",
    "settings.chooseBackup": "Escolha um backup",
    "settings.restoreBackupConfirm": "Restaurar {name}? Warplyn substituirá os dados locais ativos e recarregará.",
    "settings.deleteData": "Excluir dados locais",
    "settings.deleteLocalData": "Exclua todos os dados locais",
    "settings.deleteLocalDataHint": (
        "Remove permanentemente artigos, pontos de verificação, versões salvas, histórico do assistente, " +
        "dados de estilo, configurações e backups locais dentro do diretório de dados do Warplyn. Você pode " +
        "criar um backup verificado primeiro na confirmação."
    ),
    "settings.deleteLocalDataFailed": "Não foi possível excluir os dados locais. Nada foi relatado como totalmente excluído.",
    "settings.loading": "Carregando configurações…",
    "settings.privacyAndDiagnostics": "Privacidade e diagnóstico",
    "settings.telemetry": "Compartilhe dados de diagnóstico e uso",
    "settings.telemetryHint": (
        "Ajude-nos a melhorar o Warplyn enviando eventos de uso e confiabilidade pseudônimos para PostHog. " +
        "Texto do artigo, prompts, respostas de IA e chaves de API nunca são incluídos."
    ),
    "settings.telemetryDisclosure": (
        "A telemetria está desativada por padrão. Ative o compartilhamento para nos ajudar a entender sua " +
        "experiência e melhorar o Warplyn. Você pode desligá-lo a qualquer momento; isso interrompe a coleta " +
        "futura e não pode recuperar dados já enviados."
    ),
    "settings.telemetryDetails": "Detalhes de telemetria",
    "settings.telemetryIdentifier": "ID de telemetria",
    "settings.telemetryIdentifierHint": "Inclua esse ID ao solicitar a exclusão. Copie-o antes de desligar a telemetria, pois desligá-la exclui o ID.",
    "settings.copyTelemetryIdentifier": "Copiar ID",
    "settings.telemetryIdentifierCopied": "ID de telemetria copiado.",
    "settings.telemetrySaveFailed": "Não foi possível salvar esta escolha. Sua configuração anterior permanece inalterada. Tente novamente.",
    "settings.telemetryUnavailable": "A telemetria está disponível apenas em um aplicativo empacotado configurado.",
    "settings.saved": "Salvo",
    "settings.loadingFailed": "Não foi possível carregar as configurações. Suas configurações salvas permanecem inalteradas. Atualize e tente novamente.",
    "settings.saving": "Salvando…",
    "settings.saveFailed": "Não foi possível salvar suas configurações. Suas configurações anteriores permanecem inalteradas. Tente novamente.",
    "settings.modelSaveFailed": (
        "Não foi possível salvar as preferências do modelo. Suas configurações anteriores permanecem " +
        "inalteradas. Tente novamente."
    ),
    "settings.backupSaveFailed": (
        "Não foi possível salvar as configurações de backup. Suas configurações anteriores permanecem " +
        "inalteradas. Tente novamente."
    ),
    "settings.updates": "Atualizações",
    "settings.updateNetworkAccess": "Permitir acesso à rede para atualizações",
    "settings.updateNetworkAccessHint": (
        "Permite que Warplyn entre em contato com o GitHub para obter metadados de lançamento público e " +
        "atualizações que você escolher baixar. Ele nunca envia conteúdo de artigos, informações de conta, " +
        "identificadores de dispositivos ou análises."
    ),
} satisfies Partial<Record<MessageId, string>>;
