import type { MessageId } from "../../messages.js";

export const spellingMessages = {
    "spelling.desktopOnly": (
        "Use o aplicativo de desktop para baixar dicionários de idiomas e gerenciar seu dicionário pessoal. " +
        "No navegador, a ortografia segue as configurações do seu navegador."
    ),
    "spelling.localHint": (
        "As verificações ortográficas e palavras pessoais permanecem neste dispositivo. O download de " +
        "dicionários de idiomas requer acesso à Internet e contato com o CDN do dicionário do Google."
    ),
    "spelling.dictionaries": "Dicionários de idiomas",
    "spelling.preload": "Prepare-se para escrever offline",
    "spelling.preloadHint": "Selecione idiomas para se preparar para a escrita offline. O idioma do seu artigo permanece o mesmo.",
    "spelling.download": "Baixar dicionários",
    "spelling.languageVariant": "{language} ({code})",
    "spelling.filterLanguages": "Filtrar idiomas",
    "spelling.noLanguages": "Nenhum idioma correspondente.",
    "spelling.unverified": "Disponível",
    "spelling.unloaded": "Descarregado",
    "spelling.unload": "Descarregar",
    "spelling.unloadLanguage": "Descarregar {language} dicionário",
    "spelling.preparing": "Preparando",
    "spelling.ready": "Baixado",
    "spelling.failed": "Indisponível. Tente baixar novamente.",
    "spelling.personal": "Dicionário pessoal",
    "spelling.personalHint": (
        "Mantenha termos técnicos como PostgreSQL e gRPC em um dicionário pessoal compartilhado entre artigos " +
        "e linguagens ortográficas."
    ),
    "spelling.systemHint": (
        "Adicionar ou remover uma palavra também altera o dicionário personalizado do seu sistema operacional " +
        "e pode afetar outros aplicativos."
    ),
    "spelling.addWords": "Palavras para adicionar",
    "spelling.wordsHint": (
        "Insira uma palavra ou termo técnico por linha, com até 128 caracteres cada. Adicione até 500 " +
        "palavras por vez. As entradas com falha permanecem aqui para correção ou nova tentativa."
    ),
    "spelling.add": "Adicionar palavras",
    "spelling.remove": "Remover",
    "spelling.removeWord": "Remover {word} do dicionário pessoal",
    "spelling.savedWords": "Palavras salvas",
    "spelling.search": "Pesquisar dicionário pessoal",
    "spelling.searchHint": "Pesquise os termos salvos e remova as palavras que deseja que o corretor ortográfico verifique novamente.",
    "spelling.noWords": "Nenhuma palavra pessoal correspondente.",
    "spelling.persistenceHint": (
        "Dicionários e palavras pessoais pertencem a esta instalação. Os backups e restaurações de artigos " +
        "não os incluem. A exclusão dos dados do artigo não remove palavras do dicionário do sistema " +
        "operacional; remova essas palavras aqui."
    ),
    "spelling.loading": "Carregando configurações de ortografia…",
    "spelling.loaded": "Configurações de ortografia carregadas.",
    "spelling.loadFailed": "Não foi possível carregar as configurações de ortografia. Tente carregá-los novamente.",
    "spelling.retry": "Tentar novamente",
    "spelling.working": "Atualizando configurações de ortografia…",
    "spelling.updated": "Configurações de ortografia atualizadas.",
    "spelling.partial": "Algumas palavras não puderam ser adicionadas. Corrija ou tente novamente as entradas no Words para adicionar.",
    "spelling.operationFailed": (
        "Não foi possível atualizar as configurações de ortografia. Tente novamente a alteração. Para " +
        "downloads, verifique sua conexão com a internet."
    ),
    "spelling.invalidWords": "Insira até 500 palavras, uma por linha, com no máximo 128 caracteres cada e 64 KiB no total.",
    "spelling.wordFailed": (
        "Não foi possível adicionar esta palavra ao dicionário pessoal. Abra Configurações de ortografia e " +
        "tente adicioná-lo novamente."
    ),
    "spelling.correctionFailed": (
        "Não foi possível aplicar esta correção ortográfica. Abra novamente o menu de sugestões ou digite a " +
        "correção em seu artigo."
    ),
    "spelling.languageFailed": (
        "Não foi possível ativar a ortografia para este idioma do artigo. Tente novamente a seleção do idioma " +
        "ou prepare seu dicionário nas Configurações de Ortografia."
    ),
} satisfies Partial<Record<MessageId, string>>;
