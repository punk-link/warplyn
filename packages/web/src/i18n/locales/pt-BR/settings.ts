import type { MessageId } from "../../messages.js";


export const settingsMessages = {
    "settings.about": "Sobre Warplyn",
    "settings.aboutDescription": "Um espaço de trabalho de escrita local com um assistente editorial de IA quando você precisar de ajuda.",
    "settings.activateConnectionShort": "Ativar",
    "settings.activeConnection": "Conexão ativa",
    "settings.activeConnectionShort": "Ativo",
    "settings.addApiKey": "Adicione uma chave de API",
    "settings.addApiKeyButton": "Adicionar chave de API",
    "settings.addApiKeyHint": "Warplyn verifica a chave e a armazena no Windows Credential Manager. Nunca é exibido ou salvo nos dados do Warplyn.",
    "settings.addConnection": "Adicione uma conexão AI",
    "settings.addConnectionButton": "Adicionar conexão",
    "settings.addCustomProfile": "Adicionar perfil",
    "settings.addFavoriteModel": "Adicionar {model} para favoritos",
    "settings.ai": "Assistente de IA",
    "settings.allowNetworkAccess": "Permitir",
    "settings.animations": "Animações",
    "settings.animationsHint": (
        "Indicadores animados, mensagens do Assistente e efeitos de interface. As preferências de movimento reduzido do" +
        " dispositivo ainda se aplicam."
    ),
    "settings.apiKey": "Chave de API",
    "settings.apiKeyHint": "Cole a chave do seu provedor de IA.",
    "settings.apiKeyPlaceholder": "Cole sua chave de API",
    "settings.appModel": "Modelo de aplicativo",
    "settings.appModelHint": "Usado para recursos do Warplyn, como resumos e títulos. Se não for definido, Warplyn usará o modelo padrão.",
    "settings.appearanceAndLanguage": "Aparência e idioma",
    "settings.appearanceHint": (
        "Escolha a aparência que Warplyn usa. O sistema segue a preferência do seu dispositivo e é atualizado enquanto " +
        "o Warplyn está aberto."
    ),
    "settings.applyAppearance": "Aplicar agora",
    "settings.assistantBehavior": "Edição e solicitações",
    "settings.assistantRequestTimeout": "Solicitar limite de tempo",
    "settings.assistantRequestTimeoutHint": (
        "Interrompa as solicitações do Assistente após esse horário. Aplica-se a novas solicitações, incluind" +
        "o novas tentativas. Seu artigo permanece inalterado se a solicitação expirar."
    ),
    "settings.assistantSendMode": "Enviar com",
    "settings.assistantSendModeHint": "Escolha se Enter envia a solicitação ou adiciona uma nova linha.",
    "settings.backToWorkspace": "Voltar",
    "settings.chooseConnectionMethod": "Como você gostaria de fornecer sua chave?",
    "settings.chooseConnectionMethodHint": "Escolha um método. Você pode adicionar outra conexão mais tarde.",
    "settings.chooseModel": "Escolha um modelo",
    "settings.clearKeyBinding": "Claro",
    "settings.clearModelSearch": "Limpar pesquisa de modelo",
    "settings.configuredConnections": "Conexões configuradas",
    "settings.configuredConnectionsHint": (
        "Essas configurações de conexão são salvas localmente. Conexões ativas contribuem com modelos. Sua chave não é " +
        "armazenada ou exibida."
    ),
    "settings.connectionAddFailed": (
        "Não foi possível adicionar essa conexão de IA. Suas configurações não foram alteradas. Verifique os detalhes e" +
        " tente novamente."
    ),
    "settings.connectionHint": "A chave do seu provedor permanece privada neste computador. Warplyn armazena apenas o nome de onde está guardado.",
    "settings.connectionName": "Nome da conexão",
    "settings.connectionNameHint": "Use um nome familiar, como Personal AI.",
    "settings.connectionNamePlaceholder": "Por exemplo, IA pessoal",
    "settings.connectionRemoveFailed": "Não foi possível remover essa conexão AI. Ainda está disponível em Configurações. Tente novamente.",
    "settings.connectionUpdateFailed": (
        "Não foi possível atualizar essa conexão AI. Suas configurações anteriores permanecem inalteradas. Te" +
        "nte novamente."
    ),
    "settings.connections": "Conexões",
    "settings.copyTelemetryIdentifier": "Copiar ID",
    "settings.customProfileInvalid": "Insira um nome e um limite inteiro de caracteres não negativos.",
    "settings.customProfileLimit": "Limite de caracteres personalizado",
    "settings.customProfileLimitHint": "Um limite de orientação não negativo. Nunca bloqueia a cópia.",
    "settings.customProfileName": "Nome de perfil personalizado",
    "settings.customProfileNameHint": "O rótulo local usado para seu limite de publicação personalizado.",
    "settings.customProfiles": "Perfis personalizados",
    "settings.customProfilesHint": "Adicione quantos perfis locais com limite de caracteres forem necessários.",
    "settings.daily": "Diário",
    "settings.dark": "Escuro",
    "settings.dateAndTime": "Data e hora",
    "settings.dateFormat": "Formato de data",
    "settings.dateFormatHint": "Altera a forma como as datas são mostradas no Warplyn. Isso não altera as datas salvas ou o histórico de versões salvas.",
    "settings.dayFirstDots": "DD.MM.AAAA",
    "settings.dayFirstSlash": "DD/MM/AAAA",
    "settings.deactivateConnectionShort": "Desativar",
    "settings.defaultArticleLanguage": "Idioma padrão do artigo",
    "settings.defaultArticleLanguageHint": "Usado para novos artigos quando você não escolhe um idioma. Os artigos existentes não são alterados.",
    "settings.defaultAssistantEditMode": "Modo de edição padrão do Assistente",
    "settings.defaultAssistantEditModeHint": (
        "As conversas sobre novos artigos usam este modo; as conversas existentes mantêm as deles. O modo dir" +
        "eto ignora a revisão da proposta apenas para edições solicitadas explicitamente. Outras propostas ai" +
        "nda precisam de revisão."
    ),
    "settings.defaultModel": "Modelo padrão",
    "settings.defaultModelHint": "Usado para trabalho de IA, a menos que uma tarefa tenha sua própria escolha de modelo.",
    "settings.defaultTranslationLanguages": "Idiomas de tradução padrão",
    "settings.defaultTranslationLanguagesHint": "Pré-selecionado ao iniciar uma nova tradução. Você pode alterar os destinos antes de gerar.",
    "settings.deleteData": "Excluir dados locais",
    "settings.deleteLocalData": "Exclua todos os dados locais",
    "settings.deleteLocalDataFailed": "Não foi possível excluir os dados locais. Nada foi relatado como totalmente excluído.",
    "settings.deleteLocalDataHint": (
        "Remove permanentemente artigos, pontos de verificação, versões salvas, histórico do assistente, dado" +
        "s de estilo, configurações e backups locais dentro do diretório de dados do Warplyn. Você pode criar" +
        " um backup verificado primeiro na confirmação."
    ),
    "settings.documentation": "Documentação",
    "settings.downloadUpdate": "Download",
    "settings.environmentName": "Nome da variável de ambiente",
    "settings.environmentNameHint": "O nome usado quando o serviço local é iniciado. Sua chave nunca é exibida.",
    "settings.environmentNamePlaceholder": "Por exemplo, AI_API_KEY",
    "settings.environmentVariable": "Variável de ambiente",
    "settings.example": "Exemplo: {value}",
    "settings.favoriteModels": "Favoritos",
    "settings.general": "Em geral",
    "settings.general.interfaceLocale.english": "Inglês",
    "settings.includePrereleaseUpdates": "Incluir atualizações de pré-lançamento",
    "settings.includePrereleaseUpdatesHint": "Quando desativado, o Warplyn oferece apenas versões estáveis.",
    "settings.interfaceLanguage": "Idioma da interface",
    "settings.interfaceLanguageHint": "Altera o idioma dos controles e mensagens do Warplyn. O conteúdo dos seus artigos não é alterado.",
    "settings.isoDate": "AAAA-MM-DD",
    "settings.keyBindingCategory.assistant": "Assistente Editorial",
    "settings.keyBindingCategory.editing": "Edição",
    "settings.keyBindingCategory.general": "Em geral",
    "settings.keyBindingCategory.window": "Janela",
    "settings.keyBindingCategory.workspace": "Painéis e visualizações",
    "settings.keyBindingConflict": "Limpe ou altere primeiro.",
    "settings.keyBindingConflictTitle": "Atribuído a",
    "settings.keyBindings": "Atalhos de teclas",
    "settings.keyBindingsIntro": "Escolha os atalhos que Warplyn usa neste computador. As alterações afetam o uso futuro e nunca alteram um Artigo.",
    "settings.languageDefaults": "Padrões de idioma",
    "settings.light": "Claro",
    "settings.loading": "Carregando configurações…",
    "settings.loadingFailed": "Não foi possível carregar as configurações. Suas configurações salvas permanecem inalteradas. Atualize e tente novamente.",
    "settings.localTimeZone": "hora local",
    "settings.managedCredential": "Credencial gerenciada",
    "settings.mitLicense": "Licença MIT",
    "settings.model": "Modelo",
    "settings.modelHint": "Verifique uma conexão e atualize os modelos disponíveis antes de escolher uma.",
    "settings.modelSaveFailed": (
        "Não foi possível salvar as preferências do modelo. Suas configurações anteriores permanecem inaltera" +
        "das. Tente novamente."
    ),
    "settings.modelVendor.openai": "OpenAI",
    "settings.modelVendor.other": "Outro",
    "settings.modelVendorFilters": "Filtrar modelos por fornecedor",
    "settings.models": "Modelos",
    "settings.modelsLoadFailed": "Não foi possível carregar os modelos disponíveis. Suas configurações não foram alteradas. Tente novamente.",
    "settings.monthFirstSlash": "MM/DD/AAAA",
    "settings.navigation": "Navegação nas configurações",
    "settings.noMatchingModels": "Nenhum modelo corresponde a este filtro.",
    "settings.noModels": "Ainda não há modelos disponíveis",
    "settings.off": "Desligado",
    "settings.on": "Sobre",
    "settings.openQuickStart": "Abra o início rápido",
    "settings.preferredAppearance": "Aparência preferida",
    "settings.privacyAndDiagnostics": "Privacidade e diagnóstico",
    "settings.profileCharacters": "{label} — {count} caracteres",
    "settings.projectResources": "Recursos do projeto",
    "settings.provider": "Provedor",
    "settings.provider.anthropic": "Anthropic",
    "settings.provider.deepseek": "DeepSeek",
    "settings.provider.google": "Google Gemini API",
    "settings.provider.openai": "OpenAI",
    "settings.provider.opencode": "OpenCode Zen",
    "settings.provider.xai": "xAI Grok",
    "settings.providerHint": "Escolha o serviço que emitiu esta chave de API.",
    "settings.providerLimitations": (
        "As Operações Editoriais disponíveis dependem do modelo selecionado. A verificação de fatos originado" +
        "s, os resultados estruturados e os controles de raciocínio podem estar indisponíveis."
    ),
    "settings.providers": "Provedores",
    "settings.publishing": "Publicação",
    "settings.publishingProfile": "Perfil com limite de caracteres",
    "settings.publishingProfileHint": "Mostra quando a publicação do texto se aproxima deste comprimento. O limite é orientativo e nunca impede a cópia.",
    "settings.publishingProfileNote": (
        "Este perfil é usado pela barra de status do artigo e pelo controle de cópia. Perfis personalizados editáveis ​" +
        "​serão baseados nesses princípios básicos."
    ),
    "settings.publishingProfiles": "Publicando perfis",
    "settings.publishingSaveFailed": (
        "Não foi possível salvar as configurações de publicação. Suas configurações anteriores permanecem inalteradas. " +
        "Tente novamente."
    ),
    "settings.quickStart": "Início rápido",
    "settings.quickStartHint": "Revise como funcionam os artigos, o assistente e as chaves de modelo.",
    "settings.reasoningEffort": "Nível de raciocínio",
    "settings.reasoningEffortHint": "Controla quanto trabalho este modelo realiza antes de responder. Níveis mais altos podem demorar mais.",
    "settings.reasoningHigh": "Alto",
    "settings.reasoningLow": "Baixo",
    "settings.reasoningMedium": "Médio",
    "settings.recordKeyBinding": "Gravar ligação de chave para {command}",
    "settings.recordingKeyBinding": "Pressione um atalho…",
    "settings.refreshModels": "Atualizar modelos",
    "settings.remove": "Remover",
    "settings.removeConnection": "Remover conexão",
    "settings.removeConnectionDescription": "Isso remove {connectionName} de Warplyn. Ele não remove a variável de ambiente ou sua chave do computador.",
    "settings.removeConnectionShort": "Remover",
    "settings.removeConnectionTitle": "Remover conexão AI?",
    "settings.removeCustomDefaultDescription": "Remover <profile>{name}</profile>? O perfil de publicação padrão será revertido para Padrão.",
    "settings.removeCustomProfile": "Remover {name}",
    "settings.removeCustomProfileDescription": "Remover <profile>{name}</profile> de seus perfis de publicação locais?",
    "settings.removeCustomProfileTitle": "Remover perfil personalizado?",
    "settings.removeFavoriteModel": "Remover {model} dos favoritos",
    "settings.renameConnection": "Renomear conexão",
    "settings.renameConnectionHint": "Escolha um nome local para esta conexão.",
    "settings.renameConnectionShort": "Renomear",
    "settings.renameConnectionTitle": "Renomear conexão AI",
    "settings.reportProblem": "Informar um problema",
    "settings.requestTimeoutMinutes": "{minutes, plural, one {# minuto} other {# minutos}}",
    "settings.requestTimeoutUnlimited": "Ilimitado",
    "settings.resetDateFormat": "Usar formato de data do sistema",
    "settings.resetKeyBinding": "Redefinir para o padrão",
    "settings.resetTimeFormat": "Usar formato de hora do sistema",
    "settings.resetTimeZone": "Usar fuso horário do sistema",
    "settings.retry": "Tentar novamente",
    "settings.saveConnectionName": "Salvar",
    "settings.saveCustomProfile": "Salvar perfil",
    "settings.saveFailed": "Não foi possível salvar suas configurações. Suas configurações anteriores permanecem inalteradas. Tente novamente.",
    "settings.saved": "Salvo",
    "settings.saving": "Salvando…",
    "settings.searchModels": "Pesquisar modelos",
    "settings.securityUpdate": "Atualização de segurança",
    "settings.sendWithCtrlEnter": "Ctrl + Enter",
    "settings.sendWithEnter": "Digitar",
    "settings.showExecutionProgress": "Mostrar o progresso da execução",
    "settings.showExecutionProgressHint": "Mostre a ação atual e uma trilha de atividade recolhível no bate-papo do Assistente.",
    "settings.sourceCode": "Código fonte",
    "settings.specificModelHint": "Deixe ativado Usar modelo padrão, a menos que esta tarefa precise de um modelo diferente.",
    "settings.specificModels": "Modelos para tarefas específicas",
    "settings.specificModelsHint": "Escolha um modelo para uma tarefa ou use o modelo padrão. Isso afeta apenas solicitações futuras de IA.",
    "settings.spelling": "Ortografia",
    "settings.system": "Sistema",
    "settings.systemDateFormat": "Formato de data do sistema ({value})",
    "settings.systemTimeFormat": "Formato de hora do sistema ({value})",
    "settings.systemTimeZone": "Fuso horário do sistema {timeZone}",
    "settings.telemetry": "Compartilhe dados de diagnóstico e uso",
    "settings.telemetryDetails": "Detalhes de telemetria",
    "settings.telemetryDisclosure": (
        "A telemetria está desativada por padrão. Ative o compartilhamento para nos ajudar a entender sua exp" +
        "eriência e melhorar o Warplyn. Você pode desligá-lo a qualquer momento; isso interrompe a coleta fut" +
        "ura e não pode recuperar dados já enviados."
    ),
    "settings.telemetryHint": (
        "Ajude-nos a melhorar o Warplyn enviando eventos de uso e confiabilidade pseudônimos para PostHog. Te" +
        "xto do artigo, prompts, respostas de IA e chaves de API nunca são incluídos."
    ),
    "settings.telemetryIdentifier": "ID de telemetria",
    "settings.telemetryIdentifierCopied": "ID de telemetria copiado.",
    "settings.telemetryIdentifierHint": "Inclua esse ID ao solicitar a exclusão. Copie-o antes de desligar a telemetria, pois desligá-la exclui o ID.",
    "settings.telemetrySaveFailed": "Não foi possível salvar esta escolha. Sua configuração anterior permanece inalterada. Tente novamente.",
    "settings.telemetryUnavailable": "A telemetria está disponível apenas em um aplicativo empacotado configurado.",
    "settings.timeFormat": "Formato de hora",
    "settings.timeFormatHint": "Altera a forma como os tempos são mostrados no Warplyn. Isso não altera as datas salvas ou o histórico de versões salvas.",
    "settings.timeZone": "Fuso horário",
    "settings.timeZoneHint": (
        "O fuso horário do sistema segue este dispositivo. Escolha uma região para manter o tempo enquanto vo" +
        "cê viaja. Isso altera apenas os horários exibidos, não os carimbos de data/hora salvos."
    ),
    "settings.twelveHour": "12 horas",
    "settings.twentyFourHour": "24 horas",
    "settings.useConnection": "Use esta conexão",
    "settings.useConnectionShort": "Use isto",
    "settings.useDefaultModel": "Usar modelo padrão",
} satisfies Partial<Record<MessageId, string>>;
