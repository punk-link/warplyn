import type { MessageId } from "../../messages.js";

export const errorsMessages = {
    "errors.assistantRequestTimedOut": (
        "Esta solicitação do Assistente atingiu o limite de tempo. Seu artigo não foi alterado. Tente " +
        "novamente ou aumente o limite de tempo da solicitação nas Configurações Gerais."
    ),
    "errors.generic": "Não foi possível concluir essa ação. Seu artigo não foi alterado. Tente novamente.",
    "errors.invalidRequest": "Não foi possível concluir a ação porque algumas informações eram inválidas. Verifique e tente novamente.",
    "errors.proposalEditInvalid": (
        "Não foi possível aplicar sua proposta editada. Seu artigo não foi alterado. Mantenha os números, " +
        "links, códigos e termos técnicos propostos inalterados e tente novamente. Caso a Proposta não esteja " +
        "disponível, gere uma nova."
    ),
    "errors.factCorrectionSelectionInvalid": (
        "Não foi possível preparar as correções porque os apontamentos selecionados não são mais atuais ou " +
        "precisam de revisão. Execute a Verificação de Fatos novamente e selecione Apontamentos contestados " +
        "ou não verificáveis ​​não resolvidas."
    ),
    "errors.requestTooLarge": "Não foi possível concluir a ação porque o conteúdo selecionado é muito grande. Reduza e tente novamente.",
    "errors.invalidJson": "Não foi possível concluir a ação porque algumas informações eram inválidas. Verifique e tente novamente.",
    "errors.originNotPermitted": "Não foi possível concluir essa ação nesta janela do aplicativo. Abra novamente o Warplyn e tente novamente.",
    "errors.resourceNotFound": "Não foi possível encontrar o que essa ação precisa. Atualize o Warplyn e tente novamente.",
    "errors.articleNotFound": "Não foi possível encontrar esse artigo. Selecione um artigo existente e tente novamente.",
    "errors.revisionNotFound": "Não foi possível encontrar essa versão salva. Escolha outra versão salva e tente novamente.",
    "errors.revisionConflict": (
        "Não foi possível salvar porque este artigo foi alterado primeiro. Suas alterações mais recentes " +
        "ainda estão no editor; revise o conflito e tente novamente."
    ),
    "errors.unsupportedPublishingProfile": "Escolha um perfil de publicação compatível.",
    "errors.invalidEnvironmentVariableName": "Insira um nome de variável de ambiente usando letras maiúsculas, números e sublinhados.",
    "errors.environmentVariableUnavailable": "O {environmentVariableName} variável não está disponível. Adicione-o e tente novamente.",
    "errors.aiConnectionNotFound": "Não foi possível encontrar essa conexão de IA. Escolha outra conexão e tente novamente.",
    "errors.duplicateStyleCorpusItem": "Este texto já está no corpus de estilo.",
    "errors.activeConnectionRequired": "Adicione e selecione uma conexão AI primeiro.",
    "errors.activeConnectionRemovalBlocked": "Escolha outra conexão AI ativa antes de remover esta.",
    "errors.aiConnectionVerificationFailed": "O provedor de IA não conseguiu verificar esta conexão. Verifique a variável e sua chave e tente novamente.",
    "errors.managedCredentialsUnavailable": "O armazenamento seguro de credenciais não está disponível neste dispositivo. Escolha Variável de ambiente.",
    "errors.managedCredentialMissing": (
        "Esta conexão não possui chave de API no Warplyn. Adicione uma nova conexão de chave de API e " +
        "selecione-a para seus modelos e, em seguida, remova essa conexão antiga."
    ),
    "errors.styleCorpusRequired": "Adicione pelo menos um item do corpus de estilo antes de verificar o estilo.",
    "errors.targetLanguageRequired": "Escolha um idioma de destino antes de solicitar uma tradução.",
    "errors.editorialOperationUnsupported": "Essa ação assistida por IA não está disponível. Escolha outra ação.",
    "errors.editorialConfigurationMissing": (
        "Não foi possível iniciar a ação assistida por IA. Escolha um modelo compatível em Configurações e " +
        "tente novamente."
    ),
    "errors.editorialProviderFailed": (
        "Não foi possível terminar a ação assistida por IA. Seu artigo não foi alterado. Tente novamente ou " +
        "verifique sua conexão AI em Configurações."
    ),
    "errors.editorialStreamIncomplete": "Não foi possível terminar a ação assistida por IA. Seu artigo não foi alterado. Tente novamente.",
    "errors.editorialRequestFailed": (
        "Não foi possível concluir a ação assistida por IA. Seu artigo não foi alterado. Tente novamente ou " +
        "verifique sua conexão AI em Configurações."
    ),
    "errors.invalidKeyBinding": "Insira um atalho completo usando uma tecla não modificadora.",
    "errors.keyBindingConflict": "Escolha um atalho que ainda não esteja atribuído.",
    "errors.assistantSkillUnsupported": "Essa ação do Assistente não está disponível. Escolha outra ação.",
    "errors.assistantSkillScopeIncompatible": "Essa ação do Assistente não pode usar esta seleção. Altere a seleção e tente novamente.",
    "errors.assistantSelectionInvalid": "Essa seleção não pode ser usada para esta ação do Assistente. Altere e tente novamente.",
    "errors.assistantRequestConflict": "Essa ação do Assistente já está em execução. Espere terminar antes de tentar novamente.",
    "errors.assistantCheckpointConflict": "A conversa do Assistente mudou. Revise os detalhes atualizados da restauração e tente novamente.",
    "errors.assistantCheckpointInvalid": "Esse ponto de verificação de conversa não está mais disponível. Escolha outra mensagem do autor.",
    "errors.assistantEditConflict": "O artigo ou rascunho foi alterado. Salve ou resolva o trabalho atual e solicite uma nova edição.",
    "errors.assistantEditInvalid": (
        "O Assistente não conseguiu produzir um substituto seguro. Seu artigo não foi alterado. Experimente " +
        "uma seleção mais restrita ou uma instrução mais específica."
    ),
    "errors.assistantRetryInvalid": "Essa ação do Assistente não pode ser repetida. Inicie novamente no Assistente.",
    "errors.assistantCoordinatorFailed": "Não foi possível concluir a ação do Assistente. Seu artigo não foi alterado. Tente novamente.",
    "errors.skillPackageConflict": (
        "Esta habilidade foi alterada ou seu ID ou nome já está em uso. Recarregue a lista de habilidades, " +
        "escolha um nome disponível, se necessário, e tente novamente."
    ),
    "errors.skillRevisionNotFound": (
        "Essa versão salva de habilidade não está disponível. Liste novamente as versões salvas da habilidade " +
        "e escolha uma que exista."
    ),
} satisfies Partial<Record<MessageId, string>>;
