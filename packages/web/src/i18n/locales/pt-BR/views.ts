import type { MessageId } from "../../messages.js";


export const viewsMessages = {
    "views.acceptAll": "Marcar tudo como aceito",
    "views.acceptChange": "Aceitar",
    "views.acceptFactAsWritten": "Aceite como está escrito",
    "views.acceptFactEvidence": "Aceitar evidências",
    "views.acceptSelected": "Aceitar alterações selecionadas",
    "views.addToCorpus": "Adicionar ao corpus",
    "views.applyProposal": "Aplicar",
    "views.changeNavigation": "Alterar navegação",
    "views.changeType.addition": "Adição{separator}Alteração {index} de {total}",
    "views.changeType.removal": "Remoção{separator}Alteração {index} de {total}",
    "views.changeType.replacement": "Substituição{separator}Mudança {index} de {total}",
    "views.characterCount": "{count} / {limit} caracteres",
    "views.confirmRejectTranslation": "Rejeitar",
    "views.continueWriting": "Continuar escrevendo",
    "views.copy": "Cópia",
    "views.decision.accepted": "Aceito",
    "views.decision.pending": "Pendente",
    "views.decision.rejected": "Rejeitado",
    "views.discardDraftAndRestore": "Descartar e restaurar",
    "views.dismissPreservationWarnings": "Ignorar avisos de preservação",
    "views.dismissProposal": "Dispensar proposta",
    "views.earlierSuggestion": "Sugestão anterior",
    "views.earlierSuggestionHelp": "Seu artigo mudou desde que esta sugestão foi criada.",
    "views.editTranslation": "Editar",
    "views.existingTranslations": "Traduções existentes",
    "views.factCheck": "Verificação de fatos",
    "views.factCheckCurrent": "Versão salva Atual",
    "views.factCheckEmpty": "As verificações de fatos são consultivas e nunca alteram o artigo.",
    "views.factCheckEmptyTitle": "Nenhum apontamento de verificação de fatos",
    "views.factCheckFindings": "Apontamentos da verificação de fatos",
    "views.factCheckHistorical": (
        "Esta execução anterior de verificação de fatos é somente leitura. A última execução desta versão sal" +
        "va permanece acionável."
    ),
    "views.factCheckHistory": "Histórico de checagem de fatos",
    "views.factCheckIncomplete": (
        "Esta verificação de fatos está incompleta. Apenas os apontamentos concluídos são mostrados. Execute-a novament" +
        "e para verificar as afirmações restantes."
    ),
    "views.factCheckRevision": "Versão salva revisada: {revision}",
    "views.factCheckRunOption": "Versão salva {revision}, verificado {dateTime}",
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {O assistente está buscando afirmações para verificar.} one {O assistente está ve" +
        "rificando # afirmação.} other {O assistente está verificando # afirmações.}} Os apontamentos aparece" +
        "rão aqui quando a verificação terminar."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {O assistente está buscando afirmações para verificar.} one {O assistente está ve" +
        "rificando # afirmação.} other {O assistente está verificando # afirmações.}} Estes são os apontament" +
        "os da verificação anterior. Eles serão atualizados quando a nova verificação terminar."
    ),
    "views.factCheckStale": (
        "Estes apontamentos pertencem a uma versão salva anterior. Você pode consultá-los, mas precisa executar a verif" +
        "icação novamente antes de propor correções."
    ),
    "views.factCheckedAt": "Verificado {dateTime}.",
    "views.factEvidenceFreshness": (
        "As evidências refletem as datas das fontes e da verificação. Afirmações sujeitas ao tempo podem ter mudado. Ex" +
        "ecute a verificação novamente para atualizá-las."
    ),
    "views.factEvidenceReused": "Evidências reutilizadas da Versão salva {revision}.",
    "views.factImportance": "{importance} importância",
    "views.factResolution": "Resolução: {resolution}",
    "views.factResolution.accepted_as_written": "Aceito conforme escrito",
    "views.factResolution.corrected_or_removed": "Corrigido ou removido",
    "views.factResolution.evidence_accepted": "Evidência aceita",
    "views.factStatus.disputed": "Disputado",
    "views.factStatus.supported": "Suportado",
    "views.factStatus.unverifiable": "Não verificável",
    "views.findingNavigation": "Navegação dos apontamentos",
    "views.nextChange": "Próxima mudança",
    "views.nextFinding": "Próximo apontamento",
    "views.openTranslation": "{language}: {title}",
    "views.preservationWarnings": "Verifique os detalhes preservados",
    "views.previousChange": "Mudança anterior",
    "views.previousFinding": "Apontamento anterior",
    "views.proposalAccepted": "Esta proposta foi aceita. Suas decisões são somente leitura.",
    "views.proposalAuthorEdited": "Você editou este texto. Revise seu texto antes de aplicá-lo.",
    "views.proposalCounts": (
        "{total, plural, =0 {Nenhuma sugestão} one {# sugestão} other {# sugestões}}{separator}{pending, plur" +
        "al, =0 {Nenhuma pendência} one {# pendente} other {# pendente}}{separator}{accepted, plural, =0 {Não" +
        " aceito} one {# aceito} other {# aceito}}{separator}{rejected, plural, =0 {Não rejeitado} one {# rej" +
        "eitado} other {# rejeitado}}"
    ),
    "views.proposalDisplayMode": "Modo de exibição de proposta",
    "views.proposalEmpty": "Use o Assistente Editorial para gerar uma proposta. Isso nunca mudará seu artigo automaticamente.",
    "views.proposalEmptyTitle": "Nenhuma proposta para revisão",
    "views.proposalFallback": (
        "Esta proposta não pode ser separada com segurança em alterações individuais. Revise a proposta compl" +
        "eta antes de aceitá-la."
    ),
    "views.proposalHighlight": "Destacar alterações",
    "views.proposalNoChanges": "Inalterado",
    "views.proposalReview": "Revisão da proposta",
    "views.proposalSideBySide": "Lado a lado",
    "views.proposalStacked": "Empilhado",
    "views.proposalStale": (
        "Esta proposta está obsoleta porque o artigo tem uma versão salva mais recente. Gere uma nova proposta antes de" +
        " aceitar as alterações."
    ),
    "views.proposalSummaryLoading": "Resumindo essa mudança…",
    "views.proposalSummaryUnavailable": "Um breve resumo não está disponível. Revise o texto original e proposto abaixo.",
    "views.proposalWhole": "Proposta completa{separator}{changes, plural, one {# mudar} other {# mudanças}}",
    "views.proposeFactCorrection": "Propor correção",
    "views.proposeFactCorrections": "Propor correções ({count})",
    "views.proposedChangeInput": "Texto proposto para mudança {index}",
    "views.regenerateInAssistant": "Regenerar no Assistente",
    "views.rejectAll": "Marcar todos como rejeitados",
    "views.rejectChange": "Rejeitar",
    "views.rejectProposal": "Rejeitar proposta",
    "views.rejectTranslation": "Rejeitar",
    "views.rejectTranslationDescription": (
        "Isso remove o gerado {language} tradução da aprovação. O artigo de origem e as traduções aceitas permanecem in" +
        "alterados."
    ),
    "views.rejectTranslationTitle": "Rejeitar esta tradução?",
    "views.remove": "Remover",
    "views.resetAllDecisions": "Redefinir decisões",
    "views.restoreDescription": "A restauração cria uma nova versão salva imutável; não reescreve a história.",
    "views.restoreDraftDescription": (
        "Este Rascunho contém alterações que não estão em uma Versão salva. Salve-o primeiro ou descarte-o an" +
        "tes de restaurar."
    ),
    "views.restoreHeading": "Restaurar versão salva?",
    "views.restoreRevision": "Restaurar versão salva",
    "views.resumeReview": "Retomar revisão",
    "views.reviewCurrentArticle": "Revise o artigo atual",
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Execute a verificação de fatos",
    "views.runFactCheckAgain": "Execute a verificação de fatos novamente",
    "views.sampleName": "Nome da amostra",
    "views.saveAndRestore": "Salvar e restaurar",
    "views.selectAllNeedingReview": "Selecione todos que precisam de revisão",
    "views.selectChange": "Selecione a alteração",
    "views.setAllDecisions": "Decisões…",
    "views.sourceLinkedPrefix": "Esta tradução está vinculada a",
    "views.sourceLinkedRevision": "na fonte Versão salva {revisionNumber}.",
    "views.styleIntro": "Seu corpus de estilo local nunca é enviado completo; apenas seu perfil derivado é usado.",
    "views.styleProfile": "Perfil de estilo",
    "views.translate": "Nova tradução…",
    "views.translationAligned": "Parágrafos alinhados",
    "views.translationArticleStale": (
        "O artigo fonte mudou desde que esta tradução foi aceita. Seu texto foi preservado. Abra o artigo fonte para pr" +
        "eparar uma tradução atualizada."
    ),
    "views.translationChooseTargets": "Selecione pelo menos um idioma de destino para continuar.",
    "views.translationComparison": (
        "Comparação de tradução. Use Esquerda e Direita para acessar conteúdo protegido validado, Enter ou Espaço para " +
        "detalhes e Escape para fechar detalhes."
    ),
    "views.translationContextChanged": "A fonte mudou. Revise a fonte atualizada antes de confirmar novamente.",
    "views.translationDialogTitle": "Nova tradução",
    "views.translationDisplayMode": "Modo de exibição de tradução",
    "views.translationEmpty": "Peça ao Assistente Editorial para traduzir este Artigo.",
    "views.translationEmptyTitle": "Nenhuma proposta de tradução",
    "views.translationFresh": "Atual",
    "views.translationGenerateBatch": "Traduzir para {count, number} idiomas",
    "views.translationGenerateConfirm": "Traduzir para {languages}",
    "views.translationGenerateDescription": "Traduzir {title}, versão salva de origem {revisionId}.",
    "views.translationGenerateDraft": "Seu rascunho não salvo será salvo como uma versão salva antes da geração.",
    "views.translationGenerateTargets": "Idiomas alvo",
    "views.translationGenerating": "Traduzindo…",
    "views.translationGeneratingLanguages": "Traduzindo para {languages}…",
    "views.translationGenerationActive": "Uma solicitação está em execução. Espere que termine ou cancele antes de gerar traduções.",
    "views.translationLinkedIdentity": "Artigo {articleId}, versão salva de origem {revisionId}",
    "views.translationLinkedTarget": "{title}, Artigo {articleId}, versão salva de origem {revisionId}",
    "views.translationMissingOriginal": "Nenhum parágrafo original correspondente.",
    "views.translationMissingResult": "Nenhum parágrafo traduzido correspondente.",
    "views.translationOriginal": "Original",
    "views.translationOutdated": "Desatualizado",
    "views.translationPair": "{source} fonte → {target} tradução",
    "views.translationPreservation": (
        "Os resultados e artigos existentes são mantidos. A atualização de um artigo de tradução requer confi" +
        "rmação separada."
    ),
    "views.translationProtectedExplanation": (
        "Marcado para preservação exata nesta tradução. {count, plural, one {A ocorrência esperada é} other {" +
        "Todos # ocorrências esperadas são}} presente inalterado no texto traduzido. Esta verificação é consu" +
        "ltiva; revise a tradução antes de aceitá-la."
    ),
    "views.translationProtectedValue": "Conteúdo protegido validado: {value}",
    "views.translationProtectedWarning": "Conteúdo protegido alterado ou ausente",
    "views.translationPublishingGuidance": "{profile} orientação",
    "views.translationRefresh": "Atualizar",
    "views.translationRefreshConfirm": "Atualizar",
    "views.translationRefreshDescription": (
        "Aplique o revisado {language} texto para {title} como uma nova versão salva? Seu título permanece o " +
        "mesmo e as versões salvas anteriores permanecem disponíveis na História."
    ),
    "views.translationRefreshDraft": "Salve ou descarte o rascunho da tradução antes de atualizá-la.",
    "views.translationRefreshFailed": (
        "Não foi possível atualizar a tradução. Salve ou descarte seu rascunho, verifique se a fonte e a tradução não f" +
        "oram alteradas e revise a proposta novamente."
    ),
    "views.translationRefreshTarget": "Tradução para atualização",
    "views.translationRefreshTitle": "Atualizar tradução?",
    "views.translationRefreshUnavailable": (
        "Não foi possível atualizar a tradução porque a proposta não está disponível. Gere uma nova tradução e revise-a" +
        " novamente."
    ),
    "views.translationResult": "{language} tradução",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationResultSelector": "Resultado da tradução",
    "views.translationReviewSource": "Revise a fonte atualizada",
    "views.translationSideBySide": "Lado a lado",
    "views.translationStale": "O artigo fonte mudou desde que esta proposta de tradução foi feita.",
    "views.translationTargets": "Gere uma tradução e revise-a aqui. Os resultados anteriores são mantidos.",
    "views.translationTargetsEmpty": "Gere uma tradução e revise-a aqui. Os resultados anteriores são mantidos.",
    "views.translations": "Traduções",
    "views.uncertainty": "Incerteza: {value}",
    "views.updateSuggestion": "Sugestão de atualização",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.warning.claims": "As alterações podem mudar o significado factual. Verifique as afirmações antes de aceitar.",
    "views.warning.code": "Código alterado – verifique o código embutido e protegido.",
    "views.warning.number": "Valores numéricos alterados – verifique cada número.",
    "views.warning.url": "URLs alterados – verifique todos os links.",
    "views.writingSample": "Amostra de escrita",
} satisfies Partial<Record<MessageId, string>>;
