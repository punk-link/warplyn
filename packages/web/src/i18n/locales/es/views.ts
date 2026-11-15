import type { MessageId } from "../../messages.js";

export const views = {
    "views.factCheck": "Verificación de datos",
    "views.factCheckEmptyTitle": "Sin observaciones de verificación de datos",
    "views.factCheckEmpty": "Las verificaciones son orientativas y nunca modifican el artículo.",
    "views.factCheckRevision": "Versión revisada: {revision}",
    "views.factCheckHistory": "Historial de verificaciones",
    "views.factCheckCurrent": "Versión actual",
    "views.factCheckRunOption": "Versión {revision}, verificada el {dateTime}",
    "views.factEvidenceFreshness": (
        "Las pruebas reflejan las fechas de las fuentes y de la verificación. Las afirmaciones sujetas al " +
        "tiempo pueden haber cambiado; repite la verificación para actualizarlas."
    ),
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Verificar datos",
    "views.factCheckStale": (
        "Estas observaciones pertenecen a una versión anterior. Puedes leerlas, pero no crear correcciones " +
        "hasta repetir la verificación."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {El asistente está buscando afirmaciones que verificar.} one {El asistente está " +
        "verificando # afirmación.} other {El asistente está verificando # afirmaciones.}} Estas son las " +
        "observaciones de la verificación anterior; se actualizarán cuando termine la nueva."
    ),
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {El asistente está buscando afirmaciones que verificar.} one {El asistente está " +
        "verificando # afirmación.} other {El asistente está verificando # afirmaciones.}} Las observaciones " +
        "aparecerán aquí al terminar."
    ),
    "views.factCheckHistorical": "Esta verificación anterior es de solo lectura. Puedes actuar sobre la última verificación de esta versión.",
    "views.factCheckIncomplete": (
        "Esta verificación está incompleta. Solo se muestran las observaciones completadas. Repítela para " +
        "revisar las afirmaciones restantes."
    ),
    "views.runFactCheckAgain": "Verificar datos de nuevo",
    "views.selectAllNeedingReview": "Seleccionar todo lo que necesita revisión",
    "views.proposeFactCorrections": "Proponer correcciones ({count})",
    "views.proposeFactCorrection": "Proponer corrección",
    "views.factCheckFindings": "Observaciones de verificación de datos",
    "views.factStatus.supported": "Respaldada",
    "views.factStatus.disputed": "Cuestionada",
    "views.factStatus.unverifiable": "No verificable",
    "views.factImportance": "Importancia {importance}",
    "views.factEvidenceReused": "Pruebas reutilizadas de la versión {revision}.",
    "views.factCheckedAt": "Verificado el {dateTime}.",
    "views.acceptFactAsWritten": "Aceptar tal como está",
    "views.acceptFactEvidence": "Aceptar pruebas",
    "views.factResolution": "Resolución: {resolution}",
    "views.factResolution.accepted_as_written": "Aceptada tal como está",
    "views.factResolution.evidence_accepted": "Pruebas aceptadas",
    "views.factResolution.corrected_or_removed": "Corregida o eliminada",
    "views.uncertainty": "Incertidumbre: {value}",
    "views.proposalReview": "Revisión de propuestas",
    "views.continueWriting": "Seguir escribiendo",
    "views.resumeReview": "Continuar revisión",
    "views.earlierSuggestion": "Sugerencia anterior",
    "views.earlierSuggestionHelp": "El artículo ha cambiado desde que se creó esta sugerencia.",
    "views.updateSuggestion": "Actualizar sugerencia",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.proposalEmptyTitle": "No hay propuestas que revisar",
    "views.proposalEmpty": "Usa el asistente editorial para generar una propuesta. Nunca cambiará el artículo automáticamente.",
    "views.proposalStale": (
        "Esta propuesta está desactualizada porque el artículo tiene una versión más reciente. Genera una " +
        "nueva propuesta antes de aceptar cambios."
    ),
    "views.proposalAccepted": "Esta propuesta se aceptó. Sus decisiones son de solo lectura.",
    "views.proposalCounts": (
        "{total, plural, =0 {Sin sugerencias} one {# sugerencia} other {# sugerencias}}{separator}{pending, plural, " +
        "=0 {Ninguna pendiente} one {# pendiente} other {# pendientes}}{separator}{accepted, plural, =0 {Ninguna " +
        "aceptada} one {# aceptada} other {# aceptadas}}{separator}{rejected, plural, =0 {Ninguna rechazada} one {# " +
        "rechazada} other {# rechazadas}}"
    ),
    "views.proposalWhole": "Propuesta completa{separator}{changes, plural, one {# cambio} other {# cambios}}",
    "views.acceptAll": "Marcar todo como aceptado",
    "views.setAllDecisions": "Decisiones…",
    "views.resetAllDecisions": "Restablecer decisiones",
    "views.applyProposal": "Aplicar",
    "views.proposedChangeInput": "Texto propuesto para el cambio {index}",
    "views.proposalAuthorEdited": "Has editado esta redacción. Revisa el texto antes de aplicarlo.",
    "views.rejectAll": "Marcar todo como rechazado",
    "views.acceptChange": "Aceptar",
    "views.rejectChange": "Rechazar",
    "views.changeNavigation": "Navegación entre cambios",
    "views.previousChange": "Cambio anterior",
    "views.nextChange": "Cambio siguiente",
    "views.findingNavigation": "Navegación entre observaciones",
    "views.previousFinding": "Observación anterior",
    "views.nextFinding": "Observación siguiente",
    "views.proposalDisplayMode": "Modo de visualización de propuestas",
    "views.proposalSideBySide": "En paralelo",
    "views.proposalStacked": "Una debajo de otra",
    "views.proposalHighlight": "Resaltar cambios",
    "views.reviewCurrentArticle": "Revisar el artículo actual",
    "views.regenerateInAssistant": "Volver a generar en el asistente",
    "views.proposalFallback": (
        "No se puede separar esta propuesta en cambios individuales de forma segura. Revisa la propuesta " +
        "completa antes de aceptarla."
    ),
    "views.preservationWarnings": "Comprobar detalles conservados",
    "views.dismissPreservationWarnings": "Cerrar advertencias de conservación",
    "views.warning.url": "Las URL han cambiado. Verifica cada enlace.",
    "views.warning.number": "Los valores numéricos han cambiado. Verifica cada número.",
    "views.warning.code": "El código ha cambiado. Verifica el código en línea y en bloques.",
    "views.warning.claims": "La prosa modificada puede alterar el significado de los hechos; verifica las afirmaciones antes de aceptar.",
    "views.proposalNoChanges": "Sin cambios",
    "views.proposalSummaryLoading": "Resumiendo este cambio…",
    "views.proposalSummaryUnavailable": "No hay un resumen breve disponible. Revisa el texto original y el propuesto abajo.",
    "views.dismissProposal": "Descartar propuesta",
    "views.changeType.addition": "Adición{separator}Cambio {index} de {total}",
    "views.changeType.removal": "Eliminación{separator}Cambio {index} de {total}",
    "views.changeType.replacement": "Sustitución{separator}Cambio {index} de {total}",
    "views.decision.pending": "Pendiente",
    "views.decision.accepted": "Aceptado",
    "views.decision.rejected": "Rechazado",
    "views.selectChange": "Seleccionar cambio",
    "views.acceptSelected": "Aceptar cambios seleccionados",
    "views.rejectProposal": "Rechazar propuesta",
    "views.styleProfile": "Perfil de estilo",
    "views.styleIntro": "El corpus de estilo local nunca se envía completo; solo se usa el perfil que se deriva de él.",
    "views.remove": "Eliminar",
    "views.sampleName": "Nombre de la muestra",
    "views.writingSample": "Muestra de escritura",
    "views.addToCorpus": "Añadir al corpus",
    "views.translations": "Traducciones",
    "views.translationStale": "El artículo de origen ha cambiado desde que se creó esta propuesta de traducción.",
    "views.translationArticleStale": (
        "El artículo de origen ha cambiado desde que se aceptó esta traducción. Se conserva su texto. Abre el " +
        "artículo de origen para preparar una traducción actualizada."
    ),
    "views.translationFresh": "Actual",
    "views.translationOutdated": "Desactualizada",
    "views.translationRefresh": "Actualizar",
    "views.translationRefreshTitle": "¿Actualizar traducción?",
    "views.translationRefreshTarget": "Traducción que actualizar",
    "views.translationRefreshDescription": (
        "¿Aplicar el texto revisado en {language} a {title} como una nueva versión guardada? El título no " +
        "cambia y las versiones anteriores siguen disponibles en el historial."
    ),
    "views.translationRefreshConfirm": "Actualizar",
    "views.translationRefreshDraft": "Guarda o descarta el borrador de la traducción antes de actualizarla.",
    "views.translationRefreshUnavailable": (
        "No se pudo actualizar la traducción porque su propuesta no está disponible. Genera una nueva " +
        "traducción y revísala de nuevo."
    ),
    "views.translationRefreshFailed": (
        "No se pudo actualizar la traducción. Guarda o descarta su borrador, comprueba que el origen y la " +
        "traducción no hayan cambiado y revisa la propuesta de nuevo."
    ),
    "views.translationEmptyTitle": "No hay propuestas de traducción",
    "views.translationEmpty": "Pide al asistente editorial que traduzca este artículo.",
    "views.translate": "Nueva traducción…",
    "views.translationDialogTitle": "Nueva traducción",
    "views.translationTargets": "Genera una traducción y revísala aquí. Se conservan los resultados anteriores.",
    "views.translationTargetsEmpty": "Genera una traducción y revísala aquí. Se conservan los resultados anteriores.",
    "views.translationGenerateDescription": "Traducir {title}, versión de origen {revisionId}.",
    "views.translationGenerateDraft": "El borrador sin guardar se guardará como una versión antes de generar.",
    "views.translationGenerateTargets": "Idiomas de destino",
    "views.translationGenerateConfirm": "Traducir a {languages}",
    "views.translationGenerateBatch": "Traducir a {count, number} idiomas",
    "views.translationPreservation": (
        "Se conservan los resultados y artículos existentes. Actualizar un artículo de traducción requiere " +
        "una confirmación aparte."
    ),
    "views.translationGenerationActive": "Hay una solicitud en curso. Espera a que termine o cancélala antes de generar traducciones.",
    "views.translationChooseTargets": "Selecciona al menos un idioma de destino para continuar.",
    "views.translationContextChanged": "El origen ha cambiado. Revisa el origen actualizado antes de confirmar de nuevo.",
    "views.translationReviewSource": "Revisar origen actualizado",
    "views.translationResultSelector": "Resultado de traducción",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationLinkedIdentity": "Artículo {articleId}, versión de origen {revisionId}",
    "views.translationLinkedTarget": "{title}, artículo {articleId}, versión de origen {revisionId}",
    "views.sourceLinkedPrefix": "Esta traducción está vinculada a",
    "views.sourceLinkedRevision": "en la versión de origen {revisionNumber}.",
    "views.existingTranslations": "Traducciones existentes",
    "views.openTranslation": "{language}: {title}",
    "views.translationPair": "Origen en {source} → traducción a {target}",
    "views.translationOriginal": "Original",
    "views.translationResult": "Traducción a {language}",
    "views.translationDisplayMode": "Modo de visualización de traducciones",
    "views.translationSideBySide": "En paralelo",
    "views.translationAligned": "Párrafos alineados",
    "views.translationMissingOriginal": "No hay un párrafo original correspondiente.",
    "views.translationMissingResult": "No hay un párrafo traducido correspondiente.",
    "views.translationProtectedValue": "Contenido protegido validado: {value}",
    "views.translationProtectedExplanation": (
        "Marcado para conservarse exactamente en esta traducción. {count, plural, one {La aparición prevista " +
        "está} other {Las # apariciones previstas están}} presentes sin cambios en el texto traducido. Esta " +
        "comprobación es orientativa; revisa la traducción antes de aceptarla."
    ),
} satisfies Partial<Record<MessageId, string>>;
