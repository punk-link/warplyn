import type { MessageId } from "../../messages.js";

export const typographyMessages = {
    "typography.customPair": "Par personalizado",
    "typography.articleSaved": "Preferências de tipografia do artigo salvas.",
    "typography.articleSaveHint": "As regras do artigo substituem ou desativam as regras de idioma herdadas. Salve para usá-los na próxima verificação.",
    "typography.reviewLanguage": "Revise as convenções: {language}",
    "typography.unknownLanguage": "Idioma não especificado",
    "typography.otherLanguage": "Outro idioma…",
    "typography.otherLanguageTitle": "Escolha outro idioma de escrita",
    "typography.languageCode": "Idioma ou variante regional",
    "typography.languageCodeHint": "Insira um nome ou variante regional, como polonês ou espanhol, Argentina. Códigos como ja ou es-AR também funcionam.",
    "typography.languageSaveFailed": "O idioma do artigo não pôde ser salvo. Tente novamente; seu texto não mudou.",
    "typography.useLanguage": "Usar linguagem",
    "typography.loadFailed": "Não foi possível carregar as preferências de tipografia. Tente novamente antes de editar ou verificar.",
    "typography.retryLoad": "Tente carregar novamente as preferências",
    "typography.openingMark": "Marca de abertura",
    "typography.closingMark": "Marca de fechamento",
    "typography.innerSpace": "Espaço entre aspas",
    "typography.punctuationMarks": "Sinais de pontuação",
    "typography.spaceBefore": "Espaço antes da pontuação",
    "typography.punctuationSpacing": "Espaçamento de pontuação",
    "typography.languageScope": "Linguagem tipográfica",
    "typography.chooseLanguage": "Escolha um idioma",
    "typography.languageHint": "Salve convenções separadas para cada idioma de escrita. Isso não altera o artigo ou o idioma da interface.",
    "typography.missingLanguage": "Escolha o idioma do artigo na barra de status antes de verificar a tipografia.",
    "typography.scope": "Aplicar regras a",
    "typography.languagePreferences": "Todos os artigos neste idioma",
    "typography.articlePreferences": "Este artigo apenas",
    "typography.preset": "Predefinição de convenção",
    "typography.noPreset": "Convenções personalizadas",
    "typography.presetPending": "{language}{separator}aguardando revisão no idioma nativo",
    "typography.presetReviewHint": "As visualizações predefinidas aguardam revisão no idioma nativo. Você pode adicionar suas próprias regras abaixo.",
    "typography.applyPreset": "Aplicar predefinição",
    "typography.legacyHint": "Suas regras globais anteriores são preservadas. Copie-os para um idioma para usá-los em novas verificações.",
    "typography.copyLegacy": "Copiar regras anteriores para este idioma",
    "typography.resetInheritance": "Restaurar regras herdadas",
    "typography.inheritanceHint": "A edição substitui uma regra herdada; a remoção o desativa. Restaure regras herdadas para limpar substituições.",
    "typography.noConvention": "Nenhuma regra mecânica aplicável. Escolha uma convenção ou adicione e salve regras para este idioma.",
    "typography.effectiveLanguage": "Verificando convenções para {language}",
    "typography.earlierConvention": (
        "Esta revisão usou preferências anteriores de idioma ou tipografia. Execute a verificação novamente " +
        "para usar as convenções atuais."
    ),
    "typography.legacyReview": "Esta revisão anterior não possui nenhuma convenção de idioma gravada.",
    "typography.source.preset": "Predefinido",
    "typography.source.language": "Preferência de idioma",
    "typography.source.article": "Substituição de artigo",
    "typography.invalid": (
        "As regras de tipografia não puderam ser salvas ou carregadas. Verifique regras incompletas, " +
        "duplicadas ou conflitantes e tente novamente. Se as regras salvas não puderem ser carregadas, " +
        "restaure um backup em Configurações."
    ),
    "typography.correctionsConflict": (
        "As correções tipográficas não puderam ser feitas de forma consistente. Ajuste as regras de " +
        "tipografia sobrepostas ou repetidas e verifique novamente. Seu artigo não foi alterado."
    ),
    "typography.required": "Não foi possível verificar a tipografia. Escolha o idioma do artigo e salve as regras para esse idioma no perfil de estilo.",
    "typography.title": "Regras de tipografia",
    "typography.saveHint": (
        "Salvar reconstrói o perfil localmente a partir das amostras atualmente incluídas e das regras " +
        "salvas, incluindo alterações de amostra pendentes. As alterações não salvas em outros formulários " +
        "são excluídas."
    ),
    "typography.empty": "Sem regras de tipografia. Adicione uma convenção para verificar pontuação ou espaçamento.",
    "typography.add": "Adicionar regra",
    "typography.remove": "Remover",
    "typography.save": "Salvar",
    "typography.edit": "Editar",
    "typography.closeEditor": "Fechar",
    "typography.savedRule": "Salvo",
    "typography.unsavedRule": "Não salvo",
    "typography.validation.invalid": "Preencha os campos desta regra antes de salvar.",
    "typography.validation.duplicate": "Esta convenção já está na lista. Edite ou remova a duplicata antes de salvar.",
    "typography.validation.conflict": "Essas convenções entram em conflito. Ajuste ou remova um antes de salvar.",
    "typography.validation.limit": "Mantenha no máximo 30 regras antes de salvar.",
    "typography.saveFailed": "Não foi possível salvar as regras de tipografia. Suas edições ainda estão aqui. Tente salvar novamente.",
    "typography.check": "Verifique a tipografia",
    "typography.saved": "Regras de tipografia salvas e perfil de estilo reconstruído.",
    "typography.localHint": (
        "As verificações mecânicas são executadas localmente. As regras contextuais exigem uma revisão " +
        "completa do estilo. O texto do artigo muda somente depois que você aceita uma proposta."
    ),
    "typography.kind": "Regra {number} convenção",
    "typography.ruleNumber": "Regra {number}",
    "typography.quotes": "Aspas",
    "typography.dash": "Traços de prosa",
    "typography.ellipsis": "Reticências",
    "typography.ellipsisSingle": "Caractere único de reticências, …",
    "typography.ellipsisThree": "Três pontos, ...",
    "typography.nonbreaking": "Par de tokens inquebrável",
    "typography.horizontal": "Espaços repetidos",
    "typography.literal": "Substituição de pontuação literal",
    "typography.contextual": "Instruções de tipografia contextual",
    "typography.outer": "Aspas externas",
    "typography.nested": "Aspas aninhadas",
    "typography.mark": "Marca preferida",
    "typography.spacing": "Espaçamento",
    "typography.withSpaces": "Com espaços",
    "typography.withoutSpaces": "Sem espaços",
    "typography.left": "Ficha esquerda",
    "typography.right": "Token certo",
    "typography.nbsp": "Espaço ininterrupto, U+00A0",
    "typography.narrowNbsp": "Espaço estreito e ininterrupto, U+202F",
    "typography.source": "Pontuação para substituir",
    "typography.replacement": "Pontuação de substituição",
    "typography.instruction": "Instruções para revisão completa do estilo",
    "typography.horizontalHint": "Use um espaço comum entre os tokens de prosa. O recuo, as quebras de linha e o código permanecem inalterados.",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.support": "Regras de tipografia: {rules}",
    "typography.noViolations": "Nenhuma violação de tipografia mecânica encontrada.",
    "typography.skipped": (
        "{count, plural, one {# o caso de cotação ambígua foi deixado inalterado.} other {# os casos de " +
        "cotação ambígua foram deixados inalterados.}} Revise-os no contexto."
    ),
    "typography.contextualSkipped": (
        "{count, plural, one {# regra contextual requer revisão completa do estilo.} other {# regras " +
        "contextuais exigem revisão completa do estilo.}}"
    ),
    "typography.olderProfile": (
        "Esta revisão usou a versão Style Profile {version}. As regras mudaram. Execute a verificação " +
        "novamente para usar o perfil atual."
    ),
    "typography.rulesOnly": (
        "Nenhuma amostra de escrita está incluída. Adicione amostras para derivar características de voz ou " +
        "use regras de tipografia explícitas para verificações locais."
    ),
    "typography.checkFailed": "Não foi possível verificar a tipografia. Salve regras válidas e tente novamente.",
    "typography.saveDraftFirst": "Salve o rascunho atual antes de verificar a tipografia. A verificação local utiliza a versão salva.",
    "typography.reviewProposal": "Proposta de Revisão",
    "typography.correction": "{source} → {replacement}",
    "typography.ordinarySpace": "espaço",
    "typography.deleted": "removido",
} satisfies Partial<Record<MessageId, string>>;
