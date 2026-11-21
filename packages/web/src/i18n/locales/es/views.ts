import type { MessageId } from "../../messages.js";


export const viewsMessages = {
    "views.acceptAll": "Marcar todo como aceptado",
    "views.acceptChange": "Aceptar",
    "views.acceptFactAsWritten": "Aceptar tal como está",
    "views.acceptFactEvidence": "Aceptar pruebas",
    "views.acceptSelected": "Aceptar cambios seleccionados",
    "views.addToCorpus": "Añadir al corpus",
    "views.applyProposal": "Aplicar",
    "views.changeNavigation": "Navegación entre cambios",
    "views.changeType.addition": "Adición{separator}Cambio {index} de {total}",
    "views.changeType.removal": "Eliminación{separator}Cambio {index} de {total}",
    "views.changeType.replacement": "Sustitución{separator}Cambio {index} de {total}",
    "views.characterCount": "{count} / {limit} caracteres",
    "views.confirmRejectTranslation": "Rechazar",
    "views.continueWriting": "Seguir escribiendo",
    "views.copy": "Copiar",
    "views.decision.accepted": "Aceptado",
    "views.decision.pending": "Pendiente",
    "views.decision.rejected": "Rechazado",
    "views.discardDraftAndRestore": "Descartar y restaurar",
    "views.dismissPreservationWarnings": "Cerrar advertencias de conservación",
    "views.dismissProposal": "Descartar propuesta",
    "views.earlierSuggestion": "Sugerencia anterior",
    "views.earlierSuggestionHelp": "El artículo ha cambiado desde que se creó esta sugerencia.",
    "views.editTranslation": "Editar",
    "views.existingTranslations": "Traducciones existentes",
    "views.factCheck": "Verificación de datos",
    "views.factCheckCurrent": "Versión actual",
    "views.factCheckEmpty": "Las verificaciones son orientativas y nunca modifican el artículo.",
    "views.factCheckEmptyTitle": "Sin observaciones de verificación de datos",
    "views.factCheckFindings": "Observaciones de verificación de datos",
    "views.factCheckHistorical": "Esta verificación anterior es de solo lectura. Puedes actuar sobre la última verificación de esta versión.",
    "views.factCheckHistory": "Historial de verificaciones",
    "views.factCheckIncomplete": (
        "Esta verificación está incompleta. Solo se muestran las observaciones completadas. Repítela para revisar las a" +
        "firmaciones restantes."
    ),
    "views.factCheckRevision": "Versión revisada: {revision}",
    "views.factCheckRunOption": "Versión {revision}, verificada el {dateTime}",
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {El asistente está buscando afirmaciones que verificar.} one {El asistente está v" +
        "erificando # afirmación.} other {El asistente está verificando # afirmaciones.}} Las observaciones a" +
        "parecerán aquí al terminar."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {El asistente está buscando afirmaciones que verificar.} one {El asistente está v" +
        "erificando # afirmación.} other {El asistente está verificando # afirmaciones.}} Estas son las obser" +
        "vaciones de la verificación anterior; se actualizarán cuando termine la nueva."
    ),
    "views.factCheckStale": (
        "Estas observaciones pertenecen a una versión anterior. Puedes leerlas, pero no crear correcciones ha" +
        "sta repetir la verificación."
    ),
    "views.factCheckedAt": "Verificado el {dateTime}.",
    "views.factEvidenceFreshness": (
        "Las pruebas reflejan las fechas de las fuentes y de la verificación. Las afirmaciones sujetas al tie" +
        "mpo pueden haber cambiado; repite la verificación para actualizarlas."
    ),
    "views.factEvidenceReused": "Pruebas reutilizadas de la versión {revision}.",
    "views.factImportance": "Importancia {importance}",
    "views.factResolution": "Resolución: {resolution}",
    "views.factResolution.accepted_as_written": "Aceptada tal como está",
    "views.factResolution.corrected_or_removed": "Corregida o eliminada",
    "views.factResolution.evidence_accepted": "Pruebas aceptadas",
    "views.factStatus.disputed": "Cuestionada",
    "views.factStatus.supported": "Respaldada",
    "views.factStatus.unverifiable": "No verificable",
    "views.findingNavigation": "Navegación entre observaciones",
    "views.nextChange": "Cambio siguiente",
    "views.nextFinding": "Observación siguiente",
    "views.openTranslation": "{language}: {title}",
    "views.preservationWarnings": "Comprobar detalles conservados",
    "views.previousChange": "Cambio anterior",
    "views.previousFinding": "Observación anterior",
    "views.proposalAccepted": "Esta propuesta se aceptó. Sus decisiones son de solo lectura.",
    "views.proposalAuthorEdited": "Has editado esta redacción. Revisa el texto antes de aplicarlo.",
    "views.proposalCounts": (
        "{total, plural, =0 {Sin sugerencias} one {# sugerencia} other {# sugerencias}}{separator}{pending, p" +
        "lural, =0 {Ninguna pendiente} one {# pendiente} other {# pendientes}}{separator}{accepted, plural, =" +
        "0 {Ninguna aceptada} one {# aceptada} other {# aceptadas}}{separator}{rejected, plural, =0 {Ninguna " +
        "rechazada} one {# rechazada} other {# rechazadas}}"
    ),
    "views.proposalDisplayMode": "Modo de visualización de propuestas",
    "views.proposalEmpty": "Usa el asistente editorial para generar una propuesta. Nunca cambiará el artículo automáticamente.",
    "views.proposalEmptyTitle": "No hay propuestas que revisar",
    "views.proposalFallback": (
        "No se puede separar esta propuesta en cambios individuales de forma segura. Revisa la propuesta comp" +
        "leta antes de aceptarla."
    ),
    "views.proposalHighlight": "Resaltar cambios",
    "views.proposalNoChanges": "Sin cambios",
    "views.proposalReview": "Revisión de propuestas",
    "views.proposalSideBySide": "En paralelo",
    "views.proposalStacked": "Una debajo de otra",
    "views.proposalStale": (
        "Esta propuesta está desactualizada porque el artículo tiene una versión más reciente. Genera una nueva propues" +
        "ta antes de aceptar cambios."
    ),
    "views.proposalSummaryLoading": "Resumiendo este cambio…",
    "views.proposalSummaryUnavailable": "No hay un resumen breve disponible. Revisa el texto original y el propuesto abajo.",
    "views.proposalWhole": "Propuesta completa{separator}{changes, plural, one {# cambio} other {# cambios}}",
    "views.proposeFactCorrection": "Proponer corrección",
    "views.proposeFactCorrections": "Proponer correcciones ({count})",
    "views.proposedChangeInput": "Texto propuesto para el cambio {index}",
    "views.regenerateInAssistant": "Volver a generar en el asistente",
    "views.rejectAll": "Marcar todo como rechazado",
    "views.rejectChange": "Rechazar",
    "views.rejectProposal": "Rechazar propuesta",
    "views.rejectTranslation": "Rechazar",
    "views.rejectTranslationDescription": (
        "Esto retira de la aprobación la traducción generada a {language}. El artículo de origen y las traducciones ace" +
        "ptadas no cambian."
    ),
    "views.rejectTranslationTitle": "¿Rechazar esta traducción?",
    "views.remove": "Eliminar",
    "views.resetAllDecisions": "Restablecer decisiones",
    "views.restoreDescription": "Restaurar crea una nueva versión inmutable; no reescribe el historial.",
    "views.restoreDraftDescription": "Este borrador tiene cambios que no están en una versión guardada. Guárdalo primero o descártalo antes de restaurar.",
    "views.restoreHeading": "¿Restaurar versión?",
    "views.restoreRevision": "Restaurar versión",
    "views.resumeReview": "Continuar revisión",
    "views.reviewCurrentArticle": "Revisar el artículo actual",
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Verificar datos",
    "views.runFactCheckAgain": "Verificar datos de nuevo",
    "views.sampleName": "Nombre de la muestra",
    "views.saveAndRestore": "Guardar y restaurar",
    "views.selectAllNeedingReview": "Seleccionar todo lo que necesita revisión",
    "views.selectChange": "Seleccionar cambio",
    "views.setAllDecisions": "Decisiones…",
    "views.sourceLinkedPrefix": "Esta traducción está vinculada a",
    "views.sourceLinkedRevision": "en la versión de origen {revisionNumber}.",
    "views.styleIntro": "El corpus de estilo local nunca se envía completo; solo se usa el perfil que se deriva de él.",
    "views.styleProfile": "Perfil de estilo",
    "views.translate": "Nueva traducción…",
    "views.translationAligned": "Párrafos alineados",
    "views.translationArticleStale": (
        "El artículo de origen ha cambiado desde que se aceptó esta traducción. Se conserva su texto. Abre el" +
        " artículo de origen para preparar una traducción actualizada."
    ),
    "views.translationChooseTargets": "Selecciona al menos un idioma de destino para continuar.",
    "views.translationComparison": (
        "Comparación de traducciones. Usa las flechas izquierda y derecha para llegar al contenido protegido " +
        "validado, Intro o Espacio para ver detalles y Escape para cerrarlos."
    ),
    "views.translationContextChanged": "El origen ha cambiado. Revisa el origen actualizado antes de confirmar de nuevo.",
    "views.translationDialogTitle": "Nueva traducción",
    "views.translationDisplayMode": "Modo de visualización de traducciones",
    "views.translationEmpty": "Pide al asistente editorial que traduzca este artículo.",
    "views.translationEmptyTitle": "No hay propuestas de traducción",
    "views.translationFresh": "Actual",
    "views.translationGenerateBatch": "Traducir a {count, number} idiomas",
    "views.translationGenerateConfirm": "Traducir a {languages}",
    "views.translationGenerateDescription": "Traducir {title}, versión de origen {revisionId}.",
    "views.translationGenerateDraft": "El borrador sin guardar se guardará como una versión antes de generar.",
    "views.translationGenerateTargets": "Idiomas de destino",
    "views.translationGenerating": "Traduciendo…",
    "views.translationGeneratingLanguages": "Traduciendo a {languages}…",
    "views.translationGenerationActive": "Hay una solicitud en curso. Espera a que termine o cancélala antes de generar traducciones.",
    "views.translationLinkedIdentity": "Artículo {articleId}, versión de origen {revisionId}",
    "views.translationLinkedTarget": "{title}, artículo {articleId}, versión de origen {revisionId}",
    "views.translationMissingOriginal": "No hay un párrafo original correspondiente.",
    "views.translationMissingResult": "No hay un párrafo traducido correspondiente.",
    "views.translationOriginal": "Original",
    "views.translationOutdated": "Desactualizada",
    "views.translationPair": "Origen en {source} → traducción a {target}",
    "views.translationPreservation": (
        "Se conservan los resultados y artículos existentes. Actualizar un artículo de traducción requiere una confirma" +
        "ción aparte."
    ),
    "views.translationProtectedExplanation": (
        "Marcado para conservarse exactamente en esta traducción. {count, plural, one {La aparición prevista " +
        "está} other {Las # apariciones previstas están}} presentes sin cambios en el texto traducido. Esta c" +
        "omprobación es orientativa; revisa la traducción antes de aceptarla."
    ),
    "views.translationProtectedValue": "Contenido protegido validado: {value}",
    "views.translationProtectedWarning": "Contenido protegido modificado o ausente",
    "views.translationPublishingGuidance": "Orientaciones de {profile}",
    "views.translationRefresh": "Actualizar",
    "views.translationRefreshConfirm": "Actualizar",
    "views.translationRefreshDescription": (
        "¿Aplicar el texto revisado en {language} a {title} como una nueva versión guardada? El título no cam" +
        "bia y las versiones anteriores siguen disponibles en el historial."
    ),
    "views.translationRefreshDraft": "Guarda o descarta el borrador de la traducción antes de actualizarla.",
    "views.translationRefreshFailed": (
        "No se pudo actualizar la traducción. Guarda o descarta su borrador, comprueba que el origen y la traducción no" +
        " hayan cambiado y revisa la propuesta de nuevo."
    ),
    "views.translationRefreshTarget": "Traducción que actualizar",
    "views.translationRefreshTitle": "¿Actualizar traducción?",
    "views.translationRefreshUnavailable": (
        "No se pudo actualizar la traducción porque su propuesta no está disponible. Genera una nueva traducción y reví" +
        "sala de nuevo."
    ),
    "views.translationResult": "Traducción a {language}",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationResultSelector": "Resultado de traducción",
    "views.translationReviewSource": "Revisar origen actualizado",
    "views.translationSideBySide": "En paralelo",
    "views.translationStale": "El artículo de origen ha cambiado desde que se creó esta propuesta de traducción.",
    "views.translationTargets": "Genera una traducción y revísala aquí. Se conservan los resultados anteriores.",
    "views.translationTargetsEmpty": "Genera una traducción y revísala aquí. Se conservan los resultados anteriores.",
    "views.translations": "Traducciones",
    "views.uncertainty": "Incertidumbre: {value}",
    "views.updateSuggestion": "Actualizar sugerencia",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.warning.claims": "La prosa modificada puede alterar el significado de los hechos; verifica las afirmaciones antes de aceptar.",
    "views.warning.code": "El código ha cambiado. Verifica el código en línea y en bloques.",
    "views.warning.number": "Los valores numéricos han cambiado. Verifica cada número.",
    "views.warning.url": "Las URL han cambiado. Verifica cada enlace.",
    "views.writingSample": "Muestra de escritura",
} satisfies Partial<Record<MessageId, string>>;
