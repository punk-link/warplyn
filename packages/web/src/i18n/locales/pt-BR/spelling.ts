import type { MessageId } from "../../messages.js";


export const spellingMessages = {
    "spelling.add": "Adicionar palavras",
    "spelling.addWords": "Palavras para adicionar",
    "spelling.correctionFailed": (
        "Não foi possível aplicar esta correção ortográfica. Abra novamente o menu de sugestões ou digite a c" +
        "orreção em seu artigo."
    ),
    "spelling.desktopOnly": (
        "Use o aplicativo de desktop para baixar dicionários de idiomas e gerenciar seu dicionário pessoal. N" +
        "o navegador, a ortografia segue as configurações do seu navegador."
    ),
    "spelling.dictionaries": "Dicionários de idiomas",
    "spelling.download": "Baixar dicionários",
    "spelling.failed": "Indisponível. Tente baixar novamente.",
    "spelling.filterLanguages": "Filtrar idiomas",
    "spelling.invalidWords": "Insira até 500 palavras, uma por linha, com no máximo 128 caracteres cada e 64 KiB no total.",
    "spelling.languageFailed": (
        "Não foi possível ativar a ortografia para este idioma do artigo. Tente novamente a seleção do idioma ou prepar" +
        "e seu dicionário nas Configurações de Ortografia."
    ),
    "spelling.languageVariant": "{language} ({code})",
    "spelling.loadFailed": "Não foi possível carregar as configurações de ortografia. Tente carregá-los novamente.",
    "spelling.loaded": "Configurações de ortografia carregadas.",
    "spelling.loading": "Carregando configurações de ortografia…",
    "spelling.localHint": (
        "As verificações ortográficas e palavras pessoais permanecem neste dispositivo. O download de dicioná" +
        "rios de idiomas requer acesso à Internet e contato com o CDN do dicionário do Google."
    ),
    "spelling.noLanguages": "Nenhum idioma correspondente.",
    "spelling.noWords": "Nenhuma palavra pessoal correspondente.",
    "spelling.operationFailed": (
        "Não foi possível atualizar as configurações de ortografia. Tente novamente a alteração. Para downloads, verifi" +
        "que sua conexão com a internet."
    ),
    "spelling.partial": "Algumas palavras não puderam ser adicionadas. Corrija ou tente novamente as entradas no Words para adicionar.",
    "spelling.persistenceHint": (
        "Dicionários e palavras pessoais pertencem a esta instalação. Os backups e restaurações de artigos nã" +
        "o os incluem. A exclusão dos dados do artigo não remove palavras do dicionário do sistema operaciona" +
        "l; remova essas palavras aqui."
    ),
    "spelling.personal": "Dicionário pessoal",
    "spelling.personalHint": (
        "Mantenha termos técnicos como PostgreSQL e gRPC em um dicionário pessoal compartilhado entre artigos" +
        " e linguagens ortográficas."
    ),
    "spelling.preload": "Prepare-se para escrever offline",
    "spelling.preloadHint": "Selecione idiomas para se preparar para a escrita offline. O idioma do seu artigo permanece o mesmo.",
    "spelling.preparing": "Preparando",
    "spelling.ready": "Baixado",
    "spelling.remove": "Remover",
    "spelling.removeWord": "Remover {word} do dicionário pessoal",
    "spelling.retry": "Tentar novamente",
    "spelling.savedWords": "Palavras salvas",
    "spelling.search": "Pesquisar dicionário pessoal",
    "spelling.searchHint": "Pesquise os termos salvos e remova as palavras que deseja que o corretor ortográfico verifique novamente.",
    "spelling.systemHint": (
        "Adicionar ou remover uma palavra também altera o dicionário personalizado do seu sistema operacional e pode af" +
        "etar outros aplicativos."
    ),
    "spelling.unload": "Descarregar",
    "spelling.unloadLanguage": "Descarregar {language} dicionário",
    "spelling.unloaded": "Descarregado",
    "spelling.unverified": "Disponível",
    "spelling.updated": "Configurações de ortografia atualizadas.",
    "spelling.wordFailed": (
        "Não foi possível adicionar esta palavra ao dicionário pessoal. Abra Configurações de ortografia e te" +
        "nte adicioná-lo novamente."
    ),
    "spelling.wordsHint": (
        "Insira uma palavra ou termo técnico por linha, com até 128 caracteres cada. Adicione até 500 palavra" +
        "s por vez. As entradas com falha permanecem aqui para correção ou nova tentativa."
    ),
    "spelling.working": "Atualizando configurações de ortografia…",
} satisfies Partial<Record<MessageId, string>>;
