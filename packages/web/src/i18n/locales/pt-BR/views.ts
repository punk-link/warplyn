import type { MessageId } from "../../messages.js";

export const viewsMessages = {
    "views.factCheck": "Verificação de fatos",
    "views.factCheckEmptyTitle": "Nenhum apontamento de verificação de fatos",
    "views.factCheckEmpty": "As verificações de fatos são consultivas e nunca alteram o artigo.",
    "views.factCheckRevision": "Versão salva revisada: {revision}",
    "views.factCheckHistory": "Histórico de checagem de fatos",
    "views.factCheckCurrent": "Versão salva Atual",
    "views.factCheckRunOption": "Versão salva {revision}, verificado {dateTime}",
    "views.factEvidenceFreshness": (
        "As evidências refletem as datas das fontes e da verificação. Afirmações sujeitas ao tempo podem " +
        "ter mudado. Execute a verificação novamente para atualizá-las."
    ),
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Execute a verificação de fatos",
    "views.factCheckStale": (
        "Estes apontamentos pertencem a uma versão salva anterior. Você pode consultá-los, mas precisa " +
        "executar a verificação novamente antes de propor correções."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {O assistente está buscando afirmações para verificar.} one {O assistente está " +
        "verificando # afirmação.} other {O assistente está verificando # afirmações.}} Estes são os " +
        "apontamentos da verificação anterior. Eles serão atualizados quando a nova verificação terminar."
    ),
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {O assistente está buscando afirmações para verificar.} one {O assistente está " +
        "verificando # afirmação.} other {O assistente está verificando # afirmações.}} Os apontamentos " +
        "aparecerão aqui quando a verificação terminar."
    ),
    "views.factCheckHistorical": (
        "Esta execução anterior de verificação de fatos é somente leitura. A última execução desta versão " +
        "salva permanece acionável."
    ),
    "views.factCheckIncomplete": (
        "Esta verificação de fatos está incompleta. Apenas os apontamentos concluídos são mostrados. " +
        "Execute-a novamente para verificar as afirmações restantes."
    ),
    "views.runFactCheckAgain": "Execute a verificação de fatos novamente",
    "views.selectAllNeedingReview": "Selecione todos que precisam de revisão",
    "views.proposeFactCorrections": "Propor correções ({count})",
    "views.proposeFactCorrection": "Propor correção",
    "views.factCheckFindings": "Apontamentos da verificação de fatos",
    "views.factStatus.supported": "Suportado",
    "views.factStatus.disputed": "Disputado",
    "views.factStatus.unverifiable": "Não verificável",
    "views.factImportance": "{importance} importância",
    "views.factEvidenceReused": "Evidências reutilizadas da Versão salva {revision}.",
    "views.factCheckedAt": "Verificado {dateTime}.",
    "views.acceptFactAsWritten": "Aceite como está escrito",
    "views.acceptFactEvidence": "Aceitar evidências",
    "views.factResolution": "Resolução: {resolution}",
    "views.factResolution.accepted_as_written": "Aceito conforme escrito",
    "views.factResolution.evidence_accepted": "Evidência aceita",
    "views.factResolution.corrected_or_removed": "Corrigido ou removido",
    "views.uncertainty": "Incerteza: {value}",
    "views.proposalReview": "Revisão da proposta",
    "views.continueWriting": "Continuar escrevendo",
    "views.resumeReview": "Retomar revisão",
    "views.earlierSuggestion": "Sugestão anterior",
    "views.earlierSuggestionHelp": "Seu artigo mudou desde que esta sugestão foi criada.",
    "views.updateSuggestion": "Sugestão de atualização",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.proposalEmptyTitle": "Nenhuma proposta para revisão",
    "views.proposalEmpty": "Use o Assistente Editorial para gerar uma proposta. Isso nunca mudará seu artigo automaticamente.",
    "views.proposalStale": (
        "Esta proposta está obsoleta porque o artigo tem uma versão salva mais recente. Gere uma nova " +
        "proposta antes de aceitar as alterações."
    ),
    "views.proposalAccepted": "Esta proposta foi aceita. Suas decisões são somente leitura.",
    "views.proposalCounts": (
        "{total, plural, =0 {Nenhuma sugestão} one {# sugestão} other {# sugestões}}{separator}{pending, plural, =0 " +
        "{Nenhuma pendência} one {# pendente} other {# pendente}}{separator}{accepted, plural, =0 {Não aceito} one {# " +
        "aceito} other {# aceito}}{separator}{rejected, plural, =0 {Não rejeitado} one {# rejeitado} other {# " +
        "rejeitado}}"
    ),
    "views.proposalWhole": "Proposta completa{separator}{changes, plural, one {# mudar} other {# mudanças}}",
    "views.acceptAll": "Marcar tudo como aceito",
    "views.setAllDecisions": "Decisões…",
    "views.resetAllDecisions": "Redefinir decisões",
    "views.applyProposal": "Aplicar",
    "views.proposedChangeInput": "Texto proposto para mudança {index}",
    "views.proposalAuthorEdited": "Você editou este texto. Revise seu texto antes de aplicá-lo.",
    "views.rejectAll": "Marcar todos como rejeitados",
    "views.acceptChange": "Aceitar",
    "views.rejectChange": "Rejeitar",
    "views.changeNavigation": "Alterar navegação",
    "views.previousChange": "Mudança anterior",
    "views.nextChange": "Próxima mudança",
    "views.findingNavigation": "Navegação dos apontamentos",
    "views.previousFinding": "Apontamento anterior",
    "views.nextFinding": "Próximo apontamento",
    "views.proposalDisplayMode": "Modo de exibição de proposta",
    "views.proposalSideBySide": "Lado a lado",
    "views.proposalStacked": "Empilhado",
    "views.proposalHighlight": "Destacar alterações",
    "views.reviewCurrentArticle": "Revise o artigo atual",
    "views.regenerateInAssistant": "Regenerar no Assistente",
    "views.proposalFallback": (
        "Esta proposta não pode ser separada com segurança em alterações individuais. Revise a proposta " +
        "completa antes de aceitá-la."
    ),
    "views.preservationWarnings": "Verifique os detalhes preservados",
    "views.dismissPreservationWarnings": "Ignorar avisos de preservação",
    "views.warning.url": "URLs alterados – verifique todos os links.",
    "views.warning.number": "Valores numéricos alterados – verifique cada número.",
    "views.warning.code": "Código alterado – verifique o código embutido e protegido.",
    "views.warning.claims": "As alterações podem mudar o significado factual. Verifique as afirmações antes de aceitar.",
    "views.proposalNoChanges": "Inalterado",
    "views.proposalSummaryLoading": "Resumindo essa mudança…",
    "views.proposalSummaryUnavailable": "Um breve resumo não está disponível. Revise o texto original e proposto abaixo.",
    "views.dismissProposal": "Dispensar proposta",
    "views.changeType.addition": "Adição{separator}Alteração {index} de {total}",
    "views.changeType.removal": "Remoção{separator}Alteração {index} de {total}",
    "views.changeType.replacement": "Substituição{separator}Mudança {index} de {total}",
    "views.decision.pending": "Pendente",
    "views.decision.accepted": "Aceito",
    "views.decision.rejected": "Rejeitado",
    "views.selectChange": "Selecione a alteração",
    "views.acceptSelected": "Aceitar alterações selecionadas",
    "views.rejectProposal": "Rejeitar proposta",
    "views.styleProfile": "Perfil de estilo",
    "views.styleIntro": "Seu corpus de estilo local nunca é enviado completo; apenas seu perfil derivado é usado.",
    "views.remove": "Remover",
    "views.sampleName": "Nome da amostra",
    "views.writingSample": "Amostra de escrita",
    "views.addToCorpus": "Adicionar ao corpus",
    "views.translations": "Traduções",
    "views.translationStale": "O artigo fonte mudou desde que esta proposta de tradução foi feita.",
    "views.translationArticleStale": (
        "O artigo fonte mudou desde que esta tradução foi aceita. Seu texto foi preservado. Abra o artigo " +
        "fonte para preparar uma tradução atualizada."
    ),
    "views.translationFresh": "Atual",
    "views.translationOutdated": "Desatualizado",
    "views.translationRefresh": "Atualizar",
    "views.translationRefreshTitle": "Atualizar tradução?",
    "views.translationRefreshTarget": "Tradução para atualização",
    "views.translationRefreshDescription": (
        "Aplique o revisado {language} texto para {title} como uma nova versão salva? Seu título permanece o " +
        "mesmo e as versões salvas anteriores permanecem disponíveis na História."
    ),
    "views.translationRefreshConfirm": "Atualizar",
    "views.translationRefreshDraft": "Salve ou descarte o rascunho da tradução antes de atualizá-la.",
    "views.translationRefreshUnavailable": (
        "Não foi possível atualizar a tradução porque a proposta não está disponível. Gere uma nova tradução " +
        "e revise-a novamente."
    ),
    "views.translationRefreshFailed": (
        "Não foi possível atualizar a tradução. Salve ou descarte seu rascunho, verifique se a fonte e a " +
        "tradução não foram alteradas e revise a proposta novamente."
    ),
    "views.translationEmptyTitle": "Nenhuma proposta de tradução",
    "views.translationEmpty": "Peça ao Assistente Editorial para traduzir este Artigo.",
    "views.translate": "Nova tradução…",
    "views.translationDialogTitle": "Nova tradução",
    "views.translationTargets": "Gere uma tradução e revise-a aqui. Os resultados anteriores são mantidos.",
    "views.translationTargetsEmpty": "Gere uma tradução e revise-a aqui. Os resultados anteriores são mantidos.",
    "views.translationGenerateDescription": "Traduzir {title}, versão salva de origem {revisionId}.",
    "views.translationGenerateDraft": "Seu rascunho não salvo será salvo como uma versão salva antes da geração.",
    "views.translationGenerateTargets": "Idiomas alvo",
    "views.translationGenerateConfirm": "Traduzir para {languages}",
    "views.translationGenerateBatch": "Traduzir para {count, number} idiomas",
    "views.translationPreservation": (
        "Os resultados e artigos existentes são mantidos. A atualização de um artigo de tradução requer " +
        "confirmação separada."
    ),
    "views.translationGenerationActive": "Uma solicitação está em execução. Espere que termine ou cancele antes de gerar traduções.",
    "views.translationChooseTargets": "Selecione pelo menos um idioma de destino para continuar.",
    "views.translationContextChanged": "A fonte mudou. Revise a fonte atualizada antes de confirmar novamente.",
    "views.translationReviewSource": "Revise a fonte atualizada",
    "views.translationResultSelector": "Resultado da tradução",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationLinkedIdentity": "Artigo {articleId}, versão salva de origem {revisionId}",
    "views.translationLinkedTarget": "{title}, Artigo {articleId}, versão salva de origem {revisionId}",
    "views.sourceLinkedPrefix": "Esta tradução está vinculada a",
    "views.sourceLinkedRevision": "na fonte Versão salva {revisionNumber}.",
    "views.existingTranslations": "Traduções existentes",
    "views.openTranslation": "{language}: {title}",
    "views.translationPair": "{source} fonte → {target} tradução",
    "views.translationOriginal": "Original",
    "views.translationResult": "{language} tradução",
    "views.translationDisplayMode": "Modo de exibição de tradução",
    "views.translationSideBySide": "Lado a lado",
    "views.translationAligned": "Parágrafos alinhados",
    "views.translationMissingOriginal": "Nenhum parágrafo original correspondente.",
    "views.translationMissingResult": "Nenhum parágrafo traduzido correspondente.",
    "views.translationProtectedValue": "Conteúdo protegido validado: {value}",
    "views.translationProtectedExplanation": (
        "Marcado para preservação exata nesta tradução. {count, plural, one {A ocorrência esperada é} other " +
        "{Todos # ocorrências esperadas são}} presente inalterado no texto traduzido. Esta verificação é " +
        "consultiva; revise a tradução antes de aceitá-la."
    ),
    "views.translationComparison": (
        "Comparação de tradução. Use Esquerda e Direita para acessar conteúdo protegido validado, Enter ou " +
        "Espaço para detalhes e Escape para fechar detalhes."
    ),
    "views.translationGenerating": "Traduzindo…",
    "views.translationGeneratingLanguages": "Traduzindo para {languages}…",
    "views.translationProtectedWarning": "Conteúdo protegido alterado ou ausente",
    "views.translationPublishingGuidance": "{profile} orientação",
    "views.editTranslation": "Editar",
    "views.rejectTranslation": "Rejeitar",
    "views.rejectTranslationTitle": "Rejeitar esta tradução?",
    "views.rejectTranslationDescription": (
        "Isso remove o gerado {language} tradução da aprovação. O artigo de origem e as traduções aceitas " +
        "permanecem inalterados."
    ),
    "views.confirmRejectTranslation": "Rejeitar",
    "views.characterCount": "{count} / {limit} caracteres",
    "views.restoreHeading": "Restaurar versão salva?",
    "views.restoreDescription": "A restauração cria uma nova versão salva imutável; não reescreve a história.",
    "views.restoreDraftDescription": (
        "Este Rascunho contém alterações que não estão em uma Versão salva. Salve-o primeiro ou descarte-o " +
        "antes de restaurar."
    ),
    "views.restoreRevision": "Restaurar versão salva",
    "views.saveAndRestore": "Salvar e restaurar",
    "views.discardDraftAndRestore": "Descartar e restaurar",
    "views.copy": "Cópia",
} satisfies Partial<Record<MessageId, string>>;
