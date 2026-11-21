import type { MessageId } from "../../messages.js";


export const typographyMessages = {
    "typography.add": "Adicionar regra",
    "typography.applyPreset": "Aplicar predefinição",
    "typography.articlePreferences": "Este artigo apenas",
    "typography.articleSaveHint": "As regras do artigo substituem ou desativam as regras de idioma herdadas. Salve para usá-los na próxima verificação.",
    "typography.articleSaved": "Preferências de tipografia do artigo salvas.",
    "typography.check": "Verifique a tipografia",
    "typography.checkFailed": "Não foi possível verificar a tipografia. Salve regras válidas e tente novamente.",
    "typography.chooseLanguage": "Escolha um idioma",
    "typography.closeEditor": "Fechar",
    "typography.closingMark": "Marca de fechamento",
    "typography.contextual": "Instruções de tipografia contextual",
    "typography.contextualSkipped": (
        "{count, plural, one {# regra contextual requer revisão completa do estilo.} other {# regras contextuais exigem" +
        " revisão completa do estilo.}}"
    ),
    "typography.copyLegacy": "Copiar regras anteriores para este idioma",
    "typography.correction": "{source} → {replacement}",
    "typography.correctionsConflict": (
        "As correções tipográficas não puderam ser feitas de forma consistente. Ajuste as regras de tipografi" +
        "a sobrepostas ou repetidas e verifique novamente. Seu artigo não foi alterado."
    ),
    "typography.customPair": "Par personalizado",
    "typography.dash": "Traços de prosa",
    "typography.deleted": "removido",
    "typography.earlierConvention": (
        "Esta revisão usou preferências anteriores de idioma ou tipografia. Execute a verificação novamente para usar a" +
        "s convenções atuais."
    ),
    "typography.edit": "Editar",
    "typography.effectiveLanguage": "Verificando convenções para {language}",
    "typography.ellipsis": "Reticências",
    "typography.ellipsisSingle": "Caractere único de reticências, …",
    "typography.ellipsisThree": "Três pontos, ...",
    "typography.empty": "Sem regras de tipografia. Adicione uma convenção para verificar pontuação ou espaçamento.",
    "typography.horizontal": "Espaços repetidos",
    "typography.horizontalHint": "Use um espaço comum entre os tokens de prosa. O recuo, as quebras de linha e o código permanecem inalterados.",
    "typography.inheritanceHint": "A edição substitui uma regra herdada; a remoção o desativa. Restaure regras herdadas para limpar substituições.",
    "typography.innerSpace": "Espaço entre aspas",
    "typography.instruction": "Instruções para revisão completa do estilo",
    "typography.invalid": (
        "As regras de tipografia não puderam ser salvas ou carregadas. Verifique regras incompletas, duplicad" +
        "as ou conflitantes e tente novamente. Se as regras salvas não puderem ser carregadas, restaure um ba" +
        "ckup em Configurações."
    ),
    "typography.kind": "Regra {number} convenção",
    "typography.languageCode": "Idioma ou variante regional",
    "typography.languageCodeHint": "Insira um nome ou variante regional, como polonês ou espanhol, Argentina. Códigos como ja ou es-AR também funcionam.",
    "typography.languageHint": "Salve convenções separadas para cada idioma de escrita. Isso não altera o artigo ou o idioma da interface.",
    "typography.languagePreferences": "Todos os artigos neste idioma",
    "typography.languageSaveFailed": "O idioma do artigo não pôde ser salvo. Tente novamente; seu texto não mudou.",
    "typography.languageScope": "Linguagem tipográfica",
    "typography.left": "Ficha esquerda",
    "typography.legacyHint": "Suas regras globais anteriores são preservadas. Copie-os para um idioma para usá-los em novas verificações.",
    "typography.legacyReview": "Esta revisão anterior não possui nenhuma convenção de idioma gravada.",
    "typography.literal": "Substituição de pontuação literal",
    "typography.loadFailed": "Não foi possível carregar as preferências de tipografia. Tente novamente antes de editar ou verificar.",
    "typography.localHint": (
        "As verificações mecânicas são executadas localmente. As regras contextuais exigem uma revisão comple" +
        "ta do estilo. O texto do artigo muda somente depois que você aceita uma proposta."
    ),
    "typography.mark": "Marca preferida",
    "typography.missingLanguage": "Escolha o idioma do artigo na barra de status antes de verificar a tipografia.",
    "typography.narrowNbsp": "Espaço estreito e ininterrupto, U+202F",
    "typography.nbsp": "Espaço ininterrupto, U+00A0",
    "typography.nested": "Aspas aninhadas",
    "typography.noConvention": "Nenhuma regra mecânica aplicável. Escolha uma convenção ou adicione e salve regras para este idioma.",
    "typography.noPreset": "Convenções personalizadas",
    "typography.noViolations": "Nenhuma violação de tipografia mecânica encontrada.",
    "typography.nonbreaking": "Par de tokens inquebrável",
    "typography.olderProfile": (
        "Esta revisão usou a versão Style Profile {version}. As regras mudaram. Execute a verificação novamente para us" +
        "ar o perfil atual."
    ),
    "typography.openingMark": "Marca de abertura",
    "typography.ordinarySpace": "espaço",
    "typography.otherLanguage": "Outro idioma…",
    "typography.otherLanguageTitle": "Escolha outro idioma de escrita",
    "typography.outer": "Aspas externas",
    "typography.preset": "Predefinição de convenção",
    "typography.presetPending": "{language}{separator}aguardando revisão no idioma nativo",
    "typography.presetReviewHint": "As visualizações predefinidas aguardam revisão no idioma nativo. Você pode adicionar suas próprias regras abaixo.",
    "typography.punctuationMarks": "Sinais de pontuação",
    "typography.punctuationSpacing": "Espaçamento de pontuação",
    "typography.quotes": "Aspas",
    "typography.remove": "Remover",
    "typography.replacement": "Pontuação de substituição",
    "typography.required": "Não foi possível verificar a tipografia. Escolha o idioma do artigo e salve as regras para esse idioma no perfil de estilo.",
    "typography.resetInheritance": "Restaurar regras herdadas",
    "typography.retryLoad": "Tente carregar novamente as preferências",
    "typography.reviewLanguage": "Revise as convenções: {language}",
    "typography.reviewProposal": "Revisar proposta",
    "typography.right": "Token certo",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.ruleNumber": "Regra {number}",
    "typography.rulesOnly": (
        "Nenhuma amostra de escrita está incluída. Adicione amostras para derivar características de voz ou u" +
        "se regras de tipografia explícitas para verificações locais."
    ),
    "typography.save": "Salvar",
    "typography.saveDraftFirst": "Salve o rascunho atual antes de verificar a tipografia. A verificação local utiliza a versão salva.",
    "typography.saveFailed": "Não foi possível salvar as regras de tipografia. Suas edições ainda estão aqui. Tente salvar novamente.",
    "typography.saveHint": (
        "Salvar reconstrói o perfil localmente a partir das amostras atualmente incluídas e das regras salvas" +
        ", incluindo alterações de amostra pendentes. As alterações não salvas em outros formulários são excl" +
        "uídas."
    ),
    "typography.saved": "Regras de tipografia salvas e perfil de estilo reconstruído.",
    "typography.savedRule": "Salvo",
    "typography.scope": "Aplicar regras a",
    "typography.skipped": (
        "{count, plural, one {# o caso de cotação ambígua foi deixado inalterado.} other {# os casos de cotaç" +
        "ão ambígua foram deixados inalterados.}} Revise-os no contexto."
    ),
    "typography.source": "Pontuação para substituir",
    "typography.source.article": "Substituição de artigo",
    "typography.source.language": "Preferência de idioma",
    "typography.source.preset": "Predefinido",
    "typography.spaceBefore": "Espaço antes da pontuação",
    "typography.spacing": "Espaçamento",
    "typography.support": "Regras de tipografia: {rules}",
    "typography.title": "Regras de tipografia",
    "typography.unknownLanguage": "Idioma não especificado",
    "typography.unsavedRule": "Não salvo",
    "typography.useLanguage": "Usar linguagem",
    "typography.validation.conflict": "Essas convenções entram em conflito. Ajuste ou remova um antes de salvar.",
    "typography.validation.duplicate": "Esta convenção já está na lista. Edite ou remova a duplicata antes de salvar.",
    "typography.validation.invalid": "Preencha os campos desta regra antes de salvar.",
    "typography.validation.limit": "Mantenha no máximo 30 regras antes de salvar.",
    "typography.withSpaces": "Com espaços",
    "typography.withoutSpaces": "Sem espaços",
} satisfies Partial<Record<MessageId, string>>;
